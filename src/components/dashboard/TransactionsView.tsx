import React, { useState } from 'react';
import { Transaction, PaymentStatus } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faDownload,
  faFilter,
  faEye,
  faReceipt,
  faXmark,
  faCheck,
  faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';
import { useToast } from '../ui/ToastContext';

interface TransactionsViewProps {
  transactions: Transaction[];
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({ transactions }) => {
  const [statusFilter, setStatusFilter] = useState<'all' | PaymentStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const { showToast } = useToast();

  const filteredTransactions = transactions.filter((tx) => {
    const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
    const matchesSearch =
      tx.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.provider.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const formatMoney = (val: number, cur: string = 'XOF') => {
    return new Intl.NumberFormat('fr-FR').format(val) + ' ' + cur;
  };

  const handleExportCSV = () => {
    const headers = ['Reference', 'Client', 'Email', 'Telephone', 'Pays', 'Operateur', 'Montant Brut', 'Frais Provider', 'Frais Plateforme', 'Net', 'Devise', 'Statut', 'Date'];
    const rows = filteredTransactions.map((tx) => [
      tx.reference,
      `"${tx.customerName}"`,
      tx.customerEmail,
      tx.customerPhone,
      tx.country,
      tx.provider,
      tx.amount,
      tx.providerFee,
      tx.platformFee,
      tx.netAmount,
      tx.currency,
      tx.status,
      tx.createdAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pichflow_transactions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Export CSV téléchargé avec succès !', 'success');
  };

  return (
    <div className="pf-dashboard-body">
      {/* Header */}
      <div className="pf-dashboard-header">
        <div>
          <h1 className="pf-dashboard-greeting">Journal des Transactions</h1>
          <p className="pf-dashboard-subgreeting">
            Historique complet des paiements, détails des commissions et statuts des passerelles.
          </p>
        </div>

        <button onClick={handleExportCSV} className="pf-btn pf-btn-secondary pf-btn-md">
          <FontAwesomeIcon icon={faDownload} />
          <span>Exporter en CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="pf-card" style={{ marginBottom: '1.5rem', padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          {/* Status Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setStatusFilter('all')}
              className={`pf-btn pf-btn-sm ${statusFilter === 'all' ? 'pf-btn-primary' : 'pf-btn-ghost'}`}
            >
              Tous ({transactions.length})
            </button>
            <button
              onClick={() => setStatusFilter('success')}
              className={`pf-btn pf-btn-sm ${statusFilter === 'success' ? 'pf-btn-primary' : 'pf-btn-ghost'}`}
            >
              Réussis ({transactions.filter((t) => t.status === 'success').length})
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`pf-btn pf-btn-sm ${statusFilter === 'pending' ? 'pf-btn-primary' : 'pf-btn-ghost'}`}
            >
              En attente ({transactions.filter((t) => t.status === 'pending').length})
            </button>
            <button
              onClick={() => setStatusFilter('failed')}
              className={`pf-btn pf-btn-sm ${statusFilter === 'failed' ? 'pf-btn-primary' : 'pf-btn-ghost'}`}
            >
              Échoués ({transactions.filter((t) => t.status === 'failed').length})
            </button>
          </div>

          {/* Search */}
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--pf-muted)', fontSize: '0.8rem' }}>
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
              type="text"
              className="pf-input"
              style={{ paddingLeft: '2.25rem', height: '2.25rem', fontSize: '0.8125rem' }}
              placeholder="Rechercher par référence, nom..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="pf-table-container">
        <table className="pf-table">
          <thead>
            <tr>
              <th>ID & Référence</th>
              <th>Client</th>
              <th>Pays</th>
              <th>Réseau</th>
              <th>Montant Brut</th>
              <th>Frais Déduits</th>
              <th>Net Crédité</th>
              <th>Statut</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--pf-muted)' }}>
                  <FontAwesomeIcon icon={faReceipt} style={{ fontSize: '2rem', marginBottom: '0.5rem', opacity: 0.3 }} />
                  <div>Aucune transaction correspondant aux filtres.</div>
                </td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => (
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
                  <td>{tx.country}</td>
                  <td>
                    <span className="pf-badge pf-badge-neutral">{tx.provider}</span>
                  </td>
                  <td>
                    <strong>{formatMoney(tx.amount, tx.currency)}</strong>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--pf-danger)' }}>
                      -{formatMoney(tx.providerFee + tx.platformFee, tx.currency)}
                    </span>
                  </td>
                  <td>
                    <span style={{ color: 'var(--pf-success)', fontWeight: 700 }}>
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
                  <td>
                    <button
                      onClick={() => setSelectedTx(tx)}
                      className="pf-btn pf-btn-secondary pf-btn-sm"
                      style={{ padding: '0.3rem 0.6rem' }}
                    >
                      <FontAwesomeIcon icon={faEye} />
                      <span>Détails</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Transaction Details Modal */}
      {selectedTx && (
        <div className="pf-modal-overlay" onClick={() => setSelectedTx(null)}>
          <div className="pf-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="pf-modal-header">
              <div>
                <h3 className="pf-card-title">Détails de la transaction</h3>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: 'var(--pf-primary)' }}>
                  {selectedTx.reference}
                </span>
              </div>
              <button onClick={() => setSelectedTx(null)} className="pf-modal-close" aria-label="Fermer">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: 'var(--pf-radius-md)', border: '1px solid var(--pf-border)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--pf-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Décomposition financière exacte (Fee-Engine)
                </div>
                <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span>Montant brut encaissé :</span>
                    <strong>{formatMoney(selectedTx.amount, selectedTx.currency)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--pf-muted)' }}>
                    <span>Frais opérateur réseau ({selectedTx.provider}) :</span>
                    <span>- {formatMoney(selectedTx.providerFee, selectedTx.currency)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--pf-muted)' }}>
                    <span>Frais plateforme PichFlow :</span>
                    <span>- {formatMoney(selectedTx.platformFee, selectedTx.currency)}</span>
                  </div>
                  <div style={{ borderTop: '1px solid var(--pf-border)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 800, color: 'var(--pf-success)' }}>
                    <span>Montant net crédité :</span>
                    <span>+{formatMoney(selectedTx.netAmount, selectedTx.currency)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>Informations du client</h4>
                <div style={{ fontSize: '0.875rem', color: 'var(--pf-muted)', lineHeight: 1.6 }}>
                  <div><strong>Nom :</strong> {selectedTx.customerName}</div>
                  <div><strong>Email :</strong> {selectedTx.customerEmail}</div>
                  <div><strong>Téléphone :</strong> {selectedTx.customerPhone}</div>
                  <div><strong>Pays :</strong> {selectedTx.country}</div>
                  <div><strong>Description :</strong> {selectedTx.description}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--pf-muted)' }}>
                <FontAwesomeIcon icon={faShieldHalved} style={{ color: 'var(--pf-primary)' }} />
                <span>Transaction enregistrée dans le grand livre (Ledger immuable).</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
