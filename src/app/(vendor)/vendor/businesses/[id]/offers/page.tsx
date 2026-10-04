"use client";

import React, { useEffect, useState } from 'react';
import { vendorApi } from '@/api/vendor';
import { BusinessOffer } from '@/types/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/design-system/components/Table';
import { Button } from '@/design-system/components/Button';
import { Badge } from '@/design-system/components/Badge';
import { Input } from '@/design-system/components/Input';
import { useParams } from 'next/navigation';

export default function OffersPage() {
  const params = useParams();
  const id = params.id as string;
  const [offers, setOffers] = useState<BusinessOffer[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [title, setTitle] = useState('');
  const [discountType, setDiscountType] = useState('PERCENTAGE');
  const [status, setStatus] = useState<'active' | 'inactive' | 'expired'>('active');
  const [isCreating, setIsCreating] = useState(false);

  const loadOffers = () => {
    setLoading(true);
    vendorApi.getOffers(id)
      .then(res => {
        setOffers(res.data);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOffers();
  }, [id]);

  const handleCreateOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      await vendorApi.createOffer(id, { title, discountType, status });
      setTitle('');
      setDiscountType('PERCENTAGE');
      setStatus('active');
      loadOffers();
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (offerId: string) => {
    if (!confirm('Are you sure you want to delete this offer?')) return;
    try {
      await vendorApi.deleteOffer(offerId);
      loadOffers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleStatus = async (offerId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      await vendorApi.updateOfferStatus(offerId, newStatus);
      loadOffers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Offers</h1>
      </div>

      <form onSubmit={handleCreateOffer} className="space-y-4 p-4 border rounded-md">
        <h2 className="text-xl font-semibold">Create Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input 
            label="Title" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            required 
          />
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-medium text-[var(--color-wakeru-text-primary)]">Discount Type</label>
            <select 
              className="flex h-10 w-full rounded-[var(--radius-control)] border border-[var(--color-wakeru-border-strong)] bg-[var(--color-wakeru-bg)] px-3 py-2 text-sm text-[var(--color-wakeru-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-wakeru-primary)]"
              value={discountType} 
              onChange={e => setDiscountType(e.target.value)}
            >
              <option value="PERCENTAGE">Percentage</option>
              <option value="FIXED_AMOUNT">Fixed Amount</option>
            </select>
          </div>
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-medium text-[var(--color-wakeru-text-primary)]">Status</label>
            <select 
              className="flex h-10 w-full rounded-[var(--radius-control)] border border-[var(--color-wakeru-border-strong)] bg-[var(--color-wakeru-bg)] px-3 py-2 text-sm text-[var(--color-wakeru-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-wakeru-primary)]"
              value={status} 
              onChange={e => setStatus(e.target.value as any)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <Button type="submit" disabled={isCreating}>
          {isCreating ? 'Creating...' : 'Create Offer'}
        </Button>
      </form>

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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-[var(--color-wakeru-text-secondary)] py-8">
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
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleToggleStatus(offer.id, offer.status)}>
                        Toggle Status
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(offer.id)}>
                        Delete
                      </Button>
                    </div>
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
