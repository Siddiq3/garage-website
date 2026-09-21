import { Suspense } from 'react';
import { SubscribePanel } from './SubscribePanel';

export const metadata = {
  title: 'Subscribe',
  description: 'Subscribe or renew your SpannerBook plan with UPI, card or netbanking.',
};

export default function SubscribePage() {
  return (
    <Suspense fallback={<div className="panel-form"><p className="muted">Loading…</p></div>}>
      <SubscribePanel />
    </Suspense>
  );
}
