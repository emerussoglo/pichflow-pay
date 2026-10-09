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

          {/* Interactive Persona Filter */}
          <div className="pf-persona-switcher" role="tablist" aria-label="Choisir un profil d'entreprise">
            {(['saas', 'ecommerce', 'agency'] as const).map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={selectedPersona === key}
                onClick={() => setSelectedPersona(key)}
                className={`pf-persona-btn ${selectedPersona === key ? 'active' : ''}`}
              >
                {personaDetails[key].label}
              </button>
            ))}
          </div>
        </div>

        {/* 2 Comparison Cards (Before vs After) */}
        <div className="pf-comparison-grid">
          {/* CARD 1: SANS PICHFLOW (L'ancienne méthode) */}
          <div className="pf-compare-card pf-compare-before">
            <div className="pf-compare-badge pf-badge-before">
              <FontAwesomeIcon icon={faHourglassHalf} />
              <span>Sans PichFlow · L’ancienne méthode</span>
            </div>

            

            <ul className="pf-compare-list pf-list-before">
              <li>
                <span className="pf-compare-icon-wrap icon-cross">
                  <FontAwesomeIcon icon={faXmark} />
                </span>
                <span>
                  <strong>Jongler entre 4 applications d’opérateurs</strong> pour vérifier chaque paiement Orange, MTN, Wave et Moov.
                </span>
              </li>
              <li>
                <span className="pf-compare-icon-wrap icon-cross">
                  <FontAwesomeIcon icon={faXmark} />
                </span>
                <span>
                  <strong>Soirées entières sur des tableurs Excel</strong> à réconcilier les factures et traquer les décalages de caisse.
                </span>
              </li>
              <li>
                <span className="pf-compare-icon-wrap icon-cross">
                  <FontAwesomeIcon icon={faXmark} />
                </span>
                <span>
                  <strong>Abonnés perdus au premier échec</strong> faute de système automatique de relance des cartes ou des portefeuilles.
                </span>
              </li>
              <li>
                <span className="pf-compare-icon-wrap icon-cross">
                  <FontAwesomeIcon icon={faXmark} />
                </span>
                <span>
                  <strong>Frais fixes et abonnements mensuels</strong> prélevés même les mois où tu génères peu de ventes.
                </span>
              </li>
              <li>
                <span className="pf-compare-icon-wrap icon-cross">
                  <FontAwesomeIcon icon={faXmark} />
                </span>
                <span>
                  <strong>Délais de virement de 3 à 5 jours</strong> pour accéder à tes propres fonds et payer ton équipe.
                </span>
              </li>
            </ul>

            <div className="pf-compare-footer pf-footer-before">
              <span className="pf-compare-verdict-title">Bilan :</span>
              <span className="pf-compare-verdict-desc">Charge mentale élevée, perte de conversions et temps précieux gaspillé.</span>
            </div>
          </div>

          {/* CARD 2: AVEC PICHFLOW (La méthode moderne) */}
          <div className="pf-compare-card pf-compare-after">
            <div className="pf-card-popular-flag">Recommandé</div>

            <div className="pf-compare-badge pf-badge-after">
              <FontAwesomeIcon icon={faBolt} />
              <span>Avec PichFlow · La méthode SaaS moderne</span>
            </div>

            <ul className="pf-compare-list pf-list-after">
              <li>
                <span className="pf-compare-icon-wrap icon-check">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span>
                  <strong>Une seule intégration universelle</strong> pour accepter cartes Visa/Mastercard et Mobile Money dans 8 pays.
                </span>
              </li>
              <li>
                <span className="pf-compare-icon-wrap icon-check">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span>
                  <strong>Tableau de bord unifié en direct</strong> : chaque franc est tracé, catégorisé et réconcilié à la seconde.
                </span>
              </li>
              <li>
                <span className="pf-compare-icon-wrap icon-check">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span>
                  <strong>Gestion automatique des abonnements</strong> avec relances intelligentes qui sauvent jusqu’à 98% des clients.
                </span>
              </li>
              <li>
                <span className="pf-compare-icon-wrap icon-check">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span>
                  <strong>0 FCFA d’abonnement fixe</strong> : tu ne paies une commission claire que lorsque tu encaisses avec succès.
                </span>
              </li>
              <li>
                <span className="pf-compare-icon-wrap icon-check">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span>
                  <strong>Versements et retraits instantanés</strong> vers tes comptes bancaires et portefeuilles mobiles marchands.
                </span>
              </li>
            </ul>

            <div className="pf-compare-footer pf-footer-after">
              <div className="pf-compare-after-cta-row">
                <div className="pf-verdict-after-text">
                  <span className="pf-compare-verdict-title">Bilan :</span>
                  <span className="pf-compare-verdict-desc">Sérénité totale, zéro friction et trésorerie disponible instantanément.</span>
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
