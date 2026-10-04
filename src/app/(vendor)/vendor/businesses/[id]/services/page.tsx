"use client";

import React, { useEffect, useState } from 'react';
import { vendorApi } from '@/api/vendor';
import { BusinessService } from '@/types/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/design-system/components/Table';
import { Button } from '@/design-system/components/Button';

export default function ServicesPage({ params }: { params: { id: string } }) {
  const [services, setServices] = useState<BusinessService[]>([]);
  const [loading, setLoading] = useState(true);

  // Handle Next.js 15 params promise wrapping if necessary
  const id = typeof params.then === 'function' ? (React as any).use(params).id : params.id;

  useEffect(() => {
    vendorApi.getServices(id)
      .then(res => {
        setServices(res.data);
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
        <h1 className="text-2xl font-bold">Services</h1>
        <Button>Add Service</Button>
      </div>

      {loading ? (
        <p className="text-[var(--color-wakeru-text-secondary)]">Loading services...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Currency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-[var(--color-wakeru-text-secondary)] py-8">
                  No services found.
                </TableCell>
              </TableRow>
            ) : (
              services.map(service => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{service.description || '-'}</TableCell>
                  <TableCell>{(service.priceMinor / 100).toFixed(2)}</TableCell>
                  <TableCell>{service.currency}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
