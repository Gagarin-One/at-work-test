// src/shared/ui/Icons/Cross.tsx
export const Cross = ({ color = "#161616" }: { color?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6L18 18" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);