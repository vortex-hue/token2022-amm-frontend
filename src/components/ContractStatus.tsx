import React from 'react';
import { useContract } from '../hooks/useContract';
import { useWallet } from '@solana/wallet-adapter-react';

export const ContractStatus: React.FC = () => {
  const { connected } = useWallet();
  const contractService = useContract();

  const programInfo = contractService.getProgramInfo();

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-green-800">
            🎉 Smart Contract Successfully Deployed!
          </h3>
          <div className="text-xs text-green-600 mt-1 space-y-1">
            <div>
              <span className="font-medium">Program ID:</span>{' '}
              <code className="bg-green-100 px-1 rounded text-green-800">
                {programInfo.programId}
              </code>
            </div>
            <div>
              <span className="font-medium">Network:</span> {programInfo.network} | 
              <span className="font-medium"> Status:</span> {programInfo.status} | 
              <span className="font-medium"> Version:</span> {programInfo.version}
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <a
                href={`https://explorer.solana.com/address/${programInfo.programId}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 underline"
              >
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View on Solana Explorer
              </a>
              <span className="text-xs text-gray-500">
                Connection: {connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            LIVE
          </div>
        </div>
      </div>
    </div>
  );
};