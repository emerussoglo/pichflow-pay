import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldHalved,
  faLock,
  faEye,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { useToast } from '../ui/ToastContext';

interface HowItWorksProps {
  onNavigate?: (route: string) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [companyName, setCompanyName] = useState('Mon SaaS');
  const [email, setEmail] = useState('votremail@gmail.com');
  const [password, setPassword] = useState('••••••••');

  const handleSimulateSignup = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Compte Sandbox créé avec succès !', 'success');
    if (onNavigate) onNavigate('/dashboard');
  };

  return (
    <section id="demarrage-rapide" className="pf-how-it-works-section">
      <div className="pf-container">
        {/* Header */}
        <div className="pf-section-center-head">
          <div className="pf-badge-pill-purple">
            <span>Comment ça marche</span>
          </div>
          <h2 className="pf-heading-purple-accent">
            Commence à encaisser en quelques <span className="pf-italic-accent">minutes</span>
          </h2>
        </div>

        {/* 2-Columns Grid from Capture d'écran 2026-10-09 134536.png */}
        <div className="pf-how-it-works-grid">
          {/* Left Column: 3 Numbered Steps */}
          <div className="pf-steps-list-col">
            {/* Step 1 */}
            <div className="pf-step-row-item">
              <div className="pf-step-number-circle">1</div>
              <div className="pf-step-row-content">
                <h3 className="pf-step-row-title">Crée ton compte</h3>
                <p className="pf-step-row-desc">
                  Inscris-toi en quelques minutes. Renseigne les infos de ton entreprise, vérifie ton compte et accède à ton tableau de bord. Sans paperasse.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="pf-step-row-item">
              <div className="pf-step-number-circle">2</div>
              <div className="pf-step-row-content">
                <h3 className="pf-step-row-title">Connecte et configure</h3>
                <p className="pf-step-row-desc">
                  Branche PichFlow à ton SaaS via notre API ou nos intégrations prêtes à l'emploi, et active les moyens de paiement de ton choix.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="pf-step-row-item">
              <div className="pf-step-number-circle">3</div>
              <div className="pf-step-row-content">
                <h3 className="pf-step-row-title">Encaisse et développe–toi</h3>
                <p className="pf-step-row-desc">
                  Accepte les paiements de tes utilisateurs, gère tes abonnements et suis tes revenus en temps réel.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Mockup Sign Up Card */}
          <div className="pf-signup-card-col">
            <div className="pf-signup-mock-card">
              <div className="pf-mock-header">
                <div className="pf-mock-avatar-p">P</div>
                <div className="pf-mock-title">Créer ton compte</div>
              </div>

              <form onSubmit={handleSimulateSignup} className="pf-mock-form">
                <div className="pf-mock-field">
                  <label>Nom de l'entreprise</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="pf-mock-input"
                  />
                </div>

                <div className="pf-mock-field">
                  <label>Adresse e-mail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pf-mock-input"
                  />
                </div>

                <div className="pf-mock-field">
                  <label>Mot de passe</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pf-mock-input"
                  />
                </div>

                <button type="submit" className="pf-mock-submit-btn">
                  Créer mon compte
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SecuritySection: React.FC = () => {
  return (
    <section id="securite-section" className="pf-security-dark-section">
      <div className="pf-container">
        {/* Header */}
        <div className="pf-section-center-head">
          <div className="pf-badge-pill-security">
            <span>Sécurité</span>
          </div>
          <h2 className="pf-heading-security-white">
            La sécurité au cœur de <span className="pf-italic-security-accent">chaque paiement.</span>
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="pf-security-cards-grid">
          {/* Card 1 */}
          <div className="pf-security-card">
            <div className="pf-security-icon-circle">
              <FontAwesomeIcon icon={faShieldHalved} />
            </div>
            <h3 className="pf-security-card-title">Des paiements protégés</h3>
            <p className="pf-security-card-desc">
              Protège les échanges liés à tes transactions grâce à des mécanismes de sécurité conçus pour préserver l'intégrité des opérations.
            </p>
          </div>

          {/* Card 2 */}
          <div className="pf-security-card">
            <div className="pf-security-icon-circle">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <h3 className="pf-security-card-title">Des données confidentielles</h3>
            <p className="pf-security-card-desc">
              Les données sensibles doivent rester protégées à chaque étape, grâce à des pratiques de sécurité adaptées aux échanges numériques.
            </p>
          </div>

          {/* Card 3 */}
          <div className="pf-security-card">
            <div className="pf-security-icon-circle">
              <FontAwesomeIcon icon={faEye} />
            </div>
            <h3 className="pf-security-card-title">Une vigilance continue</h3>
            <p className="pf-security-card-desc">
              Identifie les comportements inhabituels et renforce la surveillance des transactions pour mieux prévenir les activités suspectes.
            </p>
          </div>

          {/* Card 4 */}
          <div className="pf-security-card">
            <div className="pf-security-icon-circle">
              <FontAwesomeIcon icon={faCheck} />
            </div>
            <h3 className="pf-security-card-title">Conformité</h3>
            <p className="pf-security-card-desc">
              Construis ton activité sur une base fiable, avec des pratiques de sécurité adaptées aux exigences des paiements en ligne.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
