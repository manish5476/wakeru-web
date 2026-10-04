'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/components/Card';
import { Badge } from '@/design-system/components/Badge';
import { discoveryApi } from '@/api/discover';
import { Reservation } from '@/types/api';

export default function ReservationDetailPage({ params }: { params: { id: string } }) {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    discoveryApi.getTravelerReservationDetail(params.id)
      .then((res: any) => setReservation(res.data || res))
      .catch((err) => {
        console.error('Failed to load reservation', err);
        setError('Failed to load reservation details.');
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Card className="animate-pulse h-64 bg-[var(--color-wakeru-surface-muted)]"></Card>
      </div>
    );
  }

  if (error || !reservation) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Card>
          <CardContent className="text-center py-24 text-red-500">
            {error || 'Reservation not found.'}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-[var(--color-wakeru-text-primary)]">Reservation Details</h1>
        <p className="text-[var(--color-wakeru-text-secondary)] mt-1">ID: {reservation.id}</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Status & Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between border-b pb-4">
            <span className="font-medium text-[var(--color-wakeru-text-secondary)]">Status</span>
            <span>
              <Badge variant={
                reservation.status === 'CONFIRMED' ? 'success' :
                reservation.status === 'CANCELLED' ? 'danger' : 'default'
              }>
                {reservation.status}
              </Badge>
            </span>
          </div>

          <div className="flex justify-between border-b pb-4">
            <span className="font-medium text-[var(--color-wakeru-text-secondary)]">Booking Request ID</span>
            <span>{reservation.bookingRequestId}</span>
          </div>

          {reservation.vendorConfirmedAt && (
            <div className="flex justify-between border-b pb-4">
              <span className="font-medium text-[var(--color-wakeru-text-secondary)]">Confirmed At</span>
              <span>{new Date(reservation.vendorConfirmedAt).toLocaleString()}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
