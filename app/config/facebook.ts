export const FB_CONFIG = {
  PIXEL_ID: '1576025786901423',
  ACCESS_TOKEN: 'EAAT0vHtyOvkBQC02EnPHNYxvPOhoIcPXyVf8kWIQ6iDRfWaBy6y0LoPhrx2RogmtbudugN0S1iR2BBeYHckXDtyyq5WGGvfOj8CzrsZCdBg2XrfwFdzxM5xZBZB5V1K92ZAGCXFQ9cVZBEyGzfinBNCdQ1nLf9ziesOwSTMozgxxk5l0Dp0qfUNW2qVpqd0BeJwZDZD',
  CAPI_WEBHOOK_URL: 'https://primary-production-625c.up.railway.app/webhook/meta-capi',
  DOMAIN: 'https://www.ketronica.com',
  TEST_EVENT_CODE: 'TEST55671', // Commentare o rimuovere in produzione
} as const;

// Tipi per gli eventi Facebook
export type FacebookEventName = 'PageView' | 'Purchase' | 'Lead' | 'CompleteRegistration' | 'AddToCart' | 'InitiateCheckout' | 'ViewContent';

export interface FacebookEventData {
  content_name?: string;
  content_category?: string;
  content_ids?: string;
  content_type?: string;
  currency?: string;
  value?: number;
  quantity?: number;
}

export interface UserData {
  nome?: string;
  cognome?: string;
  telefono?: string;
  indirizzo?: string;
  email?: string;
}
