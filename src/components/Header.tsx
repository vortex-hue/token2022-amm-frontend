import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

export const Header: React.FC = () => {
  const { connection } = useConnection();
  const { connected, publicKey } = useWallet();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Token2022 AMM</h1>
              <p className="text-xs text-gray-500">Powered by Solana</p>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center space-x-4">
            {/* Network Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                connected ? 'bg-green-400' : 'bg-yellow-400'
              }`}></div>
              <span className="text-sm text-gray-600">
                {connected ? 'Connected to Devnet' : 'Devnet'}
              </span>
            </div>

            {/* Wallet Connection */}
            <div className="flex items-center space-x-3">
              {connected && publicKey && (
                <div className="text-sm text-gray-600 hidden md:block">
                  {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
                </div>
              )}
              <WalletMultiButton className="btn-primary" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};