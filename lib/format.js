/** ₹299 — no decimals, Indian digit grouping. */
export function formatInr(rupees) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(rupees);
}

/** Paise (what the API stores) shown as rupees. */
export const formatPaise = (paise) => formatInr(Math.round(paise) / 100);

/** "20 September 2026" — full month names read better than 20/09/2026. */
export function formatDate(iso) {
  if (!iso) return '—';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

export const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`;
