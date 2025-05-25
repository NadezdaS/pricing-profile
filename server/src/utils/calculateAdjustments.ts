import { v4 as uuid } from 'uuid';
import { Product } from '../../../shared/types'; // Adjust import if needed

interface ProductAdjustmentInput {
  productId: string;
  adjustment: number;
}

interface AdjustmentParams {
  adjustmentMode: 'fixed' | 'percentage';
  adjustmentDirection: 'increase' | 'decrease';
  pricingProfileId: string;
  productAdjustments: ProductAdjustmentInput[];
  products: Product[];
}

export function calculateAdjustments({
  adjustmentMode,
  adjustmentDirection,
  pricingProfileId,
  productAdjustments,
  products
}: AdjustmentParams) {
  const adjustments = productAdjustments.map(({ productId, adjustment }) => {
    const product = products.find(p => p.id === productId);
    if (!product) return null;

    const base = product.globalWholesalePrice;
    const delta = adjustmentMode === 'fixed' ? adjustment : base * (adjustment / 100);
    const operator = adjustmentDirection === 'increase' ? 1 : -1;
    const newPrice = Math.max(base + operator * delta, 0);

    return {
      id: uuid(),
      pricingProfileId,
      productId,
      newPrice
    };
  }).filter(Boolean);

  return adjustments;
}

