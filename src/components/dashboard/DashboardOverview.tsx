import React, { useState } from 'react';
import { Transaction, Application, Wallet } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faArrowTrendUp,
  faReceipt,
  faShieldHalved,
  faPlus,
  faBuildingColumns,
  faArrowRight,
  faCircleCheck,
  faClock,
  faBolt,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';

interface DashboardOverviewProps {
  activeApp: Application;
  transactions: Transaction[];
  wallets: Wallet[];
  onNavigateTab: (tab: string) => void;
  onOpenCreateLinkModal: () => void;
  onOpenWithdrawalModal: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  activeApp,
  transactions,
  wallets,
  onNavigateTab,
  onOpenCreateLinkModal,
  onOpenWithdrawalModal,
}) => {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  const defaultWallet = wallets.find((w) => w.isDefault) || wallets[0];

  const formatMoney = (amount: number, currency: string = 'XOF') => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' ' + currency;
  };

  // Sample data points according to chosen period
  const chartData =
    period === '7d'
      ? [
          { label: 'Lun', val: 65 },
          { label: 'Mar', val: 40 },
          { label: 'Mer', val: 85 },
          { label: 'Jeu', val: 95 },
          { label: 'Ven', val: 70 },
          { label: 'Sam', val: 90 },
          { label: 'Dim', val: 80 },
        ]
      : period === '30d'
      ? [
          { label: 'Sem 1', val: 45 },
          { label: 'Sem 2', val: 75 },
          { label: 'Sem 3', val: 90 },
          { label: 'Sem 4', val: 100 },
        ]
      : [
          { label: 'Août', val: 60 },
          { label: 'Sept', val: 80 },
          { label: 'Oct', val: 100 },
        ];

  return (
    <div className="pf-dashboard-body">
      {/* Header with greeting and quick actions */}
      <div className="pf-dashboard-header">
        <div>
          <h1 className="pf-dashboard-greeting">
            Bonjour, Alexandre 👋
          </h1>
          <p className="pf-dashboard-subgreeting">
            Voici les performances en temps réel de votre application <strong>{activeApp.name}</strong>.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={onOpenCreateLinkModal}
            className="pf-btn pf-btn-secondary pf-btn-md"
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>Nouveau lien</span>
          </button>
          <button
            onClick={onOpenWithdrawalModal}
            className="pf-btn pf-btn-primary pf-btn-md pf-btn-shine"
          >
            <FontAwesomeIcon icon={faBuildingColumns} />
            <span>Demander un retrait</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="pf-dashboard-stats">
        {/* Solde disponible */}
        <div className="pf-stat-card">
          <div className="pf-stat-top">
            <span className="pf-stat-label">Solde disponible</span>
            <div className="pf-stat-icon-wrapper pf-stat-icon-blue">
              <FontAwesomeIcon icon={faWallet} />
            </div>
          </div>
          <div>
            <div className="pf-stat-value">
              {formatMoney(defaultWallet.balance, defaultWallet.currency)}
            </div>
            <div className="pf-stat-meta" style={{ marginTop: '0.5rem' }}>
              <span className="pf-stat-trend-up">
                <FontAwesomeIcon icon={faArrowTrendUp} />
                +18.4%
              </span>
              <span style={{ color: 'var(--pf-muted)' }}>par rapport au mois précédent</span>
            </div>
          </div>
        </div>

        {/* Volume de revenus 30j */}
        <div className="pf-stat-card">
          <div className="pf-stat-top">
            <span className="pf-stat-label">Revenus collectés (30j)</span>
            <div className="pf-stat-icon-wrapper pf-stat-icon-green">
              <FontAwesomeIcon icon={faArrowTrendUp} />
            </div>
          </div>
          <div>
            <div className="pf-stat-value">
              {formatMoney(14890000, 'XOF')}
            </div>
            <div className="pf-stat-meta" style={{ marginTop: '0.5rem' }}>
              <span className="pf-stat-trend-up">
                <FontAwesomeIcon icon={faArrowTrendUp} />
                +24.1%
              </span>
              <span style={{ color: 'var(--pf-muted)' }}>flux net avant retraits</span>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="pf-stat-card">
          <div className="pf-stat-top">
            <span className="pf-stat-label">Transactions traitées</span>
            <div className="pf-stat-icon-wrapper pf-stat-icon-amber">
              <FontAwesomeIcon icon={faReceipt} />
            </div>
          </div>
          <div>
            <div className="pf-stat-value">289</div>
            <div className="pf-stat-meta" style={{ marginTop: '0.5rem' }}>
              <span style={{ color: 'var(--pf-muted)' }}>
                dont 286 par Mobile Money
              </span>
            </div>
          </div>
        </div>

        {/* Taux de réussite */}
        <div className="pf-stat-card">
          <div className="pf-stat-top">
            <span className="pf-stat-label">Taux d'autorisation</span>
            <div className="pf-stat-icon-wrapper pf-stat-icon-blue">
              <FontAwesomeIcon icon={faShieldHalved} />
            </div>
          </div>
          <div>
            <div className="pf-stat-value">99.2%</div>
            <div className="pf-stat-meta" style={{ marginTop: '0.5rem' }}>
              <span className="pf-badge pf-badge-success" style={{ fontSize: '0.7rem' }}>
                <span className="pf-badge-dot"></span> Haute fiabilité
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Columns Grid: Revenue Chart + Activity Timeline */}
      <div className="pf-dashboard-grid-2col">
        {/* Revenue Chart */}
        <div className="pf-card">
          <div className="pf-card-header">
            <div>
              <h3 className="pf-card-title">Évolution des volumes collectés</h3>
              <p className="pf-card-subtitle">Encaissements nets cumulés par période</p>
            </div>
            <div style={{ display: 'flex', gap: '0.35rem', background: 'var(--pf-surface-subtle)', padding: '0.25rem', borderRadius: 'var(--pf-radius-sm)' }}>
              <button
                onClick={() => setPeriod('7d')}
                className={`pf-btn pf-btn-sm ${period === '7d' ? 'pf-btn-secondary' : 'pf-btn-ghost'}`}
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
              >
                7 jours
              </button>
              <button
                onClick={() => setPeriod('30d')}
                className={`pf-btn pf-btn-sm ${period === '30d' ? 'pf-btn-secondary' : 'pf-btn-ghost'}`}
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
              >
                30 jours
              </button>
              <button
                onClick={() => setPeriod('90d')}
                className={`pf-btn pf-btn-sm ${period === '90d' ? 'pf-btn-secondary' : 'pf-btn-ghost'}`}
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
              >
                90 jours
              </button>
            </div>
          </div>

          <div className="pf-chart-bars">
            {chartData.map((item, idx) => (
              <div key={idx} className="pf-chart-col">
                <div className="pf-chart-bar-fill" style={{ height: `${item.val}%` }}></div>
                <span className="pf-chart-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Timeline */}
        <div className="pf-card">
          <div className="pf-card-header">
            <div>
              <h3 className="pf-card-title">Flux en temps réel</h3>
              <p className="pf-card-subtitle">Événements récents de l'application</p>
            </div>
          </div>

          <div className="pf-timeline">
            <div className="pf-timeline-item">
              <div className="pf-timeline-icon" style={{ background: 'var(--pf-success-soft)', color: 'var(--pf-success)' }}>
                <FontAwesomeIcon icon={faCircleCheck} />
              </div>
              <div className="pf-timeline-content">
                <div className="pf-timeline-title">Paiement réussi · +15 000 XOF</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--pf-text-secondary)' }}>Koffi Mensah (MTN MoMo Bénin)</div>
                <div className="pf-timeline-time">Il y a 12 minutes</div>
              </div>
            </div>

            <div className="pf-timeline-item">
              <div className="pf-timeline-icon" style={{ background: 'var(--pf-primary-soft)', color: 'var(--pf-primary)' }}>
                <FontAwesomeIcon icon={faBolt} />
              </div>
              <div className="pf-timeline-content">
                <div className="pf-timeline-title">Webhook délivré HTTP 200</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--pf-text-secondary)' }}>Event: payment.success vers cardix.africa</div>
                <div className="pf-timeline-time">Il y a 12 minutes</div>
              </div>
            </div>

            <div className="pf-timeline-item">
              <div className="pf-timeline-icon" style={{ background: '#FEF3C7', color: '#D97706' }}>
                <FontAwesomeIcon icon={faClock} />
              </div>
              <div className="pf-timeline-content">
                <div className="pf-timeline-title">Demande de retrait en cours</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--pf-text-secondary)' }}>500 000 XOF vers BOA Bénin</div>
                <div className="pf-timeline-time">Il y a 3 heures</div>
              </div>
            </div>

            <div className="pf-timeline-item">
              <div className="pf-timeline-icon" style={{ background: 'var(--pf-success-soft)', color: 'var(--pf-success)' }}>
                <FontAwesomeIcon icon={faCircleCheck} />
              </div>
              <div className="pf-timeline-content">
                <div className="pf-timeline-title">Paiement réussi · +45 000 XOF</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--pf-text-secondary)' }}>Aminata Diallo (Orange Money CI)</div>
                <div className="pf-timeline-time">Il y a 4 heures</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table Preview */}
      <div className="pf-card">
        <div className="pf-card-header">
          <div>
            <h3 className="pf-card-title">Dernières transactions</h3>
            <p className="pf-card-subtitle">Historique récent des encaissements de cette application</p>
          </div>
          <button
            onClick={() => onNavigateTab('transactions')}
            className="pf-btn pf-btn-ghost pf-btn-sm"
          >
            <span>Voir toutes les transactions</span>
            <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: '0.75rem' }} />
          </button>
        </div>

        <div className="pf-table-container">
          <table className="pf-table">
            <thead>
              <tr>
                <th>Référence</th>
                <th>Client</th>
                <th>Méthode</th>
                <th>Montant Brut</th>
                <th>Net Crédité</th>
                <th>Statut</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 5).map((tx) => (
                <tr key={tx.id}>
                  <td>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--pf-primary)' }}>
                      {tx.reference}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{tx.customerName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--pf-muted)' }}>{tx.customerEmail}</div>
                  </td>
                  <td>
                    <span className="pf-badge pf-badge-neutral">{tx.provider}</span>
                  </td>
                  <td>
                    <strong>{formatMoney(tx.amount, tx.currency)}</strong>
                  </td>
                  <td>
                    <span style={{ color: 'var(--pf-success)', fontWeight: 600 }}>
                      +{formatMoney(tx.netAmount, tx.currency)}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`pf-badge ${
                        tx.status === 'success'
                          ? 'pf-badge-success'
                          : tx.status === 'pending'
                          ? 'pf-badge-pending'
                          : 'pf-badge-failed'
                      }`}
                    >
                      <span className="pf-badge-dot"></span>
                      {tx.status === 'success' ? 'Réussi' : tx.status === 'pending' ? 'En attente' : 'Échoué'}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--pf-muted)' }}>
                      {new Date(tx.createdAt).toLocaleDateString('fr-FR', {
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
