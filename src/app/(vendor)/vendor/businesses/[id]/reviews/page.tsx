"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { vendorApi } from "@/api/vendor";
import { BusinessReview } from "@/types/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/design-system/components/Card";
import { Button } from "@/design-system/components/Button";

export default function ReviewsPage() {
  const params = useParams();
  const id = params.id as string;
  const [reviews, setReviews] = useState<BusinessReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  const fetchReviews = async () => {
    try {
      const res = await vendorApi.getReviews(id);
      setReviews(res.data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchReviews();
  }, [id]);

  const handleReply = async (reviewId: string) => {
    try {
      await vendorApi.replyToReview(reviewId, replyText[reviewId]);
      setReplyText(prev => ({ ...prev, [reviewId]: "" }));
      fetchReviews();
    } catch (error) {
      console.error("Error replying to review:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reviews</h1>
      <div className="grid gap-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <CardTitle>Rating: {review.rating} / 5</CardTitle>
              <p className="text-sm text-[var(--color-wakeru-text-secondary)]">Traveler: {review.travelerHash} - {new Date(review.createdAt).toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{review.comment}</p>
              {review.vendorReply ? (
                <div className="bg-[var(--color-wakeru-surface-muted)] p-4 rounded-[var(--radius-control)] mt-4">
                  <p className="font-semibold text-sm mb-1">Your Reply:</p>
                  <p className="text-sm">{review.vendorReply}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-4">
                  <textarea
                    className="flex min-h-[80px] w-full rounded-[var(--radius-control)] border border-[var(--color-wakeru-border-strong)] bg-[var(--color-wakeru-bg)] px-3 py-2 text-sm text-[var(--color-wakeru-text-primary)] placeholder:text-[var(--color-wakeru-text-muted)] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--color-wakeru-primary)]"
                    placeholder="Type your reply here..."
                    value={replyText[review.id] || ""}
                    onChange={(e) => setReplyText(prev => ({ ...prev, [review.id]: e.target.value }))}
                  />
                  <div className="flex justify-end">
                    <Button onClick={() => handleReply(review.id)} disabled={!replyText[review.id]}>
                      Post Reply
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        {reviews.length === 0 && (
          <p>No reviews found.</p>
        )}
      </div>
    </div>
  );
}
