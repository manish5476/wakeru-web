import { fetchClient } from './client';
import { Business, BusinessService, BusinessOffer, BusinessReview, BookingRequest, Reservation } from '../types/api';

export const discoveryApi = {
  // Discovery
  getNearbyBusinesses: (lat: number, lng: number, radius?: number) =>
    fetchClient<{ data: Business[] }>('/discover/businesses/nearby', { params: { lat, lng, radius } }),
  getDestinationBusinesses: (city: string, country: string, category?: string) =>
    fetchClient<{ data: Business[] }>('/discover/businesses/destination', { params: { city, country, category } }),
  compareBusinesses: (ids: string) =>
    fetchClient<{ data: Business[] }>('/discover/businesses/compare', { params: { ids } }),
  getBusinessDetail: (id: string) =>
    fetchClient<Business>(`/discover/businesses/${id}`),

  // Business Details
  getBusinessServices: (id: string) =>
    fetchClient<{ data: BusinessService[] }>(`/discover/businesses/${id}/services`),
  getBusinessOffers: (id: string) =>
    fetchClient<{ data: BusinessOffer[] }>(`/discover/businesses/${id}/offers`),
  recordInteraction: (id: string, type: 'view' | 'click' | 'save' | 'share') =>
    fetchClient(`/discover/businesses/${id}/interactions`, { method: 'POST', body: JSON.stringify({ type }) }),
  reportBusiness: (id: string, reason: string) =>
    fetchClient(`/discover/businesses/${id}/report`, { method: 'POST', body: JSON.stringify({ reason }) }),

  // Bookings
  createBookingRequest: (businessId: string, payload: any, idempotencyKey: string) =>
    fetchClient<BookingRequest>(`/discover/businesses/${businessId}/booking-requests`, { method: 'POST', body: JSON.stringify(payload), idempotencyKey }),
  cancelBookingRequest: (requestId: string) =>
    fetchClient(`/discover/booking-requests/${requestId}/cancel`, { method: 'POST' }),
  getTravelerBookings: () =>
    fetchClient<{ data: BookingRequest[] }>('/discover/traveler/bookings'),
  getTravelerBookingDetail: (id: string) =>
    fetchClient<BookingRequest>(`/discover/traveler/bookings/${id}`),
  getTravelerReservationDetail: (id: string) =>
    fetchClient<Reservation>(`/discover/traveler/reservations/${id}`),

  // Reviews
  getBusinessReviews: (id: string) =>
    fetchClient<{ data: BusinessReview[] }>(`/discover/businesses/${id}/reviews`),
  getBusinessReviewsSummary: (id: string) =>
    fetchClient(`/discover/businesses/${id}/reviews/summary`),
  createReview: (businessId: string, payload: any, idempotencyKey: string) =>
    fetchClient<BusinessReview>(`/discover/businesses/${businessId}/reviews`, { method: 'POST', body: JSON.stringify(payload), idempotencyKey }),
  reportReview: (reviewId: string, reason: string) =>
    fetchClient(`/discover/reviews/${reviewId}/report`, { method: 'POST', body: JSON.stringify({ reason }) }),

  // Advertising
  recordAdEvent: (campaignId: string, type: 'impression' | 'click') =>
    fetchClient('/discover/events', { method: 'POST', body: JSON.stringify({ campaignId, type }) }),
  getEligibleCampaigns: (category: string, city: string) =>
    fetchClient('/discover/campaigns/eligible', { params: { category, city } }),
};
