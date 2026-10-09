import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { PichFlowLogo } from '../ui/PichFlowLogo';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (route: string, elementId?: string) => {
    onNavigate(route);
    if (elementId) {
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };
  return (
    <footer className="pf-footer-saspay">
      <div className="pf-container">
        {/* Top Disclaimer Banner from Capture d'écran 2026-10-09 135343.png */}
        

        {/* Main Footer Grid */}
        <div className="pf-footer-main-grid">
          {/* Brand Info */}
          <div className="pf-footer-brand-info">
            <button
              onClick={() => onNavigate('/')}
              className="pf-brand cursor-pointer"
              aria-label="PichFlow Accueil"
              style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left' }}
            >
              <PichFlowLogo size="md" />
            </button>
            <p className="pf-footer-brand-tagline">
              La couche de paiement pour les SaaS : mobile money, cartes et paiements internationaux, en toute simplicité.
            </p>
          </div>

          {/* Links: Produit */}
          <div className="pf-footer-nav-col">
            <h4 className="pf-footer-nav-title">Produit</h4>
            <ul className="pf-footer-nav-list">
              <li><button onClick={() => handleNav('/')}>Solutions</button></li>
              <li><button onClick={() => handleNav('/', 'capacites-section')}>Plateforme</button></li>
              <li><button onClick={() => handleNav('/', 'couverture-section')}>Pays couverts</button></li>
              <li><button onClick={() => handleNav('/pricing')}>Tarifs</button></li>
            </ul>
          </div>

          {/* Links: Ressources */}
          <div className="pf-footer-nav-col">
            <h4 className="pf-footer-nav-title">Ressources</h4>
            <ul className="pf-footer-nav-list">
              <li><button onClick={() => handleNav('/documentation')}>Documentation</button></li>
              <li><button onClick={() => handleNav('/documentation/payments')}>API</button></li>
              <li><button onClick={() => handleNav('/dashboard')}>Statut</button></li>
              <li><button onClick={() => handleNav('/', 'securite-section')}>Sécurité</button></li>
            </ul>
          </div>

          {/* Links: Entreprise */}
          <div className="pf-footer-nav-col">
            <h4 className="pf-footer-nav-title">Entreprise</h4>
            <ul className="pf-footer-nav-list">
              <li><button onClick={() => handleNav('/')}>À propos</button></li>
              <li><a href="mailto:support@pichflow.com">Contact</a></li>
              <li><button onClick={() => handleNav('/pricing')}>Mentions légales</button></li>
              <li><button onClick={() => handleNav('/pricing')}>Conditions d'utilisation</button></li>
              <li><button onClick={() => handleNav('/pricing')}>Confidentialité</button></li>
              <li><button onClick={() => handleNav('/pricing')}>Cookies</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pf-footer-sub-bar">
          <div className="pf-sub-bar-copy">
            © {new Date().getFullYear()} PichFlow. Tous droits réservés.
          </div>
          <div className="pf-sub-bar-socials">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">X</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
