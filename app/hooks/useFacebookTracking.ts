'use client';

import { useCallback } from 'react';
import { FacebookEventData, UserData } from '@/app/config/facebook';
import {
  generateEventId,
  trackPixelEvent,
  trackPageView as pixelPageView,
  trackPurchase as pixelPurchase,
  trackLead as pixelLead,
} from '@/app/lib/facebook/pixel';
import {
  getUserDataFromStorage,
  saveUserDataToStorage,
  trackLeadCAPI,
  trackPurchaseCAPI,
} from '@/app/lib/facebook/capi';

export interface TrackingOptions {
  eventData?: FacebookEventData;
  userData?: UserData;
  sendToCAPI?: boolean;
}

/**
 * Hook per gestire il tracking Facebook (Pixel + CAPI)
 * Uso:
 *
 * const { trackLead, trackPurchase, saveUserData } = useFacebookTracking();
 *
 * // Nel form submit
 * saveUserData({ nome, cognome, telefono, indirizzo });
 *
 * // Sulla thank you page
 * trackLead({ eventData: { content_name: 'Prodotto', value: 29.90 } });
 */
export function useFacebookTracking() {
  /**
   * Salva i dati utente per uso successivo nel tracking
   */
  const saveUserData = useCallback((userData: UserData) => {
    saveUserDataToStorage(userData);
  }, []);

  /**
   * Recupera i dati utente salvati
   */
  const getUserData = useCallback((): UserData => {
    return getUserDataFromStorage();
  }, []);

  /**
   * Traccia un PageView (solo pixel, senza CAPI)
   */
  const trackPageView = useCallback(() => {
    const eventId = generateEventId();
    pixelPageView(eventId);
    return eventId;
  }, []);

  /**
   * Traccia un evento Lead (pixel + CAPI opzionale)
   */
  const trackLead = useCallback(async (options: TrackingOptions = {}) => {
    const { eventData, userData, sendToCAPI = true } = options;
    const eventId = generateEventId();

    // Traccia con pixel (client-side)
    pixelLead(eventData, eventId);

    // Traccia con CAPI (server-side via webhook)
    if (sendToCAPI) {
      const user = userData || getUserDataFromStorage();
      await trackLeadCAPI(eventId, user, eventData);
    }

    return eventId;
  }, []);

  /**
   * Traccia un evento Purchase (pixel + CAPI opzionale)
   */
  const trackPurchase = useCallback(async (options: TrackingOptions = {}) => {
    const { eventData, userData, sendToCAPI = true } = options;
    const eventId = generateEventId();

    // Traccia con pixel (client-side)
    pixelPurchase(eventData || {}, eventId);

    // Traccia con CAPI (server-side via webhook)
    if (sendToCAPI) {
      const user = userData || getUserDataFromStorage();
      await trackPurchaseCAPI(eventId, user, eventData);
    }

    return eventId;
  }, []);

  /**
   * Traccia un evento custom (solo pixel)
   */
  const trackCustomEvent = useCallback(
    (eventName: 'AddToCart' | 'InitiateCheckout' | 'CompleteRegistration', eventData?: FacebookEventData) => {
      const eventId = generateEventId();
      trackPixelEvent(eventName, eventData, eventId);
      return eventId;
    },
    []
  );

  return {
    saveUserData,
    getUserData,
    trackPageView,
    trackLead,
    trackPurchase,
    trackCustomEvent,
    generateEventId,
  };
}

export default useFacebookTracking;
