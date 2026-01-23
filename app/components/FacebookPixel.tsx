'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { FB_CONFIG } from '@/app/config/facebook';
import {
  initPixelScript,
  trackPageView,
  trackPurchase,
  trackViewContent,
  generateEventId,
  getFbp,
  getFbc,
} from '@/app/lib/facebook/pixel';
import { getUserDataFromStorage, trackPurchaseCAPI } from '@/app/lib/facebook/capi';

// Storage key per prevenire tracking duplicati
const PURCHASE_TRACKED_KEY = 'fb_purchase_tracked';

/**
 * Verifica se il pathname è una landing page (fb-*, uc-*, dongle, dongle_pl)
 */
function isLandingPage(pathname: string | null): boolean {
  if (!pathname) return false;
  return pathname.startsWith('/fb-') || pathname.startsWith('/uc-') || pathname.startsWith('/id-') || pathname === '/dongle' || pathname === '/dongle_pl';
}

/**
 * Verifica se il pathname è una thank you page tracciata (fb-*, uc-*, ty-it, ty-pl)
 */
function isFacebookThankYouPage(pathname: string | null): boolean {
  if (!pathname) return false;
  return pathname.startsWith('/ty/ty-fb-') || pathname.startsWith('/ty/ty-uc-') || pathname.startsWith('/ty/ty-id-') || pathname === '/ty/ty-it' || pathname === '/ty/ty-pl';
}

/**
 * Verifica se dobbiamo caricare il pixel (landing o thank you)
 */
function shouldLoadPixel(pathname: string | null): boolean {
  if (!pathname) return false;
  return isLandingPage(pathname) || isFacebookThankYouPage(pathname);
}

/**
 * Controlla se il purchase è già stato tracciato per questa sessione
 */
function isPurchaseAlreadyTracked(pathname: string): boolean {
  if (typeof window === 'undefined') return false;
  const tracked = sessionStorage.getItem(PURCHASE_TRACKED_KEY);
  return tracked === pathname;
}

/**
 * Segna il purchase come tracciato per questa sessione
 */
function markPurchaseAsTracked(pathname: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(PURCHASE_TRACKED_KEY, pathname);
}

