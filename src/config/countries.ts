export interface CountryCoverage {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  status: 'available_sandbox' | 'live_ready' | 'planned';
  statusLabel: string;
  operators: string[];
  note: string;
}

export const SUPPORTED_COUNTRIES: CountryCoverage[] = [
  {
    code: 'BJ',
    name: 'Bénin',
    flag: '🇧🇯',
    currency: 'XOF',
    currencySymbol: 'FCFA',
    status: 'available_sandbox',
    statusLabel: 'Sandbox & Pilote',
    operators: ['MTN MoMo', 'Moov Money', 'Celtiis Cash', 'Cartes Visa/Mastercard'],
    note: 'Intégration sandbox disponible et testée sur agrégateurs partenaires.',
  },
  {
    code: 'CI',
    name: "Côte d'Ivoire",
    flag: '🇨🇮',
    currency: 'XOF',
    currencySymbol: 'FCFA',
    status: 'available_sandbox',
    statusLabel: 'Sandbox & Pilote',
    operators: ['Orange Money', 'MTN MoMo', 'Moov Money', 'Wave', 'Cartes'],
    note: 'Flux test opérationnels en mode simulateur & sandbox.',
  },
  {
    code: 'SN',
    name: 'Sénégal',
    flag: '🇸🇳',
    currency: 'XOF',
    currencySymbol: 'FCFA',
    status: 'available_sandbox',
    statusLabel: 'Sandbox & Pilote',
    operators: ['Wave', 'Orange Money', 'Free Money', 'Cartes'],
    note: 'Validation sandbox en cours avec les passerelles partenaires.',
  },
  {
    code: 'TG',
    name: 'Togo',
    flag: '🇹🇬',
    currency: 'XOF',
    currencySymbol: 'FCFA',
    status: 'planned',
    statusLabel: 'Cible d’expansion',
    operators: ['T-Money', 'Moov Togo', 'Cartes'],
    note: 'Prévu dans le cadre du déploiement UEMOA.',
  },
  {
    code: 'BF',
    name: 'Burkina Faso',
    flag: '🇧🇫',
    currency: 'XOF',
    currencySymbol: 'FCFA',
    status: 'planned',
    statusLabel: 'Cible d’expansion',
    operators: ['Orange Money', 'Moov Money'],
    note: 'Phase d’analyse technique et réglementaire.',
  },
  {
    code: 'CM',
    name: 'Cameroun',
    flag: '🇨🇲',
    currency: 'XAF',
    currencySymbol: 'FCFA',
    status: 'planned',
    statusLabel: 'Cible d’expansion CEMAC',
    operators: ['MTN Mobile Money', 'Orange Money'],
    note: 'Extension zone CEMAC prévue ultérieurement.',
  },
];
