"use client"
import React, { useEffect, useState } from 'react';
import { adminApi } from '@/api/admin';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/design-system/components/Table';
import { Button } from '@/design-system/components/Button';
import { Vendor } from '@/types/api';

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getVendors();
      setVendors(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleSuspend = async (id: string) => {
    try {
      await adminApi.suspendVendor(id);
      fetchVendors();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Vendors</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow><TableCell colSpan={5}>Loading...</TableCell></TableRow>
          ) : vendors.map(vendor => (
            <TableRow key={vendor.id}>
              <TableCell>{vendor.id}</TableCell>
              <TableCell>{vendor.name}</TableCell>
              <TableCell>{vendor.email}</TableCell>
              <TableCell>{vendor.status}</TableCell>
              <TableCell>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => handleSuspend(vendor.id)}
                  disabled={vendor.status === 'SUSPENDED'}
                >
                  Suspend
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
