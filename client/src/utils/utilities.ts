import { groupedProductTaxonomy } from '../data/dataStore';
import type { Category, SubCategory, Segment } from '../types/types';

export function getAllCategories(): Category[] {
	return Object.keys(groupedProductTaxonomy) as Category[];
}

export function getSubCategoriesByCategory(category?: Category): SubCategory[] {
	if (!category) {
		// Return all sub-categories across all categories
		return Object.values(groupedProductTaxonomy)
			.flatMap(categoryMap => Object.keys(categoryMap)) as SubCategory[];
	}

	// Return sub-categories for a specific category
	return Object.keys(groupedProductTaxonomy[category] ?? {}) as SubCategory[];
}

export function getSegmentsByCategory(
  category?: Category,
  subCategory?: string
): Segment[] {
  if (!category) {
    return Object.values(groupedProductTaxonomy)
      .flatMap(subCatMap => Object.values(subCatMap).flat()) as Segment[];
  }

  const subCategoryMap = groupedProductTaxonomy[category];
	if (!subCategoryMap) return [];

  if (subCategory && subCategory in subCategoryMap) {
    return subCategoryMap[subCategory as keyof typeof subCategoryMap] ?? [];
  }

  // If sub-category not provided, return all segments under all sub-categories in the category
  return Object.values(subCategoryMap).flat() as Segment[];
}
