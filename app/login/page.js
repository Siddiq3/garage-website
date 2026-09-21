import { Suspense } from 'react';
import { LoginForm } from './LoginForm';

export const metadata = {
  title: 'Sign in',
  description: 'Sign in with your SpannerBook account to subscribe or renew.',
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="panel-form"><p className="muted">Loading…</p></div>}>
      <LoginForm />
    </Suspense>
  );
}
