// Custom Hook for Wallet Management
// Handles connection, disconnection, balance, and network switching

import { useAccount, useConnect, useDisconnect, useBalance, useSwitchChain } from 'wagmi';
import { useEffect, useState } from 'react';
import { formatAddress, formatBalance, isCorrectNetwork, BASE_MAINNET } from '@/lib/web3-config';
import { toast } from 'sonner';

export function useWallet() {
  const { address, isConnected, chain, chainId } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);

  // Get ETH balance
  const { data: ethBalance, isLoading: isLoadingBalance } = useBalance({
    address,
  });

  // Check if on correct network
  useEffect(() => {
    if (isConnected && chainId) {
      const correctNetwork = isCorrectNetwork(chainId);
      setIsWrongNetwork(!correctNetwork);
      
      if (!correctNetwork) {
        toast.error('Please switch to BASE network', {
          description: 'Little Einstein requires BASE L2',
          action: {
            label: 'Switch Network',
            onClick: () => handleSwitchNetwork(),
          },
        });
      }
    }
  }, [isConnected, chainId]);

  // Connect to wallet
  const handleConnect = async (connectorId?: string) => {
    try {
      const connector = connectorId
        ? connectors.find((c) => c.id === connectorId)
        : connectors[0]; // Default to first connector (usually MetaMask)

      if (!connector) {
        toast.error('Wallet connector not found');
        return;
      }

      connect({ connector });
    } catch (error) {
      console.error('Wallet connection error:', error);
      toast.error('Failed to connect wallet', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  // Connect with MetaMask
  const connectMetaMask = () => {
    const metamaskConnector = connectors.find((c) => c.id === 'metaMask' || c.name.includes('MetaMask'));
    if (metamaskConnector) {
      connect({ connector: metamaskConnector });
    } else {
      toast.error('MetaMask not found', {
        description: 'Please install MetaMask extension',
        action: {
          label: 'Install',
          onClick: () => window.open('https://metamask.io/download/', '_blank'),
        },
      });
    }
  };

  // Connect with WalletConnect
  const connectWalletConnect = () => {
    const walletConnectConnector = connectors.find((c) => c.id === 'walletConnect');
    if (walletConnectConnector) {
      connect({ connector: walletConnectConnector });
    } else {
      toast.error('WalletConnect not available');
    }
  };

  // Disconnect wallet
  const handleDisconnect = () => {
    disconnect();
    toast.success('Wallet disconnected');
  };

  // Switch to BASE network
  const handleSwitchNetwork = async () => {
    if (!switchChain) {
      toast.error('Network switching not supported by this wallet');
      return;
    }

    try {
      await switchChain({ chainId: BASE_MAINNET.chainId });
      toast.success('Switched to BASE network');
    } catch (error) {
      console.error('Network switch error:', error);
      toast.error('Failed to switch network', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  // Format address for display
  const displayAddress = address ? formatAddress(address) : '';

  // Format balance for display
  const displayBalance = ethBalance
    ? formatBalance(ethBalance.value, ethBalance.decimals)
    : '0';

  return {
    // Wallet state
    address,
    displayAddress,
    isConnected,
    isConnecting,
    chain,
    chainId,
    isWrongNetwork,

    // Balance
    ethBalance: ethBalance?.value,
    displayBalance,
    isLoadingBalance,

    // Connection methods
    connect: handleConnect,
    connectMetaMask,
    connectWalletConnect,
    disconnect: handleDisconnect,

    // Network management
    switchNetwork: handleSwitchNetwork,

    // Available connectors
    connectors,
  };
}

// Hook for token balance (LILEIN)
export function useTokenBalance(tokenAddress?: string) {
  const { address } = useAccount();
  const [balance, setBalance] = useState<bigint>(BigInt(0));
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Implement token balance fetching with contract read
  // This will require the actual LILEIN token contract address

  useEffect(() => {
    if (address && tokenAddress) {
      // Placeholder for token balance fetching
      setIsLoading(true);
      // Fetch balance from contract
      setTimeout(() => {
        setBalance(BigInt(0)); // Mock data
        setIsLoading(false);
      }, 1000);
    }
  }, [address, tokenAddress]);

  return {
    balance,
    displayBalance: formatBalance(balance, 18),
    isLoading,
  };
}
