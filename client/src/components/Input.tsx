import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Input: React.FC<InputProps> = ({ label, ...props }) => (
  <div className='space-y-1'>
    {label && <label className='text-sm font-medium text-gray-700'>{label}</label>}
    <input {...props} className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-[35px] max-w-[250px] p-[5px]' />
  </div>
);