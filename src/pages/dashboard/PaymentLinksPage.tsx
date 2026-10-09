import React from 'react';
import { PaymentLinksView } from '../../components/dashboard/PaymentLinksView';
import { PaymentLink } from '../../types';
import { useRouter } from '../../lib/router';

interface PaymentLinksPageProps {
  paymentLinks: PaymentLink[];
  onOpenCreateModal: () => void;
}

export const PaymentLinksPage: React.FC<PaymentLinksPageProps> = ({
  paymentLinks,
  onOpenCreateModal,
}) => {
  const { navigate } = useRouter();

  const handlePreviewLink = (_link: PaymentLink) => {
    navigate('/checkout-demo');
  };

  return (
    <PaymentLinksView
      paymentLinks={paymentLinks}
      onOpenCreateModal={onOpenCreateModal}
      onPreviewLink={handlePreviewLink}
    />
  );
};
