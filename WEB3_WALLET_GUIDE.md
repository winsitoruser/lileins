# 🔗 Web3 Wallet Integration Guide

## 📋 Overview

Complete crypto wallet connection system for Little Einstein with MetaMask, WalletConnect, and BASE L2 network support.

**Features:**
- ✅ MetaMask integration
- ✅ WalletConnect support (mobile wallets)
- ✅ BASE L2 network (Mainnet & Sepolia)
- ✅ Auto network switching
- ✅ Balance display (ETH & LILEIN tokens)
- ✅ Address formatting & copy
- ✅ Transaction handling
- ✅ Error management

---

## 🚀 Quick Start

### 1. Install Dependencies

Dependencies already installed in `package.json`:
```json
{
  "wagmi": "^3.0.2",
  "viem": "^2.40.3",
  "ethers": "^6.15.0",
  "@rainbow-me/rainbowkit": "^2.2.9",
  "@tanstack/react-query": "^5.90.11"
}
```

### 2. Setup Environment Variables

Create `.env.local` file in project root:

```bash
# WalletConnect Project ID
# Get yours at: https://cloud.walletconnect.com
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Optional: RPC URLs (if you want custom endpoints)
VITE_BASE_RPC_URL=https://mainnet.base.org
VITE_BASE_SEPOLIA_RPC_URL=https://sepolia.base.org

# Token Contract Addresses (update when deployed)
VITE_LILEIN_ADDRESS_MAINNET=0x...
VITE_LILEIN_ADDRESS_TESTNET=0x...
```

### 3. Wrap App with Web3Provider

Update `src/main.tsx` or `src/App.tsx`:

```tsx
import { Web3Provider } from '@/providers/Web3Provider';
import { ConvexProvider } from 'convex/react';
import { convex } from '@/convex/_generated/api';

function App() {
  return (
    <ConvexProvider client={convex}>
      <Web3Provider>
        {/* Your app components */}
      </Web3Provider>
    </ConvexProvider>
  );
}
```

### 4. Use Wallet Button

In your components:

```tsx
import { WalletButton } from '@/components/wallet/WalletButton';

function Header() {
  return (
    <header>
      {/* Other header content */}
      <WalletButton />
    </header>
  );
}
```

---

## 📂 File Structure

```
src/
├── lib/
│   └── web3-config.ts          # Web3 configuration & helpers
├── hooks/
│   └── useWallet.ts            # Custom wallet hook
├── components/
│   └── wallet/
│       └── WalletButton.tsx    # Wallet connection UI
└── providers/
    └── Web3Provider.tsx        # Wagmi provider wrapper
```

---

## 🔧 Configuration Details

### Network Configuration

**BASE Mainnet:**
- Chain ID: `8453`
- RPC: `https://mainnet.base.org`
- Explorer: `https://basescan.org`
- Currency: ETH

**BASE Sepolia (Testnet):**
- Chain ID: `84532`
- RPC: `https://sepolia.base.org`
- Explorer: `https://sepolia.basescan.org`
- Currency: ETH

### Supported Wallets

1. **MetaMask** 🦊
   - Browser extension
   - Most popular
   - Direct injection

2. **WalletConnect** 🔗
   - Mobile wallets
   - QR code scanning
   - Trust Wallet, Rainbow, etc.

---

## 🎯 Usage Examples

### Basic Wallet Hook

```tsx
import { useWallet } from '@/hooks/useWallet';

function MyComponent() {
  const {
    address,
    displayAddress,
    isConnected,
    displayBalance,
    connectMetaMask,
    disconnect,
    isWrongNetwork,
    switchNetwork,
  } = useWallet();

  if (!isConnected) {
    return <button onClick={connectMetaMask}>Connect Wallet</button>;
  }

  if (isWrongNetwork) {
    return <button onClick={switchNetwork}>Switch to BASE</button>;
  }

  return (
    <div>
      <p>Connected: {displayAddress}</p>
      <p>Balance: {displayBalance} ETH</p>
      <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}
```

### Token Balance Hook

```tsx
import { useTokenBalance } from '@/hooks/useWallet';

function TokenDisplay() {
  const { displayBalance, isLoading } = useTokenBalance('0x...');

  return (
    <div>
      {isLoading ? 'Loading...' : `${displayBalance} LILEIN`}
    </div>
  );
}
```

### Check Network

```tsx
import { isCorrectNetwork, getNetworkName } from '@/lib/web3-config';
import { useAccount } from 'wagmi';

function NetworkStatus() {
  const { chainId } = useAccount();
  const correct = isCorrectNetwork(chainId || 0);
  const name = getNetworkName(chainId || 0);

  return (
    <div>
      Network: {name}
      {!correct && ' ⚠️ Please switch to BASE'}
    </div>
  );
}
```

