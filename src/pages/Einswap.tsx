import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Settings, Zap, TrendingUp, Brain, Beaker, Atom, Info, ChevronDown, Repeat, Rocket, Heart, Star, Droplets, AlertCircle, Clock, CheckCircle, Search, X, ArrowUpDown, Activity, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Link } from "react-router-dom";
import { WalletButton } from "@/components/wallet/WalletButton.tsx";
import { useWallet } from "@/hooks/useWallet.ts";
import { toast } from "sonner";
import HeaderSecond from "@/components/partials/HeaderSecond";

// Token list with cute emojis and price data
const TOKENS = [
  { symbol: "LILEIN", name: "Little Einstein", icon: "👨‍🔬", balance: "1,250,000", color: "from-primary to-accent", price: 0.00042, change24h: 15.8, volume24h: "1.2M" },
  { symbol: "ETH", name: "Ethereum", icon: "💎", balance: "0.5", color: "from-purple-400 to-blue-500", price: 2100, change24h: 2.5, volume24h: "15B" },
  { symbol: "USDC", name: "USD Coin", icon: "💵", balance: "1,000", color: "from-green-400 to-emerald-500", price: 1.0, change24h: 0.01, volume24h: "8B" },
  { symbol: "USDT", name: "Tether", icon: "🪙", balance: "500", color: "from-teal-400 to-cyan-500", price: 1.0, change24h: -0.02, volume24h: "12B" },
  { symbol: "WETH", name: "Wrapped Ether", icon: "🎁", balance: "0.3", color: "from-pink-400 to-rose-500", price: 2100, change24h: 2.5, volume24h: "3B" },
];

// Recent transactions (mock data)
const RECENT_SWAPS = [
  { from: "ETH", to: "LILEIN", amount: "0.5", value: "$1,050", time: "2m ago", status: "success" },
  { from: "USDC", to: "LILEIN", amount: "500", value: "$500", time: "5m ago", status: "success" },
  { from: "LILEIN", to: "ETH", amount: "100,000", value: "$42", time: "8m ago", status: "pending" },
];

