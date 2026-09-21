import Link from 'next/link';
import { config } from '@/lib/config';

export const metadata = {
  title: 'Privacy policy',
  description:
    'What SpannerBook collects, why, who it is shared with, how long it is kept, and the rights you have over it.',
};

const SECTIONS = [
  ['scope', 'Who this policy is for'],
  ['definitions', 'Words used in this policy'],
  ['collect', 'What we collect'],
  ['not-collect', 'What we do not collect'],
  ['use', 'Why we use it'],
  ['customers', 'Your customers’ information'],
  ['cookies', 'Cookies and tracking'],
  ['sharing', 'Who else sees it'],
  ['storage', 'Where it is stored'],
  ['retention', 'How long we keep it'],
  ['security', 'How it is protected'],
  ['rights', 'Your rights'],
  ['children', 'Children'],
  ['changes', 'Changes to this policy'],
  ['grievance', 'Complaints and contact'],
];

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="container prose">
        <h1>Privacy policy</h1>
        <p className="updated">Last updated: {config.policyUpdated}</p>

        <p>
          {config.businessName} runs the {config.appName} mobile app and this website. This policy explains,
          in plain words, what information we hold, why we hold it, who else can see it, how long we keep
          it and what you can ask us to do with it. It is written to be read, not to be got past.
        </p>

        <div className="toc">
          <strong>On this page</strong>
          <ol>
            {SECTIONS.map(([id, title]) => (
              <li key={id}>
                <Link href={`#${id}`}>{title}</Link>
              </li>
            ))}
          </ol>
        </div>

        <h2 id="scope">1. Who this policy is for</h2>
        <p>
          It covers everyone who uses {config.appName}: garage owners and their staff who use the mobile
          app, and anyone who visits this website or pays for a subscription here. It does not cover other
          companies’ websites or apps, even where we link to them.
        </p>
        <p>
          For your garage’s own account details, {config.businessName} decides how the information is used,
          and is what Indian law calls the <strong>data fiduciary</strong>. For the customer and vehicle
          records you type into the app, you decide — see <Link href="#customers">section 6</Link>.
        </p>

        <h2 id="definitions">2. Words used in this policy</h2>
        <table>
          <tbody>
            <tr>
              <th>Account information</th>
              <td>What identifies your garage and you as its owner: garage name, your name, email, phone.</td>
            </tr>
            <tr>
              <th>Garage records</th>
              <td>What you enter while working: customers, vehicles, job cards, parts, labour, bills, payments and staff.</td>
            </tr>
            <tr>
              <th>Personal data</th>
              <td>Any information that identifies a living person, whether that is you, your staff or your customers.</td>
            </tr>
            <tr>
              <th>Processing</th>
              <td>Anything done with information: storing, reading, changing, sharing or deleting it.</td>
            </tr>
            <tr>
              <th>Data fiduciary</th>
              <td>Whoever decides why and how personal data is used. Under the Digital Personal Data Protection Act, 2023, that is us for your account and you for your customers’ records.</td>
            </tr>
          </tbody>
        </table>

        <h2 id="collect">3. What we collect</h2>

        <h3>3.1 Your account</h3>
        <table>
          <tbody>
            <tr>
              <th>Garage name</th>
              <td>Shown on your bills and in the app.</td>
            </tr>
            <tr>
              <th>Owner name, email, phone</th>
              <td>To identify the account, to sign you in, and to reach you about payments or problems.</td>
            </tr>
            <tr>
              <th>Garage address</th>
              <td>Optional. Only if you enter it.</td>
            </tr>
            <tr>
              <th>Password</th>
              <td>
                Stored only as a bcrypt hash. We cannot read it, and nobody at {config.businessName} can
                tell you what it is — a forgotten password is reset, never recovered.
              </td>
            </tr>
          </tbody>
        </table>

        <h3>3.2 The records you enter</h3>
        <p>
          Customers (name, phone, address, notes), vehicles (registration number, make, model, year, fuel,
          VIN, odometer), job cards (the complaint, the work done, which mechanic did it, parts and labour
          and other charges, the status), payments recorded against a job, and staff records (name, phone,
          role, salary and salary payments). This is your business’s own data, held for you.
        </p>

        <h3>3.3 Subscription and payments</h3>
        <p>
          The date your free trial ends, the date your access runs to, and one record per payment
          containing the order id, the payment id returned by our payment gateway, the amount and the date.
          <strong> No card number, UPI id, CVV or bank password ever reaches our servers</strong> — see{' '}
          <Link href="#sharing">section 8</Link>.
        </p>

        <h3>3.4 Technical information</h3>
        <p>
          Our hosting provider records ordinary request logs, which include the IP address a request came
          from, the time, and which page or endpoint was asked for. We keep short-lived counters used to
          block password-guessing: these hold a one-way hash of the email address or IP address being
          limited, never the address itself, and they delete themselves automatically when the window
          closes.
        </p>
        <p>
          When something goes wrong on the server we log the error type, the message and the route. We do
          not log request bodies, passwords, tokens or payment details — this is enforced in the code, not
          just a promise.
        </p>

        <h2 id="not-collect">4. What we do not collect</h2>
        <ul>
          <li>Card numbers, UPI ids, CVVs or bank credentials.</li>
          <li>Your location. The app asks for no location permission at all.</li>
          <li>Your contacts, photos, camera, microphone or files. The app requests no device permissions.</li>
          <li>Advertising identifiers. We run no advertising and sell nothing to advertisers.</li>
          <li>Analytics about how you move around the website. There is no analytics script on this site.</li>
          <li>Anything about people who merely visit this website without signing in, beyond the server logs above.</li>
        </ul>

        <h2 id="use">5. Why we use it</h2>
        <table>
          <thead>
            <tr>
              <th>What we do</th>
              <th>Why</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Run the app and keep your records</td>
              <td>It is the service you asked for. Without it there is no product.</td>
            </tr>
            <tr>
              <td>Sign you in and keep the session alive</td>
              <td>To make sure only your garage can reach your garage’s records.</td>
            </tr>
            <tr>
              <td>Take subscription payments and grant access</td>
              <td>To perform the contract you entered when you subscribed.</td>
            </tr>
            <tr>
              <td>Email or call you about your account</td>
              <td>To tell you about a payment, an outage or a change that affects you.</td>
            </tr>
            <tr>
              <td>Block password guessing and abuse</td>
              <td>To protect your account and keep the service available for everyone.</td>
            </tr>
            <tr>
              <td>Keep payment records</td>
              <td>Indian tax and accounting law requires us to.</td>
            </tr>
          </tbody>
        </table>
        <p>
          We do not use your records to train machine-learning models, we do not sell data to anyone, and
          we do not profile you.
        </p>

        <h2 id="customers">6. Your customers’ information</h2>
        <p>
          The names, phone numbers and vehicle details you type in belong to your business relationship
          with those people, not to ours. You decide what to collect and why; we store and process it on
          your instruction, and we do not use it for any purpose of our own.
        </p>
        <p>
          That means two things in practice. First, if one of your customers asks you to delete their
          details, you can do that in the app, and if you need our help we will do it. Second, telling your
          customers that you keep their details, and having a lawful reason to do so, is your
          responsibility as the garage.
        </p>
        <p>
          Every garage’s records are separated at the database level: the garage is part of the storage key,
          and it is taken from your signed-in session rather than from anything a browser or app could ask
          for. One garage cannot read another’s records.
        </p>

        <h2 id="cookies">7. Cookies and tracking</h2>
        <p>
          <strong>This website sets no cookies and runs no tracking or analytics scripts.</strong> There is
          no consent banner because there is nothing to consent to.
        </p>
        <p>
          When you sign in here to pay, your session token is held in your browser’s <em>sessionStorage</em>,
          which is cleared when you close the tab. It is not a cookie, it is not sent to other sites, and it
          never leaves your browser except back to our own API.
        </p>
        <p>
          In the mobile app, your sign-in tokens are kept in the device’s secure storage — the Android
          Keystore or the iOS Keychain — and are removed when you sign out.
        </p>

        <h2 id="sharing">8. Who else sees it</h2>
        <p>Three companies, each for one job, and nobody else:</p>
        <table>
          <thead>
            <tr>
              <th>Who</th>
              <th>What they get</th>
              <th>Why</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cashfree Payments</td>
              <td>Your name, email, phone and the amount, when you start a payment. They collect the card or UPI details directly; we never see them.</td>
              <td>To take the payment.</td>
            </tr>
            <tr>
              <td>Amazon Web Services</td>
              <td>Everything, as the host. AWS does not use it and cannot read our database on its own account.</td>
              <td>To run the servers and store the database, in India.</td>
            </tr>
            <tr>
              <td>Google (Play Store) / Apple (App Store)</td>
              <td>Nothing from your records. They only know you installed an app.</td>
              <td>To distribute the app.</td>
            </tr>
          </tbody>
        </table>
        <p>
          We will also disclose information if a court or a law-enforcement authority lawfully requires it,
          or where it is necessary to investigate fraud or a threat to someone’s safety. If our business is
          ever sold or merged, your records would pass to the buyer under this same policy, and we would
          tell you before that happened.
        </p>
        <p>
          <strong>We do not sell, rent or trade your data, or your customers’ data, to anyone.</strong>
        </p>

        <h2 id="storage">9. Where it is stored</h2>
        <p>
          On Amazon Web Services in the Mumbai region (ap-south-1). Your records stay in India. Cashfree is
          an Indian payment gateway and processes payments in India.
        </p>

        <h2 id="retention">10. How long we keep it</h2>
        <table>
          <thead>
            <tr>
              <th>What</th>
              <th>How long</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Your account and garage records</td>
              <td>While your account exists. Ask us to close it and we delete them within 30 days.</td>
            </tr>
            <tr>
              <td>Payment records</td>
              <td>At least eight years after the payment, because tax and accounting law requires it. These are kept even after an account is closed.</td>
            </tr>
            <tr>
              <td>Sign-in sessions</td>
              <td>Until you sign out, or until the token expires — at most 30 days — after which the record deletes itself.</td>
            </tr>
            <tr>
              <td>Rate-limit counters</td>
              <td>15 minutes to an hour, then deleted automatically. They hold hashes, not addresses.</td>
            </tr>
            <tr>
              <td>Server logs</td>
              <td>Kept by our hosting provider for a short period for troubleshooting and security.</td>
            </tr>
          </tbody>
        </table>

        <h2 id="security">11. How it is protected</h2>
        <ul>
          <li>Everything travels over HTTPS. There is no unencrypted route into the service.</li>
          <li>Passwords are stored as bcrypt hashes and are never logged, emailed or shown.</li>
          <li>
            Every request must carry a signed token that names your garage; the garage is never taken from
            anything the caller can change.
          </li>
          <li>Sign-in tokens can be revoked: signing out ends the session on our servers, not just on your device.</li>
          <li>Repeated failed sign-ins are rate limited, per account and per address.</li>
          <li>Payment confirmations are verified with the gateway itself, and the same payment can never be applied twice.</li>
          <li>Errors are logged without request bodies, so a mistyped password cannot end up in a log file.</li>
        </ul>
        <p>
          No system is perfectly secure, and we will not pretend otherwise. If a breach ever affects your
          personal data we will tell you and the Data Protection Board of India as the law requires, with
          what we know and what we are doing about it.
        </p>

        <h2 id="rights">12. Your rights</h2>
        <p>Under the Digital Personal Data Protection Act, 2023, you may ask us to:</p>
        <ul>
          <li><strong>Show you</strong> what personal data we hold about you and who we have shared it with.</li>
          <li><strong>Correct</strong> anything inaccurate, incomplete or out of date.</li>
          <li><strong>Delete</strong> your data, where we are not required by law to keep it.</li>
          <li><strong>Withdraw consent</strong> you previously gave, which for most purposes means closing the account.</li>
          <li><strong>Nominate</strong> someone to exercise these rights for you if you die or cannot act.</li>
          <li><strong>Complain</strong> to us, and then to the Data Protection Board of India if our answer does not satisfy you.</li>
        </ul>
        <p>
          Write to <a href={`mailto:${config.privacyEmail}`}>{config.privacyEmail}</a> from the email address on
          the account. We answer within 30 days, usually much sooner. There is no charge.
        </p>

        <h2 id="children">13. Children</h2>
        <p>
          {config.appName} is a tool for running a business and is not meant for children. We do not
          knowingly collect personal data from anyone under 18. If you believe a child’s data has reached
          us, tell us and we will delete it.
        </p>

        <h2 id="changes">14. Changes to this policy</h2>
        <p>
          When this policy changes we update the date at the top. If a change materially affects your
          rights or how we use your data, we will email account holders rather than rely on you noticing.
          Past versions are available on request.
        </p>

        <h2 id="grievance">15. Complaints and contact</h2>
        <p>
          For anything about your privacy — a request, a question or a complaint — contact our grievance
          officer, published here as the Information Technology Rules require:
        </p>
        <table>
          <tbody>
            <tr>
              <th>Grievance Officer</th>
              <td>{config.grievanceOfficer}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td><a href={`mailto:${config.privacyEmail}`}>{config.privacyEmail}</a></td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{config.supportPhone}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{config.businessName}, {config.businessAddress}</td>
            </tr>
            <tr>
              <th>Answer within</th>
              <td>30 days, and we acknowledge within 72 hours</td>
            </tr>
          </tbody>
        </table>
        <p>
          If you are not satisfied with our answer you may escalate to the Data Protection Board of India.
          This policy is governed by the laws of India.
        </p>
        <p className="updated">
          See also our <Link href="/terms">terms of service</Link> and{' '}
          <Link href="/refunds">refund policy</Link>.
        </p>
      </div>
    </section>
  );
}
