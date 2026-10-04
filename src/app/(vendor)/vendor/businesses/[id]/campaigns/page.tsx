"use client";

import React, { useEffect, useState } from 'react';
import { vendorApi } from '@/api/vendor';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/design-system/components/Table';
import { Button } from '@/design-system/components/Button';
import { Badge } from '@/design-system/components/Badge';
import { Input } from '@/design-system/components/Input';
import { useParams } from 'next/navigation';

interface Campaign {
  id: string;
  name?: string;
  title?: string;
  status: string;
  budgetMinor?: number;
  currency?: string;
  startDate?: string;
  endDate?: string;
}

export default function CampaignsPage() {
  const params = useParams();
  const id = params.id as string;
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  // Form placeholder state
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const loadCampaigns = () => {
    setLoading(true);
    vendorApi.getCampaigns(id)
      .then((res: any) => {
        setCampaigns(res.data || []);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCampaigns();
  }, [id]);

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      await vendorApi.createCampaign(id, { name, status: 'active' });
      setName('');
      loadCampaigns();
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggleStatus = async (campaignId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    try {
      await vendorApi.updateCampaignStatus(campaignId, newStatus);
      loadCampaigns();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Campaigns</h1>
      </div>

      <form onSubmit={handleCreateCampaign} className="space-y-4 p-4 border rounded-md">
        <h2 className="text-xl font-semibold">Create Campaign (Placeholder)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Campaign Name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
          />
        </div>
        <Button type="submit" disabled={isCreating}>
          {isCreating ? 'Creating...' : 'Create Campaign'}
        </Button>
      </form>

      {loading ? (
        <p className="text-[var(--color-wakeru-text-secondary)]">Loading campaigns...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-[var(--color-wakeru-text-secondary)] py-8">
                  No campaigns found.
                </TableCell>
              </TableRow>
            ) : (
              campaigns.map(campaign => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name || campaign.title || 'Untitled'}</TableCell>
                  <TableCell>
                    <Badge variant={campaign.status === 'active' ? 'success' : 'default'}>
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {campaign.budgetMinor !== undefined && campaign.currency
                      ? `${campaign.currency} ${(campaign.budgetMinor / 100).toFixed(2)}` 
                      : '-'}
                  </TableCell>
                  <TableCell>
                    {campaign.startDate ? new Date(campaign.startDate).toLocaleDateString() : 'N/A'} - {campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleToggleStatus(campaign.id, campaign.status)}>
                      Toggle Status
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
