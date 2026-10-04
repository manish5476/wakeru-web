import { fetchClient } from './client';
import { Business, BusinessMedia, Vendor } from '../types/api';

export const adminApi = {
  // Businesses & Moderation
  getBusinesses: (page = 1) => fetchClient<{ data: Business[], pagination: any }>('/admin/businesses', { params: { page } }),
  getBusinessById: (id: string) => fetchClient<Business>(`/admin/businesses/${id}`),
  verifyBusiness: (id: string, status: string) => fetchClient(`/admin/businesses/${id}/verify`, { method: 'PATCH', body: JSON.stringify({ verificationStatus: status }) }),
  
  // Media Moderation
  getMediaQueue: () => fetchClient<{ data: BusinessMedia[] }>('/admin/media'),
  reviewMedia: (id: string, status: string) => fetchClient(`/admin/media/${id}/review`, { method: 'POST', body: JSON.stringify({ moderationStatus: status }) }),
  
  // Vendors
  getVendors: (page = 1) => fetchClient<{ data: Vendor[], pagination: any }>('/admin/vendors', { params: { page } }),
  suspendVendor: (id: string) => fetchClient(`/admin/vendors/${id}/suspend`, { method: 'PATCH', body: JSON.stringify({ action: 'suspend' }) }),
  
  // Reviews
  getReviewReports: () => fetchClient<any>('/admin/reviews/reports'),
  dismissReviewReport: (reportId: string) => fetchClient<any>(`/admin/reviews/reports/${reportId}/dismiss`, { method: 'PATCH' }),
  deleteReview: (reviewId: string) => fetchClient<any>(`/admin/reviews/${reviewId}`, { method: 'DELETE' }),

  // Bookings & Reservations
  getBookingQueue: () => fetchClient<any>('/admin/booking-requests'),
  getBookingById: (id: string) => fetchClient<any>(`/admin/booking-requests/${id}`),
  getReservations: () => fetchClient<any>('/admin/reservations'),
  getReservationById: (id: string) => fetchClient<any>(`/admin/reservations/${id}`),

  // Campaigns
  getCampaigns: () => fetchClient<any>('/admin/campaigns'),
  reviewCampaign: (id: string, status: string) => fetchClient<any>(`/admin/campaigns/${id}/review`, { method: 'POST', body: JSON.stringify({ status }) }),

  // Logs & Auditing
  getAuditLogs: (page = 1) => fetchClient<{ data: any[], pagination: any }>('/admin/audit-logs', { params: { page } }),
  getDemandInsights: () => fetchClient<any>('/admin/demand-insights')
};
