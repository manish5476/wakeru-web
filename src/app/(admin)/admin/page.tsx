"use client";

import React, { useEffect, useState } from "react";
import { adminApi } from "@/api/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/design-system/components/Card";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalBusinesses: 0,
    pendingMedia: 0,
    recentAudits: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [businessesRes, mediaRes, auditLogsRes] = await Promise.all([
          adminApi.getBusinesses(1),
          adminApi.getMediaQueue(),
          adminApi.getAuditLogs(),
        ]);
        
        setStats({
          totalBusinesses: (businessesRes as any)?.data?.length || 0,
          pendingMedia: (mediaRes as any)?.length || 0,
          recentAudits: (auditLogsRes as any)?.length || 0,
        });
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  return (
    <div className="space-y-6 p-8">
      <h1 className="text-3xl font-bold text-[var(--color-wakeru-text-primary)]">Admin Dashboard</h1>
      
      {loading ? (
        <div>Loading dashboard...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Businesses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[var(--color-wakeru-text-primary)]">{stats.totalBusinesses}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Pending Media</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[var(--color-wakeru-text-primary)]">{stats.pendingMedia}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Recent Audit Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[var(--color-wakeru-text-primary)]">{stats.recentAudits}</div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
