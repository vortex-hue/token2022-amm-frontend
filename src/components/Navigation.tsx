import React from 'react';

type ActiveTab = 'create-token' | 'create-pool' | 'trade';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      id: 'create-token' as const,
      name: 'Create Token',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      description: 'Deploy Token-2022 with transfer hooks'
    },
    {
      id: 'create-pool' as const,
      name: 'Create Pool',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      description: 'Launch liquidity pools on AMMs'
    },
    {
      id: 'trade' as const,
      name: 'Trade',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      description: 'Trade tokens with compliance checks'
    }
  ];

  return (
    <div className="card glass-effect max-w-4xl mx-auto">
      <div className="card-body p-2">
        <div className="grid grid-cols-3 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative p-4 rounded-lg transition-all duration-200 text-left ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-lg transform scale-105'
                  : 'bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                {tab.icon}
                <span className="font-semibold">{tab.name}</span>
              </div>
              <p className={`text-sm ${
                activeTab === tab.id ? 'text-primary-100' : 'text-gray-500'
              }`}>
                {tab.description}
              </p>
              
              {/* Active indicator */}
              {activeTab === tab.id && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};