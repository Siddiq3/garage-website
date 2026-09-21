/**
 * What to tell the owner when `POST /subscription/verify` fails *after*
 * checkout. Nothing here grants access — the webhook applies the payment on the
 * backend — so a message only reassures when the money really did move, and
 * always gives the order id to quote.
 */
export function verifyFailureNotice(error, orderId) {
  const reference = `Order id: ${orderId}.`;

  if (error.status === 0) {
    return {
      tone: 'warning',
      text: `We could not reach the server to confirm your payment. If it went through, it is applied automatically within a minute — refresh this page. ${reference}`,
    };
  }

  if (error.status === 401) {
    return {
      tone: 'warning',
      text: `Your sign-in timed out while we confirmed the payment. Sign in again to see the new date — a completed payment is applied automatically. ${reference}`,
    };
  }

  // 400 from the API means Cashfree says this order was not paid, so nothing
  // here may suggest that it was.
  return { tone: 'error', text: `${error.message} ${reference} Keep this id if you need to contact us.` };
}
