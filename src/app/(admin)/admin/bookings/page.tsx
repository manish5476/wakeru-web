"use client"
import React, { useEffect, useState } from 'react';
import { adminApi } from '@/api/admin';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/design-system/components/Table';
import { BookingRequest } from '@/types/api';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await adminApi.getBookingQueue();
        setBookings(res?.data ? res.data : res || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bookings Queue</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reference</TableHead>
            <TableHead>Business ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Booking Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow><TableCell colSpan={4}>Loading...</TableCell></TableRow>
          ) : bookings.map(booking => (
            <TableRow key={booking.id}>
              <TableCell>{booking.bookingReference}</TableCell>
              <TableCell>{booking.businessId}</TableCell>
              <TableCell>{booking.status}</TableCell>
              <TableCell>{booking.bookingDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
