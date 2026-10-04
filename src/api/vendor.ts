import { fetchClient } from './client';
import { Business, BusinessMedia, BusinessOffer, BusinessService, BookingRequest, Reservation, BusinessReview } from '../types/api';

export const vendorApi = {
  // Identity
  getMe: () => fetchClient('/vendor/me'),
  updateProfile: (data: any) => fetchClient('/vendor/me', { method: 'PATCH', body: JSON.stringify(data) }),

  // Businesses
  createBusiness: (data: any) => fetchClient<Business>('/vendor/businesses', { method: 'POST', body: JSON.stringify(data) }),
  getBusinesses: () => fetchClient<{ data: Business[] }>('/vendor/businesses'),
  getBusinessById: (id: string) => fetchClient<Business>(`/vendor/businesses/${id}`),
  updateBusiness: (id: string, data: any) => fetchClient<Business>(`/vendor/businesses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  getBusinessOverview: (id: string) => fetchClient<any>(`/vendor/businesses/${id}/overview`),
  checkCompleteness: (id: string) => fetchClient<any>(`/vendor/businesses/${id}/completeness`),

  // Media
  getMedia: (businessId: string) => fetchClient<{ data: BusinessMedia[] }>(`/vendor/businesses/${businessId}/media`),
  uploadMedia: (businessId: string, data: any) => fetchClient<BusinessMedia>(`/vendor/businesses/${businessId}/media`, { method: 'POST', body: JSON.stringify(data) }),
  deleteMedia: (mediaId: string) => fetchClient(`/vendor/media/${mediaId}`, { method: 'DELETE' }),
  reorderMedia: (businessId: string, updates: any[]) => fetchClient(`/vendor/businesses/${businessId}/media/reorder`, { method: 'PATCH', body: JSON.stringify({ updates }) }),
  setCoverMedia: (businessId: string, mediaId: string) => fetchClient(`/vendor/businesses/${businessId}/media/cover`, { method: 'PATCH', body: JSON.stringify({ mediaId }) }),

  // Offers
  getOffers: (businessId: string) => fetchClient<{ data: BusinessOffer[] }>(`/vendor/businesses/${businessId}/offers`),
  createOffer: (businessId: string, data: any) => fetchClient<BusinessOffer>(`/vendor/businesses/${businessId}/offers`, { method: 'POST', body: JSON.stringify(data) }),
  updateOfferStatus: (offerId: string, status: string) => fetchClient<BusinessOffer>(`/vendor/offers/${offerId}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  deleteOffer: (offerId: string) => fetchClient(`/vendor/offers/${offerId}`, { method: 'DELETE' }),

  // Services
  getServices: (businessId: string) => fetchClient<{ data: BusinessService[] }>(`/vendor/businesses/${businessId}/services`),
  createService: (businessId: string, data: any) => fetchClient<BusinessService>(`/vendor/businesses/${businessId}/services`, { method: 'POST', body: JSON.stringify(data) }),
  deleteService: (serviceId: string) => fetchClient(`/vendor/services/${serviceId}`, { method: 'DELETE' }),

  // CRM: Leads, Bookings & Reservations
  getLeads: (businessId: string) => fetchClient<any>(`/vendor/businesses/${businessId}/leads`),
  getBookingRequests: (businessId: string) => fetchClient<{ data: BookingRequest[] }>(`/vendor/businesses/${businessId}/booking-requests`),
  acceptBookingRequest: (requestId: string) => fetchClient<BookingRequest>(`/vendor/booking-requests/${requestId}`, { method: 'PATCH', body: JSON.stringify({ status: 'ACCEPTED' }) }),
  declineBookingRequest: (requestId: string) => fetchClient<BookingRequest>(`/vendor/booking-requests/${requestId}`, { method: 'PATCH', body: JSON.stringify({ status: 'DECLINED' }) }),
  getReservations: (businessId: string) => fetchClient<{ data: Reservation[] }>(`/vendor/businesses/${businessId}/reservations`),
  completeReservation: (reservationId: string) => fetchClient<Reservation>(`/vendor/reservations/${reservationId}/complete`, { method: 'PATCH' }),

  // Reviews
  getReviews: (businessId: string) => fetchClient<{ data: BusinessReview[] }>(`/vendor/businesses/${businessId}/reviews`),
  replyToReview: (reviewId: string, reply: string) => fetchClient<BusinessReview>(`/vendor/reviews/${reviewId}/reply`, { method: 'POST', body: JSON.stringify({ reply }) }),

  // Advertising Campaigns
  getCampaigns: (businessId: string) => fetchClient<any>(`/vendor/businesses/${businessId}/campaigns`),
  createCampaign: (businessId: string, data: any) => fetchClient<any>(`/vendor/businesses/${businessId}/campaigns`, { method: 'POST', body: JSON.stringify(data) }),
  updateCampaignStatus: (campaignId: string, status: string) => fetchClient<any>(`/vendor/campaigns/${campaignId}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  addFunds: (vendorId: string, amount: number) => fetchClient<any>(`/vendor/${vendorId}/funds`, { method: 'POST', body: JSON.stringify({ amount }) }),

  // Analytics
  getAnalytics: (businessId: string, timeframe: string) => fetchClient<any>(`/vendor/businesses/${businessId}/analytics`, { params: { timeframe } })
};
