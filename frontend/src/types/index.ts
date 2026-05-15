// Types for TravelSwap

export interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  kyc: {
    status: 'not_submitted' | 'pending' | 'verified' | 'rejected';
    documentType?: string;
    documentNumber?: string;
  };
  wallet: { balance: number };
  ratings: { average: number; count: number };
  totalSales: number;
  totalPurchases: number;
  createdAt: string;
}

export interface Ticket {
  _id: string;
  seller: User | string;
  type: 'bus';
  source: string;
  destination: string;
  travelDate: string;
  travelTime: string;
  operator: string;
  seatNumber: string;
  pnr: string;
  originalPrice: number;
  sellingPrice: number;
  aiSuggestedPrice?: number;
  ticketImage?: string;
  description: string;
  status: 'pending' | 'approved' | 'sold' | 'expired' | 'rejected' | 'cancelled';
  isUrgent: boolean;
  fraudScore: number;
  views: number;
  createdAt: string;
}

export interface Order {
  _id: string;
  buyer: User | string;
  seller: User | string;
  ticket: Ticket;
  amount: number;
  platformFee: number;
  sellerEarnings: number;
  paymentStatus: 'pending' | 'held' | 'released' | 'refunded' | 'failed';
  status: 'pending' | 'confirmed' | 'completed' | 'disputed' | 'cancelled' | 'refunded';
  createdAt: string;
}

export interface Transaction {
  _id: string;
  type: 'credit' | 'debit' | 'refund' | 'withdrawal' | 'platform_fee' | 'sale_earning';
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export interface Review {
  _id: string;
  reviewer: User;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface SearchFilters {
  source?: string;
  destination?: string;
  type?: string;
  date?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}
