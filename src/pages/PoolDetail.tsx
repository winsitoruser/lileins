import { motion } from "motion/react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Star, Heart, ArrowLeft, Zap, Plus, Minus, Info, TrendingUp, Droplets } from "lucide-react";

// Mock pool data
const POOL_DATA: Record<string, any> = {
  "1": {
    token0: { symbol: "LILEIN", icon: "👨‍🔬", name: "Little Einstein", balance: "1,250,000" },
    token1: { symbol: "ETH", icon: "💎", name: "Ethereum", balance: "0.5" },
    tvl: "$2.5M",
    volume24h: "$450K",
    apr: "125%",
    yourLiquidity: "$0",
    poolShare: "0%",
    color: "from-purple-400 to-blue-500"
  }
};

export default function PoolDetail() {
  const { id } = useParams();
  const pool = POOL_DATA[id || "1"] || POOL_DATA["1"];
  
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [amount0, setAmount0] = useState("");
  const [amount1, setAmount1] = useState("");

  // Simulated price ratio
  const priceRatio = 500000; // 1 ETH = 500,000 LILEIN

  const handleAmount0Change = (value: string) => {
    setAmount0(value);
    if (value && !isNaN(parseFloat(value))) {
      setAmount1((parseFloat(value) / priceRatio).toFixed(6));
    } else {
      setAmount1("");
    }
  };

  const handleAmount1Change = (value: string) => {
    setAmount1(value);
    if (value && !isNaN(parseFloat(value))) {
      setAmount0((parseFloat(value) * priceRatio).toFixed(2));
    } else {
      setAmount0("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 relative overflow-hidden">
      {/* Cute Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['💧', '🌊', '💎', '⚡', '🚀', '✨', '💜', '🌟'].map((emoji, i) => (
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
        <nav className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-full shadow-xl border-4 border-primary/20 px-6 py-3 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12">
                <img 
                  src="https://cdn.hercules.app/file_M4JirWbGZiXJPCbh2GIEp7ys" 
                  alt="Little Einstein" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-black text-primary">Little Einstein</span>
                <span className="text-sm font-bold text-secondary">$Einz 💜</span>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <Link to="/einswap">
                <Button variant="outline" className="border-2 border-accent/30 font-bold rounded-full hover:bg-accent/10">
                  <Zap className="mr-1 w-4 h-4 text-accent" />
                  Swap
                </Button>
              </Link>
              <Link to="/pools">
                <Button className="bg-linear-to-r from-primary via-accent to-secondary text-white font-bold rounded-full shadow-lg border-2 border-white">
                  <Droplets className="mr-1 w-4 h-4" />
                  Pools
                </Button>
              </Link>
              <Link to="/staking">
                <Button variant="outline" className="border-2 border-secondary/30 font-bold rounded-full hover:bg-secondary/10">
                  <Star className="mr-1 w-4 h-4 text-secondary" />
                  Staking
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="border-2 border-primary/30 font-bold rounded-full hover:bg-primary/10">
                  <Heart className="mr-1 w-4 h-4 fill-primary text-primary" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Back Button */}
          <Link to="/pools">
            <motion.div whileHover={{ x: -5 }} className="mb-6">
              <Button variant="outline" className="border-2 border-primary/30 font-bold rounded-full">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Pools
              </Button>
            </motion.div>
          </Link>

          {/* Pool Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex items-center -space-x-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-5xl border-4 border-white shadow-xl">
                  {pool.token0.icon}
                </div>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-5xl border-4 border-white shadow-xl">
                  {pool.token1.icon}
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-primary mb-2">
              {pool.token0.symbol}/{pool.token1.symbol} Pool
            </h1>
            <p className="text-lg text-foreground/70 font-bold">
              Add liquidity and earn {pool.apr} APR! 💰✨
            </p>
          </motion.div>

          {/* Pool Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-4 border-white bg-gradient-to-br from-primary/10 to-accent/10 shadow-lg rounded-2xl">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-foreground/60 font-bold mb-1">TVL</p>
                <p className="text-2xl font-black text-primary">{pool.tvl}</p>
              </CardContent>
            </Card>
            <Card className="border-4 border-white bg-gradient-to-br from-secondary/10 to-accent/10 shadow-lg rounded-2xl">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-foreground/60 font-bold mb-1">Volume 24h</p>
                <p className="text-2xl font-black text-secondary">{pool.volume24h}</p>
              </CardContent>
            </Card>
            <Card className="border-4 border-white bg-gradient-to-br from-accent/10 to-primary/10 shadow-lg rounded-2xl">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-foreground/60 font-bold mb-1">APR</p>
                <p className="text-2xl font-black text-accent">{pool.apr}</p>
              </CardContent>
            </Card>
          </div>

          {/* Mode Selector */}
          <div className="flex gap-4 mb-6">
            <Button
              onClick={() => setMode("add")}
              className={`flex-1 h-14 rounded-full font-black text-lg ${
                mode === "add"
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-xl border-4 border-white"
                  : "bg-white border-4 border-primary/20 text-foreground hover:bg-primary/5"
              }`}
            >
              <Plus className="mr-2 w-5 h-5" />
              Add Liquidity
            </Button>
            <Button
              onClick={() => setMode("remove")}
              className={`flex-1 h-14 rounded-full font-black text-lg ${
                mode === "remove"
                  ? "bg-gradient-to-r from-secondary to-accent text-white shadow-xl border-4 border-white"
                  : "bg-white border-4 border-secondary/20 text-foreground hover:bg-secondary/5"
              }`}
            >
              <Minus className="mr-2 w-5 h-5" />
              Remove Liquidity
            </Button>
          </div>

          {/* Add/Remove Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-8 border-white bg-gradient-to-br from-white via-primary/5 to-accent/5 shadow-2xl rounded-3xl">
              <CardContent className="p-8">
                {mode === "add" ? (
                  <div className="space-y-6">
                    {/* Token 0 Input */}
                    <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-6 border-4 border-white shadow-xl">
                      <div className="flex justify-between mb-3">
                        <span className="text-sm text-foreground/60 font-black flex items-center gap-1">
                          <span className="text-xl">💰</span> {pool.token0.symbol}
                        </span>
                        <span className="text-sm text-foreground/60 font-bold">
                          Balance: {pool.token0.balance}
                        </span>
                      </div>
                      <div className="flex gap-3 items-center">
                        <span className="text-4xl">{pool.token0.icon}</span>
                        <Input
                          type="number"
                          value={amount0}
                          onChange={(e) => handleAmount0Change(e.target.value)}
                          placeholder="0.0"
                          className="text-3xl font-black bg-transparent border-none text-foreground placeholder-gray-400 focus:ring-0 p-0 h-auto"
                        />
                      </div>
                    </div>

                    {/* Plus Icon */}
                    <div className="flex justify-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary via-accent to-secondary flex items-center justify-center shadow-xl border-4 border-white">
                        <Plus className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Token 1 Input */}
                    <div className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-3xl p-6 border-4 border-white shadow-xl">
                      <div className="flex justify-between mb-3">
                        <span className="text-sm text-foreground/60 font-black flex items-center gap-1">
                          <span className="text-xl">🎁</span> {pool.token1.symbol}
                        </span>
                        <span className="text-sm text-foreground/60 font-bold">
                          Balance: {pool.token1.balance}
                        </span>
                      </div>
                      <div className="flex gap-3 items-center">
                        <span className="text-4xl">{pool.token1.icon}</span>
                        <Input
                          type="number"
                          value={amount1}
                          onChange={(e) => handleAmount1Change(e.target.value)}
                          placeholder="0.0"
                          className="text-3xl font-black bg-transparent border-none text-foreground placeholder-gray-400 focus:ring-0 p-0 h-auto"
                        />
                      </div>
                    </div>

                    {/* Info Box */}
                    {amount0 && amount1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-6 border-4 border-white shadow-xl"
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-black text-foreground/70 flex items-center gap-2">
                              <TrendingUp className="w-4 h-4" />
                              Price
                            </span>
                            <span className="text-sm font-black text-foreground">
                              1 {pool.token1.symbol} = {priceRatio.toLocaleString()} {pool.token0.symbol}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-black text-foreground/70 flex items-center gap-2">
                              <Droplets className="w-4 h-4" />
                              Pool Share
                            </span>
                            <span className="text-sm font-black text-foreground">
                              ~0.01%
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Add Button */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        disabled={!amount0 || !amount1}
                        size="lg"
                        className="w-full bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-2xl h-20 rounded-full shadow-2xl border-4 border-white"
                      >
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-3xl mr-2"
                        >
                          💧
                        </motion.span>
                        {amount0 && amount1 ? "Add Liquidity! 🎉" : "Enter Amounts 🧠"}
                        <motion.span
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="text-3xl ml-2"
                        >
                          ✨
                        </motion.span>
                      </Button>
                    </motion.div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center py-12">
                      <div className="text-8xl mb-4">🚧</div>
                      <h3 className="text-2xl font-black text-foreground/60 mb-3">
                        Remove Liquidity
                      </h3>
                      <p className="text-foreground/50 font-bold mb-6">
                        You don't have any liquidity in this pool yet!
                      </p>
                      <Button
                        onClick={() => setMode("add")}
                        className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold rounded-full px-8"
                      >
                        Add Liquidity First
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 rounded-3xl p-6 border-4 border-white shadow-xl"
          >
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-black text-primary mb-2">
                  How Liquidity Pools Work 💡
                </h3>
                <p className="text-sm text-foreground/80 font-bold">
                  When you add liquidity, you'll receive LP tokens representing your share of the pool. 
                  You earn trading fees (0.3%) proportional to your share. The more liquidity you provide, 
                  the more rewards you earn! 🎉💰
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 bg-card/80 backdrop-blur-md border-t-4 border-primary/20 mt-20 overflow-hidden">
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
                  </p>
                </div>
              </motion.div>
              
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto font-medium">
                The cutest genius meme token revolutionizing crypto! 🧪✨
              </p>
              
              <div className="border-t-4 border-primary/20 pt-8">
                <p className="text-foreground/60 font-medium text-lg">
                  © {new Date().getFullYear()} Little Einstein 💜 All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
