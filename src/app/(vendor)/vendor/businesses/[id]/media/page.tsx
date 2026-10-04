"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { vendorApi } from '@/api/vendor';
import { BusinessMedia } from '@/types/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/design-system/components/Card';
import { Button } from '@/design-system/components/Button';
import { Badge } from '@/design-system/components/Badge';

export default function BusinessMediaPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [media, setMedia] = useState<BusinessMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    vendorApi.getMedia(id)
      .then((res) => {
        setMedia(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>&larr; Back</Button>
        <h1 className="text-3xl font-bold text-[var(--color-wakeru-text-primary)]">Media Management</h1>
      </div>

      <div className="flex gap-4 border-b border-[var(--color-wakeru-border-strong)] pb-4">
        <Link href={`/vendor/businesses/${id}`} className="text-[var(--color-wakeru-text-secondary)] hover:text-[var(--color-wakeru-text-primary)] px-2">
          Details
        </Link>
        <Link href={`/vendor/businesses/${id}/media`} className="text-[var(--color-wakeru-primary)] font-medium border-b-2 border-[var(--color-wakeru-primary)] px-2">
          Media
        </Link>
        <Link href={`/vendor/businesses/${id}/bookings`} className="text-[var(--color-wakeru-text-secondary)] hover:text-[var(--color-wakeru-text-primary)] px-2">
          Bookings
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Photos & Videos</CardTitle>
          <Button variant="primary">Upload Media</Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-[var(--color-wakeru-text-secondary)]">Loading media...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Upload Placeholder */}
              <div className="border-2 border-dashed border-[var(--color-wakeru-border-strong)] rounded-lg flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:bg-[var(--color-wakeru-surface-muted)] transition-colors aspect-square">
                <span className="text-4xl text-[var(--color-wakeru-text-secondary)] mb-2">+</span>
                <span className="text-sm font-medium text-[var(--color-wakeru-text-primary)]">Add Photo</span>
              </div>

              {/* Media Items */}
              {media.map((item) => (
                <div key={item.id} className="relative group rounded-lg overflow-hidden border border-[var(--color-wakeru-border)] aspect-square bg-[var(--color-wakeru-surface-muted)] flex items-center justify-center">
                  <img src={item.url} alt={item.altText || 'Media item'} className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="danger" size="sm">Delete</Button>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant={item.moderationStatus === 'APPROVED' ? 'success' : 'warning'}>
                      {item.moderationStatus}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
