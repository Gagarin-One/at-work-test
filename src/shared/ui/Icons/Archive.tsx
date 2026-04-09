// src/shared/ui/Icons/Archive.tsx
export const Archive = ({ color = "#161616" }: { color?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M4 8H20V20H4V8Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 4H16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 12V16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);