import React, { useState } from 'react';
import { WalletContextProvider } from './contexts/WalletProvider';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { TokenCreator } from './components/TokenCreator';
import { PoolCreator } from './components/PoolCreator';
import { TradingInterface } from './components/TradingInterface';
import { Footer } from './components/Footer';
import './App.css';

type ActiveTab = 'create-token' | 'create-pool' | 'trade';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('create-token');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'create-token':
        return <TokenCreator />;
      case 'create-pool':
        return <PoolCreator />;
      case 'trade':
        return <TradingInterface />;
      default:
        return <TokenCreator />;
    }
  };

  return (
    <WalletContextProvider>
      <div className="min-h-screen gradient-bg">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Token-2022 AMM Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Create compliant Token-2022 tokens with transfer hooks, launch liquidity pools on Raydium, 
            and enable secure trading with built-in compliance features.
          </p>
          
          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="card glass-effect">
              <div className="card-body text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Tokens</h3>
                <p className="text-gray-600 text-sm">Deploy Token-2022 with transfer hooks and compliance features</p>
              </div>
            </div>
            
            <div className="card glass-effect">
              <div className="card-body text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Launch Pools</h3>
                <p className="text-gray-600 text-sm">Create SOL-token liquidity pools on major Solana AMMs</p>
              </div>
            </div>
            
            <div className="card glass-effect">
              <div className="card-body text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Enable Trading</h3>
                <p className="text-gray-600 text-sm">Trade tokens with built-in compliance and whitelist verification</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <div className="mt-8">
          {renderActiveComponent()}
        </div>
      </main>

        <Footer />
      </div>
    </WalletContextProvider>
  );
}

export default App;