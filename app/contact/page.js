import { config } from '@/lib/config';

export const metadata = { title: 'Contact', description: 'Reach the SpannerBook team about the app, billing or a payment.' };

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container prose">
        <h1>Contact us</h1>
        <p>
          Questions about the app, a payment or your subscription — write or call. We reply on working
          days, usually the same day.
        </p>

        <div className="card" style={{ marginTop: 24 }}>
          <div className="status-row"><span>Email</span><strong><a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a></strong></div>
          <div className="status-row"><span>Phone</span><strong><a href={`tel:${config.supportPhone.replace(/\s/g, '')}`}>{config.supportPhone}</a></strong></div>
          <div className="status-row"><span>Hours</span><strong>Monday to Saturday, 10am – 7pm IST</strong></div>
          <div className="status-row"><span>Address</span><strong>{config.businessAddress}</strong></div>
        </div>

        <h2>About a payment</h2>
        <p>
          Include the order id (it starts with <code>sub_</code>) or the payment id from the Cashfree
          receipt email — both are on your <a href="/subscribe">subscription page</a>. That lets us find
          the payment straight away.
        </p>
      </div>
    </section>
  );
}
