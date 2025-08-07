import React, { useState } from 'react';

interface PoolFormData {
  tokenAddress: string;
  solAmount: number;
  tokenAmount: number;
  ammPlatform: 'raydium' | 'orca' | 'meteora';
  poolType: 'cpmm' | 'clmm';
  feeRate: number;
  priceRange?: {
    min: number;
    max: number;
  };
}

export const PoolCreator: React.FC = () => {
  const [formData, setFormData] = useState<PoolFormData>({
    tokenAddress: '',
    solAmount: 10,
    tokenAmount: 10000,
    ammPlatform: 'raydium',
    poolType: 'cpmm',
    feeRate: 0.25
  });

  const [isLoading, setIsLoading] = useState(false);
  const [createdPool, setCreatedPool] = useState<string | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'solAmount' || name === 'tokenAmount') {
      const newFormData = {
        ...formData,
        [name]: Number(value)
      };
      setFormData(newFormData);
      
      // Calculate price
      if (newFormData.solAmount > 0 && newFormData.tokenAmount > 0) {
        setCurrentPrice(newFormData.solAmount / newFormData.tokenAmount);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value
      }));
    }
  };

  const handleCreatePool = async () => {
    setIsLoading(true);
    
    // Simulate pool creation
    setTimeout(() => {
      const mockPoolAddress = `POOL${Math.random().toString(36).substr(2, 9)}`;
      setCreatedPool(mockPoolAddress);
      setIsLoading(false);
    }, 4000);
  };

  const resetForm = () => {
    setCreatedPool(null);
    setFormData({
      tokenAddress: '',
      solAmount: 10,
      tokenAmount: 10000,
      ammPlatform: 'raydium',
      poolType: 'cpmm',
      feeRate: 0.25
    });
    setCurrentPrice(0);
  };

  const ammPlatforms = [
    { id: 'raydium', name: 'Raydium', description: 'Dominant Solana AMM with highest liquidity' },
    { id: 'orca', name: 'Orca', description: 'User-friendly AMM with concentrated liquidity' },
    { id: 'meteora', name: 'Meteora', description: 'Dynamic liquidity with DLMM pools' }
  ];

  const poolTypes = [
    { id: 'cpmm', name: 'Constant Product (CPMM)', description: 'Standard x*y=k AMM model' },
    { id: 'clmm', name: 'Concentrated Liquidity (CLMM)', description: 'Capital efficient with price ranges' }
  ];

  if (createdPool) {
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
              <h2 className="text-xl font-bold text-green-800">Pool Created Successfully!</h2>
            </div>
          </div>
          
          <div className="card-body space-y-4">
            <div>
              <label className="form-label text-green-700">Pool Address</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={createdPool}
                  readOnly
                  className="form-input bg-green-50 border-green-200 text-green-800 font-mono"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(createdPool)}
                  className="btn-outline text-green-600 border-green-300 hover:bg-green-50"
                >
                  Copy
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <span className="text-sm text-green-600">Platform</span>
                <p className="font-semibold text-green-800 capitalize">{formData.ammPlatform}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <span className="text-sm text-green-600">Pool Type</span>
                <p className="font-semibold text-green-800 uppercase">{formData.poolType}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <span className="text-sm text-green-600">Initial Price</span>
                <p className="font-semibold text-green-800">{currentPrice.toFixed(6)} SOL</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <span className="text-sm text-green-600">Fee Rate</span>
                <p className="font-semibold text-green-800">{formData.feeRate}%</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button onClick={resetForm} className="btn-primary flex-1">
                Create Another Pool
              </button>
              <button className="btn-secondary flex-1">
                View Pool
              </button>
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
          <h2 className="text-2xl font-bold text-gray-900">Create Liquidity Pool</h2>
          <p className="text-gray-600 mt-1">Launch a SOL-token liquidity pool on major Solana AMMs</p>
        </div>
        
        <div className="card-body space-y-6">
          {/* Token Selection */}
          <div>
            <label className="form-label">Token Address</label>
            <input
              type="text"
              name="tokenAddress"
              value={formData.tokenAddress}
              onChange={handleInputChange}
              placeholder="Enter Token-2022 mint address"
              className="form-input font-mono"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Must be a valid Token-2022 mint address with transfer hook support
            </p>
          </div>

          {/* AMM Platform Selection */}
          <div>
            <label className="form-label">AMM Platform</label>
            <div className="space-y-3">
              {ammPlatforms.map((platform) => (
                <label key={platform.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="ammPlatform"
                    value={platform.id}
                    checked={formData.ammPlatform === platform.id}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{platform.name}</div>
                    <div className="text-sm text-gray-500">{platform.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Pool Type */}
          <div>
            <label className="form-label">Pool Type</label>
            <div className="space-y-3">
              {poolTypes.map((type) => (
                <label key={type.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="poolType"
                    value={type.id}
                    checked={formData.poolType === type.id}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{type.name}</div>
                    <div className="text-sm text-gray-500">{type.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Liquidity Amounts */}
          <div>
            <label className="form-label">Initial Liquidity</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">SOL Amount</label>
                <input
                  type="number"
                  name="solAmount"
                  value={formData.solAmount}
                  onChange={handleInputChange}
                  min="0.1"
                  step="0.1"
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Token Amount</label>
                <input
                  type="number"
                  name="tokenAmount"
                  value={formData.tokenAmount}
                  onChange={handleInputChange}
                  min="1"
                  className="form-input"
                />
              </div>
            </div>
            
            {currentPrice > 0 && (
              <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-600">
                  Initial Price: <span className="font-semibold">{currentPrice.toFixed(6)} SOL per token</span>
                </div>
                <div className="text-xs text-blue-500 mt-1">
                  Price = SOL Amount ÷ Token Amount
                </div>
              </div>
            )}
          </div>

          {/* Fee Rate */}
          <div>
            <label className="form-label">Trading Fee Rate</label>
            <select
              name="feeRate"
              value={formData.feeRate}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value={0.01}>0.01% (Very Low)</option>
              <option value={0.05}>0.05% (Low)</option>
              <option value={0.25}>0.25% (Standard)</option>
              <option value={0.30}>0.30% (Standard)</option>
              <option value={1.00}>1.00% (High)</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">
              Higher fees generate more revenue but may reduce trading volume
            </p>
          </div>

          {/* CLMM Price Range (if CLMM selected) */}
          {formData.poolType === 'clmm' && (
            <div>
              <label className="form-label">Price Range (Optional)</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Min Price (SOL)</label>
                  <input
                    type="number"
                    placeholder="Auto"
                    className="form-input"
                    step="0.000001"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Max Price (SOL)</label>
                  <input
                    type="number"
                    placeholder="Auto"
                    className="form-input"
                    step="0.000001"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Leave empty for full range. Concentrated ranges are more capital efficient.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-6 border-t">
            <button
              onClick={handleCreatePool}
              disabled={isLoading || !formData.tokenAddress || formData.solAmount <= 0 || formData.tokenAmount <= 0}
              className={`btn-primary flex-1 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Pool...</span>
                </div>
              ) : (
                'Create Pool'
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
                <span>Pool Creation Fee:</span>
                <span>~0.15 SOL</span>
              </div>
              <div className="flex justify-between">
                <span>Initial Liquidity:</span>
                <span>{formData.solAmount} SOL + {formData.tokenAmount.toLocaleString()} tokens</span>
              </div>
              <div className="flex justify-between">
                <span>Transaction Fees:</span>
                <span>~0.005 SOL</span>
              </div>
              <div className="flex justify-between font-medium text-gray-900 border-t pt-1">
                <span>Total SOL Required:</span>
                <span>~{(formData.solAmount + 0.155).toFixed(3)} SOL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};