// Wallet Connection Button Component
// Handles wallet connection UI with MetaMask and WalletConnect support

import { motion, AnimatePresence } from 'motion/react';
import { Wallet, LogOut, AlertTriangle, Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/hooks/useWallet';
import useSolanaWallet from '@/hooks/useSolanaWallets';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';

export function WalletButton() {
  const {
    isConnected,
    isConnecting,
    displayAddress,
    displayBalance,
    address,
    chain,
    isWrongNetwork,
    connectMetaMask,
    connectWalletConnect,
    disconnect,
    switchNetwork,
  } = useWallet();

  const [showConnectModal, setShowConnectModal] = useState(false);
  const solana = useSolanaWallet();

  // Copy address to clipboard
  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success('Address copied to clipboard!');
    }
  };

  const handleCopySolAddress = () => {
    if (solana.address) {
      navigator.clipboard.writeText(solana.address);
      toast.success('Solana address copied to clipboard!');
    }
  };

  // Not connected state
  if (!isConnected && !solana.isConnected) {
    return (
      <>
        <Button
          onClick={() => setShowConnectModal(true)}
          disabled={isConnecting}
          className="bg-linear-to-r from-primary to-accent text-white font-bold rounded-full px-6 shadow-lg hover:shadow-xl transition-all"
        >
          <Wallet className="mr-2 w-4 h-4" />
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>

        {/* Wallet Selection Modal */}
        <Dialog open={showConnectModal} onOpenChange={setShowConnectModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-primary flex items-center gap-2">
                <Wallet className="w-6 h-6" />
                Connect Your Wallet
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-3 mt-4">
              {/* MetaMask */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card
                  className="cursor-pointer border-2 border-primary/20 hover:border-primary/60 transition-all"
                  onClick={() => {
                    connectMetaMask();
                    setShowConnectModal(false);
                  }}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-2xl">
                      🦊
                    </div>
                    <div>
                      <p className="font-black text-lg">MetaMask</p>
                      <p className="text-sm text-foreground/60">Connect with MetaMask wallet</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* WalletConnect */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card
                  className="cursor-pointer border-2 border-primary/20 hover:border-primary/60 transition-all"
                  onClick={() => {
                    connectWalletConnect();
                    setShowConnectModal(false);
                  }}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-2xl">
                      🔗
                    </div>
                    <div>
                      <p className="font-black text-lg">WalletConnect</p>
                      <p className="text-sm text-foreground/60">Scan QR with mobile wallet</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Phantom (Solana) */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card
                  className="cursor-pointer border-2 border-primary/20 hover:border-primary/60 transition-all"
                  onClick={() => {
                    solana.connectPhantom();
                    setShowConnectModal(false);
                  }}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-linear-to-br from-violet-400 to-violet-600 rounded-xl flex items-center justify-center text-2xl">
                      👻
                    </div>
                    <div>
                      <p className="font-black text-lg">Phantom</p>
                      <p className="text-sm text-foreground/60">Connect with Phantom (Solana)</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Info */}
              <div className="bg-accent/10 rounded-lg p-3 text-center">
                <p className="text-xs text-foreground/60 font-medium">
                  🔒 Your wallet stays secure. We never store your private keys.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Wrong network warning
  if (isWrongNetwork) {
    return (
      <Button
        onClick={switchNetwork}
        className="bg-linear-to-r from-orange-500 to-red-500 text-white font-bold rounded-full px-6 shadow-lg animate-pulse"
      >
        <AlertTriangle className="mr-2 w-4 h-4" />
        Wrong Network
      </Button>
    );
  }

  // If Solana connected (Phantom), show Solana wallet UI
  if (solana.isConnected && !isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-linear-to-r from-green-500 to-emerald-500 text-white font-bold rounded-full px-6 shadow-lg hover:shadow-xl transition-all">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-white rounded-full mr-2"
            />
            {solana.displayAddress}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-72">
          <DropdownMenuLabel className="text-center pb-3">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-2xl"
                >
                  👻
                </motion.div>
                <span className="text-lg font-black text-primary">Your Solana Wallet</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-xs font-bold text-green-600">Connected to Solana</span>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {/* Balance */}
          <div className="px-2 py-3 bg-linear-to-r from-primary/10 to-accent/10 rounded-lg mx-2 mb-2">
            <p className="text-xs text-foreground/60 font-bold mb-1">Balance</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-black text-primary">{solana.displayBalance}</p>
              <p className="text-sm font-bold text-foreground/60">SOL</p>
            </div>
          </div>

          {/* Address */}
          <div className="px-2 py-2 mx-2 mb-2">
            <p className="text-xs text-foreground/60 font-bold mb-1">Address</p>
            <div className="flex items-center justify-between bg-muted rounded-lg p-2">
              <code className="text-xs font-mono">{solana.displayAddress}</code>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopySolAddress}
                className="h-6 w-6 p-0"
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <DropdownMenuSeparator />

          {/* View on Explorer */}
          <DropdownMenuItem asChild>
            <a
              href={`https://explorer.solana.com/address/${solana.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <span className="text-sm">🔍 View on Explorer</span>
            </a>
          </DropdownMenuItem>

          {/* Disconnect */}
          <DropdownMenuItem onClick={solana.disconnect} className="text-red-600 cursor-pointer">
            <LogOut className="mr-2 w-4 h-4" />
            <span className="font-bold">Disconnect</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Default EVM connected state
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-linear-to-r from-green-500 to-emerald-500 text-white font-bold rounded-full px-6 shadow-lg hover:shadow-xl transition-all">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-white rounded-full mr-2"
          />
          {displayAddress}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel className="text-center pb-3">
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl"
              >
                👛
              </motion.div>
              <span className="text-lg font-black text-primary">Your Wallet</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-xs font-bold text-green-600">Connected to {chain?.name}</span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Balance */}
        <div className="px-2 py-3 bg-linear-to-r from-primary/10 to-accent/10 rounded-lg mx-2 mb-2">
          <p className="text-xs text-foreground/60 font-bold mb-1">Balance</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-black text-primary">{displayBalance}</p>
            <p className="text-sm font-bold text-foreground/60">ETH</p>
          </div>
        </div>

        {/* Address */}
        <div className="px-2 py-2 mx-2 mb-2">
          <p className="text-xs text-foreground/60 font-bold mb-1">Address</p>
          <div className="flex items-center justify-between bg-muted rounded-lg p-2">
            <code className="text-xs font-mono">{displayAddress}</code>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopyAddress}
              className="h-6 w-6 p-0"
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* View on Explorer */}
        <DropdownMenuItem asChild>
          <a
            href={`${chain?.blockExplorers?.default.url}/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <span className="text-sm">🔍 View on Explorer</span>
          </a>
        </DropdownMenuItem>

        {/* Disconnect */}
        <DropdownMenuItem onClick={disconnect} className="text-red-600 cursor-pointer">
          <LogOut className="mr-2 w-4 h-4" />
          <span className="font-bold">Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Compact version for mobile/header
export function WalletButtonCompact() {
  const { isConnected, isConnecting, displayAddress, isWrongNetwork, switchNetwork } = useWallet();
  const solana = useSolanaWallet();
  const [showConnectModal, setShowConnectModal] = useState(false);

  if (!isConnected && !solana.isConnected) {
    return (
      <Button
        size="sm"
        onClick={() => setShowConnectModal(true)}
        disabled={isConnecting}
        className="bg-linear-to-r from-primary to-accent text-white font-bold rounded-full"
      >
        <Wallet className="w-4 h-4" />
      </Button>
    );
  }

  if (isWrongNetwork) {
    return (
      <Button
        size="sm"
        onClick={switchNetwork}
        className="bg-orange-500 text-white rounded-full animate-pulse"
      >
        <AlertTriangle className="w-4 h-4" />
      </Button>
    );
  }

  return (
    solana.isConnected && !isConnected ? (
      <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full border-2 border-green-400">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-xs font-bold text-green-700">{solana.displayAddress}</span>
      </div>
    ) : (
      <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full border-2 border-green-400">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-xs font-bold text-green-700">{displayAddress}</span>
      </div>
    )
  );
}