---

## 🎨 Wallet Button Component

### Full Version (Desktop)

```tsx
<WalletButton />
```

**Features:**
- Connect wallet modal with provider selection
- Connected state dropdown with:
  - Balance display
  - Address with copy button
  - View on explorer link
  - Disconnect option
- Wrong network warning with auto-switch
- Loading states

### Compact Version (Mobile)

```tsx
<WalletButtonCompact />
```

**Features:**
- Icon-only button when disconnected
- Compact address display when connected
- Warning icon for wrong network
- Minimal space usage

---

## 🔐 Security Best Practices

### 1. **Never Store Private Keys**
```tsx
// ❌ NEVER DO THIS
const privateKey = "0x...";

// ✅ Always use wallet connection
const { address } = useWallet();
```

### 2. **Validate Network**
```tsx
// Always check network before transactions
if (isWrongNetwork) {
  await switchNetwork();
}
```

### 3. **Handle Errors Gracefully**
```tsx
try {
  await transaction();
} catch (error) {
  if (error.code === 4001) {
    // User rejected
  } else {
    // Other error
  }
}
```

### 4. **Use Read-Only for Public Data**
```tsx
// No wallet needed for reading
const balance = await contract.balanceOf(address);
```

---

## 💰 Token Interactions

### Read Token Balance

```tsx
import { useReadContract } from 'wagmi';
import { ERC20_ABI, TOKEN_ADDRESSES } from '@/lib/web3-config';

const { data: balance } = useReadContract({
  address: TOKEN_ADDRESSES[8453].LILEIN,
  abi: ERC20_ABI,
  functionName: 'balanceOf',
  args: [userAddress],
});
```

### Approve Token Spending

```tsx
import { useWriteContract } from 'wagmi';

const { writeContract } = useWriteContract();

const handleApprove = async () => {
  await writeContract({
    address: TOKEN_ADDRESSES[8453].LILEIN,
    abi: ERC20_ABI,
    functionName: 'approve',
    args: [spenderAddress, amount],
  });
};
```

### Transfer Tokens

```tsx
const handleTransfer = async () => {
  await writeContract({
    address: TOKEN_ADDRESSES[8453].LILEIN,
    abi: ERC20_ABI,
    functionName: 'transfer',
    args: [recipientAddress, amount],
  });
};
```

---

## 🎮 Staking Contract Integration

### Stake Tokens

```tsx
import { STAKING_ABI } from '@/lib/web3-config';

const handleStake = async (amount: bigint, duration: number) => {
  // First approve tokens
  await writeContract({
    address: TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'approve',
    args: [STAKING_CONTRACT, amount],
  });

  // Then stake
  await writeContract({
    address: STAKING_CONTRACT,
    abi: STAKING_ABI,
    functionName: 'stake',
    args: [amount, duration],
  });
};
```

### Unstake Tokens

```tsx
const handleUnstake = async (stakeId: bigint) => {
  await writeContract({
    address: STAKING_CONTRACT,
    abi: STAKING_ABI,
    functionName: 'unstake',
    args: [stakeId],
  });
};
```

### Claim Rewards

```tsx
const handleClaim = async (stakeId: bigint) => {
  await writeContract({
    address: STAKING_CONTRACT,
    abi: STAKING_ABI,
    functionName: 'claimRewards',
    args: [stakeId],
  });
};
```

---

## 🎯 Helper Functions

### Format Address

```tsx
import { formatAddress } from '@/lib/web3-config';

const short = formatAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');
// Returns: "0x742d...0bEb"
```

### Format Balance

```tsx
import { formatBalance } from '@/lib/web3-config';

const readable = formatBalance(BigInt('1000000000000000000'), 18);
// Returns: "1.00"
```

### Parse Token Amount

```tsx
import { parseTokenAmount } from '@/lib/web3-config';

const amount = parseTokenAmount('100.5', 18);
// Returns: 100500000000000000000n
```

---

## 🐛 Troubleshooting

### Issue: "MetaMask not found"

**Solution:**
1. Install MetaMask extension
2. Refresh page
3. Try WalletConnect as alternative

### Issue: "Wrong network"

**Solution:**
```tsx
// Auto-switch feature
await switchNetwork();

// Or manually in MetaMask:
// Networks > Add Network > BASE
```

### Issue: "User rejected transaction"

