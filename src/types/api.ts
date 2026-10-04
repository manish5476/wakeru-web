export type BusinessCategory = 'STAY' | 'DINING' | 'TRANSPORT' | 'RENTAL' | 'ACTIVITY';
export type VerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'REVOKED';

export interface Business {
  id: string;
  vendorId: string;
  businessName: string;
  category: BusinessCategory;
  description?: string;
  location: any; 
  address: string;
  city: string;
  country: string;
  status: 'active' | 'suspended' | 'closed';
  verificationStatus: VerificationStatus;
  createdAt: string;
  updatedAt: string;
  media?: BusinessMedia[];
  offers?: BusinessOffer[];
  services?: BusinessService[];
  reviews?: BusinessReview[];
}

export interface BusinessMedia {
  id: string;
  businessId: string;
  url: string;
  provider: string;
  mediaType: 'image' | 'video' | 'logo' | 'cover';
  altText?: string;
  sortOrder: number;
  moderationStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'HIDDEN';
  createdAt: string;
}

export interface BusinessOffer {
  id: string;
  businessId: string;
  title: string;
  description?: string;
  discountType: string;
  discountValue?: number;
  status: 'active' | 'inactive' | 'expired';
  startAt?: string;
  endAt?: string;
}

export interface BusinessService {
  id: string;
  businessId: string;
  name: string;
  description?: string;
  priceMinor: number;
  currency: string;
}

export interface BusinessReview {
  id: string;
  businessId: string;
  travelerHash: string;
  rating: number;
  comment?: string;
  provenance: string;
  createdAt: string;
  vendorReply?: string;
}

export interface BookingRequest {
  id: string;
  bookingReference: string;
  businessId: string;
  travelerHash: string;
  status: 'REQUESTED' | 'ACCEPTED' | 'DECLINED' | 'CANCELLED' | 'EXPIRED';
  priceSnapshotMinor: number;
  currency: string;
  serviceId?: string;
  bookingDate: string;
  createdAt: string;
}

export interface Reservation {
  id: string;
  bookingRequestId: string;
  status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  vendorConfirmedAt: string;
}

export interface Vendor {
  id: string;
  email: string;
  name: string;
  status: 'ACTIVE' | 'SUSPENDED';
}
