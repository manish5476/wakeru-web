"use client"
import React, { useEffect, useState } from 'react';
import { adminApi } from '@/api/admin';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/design-system/components/Table';
import { Button } from '@/design-system/components/Button';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getCampaigns();
      setCampaigns(res?.data ? res.data : res || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleReview = async (id: string, status: string) => {
    try {
      await adminApi.reviewCampaign(id, status);
      fetchCampaigns();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Campaigns Moderation</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow><TableCell colSpan={4}>Loading...</TableCell></TableRow>
          ) : campaigns.map(campaign => (
            <TableRow key={campaign.id}>
              <TableCell>{campaign.id}</TableCell>
              <TableCell>{campaign.title || 'Untitled'}</TableCell>
              <TableCell>{campaign.status}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm" onClick={() => handleReview(campaign.id, 'APPROVED')}>Approve</Button>
                  <Button variant="danger" size="sm" onClick={() => handleReview(campaign.id, 'REJECTED')}>Reject</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
