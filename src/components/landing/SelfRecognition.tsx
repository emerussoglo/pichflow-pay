import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faXmark,
  faArrowRight,
  faBolt,
  faHourglassHalf,
  faChartLine,
  faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';

interface SelfRecognitionProps {
  onNavigate?: (route: string) => void;
}

export const SelfRecognition: React.FC<SelfRecognitionProps> = ({ onNavigate }) => {
  const [selectedPersona, setSelectedPersona] = useState<'saas' | 'ecommerce' | 'agency'>('saas');

  const personaDetails = {
    saas: {
      label: 'Fondateurs SaaS & Logiciels',
      withoutPain: 'Développement de passerelles custom pour chaque pays, webhooks instables et gestion manuelle des renouvellements mensuels.',
      withBenefit: 'Moteur d’abonnement récurrent universel (Mobile Money + CB), retries automatiques et webhook fiable à 99,99%.',
    },
    ecommerce: {
      label: 'E-commerce & Vente en ligne',
      withoutPain: 'Vérification manuelle des captures d’écran WhatsApp, commandes non payées et litiges de livraison sans preuve.',
      withBenefit: 'Liens de paiement interactifs, validation instantanée du paiement et expédition sans aucun doute.',
    },
    agency: {
      label: 'Agences & Prestateurs B2B',
      withoutPain: 'Relances interminables de devis, délais de virements bancaires internationaux de 5 jours et taux de change opaques.',
      withBenefit: 'Factures pro avec bouton de paiement intégré, devises multi-pays et encaissements immédiats.',
    },
  };

  return (
    <section id="avantages-section" className="pf-self-recognition-section">
      <div className="pf-container">
        {/* Header */}
        <div className="pf-section-center-head">
          <div className="pf-badge-pill-blue">
            <span className="pf-pill-blue-dot" />
            <span>LA DIFFÉRENCE PICHFLOW</span>
          </div>

          <h2 className="pf-self-title">
            Prends deux secondes. <br />
            <span className="pf-self-title-accent">Tu te reconnais où ?</span>
          </h2>

          <p className="pf-self-subtitle">
            Compare ton quotidien actuel avec l’infrastructure moderne pensée pour libérer ton temps et propulser tes revenus en Afrique.
          </p>

         
        </div>

        {/* 2 Comparison Cards (Before vs After) */}
        <div className="pf-comparison-grid">
          {/* CARD 1: SANS PICHFLOW (L'ancienne méthode) */}
          <div className="pf-compare-card pf-compare-before">
            <div className="pf-compare-badge pf-badge-before">
              <FontAwesomeIcon icon={faHourglassHalf} />
              <span>Sans PichFlow</span>
            </div>

            

            <ul className="pf-compare-list pf-list-before">
              <li>
                <span className="pf-compare-icon-wrap icon-cross">
                  <FontAwesomeIcon icon={faXmark} />
                </span>
                <span>
                  <strong>Jongler entre applications d’opérateurs</strong> pour voir tes paiements Orange, MTN, Wave et autres.
                </span>
              </li>
              <li>
                <span className="pf-compare-icon-wrap icon-cross">
                  <FontAwesomeIcon icon={faXmark} />
                </span>
                <span>
                  <strong>Des heures sur Excel</strong> à réconcilier vos factures et traquer les erreurs.
                </span>
              </li>
              
              <li>
                <span className="pf-compare-icon-wrap icon-cross">
                  <FontAwesomeIcon icon={faXmark} />
                </span>
                <span>
                  <strong>Abonnements mensuels payés</strong> même sans ventes.
                </span>
              </li>
              <li>
                <span className="pf-compare-icon-wrap icon-cross">
                  <FontAwesomeIcon icon={faXmark} />
                </span>
                <span>
                  <strong>Accès aux fonds en 3 à 5 jours</strong> pour financer votre équipe.
                </span>
              </li>
            </ul>

            <div className="pf-compare-footer pf-footer-before">
              <span className="pf-compare-verdict-title">Bilan :</span>
              <span className="pf-compare-verdict-desc">Charge mentale, pertes de conversions et temps perdu.</span>
            </div>
          </div>

          {/* CARD 2: AVEC PICHFLOW (La méthode moderne) */}
          <div className="pf-compare-card pf-compare-after">
            <div className="pf-card-popular-flag">Recommandé</div>

            <div className="pf-compare-badge pf-badge-after">
              <FontAwesomeIcon icon={faBolt} />
              <span>Avec PichFlow</span>
            </div>

            <ul className="pf-compare-list pf-list-after">
              <li>
                <span className="pf-compare-icon-wrap icon-check">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span>
                  <strong>Une seule intégration</strong> pour accepter cartes et Mobile Money dans 8 pays.
                </span>
              </li>
              <li>
                <span className="pf-compare-icon-wrap icon-check">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span>
                  <strong>Suivi en temps réel :</strong> vos transactions tracées et réconciliées à la seconde.
                </span>
              </li>
              
              <li>
                <span className="pf-compare-icon-wrap icon-check">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span>
                  <strong>0 FCFA d'abonnement :</strong> paie uniquement une commission sur tes encaissements réussis.
                </span>
              </li>
              <li>
                <span className="pf-compare-icon-wrap icon-check">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span>
                  <strong>Retraits instantanés</strong> vers vos comptes bancaires et Mobile Money.
                </span>
              </li>
            </ul>

            <div className="pf-compare-footer pf-footer-after">
              <div className="pf-compare-after-cta-row">
                <div className="pf-verdict-after-text">
                  <span className="pf-compare-verdict-title">Bilan :</span>
                  <span className="pf-compare-verdict-desc">Sérénité totale zéro friction et trésorerie disponible instantanément.</span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('/register')}
                  className="pf-compare-cta-btn pf-btn-shimmer-sweep"
                >
                  <span>Passer à PichFlow</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
