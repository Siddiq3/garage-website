/**
 * The SpannerBook mark: an open-end spanner set in a rounded tile.
 *
 * Inline SVG rather than an image file so it stays crisp at any size, takes its
 * colours from the page, and can be faded in. The same geometry draws the app's
 * logo and the launcher icons — see brand/ at the repo root.
 */
const HEAD = 'M -11.0 -12.8 A 4.2 4.2 0 0 1 -6.8 -17.0 L -5.4 -17.0 L -5.4 -7.4 A 5.4 5.4 0 0 0 5.4 -7.4 L 5.4 -17.0 L 6.8 -17.0 A 4.2 4.2 0 0 1 11.0 -12.8 L 11.0 -5.2 A 4.2 4.2 0 0 1 6.8 -1.0 L -6.8 -1.0 A 4.2 4.2 0 0 1 -11.0 -5.2 Z';
const SHAFT = 'M -4.7 -4 L -4.7 16.3 A 4.7 4.7 0 0 0 4.7 16.3 L 4.7 -4 Z';

/** Where the spanner sits in the tile, and how big it is. */
const PLACE = 'translate(32 32) rotate(45) scale(1.08) translate(0 -2)';

export function Logo({ size = 40, animated = false, className = '', title = 'SpannerBook' }) {
  return (
    <svg
      className={`sb-logo ${animated ? 'sb-logo-animated' : ''} ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="64" height="64" rx="15" fill="var(--sb-tile, #e2511e)" />
      <g transform={PLACE} fill="var(--sb-glyph, #ffffff)">
        <path d={HEAD} />
        <path d={SHAFT} />
      </g>
    </svg>
  );
}

/** The mark plus the name, as used in the header and the footer. */
export function Wordmark({ size = 38, animated = false, className = '' }) {
  return (
    <span className={`sb-wordmark ${className}`.trim()}>
      <Logo size={size} animated={animated} />
      <span className="sb-name">
        Spanner<span className="sb-name-light">Book</span>
      </span>
    </span>
  );
}
