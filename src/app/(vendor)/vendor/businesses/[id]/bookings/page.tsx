"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { vendorApi } from '@/api/vendor';
import { BookingRequest } from '@/types/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/design-system/components/Card';
import { Button } from '@/design-system/components/Button';
import { Badge } from '@/design-system/components/Badge';
import { Table, TableHeader, TableRow, TableHead, TableCell } from '@/design-system/components/Table';

export default function BusinessBookingsPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    vendorApi.getBookingRequests(id)
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleAction = async (requestId: string, action: 'accept' | 'decline') => {
    try {
      if (action === 'accept') {
        await vendorApi.acceptBookingRequest(requestId);
      } else {
        await vendorApi.declineBookingRequest(requestId);
      }
      // Refresh list
      const res = await vendorApi.getBookingRequests(id);
      setBookings(res.data);
    } catch (err) {
      console.error('Action failed', err);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>&larr; Back</Button>
        <h1 className="text-3xl font-bold text-[var(--color-wakeru-text-primary)]">Booking Requests</h1>
      </div>

      <div className="flex gap-4 border-b border-[var(--color-wakeru-border-strong)] pb-4">
        <Link href={`/vendor/businesses/${id}`} className="text-[var(--color-wakeru-text-secondary)] hover:text-[var(--color-wakeru-text-primary)] px-2">
          Details
        </Link>
        <Link href={`/vendor/businesses/${id}/media`} className="text-[var(--color-wakeru-text-secondary)] hover:text-[var(--color-wakeru-text-primary)] px-2">
          Media
        </Link>
        <Link href={`/vendor/businesses/${id}/bookings`} className="text-[var(--color-wakeru-primary)] font-medium border-b-2 border-[var(--color-wakeru-primary)] px-2">
          Bookings
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-[var(--color-wakeru-text-secondary)]">Loading requests...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Traveler</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <tbody>
                {bookings.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-mono text-sm">{req.bookingReference}</TableCell>
                    <TableCell>{new Date(req.bookingDate).toLocaleDateString()}</TableCell>
                    <TableCell>{req.travelerHash.substring(0, 8)}...</TableCell>
                    <TableCell>
                      <Badge variant={
                        req.status === 'REQUESTED' ? 'warning' :
                        req.status === 'ACCEPTED' ? 'success' :
                        req.status === 'DECLINED' ? 'danger' : 'default'
                      }>
                        {req.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{req.currency} {(req.priceSnapshotMinor / 100).toFixed(2)}</TableCell>
                    <TableCell className="text-right space-x-2">
                      {req.status === 'REQUESTED' && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => handleAction(req.id, 'decline')}>Decline</Button>
                          <Button variant="primary" size="sm" onClick={() => handleAction(req.id, 'accept')}>Accept</Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {bookings.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-[var(--color-wakeru-text-secondary)]">
                      No booking requests found.
                    </TableCell>
                  </TableRow>
                )}
              </tbody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
