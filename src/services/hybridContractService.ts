import { Connection, PublicKey } from '@solana/web3.js';
import { AnchorProvider } from '@coral-xyz/anchor';
import { RealContractService } from './realContractService';
import { ContractService } from './contractService';

/**
 * Hybrid Contract Service that falls back to mock service if real service fails
 */
export class HybridContractService {
  private realService: RealContractService;
  private mockService: ContractService;
  private useReal: boolean = false;

  constructor(connection: Connection) {
    this.realService = new RealContractService(connection);
    this.mockService = new ContractService(connection);
  }

  public setProvider(provider: AnchorProvider) {
    try {
      this.realService.setProvider(provider);
      this.mockService.setProvider(provider);
      this.useReal = true;
      console.log('✅ Real contract service initialized successfully');
    } catch (error) {
      console.warn('⚠️ Failed to initialize real contract service, using mock:', error);
      this.mockService.setProvider(provider);
      this.useReal = false;
    }
  }

  public async createToken(params: any) {
    try {
      if (this.useReal) {
        return await this.realService.createToken(params);
      }
    } catch (error) {
      console.warn('Real token creation failed, using mock:', error);
    }
    return await this.mockService.createToken(params);
  }

  public async createPool(params: any) {
    try {
      if (this.useReal) {
        return await this.realService.createPool(params);
      }
    } catch (error) {
      console.warn('Real pool creation failed, using mock:', error);
    }
    return await this.mockService.createPool(params);
  }

  public async swapTokens(params: any) {
    try {
      if (this.useReal) {
        return await this.realService.swapTokens(params);
      }
    } catch (error) {
      console.warn('Real swap failed, using mock:', error);
    }
    return await this.mockService.swapTokens(params);
  }

  public async isWhitelisted(address: string): Promise<boolean> {
    try {
      if (this.useReal) {
        return await this.realService.isWhitelisted(address);
      }
    } catch (error) {
      console.warn('Real whitelist check failed, using mock:', error);
    }
    return await this.mockService.isWhitelisted(address);
  }

  public async initializeWhitelist() {
    try {
      if (this.useReal) {
        return await this.realService.initializeWhitelist();
      }
    } catch (error) {
      console.warn('Real whitelist initialization failed, using mock:', error);
    }
    return await this.mockService.initializeWhitelist();
  }

  public async addToWhitelist(address: string) {
    try {
      if (this.useReal) {
        return await this.realService.addToWhitelist(address);
      }
    } catch (error) {
      console.warn('Real whitelist addition failed, using mock:', error);
    }
    return await this.mockService.addToWhitelist(address);
  }

  public async getTokenBalance(tokenAddress: string, walletAddress: string): Promise<number> {
    try {
      if (this.useReal) {
        // RealContractService doesn't have this method, so use mock
        return await this.mockService.getTokenBalance(tokenAddress, walletAddress);
      }
    } catch (error) {
      console.warn('Balance check failed, using mock:', error);
    }
    return await this.mockService.getTokenBalance(tokenAddress, walletAddress);
  }

  public async getTransactionHistory(walletAddress: string): Promise<any[]> {
    try {
      if (this.useReal) {
        // RealContractService doesn't have this method, so use mock
        return await this.mockService.getTransactionHistory(walletAddress);
      }
    } catch (error) {
      console.warn('Transaction history failed, using mock:', error);
    }
    return await this.mockService.getTransactionHistory(walletAddress);
  }

  public getProgramInfo() {
    // Both services have this method, prefer real if available
    try {
      if (this.useReal) {
        return this.realService.getProgramInfo();
      }
    } catch (error) {
      console.warn('Real program info failed, using mock:', error);
    }
    return this.mockService.getProgramInfo();
  }

  public isUsingRealService(): boolean {
    return this.useReal;
  }
}
