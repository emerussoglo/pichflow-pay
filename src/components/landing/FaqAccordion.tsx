import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faMinus,
  faArrowRight,
  faBolt,
  faCheck,
  faComments,
} from '@fortawesome/free-solid-svg-icons';

interface FaqAccordionProps {
  onNavigate?: (route: string) => void;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default for immediate preview

  const faqItems = [
    {
      num: '01',
      q: "Je n'ai jamais codé de ma vie. C'est vraiment possible ?",
      a: "Oui, absolument. PichFlow propose des liens de paiement prêts à l'emploi et un checkout hébergé que vous pouvez partager directement sur WhatsApp, Instagram ou par e-mail sans écrire une seule ligne de code.",
    },
    {
      num: '02',
      q: "Combien de temps avant d'activer mes paiements ?",
      a: "Votre compte Sandbox est actif instantanément dès la création de votre compte. L'activation de l'environnement Live pour recevoir de vrais fonds prend généralement moins de 24 heures après vérification des informations de base.",
    },
    {
      num: '03',
      q: "Est-ce que je peux suivre mes encaissements depuis mon téléphone ?",
      a: "Oui. Le tableau de bord PichFlow est 100% responsive et optimisé pour smartphone. Vous pouvez consulter vos soldes, vérifier les transactions en temps réel et ordonner des retraits directement depuis votre téléphone.",
    },
    {
      num: '04',
      q: "Et si une transaction bloque en cours de route ?",
      a: "PichFlow dispose d'un routage intelligent multi-opérateurs et d'une gestion automatique de l'idempotence. Si un réseau Mobile Money ralentit, la passerelle bascule ou retente immédiatement sans jamais dédoubler un débit.",
    },
    {
      num: '05',
      q: "Dois-je payer un abonnement pour les outils ?",
      a: "Non. PichFlow fonctionne à 100% à la commission par transaction réussie. Vous ne payez aucun abonnement mensuel, aucun frais de mise en service et aucun coût fixe si vous n'encaissez rien.",
    },
    {
      num: '06',
      q: "Comment et quand sont versés mes fonds ?",
      a: "Vos fonds sont disponibles dans vos portefeuilles par pays. Vous pouvez déclencher un retrait instantané vers vos numéros Mobile Money marchands ou planifier un virement bancaire automatique vers votre compte (BOA, Ecobank, etc.).",
    },
    {
      num: '07',
      q: "Comment je commence après l'inscription ?",
      a: "Dès votre inscription validée, vous accédez directement au tableau de bord. Vous pouvez créer votre premier lien de paiement en 30 secondes ou copier vos clés API Sandbox pour commencer vos tests.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="pf-faq-section-white">
      <div className="pf-container">
        {/* Header */}
        <div className="pf-section-center-head">
          <div className="pf-badge-pill-blue">
            <span className="pf-pill-blue-dot" />
            <span>RÉPONSES CLAIRES</span>
          </div>
          <h2 className="pf-faq-main-title">
            Ce qui te retient encore
          </h2>
          <p className="pf-faq-main-subtitle">
            Les objections et questions qu'on nous pose le plus souvent. Traitées en toute transparence.
          </p>
        </div>

        {/* FAQ Container with Pure White Background */}
        <div className="pf-faq-white-container">
          <div className="pf-faq-list-rows">
            {faqItems.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className={`pf-faq-row-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="pf-faq-row-trigger"
                    aria-expanded={isOpen}
                  >
                    <div className="pf-faq-trigger-left">
                      <span className="pf-faq-row-num">{item.num}</span>
                      <span className="pf-faq-row-question">{item.q}</span>
                    </div>
                    <span className="pf-faq-toggle-icon">
                      <FontAwesomeIcon icon={isOpen ? faMinus : faPlus} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pf-faq-row-answer">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Call-To-Action Row matching competitor style */}
          <div className="pf-faq-bottom-card">
            <div className="pf-faq-bottom-text">
              <div className="pf-faq-bottom-title">Tu as toutes tes réponses ?</div>
              <div className="pf-faq-bottom-sub">Il ne reste plus qu’à lancer tes encaissements.</div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate('/register')}
              className="pf-faq-bottom-btn pf-btn-shimmer-sweep"
            >
              <span>Commencer maintenant</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FinalCta: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  return (
    <section className="pf-final-cta-section">
      <div className="pf-container">
        <div className="pf-final-cta-banner">
          {/* Subtle Ambient Radial Lighting */}
          <div className="pf-final-cta-glow" aria-hidden="true" />

          {/* Tag */}
          <div className="pf-final-cta-pill">
            <span className="pf-final-pill-dot" />
            <span>ACCÉLÉRATEUR DE CROISSANCE</span>
          </div>

          <h2 className="pf-final-cta-title">
            Prêt à être payé, <span className="pf-italic-cta-white">façon SaaS</span> ?
          </h2>

          <p className="pf-final-cta-desc">
            Crée ton compte en quelques minutes et commence à encaisser partout en Afrique, sans abonnement ni engagement.
          </p>

          <div className="pf-final-cta-actions">
            <button
              onClick={() => onNavigate('/register')}
              className="pf-final-btn-white"
            >
              <span>Commencer gratuitement</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>

            <button
              onClick={() => onNavigate('/pricing')}
              className="pf-final-btn-glass"
            >
              <span>Voir la tarification</span>
            </button>
          </div>

          
        </div>
      </div>
    </section>
  );
};
