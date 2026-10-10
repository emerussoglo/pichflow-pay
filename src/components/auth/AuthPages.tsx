import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faUser,
  faGlobe,
  faArrowRight,
  faCircleCheck,
  faKey,
  faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';
import { useToast } from '../ui/ToastContext';
import { PichFlowLogo } from '../ui/PichFlowLogo';

interface AuthPageProps {
  onNavigate: (route: string) => void;
  initialView?: 'login' | 'register' | 'verify-email' | 'forgot-password' | 'reset-password';
}

export const AuthPages: React.FC<AuthPageProps> = ({ onNavigate, initialView = 'login' }) => {
  const [view, setView] = useState<'login' | 'register' | 'verify-email' | 'forgot-password' | 'reset-password'>(initialView);
  const { showToast } = useToast();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('BJ');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast('Connexion réussie ! Bienvenue sur PichFlow.', 'success');
      onNavigate('dashboard');
    }, 800);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast('Les mots de passe ne correspondent pas.', 'error');
      return;
    }
    if (!termsAccepted) {
      showToast('Veuillez accepter les conditions d’utilisation.', 'error');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast('Compte créé avec succès ! Veuillez vérifier votre email.', 'success');
      setView('verify-email');
    }, 900);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast('Un lien de réinitialisation a été envoyé à votre adresse email.', 'info');
      setView('reset-password');
    }, 800);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast('Votre mot de passe a été réinitialisé ! Vous pouvez vous connecter.', 'success');
      setView('login');
    }, 800);
  };

  return (
    <div className="pf-auth-page-wrapper">
      <div className="pf-auth-split-card">
        
        {/* Côté Gauche: Visuel Multicolore & Message de Salutation */}
        <div className="pf-auth-visual-side">
          <div className="pf-auth-visual-overlay" />
          <div className="pf-auth-visual-content">
            <div className="pf-auth-badge">
              <FontAwesomeIcon icon={faShieldHalved} />
              <span>Infrastructure SaaS Sécurisée</span>
            </div>

            {view === 'login' && (
              <>
                <h1 className="pf-visual-title">Ravi de vous revoir !</h1>
                <p className="pf-visual-desc">
                  Connectez-vous pour piloter vos flux de paiement, gérer vos abonnements et suivre vos revenus en toute sérénité.
                </p>
              </>
            )}

            {view === 'register' && (
              <>
                <h1 className="pf-visual-title">Propulsez vos paiements en Afrique</h1>
                <p className="pf-visual-desc">
                  Créez votre compte en moins de 2 minutes et commencez à encaisser par Mobile Money et carte bancaire.
                </p>
              </>
            )}

            {(view === 'verify-email' || view === 'forgot-password' || view === 'reset-password') && (
              <>
                <h1 className="pf-visual-title">Sécurité & Confidentialité</h1>
                <p className="pf-visual-desc">
                  Vos données et vos clés de paiement sont protégées par les standards de sécurité les plus stricts du secteur.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Côté Droit: Formulaire */}
        <div className="pf-auth-form-side">
          {/* Logo & Header */}
          <div className="pf-auth-header">
            <button
              onClick={() => onNavigate('/')}
              className="pf-brand pf-auth-logo"
              style={{ cursor: 'pointer', margin: '0 auto 1rem auto', background: 'none', border: 'none', padding: 0 }}
            >
              <PichFlowLogo size="lg" />
            </button>

            {view === 'login' && (
              <>
                <h2 className="pf-auth-title">Se connecter</h2>
                <p className="pf-auth-subtitle">Accédez à votre espace marchand PichFlow</p>
              </>
            )}

            {view === 'register' && (
              <>
                <h2 className="pf-auth-title">Créer un compte</h2>
                <p className="pf-auth-subtitle">Commencez gratuitement, sans engagement</p>
              </>
            )}

            {view === 'verify-email' && (
              <>
                <h2 className="pf-auth-title">Vérification de l’email</h2>
                <p className="pf-auth-subtitle">Un code de confirmation vous a été envoyé</p>
              </>
            )}

            {view === 'forgot-password' && (
              <>
                <h2 className="pf-auth-title">Mot de passe oublié</h2>
                <p className="pf-auth-subtitle">Saisissez votre adresse email pour réinitialiser</p>
              </>
            )}

            {view === 'reset-password' && (
              <>
                <h2 className="pf-auth-title">Nouveau mot de passe</h2>
                <p className="pf-auth-subtitle">Choisissez un mot de passe robuste et sécurisé</p>
              </>
            )}
          </div>

          {/* 1. LOGIN FORM */}
          {view === 'login' && (
            <form onSubmit={handleLoginSubmit} className="pf-auth-form">
              <div className="pf-form-group">
                <label className="pf-label">Email professionnel</label>
                <div className="pf-input-wrapper">
                  <span className="pf-input-icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <input
                    type="email"
                    className="pf-input pf-input-with-icon"
                    placeholder="alexandre@entreprise.bj"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="pf-form-group">
                <div className="pf-label-row">
                  <label className="pf-label">Mot de passe</label>
                  <button
                    type="button"
                    onClick={() => setView('forgot-password')}
                    className="pf-label-sub-link"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>
                <div className="pf-input-wrapper">
                  <span className="pf-input-icon">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    type="password"
                    className="pf-input pf-input-with-icon"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="pf-auth-submit-btn"
              >
                <span>{isLoading ? 'Connexion en cours...' : 'Se connecter'}</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>

              <div className="pf-auth-footer">
                Pas encore inscrit ?{' '}
                <button
                  type="button"
                  onClick={() => setView('register')}
                  className="pf-auth-switch-btn"
                >
                  Créer un compte
                </button>
              </div>
            </form>
          )}

          {/* 2. REGISTER FORM */}
          {view === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="pf-auth-form">
              <div className="pf-form-group">
                <label className="pf-label">Nom complet ou Entreprise</label>
                <div className="pf-input-wrapper">
                  <span className="pf-input-icon">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  <input
                    type="text"
                    className="pf-input pf-input-with-icon"
                    placeholder="Alexandre Dossou"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="pf-form-group">
                <label className="pf-label">Email professionnel</label>
                <div className="pf-input-wrapper">
                  <span className="pf-input-icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <input
                    type="email"
                    className="pf-input pf-input-with-icon"
                    placeholder="contact@entreprise.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="pf-form-group">
                <label className="pf-label">Pays principal</label>
                <div className="pf-input-wrapper">
                  <span className="pf-input-icon">
                    <FontAwesomeIcon icon={faGlobe} />
                  </span>
                  <select
                    className="pf-select pf-input-with-icon"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="BJ">Bénin (+229) · XOF</option>
                    <option value="CI">Côte d'Ivoire (+225) · XOF</option>
                    <option value="SN">Sénégal (+221) · XOF</option>
                    <option value="TG">Togo (+228) · XOF</option>
                    <option value="BF">Burkina Faso (+226) · XOF</option>
                    <option value="CM">Cameroun (+237) · XAF</option>
                  </select>
                </div>
              </div>

              <div className="pf-form-row-2col">
                <div className="pf-form-group">
                  <label className="pf-label">Mot de passe</label>
                  <div className="pf-input-wrapper">
                    <span className="pf-input-icon">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input
                      type="password"
                      className="pf-input pf-input-with-icon"
                      placeholder="Min. 8 caractères"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="pf-form-group">
                  <label className="pf-label">Confirmation</label>
                  <div className="pf-input-wrapper">
                    <span className="pf-input-icon">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input
                      type="password"
                      className="pf-input pf-input-with-icon"
                      placeholder="Confirmer"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pf-form-group">
                <label className="pf-checkbox-label">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  <span>
                    J'accepte les conditions d'utilisation et la politique de confidentialité de PichFlow.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="pf-auth-submit-btn"
              >
                <span>{isLoading ? 'Création en cours...' : 'Créer mon compte'}</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>

              <div className="pf-auth-footer">
                Vous avez déjà un compte ?{' '}
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="pf-auth-switch-btn"
                >
                  Se connecter
                </button>
              </div>
            </form>
          )}

          {/* 3. VERIFY EMAIL SCREEN */}
          {view === 'verify-email' && (
            <div className="pf-auth-form">
              <div className="pf-auth-alert pf-auth-alert-success">
                <FontAwesomeIcon icon={faCircleCheck} />
                <span>Un email contenant votre lien a été envoyé à <strong>{email || 'votre adresse'}</strong>.</span>
              </div>

              <p className="pf-verify-text">
                Veuillez cliquer sur le lien reçu pour activer votre accès aux clés API. Pensez à vérifier votre dossier spams.
              </p>

              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className="pf-auth-submit-btn"
              >
                <span>Accéder au Dashboard</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>

              <div className="pf-auth-footer">
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="pf-auth-back-btn"
                >
                  Retour à la page de connexion
                </button>
              </div>
            </div>
          )}

          {/* 4. FORGOT PASSWORD SCREEN */}
          {view === 'forgot-password' && (
            <form onSubmit={handleForgotSubmit} className="pf-auth-form">
              <div className="pf-form-group">
                <label className="pf-label">Email de votre compte</label>
                <div className="pf-input-wrapper">
                  <span className="pf-input-icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <input
                    type="email"
                    className="pf-input pf-input-with-icon"
                    placeholder="votre-email@domaine.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="pf-auth-submit-btn"
              >
                <span>{isLoading ? 'Envoi...' : 'Envoyer les instructions'}</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>

              <div className="pf-auth-footer">
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="pf-auth-back-btn"
                >
                  Annuler et revenir à la connexion
                </button>
              </div>
            </form>
          )}

          {/* 5. RESET PASSWORD SCREEN */}
          {view === 'reset-password' && (
            <form onSubmit={handleResetSubmit} className="pf-auth-form">
              <div className="pf-form-group">
                <label className="pf-label">Nouveau mot de passe</label>
                <div className="pf-input-wrapper">
                  <span className="pf-input-icon">
                    <FontAwesomeIcon icon={faKey} />
                  </span>
                  <input
                    type="password"
                    className="pf-input pf-input-with-icon"
                    placeholder="Nouveau mot de passe"
                    required
                  />
                </div>
              </div>

              <div className="pf-form-group">
                <label className="pf-label">Confirmer le mot de passe</label>
                <div className="pf-input-wrapper">
                  <span className="pf-input-icon">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    type="password"
                    className="pf-input pf-input-with-icon"
                    placeholder="Répétez le mot de passe"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="pf-auth-submit-btn"
              >
                <span>{isLoading ? 'Mise à jour...' : 'Enregistrer le mot de passe'}</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};