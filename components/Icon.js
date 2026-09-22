/**
 * Small line icons, drawn inline so they take the surrounding text colour and
 * need no icon font or sprite. Stroke-based and monochrome on purpose: colour
 * on this site is reserved for prices, ticks and confirmations.
 */
const PATHS = {
  jobCard: 'M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z M9 8h6 M9 12h6 M9 16h3',
  parts: 'M14.7 6.3a4 4 0 0 0-5.4 5.4l-5 5a1.5 1.5 0 0 0 2.1 2.1l5-5a4 4 0 0 0 5.4-5.4l-2.3 2.3-2.1-2.1 2.3-2.3Z',
  staff: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M3 20a6 6 0 0 1 12 0 M17 11a3 3 0 1 0 0-6 M17 14a6 6 0 0 1 4 6',
  bill: 'M6 3h12v18l-3-2-3 2-3-2-3 2V3Z M9 8h6 M9 12h6',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z M21 21l-4.3-4.3',
  chart: 'M4 20V10 M10 20V4 M16 20v-7 M22 20H2',
  tick: 'M4 12.5l5 5L20 6.5',
  external: 'M14 4h6v6 M20 4l-9 9 M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
  eye: 'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  eyeOff: 'M3 3l18 18 M10.6 5.2A10.4 10.4 0 0 1 12 5c6.4 0 10 7 10 7a17.4 17.4 0 0 1-3.9 4.9 M6.5 6.6A17.5 17.5 0 0 0 2 12s3.6 7 10 7a9.7 9.7 0 0 0 4.4-1 M9.9 9.9a3 3 0 0 0 4.2 4.2',
};

export function Icon({ name, size = 22, stroke = 1.6, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name].split(' M').map((segment, i) => (
        <path key={i} d={i === 0 ? segment : `M${segment}`} />
      ))}
    </svg>
  );
}
