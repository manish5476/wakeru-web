"use client";

import React, { useEffect, useState } from 'react';
import { adminApi } from '@/api/admin';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/design-system/components/Table';
import { Button } from '@/design-system/components/Button';
import { BusinessReview } from '@/types/api';

interface ReviewReport {
  id: string;
  reviewId: string;
  reason: string;
  status: string;
  createdAt: string;
  review?: BusinessReview;
}

export default function ReviewReportsPage() {
  const [reports, setReports] = useState<ReviewReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    try {
      const response = await adminApi.getReviewReports();
      // Unwrap .data where applicable
      const data = (response as any).data ? (response as any).data : response;
      setReports(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load review reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = async (reportId: string) => {
    try {
      await adminApi.dismissReviewReport(reportId);
      setReports(prev => prev.filter(r => r.id !== reportId));
    } catch (error) {
      console.error('Failed to dismiss report:', error);
    }
  };

  const handleDelete = async (reviewId: string, reportId: string) => {
    try {
      await adminApi.deleteReview(reviewId);
      setReports(prev => prev.filter(r => r.id !== reportId));
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-[var(--color-wakeru-text-secondary)]">Loading reports...</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6 text-[var(--color-wakeru-text-primary)]">Review Reports</h1>
      
      {reports.length === 0 ? (
        <div className="text-center p-8 text-[var(--color-wakeru-text-secondary)] border border-[var(--color-wakeru-border-strong)] rounded-lg">
          No pending review reports.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Review ID</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{new Date(report.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="max-w-xs truncate">{report.reason}</TableCell>
                <TableCell className="font-mono text-xs">{report.reviewId}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={() => handleDismiss(report.id)}
                    >
                      Dismiss
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleDelete(report.reviewId, report.id)}
                    >
                      Delete Review
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
