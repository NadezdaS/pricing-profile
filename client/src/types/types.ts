export type Category =
	| 'Alcoholic Beverage'
	| 'Seafood'
	| 'Snacks';

export type SubCategory =
	| 'Wine'
	| 'Beer'
	| 'Cider'
	| 'Fish'
	| 'Potato Chips'
	| 'Bars';

export type Segment =
	| 'Red'
	| 'Sparkling'
	| 'Port/Dessert'
	| 'White'
	| 'Lager'
	| 'Pale Ale'
	| 'Ale'
	| 'Flavoured Cider'
	| 'Apple Cider'
	| 'Salmon'
	| 'Shellfish'
	| 'Chips'
	| 'Muesli Bars';

export type GroupedProductTaxonomy = {
	[key in Category]: {
		[key in SubCategory]?: Segment[];
	}
};