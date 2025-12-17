import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Search, TrendingUp, Droplets, Zap, Plus, ArrowRight, BarChart3, LineChart, PieChart } from "lucide-react";
import HeaderSecond from "@/components/partials/HeaderSecond";

// Mock pool data
const POOLS = [
  {
    id: 1,
    token0: { symbol: "LILEIN", icon: "👨‍🔬", name: "Little Einstein" },
    token1: { symbol: "ETH", icon: "💎", name: "Ethereum" },
    tvl: "$2.5M",
    volume24h: "$450K",
    apr: "125%",
    yourLiquidity: "$0",
    color: "from-purple-400 to-blue-500"
  },
  {
    id: 2,
    token0: { symbol: "LILEIN", icon: "👨‍🔬", name: "Little Einstein" },
    token1: { symbol: "USDC", icon: "💵", name: "USD Coin" },
    tvl: "$1.8M",
    volume24h: "$320K",
    apr: "98%",
    yourLiquidity: "$0",
    color: "from-green-400 to-emerald-500"
  },
  {
    id: 3,
    token0: { symbol: "LILEIN", icon: "👨‍🔬", name: "Little Einstein" },
    token1: { symbol: "USDT", icon: "🪙", name: "Tether" },
    tvl: "$1.2M",
    volume24h: "$180K",
    apr: "85%",
    yourLiquidity: "$0",
    color: "from-teal-400 to-cyan-500"
  },
  {
    id: 4,
    token0: { symbol: "ETH", icon: "💎", name: "Ethereum" },
    token1: { symbol: "USDC", icon: "💵", name: "USD Coin" },
    tvl: "$5.2M",
    volume24h: "$1.2M",
    apr: "45%",
    yourLiquidity: "$0",
    color: "from-blue-400 to-green-500"
  },
];

