"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { vendorApi } from "@/api/vendor";
import { Card, CardContent } from "@/design-system/components/Card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/design-system/components/Table";

export default function LeadsPage() {
  const params = useParams();
  const id = params.id as string;
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchLeads = async () => {
      try {
        const res = await vendorApi.getLeads(id);
        setLeads(res.data || res || []);
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Leads</h1>
      {Array.isArray(leads) && leads.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lead Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(lead, null, 2)}</pre>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p>No leads found or invalid data format.</p>
            {leads && !Array.isArray(leads) && (
              <pre className="text-sm mt-4 whitespace-pre-wrap">{JSON.stringify(leads, null, 2)}</pre>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
