'use client';

import { useSyncExternalStore } from 'react';

/**
 * The signed-in owner, for the length of the browser tab only.
 *
 * Payments are a short visit — sign in, pay, leave — so the token is kept in
 * sessionStorage and disappears when the tab closes. The refresh token is never
 * stored on the website; if the access token expires the owner signs in again.
 */
const KEY = 'garage.website.session';

// The parsed session is cached so repeated reads return the same object, which
// is what useSyncExternalStore needs to avoid re-rendering forever.
let cachedRaw;
let cachedSession = null;
const listeners = new Set();

function read() {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null; // private browsing: treated as signed out
  }
}

function announce() {
  listeners.forEach((listener) => listener());
}

export function getSession() {
  if (typeof window === 'undefined') return null;
  const raw = read();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedSession = raw ? JSON.parse(raw) : null;
    } catch {
      cachedSession = null;
    }
  }
  return cachedSession;
}

export function saveSession({ accessToken, user }) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ accessToken, user }));
  } catch {
    /* the owner stays signed in for this page only */
  }
  announce();
}

export function clearSession() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* nothing to clear */
  }
  announce();
}

export const getAccessToken = () => getSession()?.accessToken ?? null;

function subscribe(listener) {
  listeners.add(listener);
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

/** The session as a React value. `undefined` while the server-rendered HTML is hydrating. */
export const useSession = () => useSyncExternalStore(subscribe, getSession, () => undefined);
