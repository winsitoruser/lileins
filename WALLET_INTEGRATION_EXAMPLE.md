# 🔌 Wallet Integration Examples

## How to Replace Convex Auth with Web3 Wallet

---

## 📝 Step 1: Update Main App

### File: `src/main.tsx` or `src/App.tsx`

**Before:**
```tsx
import { ConvexProvider } from 'convex/react';

function App() {
  return (
    <ConvexProvider client={convex}>
      <RouterProvider router={router} />
    </ConvexProvider>
  );
}
```

**After:**
```tsx
import { ConvexProvider } from 'convex/react';
import { Web3Provider } from '@/providers/Web3Provider';

function App() {
  return (
    <Web3Provider>
      <ConvexProvider client={convex}>
        <RouterProvider router={router} />
      </ConvexProvider>
    </Web3Provider>
  );
}
```

---

## 📝 Step 2: Update Homepage Header

### File: `src/pages/Index.tsx`

**Before:**
```tsx
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton } from "@/components/ui/signin.tsx";

// In header:
<Unauthenticated>
  <SignInButton>
    <Button>
      <Wallet className="mr-2 w-4 h-4" />
      Connect Wallet
    </Button>
  </SignInButton>
</Unauthenticated>
<Authenticated>
  <div className="flex items-center gap-3">
    <div className="bg-green-100 px-4 py-2 rounded-full">
      Connected
    </div>
    <Link to="/staking">
      <Button>Stake Now</Button>
    </Link>
  </div>
</Authenticated>
```

**After:**
```tsx
import { WalletButton } from '@/components/wallet/WalletButton';
import { useWallet } from '@/hooks/useWallet';

// In header:
function Header() {
  const { isConnected } = useWallet();
  
  return (
    <header>
      <div className="flex items-center gap-3">
        <WalletButton />
        {isConnected && (
          <Link to="/staking">
            <Button size="sm">
              Stake Now
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
```

---

## 📝 Step 3: Update Staking Page

### File: `src/pages/Staking.tsx`

**Before:**
```tsx
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton } from "@/components/ui/signin.tsx";

function StakingPageInner({ isConnected = false }) {
  // Component logic
}

export default function Staking() {
  return (
    <>
      <Authenticated>
        <StakingPageInner isConnected={true} />
      </Authenticated>
      <Unauthenticated>
        <StakingPageInner isConnected={false} />
      </Unauthenticated>
    </>
  );
}
```

**After:**
```tsx
import { WalletButton } from '@/components/wallet/WalletButton';
import { useWallet } from '@/hooks/useWallet';

function StakingPageInner() {
  const { isConnected, address } = useWallet();
  
  // Component logic - use isConnected directly
  
  return (
    <div>
      {/* Header with wallet button */}
      <header>
        <WalletButton />
      </header>
      
      {/* Content based on connection state */}
      {!isConnected ? (
        <div>
          <p>Connect your wallet to start staking!</p>
          <WalletButton />
        </div>
      ) : (
        <div>
          {/* Staking form and active stakes */}
        </div>
      )}
    </div>
  );
}

export default function Staking() {
  return <StakingPageInner />;
}
```

---

## 📝 Step 4: Create Hybrid System (Optional)

You can use BOTH Convex auth AND Web3 wallet:

```tsx
import { useWallet } from '@/hooks/useWallet';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

function StakingPage() {
  // Web3 wallet for blockchain transactions
  const { 
    isConnected: walletConnected, 
    address 
  } = useWallet();
  
  // Convex auth for app features
  const user = useQuery(api.users.getCurrentUser);
  
  // Both connected = full access
  const fullAccess = walletConnected && user !== null;
  
  return (
    <div>
      {!walletConnected && (
        <WalletButton />
      )}
      {!user && (
        <SignInButton />
      )}
      {fullAccess && (
        <StakingForm />
      )}
    </div>
  );
}
```

---

## 📝 Step 5: Replace Connect Wallet Prompts

### Before:
```tsx
{!isConnected && (
  <SignInButton>
    <Button>
      <Wallet className="mr-2" />
      Connect Wallet
    </Button>
  </SignInButton>
)}
```

### After:
```tsx
{!isConnected && (
  <WalletButton />
)}
```

---

## 📝 Complete Example: Staking Form

