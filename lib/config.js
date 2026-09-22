/** Public site config. Only non-secret values belong here (Next inlines NEXT_PUBLIC_*). */
const rawApiBase = process.env.API_BASE_URL || 'http://localhost:4000';

export const config = {
  /** Backend origin without the /api/v1 suffix. */
  apiBaseUrl: rawApiBase.replace(/\/+$/, ''),
  apiPrefix: '/api/v1',
  appName: 'SpannerBook',
  priceInr: 299,
  trialDays: 3,
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@spannerbook.example',
  supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || '+91 90000 00000',
  businessName: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'SpannerBook',
  businessAddress: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || 'Hyderabad, Telangana, India',
  /** Named contact for privacy requests and complaints, as Indian IT Rules require. */
  grievanceOfficer: process.env.NEXT_PUBLIC_GRIEVANCE_OFFICER || 'The Grievance Officer',
  privacyEmail: process.env.NEXT_PUBLIC_PRIVACY_EMAIL || process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'privacy@spannerbook.example',
  policyUpdated: '21 September 2026',
};
