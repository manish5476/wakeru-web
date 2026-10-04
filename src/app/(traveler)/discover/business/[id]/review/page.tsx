'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/components/Card';
import { Button } from '@/design-system/components/Button';
import { Input } from '@/design-system/components/Input';
import { discoveryApi } from '@/api/discover';

export default function WriteReviewPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [provenance, setProvenance] = useState('LOCAL');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const idempotencyKey = crypto.randomUUID();
      const payload = {
        rating,
        comment,
        provenance
      };
      
      const res = await discoveryApi.createReview(params.id, payload, idempotencyKey);
      if (res) {
        router.push(`/discover/business/${params.id}`);
      }
    } catch (err: any) {
      console.error('Failed to submit review', err);
      setError('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Write a Review</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Rating</label>
              <select 
                value={rating} 
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full border rounded p-2"
                required
              >
                {[5, 4, 3, 2, 1].map(num => (
                  <option key={num} value={num}>{num} Stars</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Comment</label>
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border rounded p-2 min-h-[100px]"
                placeholder="Share your experience..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Provenance</label>
              <select 
                value={provenance} 
                onChange={(e) => setProvenance(e.target.value)}
                className="w-full border rounded p-2"
                required
              >
                <option value="LOCAL">Local Experience</option>
                <option value="TOURIST">Tourist Visit</option>
                <option value="VERIFIED_BOOKING">Verified Booking</option>
              </select>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Submitting...' : 'Submit Review'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
