// Web3 Configuration for Little Einstein
// BASE L2 Network & Wallet Setup

import { base, baseSepolia } from 'wagmi/chains';

// Re-export from existing wagmi config
export { wagmiConfig } from './wagmi';

// Configure supported chains
export const supportedChains = [base, baseSepolia] as const;

// BASE L2 Network Details
export const BASE_MAINNET = {
  chainId: 8453,
  name: 'Base',
  symbol: 'ETH',
  rpcUrl: 'https://mainnet.base.org',
  blockExplorer: 'https://basescan.org',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
};

export const BASE_SEPOLIA = {
  chainId: 84532,
  name: 'Base Sepolia',
  symbol: 'ETH',
  rpcUrl: 'https://sepolia.base.org',
  blockExplorer: 'https://sepolia.basescan.org',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
};

// LILEIN Token Contract Addresses
export const TOKEN_ADDRESSES = {
  // BASE Mainnet
  8453: {
    LILEIN: '0x...', // TODO: Add actual contract address
  },
  // BASE Sepolia Testnet
  84532: {
    LILEIN: '0x...', // TODO: Add testnet contract address
  },
} as const;

// Token ABI for balance checking
export const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function transfer(address to, uint amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
] as const;

// Staking Contract ABI (Basic)
export const STAKING_ABI = [
  'function stake(uint256 amount, uint256 duration) external',
  'function unstake(uint256 stakeId) external',
  'function claimRewards(uint256 stakeId) external',
  'function getStake(address user, uint256 stakeId) view returns (tuple(uint256 amount, uint256 startTime, uint256 duration, uint256 rewards, bool active))',
  'function getUserStakes(address user) view returns (uint256[])',
] as const;

// Helper: Format wallet address
export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Helper: Format balance
export function formatBalance(balance: bigint, decimals: number = 18): string {
  const value = Number(balance) / Math.pow(10, decimals);
  if (value < 0.0001) return '< 0.0001';
  if (value < 1) return value.toFixed(4);
  if (value < 1000) return value.toFixed(2);
  return value.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

// Helper: Parse input to token amount
export function parseTokenAmount(amount: string, decimals: number = 18): bigint {
  try {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) return BigInt(0);
    return BigInt(Math.floor(value * Math.pow(10, decimals)));
  } catch {
    return BigInt(0);
  }
}

// Helper: Check if on correct network
export function isCorrectNetwork(chainId: number): boolean {
  return chainId === BASE_MAINNET.chainId || chainId === BASE_SEPOLIA.chainId;
}

// Helper: Get network name
export function getNetworkName(chainId: number): string {
  switch (chainId) {
    case BASE_MAINNET.chainId:
      return 'Base';
    case BASE_SEPOLIA.chainId:
      return 'Base Sepolia';
    default:
      return 'Unknown Network';
  }
}

// Export for convenience
export { base, baseSepolia };
