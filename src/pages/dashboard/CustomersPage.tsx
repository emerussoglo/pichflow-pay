import React from 'react';
import { CustomersView } from '../../components/dashboard/CustomersView';
import { Customer } from '../../types';

interface CustomersPageProps {
  customers: Customer[];
}

export const CustomersPage: React.FC<CustomersPageProps> = ({ customers }) => {
  return <CustomersView customers={customers} />;
};
