import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';
import { AnchorProvider } from '@coral-xyz/anchor';
import { getContractService, ContractService } from '../services/contractService';

export const useContract = (): ContractService => {
  const { connection } = useConnection();
  const { wallet, publicKey, signTransaction, signAllTransactions } = useWallet();

  const contractService = useMemo(() => {
    const service = getContractService(connection);
    
    // Only set provider if wallet is fully connected
    if (wallet && publicKey && signTransaction && signAllTransactions) {
      try {
        const provider = new AnchorProvider(
          connection,
          {
            publicKey,
            signTransaction,
            signAllTransactions
          },
          {
            commitment: 'confirmed',
            preflightCommitment: 'confirmed',
          }
        );
        
        service.setProvider(provider);
      } catch (error) {
        console.error('Error creating provider in useContract:', error);
      }
    }
    
    return service;
  }, [connection, wallet, publicKey, signTransaction, signAllTransactions]);

  return contractService;
};