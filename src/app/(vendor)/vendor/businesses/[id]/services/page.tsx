"use client";

import React, { useEffect, useState } from 'react';
import { vendorApi } from '@/api/vendor';
import { BusinessService } from '@/types/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/design-system/components/Table';
import { Button } from '@/design-system/components/Button';
import { Input } from '@/design-system/components/Input';
import { useParams } from 'next/navigation';

export default function ServicesPage() {
  const params = useParams();
  const id = params.id as string;
  const [services, setServices] = useState<BusinessService[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const loadServices = () => {
    setLoading(true);
    vendorApi.getServices(id)
      .then(res => {
        setServices(res.data);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadServices();
  }, [id]);

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const priceMinor = Math.round(parseFloat(price) * 100);
      await vendorApi.createService(id, { name, priceMinor, currency: 'USD' });
      setName('');
      setPrice('');
      loadServices();
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (serviceId: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await vendorApi.deleteService(serviceId);
      loadServices();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Services</h1>
      </div>

      <form onSubmit={handleCreateService} className="space-y-4 p-4 border rounded-md">
        <h2 className="text-xl font-semibold">Add Service</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
          />
          <Input 
            label="Price (USD)" 
            type="number"
            step="0.01"
            min="0"
            value={price} 
            onChange={e => setPrice(e.target.value)} 
            required 
          />
        </div>
        <Button type="submit" disabled={isCreating}>
          {isCreating ? 'Adding...' : 'Add Service'}
        </Button>
      </form>

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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-[var(--color-wakeru-text-secondary)] py-8">
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
                  <TableCell>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(service.id)}>
                      Delete
                    </Button>
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
