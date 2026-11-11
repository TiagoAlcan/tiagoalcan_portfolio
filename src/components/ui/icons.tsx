import type { SVGProps } from "react";

import type { Track } from "@/lib/content/schema";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);
export const ArrowUpRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Base>
);
export const Download = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
  </Base>
);
export const ArrowUp = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Base>
);
export const Sun = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Base>
);
export const Moon = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
  </Base>
);
export const Monitor = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4" />
  </Base>
);
export const Menu = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Base>
);
export const Close = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);
export const Copy = (p: IconProps) => (
  <Base {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
  </Base>
);
export const Check = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12.5 10 17.5 19 7" />
  </Base>
);
export const Search = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </Base>
);
export const Mail = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </Base>
);
export const Globe = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" />
  </Base>
);
export const Whatsapp = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.5 20.5l1.3-4.6A8.5 8.5 0 1 1 8 19.2z" />
    <path d="M9 8.5c-.4 3 2.6 6.200 6.500 6.500l1-1.600-2-1-.9.9c-1.200-.5-2.100-1.400-2.600-2.600l.9-.9-1-2z" />
  </Base>
);

export const Pause = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 6v12M15 6v12" />
  </Base>
);

export const Play = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 5.500v13l10-6.500z" />
  </Base>
);

export const Github = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 19c-4 1.2-4-2-6-2.5M15 21v-3.2a2.8 2.8 0 0 0-.8-2.2c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.600 11.600 0 0 0-6 0C6.500 2.900 5.500 3.200 5.500 3.200a4.300 4.300 0 0 0-.1 3.200A4.600 4.600 0 0 0 4.100 9.600c0 4.700 2.800 5.700 5.500 6a2.800 2.800 0 0 0-.8 2.200V21" />
  </Base>
);
export const Linkedin = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 10v7M8 7v.01M12 17v-4a2.500 2.500 0 0 1 5 0v4M12 10v7" />
  </Base>
);

/* Track icons. Tracks are told apart by icon and label, never by color. */
const Code = (p: IconProps) => (
  <Base {...p}>
    <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.500 5l-3 14" />
  </Base>
);
const Cloud = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 18a4 4 0 0 1-.5-8A5.500 5.500 0 0 1 17 9a4.500 4.500 0 0 1 0 9Z" />
  </Base>
);
const Database = (p: IconProps) => (
  <Base {...p}>
    <ellipse cx="12" cy="6" rx="7" ry="3" />
    <path d="M5 6v6c0 1.700 3.100 3 7 3s7-1.300 7-3V6M5 12v6c0 1.700 3.100 3 7 3s7-1.300 7-3v-6" />
  </Base>
);
const Sparkles = (p: IconProps) => (
  <Base {...p}>
    <path d="M10 4l1.600 4.400L16 10l-4.400 1.600L10 16l-1.600-4.400L4 10l4.400-1.600ZM18 14l.8 2.200L21 17l-2.200.8L18 20l-.8-2.200L15 17l2.200-.8Z" />
  </Base>
);

export const trackIcons: Record<Track, (p: IconProps) => React.JSX.Element> = {
  software: Code,
  devops: Cloud,
  data: Database,
  ai: Sparkles,
};
