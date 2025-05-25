import type { GroupedProductTaxonomy, Category, SubCategory, Segment } from '../types/types'

export const groupedProductTaxonomy: GroupedProductTaxonomy = {
  'Alcoholic Beverage': {
    'Wine': ['Red', 'Sparkling', 'Port/Dessert', 'White'],
    'Beer': ['Lager', 'Pale Ale', 'Ale'],
    'Cider': ['Flavoured Cider', 'Apple Cider']
  },
  'Seafood': {
    'Fish': ['Salmon', 'Shellfish']
  },
  'Snacks': {
    'Potato Chips': ['Chips'],
    'Bars': ['Muesli Bars']
  }
};

export const categories: Category[] = Object.keys(groupedProductTaxonomy) as Category[];

export const subCategories: SubCategory[] = categories.flatMap(
  (category) =>
    Object.keys(groupedProductTaxonomy[category]) as SubCategory[]
);

export const segments: Segment[] = subCategories.flatMap((sub) =>
  Object.values(groupedProductTaxonomy)
    .flatMap((c) => Object.entries(c))
    .filter(([s]) => s === sub)
    .flatMap(([, segs]) => segs)
) as Segment[];

export const brands = [
  'High Garden',
  'Koyama Wines',
  'Lacourte-Godbillon',
  'Brooklyn Brewery',
  'Balter Brewing',
  'Stone & Wood',
  'Rekorderlig',
  'Willie Smith’s',
  'Young Henrys',
  'Tassal',
  'Ocean Fresh',
  'Red Rock Deli',
  'Carman’s',
  'Smith’s'
];
