import * as React from 'react';

type Props = React.SVGProps<SVGSVGElement>;

export function PhulkariPattern(props: Props) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#g1)" strokeWidth="6" strokeLinecap="round">
        <path d="M50 5 L90 50 L50 95 L10 50 Z" />
        <path d="M50 18 L78 50 L50 82 L22 50 Z" strokeOpacity="0.7" />
        <circle cx="50" cy="50" r="8" fill="url(#g1)" />
      </g>
    </svg>
  );
}
