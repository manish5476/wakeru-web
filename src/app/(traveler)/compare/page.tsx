"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { discoveryApi } from '@/api/discover';
import { Business } from '@/types/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/design-system/components/Card';
import { Button } from '@/design-system/components/Button';

function CompareContent() {
  const searchParams = useSearchParams();
  const ids = searchParams.get('ids');
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ids) {
      discoveryApi.compareBusinesses(ids)
        .then(response => {
          // Unwrap .data as requested
          const data = (response as any).data ? (response as any).data : response;
          setBusinesses(Array.isArray(data) ? data : []);
        })
        .catch(error => {
          console.error('Failed to compare businesses:', error);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [ids]);

  if (loading) {
    return <div className="p-8 text-center text-[var(--color-wakeru-text-secondary)]">Loading comparison...</div>;
  }

  if (!businesses.length) {
    return <div className="p-8 text-center text-[var(--color-wakeru-text-secondary)]">No businesses found to compare.</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 overflow-x-auto">
      {businesses.map((business) => (
        <Card key={business.id} className="flex-1 min-w-[300px]">
          <CardHeader>
            <CardTitle>{business.businessName}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-[var(--color-wakeru-text-secondary)]">Category</p>
              <p className="font-medium text-[var(--color-wakeru-text-primary)]">{business.category}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-wakeru-text-secondary)]">Location</p>
              <p className="text-[var(--color-wakeru-text-primary)]">{business.city}, {business.country}</p>
              <p className="text-sm text-[var(--color-wakeru-text-secondary)]">{business.address}</p>
            </div>
            {business.description && (
              <div>
                <p className="text-sm text-[var(--color-wakeru-text-secondary)]">Description</p>
                <p className="text-sm text-[var(--color-wakeru-text-primary)]">{business.description}</p>
              </div>
            )}
            <div className="pt-4 mt-auto">
              <Button className="w-full">View Details</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function CompareBusinessesPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6 text-[var(--color-wakeru-text-primary)]">Compare Businesses</h1>
      <Suspense fallback={<div className="p-8 text-center text-[var(--color-wakeru-text-secondary)]">Loading comparison...</div>}>
        <CompareContent />
      </Suspense>
    </div>
  );
}
