// Network API utilities with retry and local backup

const FAILED_LEADS_KEY = 'failed_leads';
const LEAD_STATUS_KEY = 'lead_submission_status';
const RETRY_DONE_KEY = 'lead_retry_done';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export interface LeadData {
  endpoint: string;
  params: Record<string, string>;
  timestamp: number;
  retryCount: number;
}

export type LeadStatus = 'success' | 'failed' | 'none';

/**
 * Salva lo stato dell'ultima submission del lead
 */
export function setLeadStatus(status: LeadStatus): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(LEAD_STATUS_KEY, status);
}

/**
 * Recupera lo stato dell'ultima submission del lead
 */
export function getLeadStatus(): LeadStatus {
  if (typeof window === 'undefined') return 'none';
  return (sessionStorage.getItem(LEAD_STATUS_KEY) as LeadStatus) || 'none';
}

/**
 * Resetta lo stato del lead e il flag di retry
 */
export function clearLeadStatus(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(LEAD_STATUS_KEY);
  sessionStorage.removeItem(RETRY_DONE_KEY);
}

/**
 * Salva un lead fallito in localStorage per retry successivo
 */
function saveFailedLead(lead: LeadData): void {
  if (typeof window === 'undefined') return;

  try {
    const existing = localStorage.getItem(FAILED_LEADS_KEY);
    const leads: LeadData[] = existing ? JSON.parse(existing) : [];
    leads.push(lead);
    localStorage.setItem(FAILED_LEADS_KEY, JSON.stringify(leads));
    console.log('[Network API] Lead saved locally for retry:', lead);
  } catch (error) {
    console.error('[Network API] Failed to save lead locally:', error);
  }
}

/**
 * Recupera i lead falliti da localStorage
 */
export function getFailedLeads(): LeadData[] {
  if (typeof window === 'undefined') return [];

  try {
    const existing = localStorage.getItem(FAILED_LEADS_KEY);
    return existing ? JSON.parse(existing) : [];
  } catch {
    return [];
  }
}

/**
 * Rimuove un lead dalla lista dei falliti
 */
function removeFailedLead(index: number): void {
  if (typeof window === 'undefined') return;

  try {
    const leads = getFailedLeads();
    leads.splice(index, 1);
    localStorage.setItem(FAILED_LEADS_KEY, JSON.stringify(leads));
  } catch (error) {
    console.error('[Network API] Failed to remove lead:', error);
  }
}

/**
 * Delay helper
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Invia lead al network con retry automatico
 * Ritorna true se successo, false se fallito (e salvato localmente)
 */
export async function sendLeadToNetwork(
  endpoint: string,
  params: Record<string, string>
): Promise<boolean> {

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`[Network API] Attempt ${attempt}/${MAX_RETRIES}...`);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(params).toString(),
      });

      console.log(`[Network API] Response status: ${response.status}`);

      // Considera successo solo per status 2xx
      if (response.ok) {
        console.log('[Network API] Lead sent successfully!');
        setLeadStatus('success');
        return true;
      }

      // Se errore 4xx, non riprovare (dati non validi)
      if (response.status >= 400 && response.status < 500) {
        console.error(`[Network API] Client error ${response.status}, not retrying`);
        // Salva comunque per analisi
        saveFailedLead({
          endpoint,
          params,
          timestamp: Date.now(),
          retryCount: attempt,
        });
        return false;
      }

      // Se errore 5xx, riprova
      console.warn(`[Network API] Server error ${response.status}, will retry...`);

    } catch (error) {
      console.error(`[Network API] Network error on attempt ${attempt}:`, error);
    }

    // Aspetta prima del prossimo tentativo (se non è l'ultimo)
    if (attempt < MAX_RETRIES) {
      await delay(RETRY_DELAY * attempt); // Exponential backoff
    }
  }

  // Tutti i tentativi falliti - salva localmente
  console.error('[Network API] All retries failed, saving lead locally');
  saveFailedLead({
    endpoint,
    params,
    timestamp: Date.now(),
    retryCount: MAX_RETRIES,
  });
  setLeadStatus('failed');

  return false;
}

/**
 * Riprova a inviare i lead falliti salvati in localStorage
 * Chiamare all'avvio dell'app o periodicamente
 * Ritorna true se almeno un retry è riuscito
 */
export async function retryFailedLeads(): Promise<boolean> {
  // Se la lead è già andata con successo, non fare nulla
  if (getLeadStatus() === 'success') {
    console.log('[Network API] Lead already sent successfully, skipping retry');
    return false;
  }

  // Se abbiamo già fatto retry con successo in questa sessione, non ripetere
  if (typeof window !== 'undefined' && sessionStorage.getItem(RETRY_DONE_KEY) === 'true') {
    console.log('[Network API] Retry already done in this session, skipping');
    return false;
  }

  const leads = getFailedLeads();

  if (leads.length === 0) {
    return false;
  }

  console.log(`[Network API] Retrying ${leads.length} failed leads...`);
  let anySuccess = false;

  for (let i = leads.length - 1; i >= 0; i--) {
    const lead = leads[i];

    // Salta lead più vecchi di 24 ore
    if (Date.now() - lead.timestamp > 24 * 60 * 60 * 1000) {
      console.log('[Network API] Skipping old lead (>24h):', lead);
      removeFailedLead(i);
      continue;
    }

    try {
      const response = await fetch(lead.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(lead.params).toString(),
      });

      if (response.ok) {
        console.log('[Network API] Retry successful for lead:', lead);
        removeFailedLead(i);
        anySuccess = true;
        // Segna che abbiamo fatto retry con successo per evitare duplicati
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(RETRY_DONE_KEY, 'true');
        }
      } else {
        console.warn('[Network API] Retry failed for lead:', lead, response.status);
      }
    } catch (error) {
      console.error('[Network API] Retry error for lead:', lead, error);
    }

    // Aspetta tra i retry per non sovraccaricare
    await delay(500);
  }

  return anySuccess;
}

/**
 * Conta i lead falliti in attesa
 */
export function getFailedLeadsCount(): number {
  return getFailedLeads().length;
}
