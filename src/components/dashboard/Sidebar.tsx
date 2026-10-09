import React, { useState } from 'react';
import { Application } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faPlus,
  faChartPie,
  faReceipt,
  faLink,
  faUsers,
  faWallet,
  faBuildingColumns,
  faKey,
  faCodeBranch,
  faBook,
  faGear,
  faRightFromBracket,
  faHouse,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { PichFlowLogo } from '../ui/PichFlowLogo';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  applications: Application[];
  activeApp: Application;
  onSelectApp: (app: Application) => void;
  onOpenNewAppModal: () => void;
  onLogout: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  applications,
  activeApp,
  onSelectApp,
  onOpenNewAppModal,
  onLogout,
  isOpenMobile,
  onCloseMobile,
}) => {
  const [appDropdownOpen, setAppDropdownOpen] = useState(false);

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {isOpenMobile && (
        <div
          className="pf-sidebar-backdrop"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside className={`pf-sidebar ${isOpenMobile ? 'open' : ''}`}>
        {/* Header & Brand Logo */}
        <div className="pf-sidebar-header">
          <div className="pf-sidebar-logo-row">
            <div
              onClick={() => handleNavClick('overview')}
              style={{ cursor: 'pointer' }}
              title="PichFlow Dashboard"
            >
              <PichFlowLogo size="md" />
            </div>

            {/* Mobile close toggle */}
            <button
              onClick={onCloseMobile}
              className="pf-sidebar-close-btn"
              aria-label="Fermer le menu"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

        {/* Application Selector */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setAppDropdownOpen(!appDropdownOpen)}
            className="pf-app-selector-btn"
            aria-expanded={appDropdownOpen}
          >
            <div className="pf-app-selector-current">
              <div className="pf-app-avatar">
                {activeApp.name.charAt(0)}
              </div>
              <div style={{ textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--pf-text)' }}>
                  {activeApp.name}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--pf-muted)' }}>
                  {activeApp.category}
                </div>
              </div>
            </div>
            <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: '0.75rem', color: 'var(--pf-muted)' }} />
          </button>

          {/* Applications Dropdown */}
          {appDropdownOpen && (
            <div className="pf-app-dropdown">
              <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--pf-muted)', textTransform: 'uppercase', padding: '0.25rem 0.5rem' }}>
                Vos Applications
              </div>
              {applications.map((app) => (
                <div
                  key={app.id}
                  onClick={() => {
                    onSelectApp(app);
                    setAppDropdownOpen(false);
                  }}
                  className={`pf-app-dropdown-item ${app.id === activeApp.id ? 'active' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div className="pf-app-avatar">{app.name.charAt(0)}</div>
                    <span>{app.name}</span>
                  </div>
                  {app.id === activeApp.id && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--pf-primary)', fontWeight: 700 }}>Actif</span>
                  )}
                </div>
              ))}

              <div className="pf-app-dropdown-divider" />

              <div
                onClick={() => {
                  setAppDropdownOpen(false);
                  onOpenNewAppModal();
                }}
                className="pf-app-dropdown-item"
                style={{ color: 'var(--pf-primary)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FontAwesomeIcon icon={faPlus} />
                  <span>Nouvelle application</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Sections */}
      <nav className="pf-sidebar-nav">
        {/* Core Financial Operations */}
        <div className="pf-sidebar-group">
          <div className="pf-sidebar-group-title">Opérations</div>
          <button
            onClick={() => handleNavClick('overview')}
            className={`pf-sidebar-link ${currentTab === 'overview' ? 'active' : ''}`}
          >
            <div className="pf-sidebar-link-content">
              <FontAwesomeIcon icon={faChartPie} />
              <span>Vue d'ensemble</span>
            </div>
          </button>

          <button
            onClick={() => handleNavClick('transactions')}
            className={`pf-sidebar-link ${currentTab === 'transactions' ? 'active' : ''}`}
          >
            <div className="pf-sidebar-link-content">
              <FontAwesomeIcon icon={faReceipt} />
              <span>Transactions</span>
            </div>
          </button>

          <button
            onClick={() => handleNavClick('payment-links')}
            className={`pf-sidebar-link ${currentTab === 'payment-links' ? 'active' : ''}`}
          >
            <div className="pf-sidebar-link-content">
              <FontAwesomeIcon icon={faLink} />
              <span>Liens de paiement</span>
            </div>
          </button>

          <button
            onClick={() => handleNavClick('customers')}
            className={`pf-sidebar-link ${currentTab === 'customers' ? 'active' : ''}`}
          >
            <div className="pf-sidebar-link-content">
              <FontAwesomeIcon icon={faUsers} />
              <span>Clients</span>
            </div>
          </button>
        </div>

        {/* Trésorerie & Payouts */}
        <div className="pf-sidebar-group">
          <div className="pf-sidebar-group-title">Trésorerie & Wallets</div>
          <button
            onClick={() => handleNavClick('wallets')}
            className={`pf-sidebar-link ${currentTab === 'wallets' ? 'active' : ''}`}
          >
            <div className="pf-sidebar-link-content">
              <FontAwesomeIcon icon={faWallet} />
              <span>Soldes & Wallets</span>
            </div>
          </button>

          <button
            onClick={() => handleNavClick('withdrawals')}
            className={`pf-sidebar-link ${currentTab === 'withdrawals' ? 'active' : ''}`}
          >
            <div className="pf-sidebar-link-content">
              <FontAwesomeIcon icon={faBuildingColumns} />
              <span>Retraits (Payouts)</span>
            </div>
          </button>
        </div>

        {/* Developer Center */}
        <div className="pf-sidebar-group">
          <div className="pf-sidebar-group-title">Développeurs</div>
          <button
            onClick={() => handleNavClick('developers')}
            className={`pf-sidebar-link ${currentTab === 'developers' || currentTab === 'api-keys' ? 'active' : ''}`}
          >
            <div className="pf-sidebar-link-content">
              <FontAwesomeIcon icon={faKey} />
              <span>Clés d'API & Webhooks</span>
            </div>
          </button>

          <button
            onClick={() => handleNavClick('doc-redirect')}
            className="pf-sidebar-link"
          >
            <div className="pf-sidebar-link-content">
              <FontAwesomeIcon icon={faBook} />
              <span>Documentation API</span>
            </div>
          </button>
        </div>

        {/* Settings & Admin */}
        <div className="pf-sidebar-group">
          <div className="pf-sidebar-group-title">Configuration</div>
          <button
            onClick={() => handleNavClick('settings')}
            className={`pf-sidebar-link ${currentTab === 'settings' ? 'active' : ''}`}
          >
            <div className="pf-sidebar-link-content">
              <FontAwesomeIcon icon={faGear} />
              <span>Paramètres & KYC</span>
            </div>
          </button>
        </div>
      </nav>

      {/* Footer Area */}
      <div className="pf-sidebar-footer">
        <button
          onClick={() => handleNavClick('home-redirect')}
          className="pf-sidebar-link"
          style={{ marginBottom: '0.25rem' }}
          title="Retourner au site public"
        >
          <div className="pf-sidebar-link-content">
            <FontAwesomeIcon icon={faHouse} />
            <span>Site public</span>
          </div>
        </button>

        <button
          onClick={onLogout}
          className="pf-sidebar-link"
          style={{ color: 'var(--pf-danger)' }}
        >
          <div className="pf-sidebar-link-content">
            <FontAwesomeIcon icon={faRightFromBracket} />
            <span>Déconnexion</span>
          </div>
        </button>
      </div>
    </aside>
  </>
);
};
