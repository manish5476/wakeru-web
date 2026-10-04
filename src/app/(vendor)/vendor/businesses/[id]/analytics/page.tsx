"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/components/Card';

export default function AnalyticsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-[var(--color-wakeru-text-secondary)] mt-1">Placeholder data</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-[var(--color-wakeru-text-secondary)] mt-1">Placeholder data</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$0.00</p>
            <p className="text-sm text-[var(--color-wakeru-text-secondary)] mt-1">Placeholder data</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-[var(--color-wakeru-surface-muted)] rounded-[var(--radius-card)] border border-dashed border-[var(--color-wakeru-border-strong)]">
            <span className="text-[var(--color-wakeru-text-secondary)]">Chart Placeholder</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
