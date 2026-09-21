'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { formatDate } from '@/lib/format';

export function SuccessMessage() {
  const until = useSearchParams().get('until');

  return (
    <div className="panel center">
      <div className="success-mark" aria-hidden="true">🎉</div>
      <h1 style={{ fontSize: '1.7rem' }}>Payment received</h1>
      <p className="muted">
        Your subscription is active{until ? <> until <strong>{formatDate(until)}</strong></> : null}.
        Open the app and pull down to refresh — you can add and edit jobs again straight away.
      </p>
      <Link href="/subscribe" className="btn btn-block" style={{ marginTop: 20 }}>Back to my subscription</Link>
      <p className="muted small" style={{ marginTop: 16, marginBottom: 0 }}>
        Cashfree has emailed you a receipt. <Link href="/contact">Contact us</Link> if anything looks wrong.
      </p>
    </div>
  );
}
