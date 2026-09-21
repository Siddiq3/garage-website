'use client';

const SDK_SRC = 'https://sdk.cashfree.com/js/v3/cashfree.js';

/**
 * Loads Cashfree's checkout SDK once, on demand — never on the marketing
 * pages. Returns the `Cashfree` factory, which is called with the mode the
 * API reports so a sandbox key never opens a live payment window.
 */
export function loadCheckout() {
  if (typeof window === 'undefined') return Promise.reject(new Error('Checkout needs a browser'));
  if (window.Cashfree) return Promise.resolve(window.Cashfree);

  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${SDK_SRC}"]`);
    const script = existing ?? document.createElement('script');
    const fail = () => reject(new Error('Could not load the payment window. Check your connection and try again.'));

    script.addEventListener('load', () => (window.Cashfree ? resolve(window.Cashfree) : fail()));
    script.addEventListener('error', fail);

    if (!existing) {
      script.src = SDK_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  });
}
