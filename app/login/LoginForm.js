'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { apiFetch } from '@/lib/api';
import { config } from '@/lib/config';
import { saveSession } from '@/lib/session';
import { LIMITS, RULES, validate } from '@/lib/validation';

const RULE_SET = { email: RULES.email, password: RULES.password };

export function LoginForm() {
  const router = useRouter();
  // Only known in-site destinations, so a crafted ?next= cannot redirect elsewhere.
  const DESTINATIONS = { subscribe: '/subscribe', payments: '/subscribe#payments' };
  const next = DESTINATIONS[useSearchParams().get('next')] ?? '/subscribe';

  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [failure, setFailure] = useState(null);
  const [busy, setBusy] = useState(false);

  const set = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }));

  async function onSubmit(event) {
    event.preventDefault();
    setFailure(null);

    const found = validate(values, RULE_SET);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setBusy(true);
    try {
      const data = await apiFetch('/auth/login', { method: 'POST', body: values, auth: false });
      saveSession({ accessToken: data.accessToken, user: data.user });
      router.replace(next);
    } catch (error) {
      setFailure(error.message);
      setBusy(false);
    }
  }

  return (
    <div className="panel-form">
      <h1 style={{ fontSize: '1.7rem' }}>Sign in</h1>
      <p className="muted small">Use the same email and password as the SpannerBook app.</p>

      {failure && <div className="alert alert-error" role="alert">{failure}</div>}

      <form onSubmit={onSubmit} noValidate>
        <label className={`field ${errors.email ? 'field-error' : ''}`}>
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={set('email')}
            maxLength={LIMITS.email}
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            aria-invalid={Boolean(errors.email)}
            required
          />
          {errors.email && <span className="field-message">{errors.email}</span>}
        </label>

        <label className={`field ${errors.password ? 'field-error' : ''}`}>
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={set('password')}
            maxLength={LIMITS.password}
            autoComplete="current-password"
            aria-invalid={Boolean(errors.password)}
            required
          />
          {errors.password && <span className="field-message">{errors.password}</span>}
        </label>

        <button type="submit" className="btn btn-block btn-lg" disabled={busy}>
          {busy ? <><span className="spinner" aria-hidden="true" /> Signing in…</> : 'Sign in'}
        </button>
      </form>

      <p className="note" style={{ marginTop: 22, marginBottom: 0 }}>
        New here? Garages are registered in the {config.appName} app, not on this site — the first{' '}
        {config.trialDays} days are free. <Link href="/">See how it works</Link>, then come back here to
        subscribe.
      </p>
    </div>
  );
}
