import React from 'react';

type FormSectionProps = {
  title?: string;
  children: React.ReactNode;
  sectionDataCy?: string;
};

export const FormSection: React.FC<FormSectionProps> = ({ title, children, sectionDataCy }) => (
  <div className='pt-3 space-y-4 mb-2' data-cy={sectionDataCy}>
    {!!title && (<h3 className='text-lg font-medium leading-6 text-gray-900'>{title}</h3>)}
    {children}
  </div>
);