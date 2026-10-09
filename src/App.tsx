import React, { useState } from 'react';
import { ToastProvider } from './components/ui/ToastContext';
import { RouterProvider, useRouter } from './lib/router';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Landing Page Sections
import { Hero } from './components/landing/Hero';
import { SocialProof } from './components/landing/SocialProof';
import { SelfRecognition } from './components/landing/SelfRecognition';
import { Features } from './components/landing/Features';
import { Developers } from './components/landing/Developers';
import { CheckoutPreview } from './components/landing/CheckoutPreview';
import { PaymentLinksDemo } from './components/landing/PaymentLinksDemo';
import { AfricaCoverage } from './components/landing/AfricaCoverage';
import { HowItWorks, SecuritySection } from './components/landing/HowItWorks';
import { PricingCalculator } from './components/landing/PricingCalculator';
import { FaqAccordion, FinalCta } from './components/landing/FaqAccordion';

// Auth Pages
import { AuthPages } from './components/auth/AuthPages';

// Documentation Page
import { DocumentationView } from './components/docs/DocumentationView';

// Hosted Checkout Page
import { HostedCheckoutPage } from './components/checkout/HostedCheckoutPage';

// Back to Top button
import { BackToTop } from './components/ui/BackToTop';

// Modular Dashboard Layout & Pages
import { DashboardLayout } from './pages/dashboard/DashboardLayout';
import { OverviewPage } from './pages/dashboard/OverviewPage';
import { TransactionsPage } from './pages/dashboard/TransactionsPage';
import { WalletsPage } from './pages/dashboard/WalletsPage';
import { PaymentLinksPage } from './pages/dashboard/PaymentLinksPage';
import { CustomersPage } from './pages/dashboard/CustomersPage';
import { WithdrawalsPage } from './pages/dashboard/WithdrawalsPage';
import { DevelopersPage } from './pages/dashboard/DevelopersPage';
import { SettingsPage } from './pages/dashboard/SettingsPage';

// Mock Data & Types
import {
  MOCK_APPLICATIONS,
  MOCK_TRANSACTIONS,
  MOCK_WALLETS,
  MOCK_PAYMENT_LINKS,
  MOCK_CUSTOMERS,
  MOCK_API_KEYS,
  MOCK_WEBHOOKS,
  MOCK_WITHDRAWALS,
  MOCK_LEDGER_ENTRIES,
} from './lib/mock/data';

import { Application, Transaction, PaymentLink, Withdrawal, ApiKey, WebhookEndpoint, EnvironmentMode } from './types';
import { useScrollAnimation } from './lib/useScrollAnimation';

