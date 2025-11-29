# 👛 Wallet Integration - Little Einstein

## 🔌 Connect Wallet Feature

Integrasi wallet connection menggunakan Convex authentication di seluruh aplikasi.

---

## 📍 Implementation Locations

### 1. **Homepage (Index.tsx)** ✅ NEW!
- **Location:** Header navigation (top-right)
- **States:**
  - 🔴 **Not Connected:** "Connect Wallet" button with gradient
  - 🟢 **Connected:** Green badge + "Stake Now" button

### 2. **Staking Page (Staking.tsx)** ✅ 
- **Location:** Header + inline prompts
- **States:**
  - 🔴 **Not Connected:** Show full page, disabled forms
  - 🟢 **Connected:** Full functionality, active stakes display

### 3. **EinSwap Page** (Future)
- Planned wallet integration for swaps

### 4. **Pools Page** (Future)
- Planned wallet integration for liquidity

---

## 🎨 UI States

### Not Connected (Unauthenticated):
```tsx
┌──────────────────────────────────┐
│  [🔗 Connect Wallet]             │
│   Gradient button                │
│   Wallet icon + text             │
└──────────────────────────────────┘
```

**Visual:**
- Gradient: `from-primary to-accent`
- Icon: Wallet (Lucide React)
- Hover: Shadow expansion
- Animation: Smooth transitions

### Connected (Authenticated):
```tsx
┌──────────────────────────────────┐
│  [●  Connected]  [Stake Now]     │
│   Green badge    Action button   │
└──────────────────────────────────┘
```

**Visual:**
- Badge: Green background, pulsing dot
- Text: "Connected" in green
- Button: "Stake Now" (primary color)
- Layout: Side-by-side display

---

## 🔧 Technical Implementation

### Imports Required:
```typescript
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton } from "@/components/ui/signin.tsx";
import { Wallet } from "lucide-react";
```

### Code Pattern:
```tsx
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
    {/* Connected Badge */}
    <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full border-2 border-green-400">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      <span className="text-sm font-bold text-green-700">Connected</span>
    </div>
    {/* Action Button */}
    <Link to="/staking">
      <Button>Stake Now</Button>
    </Link>
  </div>
</Authenticated>
```

---

## 🎯 User Flows

### Flow 1: First-Time Visitor (Homepage)
```
1. Land on homepage
   ↓
2. See "Connect Wallet" in header
   ↓
3. Click button → SignInButton modal
   ↓
4. Choose auth method (Email/Web3)
   ↓
5. Complete authentication
   ↓
6. Header shows "Connected" badge
   ↓
7. "Stake Now" button appears
   ↓
8. Click → Navigate to staking page
```

### Flow 2: Returning User (Already Connected)
```
1. Land on homepage
   ↓
2. Header shows "Connected" immediately
   ↓
3. Can access all features
   ↓
4. Navigate to staking/pools/swap
```

### Flow 3: Disconnect & Reconnect
```
1. User disconnects wallet
   ↓
2. Header changes to "Connect Wallet"
   ↓
3. Staking page shows disabled forms
   ↓
4. Pools/Swap show connection prompts
   ↓
5. Click any "Connect" → Reconnect
```

---

## 📱 Responsive Design

### Desktop (≥768px):
```
┌────────────────────────────────────────┐
│ Logo | Nav Links | [Connect Wallet]    │
└────────────────────────────────────────┘
```

### Mobile (<768px):
```
┌──────────────────────┐
│ Logo  [Connect]      │
│ (Nav hidden)         │
└──────────────────────┘
```

**Note:** Mobile menu implementation can be added with hamburger icon.

---

## 🔐 Security & Privacy

### Authentication Methods:
- ✅ **Email/Password** (Convex Auth)
- ✅ **Web3 Wallet** (MetaMask, WalletConnect, etc.)
- ✅ **OAuth** (Google, GitHub - if configured)

### Data Stored:
- User authentication state
- Wallet address (if web3)
- Staking positions
- Transaction history

### Privacy:
- No personal data stored on client
- Secure session management by Convex
- Encrypted communications

---

## ⚙️ Configuration

### Convex Setup:
File: `convex/auth.config.ts`
```typescript
export default {
  providers: [
    {
      domain: process.env.CONVEX_SITE_URL!,
      applicationID: "convex",
    },
  ],
};
```

### Environment Variables:
```bash
CONVEX_DEPLOYMENT=...
CONVEX_URL=https://...convex.cloud
```

---

## 🎨 Styling Details

