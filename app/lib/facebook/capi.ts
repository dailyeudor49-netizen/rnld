import { FB_CONFIG, FacebookEventData, UserData } from '@/app/config/facebook';
import { hashNome, hashCognome, hashTelefono, hashEmail } from './hash';
import { getFbp, getFbc, getUtmParams } from './pixel';

export interface CAPIPayload {
  event_name: string;
  event_id: string;
  event_source_url: string;
  timestamp: number;
  pixel_id: string;
  token: string;

  nome_hash: string;
  cognome_hash: string;
  telefono_hash: string;
  email_hash?: string;
  indirizzo: string;

  user_agent: string;
  fbp: string;
  fbc: string;

  content_name: string;
  content_category: string;
  content_ids: string;
  content_type: string;
  currency: string;
  value: number;
  quantity: number;

  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;

  page_title: string;
  referrer: string;
  language: string;
  screen_resolution: string;

  test_event_code?: string;
}

/**
 * Ottiene i dati utente da localStorage o dalla query string
 */
export function getUserDataFromStorage(): UserData {
  if (typeof window === 'undefined') return {};

  console.log('[FB CAPI] getUserDataFromStorage() - checking localStorage...');

  // Prima prova localStorage
  const storedData = localStorage.getItem('userData');
  if (storedData) {
    try {
      const parsed = JSON.parse(storedData);
      console.log('[FB CAPI] Found userData in localStorage:', parsed);
      return parsed;
    } catch {
      console.log('[FB CAPI] Error parsing localStorage userData');
    }
  }

  console.log('[FB CAPI] No userData in localStorage, checking query string...');

  // Poi prova la query string
  const urlParams = new URLSearchParams(window.location.search);
  const fromQuery = {
    nome: urlParams.get('nome') || '',
    cognome: urlParams.get('cognome') || '',
    telefono: urlParams.get('telefono') || '',
    indirizzo: urlParams.get('indirizzo') || '',
    email: urlParams.get('email') || '',
  };

  console.log('[FB CAPI] userData from query string:', fromQuery);
  return fromQuery;
}

/**
 * Salva i dati utente in localStorage
 */
export function saveUserDataToStorage(userData: UserData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('userData', JSON.stringify(userData));
}

/**
 * Costruisce il payload per il webhook N8N della CAPI
 */
export async function buildCAPIPayload(
  eventName: string,
  eventId: string,
  userData: UserData,
  eventData?: FacebookEventData
): Promise<CAPIPayload> {
  const utmParams = getUtmParams();

  console.log('[FB CAPI] Building payload with userData:', userData);

  // Hash dei dati utente
  const [nomeHash, cognomeHash, telefonoHash, emailHash] = await Promise.all([
    hashNome(userData.nome || ''),
    hashCognome(userData.cognome || ''),
    hashTelefono(userData.telefono || ''),
    hashEmail(userData.email || ''),
  ]);

  console.log('[FB CAPI] Hashed values:', {
    nome: userData.nome || '(empty)',
    nome_hash: nomeHash || '(empty - no input)',
    cognome: userData.cognome || '(empty)',
    cognome_hash: cognomeHash || '(empty - no input)',
    telefono: userData.telefono || '(empty)',
    telefono_hash: telefonoHash || '(empty - no input)',
  });

  // Costruisci l'URL usando il dominio configurato + pathname
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const eventSourceUrl = `${FB_CONFIG.DOMAIN}${pathname}`;

  const payload: CAPIPayload = {
    event_name: eventName,
    event_id: eventId,
    event_source_url: eventSourceUrl,
    timestamp: Math.floor(Date.now() / 1000),
    pixel_id: FB_CONFIG.PIXEL_ID,
    token: FB_CONFIG.ACCESS_TOKEN,

    nome_hash: nomeHash,
    cognome_hash: cognomeHash,
    telefono_hash: telefonoHash,
    email_hash: emailHash,
    indirizzo: userData.indirizzo || '',

    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    fbp: getFbp(),
    fbc: getFbc(),

    content_name: eventData?.content_name || '',
    content_category: eventData?.content_category || '',
    content_ids: eventData?.content_ids || '',
    content_type: eventData?.content_type || 'product',
    currency: eventData?.currency || 'EUR',
    value: eventData?.value || 0,
    quantity: eventData?.quantity || 1,

    utm_source: utmParams.utm_source,
    utm_medium: utmParams.utm_medium,
    utm_campaign: utmParams.utm_campaign,
    utm_content: utmParams.utm_content,
    utm_term: utmParams.utm_term,

    page_title: typeof document !== 'undefined' ? document.title : '',
    referrer: typeof document !== 'undefined' ? document.referrer : '',
    language: typeof navigator !== 'undefined' ? navigator.language : '',
    screen_resolution:
      typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : '',
  };

  // Aggiungi test event code se configurato
  if (FB_CONFIG.TEST_EVENT_CODE) {
    payload.test_event_code = FB_CONFIG.TEST_EVENT_CODE;
  }

  return payload;
}

/**
 * Invia i dati al webhook N8N della CAPI
 */
export async function sendToCAPI(payload: CAPIPayload): Promise<boolean> {
  console.log('[FB CAPI] Sending event to webhook...');
  console.log('[FB CAPI] Webhook URL:', FB_CONFIG.CAPI_WEBHOOK_URL);
  console.log('[FB CAPI] Payload:', JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(FB_CONFIG.CAPI_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('[FB CAPI] Webhook error:', response.status, response.statusText);
      return false;
    }

    console.log('[FB CAPI] Event sent successfully:', payload.event_name);
    console.log('[FB CAPI] Response status:', response.status);
    return true;
  } catch (error) {
    console.error('[FB CAPI] Webhook error:', error);
    return false;
  }
}

/**
 * Traccia un evento Lead via CAPI
 */
export async function trackLeadCAPI(
  eventId: string,
  userData: UserData,
  eventData?: FacebookEventData
): Promise<boolean> {
  const payload = await buildCAPIPayload('Lead', eventId, userData, eventData);
  return sendToCAPI(payload);
}

/**
 * Traccia un evento Purchase via CAPI
 */
export async function trackPurchaseCAPI(
  eventId: string,
  userData: UserData,
  eventData?: FacebookEventData
): Promise<boolean> {
  const payload = await buildCAPIPayload('Purchase', eventId, userData, eventData);
  return sendToCAPI(payload);
}
