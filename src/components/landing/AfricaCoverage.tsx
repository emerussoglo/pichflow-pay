import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const AfricaCoverage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const countries = [
    {
      code: 'CI',
      name: 'Côte d’Ivoire',
      rate: 'Dès 1,8%',
      methods: ['Orange Money', 'MTN MoMo', 'Wave', 'Moov Money', 'Carte bancaire • 5%'],
    },
    {
      code: 'SN',
      name: 'Sénégal',
      rate: '2,25%',
      methods: ['Orange Money', 'Wave', 'YAS', 'Carte bancaire • 5%'],
    },
    {
      code: 'TG',
      name: 'Togo',
      rate: '2,25%',
      methods: ['Moov Money', 'MTN MoMo', 'Carte bancaire • 5%'],
    },
    {
      code: 'BJ',
      name: 'Bénin',
      rate: 'Dès 2,2%',
      methods: ['MTN MoMo', 'Moov Money', 'Celtiis Cash', 'Carte bancaire • 5%'],
    },
    {
      code: 'CM',
      name: 'Cameroun',
      rate: 'Dès 1,75%',
      methods: ['MTN MoMo', 'Orange Money', 'Carte bancaire • 5%'],
    },
    {
      code: 'BF',
      name: 'Burkina Faso',
      rate: 'Dès 3%',
      methods: ['Orange Money', 'Moov Money', 'Carte bancaire • 5%'],
    },
  ];

  return (
    <section id="couverture-section" className="pf-couverture-section">
      <div className="pf-container">
        {/* Header */}
        <div className="pf-section-center-head">
          <div className="pf-badge-pill-purple">
            <span>Couverture</span>
          </div>
          <h2 className="pf-heading-purple-accent">
            Une seule intégration. Plus de <span className="pf-italic-accent"> possibilités.</span>
          </h2>
          <p className="pf-section-subhead">
            Connecte ton activité aux moyens de paiement utilisés par tes clients, en Afrique francophone et au-delà, depuis une seule plateforme.
          </p>
        </div>

        {/* 6 Countries Grid */}
        <div className="pf-couverture-grid">
          {countries.map((c) => (
            <div key={c.code} className="pf-country-card">
              <div className="pf-country-card-header">
                <div className="pf-country-title-row">
                  <span className="pf-country-code">{c.code}</span>
                  <span className="pf-country-name">{c.name}</span>
                </div>
                <span className="pf-country-rate-badge">{c.rate}</span>
              </div>

              <div className="pf-country-methods-row">
                {c.methods.map((m, idx) => (
                  <span
                    key={idx}
                    className={`pf-method-chip ${m.includes('Carte') ? 'pf-method-chip-card' : ''}`}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Row matching screenshot */}
        <div className="pf-couverture-pagination">
          <button
            type="button"
            className="pf-page-nav-btn"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            aria-label="Page précédente"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setCurrentPage(num)}
              className={`pf-page-num-btn ${currentPage === num ? 'active' : ''}`}
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            className="pf-page-nav-btn"
            onClick={() => setCurrentPage(Math.min(4, currentPage + 1))}
            disabled={currentPage === 4}
            aria-label="Page suivante"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        {/* Footnote matching screenshot */}
        <p className="pf-couverture-footnote">
          Frais appliqués sur chaque transaction comprise entre 200 et 9 999 999 FCFA. Les frais indiqués correspondent au moyen de paiement le moins cher disponible dans chaque pays.
        </p>
      </div>
    </section>
  );
};