export default function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Verifica se dobbiamo caricare il pixel
  const shouldLoad = shouldLoadPixel(pathname);

  useEffect(() => {
    console.log('[FB Pixel] Component mounted, pathname:', pathname);
    console.log('[FB Pixel] Should load pixel:', shouldLoad);

    if (!shouldLoad) {
      console.log('[FB Pixel] Skipping tracking - not a tracked page');
      return;
    }

    const eventId = generateEventId();
    console.log('[FB Pixel] Tracking PageView with eventId:', eventId);
    trackPageView(eventId);

    // Se siamo su una landing page (fb-* o uc-*), traccia ViewContent
    if (isLandingPage(pathname)) {
      console.log('[FB Pixel] === LANDING PAGE DETECTED ===');
      const viewContentEventId = generateEventId();
      const priceData = getPriceDataFromLandingPath(pathname);
      const viewContentData = {
        content_name: getContentNameFromLandingPath(pathname),
        content_category: 'landing_page',
        content_ids: getProductIdFromLandingPath(pathname),
        content_type: 'product',
        currency: priceData.currency,
        value: priceData.value,
      };
      console.log('[FB Pixel] ViewContent event data:', viewContentData);
      trackViewContent(viewContentData, viewContentEventId);
    }

    // Se siamo su una thank you page Facebook (/ty/ty-fb-*), traccia Purchase
    if (isFacebookThankYouPage(pathname)) {
      console.log('[FB Pixel] === THANK YOU PAGE DETECTED ===');
      console.log('[FB Pixel] Path:', pathname);

      // Controlla se già tracciato (prevenzione duplicati al refresh)
      if (isPurchaseAlreadyTracked(pathname)) {
        console.log('[FB Pixel] Purchase already tracked for this session, skipping...');
        return;
      }

      const purchaseEventId = generateEventId();
      const purchasePriceData = getPriceDataFromPath(pathname);

      const eventData = {
        content_name: getContentNameFromPath(pathname),
        content_category: 'landing_page',
        content_ids: getProductIdFromPath(pathname),
        content_type: 'product',
        currency: purchasePriceData.currency,
        value: purchasePriceData.value,
        quantity: 1,
      };

      console.log('[FB Pixel] Purchase event data:', eventData);
      console.log('[FB Pixel] Purchase eventId:', purchaseEventId);

      // Traccia Purchase con il pixel (client-side)
      trackPurchase(eventData, purchaseEventId);

      // Traccia Purchase via CAPI (server-side via webhook) - stesso evento del client per deduplicazione
      const userData = getUserDataFromStorage();
      console.log('[FB Pixel] User data from storage:', userData);

      trackPurchaseCAPI(purchaseEventId, userData, eventData).then((success: boolean) => {
        console.log('[FB CAPI] Purchase event sent to webhook:', success ? 'SUCCESS' : 'FAILED');
      });

      // Segna come tracciato per prevenire duplicati
      markPurchaseAsTracked(pathname);

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
  }, [pathname, searchParams, shouldLoad]);

  // NON renderizzare lo script del pixel se non necessario
  if (!shouldLoad) {
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
    // Dongle landing pages thank you
    '/ty/ty-it': 'Antenna Smart TV Premium IT',
    '/ty/ty-pl': 'Antenna Smart TV Premium PL',
    '/ty/ty-hr': 'Antenna Smart TV Premium HR',
    // Air Wave Smart landing pages
    '/ty/ty-fb-airwave-pl': 'Air Wave Smart PL',
    '/ty/ty-fb-airwave-hu': 'Air Wave Smart HU',
    '/ty/ty-fb-airwave-hr': 'Air Wave Smart HR',
    '/ty/ty-fb-airwave-cs': 'Air Wave Smart CS',
    // Robot landing pages
    '/ty/ty-uc-robot-hu': 'NovaClean X1 PRO HU',
    '/ty/ty-uc-robot-cs': 'NovaClean X1 PRO CS',
    '/ty/ty-uc-robot-si': 'NovaClean X1 PRO SI',
    '/ty/ty-uc-robot-it': 'NovaClean X1 PRO IT',
    // Dryer landing pages
    '/ty/ty-uc-dryer-es': 'Costway Dryer 800W ES',
    '/ty/ty-uc-dryer-pt': 'Costway Dryer 800W PT',
    '/ty/ty-uc-dryer-lt': 'Costway Dryer 800W LT',
    // ID Airwave landing pages
    '/ty/ty-id-airwave-it': 'Air Wave Smart IT',
    '/ty/ty-id-airwave-pl': 'Air Wave Smart PL',
    '/ty/ty-id-airwave-lt': 'Air Wave Smart LT',
    // ID Robot landing pages
    '/ty/ty-id-robot-bg': 'NovaClean X1 PRO BG',
    '/ty/ty-id-robot-gr': 'NovaClean X1 PRO GR',
    '/ty/ty-id-robot-hr': 'NovaClean X1 PRO HR',
  };

  return pathMap[pathname] || 'Product';
}

/**
 * Estrae l'ID prodotto dal path della thank you page
 */
function getProductIdFromPath(pathname: string): string {
  const idMap: Record<string, string> = {
    // Dongle landing pages thank you
    '/ty/ty-it': 'antenna-tv-it',
    '/ty/ty-pl': 'antenna-tv-pl',
    '/ty/ty-hr': 'antenna-tv-hr',
    // Air Wave Smart landing pages
    '/ty/ty-fb-airwave-pl': 'airwave-smart-pl',
    '/ty/ty-fb-airwave-hu': 'airwave-smart-hu',
    '/ty/ty-fb-airwave-hr': 'airwave-smart-hr',
    '/ty/ty-fb-airwave-cs': 'airwave-smart-cs',
    // Robot landing pages
    '/ty/ty-uc-robot-hu': 'novaclean-x1-pro-hu',
    '/ty/ty-uc-robot-cs': 'novaclean-x1-pro-cs',
    '/ty/ty-uc-robot-si': 'novaclean-x1-pro-si',
    '/ty/ty-uc-robot-it': 'novaclean-x1-pro-it',
    // Dryer landing pages
    '/ty/ty-uc-dryer-es': 'costway-dryer-800w-es',
    '/ty/ty-uc-dryer-pt': 'costway-dryer-800w-pt',
    '/ty/ty-uc-dryer-lt': 'costway-dryer-800w-lt',
    // ID Airwave landing pages
    '/ty/ty-id-airwave-it': 'airwave-smart-it',
    '/ty/ty-id-airwave-pl': 'airwave-smart-pl',
    '/ty/ty-id-airwave-lt': 'airwave-smart-lt',
    // ID Robot landing pages
    '/ty/ty-id-robot-bg': 'novaclean-x1-pro-bg',
    '/ty/ty-id-robot-gr': 'novaclean-x1-pro-gr',
    '/ty/ty-id-robot-hr': 'novaclean-x1-pro-hr',
  };

  return idMap[pathname] || 'product';
}