function AppContent() {
  const { currentRoute, dashboardTab, navigate } = useRouter();
  useScrollAnimation();

  // Application & State Management
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);
  const [activeApp, setActiveApp] = useState<Application>(MOCK_APPLICATIONS[0]);
  const [envMode, setEnvMode] = useState<EnvironmentMode>('test');

  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [wallets, setWallets] = useState(MOCK_WALLETS);
  const [paymentLinks, setPaymentLinks] = useState<PaymentLink[]>(MOCK_PAYMENT_LINKS);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(MOCK_WITHDRAWALS);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(MOCK_API_KEYS);
  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>(MOCK_WEBHOOKS);

  // Modals state
  const [isNewLinkModalOpen, setIsNewLinkModalOpen] = useState(false);
  const [isNewWithdrawalModalOpen, setIsNewWithdrawalModalOpen] = useState(false);

  // Handlers
  const handleCreateApp = (newApp: Application) => {
    setApplications((prev) => [newApp, ...prev]);
    setActiveApp(newApp);
  };

  const handleCreatePaymentLink = (newLink: PaymentLink) => {
    setPaymentLinks((prev) => [newLink, ...prev]);
  };

  const handleCreateWithdrawal = (newWdr: Withdrawal) => {
    setWithdrawals((prev) => [newWdr, ...prev]);
  };

  const handleGenerateApiKey = (name: string, env: 'sandbox' | 'live', scope: 'payin' | 'payout' | 'both') => {
    const randomHex = Math.random().toString(36).substring(2, 6);
    const newKey: ApiKey = {
      id: `key_${Date.now()}`,
      name,
      environment: env,
      prefix: `pk_${env === 'sandbox' ? 'test' : 'live'}_pichflow_${randomHex}`,
      secretMasked: `sk_${env === 'sandbox' ? 'test' : 'live'}_••••••••••••••••••••${randomHex}`,
      scope,
      createdAt: new Date().toISOString(),
      isActive: true,
    };
    setApiKeys((prev) => [newKey, ...prev]);
  };

  const handleRevokeApiKey = (id: string) => {
    setApiKeys((prev) => prev.filter((k) => k.id !== id));
  };

  const handleAddWebhook = (url: string, description: string) => {
    const newWh: WebhookEndpoint = {
      id: `whk_${Date.now()}`,
      url,
      description: description || 'Endpoint webhook événementiel',
      secret: `whsec_pf_${Math.random().toString(36).substring(2, 12)}`,
      events: ['payment.created', 'payment.success', 'payment.failed'],
      isActive: true,
      createdAt: new Date().toISOString(),
      lastDeliveryStatus: 'success',
    };
    setWebhooks((prev) => [newWh, ...prev]);
  };

  return (
    <>
      {/* 1. PUBLIC MARKETING WEBSITE */}
      {(currentRoute === 'landing' || currentRoute === 'pricing' || currentRoute === 'documentation') && (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar onNavigate={navigate} currentRoute={currentRoute} />

          <main style={{ flex: 1 }}>
            {currentRoute === 'landing' && (
              <>
                <Hero onNavigate={navigate} />
                <SocialProof />
                <SelfRecognition onNavigate={navigate} />
                <Features onNavigate={navigate} />
                <AfricaCoverage />
                <HowItWorks onNavigate={navigate} />
                <SecuritySection />
                <PricingCalculator onNavigate={navigate} />
                <Developers onNavigate={navigate} />
                <FinalCta onNavigate={navigate} />
                <FaqAccordion onNavigate={navigate} />
              </>
            )}

            {currentRoute === 'pricing' && (
              <div style={{ paddingTop: '2rem' }}>
                <PricingCalculator onNavigate={navigate} />
                <FaqAccordion onNavigate={navigate} />
                <FinalCta onNavigate={navigate} />
              </div>
            )}

            {currentRoute === 'documentation' && (
              <DocumentationView />
            )}
          </main>

          <Footer onNavigate={navigate} />
        </div>
      )}

      {/* 2. AUTHENTICATION PAGES */}
      {(currentRoute === 'login' || currentRoute === 'register') && (
        <AuthPages
          onNavigate={navigate}
          initialView={currentRoute as 'login' | 'register'}
        />
      )}

      {/* 3. CHECKOUT PREVIEW / PUBLIC PAYMENT LINK DEMO */}
      {currentRoute === 'checkout-demo' && (
        <HostedCheckoutPage onBack={() => navigate('/')} />
      )}

      {/* 4. MODULAR DASHBOARD APPLICATION (with isolated routes) */}
      {currentRoute === 'dashboard' && (
        <DashboardLayout
          activeApp={activeApp}
          applications={applications}
          wallets={wallets}
          onSelectApp={setActiveApp}
          onCreateApp={handleCreateApp}
          envMode={envMode}
          onToggleEnv={setEnvMode}
          onCreatePaymentLink={handleCreatePaymentLink}
          onCreateWithdrawal={handleCreateWithdrawal}
          isNewLinkModalOpen={isNewLinkModalOpen}
          setIsNewLinkModalOpen={setIsNewLinkModalOpen}
          isNewWithdrawalModalOpen={isNewWithdrawalModalOpen}
          setIsNewWithdrawalModalOpen={setIsNewWithdrawalModalOpen}
        >
          {dashboardTab === 'overview' && (
            <OverviewPage
              activeApp={activeApp}
              transactions={transactions}
              wallets={wallets}
              onOpenCreateLinkModal={() => setIsNewLinkModalOpen(true)}
              onOpenWithdrawalModal={() => setIsNewWithdrawalModalOpen(true)}
            />
          )}

          {dashboardTab === 'transactions' && (
            <TransactionsPage transactions={transactions} />
          )}

          {dashboardTab === 'wallets' && (
            <WalletsPage
              wallets={wallets}
              ledgerEntries={MOCK_LEDGER_ENTRIES}
              onOpenWithdrawalModal={() => setIsNewWithdrawalModalOpen(true)}
            />
          )}

          {dashboardTab === 'payment-links' && (
            <PaymentLinksPage
              paymentLinks={paymentLinks}
              onOpenCreateModal={() => setIsNewLinkModalOpen(true)}
            />
          )}

          {dashboardTab === 'customers' && (
            <CustomersPage customers={MOCK_CUSTOMERS} />
          )}

          {dashboardTab === 'withdrawals' && (
            <WithdrawalsPage
              withdrawals={withdrawals}
              onOpenWithdrawalModal={() => setIsNewWithdrawalModalOpen(true)}
            />
          )}

          {dashboardTab === 'developers' && (
            <DevelopersPage
              apiKeys={apiKeys}
              webhooks={webhooks}
              onGenerateKey={handleGenerateApiKey}
              onRevokeKey={handleRevokeApiKey}
              onAddWebhook={handleAddWebhook}
            />
          )}

          {dashboardTab === 'settings' && (
            <SettingsPage
              activeApp={activeApp}
              onUpdateApp={(updated) => setActiveApp(updated)}
            />
          )}
        </DashboardLayout>
      )}

      {/* Floating Back to Top control on public pages */}
      {currentRoute !== 'dashboard' && currentRoute !== 'checkout-demo' && (
        <BackToTop />
      )}
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </ToastProvider>
  );
}
