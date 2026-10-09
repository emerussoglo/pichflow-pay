import React from 'react';
import { DeveloperCenterView } from '../../components/dashboard/DeveloperCenterView';
import { ApiKey, WebhookEndpoint } from '../../types';

interface DevelopersPageProps {
  apiKeys: ApiKey[];
  webhooks: WebhookEndpoint[];
  onGenerateKey: (name: string, env: 'sandbox' | 'live', scope: 'payin' | 'payout' | 'both') => void;
  onRevokeKey: (id: string) => void;
  onAddWebhook: (url: string, description: string) => void;
}

export const DevelopersPage: React.FC<DevelopersPageProps> = ({
  apiKeys,
  webhooks,
  onGenerateKey,
  onRevokeKey,
  onAddWebhook,
}) => {
  return (
    <DeveloperCenterView
      apiKeys={apiKeys}
      webhooks={webhooks}
      onGenerateKey={onGenerateKey}
      onRevokeKey={onRevokeKey}
      onAddWebhook={onAddWebhook}
    />
  );
};
