import React, { useState } from 'react';
import { ApiKey, WebhookEndpoint } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faKey,
  faCodeBranch,
  faCopy,
  faCheck,
  faPlus,
  faTrash,
  faRotateRight,
  faShieldHalved,
  faCheckCircle,
  faLock,
  faBolt,
} from '@fortawesome/free-solid-svg-icons';
import { useToast } from '../ui/ToastContext';

interface DeveloperCenterViewProps {
  apiKeys: ApiKey[];
  webhooks: WebhookEndpoint[];
  onGenerateKey: (name: string, env: 'sandbox' | 'live', scope: 'payin' | 'payout' | 'both') => void;
  onRevokeKey: (id: string) => void;
  onAddWebhook: (url: string, description: string) => void;
}

export const DeveloperCenterView: React.FC<DeveloperCenterViewProps> = ({
  apiKeys,
  webhooks,
  onGenerateKey,
  onRevokeKey,
  onAddWebhook,
}) => {
  const [activeTab, setActiveTab] = useState<'keys' | 'webhooks'>('keys');
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [showNewWebhookModal, setShowNewWebhookModal] = useState(false);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const { showToast } = useToast();

  // New key form
  const [keyName, setKeyName] = useState('');
  const [keyEnv, setKeyEnv] = useState<'sandbox' | 'live'>('sandbox');
  const [keyScope, setKeyScope] = useState<'payin' | 'payout' | 'both'>('both');

  // New webhook form
  const [whUrl, setWhUrl] = useState('');
  const [whDesc, setWhDesc] = useState('');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    showToast('Copié dans le presse-papiers !', 'success');
    setTimeout(() => setCopiedKeyId(null), 2500);
  };

  const handleCreateKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyName.trim()) return;
    onGenerateKey(keyName, keyEnv, keyScope);
    setShowNewKeyModal(false);
    setKeyName('');
    showToast('Nouvelle clé API générée avec succès !', 'success');
  };

  const handleCreateWebhookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whUrl.trim()) return;
    onAddWebhook(whUrl, whDesc);
    setShowNewWebhookModal(false);
    setWhUrl('');
    setWhDesc('');
    showToast('Endpoint Webhook ajouté !', 'success');
  };

  return (
    <div className="pf-dashboard-body">
      <div className="pf-dashboard-header">
        <div>
          <h1 className="pf-dashboard-greeting">Espace Développeurs</h1>
          <p className="pf-dashboard-subgreeting">
            Administration des identifiants API, signatures HMAC et routage des webhooks en temps réel.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {activeTab === 'keys' ? (
            <button
              onClick={() => setShowNewKeyModal(true)}
              className="pf-btn pf-btn-primary pf-btn-md pf-btn-shine"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span>Générer une clé API</span>
            </button>
          ) : (
            <button
              onClick={() => setShowNewWebhookModal(true)}
              className="pf-btn pf-btn-primary pf-btn-md pf-btn-shine"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span>Ajouter un webhook</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--pf-border)', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveTab('keys')}
          className={`pf-btn pf-btn-sm ${activeTab === 'keys' ? 'pf-btn-primary' : 'pf-btn-ghost'}`}
          style={{ borderRadius: '0', borderBottom: activeTab === 'keys' ? '2px solid var(--pf-primary)' : 'none' }}
        >
          <FontAwesomeIcon icon={faKey} />
          <span>Clés API ({apiKeys.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('webhooks')}
          className={`pf-btn pf-btn-sm ${activeTab === 'webhooks' ? 'pf-btn-primary' : 'pf-btn-ghost'}`}
          style={{ borderRadius: '0', borderBottom: activeTab === 'webhooks' ? '2px solid var(--pf-primary)' : 'none' }}
        >
          <FontAwesomeIcon icon={faCodeBranch} />
          <span>Webhooks & Événements ({webhooks.length})</span>
        </button>
      </div>

      {/* TAB 1: API KEYS */}
      {activeTab === 'keys' && (
        <div>
          <div className="pf-table-container">
            <table className="pf-table">
              <thead>
                <tr>
                  <th>Nom de la clé</th>
                  <th>Environnement</th>
                  <th>Clé Publique / Préfixe</th>
                  <th>Clé Secrète (Masquée)</th>
                  <th>Scope</th>
                  <th>Dernière utilisation</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((key) => (
                  <tr key={key.id}>
                    <td>
                      <strong>{key.name}</strong>
                    </td>
                    <td>
                      <span className={`pf-badge ${key.environment === 'sandbox' ? 'pf-badge-pending' : 'pf-badge-success'}`}>
                        {key.environment === 'sandbox' ? 'SANDBOX' : 'LIVE'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <code style={{ fontSize: '0.8125rem', color: 'var(--pf-primary)' }}>{key.prefix}</code>
                        <button
                          onClick={() => handleCopy(key.id + '-pk', key.prefix)}
                          className="pf-btn pf-btn-ghost pf-btn-sm"
                          style={{ padding: '0.2rem 0.4rem' }}
                        >
                          <FontAwesomeIcon icon={copiedKeyId === key.id + '-pk' ? faCheck : faCopy} />
                        </button>
                      </div>
                    </td>
                    <td>
                      <code style={{ fontSize: '0.8125rem', color: 'var(--pf-muted)' }}>{key.secretMasked}</code>
                    </td>
                    <td>
                      <span className="pf-badge pf-badge-neutral" style={{ textTransform: 'uppercase' }}>
                        {key.scope}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--pf-muted)' }}>
                        {key.lastUsedAt ? new Date(key.lastUsedAt).toLocaleDateString('fr-FR') : 'Jamais'}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => onRevokeKey(key.id)}
                        className="pf-btn pf-btn-ghost pf-btn-sm"
                        style={{ color: 'var(--pf-danger)' }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        <span>Révoquer</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '1.25rem', padding: '1rem', background: '#F8FAFC', borderRadius: 'var(--pf-radius-md)', border: '1px solid var(--pf-border)', fontSize: '0.8125rem', color: 'var(--pf-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FontAwesomeIcon icon={faShieldHalved} style={{ color: 'var(--pf-primary)' }} />
            <span>Ne transmettez jamais vos clés secrètes dans votre code frontend. Utilisez-les exclusivement côté serveur (Node.js, Python, PHP, etc.).</span>
          </div>
        </div>
      )}

      {/* TAB 2: WEBHOOKS */}
      {activeTab === 'webhooks' && (
        <div>
          <div className="pf-table-container">
            <table className="pf-table">
              <thead>
                <tr>
                  <th>URL de réception</th>
                  <th>Description</th>
                  <th>Secret de signature HMAC</th>
                  <th>Événements écoutés</th>
                  <th>Dernier envoi</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {webhooks.map((wh) => (
                  <tr key={wh.id}>
                    <td>
                      <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--pf-primary)' }}>
                        {wh.url}
                      </span>
                    </td>
                    <td>{wh.description}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <code style={{ fontSize: '0.75rem' }}>{wh.secret.substring(0, 10)}•••••</code>
                        <button
                          onClick={() => handleCopy(wh.id, wh.secret)}
                          className="pf-btn pf-btn-ghost pf-btn-sm"
                          style={{ padding: '0.2rem 0.4rem' }}
                        >
                          <FontAwesomeIcon icon={copiedKeyId === wh.id ? faCheck : faCopy} />
                        </button>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                        {wh.events.map((ev, i) => (
                          <span key={i} className="pf-badge pf-badge-neutral" style={{ fontSize: '0.7rem' }}>
                            {ev}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className="pf-badge pf-badge-success">
                        <span className="pf-badge-dot"></span> HTTP 200 OK
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => showToast('Ping de test webhook envoyé avec succès !', 'success')}
                        className="pf-btn pf-btn-secondary pf-btn-sm"
                      >
                        <FontAwesomeIcon icon={faRotateRight} />
                        <span>Tester</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Generate Key */}
      {showNewKeyModal && (
        <div className="pf-modal-overlay" onClick={() => setShowNewKeyModal(false)}>
          <div className="pf-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="pf-modal-header">
              <h3 className="pf-card-title">Générer une nouvelle clé API</h3>
            </div>
            <form onSubmit={handleCreateKeySubmit}>
              <div className="pf-form-group">
                <label className="pf-label">Nom de la clé</label>
                <input
                  type="text"
                  className="pf-input"
                  placeholder="Ex: Backend Production, Serveur CI/CD"
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  required
                />
              </div>

              <div className="pf-form-group">
                <label className="pf-label">Environnement cible</label>
                <select
                  className="pf-select"
                  value={keyEnv}
                  onChange={(e) => setKeyEnv(e.target.value as 'sandbox' | 'live')}
                >
                  <option value="sandbox">Sandbox (Mode TEST)</option>
                  <option value="live">Live (Mode PRODUCTION)</option>
                </select>
              </div>

              <div className="pf-form-group">
                <label className="pf-label">Périmètre d'autorisation (Scope)</label>
                <select
                  className="pf-select"
                  value={keyScope}
                  onChange={(e) => setKeyScope(e.target.value as 'payin' | 'payout' | 'both')}
                >
                  <option value="both">PAYIN & PAYOUT (Encaissement et Retrait)</option>
                  <option value="payin">PAYIN uniquement (Encaissement)</option>
                  <option value="payout">PAYOUT uniquement (Retrait)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowNewKeyModal(false)}
                  className="pf-btn pf-btn-secondary pf-btn-md"
                  style={{ flex: 1 }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="pf-btn pf-btn-primary pf-btn-md pf-btn-shine"
                  style={{ flex: 1 }}
                >
                  Générer la clé
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Webhook */}
      {showNewWebhookModal && (
        <div className="pf-modal-overlay" onClick={() => setShowNewWebhookModal(false)}>
          <div className="pf-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="pf-modal-header">
              <h3 className="pf-card-title">Ajouter un point de terminaison Webhook</h3>
            </div>
            <form onSubmit={handleCreateWebhookSubmit}>
              <div className="pf-form-group">
                <label className="pf-label">URL de destination (HTTPS obligatoire en Live)</label>
                <input
                  type="url"
                  className="pf-input"
                  placeholder="https://votre-site.com/api/pichflow-webhook"
                  value={whUrl}
                  onChange={(e) => setWhUrl(e.target.value)}
                  required
                />
              </div>

              <div className="pf-form-group">
                <label className="pf-label">Description ou usage</label>
                <input
                  type="text"
                  className="pf-input"
                  placeholder="Ex: Synchronisation commandes et abonnements"
                  value={whDesc}
                  onChange={(e) => setWhDesc(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowNewWebhookModal(false)}
                  className="pf-btn pf-btn-secondary pf-btn-md"
                  style={{ flex: 1 }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="pf-btn pf-btn-primary pf-btn-md pf-btn-shine"
                  style={{ flex: 1 }}
                >
                  Enregistrer l'endpoint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
