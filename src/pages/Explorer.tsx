import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Star, Heart, Search, TrendingUp, Droplets, Zap, Package, Users, Activity, Hash, Clock, ArrowRight, Copy, ExternalLink } from "lucide-react";

// Mock blockchain data
const RECENT_TRANSACTIONS = [
  {
    hash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
    from: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
    value: "1,250,000 LILEIN",
    time: "2 mins ago",
    status: "success"
  },
  {
    hash: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e",
    from: "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE",
    to: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    value: "500,000 LILEIN",
    time: "5 mins ago",
    status: "success"
  },
  {
    hash: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f",
    from: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
    to: "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE",
    value: "2,000,000 LILEIN",
    time: "8 mins ago",
    status: "success"
  },
  {
    hash: "0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a",
    from: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
    value: "750,000 LILEIN",
    time: "12 mins ago",
    status: "pending"
  }
];

const RECENT_BLOCKS = [
  {
    number: 15234567,
    hash: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    transactions: 156,
    miner: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    time: "12 secs ago",
    reward: "2.5 LILEIN"
  },
  {
    number: 15234566,
    hash: "0xb2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7",
    transactions: 142,
    miner: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
    time: "24 secs ago",
    reward: "2.5 LILEIN"
  },
  {
    number: 15234565,
    hash: "0xc3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8",
    transactions: 178,
    miner: "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE",
    time: "36 secs ago",
    reward: "2.5 LILEIN"
  }
];

