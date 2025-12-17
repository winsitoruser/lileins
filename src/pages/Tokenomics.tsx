import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Star, Heart, Search, TrendingUp, Droplets, Zap, Package, Users, Activity, Hash, Clock, ArrowRight, Copy, ExternalLink } from "lucide-react";
import HeaderSecond from "@/components/partials/HeaderSecond";

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

export default function Tokenomics() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"transactions" | "blocks">("transactions");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-primary/5 to-accent/5 relative overflow-hidden">
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
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block text-8xl mb-4"
            >
              📊
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-black text-primary mb-3">
              Tokenomics 🧪
            </h1>
            <p className="text-xl text-foreground/70 font-bold max-w-2xl mx-auto">
              The 20 Billion Blueprint: Engineered for Longevity. 🚀✨
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-6 border-white bg-linear-to-br from-primary/10 to-accent/10 shadow-xl rounded-3xl">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-3">📈</div>
                  <h3 className="text-sm text-foreground/60 font-bold mb-2">Total Supply</h3>
                  <p className="text-3xl font-black text-primary">20B Einz</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-6 border-white bg-linear-to-br from-secondary/10 to-accent/10 shadow-xl rounded-3xl">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-3">🎉</div>
                  <h3 className="text-sm text-foreground/60 font-bold mb-2">Presale</h3>
                  <p className="text-3xl font-black text-secondary">25%</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-6 border-white bg-linear-to-br from-accent/10 to-primary/10 shadow-xl rounded-3xl">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-3">💎</div>
                  <h3 className="text-sm text-foreground/60 font-bold mb-2">Staking/Rewards</h3>
                  <p className="text-3xl font-black text-accent">20%</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-6 border-white bg-linear-to-br from-purple-400/10 to-pink-400/10 shadow-xl rounded-3xl">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-3">🔒</div>
                  <h3 className="text-sm text-foreground/60 font-bold mb-2">Liquidity & CEX</h3>
                  <p className="text-3xl font-black text-purple-600">22%</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
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
