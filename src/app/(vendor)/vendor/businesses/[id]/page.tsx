"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { vendorApi } from '@/api/vendor';
import { Business } from '@/types/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/design-system/components/Card';
import { Input } from '@/design-system/components/Input';
import { Button } from '@/design-system/components/Button';

export default function BusinessDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    vendorApi.getBusinessById(id)
      .then((data) => {
        setBusiness(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!business) {
    return <div className="p-8">Business not found.</div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>&larr; Back</Button>
        <h1 className="text-3xl font-bold text-[var(--color-wakeru-text-primary)]">{business.businessName}</h1>
      </div>

      <div className="flex gap-4 border-b border-[var(--color-wakeru-border-strong)] pb-4">
        <Link href={`/vendor/businesses/${id}`} className="text-[var(--color-wakeru-primary)] font-medium border-b-2 border-[var(--color-wakeru-primary)] px-2">
          Details
        </Link>
        <Link href={`/vendor/businesses/${id}/media`} className="text-[var(--color-wakeru-text-secondary)] hover:text-[var(--color-wakeru-text-primary)] px-2">
          Media
        </Link>
        <Link href={`/vendor/businesses/${id}/bookings`} className="text-[var(--color-wakeru-text-secondary)] hover:text-[var(--color-wakeru-text-primary)] px-2">
          Bookings
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Business Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-wakeru-text-primary)]">Business Name</label>
              <Input defaultValue={business.businessName} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-wakeru-text-primary)]">Category</label>
              <Input defaultValue={business.category} disabled />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-wakeru-text-primary)]">City</label>
              <Input defaultValue={business.city} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-wakeru-text-primary)]">Country</label>
              <Input defaultValue={business.country} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-[var(--color-wakeru-text-primary)]">Address</label>
              <Input defaultValue={business.address} />
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="primary">Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