export default function Einswap() {
  const { isConnected, address, displayAddress } = useWallet();
  
  const [fromToken, setFromToken] = useState(TOKENS[1]); // ETH
  const [toToken, setToToken] = useState(TOKENS[0]); // LILEIN
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const [showFromTokens, setShowFromTokens] = useState(false);
  const [showToTokens, setShowToTokens] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceImpact, setPriceImpact] = useState(0);

  // Simulated exchange rate
  const exchangeRate = 500000; // 1 ETH = 500,000 LILEIN

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    if (value && !isNaN(parseFloat(value))) {
      const calculated = (parseFloat(value) * exchangeRate).toFixed(2);
      setToAmount(calculated);
    } else {
      setToAmount("");
    }
  };

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first!", {
        description: "You need to connect your wallet to swap tokens"
      });
      return;
    }
    
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    // Calculate price impact
    const impact = calculatePriceImpact(fromAmount);
    if (impact > 10) {
      toast.warning(`High price impact: ${impact.toFixed(2)}%`, {
        description: "Consider reducing your swap amount"
      });
    }
    
    // Handle swap logic here
    toast.success("Swap initiated! 🎉", {
      description: `Swapping ${fromAmount} ${fromToken.symbol} to ${toAmount} ${toToken.symbol}`
    });
    console.log("Swapping:", fromAmount, fromToken.symbol, "to", toToken.symbol);
  };
  
  // Filter tokens based on search
  const filteredTokens = TOKENS.filter(t => 
    t.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate price impact
  const calculatePriceImpact = (amount: string) => {
    const numAmount = parseFloat(amount) || 0;
    if (numAmount > 10) {
      return Math.min(((numAmount - 10) / 100) * 2, 15); // Max 15% impact
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-primary/5 to-accent/5 relative overflow-hidden">
      {/* Cute Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['⚗️', '🧪', '💎', '⚡', '🚀', '✨', '💜', '🌟'].map((emoji, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 5 + i * 1.5,
              repeat: Infinity,
              delay: i * 0.5
            }}
            className="absolute text-6xl"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Cute Header */}
        <HeaderSecond />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="inline-block text-8xl mb-4"
            >
              <img src="/images/pools.png" alt="Pools" className="w-35" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-black text-primary mb-3">
              EinSwap 💜
            </h1>
            <p className="text-xl text-foreground/70 font-bold">
              The cutest way to swap tokens! 🧠✨
            </p>
          </motion.div>

          {/* Swap Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-8 border-white bg-linear-to-br from-white via-primary/5 to-accent/5 shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-8 md:p-10">
                {/* Cute Header */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-center mb-6"
                >
                  <div className="flex justify-center items-center gap-3 mb-3">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-5xl"
                    >
                      ⚗️
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-black text-primary">Swap Magic!</h2>
                    <motion.div
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-5xl"
                    >
                      ✨
                    </motion.div>
                  </div>
                  <p className="text-foreground/70 font-bold">Transform your tokens with Einstein's formula! 🧪</p>
                </motion.div>
                {/* From Token */}
                <div className="bg-linear-to-br from-primary/10 to-accent/10 rounded-3xl p-6 border-4 border-white shadow-xl">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-foreground/60 font-black flex items-center gap-1"><span className="text-xl">💰</span> From</span>
                    <span className="text-sm text-foreground/60 font-bold">
                      Balance: {fromToken.balance}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Input
                      type="number"
                      value={fromAmount}
                      onChange={(e) => handleFromAmountChange(e.target.value)}
                      placeholder="0.0"
                      className="text-3xl font-black bg-transparent border-none text-foreground placeholder-gray-400 focus:ring-0 p-0 h-auto"
                    />
                    <div className="relative">
                      <button
                        onClick={() => setShowFromTokens(!showFromTokens)}
                        className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-accent hover:opacity-90 rounded-full transition-all shadow-lg border-2 border-white"
                      >
                        <span className="text-2xl">{fromToken.icon}</span>
                        <span className="font-black text-white text-lg">{fromToken.symbol}</span>
                        <ChevronDown className="w-5 h-5 text-white" />
                      </button>
                      
                      {/* Token Dropdown */}
                      {showFromTokens && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-full mt-2 right-0 w-72 bg-white border-4 border-primary/20 rounded-3xl overflow-hidden shadow-2xl z-50"
                        >
                          {TOKENS.filter(t => t.symbol !== toToken.symbol).map((token) => (
                            <button
                              key={token.symbol}
                              onClick={() => {
                                setFromToken(token);
                                setShowFromTokens(false);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-colors border-b border-gray-100 last:border-0"
                            >
                              <span className="text-2xl">{token.icon}</span>
                              <div className="flex-1 text-left">
                                <div className="font-black text-foreground">{token.symbol}</div>
                                <div className="text-xs text-foreground/60 font-bold">{token.name}</div>
                              </div>
                              <div className="text-sm text-foreground/60 font-bold">{token.balance}</div>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center -my-2 relative z-10">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSwapTokens}
                    className="w-14 h-14 rounded-full bg-linear-to-br from-primary via-accent to-secondary flex items-center justify-center shadow-2xl border-4 border-white"
                  >
                    <Repeat className="w-5 h-5 text-white" />
                  </motion.button>
                </div>

                {/* To Token */}
                <div className="bg-linear-to-br from-secondary/10 to-accent/10 rounded-3xl p-6 border-4 border-white shadow-xl">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-foreground/60 font-black flex items-center gap-1"><span className="text-xl">🎁</span> To</span>
                    <span className="text-sm text-foreground/60 font-bold">
                      Balance: {toToken.balance}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Input
                      type="number"
                      value={toAmount}
                      readOnly
                      placeholder="0.0"
                      className="text-3xl font-black bg-transparent border-none text-foreground placeholder-gray-400 focus:ring-0 p-0 h-auto"
                    />
                    <div className="relative">
                      <button
                        onClick={() => setShowToTokens(!showToTokens)}
                        className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-secondary to-accent hover:opacity-90 rounded-full transition-all shadow-lg border-2 border-white"
                      >
                        <span className="text-2xl">{toToken.icon}</span>
                        <span className="font-black text-white text-lg">{toToken.symbol}</span>
                        <ChevronDown className="w-5 h-5 text-white" />
                      </button>
                      
                      {/* Token Dropdown */}
                      {showToTokens && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-full mt-2 right-0 w-72 bg-white border-4 border-secondary/20 rounded-3xl overflow-hidden shadow-2xl z-50"
                        >
                          {TOKENS.filter(t => t.symbol !== fromToken.symbol).map((token) => (
                            <button
                              key={token.symbol}
                              onClick={() => {
                                setToToken(token);
                                setShowToTokens(false);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gradient-to-r hover:from-secondary/10 hover:to-accent/10 transition-colors border-b border-gray-100 last:border-0"
                            >
                              <span className="text-2xl">{token.icon}</span>
                              <div className="flex-1 text-left">
                                <div className="font-black text-foreground">{token.symbol}</div>
                                <div className="text-xs text-foreground/60 font-bold">{token.name}</div>
                              </div>
                              <div className="text-sm text-foreground/60 font-bold">{token.balance}</div>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Exchange Rate Info */}
                {fromAmount && toAmount && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-linear-to-br from-yellow-100 to-orange-100 rounded-3xl p-6 border-4 border-white shadow-xl"
                  >
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-foreground/70 font-black flex items-center gap-2">
                        <span className="text-2xl">📈</span>
                        Exchange Rate
                      </span>
                      <span className="text-foreground font-black">
                        1 {fromToken.symbol} = {exchangeRate.toLocaleString()} {toToken.symbol}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-foreground/70 font-black flex items-center gap-2">
                        <span className="text-2xl">⚡</span>
                        Slippage Tolerance
                      </span>
                      <span className="text-foreground font-black">{slippage}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground/70 font-black flex items-center gap-2">
                        <span className="text-2xl">💸</span>
                        Network Fee
                      </span>
                      <span className="text-foreground font-black">~$2.50</span>
                    </div>
                  </motion.div>
                )}

                {/* Swap Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleSwap}
                    disabled={!fromAmount || !toAmount}
                    size="lg"
                    className="w-full bg-linear-to-r mt-5 from-primary via-accent to-secondary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-2xl h-20 rounded-full shadow-2xl border-4 border-white"
                  >
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-3xl mr-2"
                    >
                      ⚗️
                    </motion.span>
                    {fromAmount && toAmount ? "Swap Tokens! 🎉" : "Enter Amount 🧠"}
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-3xl ml-2"
                    >
                      ✨
                    </motion.span>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-8 text-center border-4 border-primary/20 shadow-xl"
            >
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-xl font-black text-primary mb-2">Lightning Fast</h3>
              <p className="text-sm text-foreground/70 font-bold">Instant swaps powered by smart contracts</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl p-8 text-center border-4 border-accent/20 shadow-xl"
            >
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="text-xl font-black text-accent mb-2">Secure</h3>
              <p className="text-sm text-foreground/70 font-bold">Non-custodial, you control your funds</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-3xl p-8 text-center border-4 border-secondary/20 shadow-xl"
            >
              <div className="text-4xl mb-3">💎</div>
              <h3 className="text-xl font-black text-secondary mb-2">Best Rates</h3>
              <p className="text-sm text-foreground/70 font-bold">Optimized routing for best prices</p>
            </motion.div>
          </div>

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 rounded-3xl p-8 border-4 border-white shadow-xl"
          >
            <div className="flex items-start gap-4">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex-shrink-0 w-16 h-16"
              >
                <img 
                  src="https://cdn.hercules.app/file_M4JirWbGZiXJPCbh2GIEp7ys" 
                  alt="Little Einstein" 
                  className="w-full h-full object-contain drop-shadow-xl"
                />
              </motion.div>
              <div>
                <h3 className="text-2xl font-black text-primary mb-3 flex items-center gap-2">
                  Einstein's Smart Routing
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ✨
                  </motion.span>
                </h3>
                <p className="text-base text-foreground/80 font-bold">
                  EinSwap uses advanced algorithms to find the best exchange rates across multiple liquidity pools, 
                  ensuring you get the most $Einz for your tokens. E=mc² efficiency!
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Cute Footer with Lab Theme */}
        <footer className="relative z-10 bg-card/80 backdrop-blur-md border-t-4 border-primary/20 mt-20 overflow-hidden">
          {/* Lab Equipment Background in Footer */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            {[...Array(6)].map((_, i) => {
              const icons = ["🧪", "⚗️", "🔬", "⚛️", "🧬", "💜"];
              return (
                <motion.div
                  key={`footer-lab-${i}`}
                  animate={{
                    y: [0, -30, 0],
                    rotate: [0, 360],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    delay: i
                  }}
                  className="absolute text-6xl"
                  style={{
                    left: `${10 + i * 15}%`,
                    top: `${Math.random() * 100}%`
                  }}
                >
                  {icons[i]}
                </motion.div>
              );
            })}
          </div>
          
          <div className="container mx-auto px-4 py-12 relative z-10">
            <div className="text-center space-y-6">
              <motion.div 
                whileHover={{ scale: 1.08, y: -5 }}
                className="inline-flex items-center gap-4 mb-4"
              >
                <div className="relative">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.15, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 relative z-10"
                  >
                    <img 
                      src="https://cdn.hercules.app/file_M4JirWbGZiXJPCbh2GIEp7ys" 
                      alt="Little Einstein" 
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  </motion.div>
                  {/* Glow effect */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary rounded-full blur-2xl"
                  />
                </div>
                <div className="text-left">
                  <h3 className="text-3xl font-black text-primary flex items-center gap-2">
                    Little Einstein
                    <motion.span
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-4xl"
                    >
                      ✨
                    </motion.span>
                  </h3>
                  <p className="text-lg text-secondary font-black flex items-center gap-2">
                    $Einz 💜
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 5, repeat: Infinity }}
                      className="text-xl"
                    >
                      ⚛️
                    </motion.span>
                  </p>
                </div>
              </motion.div>
              
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto font-medium">
                The cutest genius meme token revolutionizing crypto with community-driven innovation! 🧪✨
              </p>
              
              <div className="flex justify-center gap-4 py-6">
                {["Twitter", "Telegram", "Discord"].map((platform, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button className="rounded-full border-4 border-primary/30 bg-white hover:bg-primary/10 font-bold shadow-lg text-foreground">
                      {platform}
                    </Button>
                  </motion.div>
                ))}
              </div>
              
              <div className="border-t-4 border-primary/20 pt-8">
                <p className="text-foreground/60 font-medium text-lg">
                  © {new Date().getFullYear()} Little Einstein 💜 All rights reserved.
                </p>
                <p className="text-foreground/50 text-sm mt-2">
                  Made with 💜 and genius-level cuteness!
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
