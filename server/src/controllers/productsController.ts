import { Request, Response } from 'express';
import { products } from '../models/dataStore';
import { Product } from '../../../shared/types';

export const getFilteredProducts = (req: Request, res: Response<Product[]>): void => {
  const { category, subCategory, brand, segment } = req.query;
  let filtered = products;

  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }

  if (subCategory) {
    filtered = filtered.filter(p => p.subCategory === subCategory);
  }
  if (brand) {
    filtered = filtered.filter(p => p.brand === brand);
  }
  if (segment) {
    filtered = filtered.filter(p => p.segment === segment);
  }

  res.json(filtered);
};

export const getProductById = (req: Request, res: Response): void => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
	res.status(404).json({ error: 'Product not found' });
	return;
  } 
  res.json(product);
};