**Solution:**
```tsx
catch (error) {
  if (error.code === 4001) {
    toast.error('Transaction cancelled by user');
  }
}
```

### Issue: "Insufficient funds"

**Solution:**
- Check ETH balance for gas fees
- Get testnet ETH from faucet for testing
- BASE Sepolia Faucet: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet

---

## 🧪 Testing

### Local Testing

1. Use BASE Sepolia testnet
2. Get testnet ETH from faucet
3. Deploy test token contract
4. Test all wallet functions

### Test Checklist

- [ ] Connect with MetaMask
- [ ] Connect with WalletConnect
- [ ] Switch networks
- [ ] Display balance
- [ ] Copy address
- [ ] View on explorer
- [ ] Disconnect wallet
- [ ] Handle wrong network
- [ ] Handle user rejection
- [ ] Handle errors gracefully

---

## 📊 WalletConnect Setup

### 1. Create Project

1. Go to https://cloud.walletconnect.com
2. Sign up / Log in
3. Create new project
4. Get your Project ID

### 2. Add to Environment

```bash
VITE_WALLETCONNECT_PROJECT_ID=abc123...
```

### 3. Configure Metadata

In `src/lib/web3-config.ts`:

```typescript
metadata: {
  name: 'Little Einstein',
  description: 'Stake $LILEIN and earn rewards',
  url: 'https://littleeinstein.io',
  icons: ['https://yourdomain.com/logo.png'],
}
```

---

## 🚀 Deployment Checklist

### Pre-Deployment

- [ ] Update token contract addresses
- [ ] Configure WalletConnect Project ID
- [ ] Test on BASE Mainnet
- [ ] Verify all network configs
- [ ] Test wallet connections
- [ ] Check mobile responsiveness

### Post-Deployment

- [ ] Monitor wallet connections
- [ ] Track transaction success rate
- [ ] Gather user feedback
- [ ] Add analytics events
- [ ] Update documentation

---

## 📈 Analytics Events

Track these wallet events:

```typescript
// Connection
analytics.track('Wallet_Connect_Initiated');
analytics.track('Wallet_Connect_Success', { provider: 'MetaMask' });
analytics.track('Wallet_Connect_Failed', { error: 'User rejected' });

// Network
analytics.track('Network_Switch_Required');
analytics.track('Network_Switch_Success');
analytics.track('Network_Switch_Failed');

// Transactions
analytics.track('Transaction_Initiated', { type: 'stake' });
analytics.track('Transaction_Success', { type: 'stake', amount });
analytics.track('Transaction_Failed', { type: 'stake', error });

// Disconnection
analytics.track('Wallet_Disconnected');
```

---

## 🔮 Future Enhancements

### Phase 1 (Current)
- ✅ MetaMask connection
- ✅ WalletConnect support
- ✅ BASE L2 network
- ✅ Balance display
- ✅ Network switching

### Phase 2 (Next)
- [ ] Multi-chain support (Ethereum, Polygon)
- [ ] Hardware wallet support (Ledger, Trezor)
- [ ] ENS name resolution
- [ ] Transaction history
- [ ] Gas price estimation

### Phase 3 (Future)
- [ ] Gnosis Safe integration
- [ ] Account abstraction (ERC-4337)
- [ ] Batch transactions
- [ ] Cross-chain bridging
- [ ] Smart contract wallet support

---

## 📚 Resources

### Documentation
- **Wagmi Docs:** https://wagmi.sh
- **Viem Docs:** https://viem.sh
- **WalletConnect:** https://docs.walletconnect.com
- **BASE Network:** https://docs.base.org

### Tools
- **BASE Faucet:** https://www.coinbase.com/faucets
- **BASE Explorer:** https://basescan.org
- **MetaMask:** https://metamask.io
- **WalletConnect Cloud:** https://cloud.walletconnect.com

### Community
- **BASE Discord:** https://discord.gg/base
- **Wagmi Discord:** https://discord.gg/wagmi

---

## ✅ Summary

**What's included:**
✅ Complete wallet connection system  
✅ MetaMask & WalletConnect support  
✅ BASE L2 network integration  
✅ Balance & address display  
✅ Network validation & switching  
✅ Error handling & user feedback  
✅ Helper functions & utilities  
✅ Full TypeScript support  
✅ Mobile responsive design  
✅ Security best practices  

**Next steps:**
1. Get WalletConnect Project ID
2. Deploy LILEIN token contract
3. Update contract addresses in config
4. Test on BASE Sepolia
5. Deploy to production!

---

**Version:** 1.0  
**Last Updated:** November 30, 2025  
**Status:** ✅ Ready for Integration
