/**
 * Utility per hashare i dati utente con SHA256 per Facebook CAPI
 * I dati devono essere hashati prima dell'invio per privacy
 */

/**
 * Hasha una stringa con SHA256 usando Web Crypto API
 */
export async function sha256Hash(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Normalizza e hasha il nome (lowercase, trim)
 */
export async function hashNome(nome: string): Promise<string> {
  if (!nome) return '';
  const normalized = nome.toLowerCase().trim();
  return sha256Hash(normalized);
}

/**
 * Normalizza e hasha il cognome (lowercase, trim)
 */
export async function hashCognome(cognome: string): Promise<string> {
  if (!cognome) return '';
  const normalized = cognome.toLowerCase().trim();
  return sha256Hash(normalized);
}

/**
 * Normalizza e hasha il telefono
 * - Rimuove tutti i caratteri non numerici
 * - Aggiunge prefisso 39 (Italia) se manca
 */
export async function hashTelefono(telefono: string): Promise<string> {
  if (!telefono) return '';

  // Rimuovi tutti i caratteri non numerici
  let cleaned = telefono.replace(/\D/g, '');

  // Aggiungi prefisso 39 se manca e il numero sembra italiano
  if (cleaned.length === 10 && cleaned.startsWith('3')) {
    cleaned = '39' + cleaned;
  }

  return sha256Hash(cleaned);
}

/**
 * Normalizza e hasha l'email (lowercase, trim)
 */
export async function hashEmail(email: string): Promise<string> {
  if (!email) return '';
  const normalized = email.toLowerCase().trim();
  return sha256Hash(normalized);
}
