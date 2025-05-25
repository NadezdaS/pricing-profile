import { calculateAdjustments } from '../src/utils/calculateAdjustments';
import type { Product } from '../../shared/types';

// mock UUIDs for predictable results
jest.mock('uuid', () => ({
	v4: jest.fn(() => 'mock-uuid')
}));

const mockProducts: Product[] = [
	{
		id: '1',
		title: 'Test Product 1',
		skuCode: 'SKU1',
		category: 'Snacks',
		subCategory: 'Potato Chips',
		segment: 'Chips',
		brand: 'Test Brand',
		globalWholesalePrice: 100
	},
	{
		id: '2',
		title: 'Test Product 2',
		skuCode: 'SKU2',
		category: 'Snacks',
		subCategory: 'Potato Chips',
		segment: 'Chips',
		brand: 'Test Brand',
		globalWholesalePrice: 50
	}
];

describe('calculateAdjustments', () => {
	const pricingProfileId = 'profile-123';

	it('calculates fixed decrease correctly', () => {
		const result = calculateAdjustments({
			adjustment: 10,
			adjustmentMode: 'fixed',
			adjustmentDirection: 'decrease',
			productIds: ['1', '2'],
			pricingProfileId,
			products: mockProducts
		});

		expect(result).toEqual([
			{ id: 'mock-uuid', pricingProfileId, productId: '1', newPrice: 90 },
			{ id: 'mock-uuid', pricingProfileId, productId: '2', newPrice: 40 }
		]);
	});

	it('calculates percentage increase correctly', () => {
		const result = calculateAdjustments({
			adjustment: 20,
			adjustmentMode: 'percentage',
			adjustmentDirection: 'increase',
			productIds: ['1', '2'],
			pricingProfileId,
			products: mockProducts
		});

		expect(result).toEqual([
			{ id: 'mock-uuid', pricingProfileId, productId: '1', newPrice: 120 },
			{ id: 'mock-uuid', pricingProfileId, productId: '2', newPrice: 60 }
		]);
	});
});