```tsx
import { useWallet } from '@/hooks/useWallet';
import { WalletButton } from '@/components/wallet/WalletButton';
import { useWriteContract } from 'wagmi';
import { STAKING_ABI, parseTokenAmount } from '@/lib/web3-config';

function StakingForm() {
  const { isConnected, address, isWrongNetwork } = useWallet();
  const { writeContract, isPending } = useWriteContract();
  const [amount, setAmount] = useState('1000');
  const [duration, setDuration] = useState(90);

  const handleStake = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet');
      return;
    }

    if (isWrongNetwork) {
      toast.error('Please switch to BASE network');
      return;
    }

    try {
      const tokenAmount = parseTokenAmount(amount);
      
      await writeContract({
        address: STAKING_CONTRACT_ADDRESS,
        abi: STAKING_ABI,
        functionName: 'stake',
        args: [tokenAmount, duration],
      });

      toast.success('Staking transaction submitted!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to stake tokens');
    }
  };

  // Not connected
  if (!isConnected) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <h3 className="text-2xl font-black mb-4">
            Connect Your Wallet 🚀
          </h3>
          <p className="mb-6">
            Connect your wallet to start staking $Einz tokens!
          </p>
          <WalletButton />
        </CardContent>
      </Card>
    );
  }

  // Wrong network
  if (isWrongNetwork) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <h3 className="text-2xl font-black mb-4">
            Wrong Network ⚠️
          </h3>
          <p className="mb-6">
            Please switch to BASE network to continue
          </p>
          <WalletButton />
        </CardContent>
      </Card>
    );
  }

  // Connected and correct network
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stake Your Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Amount Input */}
          <div>
            <label>Amount ($Einz)</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="1000"
            />
          </div>

          {/* Duration Selection */}
          <div>
            <label>Duration</label>
            <Select value={duration.toString()} onValueChange={(v) => setDuration(Number(v))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 Days (12% APY)</SelectItem>
                <SelectItem value="90">90 Days (24% APY)</SelectItem>
                <SelectItem value="180">180 Days (36% APY)</SelectItem>
                <SelectItem value="365">365 Days (50% APY)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stake Button */}
          <Button
            onClick={handleStake}
            disabled={isPending}
            className="w-full"
          >
            {isPending ? 'Staking...' : 'Stake Tokens 🚀'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

---

## 📝 Display User's Stakes with Web3

```tsx
import { useReadContract } from 'wagmi';
import { STAKING_ABI } from '@/lib/web3-config';

function ActiveStakes() {
  const { address } = useWallet();
  
  // Read stake IDs from contract
  const { data: stakeIds } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: STAKING_ABI,
    functionName: 'getUserStakes',
    args: [address],
  });

  // Read each stake details
  const stakes = stakeIds?.map((id) => {
    const { data: stake } = useReadContract({
      address: STAKING_CONTRACT_ADDRESS,
      abi: STAKING_ABI,
      functionName: 'getStake',
      args: [address, id],
    });
    return stake;
  });

  return (
    <div>
      <h2>Your Active Stakes</h2>
      {stakes?.map((stake, i) => (
        <Card key={i}>
          <CardContent>
            <p>Amount: {formatBalance(stake.amount)} LILEIN</p>
            <p>Rewards: {formatBalance(stake.rewards)} LILEIN</p>
            <Button onClick={() => handleClaim(stakeIds[i])}>
              Claim Rewards
            </Button>
            <Button onClick={() => handleUnstake(stakeIds[i])}>
              Unstake
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

---

## 🎯 Migration Checklist

### Files to Update:
- [ ] `src/main.tsx` - Add Web3Provider
- [ ] `src/pages/Index.tsx` - Replace SignInButton with WalletButton
- [ ] `src/pages/Staking.tsx` - Update to use useWallet hook
- [ ] Remove Convex auth components (if not needed)
- [ ] Update all `isConnected` checks
- [ ] Test wallet connection flow
- [ ] Test staking transactions
- [ ] Test on mobile devices

### Environment Setup:
- [ ] Get WalletConnect Project ID
- [ ] Add to `.env.local`
- [ ] Deploy token contract
- [ ] Update contract addresses
- [ ] Test on BASE Sepolia
- [ ] Deploy to production

---

## 💡 Tips

### 1. Keep Loading States
```tsx
{isConnecting && <Spinner />}
{isPending && <Spinner />}
```

### 2. Handle Errors
```tsx
try {
  await transaction();
} catch (error) {
  if (error.code === 4001) {
    toast.error('Transaction rejected');
  } else {
    toast.error('Transaction failed');
  }
}
```

### 3. Show Gas Estimates
```tsx
const { data: gasEstimate } = useEstimateGas({
  to: CONTRACT_ADDRESS,
  data: encodedData,
});
```

### 4. Add Transaction History
```tsx
const { data: transactions } = useWatchPendingTransactions();
```

---

## 🚀 Ready to Go!

Your crypto wallet integration is now complete! Users can:
- ✅ Connect with MetaMask or WalletConnect
- ✅ View their balance
- ✅ Switch to BASE network automatically
- ✅ Stake tokens directly from their wallet
- ✅ Claim rewards and unstake
- ✅ See transaction history

Next: Deploy your smart contracts and start staking! 🎉
