"use client";

import React, { useEffect, useState } from "react";
import { adminApi } from "@/api/admin";
import { Business } from "@/types/api";
import { Table, TableHeader, TableRow, TableHead, TableCell } from "@/design-system/components/Table";
import { Badge } from "@/design-system/components/Badge";
import { Button } from "@/design-system/components/Button";

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBusinesses() {
      try {
        const res = await adminApi.getBusinesses(1);
        setBusinesses((res as any)?.data || []);
      } catch (err) {
        console.error("Failed to load businesses", err);
      } finally {
        setLoading(false);
      }
    }
    loadBusinesses();
  }, []);

  const handleVerify = async (id: string, status: string) => {
    try {
      await adminApi.verifyBusiness(id, status);
      setBusinesses(businesses.map(b => 
        b.id === id ? { ...b, verificationStatus: status as any } : b
      ));
    } catch (err) {
      console.error("Failed to verify business", err);
    }
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[var(--color-wakeru-text-primary)]">Businesses</h1>
      </div>

      {loading ? (
        <div>Loading businesses...</div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verification</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <tbody>
              {businesses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No businesses found.
                  </TableCell>
                </TableRow>
              ) : (
                businesses.map((business) => (
                  <TableRow key={business.id}>
                    <TableCell className="font-medium">{business.businessName}</TableCell>
                    <TableCell>{business.category}</TableCell>
                    <TableCell>
                      <Badge variant={business.status === 'active' ? 'default' : 'secondary'}>
                        {business.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={business.verificationStatus === 'VERIFIED' ? 'default' : 'destructive'}>
                        {business.verificationStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      {business.verificationStatus === 'PENDING' && (
                        <>
                          <Button size="sm" onClick={() => handleVerify(business.id, 'VERIFIED')}>Approve</Button>
                          <Button size="sm" variant="destructive" onClick={() => handleVerify(business.id, 'REJECTED')}>Reject</Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}
