// src/shared/ui/Icons/Solid.tsx
export const Solid = ({ color = "#161616", className }: { color?: string; className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="2" fill={color} />
    <circle cx="12" cy="5" r="2" fill={color} />
    <circle cx="12" cy="19" r="2" fill={color} />
  </svg>
);