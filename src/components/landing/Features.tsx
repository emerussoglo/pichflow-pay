import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGlobe,
  faArrowsRotate,
  faClock,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';

interface FeaturesProps {
  onNavigate?: (route: string) => void;
}

export const Features: React.FC<FeaturesProps> = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedRevenue, setAnimatedRevenue] = useState(0);

  // Déclencher les animations lorsque la section devient visible à l'écran
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animation du compteur de chiffres pour les revenus (5 350 000 FCFA)
  useEffect(() => {
    if (!isVisible) return;

    const target = 5350000;
    const duration = 1800; // Durée de l'animation en ms
    const steps = 60;
    const increment = target / steps;
    const stepTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setAnimatedRevenue(target);
        clearInterval(timer);
      } else {
        setAnimatedRevenue(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible]);

  // Formatage du montant avec séparation des milliers
  const formattedRevenue = animatedRevenue.toLocaleString('fr-FR');

  return (
    <section id="capacites-section" className="pf-capacites-section" ref={sectionRef}>
      <div className="pf-container">
        {/* Section Header */}
        <div className="pf-section-center-head">
          <div className="pf-badge-pill-purple">
            <span>Capacités</span>
          </div>
          <h2 className="pf-heading-purple-accent">
            Tous tes paiements, <span className="pf-italic-accent">en un seul endroit.</span>
          </h2>
        </div>

        {/* 2x2 Cards Grid */}
        <div className="pf-capacites-grid">
          {/* Card 1: Des paiements sans frontières */}
          <div className="pf-capacite-card">
            <div className="pf-capacite-icon-box">
              <FontAwesomeIcon icon={faGlobe} />
            </div>
            <h3 className="pf-capacite-title">Encaisse sans frontières</h3>
            <p className="pf-capacite-desc">
              Accepte les paiements par Mobile Money et carte bancaire pour offrir à tes clients une expérience de paiement simple et fluide.
            </p>

            <div className="pf-capacite-mini-ui">
              <div className="pf-mini-ui-row">
                <span className="pf-mini-ui-label">MTN Money BJ</span>
                <span className="pf-mini-ui-status">
                  <span className="pf-mini-dot-green" /> Réussi
                </span>
              </div>
              <div className="pf-mini-ui-row">
                <span className="pf-mini-ui-label">Carte Visa •••• 4022</span>
                <span className="pf-mini-ui-status">
                  <span className="pf-mini-dot-green" /> Réussi
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: L'abonnement, en toute simplicité */}
          <div className="pf-capacite-card">
            <div className="pf-capacite-icon-box">
              <FontAwesomeIcon icon={faArrowsRotate} />
            </div>
            <h3 className="pf-capacite-title">Automatise tes abonnements</h3>
            <p className="pf-capacite-desc">
              Configure tes paiements récurrents et simplifie la facturation de tes clients pour te concentrer 
              sur la croissance de ton activité.
            </p>

            <div className="pf-capacite-mini-ui">
              <div className="pf-mini-plan-header">
                <span className="pf-mini-plan-name">Plan Business</span>
                <span className="pf-mini-plan-badge">Automatique</span>
              </div>
              <div className="pf-mini-plan-progress-bar">
                <div
                  className="pf-mini-plan-progress-fill"
                  style={{ width: isVisible ? '42%' : '0%' }}
                />
              </div>
              <div className="pf-mini-plan-sub">Prochaine échéance dans 12 jours</div>
            </div>
          </div>

          {/* Card 3: Payé en quelques secondes */}
          <div className="pf-capacite-card">
            <div className="pf-capacite-icon-box">
              <FontAwesomeIcon icon={faClock} />
            </div>
            <h3 className="pf-capacite-title">Suis tes paiements en temps réel</h3>
            <p className="pf-capacite-desc">
              Garde le contrôle sur tes encaissements et tes versements grâce à une visibilité claire sur les mouvements de ton compte.
            </p>

            <div className="pf-capacite-mini-ui">
              <div className="pf-mini-payout-box">
                <div className="pf-mini-payout-icon">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div className="pf-mini-payout-info">
                  <div className="pf-mini-payout-title">Versement envoyé</div>
                  <div className="pf-mini-payout-meta">120 000 FCFA • à l'instant</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Intelligence des revenus */}
          <div className="pf-capacite-card">
            <div className="pf-capacite-icon-box">
              <FontAwesomeIcon icon={faChartLine} />
            </div>
            <h3 className="pf-capacite-title">Garde une vue claire sur tes revenus</h3>
            <p className="pf-capacite-desc">
              Analyse tes revenus, suis tes transactions et identifie les tendances qui comptent pour piloter ton activité.
            </p>

            <div className="pf-capacite-mini-ui">
              <div className="pf-mini-revenue-box">
                <div>
                  <div className="pf-mini-rev-label">Revenus cumulés</div>
                  <div className="pf-mini-rev-amount">{formattedRevenue} FCFA</div>
                </div>
                <div className="pf-mini-rev-sparkline">
                  <svg viewBox="0 0 160 36" fill="none" className="pf-sparkline-svg">
                    <path
                      d="M2 30 L40 28 L70 20 L105 24 L135 12 L158 14"
                      stroke="#2563EB"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={isVisible ? 'pf-sparkline-path animated' : 'pf-sparkline-path'}
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};