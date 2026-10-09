import React, { useState } from 'react';
import { Application, PaymentLink, Withdrawal, Wallet } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus, faBuildingColumns, faMobileScreen } from '@fortawesome/free-solid-svg-icons';
import { useToast } from '../ui/ToastContext';

// 1. MODAL: NOUVELLE APPLICATION
interface NewAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (app: Application) => void;
}

export const NewAppModal: React.FC<NewAppModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('E-commerce');
  const [website, setWebsite] = useState('');
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newApp: Application = {
      id: `app_${name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${Date.now().toString().slice(-4)}`,
      name: name.trim(),
      slug: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      category,
      website: website || 'https://pichflow.com',
      environment: 'test',
      createdAt: new Date().toISOString(),
      currency: 'XOF',
    };

    onCreate(newApp);
    onClose();
    setName('');
    setWebsite('');
    showToast(`Application "${newApp.name}" créée avec succès !`, 'success');
  };

  return (
    <div className="pf-modal-overlay" onClick={onClose}>
      <div className="pf-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="pf-modal-header">
          <h3 className="pf-card-title">Créer une nouvelle application</h3>
          <button onClick={onClose} className="pf-modal-close" aria-label="Fermer">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="pf-form-group">
            <label className="pf-label">Nom de l'application</label>
            <input
              type="text"
              className="pf-input"
              placeholder="Ex: KalyPay, Mon SaaS, Boutique Cotonou"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="pf-form-group">
            <label className="pf-label">Catégorie d'activité</label>
            <select className="pf-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="E-commerce & Retail">E-commerce & Retail</option>
              <option value="SaaS & Digital Subscriptions">SaaS & Abonnements numériques</option>
              <option value="Services & Freelance">Services & Freelance</option>
              <option value="Logistique & Livraison">Logistique & Livraison</option>
              <option value="Éducation & Formations">Éducation & Formations</option>
            </select>
          </div>

          <div className="pf-form-group">
            <label className="pf-label">Site internet ou application</label>
            <input
              type="url"
              className="pf-input"
              placeholder="https://votre-site.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={onClose} className="pf-btn pf-btn-secondary pf-btn-md" style={{ flex: 1 }}>
              Annuler
            </button>
            <button type="submit" className="pf-btn pf-btn-primary pf-btn-md pf-btn-shine" style={{ flex: 1 }}>
              Créer l'application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 2. MODAL: NOUVEAU LIEN DE PAIEMENT
interface NewPaymentLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (link: PaymentLink) => void;
}

