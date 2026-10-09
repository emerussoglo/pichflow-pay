import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faUser,
  faGlobe,
  faArrowRight,
  faCheck,
  faCircleCheck,
  faKey,
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
    <div className="pf-auth-wrapper pf-grid-bg">
      {/* Background glow */}
      <div
        className="pf-radial-glow pf-radial-glow-primary"
        style={{ top: '20%', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '500px' }}
      />

      <div className="pf-auth-card">
        {/* Logo and Header */}
        <div className="pf-auth-header">
          <button
            onClick={() => onNavigate('/')}
            className="pf-brand pf-auth-logo"
            style={{ cursor: 'pointer', margin: '0 auto 1.25rem auto', background: 'none', border: 'none', padding: 0 }}
          >
            <PichFlowLogo size="lg" />
          </button>

          {view === 'login' && (
            <>
              <h2 className="pf-auth-title">Connexion à PichFlow</h2>
              <p className="pf-auth-subtitle">Accédez à vos flux de paiement et applications</p>
            </>
          )}

          {view === 'register' && (
            <>
              <h2 className="pf-auth-title">Créer votre compte</h2>
              <p className="pf-auth-subtitle">Démarrez gratuitement en environnement Sandbox</p>
            </>
          )}

          {view === 'verify-email' && (
            <>
              <h2 className="pf-auth-title">Vérification de l’email</h2>
              <p className="pf-auth-subtitle">Nous avons envoyé un code de confirmation</p>
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
          <form onSubmit={handleLoginSubmit}>
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
              <div className="pf-label">
                <span>Mot de passe</span>
                <button
                  type="button"
                  onClick={() => setView('forgot-password')}
                  className="pf-label-sub"
                  style={{ color: 'var(--pf-primary)', cursor: 'pointer' }}
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
              className="pf-btn pf-btn-primary pf-btn-lg pf-btn-shine"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              {isLoading ? 'Connexion en cours...' : 'Se connecter au Dashboard'}
              <FontAwesomeIcon icon={faArrowRight} />
            </button>

            <div className="pf-auth-footer">
              Vous n'avez pas encore de compte ?{' '}
              <button
                type="button"
                onClick={() => setView('register')}
                style={{ color: 'var(--pf-primary)', fontWeight: 700 }}
              >
                Créer un compte gratuitement
              </button>
            </div>
          </form>
        )}

        {/* 2. REGISTER FORM */}
        {view === 'register' && (
          <form onSubmit={handleRegisterSubmit}>
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
                  placeholder="contact@cardix.africa"
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

            <div className="pf-form-group">
              <label className="pf-label">Mot de passe</label>
              <div className="pf-input-wrapper">
                <span className="pf-input-icon">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type="password"
                  className="pf-input pf-input-with-icon"
                  placeholder="Minimum 8 caractères"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="pf-form-group">
              <label className="pf-label">Confirmation du mot de passe</label>
              <div className="pf-input-wrapper">
                <span className="pf-input-icon">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type="password"
                  className="pf-input pf-input-with-icon"
                  placeholder="Répétez votre mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
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
                  J'accepte les conditions générales d'utilisation et la politique de protection des données de PichFlow.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="pf-btn pf-btn-primary pf-btn-lg pf-btn-shine"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              {isLoading ? 'Création du compte...' : 'Créer mon compte PichFlow'}
              <FontAwesomeIcon icon={faArrowRight} />
            </button>

            <div className="pf-auth-footer">
              Vous avez déjà un compte ?{' '}
              <button
                type="button"
                onClick={() => setView('login')}
                style={{ color: 'var(--pf-primary)', fontWeight: 700 }}
              >
                Se connecter
              </button>
            </div>
          </form>
        )}

        {/* 3. VERIFY EMAIL SCREEN */}
        {view === 'verify-email' && (
          <div>
            <div className="pf-auth-alert pf-auth-alert-success">
              <FontAwesomeIcon icon={faCircleCheck} />
              <span>Un email contenant votre lien de confirmation a été envoyé à <strong>{email || 'votre adresse'}</strong>.</span>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--pf-muted)', textAlign: 'center', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Veuillez cliquer sur le lien reçu pour activer votre accès aux clés API. Pensez à vérifier votre dossier spams si besoin.
            </p>

            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="pf-btn pf-btn-primary pf-btn-lg"
              style={{ width: '100%', marginBottom: '1rem' }}
            >
              Accéder au Dashboard (Simuler confirmation)
            </button>

            <div className="pf-auth-footer">
              <button
                type="button"
                onClick={() => setView('login')}
                style={{ color: 'var(--pf-muted)' }}
              >
                Retour à la page de connexion
              </button>
            </div>
          </div>
        )}

        {/* 4. FORGOT PASSWORD SCREEN */}
        {view === 'forgot-password' && (
          <form onSubmit={handleForgotSubmit}>
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
              className="pf-btn pf-btn-primary pf-btn-lg"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              {isLoading ? 'Envoi...' : 'Envoyer les instructions'}
            </button>

            <div className="pf-auth-footer">
              <button
                type="button"
                onClick={() => setView('login')}
                style={{ color: 'var(--pf-muted)' }}
              >
                Annuler et revenir à la connexion
              </button>
            </div>
          </form>
        )}

        {/* 5. RESET PASSWORD SCREEN */}
        {view === 'reset-password' && (
          <form onSubmit={handleResetSubmit}>
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
              <label className="pf-label">Confirmer le nouveau mot de passe</label>
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
              className="pf-btn pf-btn-primary pf-btn-lg"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              {isLoading ? 'Mise à jour...' : 'Enregistrer le mot de passe'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
