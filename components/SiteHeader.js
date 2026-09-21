import Link from 'next/link';
import { Wordmark } from './Logo';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="brand" aria-label="SpannerBook home">
          <Wordmark />
        </Link>
        <nav className="nav">
          <Link href="/#features" className="nav-hide-sm">Why SpannerBook</Link>
          <Link href="/#pricing" className="nav-hide-sm">Pricing</Link>
          <Link href="/#faq" className="nav-hide-sm">FAQ</Link>
          <Link href="/login" className="nav-hide-sm">Sign in</Link>
          <Link href="/subscribe" className="btn">Subscribe</Link>
        </nav>
      </div>
    </header>
  );
}