export const NewPaymentLinkModal: React.FC<NewPaymentLinkModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isFixed, setIsFixed] = useState(true);
  const [amount, setAmount] = useState('15000');
  const [country, setCountry] = useState('Bénin');
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-') + '-' + Math.random().toString(36).substring(2, 6);

    const newLink: PaymentLink = {
      id: `pl_${Date.now()}`,
      slug,
      title: title.trim(),
      description: description.trim(),
      amount: isFixed ? Number(amount) : null,
      isFixedAmount: isFixed,
      currency: 'XOF',
      country,
      status: 'active',
      usageCount: 0,
      usageLimit: null,
      requirePhone: true,
      createdAt: new Date().toISOString(),
    };

    onCreate(newLink);
    onClose();
    setTitle('');
    setDescription('');
    showToast(`Lien de paiement créé ! URL : /l/${newLink.slug}`, 'success');
  };

  return (
    <div className="pf-modal-overlay" onClick={onClose}>
      <div className="pf-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="pf-modal-header">
          <h3 className="pf-card-title">Créer un lien de paiement</h3>
          <button onClick={onClose} className="pf-modal-close" aria-label="Fermer">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="pf-form-group">
            <label className="pf-label">Titre du paiement ou produit</label>
            <input
              type="text"
              className="pf-input"
              placeholder="Ex: Formation Cloud, Commande #1024, Don"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="pf-form-group">
            <label className="pf-label">Description pour vos clients</label>
            <textarea
              className="pf-textarea"
              rows={2}
              placeholder="Ex: Accès immédiat après confirmation du paiement"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="pf-form-group">
            <label className="pf-label">Type de montant</label>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
              <label className="pf-checkbox-label">
                <input
                  type="radio"
                  name="amountType"
                  checked={isFixed}
                  onChange={() => setIsFixed(true)}
                />
                <span>Montant fixe</span>
              </label>
              <label className="pf-checkbox-label">
                <input
                  type="radio"
                  name="amountType"
                  checked={!isFixed}
                  onChange={() => setIsFixed(false)}
                />
                <span>Montant libre (le client choisit)</span>
              </label>
            </div>
          </div>

          {isFixed && (
            <div className="pf-form-group">
              <label className="pf-label">Montant (XOF / FCFA)</label>
              <input
                type="number"
                className="pf-input"
                min="100"
                step="500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={onClose} className="pf-btn pf-btn-secondary pf-btn-md" style={{ flex: 1 }}>
              Annuler
            </button>
            <button type="submit" className="pf-btn pf-btn-primary pf-btn-md pf-btn-shine" style={{ flex: 1 }}>
              Générer le lien
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 3. MODAL: DEMANDE DE RETRAIT (PAYOUT)
interface NewWithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallets: Wallet[];
  onCreate: (wdr: Withdrawal) => void;
}

export const NewWithdrawalModal: React.FC<NewWithdrawalModalProps> = ({
  isOpen,
  onClose,
  wallets,
  onCreate,
}) => {
  const [methodType, setMethodType] = useState<'mobile_money' | 'bank_transfer'>('mobile_money');
  const [amount, setAmount] = useState('500000');
  const [recipientName, setRecipientName] = useState('Alexandre Dossou (Cardix SARL)');
  const [phoneOrIban, setPhoneOrIban] = useState('+229 97 00 22 11');
  const [operatorOrBank, setOperatorOrBank] = useState('MTN MoMo Bénin');
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = Number(amount);
    const fee = Math.round(numAmount * 0.01) + 150; // 1% + 150 XOF
    const netAmount = numAmount - fee;

    const newWithdrawal: Withdrawal = {
      id: `wdr_${Date.now()}`,
      reference: `PF-WDR-2026-00${Math.floor(Math.random() * 90 + 10)}`,
      amount: numAmount,
      currency: 'XOF',
      fee,
      netAmount,
      methodType,
      recipientName,
      recipientPhoneOrIban: phoneOrIban,
      operatorOrBank,
      country: 'Bénin',
      status: 'processing',
      createdAt: new Date().toISOString(),
    };

    onCreate(newWithdrawal);
    onClose();
    showToast(`Demande de retrait de ${new Intl.NumberFormat('fr-FR').format(numAmount)} XOF enregistrée !`, 'success');
  };

  return (
    <div className="pf-modal-overlay" onClick={onClose}>
      <div className="pf-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="pf-modal-header">
          <h3 className="pf-card-title">Demander un retrait de fonds</h3>
          <button onClick={onClose} className="pf-modal-close" aria-label="Fermer">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="pf-form-group">
            <label className="pf-label">Type de virement</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.25rem' }}>
              <div
                onClick={() => {
                  setMethodType('mobile_money');
                  setOperatorOrBank('MTN MoMo Bénin');
                  setPhoneOrIban('+229 97 00 22 11');
                }}
                className={`pf-method-option ${methodType === 'mobile_money' ? 'selected' : ''}`}
              >
                <FontAwesomeIcon icon={faMobileScreen} style={{ color: 'var(--pf-primary)' }} />
                <span style={{ fontSize: '0.8125rem', fontWeight: 700 }}>Mobile Money</span>
              </div>

              <div
                onClick={() => {
                  setMethodType('bank_transfer');
                  setOperatorOrBank('Bank of Africa (BOA Bénin)');
                  setPhoneOrIban('BJ061 01001 001234567890 12');
                }}
                className={`pf-method-option ${methodType === 'bank_transfer' ? 'selected' : ''}`}
              >
                <FontAwesomeIcon icon={faBuildingColumns} style={{ color: 'var(--pf-primary)' }} />
                <span style={{ fontSize: '0.8125rem', fontWeight: 700 }}>Compte Bancaire</span>
              </div>
            </div>
          </div>

          <div className="pf-form-group">
            <label className="pf-label">Montant à retirer (XOF)</label>
            <input
              type="number"
              className="pf-input"
              min="5000"
              max="4850000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <span className="pf-helper-text">Solde disponible : 4 850 000 XOF</span>
          </div>

          <div className="pf-form-group">
            <label className="pf-label">Nom du titulaire ou raison sociale</label>
            <input
              type="text"
              className="pf-input"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              required
            />
          </div>

          <div className="pf-form-group">
            <label className="pf-label">
              {methodType === 'mobile_money' ? 'Numéro de téléphone marchand' : 'RIB / Numéro de compte IBAN'}
            </label>
            <input
              type="text"
              className="pf-input"
              value={phoneOrIban}
              onChange={(e) => setPhoneOrIban(e.target.value)}
              required
            />
          </div>

          <div className="pf-form-group">
            <label className="pf-label">Opérateur ou Banque</label>
            <input
              type="text"
              className="pf-input"
              value={operatorOrBank}
              onChange={(e) => setOperatorOrBank(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={onClose} className="pf-btn pf-btn-secondary pf-btn-md" style={{ flex: 1 }}>
              Annuler
            </button>
            <button type="submit" className="pf-btn pf-btn-primary pf-btn-md pf-btn-shine" style={{ flex: 1 }}>
              Confirmer le retrait
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
