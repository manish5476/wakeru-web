import React from 'react';
import Link from 'next/link';

export default function TravelerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-wakeru-bg)] flex flex-col">
      <header className="sticky top-0 z-50 bg-[var(--color-wakeru-surface-elevated)] border-b border-[var(--color-wakeru-border)] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/discover" className="text-xl font-bold text-[var(--color-wakeru-primary)]">
            Wakeru Local
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/discover" className="text-sm font-medium hover:text-[var(--color-wakeru-primary)] transition-colors">Discover</Link>
            <Link href="/bookings" className="text-sm font-medium hover:text-[var(--color-wakeru-primary)] transition-colors">My Bookings</Link>
            <Link href="/saved" className="text-sm font-medium hover:text-[var(--color-wakeru-primary)] transition-colors">Saved</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/vendor" className="text-sm text-[var(--color-wakeru-text-secondary)] hover:text-[var(--color-wakeru-text-primary)]">For Vendors</Link>
            <div className="h-8 w-8 rounded-full bg-[var(--color-wakeru-surface-muted)] flex items-center justify-center">
              <span className="text-xs font-bold">U</span>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-[var(--color-wakeru-surface-elevated)] border-t border-[var(--color-wakeru-border)] mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-[var(--color-wakeru-text-secondary)]">
          &copy; {new Date().getFullYear()} TripSplit Wakeru Local. Reality over promotion.
        </div>
      </footer>
    </div>
  );
}
