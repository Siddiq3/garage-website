'use client';

import { config } from './config';
import { getAccessToken, clearSession } from './session';

/** An API failure carrying the HTTP status, so callers can react to 401/402. */
export class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

/**
 * Calls the same `/api/v1` API the mobile app uses. The response envelope is
 * `{ success, data }` or `{ success: false, error: { message, details } }`.
 * `garageId` is never sent: the tenant comes from the token.
 */
export async function apiFetch(path, { method = 'GET', body, auth = true, signOutOn401 = true } = {}) {
  const headers = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (auth) {
    const token = getAccessToken();
    if (!token) throw new ApiError('Please sign in again.', 401);
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${config.apiBaseUrl}${config.apiPrefix}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError('Could not reach the server. Check your internet connection and try again.', 0);
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    // A payment being confirmed must not throw the owner out mid-flow, so the
    // caller can keep the session and explain what happened instead.
    if (response.status === 401 && auth && signOutOn401) clearSession();
    throw new ApiError(payload?.error?.message || `Request failed (${response.status})`, response.status, payload?.error?.details);
  }
  return payload?.data;
}
