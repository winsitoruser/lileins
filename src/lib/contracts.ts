// Smart Contract Configuration
export const TOKEN_ADDRESS = import.meta.env.VITE_TOKEN_ADDRESS || '0x...'
export const STAKING_ADDRESS = import.meta.env.VITE_STAKING_ADDRESS || '0x...'

// Token ABI
export const TOKEN_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function transferFrom(address from, address to, uint256 amount) returns (bool)',
  'function mint(address to, uint256 amount)',
  'function burn(uint256 amount)',
  'function batchTransfer(address[] recipients, uint256[] amounts) returns (bool)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
] as const

// Staking ABI
export const STAKING_ABI = [
  'function stake(uint256 amount, uint256 lockPeriod)',
  'function unstake(uint256 stakeId)',
  'function claimRewards(uint256 stakeId)',
  'function getStakeInfo(address user, uint256 stakeId) view returns (uint256 amount, uint256 startTime, uint256 lockPeriod, uint256 rewards, bool active)',
  'function getUserStakes(address user) view returns (uint256[])',
  'function calculateRewards(address user, uint256 stakeId) view returns (uint256)',
  'function getPoolInfo(uint256 lockPeriod) view returns (uint256 apy, uint256 minAmount, uint256 totalStaked)',
  'function totalStaked() view returns (uint256)',
  'function totalRewards() view returns (uint256)',
  'event Staked(address indexed user, uint256 stakeId, uint256 amount, uint256 lockPeriod)',
  'event Unstaked(address indexed user, uint256 stakeId, uint256 amount)',
  'event RewardsClaimed(address indexed user, uint256 stakeId, uint256 rewards)',
] as const

// Staking tiers configuration
export const STAKING_TIERS = [
  { 
    days: 30, 
    lockPeriod: 30 * 24 * 60 * 60, // 30 days in seconds
    apy: 12, 
    minAmount: '1000', 
    emoji: '🌱', 
    label: 'Starter', 
    color: 'from-green-400 to-emerald-500' 
  },
  { 
    days: 90, 
    lockPeriod: 90 * 24 * 60 * 60, // 90 days in seconds
    apy: 24, 
    minAmount: '5000', 
    emoji: '🚀', 
    label: 'Growth', 
    color: 'from-blue-400 to-cyan-500' 
  },
  { 
    days: 180, 
    lockPeriod: 180 * 24 * 60 * 60, // 180 days in seconds
    apy: 36, 
    minAmount: '10000', 
    emoji: '💎', 
    label: 'Diamond', 
    color: 'from-purple-400 to-pink-500' 
  },
  { 
    days: 365, 
    lockPeriod: 365 * 24 * 60 * 60, // 365 days in seconds
    apy: 50, 
    minAmount: '25000', 
    emoji: '🌟', 
    label: 'Einstein', 
    color: 'from-yellow-400 to-orange-500' 
  },
]

// Helper to format token amounts
export function formatTokenAmount(amount: bigint, decimals: number = 18): string {
  const divisor = BigInt(10 ** decimals)
  const whole = amount / divisor
  const fraction = amount % divisor
  
  if (fraction === BigInt(0)) {
    return whole.toString()
  }
  
  const fractionStr = fraction.toString().padStart(decimals, '0')
  const trimmed = fractionStr.replace(/0+$/, '')
  
  return `${whole}.${trimmed}`
}

// Helper to parse token amounts
export function parseTokenAmount(amount: string, decimals: number = 18): bigint {
  const [whole, fraction = ''] = amount.split('.')
  const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals)
  return BigInt(whole + paddedFraction)
}