/**
 * Estrae il nome del contenuto dal path della landing page
 */
function getContentNameFromLandingPath(pathname: string): string {
  const pathMap: Record<string, string> = {
    // Dongle landing pages
    '/dongle': 'Antenna Smart TV Premium IT',
    '/dongle_pl': 'Antenna Smart TV Premium PL',
    // Facebook landing pages
    '/fb-airwave-pl': 'Air Wave Smart PL',
    '/fb-airwave-hu': 'Air Wave Smart HU',
    '/fb-airwave-hr': 'Air Wave Smart HR',
    '/fb-airwave-cs': 'Air Wave Smart CS',
    // Uncapped Airwave landing pages
    '/uc-airwave-pl': 'Air Wave Smart PL',
    '/uc-airwave-hu': 'Air Wave Smart HU',
    '/uc-airwave-hr': 'Air Wave Smart HR',
    '/uc-airwave-cs': 'Air Wave Smart CS',
    // Uncapped Robot landing pages
    '/uc-robot-hu': 'NovaClean X1 PRO HU',
    '/uc-robot-cs': 'NovaClean X1 PRO CS',
    '/uc-robot-si': 'NovaClean X1 PRO SI',
    '/uc-robot-it': 'NovaClean X1 PRO IT',
    // Uncapped Dryer landing pages
    '/uc-dryer-es': 'Costway Dryer 800W ES',
    '/uc-dryer-pt': 'Costway Dryer 800W PT',
    '/uc-dryer-lt': 'Costway Dryer 800W LT',
    // ID Airwave landing pages
    '/id-airwave-it': 'Air Wave Smart IT',
    '/id-airwave-pl': 'Air Wave Smart PL',
    '/id-airwave-lt': 'Air Wave Smart LT',
    // ID Robot landing pages
    '/id-robot-bg': 'NovaClean X1 PRO BG',
    '/id-robot-gr': 'NovaClean X1 PRO GR',
    '/id-robot-hr': 'NovaClean X1 PRO HR',
  };

  return pathMap[pathname] || 'Product';
}

/**
 * Estrae l'ID prodotto dal path della landing page
 */
function getProductIdFromLandingPath(pathname: string): string {
  const idMap: Record<string, string> = {
    // Dongle landing pages
    '/dongle': 'antenna-tv-it',
    '/dongle_pl': 'antenna-tv-pl',
    // Facebook landing pages
    '/fb-airwave-pl': 'airwave-smart-pl',
    '/fb-airwave-hu': 'airwave-smart-hu',
    '/fb-airwave-hr': 'airwave-smart-hr',
    '/fb-airwave-cs': 'airwave-smart-cs',
    // Uncapped Airwave landing pages
    '/uc-airwave-pl': 'airwave-smart-pl',
    '/uc-airwave-hu': 'airwave-smart-hu',
    '/uc-airwave-hr': 'airwave-smart-hr',
    '/uc-airwave-cs': 'airwave-smart-cs',
    // Uncapped Robot landing pages
    '/uc-robot-hu': 'novaclean-x1-pro-hu',
    '/uc-robot-cs': 'novaclean-x1-pro-cs',
    '/uc-robot-si': 'novaclean-x1-pro-si',
    '/uc-robot-it': 'novaclean-x1-pro-it',
    // Uncapped Dryer landing pages
    '/uc-dryer-es': 'costway-dryer-800w-es',
    '/uc-dryer-pt': 'costway-dryer-800w-pt',
    '/uc-dryer-lt': 'costway-dryer-800w-lt',
    // ID Airwave landing pages
    '/id-airwave-it': 'airwave-smart-it',
    '/id-airwave-pl': 'airwave-smart-pl',
    '/id-airwave-lt': 'airwave-smart-lt',
    // ID Robot landing pages
    '/id-robot-bg': 'novaclean-x1-pro-bg',
    '/id-robot-gr': 'novaclean-x1-pro-gr',
    '/id-robot-hr': 'novaclean-x1-pro-hr',
  };

  return idMap[pathname] || 'product';
}

