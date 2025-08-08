import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useContract } from '../hooks/useContract';
import { openTokenInExplorer } from '../utils/explorer';

interface TokenFormData {
  name: string;
  symbol: string;
  decimals: number;
  supply: number;
  description: string;
  enableTransferHook: boolean;
  enableWhitelist: boolean;
  logoUrl: string;
}

export const TokenCreator: React.FC = () => {
  const { connected } = useWallet();
  const contractService = useContract();
  
  const [formData, setFormData] = useState<TokenFormData>({
    name: '',
    symbol: '',
    decimals: 6,
    supply: 1000000,
    description: '',
    enableTransferHook: true,
    enableWhitelist: true,
    logoUrl: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [deployedToken, setDeployedToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleCreateToken = async () => {
    if (!connected) {
      setError('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await contractService.createToken({
        name: formData.name,
        symbol: formData.symbol,
        decimals: formData.decimals,
        supply: formData.supply,
        enableTransferHook: formData.enableTransferHook,
        enableWhitelist: formData.enableWhitelist
      });
      
      setDeployedToken(result.mintAddress);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setDeployedToken(null);
    setError(null);
    setFormData({
      name: '',
      symbol: '',
      decimals: 6,
      supply: 1000000,
      description: '',
      enableTransferHook: true,
      enableWhitelist: true,
      logoUrl: ''
    });
  };

  if (deployedToken) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card status-success">
          <div className="card-header">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-green-800">Token Created Successfully!</h2>
            </div>
          </div>
          
          <div className="card-body">
            <div className="space-y-4">
              <div>
                <label className="form-label text-green-700">Token Address</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={deployedToken}
                    readOnly
                    className="form-input bg-green-50 border-green-200 text-green-800 font-mono"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(deployedToken)}
                    className="btn-outline text-green-600 border-green-300 hover:bg-green-50"
                  >
                    Copy
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="form-label text-green-700">Name</span>
                  <p className="text-green-800 font-medium">{formData.name}</p>
                </div>
                <div>
                  <span className="form-label text-green-700">Symbol</span>
                  <p className="text-green-800 font-medium">{formData.symbol}</p>
                </div>
                <div>
                  <span className="form-label text-green-700">Decimals</span>
                  <p className="text-green-800 font-medium">{formData.decimals}</p>
                </div>
                <div>
                  <span className="form-label text-green-700">Supply</span>
                  <p className="text-green-800 font-medium">{formData.supply.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Features Enabled:</h3>
                <ul className="space-y-1 text-green-700">
                  {formData.enableTransferHook && (
                    <li className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Transfer Hook Extension</span>
                    </li>
                  )}
                  {formData.enableWhitelist && (
                    <li className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Whitelist Compliance</span>
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={resetForm}
                  className="btn-primary flex-1"
                >
                  Create Another Token
                </button>
                <button 
                  onClick={() => openTokenInExplorer(deployedToken)}
                  className="btn-secondary flex-1"
                >
                  View on Explorer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <div className="card-header">
          <h2 className="text-2xl font-bold text-gray-900">Create Token-2022</h2>
          <p className="text-gray-600 mt-1">Deploy a new Token-2022 with transfer hooks and compliance features</p>
        </div>
        
        <div className="card-body space-y-6">
          {/* Basic Token Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Token Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Compliant Token"
                className="form-input"
                required
              />
            </div>
            
            <div>
              <label className="form-label">Symbol</label>
              <input
                type="text"
                name="symbol"
                value={formData.symbol}
                onChange={handleInputChange}
                placeholder="e.g., COMP"
                className="form-input"
                maxLength={10}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Decimals</label>
              <input
                type="number"
                name="decimals"
                value={formData.decimals}
                onChange={handleInputChange}
                min="0"
                max="18"
                className="form-input"
              />
            </div>
            
            <div>
              <label className="form-label">Initial Supply</label>
              <input
                type="number"
                name="supply"
                value={formData.supply}
                onChange={handleInputChange}
                min="1"
                className="form-input"
              />
            </div>
          </div>
          
          <div>
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your token's purpose and utility..."
              rows={3}
              className="form-input"
            />
          </div>
          
          <div>
            <label className="form-label">Logo URL (Optional)</label>
            <input
              type="url"
              name="logoUrl"
              value={formData.logoUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/logo.png"
              className="form-input"
            />
          </div>
          
          {/* Token-2022 Features */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Token-2022 Features</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                <input
                  type="checkbox"
                  name="enableTransferHook"
                  checked={formData.enableTransferHook}
                  onChange={handleCheckboxChange}
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <div>
                  <label className="font-medium text-gray-900">Transfer Hook Extension</label>
                  <p className="text-sm text-gray-600">
                    Enables custom logic to be executed on every token transfer. Required for compliance features.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                <input
                  type="checkbox"
                  name="enableWhitelist"
                  checked={formData.enableWhitelist}
                  onChange={handleCheckboxChange}
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <div>
                  <label className="font-medium text-gray-900">Whitelist Compliance</label>
                  <p className="text-sm text-gray-600">
                    Only allows transfers to pre-approved addresses. Includes default AMM addresses for trading.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-red-800 text-sm">{error}</span>
              </div>
            </div>
          )}

          {/* Wallet Connection Warning */}
          {!connected && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-yellow-800 text-sm">Please connect your wallet to create tokens</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-6 border-t">
            <button
              onClick={handleCreateToken}
              disabled={isLoading || !formData.name || !formData.symbol || !connected}
              className={`btn-primary flex-1 ${
                isLoading || !connected ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Token...</span>
                </div>
              ) : !connected ? (
                'Connect Wallet to Create Token'
              ) : (
                'Create Token'
              )}
            </button>
            
            <button
              type="button"
              onClick={resetForm}
              className="btn-secondary"
            >
              Reset
            </button>
          </div>
          
          {/* Estimated Costs */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Estimated Costs</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Token Creation:</span>
                <span>~0.002 SOL</span>
              </div>
              <div className="flex justify-between">
                <span>Transfer Hook Setup:</span>
                <span>~0.003 SOL</span>
              </div>
              <div className="flex justify-between">
                <span>Whitelist Initialization:</span>
                <span>~0.005 SOL</span>
              </div>
              <div className="flex justify-between font-medium text-gray-900 border-t pt-1">
                <span>Total:</span>
                <span>~0.010 SOL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};