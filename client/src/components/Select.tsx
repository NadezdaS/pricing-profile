import React from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: string[];
  defaultOption?: string;
};

export const Select: React.FC<SelectProps> = ({ label, options, defaultOption = 'All', ...props }) => (
  <div className='space-y-1'>
    {label && <label className='text-sm font-medium text-gray-700'>{label}</label>}
    <select {...props} className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-[35px] max-w-[250px] p-[5px]'>
      {options.length > 1 && <option value=''>{defaultOption}</option>}
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);