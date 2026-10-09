import React from 'react';
import { Customer } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faEnvelope, faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons';

interface CustomersViewProps {
  customers: Customer[];
}

export const CustomersView: React.FC<CustomersViewProps> = ({ customers }) => {
  const formatMoney = (val: number, cur: string) => {
    return new Intl.NumberFormat('fr-FR').format(val) + ' ' + cur;
  };

  return (
    <div className="pf-dashboard-body">
      <div className="pf-dashboard-header">
        <div>
          <h1 className="pf-dashboard-greeting">Répertoire Clients</h1>
          <p className="pf-dashboard-subgreeting">
            Identifiants des payeurs uniques enregistrés lors des encaissements et liens de paiement.
          </p>
        </div>
      </div>

      <div className="pf-table-container">
        <table className="pf-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Contact</th>
              <th>Pays</th>
              <th>Paiements réussis</th>
              <th>Volume dépensé</th>
              <th>Dernier paiement</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cus) => (
              <tr key={cus.id}>
                <td>
                  <div style={{ fontWeight: 700 }}>{cus.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--pf-muted)', fontFamily: 'JetBrains Mono' }}>
                    {cus.id}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8125rem' }}>
                    <FontAwesomeIcon icon={faEnvelope} style={{ color: 'var(--pf-muted)', fontSize: '0.75rem' }} />
                    <span>{cus.email}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--pf-muted)', marginTop: '0.2rem' }}>
                    <FontAwesomeIcon icon={faPhone} style={{ color: 'var(--pf-muted)', fontSize: '0.7rem' }} />
                    <span>{cus.phone}</span>
                  </div>
                </td>
                <td>
                  <span className="pf-badge pf-badge-neutral">{cus.country}</span>
                </td>
                <td>
                  <span style={{ fontWeight: 700 }}>{cus.paymentCount} transactions</span>
                </td>
                <td>
                  <strong style={{ color: 'var(--pf-primary)' }}>
                    {formatMoney(cus.totalSpent, cus.currency)}
                  </strong>
                </td>
                <td>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--pf-muted)' }}>
                    {new Date(cus.lastTransactionAt).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
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
