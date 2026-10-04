"use client";

import React, { useEffect, useState } from "react";
import { adminApi } from "@/api/admin";
import { Table, TableHeader, TableRow, TableHead, TableCell } from "@/design-system/components/Table";
import { Badge } from "@/design-system/components/Badge";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLogs() {
      try {
        const res = await adminApi.getAuditLogs();
        setLogs((res as any) || []);
      } catch (err) {
        console.error("Failed to load audit logs", err);
      } finally {
        setLoading(false);
      }
    }
    loadLogs();
  }, []);

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[var(--color-wakeru-text-primary)]">Audit Logs</h1>
      </div>

      {loading ? (
        <div>Loading logs...</div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <tbody>
              {logs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No audit logs found.
                  </TableCell>
                </TableRow>
              ) : (
                logs.map((log, i) => (
                  <TableRow key={log.id || i}>
                    <TableCell className="whitespace-nowrap text-sm">
                      {log.createdAt ? new Date(log.createdAt).toLocaleString() : '-'}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{log.action || 'UNKNOWN'}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{log.resource || '-'}</TableCell>
                    <TableCell className="text-sm">{log.actor || log.user || 'System'}</TableCell>
                    <TableCell className="text-xs text-gray-500 truncate max-w-xs" title={JSON.stringify(log.details)}>
                      {log.details ? JSON.stringify(log.details) : '-'}
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
