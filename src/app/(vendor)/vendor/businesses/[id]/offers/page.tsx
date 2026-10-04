"use client";

import React, { useEffect, useState } from 'react';
import { vendorApi } from '@/api/vendor';
import { BusinessOffer } from '@/types/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/design-system/components/Table';
import { Button } from '@/design-system/components/Button';
import { Badge } from '@/design-system/components/Badge';

export default function OffersPage({ params }: { params: { id: string } }) {
  const [offers, setOffers] = useState<BusinessOffer[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Handle Next.js 15 params promise wrapping if necessary
  const id = typeof params.then === 'function' ? (React as any).use(params).id : params.id;

  useEffect(() => {
    vendorApi.getOffers(id)
      .then(res => {
        setOffers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Offers</h1>
        <Button>Create Offer</Button>
      </div>

      {loading ? (
        <p className="text-[var(--color-wakeru-text-secondary)]">Loading offers...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-[var(--color-wakeru-text-secondary)] py-8">
                  No offers found.
                </TableCell>
              </TableRow>
            ) : (
              offers.map(offer => (
                <TableRow key={offer.id}>
                  <TableCell className="font-medium">{offer.title}</TableCell>
                  <TableCell>{offer.discountType}</TableCell>
                  <TableCell>{offer.discountValue ?? '-'}</TableCell>
                  <TableCell>
                    <Badge variant={offer.status === 'active' ? 'success' : offer.status === 'expired' ? 'danger' : 'default'}>
                      {offer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {offer.startAt ? new Date(offer.startAt).toLocaleDateString() : 'N/A'} - {offer.endAt ? new Date(offer.endAt).toLocaleDateString() : 'N/A'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
