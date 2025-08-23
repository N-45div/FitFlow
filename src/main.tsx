import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ArweaveWalletKit } from 'arweave-wallet-kit';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ArweaveWalletKit
      config={{
        permissions: ['ACCESS_ADDRESS', 'SIGN_TRANSACTION'],
        ensurePermissions: true,
        gatewayConfig: {
          host: 'arweave.net',
          port: 443,
          protocol: 'https',
        },
        disableAnsLookup: true,
      }}
    >
      <App />
    </ArweaveWalletKit>
  </StrictMode>
);
