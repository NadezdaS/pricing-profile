import React from 'react';

type Option = {
  label: string;
  value: string;
};

type RadioGroupProps = {
  label: string;
  name: string;
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
};

export const RadioGroup: React.FC<RadioGroupProps> = ({ label, name, options, selected, onChange }) => (
  <div className='space-y-1'>
    <span className='text-sm font-medium text-gray-700'>{label}</span>
    <div className='space-x-4'>
      {options.map(({ label: optLabel, value }) => (
        <label key={value} className='inline-flex items-center'>
          <input
            type='radio'
            name={name}
            value={value}
            checked={selected === value}
            onChange={() => onChange(value)}
            className='h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500'
          />
          <span className='ml-2 text-sm text-gray-700'>{optLabel}</span>
        </label>
      ))}
    </div>
  </div>
);