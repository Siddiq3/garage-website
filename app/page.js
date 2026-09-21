import Image from 'next/image';
import Link from 'next/link';
import { config } from '@/lib/config';
import { formatInr } from '@/lib/format';

/** The app screens fanned out under the headline, each with its own label. */
const FAN = [
  { src: '/app/login.png', alt: 'Signing in to SpannerBook', label: 'Your garage 🔧', tint: 'var(--tint-peach)', tilt: -9, lift: 26 },
  { src: '/app/dashboard.png', alt: 'The SpannerBook dashboard', label: 'Today 📊', tint: 'var(--tint-lilac)', tilt: -3, lift: 8 },
  { src: '/app/subscription.png', alt: 'The subscription screen', label: 'Billing 🧾', tint: 'var(--tint-mint)', tilt: 4, lift: 14 },
];

const PANELS = [
  {
    tint: 'var(--tint-lilac)',
    pill: 'Two taps',
    pillColour: 'var(--accent)',
    title: 'Open a job card the moment the vehicle rolls in.',
    body: 'Number plate, customer, complaint — done. Track it from received to delivered so nothing sits forgotten in the corner of the workshop.',
    shot: '/app/dashboard.png',
    alt: 'Open jobs and money due on the dashboard',
  },
  {
    tint: 'var(--tint-mint)',
    pill: 'No typing',
    pillColour: 'var(--accent)',
    title: 'Parts and work chosen by tapping, not spelling.',
    body: 'Bore work, timing chain, self motor, oil seal, clutch plate, brake shoe — hundreds of them, suggested for the vehicle in front of you. Record which mechanic did what, and keep labour as one charge on the bill.',
    shot: '/app/dashboard.png',
    alt: 'Adding parts and work to a job',
  },
  {
    tint: 'var(--tint-peach)',
    pill: 'Always adds up',
    pillColour: 'var(--accent)',
    title: 'Bills, part payments and the balance still owed.',
    body: 'Parts plus labour plus other charges, totalled by the server rather than guessed on the phone. Take part payments, and the balance is there every time the customer walks back in.',
    shot: '/app/subscription.png',
    alt: 'A bill with the balance due',
  },
];

const INCLUDED = [
  'Unlimited job cards, customers and vehicles',
  'Parts and work suggestions for cars, bikes and scooters',
  'Bills with parts, labour and other charges',
  'Payments, part payments and balance due',
  'Staff records, work history and salary payments',
  'Your data stays yours — leave whenever you like',
];

const FAQS = [
  {
    q: `What happens after the ${config.trialDays} free days?`,
    a: 'Nothing is deleted and you are never locked out. Without a subscription the app turns read-only: every customer, vehicle, job and bill stays visible. Adding and editing come back the moment you subscribe.',
  },
  {
    q: 'Why do I pay on this website and not in the app?',
    a: 'App stores take a big commission on payments made inside an app. Paying here is what keeps the price at ₹299 a month. Sign in with the same email and password you use in the app.',
  },
  {
    q: 'Which payment methods work?',
    a: 'UPI (GPay, PhonePe, Paytm), debit and credit cards, netbanking and wallets — all through Cashfree. We never see or store your card or UPI details.',
  },
  {
    q: 'Is it a recurring auto-debit?',
    a: 'No. Each payment is one-time and adds a month. Nothing is deducted automatically — you come back and pay when you want to carry on.',
  },
  {
    q: 'Can I pay before my month ends?',
    a: 'Yes. Paying early adds a month on top of the days you already have, so no days are lost.',
  },
  {
    q: 'My mechanics cannot spell the part names. Is that a problem?',
    a: 'Not at all. Parts and work are picked by tapping suggestions for that vehicle type, including detailed engine work. Typing is optional.',
  },
  {
    q: 'Does it work on a weak network?',
    a: 'The app keeps working and retries when the signal comes back. A payment recorded during a retry is never counted twice.',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>
            Run your whole garage from your phone, at just{' '}
            <span className="price-line">
              <span className="price-capsule">{formatInr(config.priceInr)}</span> 😮
            </span>
          </h1>
          <p className="lead">
            Job cards, parts, labour, bills, payments and staff work history — for car and bike
            workshops in India.
          </p>
          <div className="hero-actions">
            <Link href="/subscribe" className="btn btn-lg">Subscribe now</Link>
            <Link href="#features" className="btn btn-secondary btn-lg">See what it does</Link>
          </div>
          <p className="hero-note">
            Free for {config.trialDays} days · No card needed · Already using the app?{' '}
            <Link href="/login">Sign in</Link>
          </p>

          <div className="fan">
            {FAN.map((item) => (
              <div
                className="fan-item"
                key={item.src + item.label}
                style={{ transform: `rotate(${item.tilt}deg) translateY(-${item.lift}px)` }}
              >
                <span className="fan-label" style={{ background: item.tint }}>{item.label}</span>
                <Image className="fan-shot" src={item.src} alt={item.alt} width={430} height={470} priority />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="features">
        <div className="container">
          <div className="center" style={{ marginBottom: 44 }}>
            <h2>Garage work, made easy.</h2>
            <p className="lead">No training, no computer, no paperwork at the end of the day.</p>
          </div>

          {PANELS.map((panel) => (
            <div className="panel" key={panel.title} style={{ background: panel.tint }}>
              <div className="panel-inner">
                <div className="panel-card">
                  <span className="pill-label" style={{ background: panel.pillColour }}>{panel.pill}</span>
                  <h3>{panel.title}</h3>
                  <p>{panel.body}</p>
                </div>
                <div className="panel-figure">
                  <Image className="panel-shot" src={panel.shot} alt={panel.alt} width={430} height={470} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="pricing">
        <div className="container">
          <div className="center" style={{ marginBottom: 40 }}>
            <h2>All this for just {formatInr(config.priceInr)}.</h2>
            <p className="lead">No setup fee, no per-job charge, no commission on your bills.</p>
          </div>
          <div className="price-card">
            <span className="price-badge">First {config.trialDays} days free</span>
            <p className="price">
              {formatInr(config.priceInr)}
              <span> / month</span>
            </p>
            <p className="price-note">One-time payment each month · Nothing is auto-debited</p>
            <ul className="price-list">
              {INCLUDED.map((item) => (
                <li key={item}>
                  <span className="tick" aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/subscribe" className="btn btn-lg btn-block">Subscribe now</Link>
            <p className="price-note" style={{ marginBottom: 0 }}>UPI · Card · Netbanking — secured by Cashfree</p>
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container">
          <div className="center" style={{ marginBottom: 36 }}>
            <h2>Frequently asked.</h2>
          </div>
          <div className="faq">
            {FAQS.map((faq) => (
              <details key={faq.q}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band">
            <h2>Start with {config.trialDays} free days.</h2>
            <p className="lead">Install the app, register your garage and open your first job card today.</p>
            <div className="hero-actions">
              <Link href="/subscribe" className="btn btn-lg">Subscribe — {formatInr(config.priceInr)}/month</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
