'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/components/Card';
import { Button } from '@/design-system/components/Button';
import { Badge } from '@/design-system/components/Badge';
import { Input } from '@/design-system/components/Input';
import { discoveryApi } from '@/api/discover';
import { Business } from '@/types/api';
import Link from 'next/link';

export default function DiscoverPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Demo coordinates (Goa)
    discoveryApi.getNearbyBusinesses(15.2993, 74.1240)
      .then(res => setBusinesses(res as any)) // Cast since response wraps data usually
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-wakeru-text-primary)]">Explore Destinations</h1>
          <p className="text-[var(--color-wakeru-text-secondary)] mt-1">Discover what's nearby or search for a specific location.</p>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Where to?" className="w-64" />
          <Button>Search</Button>
        </div>
      </header>

      {error && (
        <Card className="border-[var(--color-wakeru-danger)] bg-red-50 dark:bg-red-900/10">
          <CardContent className="p-4 text-[var(--color-wakeru-danger)]">
            Failed to load businesses: {error}
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <Card key={i} className="animate-pulse h-64 bg-[var(--color-wakeru-surface-muted)]"></Card>
          ))}
        </div>
      ) : businesses.length === 0 ? (
        <div className="text-center py-24 bg-[var(--color-wakeru-surface)] rounded-[var(--radius-card)]">
          <h2 className="text-lg font-medium text-[var(--color-wakeru-text-primary)]">No local options found nearby.</h2>
          <p className="text-[var(--color-wakeru-text-secondary)] mt-2">Try expanding your search radius or changing destination.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {businesses.map(business => (
            <Link key={business.id} href={`/discover/business/${business.id}`}>
              <Card className="hover:shadow-[var(--shadow-floating)] transition-shadow cursor-pointer h-full flex flex-col">
                {/* Cover Image Placeholder */}
                <div className="h-40 bg-[var(--color-wakeru-surface-muted)] overflow-hidden relative">
                  {business.media?.[0] ? (
                    <img src={business.media[0].url} alt={business.businessName} className="object-cover w-full h-full" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-[var(--color-wakeru-text-muted)]">No Image</div>
                  )}
                  {business.verificationStatus === 'VERIFIED' && (
                    <Badge variant="verified" className="absolute top-2 right-2 shadow-sm">Verified</Badge>
                  )}
                </div>
                <CardHeader className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-[var(--color-wakeru-primary)]">{business.category}</span>
                  </div>
                  <CardTitle>{business.businessName}</CardTitle>
                  <p className="text-sm text-[var(--color-wakeru-text-secondary)] mt-1">{business.city}, {business.country}</p>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
