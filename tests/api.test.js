import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, apiFetch } from '../lib/api';
import { clearSession, getSession, saveSession } from '../lib/session';

/** A sessionStorage that behaves like the browser's, including throwing. */
function fakeStorage({ throws = false } = {}) {
  const store = new Map();
  return {
    getItem: (key) => {
      if (throws) throw new Error('blocked');
      return store.get(key) ?? null;
    },
    setItem: (key, value) => {
      if (throws) throw new Error('blocked');
      store.set(key, value);
    },
    removeItem: (key) => {
      if (throws) throw new Error('blocked');
      store.delete(key);
    },
  };
}

const jsonResponse = (status, body) => ({ ok: status >= 200 && status < 300, status, json: async () => body });

beforeEach(() => {
  vi.stubGlobal('sessionStorage', fakeStorage());
  vi.stubGlobal('window', globalThis);
  clearSession();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('apiFetch', () => {
  it('unwraps the { success, data } envelope and sends the token', async () => {
    saveSession({ accessToken: 'token-123', user: { email: 'owner@garage.in' } });
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(200, { success: true, data: { status: 'trial' } }));
    vi.stubGlobal('fetch', fetchMock);

    const data = await apiFetch('/subscription');

    expect(data).toEqual({ status: 'trial' });
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toMatch('/api/v1/subscription');
    expect(options.headers.Authorization).toBe('Bearer token-123');
    expect(options.body).toBeUndefined();
  });

  it('sends JSON bodies and never a garageId', async () => {
    saveSession({ accessToken: 'token-123', user: {} });
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(201, { success: true, data: { orderId: 'order_abc' } }));
    vi.stubGlobal('fetch', fetchMock);

    await apiFetch('/subscription/orders', { method: 'POST', body: {} });

    const [, options] = fetchMock.mock.calls[0];
    expect(options.method).toBe('POST');
    expect(options.headers['Content-Type']).toBe('application/json');
    expect(options.body).toBe('{}');
    expect(options.body).not.toMatch('garageId');
  });

  it('refuses to call an authenticated route with no session', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const error = await apiFetch('/subscription').catch((err) => err);

    expect(error).toBeInstanceOf(ApiError);
    expect(error.status).toBe(401);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('signs out when the token is rejected', async () => {
    saveSession({ accessToken: 'expired', user: {} });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse(401, { success: false, error: { message: 'Invalid token' } })));

    const error = await apiFetch('/subscription').catch((err) => err);

    expect(error.status).toBe(401);
    expect(getSession()).toBeNull();
  });

  it('keeps the message and status of a rejected payment', async () => {
    const body = { success: false, error: { message: 'Payment could not be verified.', details: { field: 'signature' } } };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse(400, body)));

    const error = await apiFetch('/subscription/verify', { method: 'POST', body: {}, auth: false }).catch((err) => err);

    expect(error.message).toBe('Payment could not be verified.');
    expect(error.status).toBe(400);
    expect(error.details).toEqual({ field: 'signature' });
  });

  it('reports a network failure as status 0, not a crash', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));

    const error = await apiFetch('/subscription', { auth: false }).catch((err) => err);

    expect(error.status).toBe(0);
    expect(error.message).toMatch('Could not reach the server');
  });

  it('survives a response that is not JSON', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 502,
      json: async () => {
        throw new SyntaxError('Unexpected token');
      },
    }));

    const error = await apiFetch('/subscription', { auth: false }).catch((err) => err);

    expect(error.status).toBe(502);
    expect(error.message).toBe('Request failed (502)');
  });
});

describe('session storage', () => {
  it('keeps the token only for this tab and returns the same object each read', () => {
    saveSession({ accessToken: 'token-123', user: { email: 'owner@garage.in' } });
    expect(getSession()).toBe(getSession());
    expect(getSession().user.email).toBe('owner@garage.in');
    clearSession();
    expect(getSession()).toBeNull();
  });

  it('treats blocked storage as signed out instead of throwing', () => {
    vi.stubGlobal('sessionStorage', fakeStorage({ throws: true }));
    expect(() => saveSession({ accessToken: 'x', user: {} })).not.toThrow();
    expect(getSession()).toBeNull();
    expect(() => clearSession()).not.toThrow();
  });

  it('ignores corrupted stored data', () => {
    sessionStorage.setItem('garage.website.session', '{not json');
    expect(getSession()).toBeNull();
  });
});
