import { config } from '@/lib/config';
import { formatInr } from '@/lib/format';

export const metadata = { title: 'Refund policy', description: 'When SpannerBook refunds a subscription payment.' };

export default function RefundsPage() {
  return (
    <section className="section">
      <div className="container prose">
        <h1>Refund and cancellation policy</h1>
        <p className="muted small">Last updated: 20 September 2026</p>

        <h2>Try before you pay</h2>
        <p>
          Every garage gets {config.trialDays} days of full access free, so you can decide before any money
          changes hands.
        </p>

        <h2>Cancelling</h2>
        <p>
          There is nothing to cancel: each {formatInr(config.priceInr)} payment is one-time and covers one
          month. Nothing is auto-debited, so stopping simply means not paying again. Your records stay
          readable in the app.
        </p>

        <h2>When we refund</h2>
        <ul>
          <li><strong>Money taken but access not granted</strong> — full refund, or we fix the access, whichever you prefer.</li>
          <li><strong>Charged twice for the same month</strong> — the duplicate is refunded in full.</li>
          <li><strong>Refund requested within 7 days of paying</strong>, if the month is essentially unused — full refund.</li>
        </ul>
        <p>Part-used months are not refunded after those 7 days.</p>

        <h2>How to ask</h2>
        <p>
          Email <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a> with the order id
          (starting <code>sub_</code>) from your receipt or your subscription page. We reply within 2 working
          days.
        </p>

        <h2>How refunds arrive</h2>
        <p>
          Approved refunds go back to the same UPI id, card or bank account through Cashfree, normally
          within 5 to 7 working days.
        </p>
      </div>
    </section>
  );
}
