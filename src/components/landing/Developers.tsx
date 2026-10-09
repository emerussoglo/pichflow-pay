import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faChartSimple,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';

export const Developers: React.FC<{ onNavigate?: (route: string) => void }> = () => {
  const steps = [
    {
      title: 'Connecte ton SaaS',
      desc: 'Une API simple et des SDK prêts à l’emploi pour brancher PichFlow à ton produit en quelques heures.',
    },
    {
      title: 'Facture des abonnements',
      desc: 'Crée des plans, gère les essais gratuits, les upgrades et les prélèvements automatiques.',
    },
    {
      title: 'Collecte partout',
      desc: 'Accepte les paiements de tes utilisateurs où qu’ils soient, en mobile money ou par carte.',
    },
    {
      title: 'Suis tes revenus',
      desc: 'Un tableau de bord unique pour visualiser ton MRR, tes churns et tes encaissements.',
    },
  ];

  const barHeights = [45, 60, 52, 28, 88, 98, 70];

  return (
    <section className="pf-founders-section">
      <div className="pf-container">
        {/* Header */}
        <div className="pf-founders-header">
          <div className="pf-badge-pill-purple">
            <span>Pour les founders</span>
          </div>
          <h2 className="pf-heading-purple-accent">
            Conçu pour les <span className="pf-italic-accent">SaaS</span>, du premier au millionième utilisateur
          </h2>
          <p className="pf-founders-subhead">
            PichFlow s’intègre directement à ton produit pour que tu puisses te concentrer sur ta croissance, pas sur la galère bancaire.
          </p>
        </div>

        {/* 2-Columns Grid from Capture d'écran 2026-10-09 134715.png */}
        <div className="pf-founders-grid">
          {/* Left Column: 4 items with purple arrow circle */}
          <div className="pf-founders-list">
            {steps.map((item, idx) => (
              <div key={idx} className="pf-founders-item">
                <div className="pf-founders-arrow-circle">
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
                <div className="pf-founders-item-text">
                  <h3 className="pf-founders-item-title">{item.title}</h3>
                  <p className="pf-founders-item-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Monthly Revenue Card */}
          <div className="pf-founders-card-col">
            <div className="pf-founders-revenue-card">
              <div className="pf-revenue-card-top">
                <span className="pf-rev-title">Revenus mensuels</span>
                <span className="pf-rev-icon-box">
                  <FontAwesomeIcon icon={faChartSimple} />
                </span>
              </div>

              <div className="pf-rev-stat-row">
                <span className="pf-rev-amount">4 260 633 FCFA</span>
                <span className="pf-rev-growth">+20.0% ce mois-ci</span>
              </div>

              {/* Bar Chart Visualization */}
              <div className="pf-rev-bars-chart">
                {barHeights.map((h, i) => (
                  <div key={i} className="pf-rev-bar-track">
                    <div className="pf-rev-bar-fill" style={{ height: `${h}%` }} />
                  </div>
                ))}
              </div>

              <div className="pf-rev-footer-metrics">
                <div className="pf-rev-metric-item">
                  <span className="pf-metric-label">Abonnés actifs</span>
                  <span className="pf-metric-val">1284</span>
                </div>
                <div className="pf-rev-metric-item">
                  <span className="pf-metric-label">Taux de rétention</span>
                  <span className="pf-metric-val">96.4%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LIVE STATS BANNER from Capture d'écran 2026-10-09 134737.png */}
        <div className="pf-live-stats-banner">
          <div className="pf-live-banner-tag">EN DIRECT SUR PICHFLOW</div>
          <div className="pf-live-cards-row">
            {/* Card 1 */}
            <div className="pf-live-stat-card">
              <div className="pf-live-card-top">
                <span className="pf-live-icon-pill">
                  <FontAwesomeIcon icon={faChartSimple} />
                </span>
                <span className="pf-live-card-label">Encaissé via PichFlow</span>
              </div>
              <div className="pf-live-card-value">4 929 741 <span className="pf-live-card-curr">FCFA</span></div>
              <div className="pf-live-card-sub">Mis à jour en temps réel, toutes les quelques secondes.</div>
            </div>

            {/* Card 2 */}
            <div className="pf-live-stat-card">
              <div className="pf-live-card-top">
                <span className="pf-live-icon-pill">
                  <FontAwesomeIcon icon={faGlobe} />
                </span>
                <span className="pf-live-card-label">Founders qui font confiance à PichFlow</span>
              </div>
              <div className="pf-live-card-value">2730</div>
              <div className="pf-live-card-sub">Ils sont déjà en train de démarrer avec PichFlow.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
