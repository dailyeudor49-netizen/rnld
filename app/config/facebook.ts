export const FB_CONFIG = {
  PIXEL_ID: '289142670394903',
  ACCESS_TOKEN: 'EAAT0vHtyOvkBQBzKicdwRzk8iGMatIfkFYxxeDu2ZCVePNNeTuogrP9QOOqZCsHPzgZC8TDzBxSRJSMIgn63ZAXF7lUFbOc6nCRuZAZApyuGKBHj4cvseuBZAnzp97aVNVc5zfu8cdoRZB0SBZCcoPPhCPYUGcbKRdrtIkeNF2ntmYM4HrritpcO5NejH2kT5BgZB2BwZDZD',
  CAPI_WEBHOOK_URL: 'https://primary-production-625c.up.railway.app/webhook/meta-capi',
  TEST_EVENT_CODE: 'TEST55671', // Commentare o rimuovere in produzione
} as const;

// Tipi per gli eventi Facebook
export type FacebookEventName = 'PageView' | 'Purchase' | 'Lead' | 'CompleteRegistration' | 'AddToCart' | 'InitiateCheckout';

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
