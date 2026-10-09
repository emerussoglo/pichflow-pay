import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faArrowsRotate,
  faCheck,
  faCopy,
  faEnvelope,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useToast } from '../ui/ToastContext';

interface HeroProps {
  onNavigate: (route: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText('link.pichflow.me/facture-082');
    setCopiedLink(true);
    showToast('Lien de paiement copié !', 'success');
    setTimeout(() => setCopiedLink(false), 2200);
  };

  return (
    <section className="pf-hero-saspay">
      {/* Soft Ambient Radial Lights (Clean White Theme with soft purple glow) */}
      <div className="pf-saspay-glow" aria-hidden="true" />

      <div className="pf-container">
        {/* CENTERED EDITORIAL HEADER (Exact SasPay composition) */}
        <div className="pf-saspay-header">
          {/* Eyebrow Pill */}
          <div className="pf-saspay-pill">
            <span className="pf-badge-pulsing-dot" />
            <span className="pf-badge-chip">Nouveau</span>
            <span className="pf-badge-divider">·</span>
            <span className="pf-badge-text">La couche de paiement pour l'Afrique</span>
            <FontAwesomeIcon icon={faArrowRight} className="pf-badge-arrow" />
          </div>

          {/* Centered H1 */}
          <h1 className="pf-saspay-title">
            L'infrastructure de <br />
            <span className="pf-saspay-title-italic">paiement</span> moderne pour l'Afrique
          </h1> 

          {/* Concise, punchy subtitle */}
          <p className="pf-saspay-subtitle">
            Encaissez partout, automatisez vos abonnements et recevez vos paiements en toute simplicité, par Mobile Money et carte bancaire.
          </p>

          {/* Centered CTA Buttons with Simulated Clicking Cursor */}
          <div className="pf-saspay-actions">
            <div className="pf-btn-click-simulator-wrap">
              <button
                onClick={() => onNavigate('/register')}
                className="pf-saspay-btn-primary pf-btn-simulated-click"
                aria-label="Commencer sur PichFlow"
              >
                <span>Commencer</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>

              {/* Simulated auto-clicking mouse cursor */}
              <div className="pf-simulated-cursor" aria-hidden="true" title="Simulation de clic automatique">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="pf-cursor-svg"
                >
                  <path
                    d="M4.5 3.5L19 12L12.5 13.5L9 20L4.5 3.5Z"
                    fill="#0F172A"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="pf-cursor-click-ring" />
              </div>
            </div>

            <button
              onClick={() => onNavigate('/pricing')}
              className="pf-saspay-btn-secondary"
              aria-label="Voir la tarification"
            >
              <span>Voir la tarification</span>
            </button>
          </div>
        </div>

        {/* 3 FLOATING CARDS (EXACT MATCH TO CAPTURE D'ÉCRAN 2026-10-09 131916.png) */}
        <div className="pf-hero-floating-stage">
          {/* Background ambient radial glow for the cards */}
          <div className="pf-floating-glow-backdrop" aria-hidden="true" />

          {/* CARD 1 (LEFT): Abonnement Pro */}
          <div className="pf-float-card-pro">
            <div className="pf-card-pro-header">
              <div className="pf-card-pro-icon">
                <FontAwesomeIcon icon={faArrowsRotate} />
              </div>
              <span className="pf-card-pro-title">Abonnement Pro</span>
            </div>

            <div className="pf-card-pro-subbox">
              <div className="pf-card-pro-plan-row">
                <span className="pf-card-pro-plan-name">Plan mensuel</span>
                <span className="pf-card-pro-badge-active">Actif</span>
              </div>
              <div className="pf-card-pro-renew">Renouvelé le 4</div>
            </div>

            <div className="pf-card-pro-next-row">
              <div className="pf-card-pro-next-label">Prochain prélèvement</div>
              <div className="pf-card-pro-next-amount">15 000 FCFA</div>
            </div>
          </div>

          {/* CARD 2 (BOTTOM-CENTER, OVERLAPPING): Solde disponible */}
          <div className="pf-float-card-balance">
            <div className="pf-card-balance-label">Solde disponible</div>
            <div className="pf-card-balance-amount">
              5320000 <span className="pf-card-balance-curr">FCFA</span>
            </div>
            <div className="pf-card-balance-usd">≈ 8620,00 USD</div>

            <div className="pf-card-balance-buttons">
              <button
                type="button"
                onClick={() => onNavigate('/dashboard/withdrawals')}
                className="pf-btn-balance-transfer"
              >
                Transférer
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/dashboard/withdrawals')}
                className="pf-btn-balance-withdraw"
              >
                Retirer
              </button>
            </div>
          </div>

          {/* CARD 3 (RIGHT): Lien de paiement créé */}
          <div className="pf-float-card-link">
            <div className="pf-card-link-header">
              <div className="pf-card-link-check">
                <FontAwesomeIcon icon={faCheck} />
              </div>
              <div className="pf-card-link-titles">
                <div className="pf-card-link-title">Lien de paiement créé</div>
                <div className="pf-card-link-sub">Prêt à partager</div>
              </div>
            </div>

            <div className="pf-card-link-box">
              <span className="pf-card-link-url">link.pichflow.me/facture-0...</span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="pf-card-link-copy"
              >
                <FontAwesomeIcon icon={faCopy} />
                <span>{copiedLink ? 'Copié !' : 'Copier'}</span>
              </button>
            </div>

            <div className="pf-card-link-shares">
              <button type="button" className="pf-share-circle pf-share-mail" title="Partager par Email">
                <FontAwesomeIcon icon={faEnvelope} />
              </button>
              <button type="button" className="pf-share-circle pf-share-link" onClick={handleCopyLink} title="Copier le lien">
                <FontAwesomeIcon icon={faLink} />
              </button>
              <button type="button" className="pf-share-circle pf-share-whatsapp" title="Partager sur WhatsApp">
                <FontAwesomeIcon icon={faWhatsapp} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
