import { describe, expect, it } from 'vitest';
import { ApiError } from '../lib/api';
import { verifyFailureNotice } from '../lib/paymentNotice';

const ORDER_ID = 'sub_01ARZ3NDEKTSV4RRFFQ69G5FAV';

describe('when confirming a payment fails', () => {
  it('reassures the owner when the server cannot be reached', () => {
    const notice = verifyFailureNotice(new ApiError('Could not reach the server.', 0), ORDER_ID);
    expect(notice.tone).toBe('warning');
    expect(notice.text).toMatch('applied automatically');
    expect(notice.text).toMatch(ORDER_ID);
  });

  it('does not treat a lapsed sign-in as a failed payment', () => {
    const notice = verifyFailureNotice(new ApiError('Invalid token', 401), ORDER_ID);
    expect(notice.tone).toBe('warning');
    expect(notice.text).toMatch('Sign in again');
    expect(notice.text).toMatch('applied automatically');
  });

  it('shows an unpaid order as the error it is, with the id to quote', () => {
    const notice = verifyFailureNotice(new ApiError('That payment has not been completed.', 400), ORDER_ID);
    expect(notice.tone).toBe('error');
    expect(notice.text).toMatch('That payment has not been completed.');
    expect(notice.text).toMatch(ORDER_ID);
  });

  it('never suggests money moved when Cashfree says the order was not paid', () => {
    const text = verifyFailureNotice(new ApiError('That payment has not been completed.', 400), ORDER_ID).text;
    expect(text).not.toMatch('went through');
    expect(text).not.toMatch('applied automatically');
  });

  it('never suggests money moved when the order belongs to someone else', () => {
    const notice = verifyFailureNotice(new ApiError('That payment belongs to another garage', 403), ORDER_ID);
    expect(notice.tone).toBe('error');
    expect(notice.text).not.toMatch('applied automatically');
  });
});
