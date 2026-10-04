import React from 'react';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'sponsored' | 'outline' | 'verified' | 'secondary' | 'destructive';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ children, variant = 'default', className = '', ...props }: BadgeProps) {
  const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  
  const variants: Record<BadgeVariant, string> = {
    default: "bg-[var(--color-wakeru-surface-muted)] text-[var(--color-wakeru-text-secondary)]",
    secondary: "bg-[var(--color-wakeru-surface-muted)] text-[var(--color-wakeru-text-secondary)]",
    success: "bg-[var(--color-wakeru-success)] text-white",
    warning: "bg-[var(--color-wakeru-warning)] text-white",
    danger: "bg-[var(--color-wakeru-danger)] text-white",
    destructive: "bg-[var(--color-wakeru-danger)] text-white",
    info: "bg-[var(--color-wakeru-info)] text-white",
    sponsored: "bg-[var(--color-wakeru-sponsored)] text-white",
    verified: "bg-[var(--color-wakeru-verified)] text-white",
    outline: "border border-[var(--color-wakeru-border-strong)] text-[var(--color-wakeru-text-primary)]"
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
