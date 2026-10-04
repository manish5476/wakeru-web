import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/components/Card';
import { Button } from '@/design-system/components/Button';
import { Badge } from '@/design-system/components/Badge';

export default function TravelerHome() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <header className="flex justify-between items-center py-6 border-b border-[var(--color-wakeru-border)]">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-wakeru-text-primary)]">Wakeru Local</h1>
          <p className="text-[var(--color-wakeru-text-secondary)] mt-2">Discover genuine local stays, dining, and experiences.</p>
        </div>
        <div className="space-x-4">
          <Button variant="outline">Sign In</Button>
          <Button>Explore Nearby</Button>
        </div>
      </header>
      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>Seaside Villa</CardTitle>
              <Badge variant="verified">Verified</Badge>
            </div>
            <p className="text-sm text-[var(--color-wakeru-text-secondary)] mt-1">Stay · Goa</p>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-lg">₹5,000 <span className="text-sm text-[var(--color-wakeru-text-secondary)] font-normal">/ night</span></p>
            <Button variant="secondary" className="w-full mt-4">View Details</Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
