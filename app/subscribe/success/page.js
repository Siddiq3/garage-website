import { Suspense } from 'react';
import { SuccessMessage } from './SuccessMessage';

export const metadata = { title: 'Payment received', description: 'Your SpannerBook subscription is active.' };

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="panel"><p className="muted">Loading…</p></div>}>
      <SuccessMessage />
    </Suspense>
  );
}
