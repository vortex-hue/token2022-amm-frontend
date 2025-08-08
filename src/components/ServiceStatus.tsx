import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

interface ServiceStatusProps {
  isUsingRealService: boolean;
}

export const ServiceStatus: React.FC<ServiceStatusProps> = ({ isUsingRealService }) => {
  const { connected } = useWallet();

  if (!connected) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <span className="text-sm text-gray-600">
            Connect wallet to access smart contract features
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`border rounded-lg p-3 mb-4 ${
      isUsingRealService 
        ? 'bg-green-50 border-green-200' 
        : 'bg-yellow-50 border-yellow-200'
    }`}>
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${
          isUsingRealService ? 'bg-green-500' : 'bg-yellow-500'
        }`}></div>
        <span className={`text-sm font-medium ${
          isUsingRealService ? 'text-green-800' : 'text-yellow-800'
        }`}>
          {isUsingRealService 
            ? '🎯 Connected to Live Smart Contract' 
            : '⚡ Using Demo Mode (Mock Contract)'
          }
        </span>
        {!isUsingRealService && (
          <span className="text-xs text-yellow-600">
            (Real contract integration will be restored after debugging)
          </span>
        )}
      </div>
    </div>
  );
};
