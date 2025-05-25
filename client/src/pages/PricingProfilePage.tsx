import { useEffect, useState } from 'react';
import type { Product } from '../../../shared/types';
import type { Category, SubCategory, Segment } from '../types/types';
import { fetchProducts, createPricingProfile } from '../services/pricingProfileService';
import { brands } from '../data/dataStore';
import {
  getAllCategories,
  getSubCategoriesByCategory,
  getSegmentsByCategory
} from '../utils/utilities'

import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { RadioGroup } from '../components/RadioGroup';
import { FormSection } from '../components/FormSection';

interface ProductAdjustmentPayload {
  productId: string;
  adjustment: number;
}

interface CreatePricingProfilePayload {
  basePriceSource: string;
  adjustmentMode: 'fixed' | 'dynamic';
  adjustmentDirection: 'increase' | 'decrease';
  productIds: string[];
  productAdjustments: ProductAdjustmentPayload[];
}


export default function PricingProfilePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [adjustmentMode, setAdjustmentMode] = useState<'fixed' | 'dynamic'>('fixed');
  const [adjustmentDirection, setAdjustmentDirection] = useState<'increase' | 'decrease'>('decrease');
  const [profileType, setProfileType] = useState('Multiple Products');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<Category | undefined>();
  const [subCategory, setSubCategory] = useState<SubCategory | ''>();
  const [segment, setSegment] = useState<Segment | ''>('');
  const [brand, setBrand] = useState('');
  const [basePriceSource, setBasePriceSource] = useState('Global wholesale price');
  const [productAdjustments, setProductAdjustments] = useState<Record<string, number>>({});
  const [isEditingProductId, setIsEditingProductId] = useState('');

  const categories = getAllCategories();
  const subCategories = getSubCategoriesByCategory(category);
  const segments = getSegmentsByCategory(category, subCategory || undefined);

  const subHeadingStyle = 'font-medium text-gray-500';
  const cellStyle = 'px-4 py-2 border border-gray-300';

  useEffect(() => {
    fetchProducts({
      category,
      subCategory: subCategory || undefined,
      segment: segment || undefined,
      brand: brand || undefined
    })
      .then(setProducts)
      .catch(console.error);
  }, [category, subCategory, brand, segment]);

  const handleCheckboxChange = (sku: string) => {
    setSelectedProducts((prev) =>
      prev.includes(sku) ? prev.filter((item) => item !== sku) : [...prev, sku]
    );
  };

  const handleSelectAll = () => {
    const allSkus = filteredProducts.map((p) => p.skuCode);
    setSelectedProducts(allSkus);
  };

  const handleDeselectAll = () => {
    setSelectedProducts([]);
  };

  const filteredProducts = products.filter(
    (p) =>
      !searchTerm ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.skuCode.includes(searchTerm)
  );

  const handleCreateProfilSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedProductIds = products
      .filter(p => selectedProducts.includes(p.skuCode))
      .map(p => p.id);

    const productAdjustmentsList = products
      .filter(p => selectedProducts.includes(p.skuCode))
      .map(p => ({
        productId: p.id,
        adjustment: productAdjustments[p.skuCode] ?? 0
      }));

    const payload: CreatePricingProfilePayload = {
      basePriceSource,
      adjustmentMode,
      adjustmentDirection,
      productIds: selectedProductIds,
      productAdjustments: productAdjustmentsList
    };

    try {
      const result = await createPricingProfile(payload);

      console.log('Created profile:', result.profile);
      console.log('Created profile adjustments:', result.adjustments);
      alert('Pricing profile created successfully!');
    } catch (err) {
      console.error('Error creating profile:', err);
      alert('Failed to create pricing profile.');
    }
  };

  return (
    <form onSubmit={handleCreateProfilSubmit} className='space-y-8 divide-y divide-gray-200 p-6 bg-white shadow-sm rounded-lg'>
      <FormSection title='Basic Pricing Profile' sectionDataCy='profile-title-section'>
        <p>Profile description...</p>
      </FormSection>

      <FormSection title='Select Product Pricing' sectionDataCy='profile-select-products-section'>
        <RadioGroup
          label='You are creating a Pricing Profile for'
          name='profileType'
          options={[
            { label: 'One Product', value: 'One Product' },
            { label: 'Multiple Products', value: 'Multiple Products' },
            { label: 'All Products', value: 'All Products' }
          ]}
          selected={profileType}
          onChange={setProfileType}
        />

        <div className={subHeadingStyle}>Search for Products</div>

        <div className='flex flex-row gap-5 w-full mb-[20px]'>
          <Input
            type='text'
            placeholder='Search'
            value={searchTerm}
            data-cy='search-field'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select defaultOption='Category' options={categories} value={category} data-cy='select-category' onChange={(e) => {
            const value = e.target.value || undefined;
            setCategory(value as Category | undefined);
            setSubCategory('');
            setSegment('');
          }} />

          <Select defaultOption='Subcategory' options={subCategories} value={subCategory} data-cy='select-subcategory' onChange={(e) => {
            setSubCategory(e.target.value as SubCategory);
            setSegment('');
          }} />

          <Select defaultOption='Segment' options={segments} value={segment} data-cy='select-segment' onChange={(e) => setSegment(e.target.value as Segment | '')} />

          <Select defaultOption='Brand' options={brands} value={brand} data-cy='select-brand' onChange={(e) => setBrand(e.target.value)} />
        </div>
      </FormSection>

      <FormSection>
        <div className='flex space-x-6'>
          <label className='inline-flex items-center'>
            <input
              type='radio'
              name='productToggle'
              onChange={handleDeselectAll}
              checked={selectedProducts.length === 0}
            />
            <span className='ml-2'>Deselect All</span>
          </label>
          <label className='inline-flex items-center'>
            <input
              type='radio'
              name='productToggle'
              onChange={handleSelectAll}
              checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
            />
            <span className='ml-2'>Select All</span>
          </label>
        </div>
        <div className='grid grid-cols-1 gap-y-4 mb-[20px]' data-cy='products-list'>
          {filteredProducts.map((product, index) => (
            <div key={product.skuCode} className='relative flex items-start'>
              <div className='flex h-5 items-center'>
                <input
                  id={product.skuCode}
                  name={product.skuCode}
                  type='checkbox'
                  checked={selectedProducts.includes(product.skuCode)}
                  onChange={() => handleCheckboxChange(product.skuCode)}
                  className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                  data-cy={`product-checkbox-input-${index}`}
                />
              </div>
              <div className='ml-3 text-sm'>
                <label htmlFor={product.skuCode} className='font-medium text-gray-700' data-cy={`product-checkbox-title-${index}`}>
                  {product.title}
                </label>
                <p className='text-gray-500'>{product.skuCode} - {product.subCategory} - {product.segment} - {product.brand}</p>
              </div>
            </div>
          ))}
        </div>
      </FormSection>


      <FormSection title='Pricing Adjustment' sectionDataCy='profile-price-adjustment-section'>
        <div className='flex flex-col space-y-4 mb-[20px]'>
          <Select
            label='Based on'
            options={['Global wholesale price']}
            defaultOption='Global wholesale price'
            value={basePriceSource}
            onChange={(e) => setBasePriceSource(e.target.value)}
          />

          <RadioGroup
            label='Set Price Adjustment Mode'
            name='adjustmentMode'
            options={[
              { label: 'Fixed ($)', value: 'fixed' },
              { label: 'Dynamic (%)', value: 'dynamic' }
            ]}
            selected={adjustmentMode}
            onChange={(value) => setAdjustmentMode(value as 'fixed' | 'dynamic')}
          />

          <RadioGroup
            label='Set Price Adjustment Increment Mode'
            name='adjustmentDirection'
            options={[
              { label: 'Increase +', value: 'increase' },
              { label: 'Decrease -', value: 'decrease' }
            ]}
            selected={adjustmentDirection}
            onChange={(value) => setAdjustmentDirection(value as 'increase' | 'decrease')}
          />
        </div>

      </FormSection>

      <FormSection>
        <table className='min-w-full bg-white border border-gray-300' data-cy='product-adjustments-table'>
          <thead>
            <tr>
              <th className={cellStyle}>Product Title</th>
              <th className={cellStyle}>SKU code</th>
              <th className={cellStyle}>Category</th>
              <th className={cellStyle}>Based on Price</th>
              <th className={cellStyle}>Adjustment</th>
              <th className={cellStyle}>New Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => {
              if (!selectedProducts.includes(product.skuCode)) return null;
              const basePrice = product.globalWholesalePrice;
              const rowAdjustment = productAdjustments[product.skuCode] ?? 0;

              const calculateNewPrice = (price: number, adj: number) => {
                const value = adjustmentMode === 'fixed' ? adj : price * (adj / 100);
                const newPrice = adjustmentDirection === 'increase' ? price + value : price - value;
                return Math.max(newPrice, 0);
              };

              const getFormattedAdjustment = (adj: number) => {
                const sign = adjustmentDirection === 'increase' ? '+' : '-';
                const unit = adjustmentMode === 'fixed' ? `$ ${adj}` : `${adj}%`;
                return `${sign}${unit}`;
              };

              return (
                <tr key={product.skuCode}>
                  <td className={cellStyle}>{product.title}</td>
                  <td className={cellStyle}>{product.skuCode}</td>
                  <td className={cellStyle}>{product.subCategory}</td>
                  <td className={cellStyle}>${basePrice.toFixed(2)}</td>
                  <td className={cellStyle}>
                    {isEditingProductId !== '' && isEditingProductId === product.id ? (
                      <input
                        type='text'
                        className='w-full rounded px-2 py-1 text-sm'
                        value={rowAdjustment}
                        onChange={(e) => setProductAdjustments((prev) => ({
                          ...prev,
                          [product.skuCode]: Number(e.target.value)
                        }))}
                        onBlur={() => setIsEditingProductId('')}
                        autoFocus
                      />
                    ) : (
                      <span
                        className='cursor-pointer text-sm text-green-600'
                        onClick={() => setIsEditingProductId(product.id)}
                      >
                        {getFormattedAdjustment(rowAdjustment)}
                      </span>
                    )}
                  </td>
                  <td className={cellStyle}>${calculateNewPrice(basePrice, rowAdjustment).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </FormSection>

      <div className='pt-5'>
        <div className='flex justify-end'>
          <button
            type='submit'
            className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Save Profile
          </button>
        </div>
      </div>
    </form>
  );
}
