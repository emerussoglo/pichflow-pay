import React from 'react';
import { Withdrawal } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuildingColumns,
  faMobileScreen,
  faClock,
  faCircleCheck,
  faPlus,
  faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';

interface WithdrawalsViewProps {
  withdrawals: Withdrawal[];
  onOpenWithdrawalModal: () => void;
}

export const WithdrawalsView: React.FC<WithdrawalsViewProps> = ({
  withdrawals,
  onOpenWithdrawalModal,
}) => {
  const formatMoney = (val: number, cur: string) => {
    return new Intl.NumberFormat('fr-FR').format(val) + ' ' + cur;
  };

  return (
    <div className="pf-dashboard-body">
      <div className="pf-dashboard-header">
        <div>
          <h1 className="pf-dashboard-greeting">Retraits de Fonds (Payouts)</h1>
          <p className="pf-dashboard-subgreeting">
            Transférez votre solde disponible vers vos comptes Mobile Money marchands ou vos comptes bancaires d’entreprise.
          </p>
        </div>

        <button onClick={onOpenWithdrawalModal} className="pf-btn pf-btn-primary pf-btn-md pf-btn-shine">
          <FontAwesomeIcon icon={faPlus} />
          <span>Nouveau retrait</span>
        </button>
      </div>

      {/* Withdrawals List Table */}
      <div className="pf-table-container">
        <table className="pf-table">
          <thead>
            <tr>
              <th>Référence</th>
              <th>Méthode</th>
              <th>Bénéficiaire</th>
              <th>Opérateur / Banque</th>
              <th>Montant Brut</th>
              <th>Frais de Retrait</th>
              <th>Net Viré</th>
              <th>Statut</th>
              <th>Date de demande</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((w) => (
              <tr key={w.id}>
                <td>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--pf-primary)' }}>
                    {w.reference}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FontAwesomeIcon
                      icon={w.methodType === 'mobile_money' ? faMobileScreen : faBuildingColumns}
                      style={{ color: 'var(--pf-primary)' }}
                    />
                    <span>{w.methodType === 'mobile_money' ? 'Mobile Money' : 'Virement Bancaire'}</span>
                  </div>
                </td>
                <td>
                  <div style={{ fontWeight: 600 }}>{w.recipientName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--pf-muted)', fontFamily: 'JetBrains Mono' }}>
                    {w.recipientPhoneOrIban}
                  </div>
                </td>
                <td>
                  <span className="pf-badge pf-badge-neutral">{w.operatorOrBank}</span>
                </td>
                <td>
                  <strong>{formatMoney(w.amount, w.currency)}</strong>
                </td>
                <td style={{ color: 'var(--pf-danger)', fontSize: '0.8125rem' }}>
                  -{formatMoney(w.fee, w.currency)}
                </td>
                <td>
                  <strong style={{ color: 'var(--pf-text)' }}>
                    {formatMoney(w.netAmount, w.currency)}
                  </strong>
                </td>
                <td>
                  <span
                    className={`pf-badge ${
                      w.status === 'success'
                        ? 'pf-badge-success'
                        : w.status === 'processing'
                        ? 'pf-badge-pending'
                        : 'pf-badge-neutral'
                    }`}
                  >
                    <span className="pf-badge-dot"></span>
                    {w.status === 'success' ? 'Virement complété' : w.status === 'processing' ? 'En traitement bancaire' : w.status}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--pf-muted)' }}>
                    {new Date(w.createdAt).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
