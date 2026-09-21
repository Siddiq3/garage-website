import { config } from '@/lib/config';
import { formatInr } from '@/lib/format';

export const metadata = { title: 'Terms of service', description: 'The terms for using SpannerBook.' };

export default function TermsPage() {
  return (
    <section className="section">
      <div className="container prose">
        <h1>Terms of service</h1>
        <p className="muted small">Last updated: 20 September 2026</p>

        <p>By registering for {config.appName} you agree to these terms.</p>

        <h2>The service</h2>
        <p>
          {config.appName} is software for keeping garage records: job cards, bills, payments and staff. It
          is a record-keeping tool. Tax filing, statutory invoicing and legal compliance remain your
          responsibility.
        </p>

        <h2>Free trial and subscription</h2>
        <ul>
          <li>Every new garage gets {config.trialDays} days of full access, free, with no card details required.</li>
          <li>After that a subscription costs {formatInr(config.priceInr)} per month, paid on this website.</li>
          <li>Each payment is a one-time payment that extends access by one month. Nothing is auto-debited.</li>
          <li>Paying before your access ends adds a month to the days you already have.</li>
          <li>Without an active subscription the app becomes read-only: your records stay visible and are not deleted, but you cannot add or change them.</li>
        </ul>

        <h2>Your account</h2>
        <p>
          Keep your password to yourself; anyone with it can see and change your garage&apos;s records. Tell us
          at once if you think someone else has it. You are responsible for what is entered under your
          account.
        </p>

        <h2>Acceptable use</h2>
        <p>
          Do not attempt to reach another garage&apos;s data, overload the service, or use it for anything
          unlawful. We may suspend an account that does.
        </p>

        <h2>Availability</h2>
        <p>
          We work to keep the service running at all times but cannot promise uninterrupted access.
          Maintenance, network failures and events outside our control can interrupt it.
        </p>

        <h2>Liability</h2>
        <p>
          Our liability for any claim is limited to the subscription fees you paid in the three months
          before it arose. We are not liable for lost profits or indirect losses.
        </p>

        <h2>Ending the service</h2>
        <p>
          Stop paying and access simply lapses; ask us and we will delete your account. We may end an
          account that breaks these terms, refunding any unused paid period.
        </p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of India, with courts in {config.businessAddress} having jurisdiction.</p>

        <h2>Contact</h2>
        <p><a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a> · {config.supportPhone}</p>
      </div>
    </section>
  );
}