/**
 * Ottiene prezzo e valuta per ogni paese dalla landing page
 */
function getPriceDataFromLandingPath(pathname: string): { value: number; currency: string } {
  const priceMap: Record<string, { value: number; currency: string }> = {
    // Dongle landing pages
    '/dongle': { value: 39.99, currency: 'EUR' },
    '/dongle_pl': { value: 209, currency: 'PLN' },
    // Facebook landing pages
    '/fb-airwave-pl': { value: 299, currency: 'PLN' },
    '/fb-airwave-hu': { value: 27999, currency: 'HUF' },
    '/fb-airwave-hr': { value: 69.99, currency: 'EUR' },
    '/fb-airwave-cs': { value: 1799, currency: 'CZK' },
    // Uncapped Airwave landing pages
    '/uc-airwave-pl': { value: 299, currency: 'PLN' },
    '/uc-airwave-hu': { value: 27999, currency: 'HUF' },
    '/uc-airwave-hr': { value: 69.99, currency: 'EUR' },
    '/uc-airwave-cs': { value: 1799, currency: 'CZK' },
    // Uncapped Robot landing pages
    '/uc-robot-hu': { value: 29990, currency: 'HUF' },
    '/uc-robot-cs': { value: 1970, currency: 'CZK' },
    '/uc-robot-si': { value: 79, currency: 'EUR' },
    '/uc-robot-it': { value: 79, currency: 'EUR' },
    // Uncapped Dryer landing pages
    '/uc-dryer-es': { value: 79, currency: 'EUR' },
    '/uc-dryer-pt': { value: 79, currency: 'EUR' },
    '/uc-dryer-lt': { value: 69, currency: 'EUR' },
    // ID Airwave landing pages
    '/id-airwave-it': { value: 89.99, currency: 'EUR' },
    '/id-airwave-pl': { value: 299, currency: 'PLN' },
    '/id-airwave-lt': { value: 59.99, currency: 'EUR' },
    // ID Robot landing pages
    '/id-robot-bg': { value: 79, currency: 'EUR' },
    '/id-robot-gr': { value: 79, currency: 'EUR' },
    '/id-robot-hr': { value: 87, currency: 'EUR' },
  };

  return priceMap[pathname] || { value: 0, currency: 'EUR' };
}

/**
 * Ottiene prezzo e valuta per ogni paese dalla thank you page
 */
function getPriceDataFromPath(pathname: string): { value: number; currency: string } {
  const priceMap: Record<string, { value: number; currency: string }> = {
    // Dongle thank you pages
    '/ty/ty-it': { value: 39.99, currency: 'EUR' },
    '/ty/ty-pl': { value: 209, currency: 'PLN' },
    // Air Wave Smart thank you pages
    '/ty/ty-fb-airwave-pl': { value: 299, currency: 'PLN' },
    '/ty/ty-fb-airwave-hu': { value: 27999, currency: 'HUF' },
    '/ty/ty-fb-airwave-hr': { value: 69.99, currency: 'EUR' },
    '/ty/ty-fb-airwave-cs': { value: 1799, currency: 'CZK' },
    // Robot landing pages
    '/ty/ty-uc-robot-hu': { value: 29990, currency: 'HUF' },
    '/ty/ty-uc-robot-cs': { value: 1970, currency: 'CZK' },
    '/ty/ty-uc-robot-si': { value: 79, currency: 'EUR' },
    '/ty/ty-uc-robot-it': { value: 79, currency: 'EUR' },
    // Dryer landing pages
    '/ty/ty-uc-dryer-es': { value: 79, currency: 'EUR' },
    '/ty/ty-uc-dryer-pt': { value: 79, currency: 'EUR' },
    '/ty/ty-uc-dryer-lt': { value: 69, currency: 'EUR' },
    // ID Airwave thank you pages
    '/ty/ty-id-airwave-it': { value: 89.99, currency: 'EUR' },
    '/ty/ty-id-airwave-pl': { value: 299, currency: 'PLN' },
    '/ty/ty-id-airwave-lt': { value: 59.99, currency: 'EUR' },
    // ID Robot thank you pages
    '/ty/ty-id-robot-bg': { value: 79, currency: 'EUR' },
    '/ty/ty-id-robot-gr': { value: 79, currency: 'EUR' },
    '/ty/ty-id-robot-hr': { value: 87, currency: 'EUR' },
  };

  return priceMap[pathname] || { value: 0, currency: 'EUR' };
}
