import { FB_CONFIG, FacebookEventName, FacebookEventData } from '@/app/config/facebook';

// Estendi il tipo Window per includere fbq
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: (...args: unknown[]) => void;
  }
}

/**
 * Genera un event_id univoco per la deduplicazione degli eventi
 */
export function generateEventId(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Ottiene il valore del cookie _fbp (Facebook Browser ID)
 */
export function getFbp(): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(/_fbp=([^;]+)/);
  return match ? match[1] : '';
}

/**
 * Ottiene il valore del cookie _fbc (Facebook Click ID)
 */
export function getFbc(): string {
  if (typeof document === 'undefined') return '';

  // Prima controlla il cookie
  const match = document.cookie.match(/_fbc=([^;]+)/);
  if (match) return match[1];

  // Se non c'è, prova a costruirlo dal fbclid nell'URL
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get('fbclid');
    if (fbclid) {
      return `fb.1.${Date.now()}.${fbclid}`;
    }
  }

  return '';
}

/**
 * Ottiene i parametri UTM dall'URL
 */
export function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source') || '',
    utm_medium: urlParams.get('utm_medium') || '',
    utm_campaign: urlParams.get('utm_campaign') || '',
    utm_content: urlParams.get('utm_content') || '',
    utm_term: urlParams.get('utm_term') || '',
  };
}

/**
 * Traccia un evento con il Facebook Pixel (client-side)
 */
export function trackPixelEvent(
  eventName: FacebookEventName,
  eventData?: FacebookEventData,
  eventId?: string
): void {
  if (typeof window === 'undefined' || !window.fbq) {
    console.warn('[FB Pixel] Facebook Pixel not loaded yet');
    return;
  }

  const options = eventId ? { eventID: eventId } : undefined;

  console.log(`[FB Pixel] Tracking event: ${eventName}`, {
    eventData,
    eventId,
    options,
  });

  if (eventData) {
    window.fbq('track', eventName, eventData, options);
  } else {
    window.fbq('track', eventName, {}, options);
  }

  console.log(`[FB Pixel] Event '${eventName}' sent successfully`);
}

/**
 * Traccia PageView
 */
export function trackPageView(eventId?: string): void {
  trackPixelEvent('PageView', undefined, eventId);
}

/**
 * Traccia Purchase
 */
export function trackPurchase(eventData: FacebookEventData, eventId?: string): void {
  trackPixelEvent('Purchase', eventData, eventId);
}

/**
 * Traccia Lead
 */
export function trackLead(eventData?: FacebookEventData, eventId?: string): void {
  trackPixelEvent('Lead', eventData, eventId);
}

/**
 * Inizializza lo script del Facebook Pixel
 */
export function initPixelScript(): string {
  return `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${FB_CONFIG.PIXEL_ID}');
    console.log('[FB Pixel] Initialized with ID: ${FB_CONFIG.PIXEL_ID}');
  `;
}
