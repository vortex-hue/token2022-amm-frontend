/**
 * Utility functions for Solana Explorer links
 */

export const getExplorerUrl = (address: string, type: 'address' | 'tx' = 'address', cluster: 'devnet' | 'mainnet-beta' | 'testnet' = 'devnet'): string => {
  const baseUrl = 'https://explorer.solana.com';
  const clusterParam = cluster !== 'mainnet-beta' ? `?cluster=${cluster}` : '';
  
  return `${baseUrl}/${type}/${address}${clusterParam}`;
};

export const getTokenExplorerUrl = (mintAddress: string, cluster: 'devnet' | 'mainnet-beta' | 'testnet' = 'devnet'): string => {
  return getExplorerUrl(mintAddress, 'address', cluster);
};

export const getTransactionExplorerUrl = (signature: string, cluster: 'devnet' | 'mainnet-beta' | 'testnet' = 'devnet'): string => {
  return getExplorerUrl(signature, 'tx', cluster);
};

export const openInExplorer = (address: string, type: 'address' | 'tx' = 'address', cluster: 'devnet' | 'mainnet-beta' | 'testnet' = 'devnet'): void => {
  const url = getExplorerUrl(address, type, cluster);
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const openTokenInExplorer = (mintAddress: string, cluster: 'devnet' | 'mainnet-beta' | 'testnet' = 'devnet'): void => {
  openInExplorer(mintAddress, 'address', cluster);
};

export const openTransactionInExplorer = (signature: string, cluster: 'devnet' | 'mainnet-beta' | 'testnet' = 'devnet'): void => {
  openInExplorer(signature, 'tx', cluster);
};
