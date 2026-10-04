import React from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-wakeru-surface-muted)] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0f172a] text-white flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-[#1e293b]">
          <Link href="/admin" className="text-xl font-bold">
            Wakeru Admin
          </Link>
          <p className="text-xs text-slate-400 mt-1">Operational Console</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link href="/admin" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-[#1e293b] text-slate-300">
            Overview
          </Link>
          <Link href="/admin/businesses" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-[#1e293b] text-slate-300">
            Businesses
          </Link>
          <Link href="/admin/media" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-[#1e293b] text-slate-300">
            Media Queue
          </Link>
          <Link href="/admin/reviews/reports" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-[#1e293b] text-slate-300">
            Reported Reviews
          </Link>
          <Link href="/admin/audit-logs" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-[#1e293b] text-slate-300">
            Audit Logs
          </Link>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[var(--color-wakeru-bg)]">
        {children}
      </main>
    </div>
  );
}
