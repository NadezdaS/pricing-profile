export interface Product {
  id: string;
  title: string;
  skuCode: string;
  brand: string;
  category: string;
  subCategory: string;
  segment: string;
  globalWholesalePrice: number;
}

export interface PricingProfile {
  id: string;
  basePriceSource: string;
  adjustmentMode: 'fixed' | 'dynamic';
  adjustmentDirection: 'increase' | 'decrease';
  createdAt: Date;
  updatedAt: Date;
  products: Product[];
}

export interface ProductAdjustment {
  id: string;
  pricingProfileId: string;
  productId: string;
  newPrice: number;
}