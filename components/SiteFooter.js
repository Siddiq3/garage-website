import Link from 'next/link';
import { Logo } from './Logo';
import { config } from '@/lib/config';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <span className="sb-wordmark">
          <Logo size={26} />
          © {new Date().getFullYear()} {config.businessName}
        </span>
        <nav>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/refunds">Refunds</Link>
          <Link href="/login">Sign in</Link>
        </nav>
      </div>
    </footer>
  );
}
