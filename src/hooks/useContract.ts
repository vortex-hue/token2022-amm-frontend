import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';
import { AnchorProvider } from '@coral-xyz/anchor';
import { RealContractService } from '../services/realContractService';

export const useContract = (): RealContractService => {
  const { connection } = useConnection();
  const { wallet, publicKey, signTransaction, signAllTransactions } = useWallet();

  const contractService = useMemo(() => {
    const service = new RealContractService(connection);
    
    if (wallet && publicKey && signTransaction && signAllTransactions) {
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
    }
    
    return service;
  }, [connection, wallet, publicKey, signTransaction, signAllTransactions]);

  return contractService;
};