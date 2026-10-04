import { fetchClient } from './client';

export const discoveryApi = {
  getNearbyBusinesses: (lat: number, lng: number, radius?: number) =>
    fetchClient('/discover/businesses/nearby', { params: { lat, lng, radius } }),

  getBusinessDetail: (id: string) =>
    fetchClient(`/discover/businesses/${id}`),

  getBusinessServices: (id: string) =>
    fetchClient(`/discover/businesses/${id}/services`),

  getBusinessOffers: (id: string) =>
    fetchClient(`/discover/businesses/${id}/offers`),

  getBusinessReviews: (id: string) =>
    fetchClient(`/discover/businesses/${id}/reviews`),
    
  createBookingRequest: (businessId: string, payload: any, idempotencyKey: string) =>
    fetchClient(`/discover/businesses/${businessId}/booking-requests`, {
      method: 'POST',
      body: JSON.stringify(payload),
      idempotencyKey
    }),
};
