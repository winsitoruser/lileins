# Web3 Backend Integration Setup

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Smart Contract Addresses (Base Chain)
VITE_TOKEN_ADDRESS=0x...  # Little Einstein Token Contract Address
VITE_STAKING_ADDRESS=0x... # Staking Contract Address

# WalletConnect Project ID (get from https://cloud.walletconnect.com)
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Convex Backend (optional, if using Convex features)
VITE_CONVEX_URL=https://your-convex-deployment.convex.cloud

# Hercules Auth (optional, if using Hercules auth)
VITE_HERCULES_OIDC_AUTHORITY=
VITE_HERCULES_OIDC_CLIENT_ID=
VITE_HERCULES_OIDC_REDIRECT_URI=
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Deploy Smart Contracts
Deploy your contracts to Base Chain:
```bash
cd ../
npm run deploy:base
```

Copy the deployed contract addresses to your `.env.local` file.

### 3. Get WalletConnect Project ID
1. Go to https://cloud.walletconnect.com
2. Create a new project
3. Copy the Project ID
4. Add it to `.env.local` as `VITE_WALLETCONNECT_PROJECT_ID`

### 4. Run Development Server
```bash
npm run dev
```

The app will be available at http://localhost:5173

## Features Integrated

✅ **MetaMask Connect** - Users can connect with MetaMask and other Web3 wallets
✅ **Token Balance** - Display user's $Einz token balance
✅ **Staking** - Stake tokens directly from the UI
✅ **Rewards** - View and claim staking rewards
✅ **Multi-Chain** - Support for Base and Base Sepolia

## Smart Contract Integration

The app integrates with:
- **BaseToken.sol** - ERC20 token contract for $Einz
- **TokenStaking.sol** - Staking contract with multiple tiers

### Staking Tiers
- 🌱 **Starter** (30 days): 12% APY, min 1K tokens
- 🚀 **Growth** (90 days): 24% APY, min 5K tokens
- 💎 **Diamond** (180 days): 36% APY, min 10K tokens
- 🌟 **Einstein** (365 days): 50% APY, min 25K tokens

## Troubleshooting

### Wrong Network Error
Make sure you're connected to Base or Base Sepolia testnet in your wallet.

### Transaction Failures
- Check you have enough ETH for gas fees
- Ensure token approval is granted before staking
- Verify contract addresses are correct

### WalletConnect Issues
- Verify your Project ID is correct
- Clear browser cache and reconnect wallet
- Try a different wallet if issues persist
