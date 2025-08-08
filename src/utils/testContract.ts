import { Connection, PublicKey } from '@solana/web3.js';

// Test connection to our deployed contract
export const testContractConnection = async () => {
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  const programId = new PublicKey('4zdEwmyscfRwbnzKWAaQA61HNp2uxCxyij3Sz9JxLSiK');
  
  try {
    const accountInfo = await connection.getAccountInfo(programId);
    
    if (accountInfo) {
      console.log('✅ Contract found on devnet!');
      console.log('Program ID:', programId.toString());
      console.log('Owner:', accountInfo.owner.toString());
      console.log('Executable:', accountInfo.executable);
      console.log('Data length:', accountInfo.data.length);
      return true;
    } else {
      console.log('❌ Contract not found on devnet');
      return false;
    }
  } catch (error) {
    console.error('Error connecting to contract:', error);
    return false;
  }
};

// Call this in the browser console to test
(window as any).testContract = testContractConnection;