import React from 'react';
import { TransactionsView } from '../../components/dashboard/TransactionsView';
import { Transaction } from '../../types';

interface TransactionsPageProps {
  transactions: Transaction[];
}

export const TransactionsPage: React.FC<TransactionsPageProps> = ({ transactions }) => {
  return <TransactionsView transactions={transactions} />;
};
