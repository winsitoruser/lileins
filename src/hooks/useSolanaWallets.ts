import { useEffect, useState, useCallback } from 'react';

const RPC_ENDPOINT = 'https://api.mainnet-beta.solana.com';
const LAMPORTS_PER_SOL = 1_000_000_000;

declare global {
  interface Window {
    solana?: any;
  }
}

export function useSolanaWallet() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  const displayAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';

  const displayBalance = balance == null ? '—' : `${balance.toFixed(4)}`;

  const fetchBalance = useCallback(
    async (pubkey: string) => {
      try {
        const body = {
          jsonrpc: '2.0',
          id: 1,
          method: 'getBalance',
          params: [pubkey],
        };
        const res = await fetch(RPC_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (data?.result != null) {
          const lamports = data.result.value as number;
          setBalance(lamports / LAMPORTS_PER_SOL);
        }
      } catch (err) {
        console.error('Failed to fetch solana balance', err);
      }
    },
    []
  );

  const connectPhantom = useCallback(async () => {
    if (!window.solana?.isPhantom) {
      window.open('https://phantom.app/', '_blank');
      return;
    }

    try {
      setIsConnecting(true);
      const resp = await window.solana.connect();
      const pubkey = resp?.publicKey?.toString();
      if (pubkey) {
        setAddress(pubkey);
        setIsConnected(true);
        fetchBalance(pubkey);
      }
    } catch (err) {
      console.error('Phantom connect error', err);
    } finally {
      setIsConnecting(false);
    }
  }, [fetchBalance]);

  const disconnect = useCallback(async () => {
    try {
      if (window.solana?.isPhantom && window.solana.disconnect) {
        await window.solana.disconnect();
      }
    } catch (err) {
      console.error('Phantom disconnect error', err);
    } finally {
      setAddress(null);
      setBalance(null);
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    const handleConnect = (pubkeyObj: any) => {
      try {
        const pk = pubkeyObj?.toString ? pubkeyObj.toString() : pubkeyObj;
        setAddress(pk);
        setIsConnected(true);
        if (pk) fetchBalance(pk);
      } catch (e) {
        console.error(e);
      }
    };

    const handleDisconnect = () => {
      setAddress(null);
      setBalance(null);
      setIsConnected(false);
    };

    if (window.solana) {
      window.solana.on?.('connect', handleConnect);
      window.solana.on?.('disconnect', handleDisconnect);
      if (window.solana.isConnected) {
        const pk = window.solana.publicKey?.toString();
        if (pk) handleConnect(pk);
      }
    }

    return () => {
      try {
        window.solana?.removeListener?.('connect', handleConnect);
        window.solana?.removeListener?.('disconnect', handleDisconnect);
      } catch (e) {
        /* ignore */
      }
    };
  }, [fetchBalance]);

  return {
    isConnected,
    isConnecting,
    address,
    displayAddress,
    balance,
    displayBalance,
    connectPhantom,
    disconnect,
  };
}

export default useSolanaWallet;