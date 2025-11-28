'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { FB_CONFIG } from '@/app/config/facebook';
import {
  initPixelScript,
  trackPageView,
  trackPurchase,
  generateEventId,
  getFbp,
  getFbc,
} from '@/app/lib/facebook/pixel';
import { getUserDataFromStorage, trackLeadCAPI } from '@/app/lib/facebook/capi';

/**
 * Verifica se il pathname è una pagina Facebook (landing o thank you)
 * - Landing pages: /fb-* (es: /fb-prodotto1, /fb-offerta2)
 * - Thank you pages: /ty/ty-fb-* (es: /ty/ty-fb-prodotto1)
 */
function isFacebookPage(pathname: string | null): boolean {
  if (!pathname) return false;
  return pathname.startsWith('/fb-') || pathname.startsWith('/ty/ty-fb-');
}

/**
 * Verifica se il pathname è una thank you page Facebook
 */
function isFacebookThankYouPage(pathname: string | null): boolean {
  if (!pathname) return false;
  return pathname.startsWith('/ty/ty-fb-');
}

export default function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Verifica se siamo su una pagina Facebook
  const isOnFacebookPage = isFacebookPage(pathname);

  useEffect(() => {
    console.log('[FB Pixel] Component mounted, pathname:', pathname);
    console.log('[FB Pixel] Is Facebook page:', isOnFacebookPage);

    // Traccia PageView SOLO su pagine Facebook (/fb-* o /ty/ty-fb-*)
    if (!isOnFacebookPage) {
      console.log('[FB Pixel] Skipping tracking - not a Facebook page');
      return;
    }

    const eventId = generateEventId();
    console.log('[FB Pixel] Tracking PageView with eventId:', eventId);
    trackPageView(eventId);

    // Se siamo su una thank you page Facebook (/ty/ty-fb-*), traccia anche Lead/Purchase
    if (isFacebookThankYouPage(pathname)) {
      console.log('[FB Pixel] === FACEBOOK THANK YOU PAGE DETECTED ===');
      console.log('[FB Pixel] Path:', pathname);

      const purchaseEventId = generateEventId();

      // Dati dell'evento (puoi personalizzare per ogni prodotto)
      const eventData = {
        content_name: getContentNameFromPath(pathname),
        content_category: 'landing_page',
        content_ids: getProductIdFromPath(pathname),
        content_type: 'product',
        currency: 'EUR',
        value: 0,
        quantity: 1,
      };

      console.log('[FB Pixel] Purchase event data:', eventData);
      console.log('[FB Pixel] Purchase eventId:', purchaseEventId);

      // Traccia Purchase con il pixel (client-side)
      trackPurchase(eventData, purchaseEventId);

      // Traccia Lead via CAPI (server-side via webhook)
      const userData = getUserDataFromStorage();
      console.log('[FB Pixel] User data from storage:', userData);

      trackLeadCAPI(purchaseEventId, userData, eventData).then((success) => {
        console.log('[FB CAPI] Lead event sent to webhook:', success ? 'SUCCESS' : 'FAILED');
      });

      // Log riepilogativo
      console.log('[FB Pixel] === TRACKING SUMMARY ===', {
        pathname,
        purchaseEventId,
        fbp: getFbp(),
        fbc: getFbc(),
        hasUserData: Object.keys(userData).length > 0,
        userData,
      });
    }
  }, [pathname, searchParams, isOnFacebookPage]);

  // NON renderizzare lo script del pixel se non siamo su una pagina Facebook
  if (!isOnFacebookPage) {
    return null;
  }

  return (
    <>
      {/* Facebook Pixel Base Code */}
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: initPixelScript(),
        }}
      />

      {/* Noscript fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${FB_CONFIG.PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

/**
 * Estrae il nome del contenuto dal path della thank you page
 */
function getContentNameFromPath(pathname: string): string {
  const pathMap: Record<string, string> = {
    '/ty/ty-it': 'Antenna Smart TV Premium IT',
    '/ty/ty-hr': 'Antenna Smart TV Premium HR',
    '/ty/ty-pl': 'Antenna Smart TV Premium PL',
    // Air Wave Smart landing pages
    '/ty/ty-fb-airwave-pl': 'Air Wave Smart PL',
    '/ty/ty-fb-airwave-hu': 'Air Wave Smart HU',
    '/ty/ty-fb-airwave-hr': 'Air Wave Smart HR',
    '/ty/ty-fb-airwave-cs': 'Air Wave Smart CS',
  };

  return pathMap[pathname] || 'Product';
}

/**
 * Estrae l'ID prodotto dal path della thank you page
 */
function getProductIdFromPath(pathname: string): string {
  const idMap: Record<string, string> = {
    '/ty/ty-it': 'antenna-tv-it',
    '/ty/ty-hr': 'antenna-tv-hr',
    '/ty/ty-pl': 'antenna-tv-pl',
    // Air Wave Smart landing pages
    '/ty/ty-fb-airwave-pl': 'airwave-smart-pl',
    '/ty/ty-fb-airwave-hu': 'airwave-smart-hu',
    '/ty/ty-fb-airwave-hr': 'airwave-smart-hr',
    '/ty/ty-fb-airwave-cs': 'airwave-smart-cs',
  };

  return idMap[pathname] || 'product';
}
