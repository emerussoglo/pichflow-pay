import React, { useState } from 'react';
import { Application, KycStatus } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faIdCard,
  faShieldHalved,
  faLock,
  faCheck,
  faFileLines,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { useToast } from '../ui/ToastContext';

interface SettingsViewProps {
  activeApp: Application;
  onUpdateApp: (updated: Application) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ activeApp, onUpdateApp }) => {
  const [activeTab, setActiveTab] = useState<'app' | 'kyc' | 'security'>('app');
  const [appName, setAppName] = useState(activeApp.name);
  const [category, setCategory] = useState(activeApp.category);
  const [website, setWebsite] = useState(activeApp.website);
  const [kycStatus, setKycStatus] = useState<KycStatus>('verified');
  const { showToast } = useToast();

  const handleSaveApp = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateApp({
      ...activeApp,
      name: appName,
      category,
      website,
    });
    showToast('Paramètres de l’application enregistrés !', 'success');
  };

  return (
    <div className="pf-dashboard-body">
      <div className="pf-dashboard-header">
        <div>
          <h1 className="pf-dashboard-greeting">Configuration & Conformité</h1>
          <p className="pf-dashboard-subgreeting">
            Gérez les paramètres de l’application active, vos justificatifs KYC et vos options de sécurité.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--pf-border)', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveTab('app')}
          className={`pf-btn pf-btn-sm ${activeTab === 'app' ? 'pf-btn-primary' : 'pf-btn-ghost'}`}
          style={{ borderRadius: '0', borderBottom: activeTab === 'app' ? '2px solid var(--pf-primary)' : 'none' }}
        >
          <FontAwesomeIcon icon={faBuilding} />
          <span>Paramètres de l'Application</span>
        </button>

        <button
          onClick={() => setActiveTab('kyc')}
          className={`pf-btn pf-btn-sm ${activeTab === 'kyc' ? 'pf-btn-primary' : 'pf-btn-ghost'}`}
          style={{ borderRadius: '0', borderBottom: activeTab === 'kyc' ? '2px solid var(--pf-primary)' : 'none' }}
        >
          <FontAwesomeIcon icon={faIdCard} />
          <span>Vérification KYC & Conformité</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`pf-btn pf-btn-sm ${activeTab === 'security' ? 'pf-btn-primary' : 'pf-btn-ghost'}`}
          style={{ borderRadius: '0', borderBottom: activeTab === 'security' ? '2px solid var(--pf-primary)' : 'none' }}
        >
          <FontAwesomeIcon icon={faLock} />
          <span>Sécurité & Accès</span>
        </button>
      </div>

      {/* 1. APP SETTINGS */}
      {activeTab === 'app' && (
        <div className="pf-card" style={{ maxWidth: '640px' }}>
          <h3 className="pf-card-title" style={{ marginBottom: '1.25rem' }}>Informations de l'application</h3>
          <form onSubmit={handleSaveApp}>
            <div className="pf-form-group">
              <label className="pf-label">Nom commercial de l'application</label>
              <input
                type="text"
                className="pf-input"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                required
              />
            </div>

            <div className="pf-form-group">
              <label className="pf-label">Catégorie d'activité</label>
              <input
                type="text"
                className="pf-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div className="pf-form-group">
              <label className="pf-label">Site internet ou lien public</label>
              <input
                type="url"
                className="pf-input"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                required
              />
            </div>

            <div className="pf-form-group">
              <label className="pf-label">Identifiant unique (ID Système)</label>
              <input
                type="text"
                className="pf-input"
                value={activeApp.id}
                disabled
              />
            </div>

            <button type="submit" className="pf-btn pf-btn-primary pf-btn-md pf-btn-shine">
              Enregistrer les modifications
            </button>
          </form>
        </div>
      )}

      {/* 2. KYC CONFORMITÉ */}
      {activeTab === 'kyc' && (
        <div className="pf-card" style={{ maxWidth: '680px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 className="pf-card-title">Dossier de Conformité Marchand</h3>
            <span className="pf-badge pf-badge-success">
              <span className="pf-badge-dot"></span>
              {kycStatus === 'verified' ? 'Statut : VÉRIFIÉ' : 'Statut : EN ATTENTE'}
            </span>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--pf-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Pour autoriser les paiements réels en environnement LIVE et activer les retraits vers vos comptes bancaires, les régulateurs financiers exigent la vérification de l'identité des dirigeants et de l'enregistrement de l'entreprise.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#F8FAFC', borderRadius: 'var(--pf-radius-md)', border: '1px solid var(--pf-border)' }}>
              <FontAwesomeIcon icon={faCheck} style={{ color: 'var(--pf-success)' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>1. Pièce d'identité du représentant légal</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--pf-muted)' }}>Passeport ou CNI validé · Alexandre Dossou</div>
              </div>
              <span className="pf-badge pf-badge-success" style={{ fontSize: '0.7rem' }}>Validé</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#F8FAFC', borderRadius: 'var(--pf-radius-md)', border: '1px solid var(--pf-border)' }}>
              <FontAwesomeIcon icon={faCheck} style={{ color: 'var(--pf-success)' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>2. Registre de Commerce (RCCM / IFU)</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--pf-muted)' }}>Cardix SARL · RCCM RB/COT/24-B-0012</div>
              </div>
              <span className="pf-badge pf-badge-success" style={{ fontSize: '0.7rem' }}>Validé</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#F8FAFC', borderRadius: 'var(--pf-radius-md)', border: '1px solid var(--pf-border)' }}>
              <FontAwesomeIcon icon={faCheck} style={{ color: 'var(--pf-success)' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>3. Relevé d'Identité Bancaire (RIB officiel)</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--pf-muted)' }}>Bank of Africa (BOA Bénin)</div>
              </div>
              <span className="pf-badge pf-badge-success" style={{ fontSize: '0.7rem' }}>Validé</span>
            </div>
          </div>

          <div style={{ padding: '0.875rem 1rem', background: 'var(--pf-primary-soft)', borderRadius: 'var(--pf-radius-md)', border: '1px solid var(--pf-border-focus)', fontSize: '0.8125rem', color: 'var(--pf-primary)' }}>
            <FontAwesomeIcon icon={faShieldHalved} style={{ marginRight: '0.5rem' }} />
            Votre dossier est complet et certifié pour opérer en mode LIVE sur l'ensemble de la zone UEMOA.
          </div>
        </div>
      )}

      {/* 3. SÉCURITÉ */}
      {activeTab === 'security' && (
        <div className="pf-card" style={{ maxWidth: '640px' }}>
          <h3 className="pf-card-title" style={{ marginBottom: '1.25rem' }}>Sécurité du compte</h3>
          <div className="pf-form-group">
            <label className="pf-label">Authentification à deux facteurs (2FA)</label>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#F8FAFC', borderRadius: 'var(--pf-radius-md)', border: '1px solid var(--pf-border)' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Application d'authentification (TOTP)</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--pf-muted)' }}>Google Authenticator, Authy ou 1Password</div>
              </div>
              <span className="pf-badge pf-badge-neutral">Prêt à activer</span>
            </div>
          </div>

          <div className="pf-form-group">
            <label className="pf-label">Sessions actives</label>
            <div style={{ padding: '0.75rem', background: '#F8FAFC', borderRadius: 'var(--pf-radius-md)', fontSize: '0.8125rem', color: 'var(--pf-muted)' }}>
              Connecté depuis Chrome sur macOS · Cotonou, Bénin (Session actuelle)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
