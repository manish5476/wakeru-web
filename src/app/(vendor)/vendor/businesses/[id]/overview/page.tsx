"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { vendorApi } from "@/api/vendor";
import { Card, CardHeader, CardTitle, CardContent } from "@/design-system/components/Card";

export default function OverviewPage() {
  const params = useParams();
  const id = params.id as string;
  const [overview, setOverview] = useState<any>(null);
  const [completeness, setCompleteness] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const [overviewRes, completenessRes] = await Promise.all([
          vendorApi.getBusinessOverview(id),
          vendorApi.checkCompleteness(id)
        ]);
        setOverview(overviewRes.data || overviewRes);
        setCompleteness(completenessRes.data || completenessRes);
      } catch (error) {
        console.error("Error fetching overview:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Business Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overview Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-sm overflow-auto whitespace-pre-wrap">{JSON.stringify(overview, null, 2)}</pre>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Profile Completeness</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-sm overflow-auto whitespace-pre-wrap">{JSON.stringify(completeness, null, 2)}</pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
