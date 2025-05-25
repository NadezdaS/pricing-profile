import axios from 'axios';
import type { Product, PricingProfile, ProductAdjustment } from '../../../shared/types';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// Fetch all products (filtered if filters exist)
export const fetchProducts = async (
	filters?: { category?: string, subCategory?: string; brand?: string; segment?: string }
): Promise<Product[]> => {
	const validFilters = Object.fromEntries(
		Object.entries(filters || {}).filter(([_, value]) => value)
	);

	const params = new URLSearchParams(validFilters as Record<string, string>);
	const res = await axios.get<Product[]>(`${API_BASE}/products?${params}`);
	return res.data;
};

export interface CreatePricingProfileParams {
  basePriceSource: string;
  adjustmentMode: 'fixed' | 'dynamic';
  adjustmentDirection: 'increase' | 'decrease';
  productIds: string[];
}

// Create a pricing profile
export const createPricingProfile = async (
  data: CreatePricingProfileParams
): Promise<{ profile: PricingProfile; adjustments: ProductAdjustment[] }> => {
  const res = await axios.post(`${API_BASE}/pricing-profiles`, data);
  return res.data;
};

// Fetch all pricing profiles
export const fetchPricingProfiles = async (): Promise<PricingProfile[]> => {
	const res = await axios.get(`${API_BASE}/pricing-profiles`);
	return res.data;
};

// Get a single pricing profile by ID, with adjustments
export const fetchPricingProfileDetails = async (
	id: string
): Promise<{ profile: PricingProfile; adjustments: ProductAdjustment[] }> => {
	const res = await axios.get(`${API_BASE}/pricing-profiles/${id}`);
	return res.data;
};