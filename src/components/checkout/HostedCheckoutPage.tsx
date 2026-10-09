import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldHalved,
  faMobileScreen,
  faCreditCard,
  faLock,
  faCheck,
  faSpinner,
  faArrowLeft,
  faCircleCheck,
  faCircleXmark,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

interface HostedCheckoutPageProps {
  onBack: () => void;
  initialAmount?: number;
  initialTitle?: string;
}

export const HostedCheckoutPage: React.FC<HostedCheckoutPageProps> = ({
  onBack,
  initialAmount = 15000,
  initialTitle = 'Abonnement Plan Pro - Cardix',
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'mtn' | 'moov' | 'celtiis' | 'card'>('mtn');
  const [country, setCountry] = useState<'BJ' | 'CI' | 'SN'>('BJ');
  const [phone, setPhone] = useState('97 12 34 56');
  const [status, setStatus] = useState<'idle' | 'loading' | 'pending' | 'success' | 'failed'>('idle');

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    setTimeout(() => {
      setStatus('pending'); // Simulating USSD prompt
      setTimeout(() => {
        setStatus('success'); // Simulating client OTP approval
      }, 2500);
    }, 1200);
  };

  const handleReset = () => {
    setStatus('idle');
  };

  return (
    <div className="pf-checkout-page">
      <div className="pf-checkout-container">
        {/* Left Col: Order Summary */}
        <div className="pf-checkout-summary">
          <div>
            <button
              onClick={onBack}
              className="pf-btn pf-btn-ghost pf-btn-sm"
              style={{ marginBottom: '1.5rem', paddingLeft: 0 }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Retour</span>
            </button>

            <div className="pf-checkout-merchant-badge">
              <div className="pf-checkout-merchant-logo">C</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.125rem' }}>Cardix Store</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--pf-muted)' }}>Marchand vérifié PichFlow</div>
              </div>
            </div>

            <div className="pf-checkout-amount-display">
              <div className="pf-checkout-amount-label">Total à régler</div>
              <div className="pf-checkout-amount-value">
                {new Intl.NumberFormat('fr-FR').format(initialAmount)} XOF
              </div>
            </div>

            <div className="pf-checkout-details-list">
              <div className="pf-checkout-detail-row">
                <span>Article :</span>
                <span className="pf-checkout-detail-val">{initialTitle}</span>
              </div>
              <div className="pf-checkout-detail-row">
                <span>Réf. Commande :</span>
                <span className="pf-checkout-detail-val">#ORD-2026-1024</span>
              </div>
              <div className="pf-checkout-detail-row">
                <span>Environnement :</span>
                <span className="pf-badge pf-badge-pending" style={{ fontSize: '0.7rem' }}>
                  <span className="pf-badge-dot"></span> Sandbox TEST
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--pf-muted)', marginTop: '2rem' }}>
            <FontAwesomeIcon icon={faShieldHalved} style={{ color: 'var(--pf-primary)' }} />
            <span>Paiement sécurisé par l'infrastructure PichFlow</span>
          </div>
        </div>

        {/* Right Col: Payment Form or Status Screens */}
        <div className="pf-checkout-form-col">
          {status === 'idle' && (
            <form onSubmit={handlePay}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                Moyen de paiement
              </h3>

              {/* Country Selection */}
              <div className="pf-form-group">
                <label className="pf-label">Pays de votre compte</label>
                <select
                  className="pf-select"
                  value={country}
                  onChange={(e) => setCountry(e.target.value as 'BJ' | 'CI' | 'SN')}
                >
                  <option value="BJ">🇧🇯 Bénin (+229)</option>
                  <option value="CI">🇨🇮 Côte d'Ivoire (+225)</option>
                  <option value="SN">🇸🇳 Sénégal (+221)</option>
                </select>
              </div>

              {/* Methods Grid */}
              <div className="pf-methods-grid">
                <div
                  onClick={() => setSelectedMethod('mtn')}
                  className={`pf-method-option ${selectedMethod === 'mtn' ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="hostedMethod"
                    checked={selectedMethod === 'mtn'}
                    onChange={() => setSelectedMethod('mtn')}
                    className="pf-method-radio"
                  />
                  <div>
                    <div className="pf-method-name">MTN Mobile Money</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--pf-muted)' }}>Bénin MoMo</div>
                  </div>
                </div>

                <div
                  onClick={() => setSelectedMethod('moov')}
                  className={`pf-method-option ${selectedMethod === 'moov' ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="hostedMethod"
                    checked={selectedMethod === 'moov'}
                    onChange={() => setSelectedMethod('moov')}
                    className="pf-method-radio"
                  />
                  <div>
                    <div className="pf-method-name">Moov Money</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--pf-muted)' }}>Moov Africa</div>
                  </div>
                </div>

                <div
                  onClick={() => setSelectedMethod('celtiis')}
                  className={`pf-method-option ${selectedMethod === 'celtiis' ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="hostedMethod"
                    checked={selectedMethod === 'celtiis'}
                    onChange={() => setSelectedMethod('celtiis')}
                    className="pf-method-radio"
                  />
                  <div>
                    <div className="pf-method-name">Celtiis Cash</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--pf-muted)' }}>SBIN</div>
                  </div>
                </div>

                <div
                  onClick={() => setSelectedMethod('card')}
                  className={`pf-method-option ${selectedMethod === 'card' ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="hostedMethod"
                    checked={selectedMethod === 'card'}
                    onChange={() => setSelectedMethod('card')}
                    className="pf-method-radio"
                  />
                  <div>
                    <div className="pf-method-name">Carte Bancaire</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--pf-muted)' }}>Visa / Mastercard</div>
                  </div>
                </div>
              </div>

              {/* Input for Phone / Card */}
              {selectedMethod !== 'card' ? (
                <div className="pf-form-group">
                  <label className="pf-label">Numéro Mobile Money</label>
                  <div className="pf-input-wrapper">
                    <span className="pf-input-icon">
                      <FontAwesomeIcon icon={faMobileScreen} />
                    </span>
                    <input
                      type="text"
                      className="pf-input pf-input-with-icon"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ex: 97 12 34 56"
                      required
                    />
                  </div>
                  <span className="pf-helper-text">
                    Une notification USSD push apparaîtra sur votre téléphone pour confirmer le débit.
                  </span>
                </div>
              ) : (
                <div className="pf-form-group">
                  <label className="pf-label">Numéro de carte</label>
                  <div className="pf-input-wrapper">
                    <span className="pf-input-icon">
                      <FontAwesomeIcon icon={faCreditCard} />
                    </span>
                    <input
                      type="text"
                      className="pf-input pf-input-with-icon"
                      defaultValue="4242 •••• •••• 4242"
                      disabled
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="pf-btn pf-btn-primary pf-btn-lg pf-btn-shine"
                style={{ width: '100%', marginTop: '1.25rem' }}
              >
                <FontAwesomeIcon icon={faLock} />
                <span>Payer {new Intl.NumberFormat('fr-FR').format(initialAmount)} XOF</span>
              </button>
            </form>
          )}

          {status === 'loading' && (
            <div className="pf-checkout-status-box">
              <div className="pf-checkout-status-icon" style={{ background: 'var(--pf-primary-soft)', color: 'var(--pf-primary)' }}>
                <FontAwesomeIcon icon={faSpinner} spin />
              </div>
              <h3>Initialisation du paiement...</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--pf-muted)' }}>
                Connexion sécurisée à la passerelle {selectedMethod.toUpperCase()}...
              </p>
            </div>
          )}

          {status === 'pending' && (
            <div className="pf-checkout-status-box">
              <div className="pf-checkout-status-icon pf-status-pending">
                <FontAwesomeIcon icon={faClock} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Validation sur votre téléphone</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--pf-muted)', lineHeight: 1.6 }}>
                Une notification USSD a été envoyée au <strong>{phone}</strong>.<br />
                Veuillez saisir votre code secret PIN pour autoriser le paiement de <strong>{new Intl.NumberFormat('fr-FR').format(initialAmount)} XOF</strong>.
              </p>
              <div className="pf-badge pf-badge-pending">
                <span className="pf-badge-dot"></span> En attente du signal opérateur...
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="pf-checkout-status-box">
              <div className="pf-checkout-status-icon pf-status-success">
                <FontAwesomeIcon icon={faCircleCheck} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--pf-success)' }}>
                Paiement validé avec succès !
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--pf-muted)', lineHeight: 1.6 }}>
                Votre transaction de <strong>{new Intl.NumberFormat('fr-FR').format(initialAmount)} XOF</strong> a été confirmée.
                Un reçu a été généré et le marchand a reçu l'événement <code>payment.success</code>.
              </p>
              <button onClick={handleReset} className="pf-btn pf-btn-secondary pf-btn-md">
                Refaire un test de paiement
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