export default function Pools() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChart, setSelectedChart] = useState<"tvl" | "volume" | "fees">("tvl");

  const filteredPools = POOLS.filter(pool => 
    pool.token0.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pool.token1.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock chart data (7 days)
  const chartData = {
    tvl: [8.2, 8.5, 9.1, 9.8, 10.2, 10.5, 10.7],
    volume: [1.5, 1.8, 2.1, 2.3, 1.9, 2.0, 2.15],
    fees: [4.5, 5.4, 6.3, 6.9, 5.7, 6.0, 6.45]
  };
  
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
        <HeaderSecond />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block text-8xl mb-4"
            >
              💧
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-black text-primary mb-3">
              Liquidity Pools 🌊
            </h1>
            <p className="text-xl text-foreground/70 font-bold max-w-2xl mx-auto">
              Provide liquidity and earn rewards! The genius way to grow your tokens! 💎✨
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-6 border-white bg-gradient-to-br from-primary/10 to-accent/10 shadow-xl rounded-3xl">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-3">💰</div>
                  <h3 className="text-sm text-foreground/60 font-bold mb-2">Total Value Locked</h3>
                  <p className="text-3xl font-black text-primary">$10.7M</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-6 border-white bg-gradient-to-br from-secondary/10 to-accent/10 shadow-xl rounded-3xl">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-3">📊</div>
                  <h3 className="text-sm text-foreground/60 font-bold mb-2">24h Volume</h3>
                  <p className="text-3xl font-black text-secondary">$2.15M</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-6 border-white bg-gradient-to-br from-accent/10 to-primary/10 shadow-xl rounded-3xl">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-3">🎁</div>
                  <h3 className="text-sm text-foreground/60 font-bold mb-2">Active Pools</h3>
                  <p className="text-3xl font-black text-accent">{POOLS.length}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Analytics Charts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <Card className="border-6 border-white bg-white shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                {/* Chart Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <h2 className="text-3xl font-black text-primary flex items-center gap-2 mb-2">
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        📊
                      </motion.span>
                      Analytics Dashboard
                    </h2>
                    <p className="text-foreground/60 font-bold">Track pool performance over time! 📈</p>
                  </div>
                  
                  {/* Chart Type Selector */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setSelectedChart("tvl")}
                      className={`rounded-full font-bold ${
                        selectedChart === "tvl"
                          ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg border-2 border-white"
                          : "bg-white border-2 border-primary/20 text-foreground hover:bg-primary/5"
                      }`}
                    >
                      <BarChart3 className="mr-1 w-4 h-4" />
                      TVL
                    </Button>
                    <Button
                      onClick={() => setSelectedChart("volume")}
                      className={`rounded-full font-bold ${
                        selectedChart === "volume"
                          ? "bg-gradient-to-r from-secondary to-accent text-white shadow-lg border-2 border-white"
                          : "bg-white border-2 border-secondary/20 text-foreground hover:bg-secondary/5"
                      }`}
                    >
                      <LineChart className="mr-1 w-4 h-4" />
                      Volume
                    </Button>
                    <Button
                      onClick={() => setSelectedChart("fees")}
                      className={`rounded-full font-bold ${
                        selectedChart === "fees"
                          ? "bg-gradient-to-r from-accent to-primary text-white shadow-lg border-2 border-white"
                          : "bg-white border-2 border-accent/20 text-foreground hover:bg-accent/5"
                      }`}
                    >
                      <PieChart className="mr-1 w-4 h-4" />
                      Fees
                    </Button>
                  </div>
                </div>

                {/* Chart Display */}
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 border-4 border-white shadow-inner">
                  <div className="flex items-end justify-between h-64 gap-2">
                    {chartData[selectedChart].map((value, index) => {
                      const maxValue = Math.max(...chartData[selectedChart]);
                      const heightPercent = (value / maxValue) * 100;
                      
                      return (
                        <motion.div
                          key={index}
                          initial={{ height: 0 }}
                          animate={{ height: `${heightPercent}%` }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className="flex-1 flex flex-col items-center gap-2"
                        >
                          <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            className={`w-full rounded-t-2xl relative group cursor-pointer ${
                              selectedChart === "tvl"
                                ? "bg-gradient-to-t from-primary to-accent"
                                : selectedChart === "volume"
                                ? "bg-gradient-to-t from-secondary to-accent"
                                : "bg-gradient-to-t from-accent to-primary"
                            } shadow-lg`}
                            style={{ height: "100%" }}
                          >
                            {/* Tooltip on Hover */}
                            <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-xl shadow-xl border-2 border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              <p className="text-xs font-bold text-foreground/60">{days[index]}</p>
                              <p className="text-lg font-black text-primary">
                                ${value.toFixed(2)}M
                              </p>
                            </div>
                            
                            {/* Emoji on top of bar */}
                            <motion.div
                              animate={{ 
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.2, 1]
                              }}
                              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                              className="absolute -top-8 left-1/2 -translate-x-1/2 text-3xl"
                            >
                              {selectedChart === "tvl" ? "💰" : selectedChart === "volume" ? "📊" : "💎"}
                            </motion.div>
                          </motion.div>
                          
                          {/* Day Label */}
                          <span className="text-xs font-bold text-foreground/60 mt-2">
                            {days[index]}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  {/* Chart Footer Info */}
                  <div className="mt-8 pt-6 border-t-4 border-white flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${
                        selectedChart === "tvl"
                          ? "bg-gradient-to-r from-primary to-accent"
                          : selectedChart === "volume"
                          ? "bg-gradient-to-r from-secondary to-accent"
                          : "bg-gradient-to-r from-accent to-primary"
                      }`}></div>
                      <span className="text-sm font-bold text-foreground/70">
                        7 Day {selectedChart === "tvl" ? "TVL" : selectedChart === "volume" ? "Volume" : "Fees"} Trend
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-foreground/60 font-bold">Current Value</p>
                      <p className="text-2xl font-black text-primary">
                        ${chartData[selectedChart][chartData[selectedChart].length - 1].toFixed(2)}M
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <Card className="border-6 border-white bg-white shadow-xl rounded-3xl">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1 w-full relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                    <Input
                      placeholder="Search pools by token..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-14 text-lg border-4 border-primary/20 rounded-full font-bold"
                    />
                  </div>
                  <Link to="/pool/new">
                    <Button size="lg" className="bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-white font-black rounded-full px-8 shadow-xl border-4 border-white">
                      <Plus className="mr-2 w-5 h-5" />
                      Create Pool 🎉
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pool List */}
          <div className="space-y-4">
            {filteredPools.map((pool, index) => (
              <motion.div
                key={pool.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Card className="border-6 border-white bg-gradient-to-br from-white via-primary/5 to-accent/5 shadow-xl rounded-3xl hover:shadow-2xl transition-all hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      {/* Token Pair */}
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <div className="flex items-center -space-x-3">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl border-4 border-white shadow-lg">
                            {pool.token0.icon}
                          </div>
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-3xl border-4 border-white shadow-lg">
                            {pool.token1.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-foreground">
                            {pool.token0.symbol}/{pool.token1.symbol}
                          </h3>
                          <p className="text-sm text-foreground/60 font-bold">Genius Pool 💜</p>
                        </div>
                      </div>

                      {/* Pool Stats */}
                      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                        <div>
                          <p className="text-xs text-foreground/60 font-bold mb-1 flex items-center gap-1">
                            <Droplets className="w-3 h-3" />
                            TVL
                          </p>
                          <p className="text-lg font-black text-primary">{pool.tvl}</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/60 font-bold mb-1 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Volume 24h
                          </p>
                          <p className="text-lg font-black text-secondary">{pool.volume24h}</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/60 font-bold mb-1 flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            APR
                          </p>
                          <p className="text-lg font-black text-accent">{pool.apr}</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/60 font-bold mb-1">Your Liquidity</p>
                          <p className="text-lg font-black text-foreground/40">{pool.yourLiquidity}</p>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Link to={`/pool/${pool.id}`}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button className={`bg-gradient-to-r ${pool.color} hover:opacity-90 text-white font-black rounded-full px-6 shadow-lg border-2 border-white`}>
                            Add Liquidity
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </motion.div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPools.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-8xl mb-4">🔍</div>
              <h3 className="text-2xl font-black text-foreground/60 mb-2">No pools found</h3>
              <p className="text-foreground/40 font-bold">Try adjusting your search</p>
            </motion.div>
          )}
        </div>

        {/* Cute Footer with Lab Theme */}
        <footer className="relative z-10 bg-card/80 backdrop-blur-md border-t-4 border-primary/20 mt-20 overflow-hidden">
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
