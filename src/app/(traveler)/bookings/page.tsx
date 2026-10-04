'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/components/Card';
import { Badge } from '@/design-system/components/Badge';
import { Button } from '@/design-system/components/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/design-system/components/Table';
import { fetchClient } from '@/api/client';
import { discoveryApi } from '@/api/discover';
import { BookingRequest } from '@/types/api';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    setLoading(true);
    discoveryApi.getTravelerBookings()
      .then((res: any) => setBookings(res.data || res))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId: string) => {
    try {
      await discoveryApi.cancelBookingRequest(bookingId);
      // Refresh the list after cancellation
      fetchBookings();
    } catch (error) {
      console.error('Failed to cancel booking', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-[var(--color-wakeru-text-primary)]">My Bookings</h1>
        <p className="text-[var(--color-wakeru-text-secondary)] mt-1">Manage your requested and confirmed local experiences.</p>
      </header>

      {loading ? (
        <Card className="animate-pulse h-64 bg-[var(--color-wakeru-surface-muted)]"></Card>
      ) : bookings.length === 0 ? (
        <Card>
          <CardContent className="text-center py-24">
            <h2 className="text-lg font-medium text-[var(--color-wakeru-text-primary)]">No bookings yet</h2>
            <p className="text-[var(--color-wakeru-text-secondary)] mt-2">When you request a booking, it will appear here.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map(b => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.bookingReference}</TableCell>
                  <TableCell>{new Date(b.bookingDate).toLocaleDateString()}</TableCell>
                  <TableCell>{(b.priceSnapshotMinor / 100).toFixed(2)} {b.currency}</TableCell>
                  <TableCell>
                    <Badge variant={
                      b.status === 'ACCEPTED' ? 'success' :
                      b.status === 'DECLINED' || b.status === 'CANCELLED' ? 'danger' : 'warning'
                    }>
                      {b.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {b.status === 'REQUESTED' && (
                      <Button variant="danger" size="sm" onClick={() => handleCancel(b.id)}>
                        Cancel
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
