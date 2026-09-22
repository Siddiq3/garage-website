# SpannerBook — marketing & payments website

The public site for the SpannerBook mobile app: what the product does, what it
costs, and **where owners pay**. It is a thin client over the same
`garage-saas-backend` API the app uses — it stores nothing of its own.

Payments deliberately live here and not in the app: app stores charge a large
commission on in-app purchases of digital goods, which would not survive a ₹299
price. The app shows the subscription status and links here.

## Stack

| Piece | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16 (App Router), **plain JavaScript** | Same language as the app and backend |
| Styling | Hand-written CSS in `app/globals.css` | One set of tokens, no CSS framework to learn or upgrade |
| Fonts | Urbanist (headings) + Plus Jakarta Sans (body) via `next/font` | Rounded and friendly; self-hosted, so no request to Google at runtime |
| Motion | One `Reveal` component (IntersectionObserver) | Sections rise into view once; hover lifts on buttons and cards. Nothing loops, nothing blocks reading |
| Data | TanStack Query | Same client the app uses for the same API |
| Payments | Cashfree checkout SDK (loaded on demand, only on `/subscribe`) | Marketing pages stay free of third-party scripts |

Every route is statically pre-rendered; the authenticated parts render in the
browser.

### The logo

The SpannerBook mark is inline SVG (`components/Logo.js`), not an image: it stays
crisp at any size, takes its colours from the page, and can be animated piece by
piece. On load the cover settles, the spine wipes down, the page edges arrive one
after another and the spanner turns into place, as if it were being tightened;
pointing at the header logo gives it another small turn. All of it is transform
and opacity only, and all of it stops under `prefers-reduced-motion`.

The mark's geometry is in `shared/logo-geometry.json`, which the mobile app also
holds; `tests/logo.test.js` fails if this component stops matching it.

### The look

