import { Plus_Jakarta_Sans, Urbanist } from 'next/font/google';
import { Providers } from './providers';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { config } from '@/lib/config';
import './globals.css';

// Urbanist for the big headlines, Plus Jakarta Sans for reading: rounded,
// geometric shapes that suit a product sold to workshop owners.
const urbanist = Urbanist({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-urbanist', display: 'swap' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-jakarta', display: 'swap' });

export const metadata = {
  title: {
    default: `${config.appName} — job cards, billing and payments for your garage`,
    template: `%s · ${config.appName}`,
  },
  description:
    'A simple mobile app for Indian garages: job cards, parts and labour, bills, payments and staff work history. Free for 3 days, then ₹299 a month.',
  openGraph: {
    title: `${config.appName} — run your garage from your phone`,
    description: 'Job cards, bills and payments for car and bike garages. Free for 3 days, then ₹299 a month.',
    type: 'website',
  },
};

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#101014' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${urbanist.variable} ${jakarta.variable}`}>
      <body>
        <Providers>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
