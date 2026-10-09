import React from 'react';
import { Wallet, LedgerEntry } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faBuildingColumns,
  faReceipt,
  faArrowTrendUp,
  faArrowTrendDown,
  faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';

interface WalletsViewProps {
  wallets: Wallet[];
  ledgerEntries: LedgerEntry[];
  onOpenWithdrawalModal: () => void;
}

export const WalletsView: React.FC<WalletsViewProps> = ({
  wallets,
  ledgerEntries,
  onOpenWithdrawalModal,
}) => {
  const formatMoney = (val: number, cur: string) => {
    return new Intl.NumberFormat('fr-FR').format(val) + ' ' + cur;
  };

  return (
    <div className="pf-dashboard-body">
      <div className="pf-dashboard-header">
        <div>
          <h1 className="pf-dashboard-greeting">Soldes & Wallets</h1>
          <p className="pf-dashboard-subgreeting">
            Gestion multi-devises des comptes marchands et traçabilité comptable du grand livre.
          </p>
        </div>

        <button onClick={onOpenWithdrawalModal} className="pf-btn pf-btn-primary pf-btn-md pf-btn-shine">
          <FontAwesomeIcon icon={faBuildingColumns} />
          <span>Effectuer un retrait</span>
        </button>
      </div>

      {/* Wallets Cards by Currency */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {wallets.map((w) => (
          <div key={w.id} className="pf-card" style={{ border: w.isDefault ? '2px solid var(--pf-primary)' : '1px solid var(--pf-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div
                  style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: 'var(--pf-radius-sm)',
                    background: 'var(--pf-primary-soft)',
                    color: 'var(--pf-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                  }}
                >
                  {w.currency}
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>Portefeuille {w.currency}</span>
              </div>
              {w.isDefault && (
                <span className="pf-badge pf-badge-blue" style={{ fontSize: '0.65rem' }}>
                  Principal
                </span>
              )}
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--pf-muted)' }}>Solde disponible</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--pf-text)', margin: '0.25rem 0' }}>
                {formatMoney(w.balance, w.currency)}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--pf-muted)' }}>
                En attente : {formatMoney(w.pendingBalance, w.currency)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* General Ledger (Grand Livre Comptable) */}
      <div className="pf-card">
        <div className="pf-card-header">
          <div>
            <h3 className="pf-card-title">Grand Livre Comptable (Ledger immuable)</h3>
            <p className="pf-card-subtitle">
              Chaque mouvement financier est auditable avec décomposition mathématique des frais
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--pf-muted)' }}>
            <FontAwesomeIcon icon={faShieldHalved} style={{ color: 'var(--pf-primary)' }} />
            <span>Grand livre en partie double</span>
          </div>
        </div>

        <div className="pf-table-container">
          <table className="pf-table">
            <thead>
              <tr>
                <th>Réf. Entrée</th>
                <th>Type de flux</th>
                <th>Description</th>
                <th>Montant Brut</th>
                <th>Frais Provider</th>
                <th>Frais PichFlow</th>
                <th>Impact Net Wallet</th>
                <th>Horodatage</th>
              </tr>
            </thead>
            <tbody>
              {ledgerEntries.map((entry) => (
                <tr key={entry.id}>
                  <td>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--pf-primary)' }}>
                      {entry.reference}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`pf-badge ${
                        entry.type === 'PAYMENT'
                          ? 'pf-badge-success'
                          : entry.type === 'WITHDRAWAL'
                          ? 'pf-badge-pending'
                          : 'pf-badge-neutral'
                      }`}
                    >
                      {entry.type}
                    </span>
                  </td>
                  <td>{entry.description}</td>
                  <td>
                    <strong>{formatMoney(entry.amount, entry.currency)}</strong>
                  </td>
                  <td style={{ color: 'var(--pf-muted)' }}>
                    {formatMoney(entry.providerFee, entry.currency)}
                  </td>
                  <td style={{ color: 'var(--pf-muted)' }}>
                    {formatMoney(entry.platformFee, entry.currency)}
                  </td>
                  <td>
                    <strong style={{ color: entry.netAmount > 0 ? 'var(--pf-success)' : 'var(--pf-text)' }}>
                      {entry.netAmount > 0 ? `+${formatMoney(entry.netAmount, entry.currency)}` : formatMoney(entry.netAmount, entry.currency)}
                    </strong>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--pf-muted)' }}>
                      {new Date(entry.createdAt).toLocaleDateString('fr-FR', {
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
    </div>
  );
};
