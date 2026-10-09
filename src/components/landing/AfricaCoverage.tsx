import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface CountryData {
  flag: string;
  code: string;
  name: string;
  rate: string;
  methods: string[];
}

export const AfricaCoverage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Liste complète des pays d'Afrique configurés
  const allCountries: CountryData[] = [
    // Page 1
    {
      flag: '🇨🇮',
      code: 'CI',
      name: 'Côte d’Ivoire',
      rate: 'Dès 1,8%',
      methods: ['Orange Money', 'MTN MoMo', 'Wave', 'Moov Money', 'Carte bancaire • 5%'],
    },
    {
      flag: '🇸🇳',
      code: 'SN',
      name: 'Sénégal',
      rate: 'Dès 2,25%',
      methods: ['Orange Money', 'Wave', 'YAS', 'Carte bancaire • 5%'],
    },
    {
      flag: '🇹🇬',
      code: 'TG',
      name: 'Togo',
      rate: 'Dès 2,25%',
      methods: ['Moov Money', 'MTN MoMo', 'Carte bancaire • 5%'],
    },
    {
      flag: '🇧🇯',
      code: 'BJ',
      name: 'Bénin',
      rate: 'Dès 2,2%',
      methods: ['MTN MoMo', 'Moov Money', 'Celtiis Cash', 'Carte bancaire • 5%'],
    },
    {
      flag: '🇨🇲',
      code: 'CM',
      name: 'Cameroun',
      rate: 'Dès 1,75%',
      methods: ['MTN MoMo', 'Orange Money', 'Carte bancaire • 5%'],
    },
    {
      flag: '🇧🇫',
      code: 'BF',
      name: 'Burkina Faso',
      rate: 'Dès 3%',
      methods: ['Orange Money', 'Moov Money', 'Carte bancaire • 5%'],
    },

    // Page 2
    {
      flag: '🇲🇱',
      code: 'ML',
      name: 'Mali',
      rate: 'Dès 2%',
      methods: ['Orange Money', 'Moov Money', 'Carte bancaire • 5%'],
    },
    {
      flag: '🇬🇦',
      code: 'GA',
      name: 'Gabon',
      rate: 'Dès 2%',
      methods: ['Airtel Money', 'Moov Money', 'Carte bancaire • 5%'],
    },
    {
      flag: '🇬🇭',
      code: 'GH',
      name: 'Ghana',
      rate: 'Dès 2%',
      methods: ['MTN MoMo', 'AirtelTigo', 'Telecel', 'Carte bancaire • 5%'],
    },
    {
      flag: '🇰🇪',
      code: 'KE',
      name: 'Kenya',
      rate: 'Dès 1%',
      methods: ['M-PESA', 'Carte bancaire • 5%'],
    },
    {
      flag: '🇳🇬',
      code: 'NG',
      name: 'Nigeria',
      rate: 'Dès 3%',
      methods: ['MTN MoMo', 'Airtel Money', 'Carte bancaire • 5%'],
    },
    {
      flag: '🇹🇿',
      code: 'TZ',
      name: 'Tanzanie',
      rate: 'Dès 1%',
      methods: ['Vodacom', 'YAS', 'Airtel Money', 'HaloTel', 'Carte bancaire • 5%'],
    },

    // Page 3
    {
      flag: '🇺🇬',
      code: 'UG',
      name: 'Ouganda',
      rate: 'Dès 2,5%',
      methods: ['MTN MoMo', 'Airtel Money', 'Carte bancaire • 5%'],
    },
    {
      flag: '🇷🇼',
      code: 'RW',
      name: 'Rwanda',
      rate: 'Dès 2,5%',
      methods: ['MTN MoMo', 'Airtel Money', 'Carte bancaire • 5%'],
    },
    {
      flag: '🇨🇩',
      code: 'CD',
      name: 'RD Congo',
      rate: 'Dès 2,5%',
      methods: ['Vodacom', 'Airtel Money', 'Orange Money', 'Carte bancaire • 5%'],
    },
    {
      flag: '🇨🇬',
      code: 'CG',
      name: 'Congo-Brazzaville',
      rate: 'Dès 4%',
      methods: ['MTN MoMo', 'Airtel Money', 'Carte bancaire • 5%'],
    },
    {
      flag: '🇲🇿',
      code: 'MZ',
      name: 'Mozambique',
      rate: 'Dès 4%',
      methods: ['M-Pesa', 'Movitel', 'Carte bancaire • 5%'],
    },
    {
      flag: '🇲🇼',
      code: 'MW',
      name: 'Malawi',
      rate: 'Dès 3,33%',
      methods: ['Airtel Money', 'TNM', 'Carte bancaire • 5%'],
    },
  ];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(allCountries.length / itemsPerPage);

  // Pagination dynamique
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCountries = allCountries.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section ref={sectionRef} id="couverture-section" className="pf-couverture-section">
      <div className="pf-container">
        {/* Header */}
        <div className="pf-section-center-head">
          <div className="pf-badge-pill-purple">
            <span>Couverture</span>
          </div>
          <h2 className="pf-heading-purple-accent">
            Une seule intégration. Plus de <span className="pf-italic-accent">possibilités.</span>
          </h2>
          <p className="pf-section-subhead">
            Connecte ton activité aux moyens de paiement utilisés par tes clients, en Afrique francophone et au-delà, depuis une seule plateforme.
          </p>
        </div>

        {/* Grid des pays filtrés par la page active */}
        <div className="pf-couverture-grid">
          {currentCountries.map((c) => (
            <div key={c.code} className="pf-country-card">
              <div className="pf-country-card-header">
                <div className="pf-country-title-row">
                  <span className="pf-country-flag" role="img" aria-label={c.name}>
                    {c.flag}
                  </span>
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

        {/* Pagination */}
        <div className="pf-couverture-pagination">
          <button
            type="button"
            className="pf-page-nav-btn"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            aria-label="Page précédente"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handlePageChange(num)}
              className={`pf-page-num-btn ${currentPage === num ? 'active' : ''}`}
            >
              {num}
            </button>
          ))}

          <button
            type="button"
            className="pf-page-nav-btn"
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            aria-label="Page suivante"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        {/* Footnote */}
        <p className="pf-couverture-footnote">
          Frais appliqués sur chaque transaction comprise entre 200 et 9 999 999 FCFA. Les frais indiqués correspondent au moyen de paiement le moins cher disponible dans chaque pays.
        </p>
      </div>
    </section>
  );
};