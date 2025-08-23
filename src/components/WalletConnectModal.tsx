import React, { useState } from 'react';
import { X, Wallet, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => void;
}

const walletOptions = [
  {
    name: 'MetaMask',
    icon: '🦊',
    description: 'Connect using MetaMask wallet',
    popular: true
  },
  {
    name: 'WalletConnect',
    icon: '🔗',
    description: 'Connect with WalletConnect protocol',
    popular: false
  },
  {
    name: 'Coinbase Wallet',
    icon: '🔵',
    description: 'Connect using Coinbase Wallet',
    popular: false
  }
];

export default function WalletConnectModal({ isOpen, onClose, onConnect }: WalletConnectModalProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const handleConnect = async (walletName: string) => {
    setSelectedWallet(walletName);
    setIsConnecting(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false);
      onConnect();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 transform transition-all duration-300 scale-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Connect Your Wallet</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 text-center mb-4">
            Connect your wallet to access your personalized AI Wellness Coach dashboard
          </p>
          
          {/* Benefits */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
              <Shield className="h-5 w-5 text-orange-600" />
              <span className="text-sm text-gray-700">Secure and encrypted connection</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <Zap className="h-5 w-5 text-yellow-600" />
              <span className="text-sm text-gray-700">Instant access to AI coaching</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <Wallet className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-700">Track progress on blockchain</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {walletOptions.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => handleConnect(wallet.name)}
              disabled={isConnecting}
              className={`w-full p-4 border-2 rounded-lg transition-all duration-200 hover:border-orange-300 hover:bg-orange-50 ${
                selectedWallet === wallet.name && isConnecting
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200'
              } ${isConnecting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{wallet.icon}</div>
                <div className="flex-1 text-left">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{wallet.name}</span>
                    {wallet.popular && (
                      <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{wallet.description}</p>
                </div>
                {selectedWallet === wallet.name && isConnecting && (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500"></div>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By connecting your wallet, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}