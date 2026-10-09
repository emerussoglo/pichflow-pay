import React, { useState } from 'react';
import { EnvironmentMode } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faSearch,
  faBell,
  faCircleCheck,
  faRotateRight,
  faTriangleExclamation,
  faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';
import { useToast } from '../ui/ToastContext';

interface TopbarProps {
  envMode: EnvironmentMode;
  onToggleEnv: (mode: EnvironmentMode) => void;
  onOpenMobileSidebar: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  envMode,
  onToggleEnv,
  onOpenMobileSidebar,
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { showToast } = useToast();

  const handleSwitchMode = (mode: EnvironmentMode) => {
    if (mode === 'live') {
      showToast('Attention : Le mode LIVE nécessite la validation préalable du KYC entreprise.', 'warning');
    } else {
      showToast('Mode Sandbox TEST réactivé.', 'info');
    }
    onToggleEnv(mode);
  };

  return (
    <header className="pf-topbar">
      <div className="pf-topbar-left">
        {/* Mobile menu toggle */}
        <button
          onClick={onOpenMobileSidebar}
          className="pf-topbar-mobile-toggle"
          aria-label="Ouvrir le menu de navigation"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        {/* Search */}
        <div className="pf-topbar-search">
          <span className="pf-topbar-search-icon">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input
            type="text"
            className="pf-input"
            placeholder="Rechercher une transaction, un client..."
          />
        </div>
      </div>

      <div className="pf-topbar-right">
        {/* Environment Mode Switcher */}
        <div className="pf-env-pill">
          <button
            onClick={() => handleSwitchMode('test')}
            className={`pf-env-btn ${envMode === 'test' ? 'active-test' : 'inactive'}`}
          >
            TEST (SANDBOX)
          </button>
          <button
            onClick={() => handleSwitchMode('live')}
            className={`pf-env-btn ${envMode === 'live' ? 'active-live' : 'inactive'}`}
          >
            LIVE (PRODUCTION)
          </button>
        </div>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="pf-btn pf-btn-secondary pf-btn-icon-only"
            aria-label="Notifications"
          >
            <FontAwesomeIcon icon={faBell} />
            <span
              style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--pf-primary)',
              }}
            />
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '320px',
                background: 'var(--pf-surface)',
                border: '1px solid var(--pf-border)',
                borderRadius: 'var(--pf-radius-lg)',
                boxShadow: 'var(--pf-shadow-xl)',
                padding: '1rem',
                zIndex: 100,
                animation: 'scaleIn 180ms ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 800 }}>Notifications</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--pf-primary)', cursor: 'pointer' }}>Tout marquer comme lu</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '6px', background: '#F8FAFC', border: '1px solid var(--pf-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', fontWeight: 700 }}>
                    <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'var(--pf-success)' }} />
                    <span>Paiement de 15 000 XOF</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--pf-muted)', marginTop: '0.2rem' }}>
                    MTN MoMo Bénin · Réf: PF-TX-2026-984712
                  </div>
                </div>

                <div style={{ padding: '0.5rem', borderRadius: '6px', background: '#F8FAFC', border: '1px solid var(--pf-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', fontWeight: 700 }}>
                    <FontAwesomeIcon icon={faShieldHalved} style={{ color: 'var(--pf-primary)' }} />
                    <span>Webhook délivré avec succès</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--pf-muted)', marginTop: '0.2rem' }}>
                    HTTP 200 · https://cardix.africa/api/webhook
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
