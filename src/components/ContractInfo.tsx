import React from 'react';
import { openTokenInExplorer } from '../utils/explorer';

export const ContractInfo: React.FC = () => {
  const contractId = '4zdEwmyscfRwbnzKWAaQA61HNp2uxCxyij3Sz9JxLSiK';
  const network = 'devnet';

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Smart Contract Deployed!</h3>
          <div className="space-y-2">
            <div>
              <span className="text-sm text-blue-600 font-medium">Program ID: </span>
              <span className="font-mono text-sm text-blue-800">{contractId}</span>
            </div>
            <div>
              <span className="text-sm text-blue-600 font-medium">Network: </span>
              <span className="text-blue-800 capitalize">{network}</span>
            </div>
            <div>
              <span className="text-sm text-blue-600 font-medium">Features: </span>
              <span className="text-blue-800">Token-2022, Transfer Hooks, Whitelist</span>
            </div>
          </div>
          <div className="mt-3">
            <button
              onClick={() => openTokenInExplorer(contractId)}
              className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-300 rounded-md hover:bg-blue-200 transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View on Explorer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
