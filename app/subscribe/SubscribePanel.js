'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { loadCheckout } from '@/lib/cashfree';
import { config } from '@/lib/config';
import { formatDate, formatInr, formatPaise, plural } from '@/lib/format';
import { verifyFailureNotice } from '@/lib/paymentNotice';
import { useSession } from '@/lib/session';

const BADGES = {
  trial: { className: 'badge badge-trial', label: 'Free trial' },
  active: { className: 'badge badge-active', label: 'Active' },
  expired: { className: 'badge badge-expired', label: 'Expired' },
};

/**
 * The paid part of the site: shows what the API says about this garage's
 * subscription and pays for another month through Cashfree.
 *
 * The browser never decides whether access is granted. It reports which order
 * to look at; the API asks Cashfree whether that order was paid and answers
 * with the new state.
 */
export function SubscribePanel() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const session = useSession();
  const signedIn = Boolean(session);

  // Cashfree sends the owner back here as ...?order_id=... after a redirect.
  const returnedOrderId = useSearchParams().get('order_id');

  const [notice, setNotice] = useState(null);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (session === null) router.replace('/login?next=subscribe');
  }, [session, router]);

  const subscription = useQuery({
    queryKey: ['subscription'],
    queryFn: () => apiFetch('/subscription'),
    enabled: signedIn,
  });

  const payments = useQuery({
    queryKey: ['subscription', 'payments'],
    queryFn: () => apiFetch('/subscription/payments'),
    enabled: signedIn,
  });

  useEffect(() => {
    if (subscription.error?.status === 401) router.replace('/login?next=subscribe');
  }, [subscription.error, router]);

  const verify = useMutation({
    mutationFn: (orderId) =>
      apiFetch('/subscription/verify', {
        method: 'POST',
        // Money may already have moved: keep the owner here even if the token lapsed.
        signOutOn401: false,
        body: { orderId },
      }),
    onSuccess: (state) => {
      queryClient.setQueryData(['subscription'], state);
      queryClient.invalidateQueries({ queryKey: ['subscription', 'payments'] });
      router.push(`/subscribe/success?until=${encodeURIComponent(state.subscribedUntil ?? '')}`);
    },
    onError: (error, orderId) => {
      setPaying(false);
      setNotice(verifyFailureNotice(error, orderId));
    },
  });

  // Confirm a payment the owner was redirected back from, once.
  const confirmed = useRef(false);
  const verifyMutate = verify.mutate;
  useEffect(() => {
    if (!signedIn || !returnedOrderId || confirmed.current) return;
    confirmed.current = true;
    verifyMutate(returnedOrderId);
  }, [signedIn, returnedOrderId, verifyMutate]);

  async function pay() {
    setNotice(null);
    setPaying(true);
    try {
      const order = await apiFetch('/subscription/orders', { method: 'POST', body: {} });
      const Cashfree = await loadCheckout();

      const result = await Cashfree({ mode: order.mode }).checkout({
        paymentSessionId: order.paymentSessionId,
        redirectTarget: '_modal',
      });

      // A closed window or a declined card is not a failure of ours: Cashfree
      // reports it here, and nothing has been charged.
      if (result?.error) {
        setPaying(false);
        setNotice({
          tone: 'warning',
          text: `${result.error.message || 'The payment was not completed.'} Nothing has been charged.`,
        });
        return;
      }

      // `redirect` means the bank took over the window; the return_url brings
      // the owner back here with ?order_id=... and the effect above confirms it.
      if (result?.redirect) return;

      verify.mutate(order.orderId);
    } catch (error) {
      setPaying(false);
      setNotice({ tone: 'error', text: error.message });
    }
  }

  if (!signedIn || subscription.isPending) {
    return <div className="panel-form"><p className="muted">Loading your subscription…</p></div>;
  }

  if (subscription.isError) {
    return (
      <div className="panel-form">
        <div className="alert alert-error" role="alert">{subscription.error.message}</div>
        <button type="button" className="btn btn-block" onClick={() => subscription.refetch()}>Try again</button>
      </div>
    );
  }

  const state = subscription.data;
  const badge = BADGES[state.status];
  const renewing = state.status === 'active';
  const history = payments.data?.items ?? [];
  const busy = paying || verify.isPending;

  return (
    <div className="panel-form panel-wide">
      <h1>{renewing ? 'Renew your plan' : 'Subscribe'}</h1>
      <p className="muted small">
        Signed in as {session.user?.email}. <Link href="/login?next=subscribe">Not you?</Link>
      </p>

      {notice && <div className={`alert alert-${notice.tone}`} role="alert">{notice.text}</div>}

      {state.status === 'expired' && (
        <div className="alert alert-info">
          Your app is read-only right now: all your customers, vehicles and bills are safe and visible.
          Subscribing turns editing back on immediately.
        </div>
      )}

      <div className="card" style={{ marginBottom: 24 }}>
        <div className="status-row">
          <span>Status</span>
          <span className={badge.className}>{badge.label}</span>
        </div>
        <div className="status-row">
          <span>{state.status === 'expired' ? 'Ended on' : 'Access until'}</span>
          <strong>{formatDate(state.currentPeriodEnd)}</strong>
        </div>
        {state.status !== 'expired' && (
          <div className="status-row">
            <span>Days left</span>
            <strong>{plural(state.daysLeft, 'day')}</strong>
          </div>
        )}
        <div className="status-row">
          <span>Plan</span>
          <strong>{formatInr(state.priceInr)} / {plural(state.periodMonths, 'month')}</strong>
        </div>
      </div>

      <button type="button" className="btn btn-block btn-lg" onClick={pay} disabled={busy}>
        {busy ? (
          <><span className="spinner" aria-hidden="true" /> {verify.isPending ? 'Confirming payment…' : 'Opening payment…'}</>
        ) : (
          `Pay ${formatInr(state.priceInr)} for ${plural(state.periodMonths, 'month')}`
        )}
      </button>
      <p className="muted small center" style={{ marginTop: 12 }}>
        UPI · Card · Netbanking · Wallets — secured by Cashfree. One-time payment, nothing is auto-debited.
        {renewing && ' Paying now adds a month to the days you already have.'}
      </p>

      {history.length > 0 && (
        <section id="payments" style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: '1.15rem' }}>Payment history</h2>
          {history.map((payment) => (
            <div className="status-row" key={payment.orderId}>
              <span>
                {formatDate(payment.paidAt)}
                <br />
                <span className="muted small">{payment.cfPaymentId ?? payment.orderId}</span>
              </span>
              <strong>{formatPaise(payment.amountPaise)}</strong>
            </div>
          ))}
        </section>
      )}

      <p className="muted small center" style={{ marginTop: 20, marginBottom: 0 }}>
        Questions about a payment? <Link href="/contact">Contact {config.appName}</Link>.
      </p>
    </div>
  );
}
