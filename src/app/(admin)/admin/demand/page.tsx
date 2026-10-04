"use client"
import React, { useEffect, useState } from 'react';
import { adminApi } from '@/api/admin';
import { Card, CardHeader, CardTitle, CardContent } from '@/design-system/components/Card';

export default function DemandInsightsPage() {
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      try {
        const res = await adminApi.getDemandInsights();
        setInsights(res?.data ? res.data : res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Demand Insights</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights && typeof insights === 'object' && !Array.isArray(insights) ? (
            Object.entries(insights).map(([key, value]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{String(value)}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No insights data available.</p>
          )}
        </div>
      )}
    </div>
  );
}
