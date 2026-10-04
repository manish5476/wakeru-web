"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { vendorApi } from "@/api/vendor";
import { Reservation } from "@/types/api";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/design-system/components/Table";
import { Button } from "@/design-system/components/Button";

export default function ReservationsPage() {
  const params = useParams();
  const id = params.id as string;
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const res = await vendorApi.getReservations(id);
      setReservations(res.data || []);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchReservations();
  }, [id]);

  const handleComplete = async (resId: string) => {
    try {
      await vendorApi.completeReservation(resId);
      fetchReservations();
    } catch (error) {
      console.error("Error completing reservation:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reservations</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Booking Req ID</TableHead>
            <TableHead>Confirmed At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((res) => (
            <TableRow key={res.id}>
              <TableCell>{res.id}</TableCell>
              <TableCell>{res.bookingRequestId}</TableCell>
              <TableCell>{res.vendorConfirmedAt ? new Date(res.vendorConfirmedAt).toLocaleDateString() : '-'}</TableCell>
              <TableCell>{res.status}</TableCell>
              <TableCell>
                {res.status !== 'COMPLETED' && (
                  <Button size="sm" onClick={() => handleComplete(res.id)}>
                    Complete
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
          {reservations.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center">No reservations found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
