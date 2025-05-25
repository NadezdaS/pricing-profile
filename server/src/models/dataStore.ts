import type { Product } from '../../../shared/types';

export const pricingProfiles: any[] = [];
export const productAdjustments: any[] = [];

export const pricingProfilesStore = {
  getById: (id: number) => pricingProfiles[id],
  add: (profile: any): number => {
    pricingProfiles.push(profile);
    return pricingProfiles.length - 1;
  },
};

export const productAdjustmentsStore = {
  getById: (id: number) => productAdjustments[id],
  add: (profile: any): number => {
    productAdjustments.push(profile);
    return productAdjustments.length - 1;
  },
};

export const products: Product[] = [
  {
    id: '1',
    title: 'High Garden  Pinot Noir 2021',
    skuCode: 'HGVPIN216',
    category: 'Alcoholic Beverage',
    subCategory: 'Wine',
    segment: 'Red',
    brand: 'High Garden',
    globalWholesalePrice: 279.06
  },
  {
    id: '2',
    title: 'Koyama Methode  Brut Nature NV',
    skuCode: 'KOYBRUNV6',
    category: 'Alcoholic Beverage',
    subCategory: 'Wine',
    segment: 'Sparkling',
    brand: 'Koyama Wines',
    globalWholesalePrice: 120
  },
  {
    id: '3',
    title: 'Koyama  Riesling 2018',
    skuCode: 'KOYNR1837',
    category: 'Alcoholic Beverage',
    subCategory: 'Wine',
    segment: 'Port/Dessert',
    brand: 'Koyama Wines',
    globalWholesalePrice: 215.04
  },
  {
    id: '4',
    title: 'Koyama Tussock Riesling 2019',
    skuCode: 'KOYRIE19',
    category: 'Alcoholic Beverage',
    subCategory: 'Wine',
    segment: 'White',
    brand: 'Koyama Wines',
    globalWholesalePrice: 215.04
  },
  {
    id: '5',
    title: 'Lacourte-Godbillon Brut Cru NV',
    skuCode: 'LACBNATNV6',
    category: 'Alcoholic Beverage',
    subCategory: 'Wine',
    segment: 'Sparkling',
    brand: 'Lacourte-Godbillon',
    globalWholesalePrice: 409.32
  },
  {
    id: '1',
    title: 'Brooklyn Lager 355ml',
    skuCode: 'BRKLAG355',
    category: 'Alcoholic Beverage',
    subCategory: 'Beer',
    segment: 'Lager',
    brand: 'Brooklyn Brewery',
    globalWholesalePrice: 55
  },
  {
    id: '2',
    title: 'Balter XPA Can 375ml',
    skuCode: 'BALTXPA375',
    category: 'Alcoholic Beverage',
    subCategory: 'Beer',
    segment: 'Pale Ale',
    brand: 'Balter Brewing',
    globalWholesalePrice: 60
  },
  {
    id: '3',
    title: 'Stone & Wood Pacific Ale 330ml',
    skuCode: 'STNWDPAC330',
    category: 'Alcoholic Beverage',
    subCategory: 'Beer',
    segment: 'Ale',
    brand: 'Stone & Wood',
    globalWholesalePrice: 58
  },
  {
    id: '4',
    title: 'Rekorderlig Strawberry-Lime Cider 500ml',
    skuCode: 'REKSTLCID500',
    category: 'Alcoholic Beverage',
    subCategory: 'Cider',
    segment: 'Flavoured Cider',
    brand: 'Rekorderlig',
    globalWholesalePrice: 62
  },
  {
    id: '5',
    title: 'Willie Smith’s Organic Apple Cider 330ml',
    skuCode: 'WLSMORG330',
    category: 'Alcoholic Beverage',
    subCategory: 'Cider',
    segment: 'Apple Cider',
    brand: 'Willie Smith’s',
    globalWholesalePrice: 64
  },
  {
    id: '6',
    title: 'Young Henrys Newtowner 375ml',
    skuCode: 'YHNEW375',
    category: 'Alcoholic Beverage',
    subCategory: 'Beer',
    segment: 'Pale Ale',
    brand: 'Young Henrys',
    globalWholesalePrice: 59
  },
  {
    id: '7',
    title: 'Fresh Tasmanian Salmon Fillet 200g',
    skuCode: 'TASSAL200',
    category: 'Seafood',
    subCategory: 'Fish',
    segment: 'Salmon',
    brand: 'Tassal',
    globalWholesalePrice: 98
  },
  {
    id: '8',
    title: 'Cooked Tiger Prawns 1kg',
    skuCode: 'TIGPRAWN1KG',
    category: 'Seafood',
    subCategory: 'Fish',
    segment: 'Shellfish',
    brand: 'Ocean Fresh',
    globalWholesalePrice: 135
  },
  {
    id: '10',
    title: 'Red Rock Deli Sea Salt Chips 165g',
    skuCode: 'RRDSEASALT165',
    category: 'Snacks',
    subCategory: 'Potato Chips',
    segment: 'Chips',
    brand: 'Red Rock Deli',
    globalWholesalePrice: 22
  },
  {
    id: '11',
    title: 'Carman’s Muesli Bars Classic Fruit 6pk',
    skuCode: 'CARMMUS6PK',
    category: 'Snacks',
    subCategory: 'Bars',
    segment: 'Muesli Bars',
    brand: 'Carman’s',
    globalWholesalePrice: 30
  },
  {
    id: '12',
    title: 'Smith’s Crinkle Cut Original Chips 170g',
    skuCode: 'SMTHORG170',
    category: 'Snacks',
    subCategory: 'Potato Chips',
    segment: 'Chips',
    brand: 'Smith’s',
    globalWholesalePrice: 20
  }
];

