import React, { useState, useEffect } from 'react';

interface TradeData {
  fromToken: string;
  toToken: string;
  fromAmount: number;
  toAmount: number;
  slippage: number;
  route: string[];
}

interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  balance: number;
  price: number;
  isWhitelisted?: boolean;
}

export const TradingInterface: React.FC = () => {
  const [tradeData, setTradeData] = useState<TradeData>({
    fromToken: 'SOL',
    toToken: '',
    fromAmount: 0,
    toAmount: 0,
    slippage: 1.0,
    route: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [tradeResult, setTradeResult] = useState<string | null>(null);
  const [priceImpact, setPriceImpact] = useState<number>(0);
  const [route, setRoute] = useState<string[]>([]);

  // Mock tokens for demo
  const mockTokens: TokenInfo[] = [
    {
      address: 'SOL',
      symbol: 'SOL',
      name: 'Solana',
      decimals: 9,
      balance: 50.25,
      price: 105.67
    },
    {
      address: 'COMP123abc',
      symbol: 'COMP',
      name: 'Compliant Token',
      decimals: 6,
      balance: 1000,
      price: 0.0053,
      isWhitelisted: true
    },
    {
      address: 'TEST456def',
      symbol: 'TEST',
      name: 'Test Token',
      decimals: 6,
      balance: 500,
      price: 0.0089,
      isWhitelisted: false
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? Number(value) : value;
    
    setTradeData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Calculate output amount (mock calculation)
    if (name === 'fromAmount' && newValue > 0) {
      const mockOutputAmount = Number(newValue) * 0.98; // Mock 2% spread
      setTradeData(prev => ({
        ...prev,
        toAmount: mockOutputAmount
      }));
      setPriceImpact(0.02);
      setRoute(['Raydium', 'Orca']);
    }
  };

  const handleSwapTokens = () => {
    setTradeData(prev => ({
      ...prev,
      fromToken: prev.toToken,
      toToken: prev.fromToken,
      fromAmount: prev.toAmount,
      toAmount: prev.fromAmount
    }));
  };

  const handleTrade = async () => {
    setIsLoading(true);
    
    // Simulate trade execution
    setTimeout(() => {
      const mockTxHash = `TX${Math.random().toString(36).substr(2, 9)}`;
      setTradeResult(mockTxHash);
      setIsLoading(false);
    }, 3000);
  };

  const resetTrade = () => {
    setTradeResult(null);
    setTradeData({
      fromToken: 'SOL',
      toToken: '',
      fromAmount: 0,
      toAmount: 0,
      slippage: 1.0,
      route: []
    });
    setPriceImpact(0);
    setRoute([]);
  };

  const getTokenInfo = (address: string): TokenInfo | undefined => {
    return mockTokens.find(token => token.address === address);
  };

  const fromTokenInfo = getTokenInfo(tradeData.fromToken);
  const toTokenInfo = getTokenInfo(tradeData.toToken);

  if (tradeResult) {
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
              <h2 className="text-xl font-bold text-green-800">Trade Executed Successfully!</h2>
            </div>
          </div>
          
          <div className="card-body space-y-4">
            <div>
              <label className="form-label text-green-700">Transaction Hash</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={tradeResult}
                  readOnly
                  className="form-input bg-green-50 border-green-200 text-green-800 font-mono"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(tradeResult)}
                  className="btn-outline text-green-600 border-green-300 hover:bg-green-50"
                >
                  Copy
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <span className="text-sm text-green-600">Traded</span>
                <p className="font-semibold text-green-800">
                  {tradeData.fromAmount} {fromTokenInfo?.symbol}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <span className="text-sm text-green-600">Received</span>
                <p className="font-semibold text-green-800">
                  {tradeData.toAmount.toFixed(6)} {toTokenInfo?.symbol}
                </p>
              </div>
            </div>
            
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Trade Details:</h3>
              <ul className="space-y-1 text-green-700 text-sm">
                <li>✓ Transfer hook compliance verified</li>
                <li>✓ Whitelist authorization checked</li>
                <li>✓ Route: {route.join(' → ')}</li>
                <li>✓ Price impact: {(priceImpact * 100).toFixed(2)}%</li>
              </ul>
            </div>
            
            <div className="flex space-x-4">
              <button onClick={resetTrade} className="btn-primary flex-1">
                Make Another Trade
              </button>
              <button className="btn-secondary flex-1">
                View on Explorer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="card">
        <div className="card-header">
          <h2 className="text-2xl font-bold text-gray-900">Trade Tokens</h2>
          <p className="text-gray-600 mt-1">Swap tokens with built-in compliance verification</p>
        </div>
        
        <div className="card-body space-y-4">
          {/* From Token */}
          <div>
            <label className="form-label">From</label>
            <div className="relative">
              <select
                name="fromToken"
                value={tradeData.fromToken}
                onChange={handleInputChange}
                className="form-input pr-20"
              >
                {mockTokens.map(token => (
                  <option key={token.address} value={token.address}>
                    {token.symbol} - {token.name}
                  </option>
                ))}
              </select>
              
              <input
                type="number"
                name="fromAmount"
                value={tradeData.fromAmount || ''}
                onChange={handleInputChange}
                placeholder="0.0"
                className="absolute right-1 top-1 bottom-1 w-20 text-right border-0 focus:ring-0 text-lg font-semibold"
                step="0.000001"
              />
            </div>
            
            {fromTokenInfo && (
              <div className="flex justify-between items-center mt-1 text-sm text-gray-500">
                <span>Balance: {fromTokenInfo.balance.toLocaleString()} {fromTokenInfo.symbol}</span>
                <span>${(fromTokenInfo.price * tradeData.fromAmount).toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSwapTokens}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          {/* To Token */}
          <div>
            <label className="form-label">To</label>
            <div className="relative">
              <select
                name="toToken"
                value={tradeData.toToken}
                onChange={handleInputChange}
                className="form-input pr-20"
              >
                <option value="">Select token</option>
                {mockTokens
                  .filter(token => token.address !== tradeData.fromToken)
                  .map(token => (
                    <option key={token.address} value={token.address}>
                      {token.symbol} - {token.name}
                    </option>
                  ))}
              </select>
              
              <div className="absolute right-1 top-1 bottom-1 w-20 text-right px-2 text-lg font-semibold text-gray-700 flex items-center justify-end">
                {tradeData.toAmount > 0 ? tradeData.toAmount.toFixed(6) : '0.0'}
              </div>
            </div>
            
            {toTokenInfo && tradeData.toAmount > 0 && (
              <div className="flex justify-between items-center mt-1 text-sm text-gray-500">
                <span>Balance: {toTokenInfo.balance.toLocaleString()} {toTokenInfo.symbol}</span>
                <span>${(toTokenInfo.price * tradeData.toAmount).toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Trade Details */}
          {tradeData.fromAmount > 0 && tradeData.toAmount > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Price Impact</span>
                <span className={`font-medium ${priceImpact > 0.05 ? 'text-red-600' : 'text-green-600'}`}>
                  {(priceImpact * 100).toFixed(2)}%
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Route</span>
                <span className="text-gray-900">{route.join(' → ')}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Slippage Tolerance</span>
                <span className="text-gray-900">{tradeData.slippage}%</span>
              </div>
              
              {toTokenInfo && !toTokenInfo.isWhitelisted && (
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span className="text-yellow-800 text-sm">
                      Destination token may not be whitelisted. Trade may fail.
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Slippage Settings */}
          <div>
            <label className="form-label">Slippage Tolerance</label>
            <div className="flex space-x-2">
              {[0.5, 1.0, 2.0].map(value => (
                <button
                  key={value}
                  onClick={() => setTradeData(prev => ({ ...prev, slippage: value }))}
                  className={`px-3 py-1 rounded text-sm ${
                    tradeData.slippage === value
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {value}%
                </button>
              ))}
              <input
                type="number"
                value={tradeData.slippage}
                onChange={(e) => setTradeData(prev => ({ ...prev, slippage: Number(e.target.value) }))}
                min="0.1"
                max="50"
                step="0.1"
                className="w-20 text-sm border rounded px-2 py-1"
              />
            </div>
          </div>

          {/* Trade Button */}
          <button
            onClick={handleTrade}
            disabled={isLoading || !tradeData.toToken || tradeData.fromAmount <= 0}
            className={`btn-primary w-full ${
              isLoading || !tradeData.toToken || tradeData.fromAmount <= 0 
                ? 'opacity-50 cursor-not-allowed' 
                : ''
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Executing Trade...</span>
              </div>
            ) : !tradeData.toToken ? (
              'Select a token to trade'
            ) : tradeData.fromAmount <= 0 ? (
              'Enter amount'
            ) : (
              `Trade ${fromTokenInfo?.symbol} for ${toTokenInfo?.symbol}`
            )}
          </button>

          {/* Trading Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">🛡️ Compliance Features</h4>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Automatic whitelist verification</li>
              <li>• Transfer hook compliance checks</li>
              <li>• Real-time route optimization</li>
              <li>• MEV protection enabled</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};