import { describe, expect, it } from 'vitest';
import { formatDate, formatInr, formatPaise, plural } from '../lib/format';

describe('money on screen', () => {
  it('shows rupees without paise', () => {
    expect(formatInr(299)).toBe('₹299');
    expect(formatInr(1299)).toBe('₹1,299');
  });

  it('converts the paise the API stores', () => {
    expect(formatPaise(29900)).toBe('₹299');
    expect(formatPaise(0)).toBe('₹0');
  });
});

describe('dates on screen', () => {
  it('spells the month out', () => {
    expect(formatDate('2026-10-20T00:00:00.000Z')).toBe('20 October 2026');
  });

  it('never shows "Invalid Date"', () => {
    expect(formatDate(null)).toBe('—');
    expect(formatDate('not a date')).toBe('—');
  });
});

describe('plural', () => {
  it('says 1 day, 2 days', () => {
    expect(plural(1, 'day')).toBe('1 day');
    expect(plural(2, 'day')).toBe('2 days');
    expect(plural(0, 'month')).toBe('0 months');
  });
});