### Connect Wallet Button:
```css
bg-gradient-to-r from-primary to-accent
text-white font-bold rounded-full px-6
shadow-lg hover:shadow-xl transition-all
```

### Connected Badge:
```css
bg-green-100 px-4 py-2 rounded-full
border-2 border-green-400
```

### Pulsing Dot:
```css
w-2 h-2 bg-green-500 rounded-full animate-pulse
```

### Stake Now Button:
```css
bg-primary hover:bg-primary/90
text-white font-bold rounded-full px-6
```

---

## 🐛 Error Handling

### Common Issues:

1. **Convex Not Initialized:**
   - Check `ConvexProvider` wrapper in `main.tsx`
   - Verify CONVEX_URL is set

2. **SignInButton Not Working:**
   - Ensure `@/components/ui/signin.tsx` exists
   - Check import paths

3. **Authentication State Not Persisting:**
   - Check browser localStorage
   - Verify Convex deployment

4. **Badge Not Showing After Connect:**
   - React state not updating
   - Check `<Authenticated>` wrapper

---

## 📊 Analytics Tracking

### Events to Track:
```javascript
// Connection Events
analytics.track('Wallet_Connect_Clicked');
analytics.track('Wallet_Connected', { method: 'email|web3' });
analytics.track('Wallet_Disconnected');

// Navigation Events
analytics.track('Stake_Now_Clicked', { from: 'header' });
analytics.track('Staking_Page_Visited', { authenticated: true });

// Conversion Events
analytics.track('First_Stake_Created', { amount, duration });
```

---

## 🚀 Future Enhancements

### Planned Features:
- [ ] Show wallet balance in header
- [ ] Display shortened wallet address
- [ ] Account dropdown menu
  - View profile
  - Transaction history
  - Settings
  - Disconnect
- [ ] Network selector (BASE L2, Ethereum, etc.)
- [ ] Multi-wallet support
- [ ] ENS name display
- [ ] Avatar/profile picture

### Advanced Features:
- [ ] Auto-connect on return visit
- [ ] Session timeout warnings
- [ ] Two-factor authentication
- [ ] Hardware wallet support
- [ ] Mobile wallet deep links

---

## 🧪 Testing Checklist

### Manual Tests:
- [ ] Click "Connect Wallet" → Modal opens
- [ ] Complete authentication → Badge appears
- [ ] Navigate to staking → Forms enabled
- [ ] Disconnect → Badge disappears
- [ ] Reconnect → Badge reappears
- [ ] Refresh page → State persists
- [ ] Test on mobile devices
- [ ] Test different browsers

### Edge Cases:
- [ ] Slow network connection
- [ ] Authentication timeout
- [ ] Multiple tabs open
- [ ] Browser back/forward
- [ ] Session expiry

---

## 📝 Code Locations

### Files Modified:
1. **`/src/pages/Index.tsx`**
   - Added imports: `Authenticated`, `Unauthenticated`, `SignInButton`, `Wallet`
   - Updated header with conditional rendering
   - Line ~302-325

2. **`/src/pages/Staking.tsx`** (Already implemented)
   - Header button
   - Inline prompts
   - Form disable states

### Components Used:
- `SignInButton` - Convex auth modal trigger
- `Button` - UI button component
- `Authenticated` - Wrapper for authenticated content
- `Unauthenticated` - Wrapper for non-authenticated content

---

## 💡 Best Practices

### Do's:
✅ Always wrap wallet-required features with `<Authenticated>`
✅ Provide clear CTAs for connection
✅ Show connection status prominently
✅ Handle loading states gracefully
✅ Test across devices and browsers

### Don'ts:
❌ Don't hide all content before connection
❌ Don't auto-connect without user action
❌ Don't store sensitive data in localStorage
❌ Don't assume wallet is always available
❌ Don't skip error handling

---

## 🎯 Success Metrics

### KPIs to Monitor:
- **Connection Rate:** % visitors who connect
- **Time to Connect:** Avg seconds to complete
- **Drop-off Rate:** % who abandon connection
- **Feature Usage:** Actions taken after connect
- **Retention:** Return rate of connected users

---

## 🔗 Related Documentation

- [Convex Authentication Docs](https://docs.convex.dev/auth)
- [Staking Integration](./STAKING_INTEGRATION.md)
- [Homepage Structure](./HOMEPAGE_STRUCTURE.md)

---

**Status:** ✅ IMPLEMENTED  
**Version:** 1.0  
**Last Updated:** November 30, 2025

Connect Wallet is now integrated across the application! 🎉