Light background, near-black type and buttons (`#111827`) with **number plate
yellow** (`#facc15`) as the only accent — the same palette as the app and the
logo — the price in the headline sits on a
yellow plate, buttons turn yellow on hover, and the step numbers and logo mark
are yellow on black. Warm pastel tint cards (lemon, rose, peach, lime, cream,
mint), large corner radii (18–40px) and pill buttons. Headlines are written the
way an owner would say it, with an emoji where it helps ("All this for just
₹299 😮").

There is no blue anywhere: the app's own blue was replaced here on purpose, so
the site reads as a workshop rather than a banking product.

Motion is deliberately small: a section fades and rises 18px as it scrolls in,
buttons lift 2px on hover, FAQ rows open. `prefers-reduced-motion` turns all of
it off, and a `<noscript>` rule shows everything if JavaScript never runs.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Marketing: hero, features, how it works, pricing, FAQ |
| `/login` | Sign in with the app's email and password |
| `/subscribe` | Subscription status, Cashfree payment, payment history |
| `/subscribe/success` | Confirmation after the API verifies the payment |
| `/contact` | Support email, phone, hours, address |
| `/privacy`, `/terms`, `/refunds` | Policy pages a payment gateway requires for a live account |

## Setup

```bash
npm install
cp .env.example .env.local   # point NEXT_PUBLIC_API_BASE_URL at your backend
npm run dev                  # http://localhost:3000
```

`.env.local` only holds public values — **no secret belongs in a `NEXT_PUBLIC_*`
variable**; Next inlines them into the browser bundle. Cashfree needs no key in
the browser at all: the backend returns a `paymentSessionId` and the mode
(`sandbox`/`production`), and both Cashfree credentials stay on the server.

```bash
npm run build && npm start   # production build
npm run lint
npm test                     # vitest: formatting, validation, API client, payment notices
```

## The payment flow

```
/subscribe        POST /api/v1/subscription/orders  → { orderId, paymentSessionId, mode }
  ↓ Cashfree checkout, opened in a modal (UPI / card / netbanking)
  ↓ modal closes, or the bank redirects back to /subscribe?order_id=…
POST /api/v1/subscription/verify  { orderId }       → subscription state
  ↓ success
/subscribe/success
```

Rules this site follows:

- **The browser never grants access, and is not even asked.** It reports *which
  order* to look at; the API asks Cashfree whether that order was paid, using
  the server's own credentials, and the order's tags must name the signed-in
  garage. A result faked in the browser buys nothing.
- **The webhook is the safety net.** If the browser dies between payment and
  verification, Cashfree's `PAYMENT_SUCCESS_WEBHOOK` applies the same payment on
  the backend, keyed by the order id, so access is still granted and never
  applied twice.
- **Nothing is auto-debited.** Each payment is a one-time Cashfree order that
  extends access by one month; paying early adds a month to the days remaining.
- **A closed Checkout window is not an error** — the site says nothing has been
  charged and lets the owner try again.
- **A failure after the money moves never reads like a lost payment.** If the
  network drops or the 15-minute sign-in lapses between Checkout and
  verification, the owner is kept on the page and told the payment is safe and
  applied automatically, with the payment id to quote (`lib/paymentNotice.js`).

## Sessions

Sign-in uses `POST /api/v1/auth/login` and keeps the **access token in
`sessionStorage`**, so it disappears when the tab closes. The refresh token is
never stored on the website: a payment visit is short, and an expired token just
sends the owner back to `/login`. `garageId` is never sent — the tenant comes
from the token.

## Verified end to end

Against a local backend (DynamoDB Local + `npm run dev`) with a stub Cashfree
API (`CASHFREE_API_URL`), using a real garage:

| Step | Result |
| --- | --- |
| Register → `GET /subscription` | `trial`, `canWrite: true`, 3 days left |
| Trial pushed into the past, then write | `402`; `GET /customers` still `200` |
| `POST /subscription/orders` | `201` with `orderId`, `paymentSessionId`, `mode` — and no credentials in the body |
| `POST /subscription/verify` before paying | `400` "That payment has not been completed" |
| Order paid, then verify | `200`, `active`, 30 days, writes work again |
| Verify the same order twice | Unchanged — no second month |
| `PAYMENT_SUCCESS_WEBHOOK`, valid signature | `applied: true` |
| Same webhook replayed | `applied: false` |
| Webhook with a wrong signature / wrong timestamp / none | `400` each time |
| Another garage verifying that paid order | `403` "That payment belongs to another garage" |
| Site pages `/`, `/login`, `/subscribe`, `/privacy`, `/terms`, `/refunds`, `/contact` | `200`, and no payment script on the marketing pages |
| CORS preflight from `http://localhost:3000` | allowed |

Cashfree's own checkout window needs real sandbox credentials; with placeholder
keys the API answers `502` and the site shows "Could not start the payment just
now."

## Shared files

Two things must stay identical across repositories, and neither can be imported
because each project deploys on its own:

| File | Also in | Checked by |
| --- | --- | --- |
| `shared/validation-cases.json` | backend, app | `tests/sharedContract.test.js` (digest) |
| `shared/logo-geometry.json` | app | `tests/logo.test.js` |

Both are pinned, so changing one is deliberate and the same change has to be
copied to the other repositories. See `shared/README.md`.

## Input validation

`lib/validation.js` repeats the API's rules (type → length → format, first
problem wins) with the same messages as the app's `src/validation/rules.js`.
Input is rejected, never silently trimmed or escaped, and the API validates
everything again regardless.

## Cashfree configuration

The backend holds the credentials (`CASHFREE_APP_ID`, `CASHFREE_SECRET_KEY`,
`CASHFREE_ENV`). On the Cashfree dashboard (merchant.cashfree.com):

1. **Developers → API Keys** → copy the app id and secret key into the backend
   environment. The same secret key signs webhooks, so there is no separate
   webhook secret.
2. **Developers → Webhooks** → add
   `https://<your-api>/api/v1/subscription/webhook` and subscribe to
   `PAYMENT_SUCCESS_WEBHOOK`.
3. **Whitelist this site's domain** for checkout.
4. Activation needs the live business name, address, support contact and the
   privacy/terms/refund pages — that is what `/privacy`, `/terms`, `/refunds` and
   the `NEXT_PUBLIC_BUSINESS_*` variables are for. Fill them in with real details
   before going live.

Test mode: set `CASHFREE_ENV=sandbox` and pay with Cashfree's sandbox test UPI
and card details.

## Deploying

Any Node host works (`npm run build && npm start`); Vercel needs no
configuration beyond the environment variables. Then set **`WEBSITE_URL` on the
backend** to this site's URL — that value is what the app shows and links to.

## Known limitations

- The site shows subscription state only; garage records are managed in the app.
- Registration happens in the app, so there is no sign-up form here.
- Payment history shows what `GET /subscription/payments` returns; the tax
  receipt itself is emailed by Cashfree.