export default function Explorer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"transactions" | "blocks">("transactions");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 relative overflow-hidden">
      {/* Cute Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['🔍', '⛓️', '📦', '⚡', '🚀', '✨', '💜', '🌟'].map((emoji, i) => (
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
                <span className="text-sm font-bold text-secondary">$LILEIN 💜</span>
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
                <Button variant="outline" className="border-2 border-accent/30 font-bold rounded-full hover:bg-accent/10">
                  <Droplets className="mr-1 w-4 h-4 text-accent" />
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
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block text-8xl mb-4"
            >
              🔍
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-black text-primary mb-3">
              EinsChain Explorer ⛓️
            </h1>
            <p className="text-xl text-foreground/70 font-bold max-w-2xl mx-auto">
              Explore transactions, blocks, and addresses on Einstein's blockchain! 🚀✨
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-6 border-white bg-gradient-to-br from-primary/10 to-accent/10 shadow-xl rounded-3xl">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-3">📦</div>
                  <h3 className="text-sm text-foreground/60 font-bold mb-2">Total Blocks</h3>
                  <p className="text-3xl font-black text-primary">15.2M</p>
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
                  <div className="text-5xl mb-3">⚡</div>
                  <h3 className="text-sm text-foreground/60 font-bold mb-2">Total Transactions</h3>
                  <p className="text-3xl font-black text-secondary">2.4B</p>
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
                  <div className="text-5xl mb-3">👥</div>
                  <h3 className="text-sm text-foreground/60 font-bold mb-2">Active Addresses</h3>
                  <p className="text-3xl font-black text-accent">1.2M</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-6 border-white bg-gradient-to-br from-purple-400/10 to-pink-400/10 shadow-xl rounded-3xl">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-3">⏱️</div>
                  <h3 className="text-sm text-foreground/60 font-bold mb-2">Avg Block Time</h3>
                  <p className="text-3xl font-black text-purple-600">12s</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <Card className="border-6 border-white bg-white shadow-xl rounded-3xl">
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-foreground/40" />
                  <Input
                    placeholder="Search by Address / Txn Hash / Block / Token... 🔍"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-14 h-16 text-lg border-4 border-primary/20 rounded-full font-bold"
                  />
                  <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-white font-black rounded-full px-6">
                    Search ✨
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tab Selector */}
          <div className="flex gap-4 mb-6">
            <Button
              onClick={() => setActiveTab("transactions")}
              className={`flex-1 h-14 rounded-full font-black text-lg ${
                activeTab === "transactions"
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-xl border-4 border-white"
                  : "bg-white border-4 border-primary/20 text-foreground hover:bg-primary/5"
              }`}
            >
              <Activity className="mr-2 w-5 h-5" />
              Recent Transactions
            </Button>
            <Button
              onClick={() => setActiveTab("blocks")}
              className={`flex-1 h-14 rounded-full font-black text-lg ${
                activeTab === "blocks"
                  ? "bg-gradient-to-r from-secondary to-accent text-white shadow-xl border-4 border-white"
                  : "bg-white border-4 border-secondary/20 text-foreground hover:bg-secondary/5"
              }`}
            >
              <Package className="mr-2 w-5 h-5" />
              Recent Blocks
            </Button>
          </div>

          {/* Transactions List */}
          {activeTab === "transactions" && (
            <div className="space-y-4">
              {RECENT_TRANSACTIONS.map((tx, index) => (
                <motion.div
                  key={tx.hash}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Card className="border-6 border-white bg-gradient-to-br from-white via-primary/5 to-accent/5 shadow-xl rounded-3xl hover:shadow-2xl transition-all hover:scale-[1.01]">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        {/* Status Icon */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-4 border-white shadow-lg ${
                          tx.status === "success" 
                            ? "bg-gradient-to-br from-green-400 to-emerald-500" 
                            : "bg-gradient-to-br from-yellow-400 to-orange-500"
                        }`}>
                          {tx.status === "success" ? "✅" : "⏳"}
                        </div>

                        {/* Transaction Info */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <Hash className="w-4 h-4 text-primary" />
                            <span className="font-black text-foreground">Txn Hash:</span>
                            <code className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                              {truncateHash(tx.hash)}
                            </code>
                            <button onClick={() => copyToClipboard(tx.hash)} className="text-foreground/60 hover:text-primary">
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                            <div>
                              <span className="text-foreground/60 font-bold">From: </span>
                              <code className="text-xs text-foreground bg-gray-100 px-2 py-1 rounded">{truncateHash(tx.from)}</code>
                            </div>
                            <div>
                              <span className="text-foreground/60 font-bold">To: </span>
                              <code className="text-xs text-foreground bg-gray-100 px-2 py-1 rounded">{truncateHash(tx.to)}</code>
                            </div>
                            <div>
                              <span className="text-foreground/60 font-bold">Value: </span>
                              <span className="font-black text-accent">{tx.value}</span>
                            </div>
                          </div>
                        </div>

                        {/* Time & Status */}
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-1 text-foreground/60 text-sm font-bold">
                            <Clock className="w-4 h-4" />
                            {tx.time}
                          </div>
                          <span className={`px-4 py-1 rounded-full text-xs font-black ${
                            tx.status === "success" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {tx.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Blocks List */}
          {activeTab === "blocks" && (
            <div className="space-y-4">
              {RECENT_BLOCKS.map((block, index) => (
                <motion.div
                  key={block.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Card className="border-6 border-white bg-gradient-to-br from-white via-secondary/5 to-accent/5 shadow-xl rounded-3xl hover:shadow-2xl transition-all hover:scale-[1.01]">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        {/* Block Icon */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-2xl border-4 border-white shadow-lg">
                          📦
                        </div>

                        {/* Block Info */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-secondary" />
                            <span className="font-black text-foreground">Block:</span>
                            <span className="text-xl font-black text-secondary">#{block.number.toLocaleString()}</span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                            <div>
                              <span className="text-foreground/60 font-bold">Hash: </span>
                              <code className="text-xs text-foreground bg-gray-100 px-2 py-1 rounded">{truncateHash(block.hash)}</code>
                            </div>
                            <div>
                              <span className="text-foreground/60 font-bold">Miner: </span>
                              <code className="text-xs text-foreground bg-gray-100 px-2 py-1 rounded">{truncateHash(block.miner)}</code>
                            </div>
                            <div>
                              <span className="text-foreground/60 font-bold">Reward: </span>
                              <span className="font-black text-accent">{block.reward}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Activity className="w-4 h-4 text-primary" />
                              <span className="text-foreground/60 font-bold">Transactions:</span>
                              <span className="font-black text-primary">{block.transactions}</span>
                            </div>
                          </div>
                        </div>

                        {/* Time */}
                        <div className="flex items-center gap-1 text-foreground/60 text-sm font-bold">
                          <Clock className="w-4 h-4" />
                          {block.time}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
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
                  Einstein's Blockchain Explorer
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ✨
                  </motion.span>
                </h3>
                <p className="text-base text-foreground/80 font-bold">
                  EinsChain Explorer provides real-time insights into the Little Einstein blockchain. 
                  Track transactions, monitor blocks, and explore addresses with Einstein's genius-level precision! 🔍⛓️
                </p>
              </div>
            </div>
          </motion.div>
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
                    $LILEIN 💜
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
