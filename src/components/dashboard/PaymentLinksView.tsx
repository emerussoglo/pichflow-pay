import React, { useState } from 'react';
import { PaymentLink } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faCopy,
  faCheck,
  faLink,
  faArrowUpRightFromSquare,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { useToast } from '../ui/ToastContext';

interface PaymentLinksViewProps {
  paymentLinks: PaymentLink[];
  onOpenCreateModal: () => void;
  onPreviewLink: (link: PaymentLink) => void;
}

export const PaymentLinksView: React.FC<PaymentLinksViewProps> = ({
  paymentLinks,
  onOpenCreateModal,
  onPreviewLink,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleCopy = (link: PaymentLink) => {
    const url = `https://pay.pichflow.com/l/${link.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(link.id);
    showToast(`Lien copié : ${url}`, 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const formatMoney = (val: number | null, cur: string) => {
    if (val === null) return 'Montant libre';
    return new Intl.NumberFormat('fr-FR').format(val) + ' ' + cur;
  };

  return (
    <div className="pf-dashboard-body">
      <div className="pf-dashboard-header">
        <div>
          <h1 className="pf-dashboard-greeting">Liens de Paiement</h1>
          <p className="pf-dashboard-subgreeting">
            Créez des pages de paiement sécurisées et partagez-les en un clic à vos clients.
          </p>
        </div>

        <button onClick={onOpenCreateModal} className="pf-btn pf-btn-primary pf-btn-md pf-btn-shine">
          <FontAwesomeIcon icon={faPlus} />
          <span>Créer un lien de paiement</span>
        </button>
      </div>

      <div className="pf-table-container">
        <table className="pf-table">
          <thead>
            <tr>
              <th>Titre & Description</th>
              <th>Montant</th>
              <th>Devise</th>
              <th>Statut</th>
              <th>Utilisations</th>
              <th>Lien public</th>
              <th>Date de création</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paymentLinks.map((pl) => (
              <tr key={pl.id}>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--pf-text)' }}>{pl.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--pf-muted)', maxWidth: '280px', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {pl.description}
                  </div>
                </td>
                <td>
                  <strong>{formatMoney(pl.amount, pl.currency)}</strong>
                </td>
                <td>{pl.currency}</td>
                <td>
                  <span className="pf-badge pf-badge-success">
                    <span className="pf-badge-dot"></span>
                    {pl.status === 'active' ? 'Actif' : pl.status}
                  </span>
                </td>
                <td>
                  <span style={{ fontWeight: 600 }}>{pl.usageCount}</span>
                  {pl.usageLimit && <span style={{ color: 'var(--pf-muted)' }}> / {pl.usageLimit}</span>}
                </td>
                <td>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: 'var(--pf-primary)' }}>
                    /l/{pl.slug}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--pf-muted)' }}>
                    {new Date(pl.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleCopy(pl)}
                      className="pf-btn pf-btn-secondary pf-btn-sm"
                      title="Copier l'URL"
                    >
                      <FontAwesomeIcon icon={copiedId === pl.id ? faCheck : faCopy} />
                      <span>{copiedId === pl.id ? 'Copié' : 'Copier'}</span>
                    </button>
                    <button
                      onClick={() => onPreviewLink(pl)}
                      className="pf-btn pf-btn-ghost pf-btn-sm"
                      title="Prévisualiser le checkout"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
