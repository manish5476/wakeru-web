import React, { ButtonHTMLAttributes } from 'react';

export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'destructive';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-[var(--radius-control)] disabled:opacity-50 disabled:pointer-events-none';
  
  const variants: Record<Variant, string> = {
    primary: 'bg-[var(--color-wakeru-primary)] text-white hover:bg-[var(--color-wakeru-primary-hover)] focus:ring-[var(--color-wakeru-primary)]',
    secondary: 'bg-[var(--color-wakeru-surface-muted)] text-[var(--color-wakeru-text-primary)] hover:bg-[var(--color-wakeru-border)] focus:ring-[var(--color-wakeru-text-secondary)]',
    outline: 'border border-[var(--color-wakeru-border-strong)] text-[var(--color-wakeru-text-primary)] hover:bg-[var(--color-wakeru-surface-muted)] focus:ring-[var(--color-wakeru-border-strong)]',
    ghost: 'text-[var(--color-wakeru-text-secondary)] hover:text-[var(--color-wakeru-text-primary)] hover:bg-[var(--color-wakeru-surface-muted)] focus:ring-[var(--color-wakeru-text-secondary)]',
    danger: 'bg-[var(--color-wakeru-danger)] text-white hover:opacity-90 focus:ring-[var(--color-wakeru-danger)]',
    destructive: 'bg-[var(--color-wakeru-danger)] text-white hover:opacity-90 focus:ring-[var(--color-wakeru-danger)]',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
}
