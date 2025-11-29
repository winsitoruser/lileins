import { motion } from "motion/react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { SignInButton } from "@/components/ui/signin.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useState } from "react";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import {
  Coins,
  TrendingUp,
  Clock,
  Gift,
  Rocket,
  Sparkles,
  Users,
  Lock,
  Unlock,
  FlaskConical,
  Atom,
  Shield,
  Zap,
  Target,
  Trophy,
  ChevronDown,
  Calculator,
  Gauge,
  PiggyBank,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Id } from "@/convex/_generated/dataModel.d.ts";

const STAKING_OPTIONS = [
  { days: 30, apy: 12, emoji: "🌱", label: "Starter", color: "from-green-400 to-emerald-500" },
  { days: 90, apy: 24, emoji: "🚀", label: "Growth", color: "from-blue-400 to-cyan-500" },
  { days: 180, apy: 36, emoji: "💎", label: "Diamond", color: "from-purple-400 to-pink-500" },
  { days: 365, apy: 50, emoji: "🌟", label: "Einstein", color: "from-yellow-400 to-orange-500" },
];

const BENEFITS = [
  {
    icon: TrendingUp,
    emoji: "📈",
    title: "High Returns",
    description: "Earn up to 50% APY with our Einstein tier staking program",
  },
  {
    icon: Shield,
    emoji: "🛡️",
    title: "Secure & Safe",
    description: "Smart contracts audited and secured by blockchain technology",
  },
  {
    icon: Zap,
    emoji: "⚡",
    title: "Instant Rewards",
    description: "Rewards calculated in real-time and claimable anytime",
  },
  {
    icon: PiggyBank,
    emoji: "💰",
    title: "Passive Income",
    description: "Earn rewards 24/7 while holding your tokens",
  },
  {
    icon: Unlock,
    emoji: "🔓",
    title: "Flexible Unstaking",
    description: "Unstake anytime and receive your tokens plus rewards",
  },
  {
    icon: Users,
    emoji: "👥",
    title: "Community Growth",
    description: "Join thousands of Einstein stakers earning together",
  },
];

const FAQS = [
  {
    question: "What is staking?",
    answer:
      "Staking is the process of locking your $LILEIN tokens for a specific period to earn rewards. It's like a savings account where you deposit tokens and earn interest (APY) on them.",
  },
  {
    question: "How do I start staking?",
    answer:
      "Simply connect your wallet, choose your preferred staking duration (30, 90, 180, or 365 days), enter the amount of $LILEIN tokens you want to stake, and click 'Stake Tokens'. Your rewards will start accumulating immediately!",
  },
  {
    question: "Can I unstake before the duration ends?",
    answer:
      "Yes! You can unstake your tokens anytime. However, staking for the full duration ensures you maximize your rewards according to the APY tier you selected.",
  },
  {
    question: "How are rewards calculated?",
    answer:
      "Rewards are calculated based on your staked amount, the APY of your chosen tier, and the time elapsed. The formula is: Rewards = (Staked Amount × APY × Days Elapsed) / 365. Rewards compound in real-time!",
  },
  {
    question: "What are the different staking tiers?",
    answer:
      "We offer 4 tiers: Starter (30 days, 12% APY), Growth (90 days, 24% APY), Diamond (180 days, 36% APY), and Einstein (365 days, 50% APY). Longer durations offer higher returns!",
  },
  {
    question: "Can I have multiple stakes?",
    answer:
      "Absolutely! You can create as many stakes as you want with different amounts and durations. Each stake is tracked separately with its own rewards.",
  },
  {
    question: "Is my stake secure?",
    answer:
      "Yes! All stakes are secured by smart contracts on the blockchain. Your tokens remain in your control and can be unstaked at any time. We don't have custody of your funds.",
  },
  {
    question: "When can I claim my rewards?",
    answer:
      "You can claim your rewards anytime! Rewards accumulate every second and can be claimed without unstaking. Or, you can unstake to receive both your original tokens and all accumulated rewards.",
  },
];

function FAQItem({ faq, index }: { faq: { question: string; answer: string }; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="border-4 border-primary/20 bg-white shadow-lg hover:shadow-xl transition-all">
        <CardContent className="p-6">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex justify-between items-center text-left"
          >
            <h3 className="text-lg md:text-xl font-black text-primary pr-4">{faq.question}</h3>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <ChevronDown className="w-6 h-6 text-primary" />
            </motion.div>
          </button>
          <motion.div
            initial={false}
            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-foreground/70 font-medium leading-relaxed mt-4">{faq.answer}</p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function StakingPageInner() {
  const stakes = useQuery(api.stakes.getUserStakes, {});
  const stats = useQuery(api.stakes.getStakingStats, {});
  const createStake = useMutation(api.stakes.createStake);
  const unstakeMutation = useMutation(api.stakes.unstake);
  const claimRewards = useMutation(api.stakes.claimRewards);

  const [stakeAmount, setStakeAmount] = useState<string>("1000");
  const [selectedDuration, setSelectedDuration] = useState<number>(90);
  const [isStaking, setIsStaking] = useState(false);

  // Calculator state
  const [calcAmount, setCalcAmount] = useState<string>("5000");
  const [calcDuration, setCalcDuration] = useState<number>(90);

  const handleStake = async () => {
    const amount = parseFloat(stakeAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsStaking(true);
    try {
      await createStake({ amount, duration: selectedDuration });
      toast.success(`Successfully staked ${amount} $LILEIN tokens! 🎉`);
      setStakeAmount("1000");
    } catch (error) {
      if (error instanceof ConvexError) {
        const { message } = error.data as { code: string; message: string };
        toast.error(`Error: ${message}`);
      } else {
        toast.error("Failed to stake tokens");
      }
    } finally {
      setIsStaking(false);
    }
  };

  const handleUnstake = async (stakeId: Id<"stakes">) => {
    try {
      const result = await unstakeMutation({ stakeId });
      toast.success(
        `Successfully unstaked! You received ${result.total.toFixed(2)} $LILEIN (${result.amount.toFixed(2)} staked + ${result.rewards.toFixed(2)} rewards) 💰`
      );
    } catch (error) {
      if (error instanceof ConvexError) {
        const { message } = error.data as { code: string; message: string };
        toast.error(`Error: ${message}`);
      } else {
        toast.error("Failed to unstake tokens");
      }
    }
  };

  const handleClaim = async (stakeId: Id<"stakes">) => {
    try {
      const rewards = await claimRewards({ stakeId });
      toast.success(`Successfully claimed ${rewards.toFixed(2)} $LILEIN rewards! 🎉`);
    } catch (error) {
      if (error instanceof ConvexError) {
        const { message } = error.data as { code: string; message: string };
        toast.error(`Error: ${message}`);
      } else {
        toast.error("Failed to claim rewards");
      }
    }
  };

  const calculateProjectedRewards = (amount: number, duration: number) => {
    const option = STAKING_OPTIONS.find((o) => o.days === duration);
    if (!option) return 0;
    return (amount * option.apy * (duration / 365)) / 100;
  };

  const projectedRewards = calculateProjectedRewards(
    parseFloat(stakeAmount) || 0,
    selectedDuration
  );

  // Calculator calculations
  const calcOption = STAKING_OPTIONS.find((o) => o.days === calcDuration);
  const calcRewards = calculateProjectedRewards(parseFloat(calcAmount) || 0, calcDuration);
  const calcTotal = (parseFloat(calcAmount) || 0) + calcRewards;
  const calcDailyRewards = calcRewards / calcDuration;

  const activeStakes = stakes?.filter((s) => s.isActive) || [];
  const inactiveStakes = stakes?.filter((s) => !s.isActive) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 via-background to-primary/10 relative overflow-hidden">
      {/* Enhanced Scientific Laboratory Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Beakers and Lab Equipment */}
        {[...Array(12)].map((_, i) => {
          const equipments = ["🧪", "⚗️", "🔬", "⚛️", "🧬", "💧", "🌡️", "⚖️"];
          return (
            <motion.div
              key={`equipment-${i}`}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                rotate: [0, 360],
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 8 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
              className="absolute text-3xl md:text-5xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              {equipments[i % equipments.length]}
            </motion.div>
          );
        })}

        {/* Floating Formulas */}
        {["E=mc²", "a²+b²=c²", "π≈3.14", "∑F=ma", "√x²+y²", "∫dx", "∂f/∂x", "Δx·Δp≥ℏ/2"].map(
          (formula, i) => (
            <motion.div
              key={`formula-${i}`}
              animate={{
                y: [0, -150, 0],
                x: [0, Math.random() * 80 - 40, 0],
                rotate: [0, 360],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 12 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
              className="absolute text-xl md:text-4xl font-black text-primary/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              {formula}
            </motion.div>
          )
        )}

        {/* Bubbles with Chemical Reactions */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            animate={{
              y: [0, -150, 0],
              x: [0, Math.random() * 60 - 30, 0],
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute rounded-full bg-gradient-to-br from-accent/30 to-secondary/30 border-2 border-primary/20"
            style={{
              width: `${20 + Math.random() * 80}px`,
              height: `${20 + Math.random() * 80}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Glowing Atoms */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`atom-${i}`}
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 360],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg" />
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 bg-gradient-to-r from-card/90 via-primary/5 to-accent/5 backdrop-blur-md border-b-4 border-primary/30 shadow-xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo */}
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.08, y: -3 }}
                className="flex items-center gap-4 cursor-pointer"
              >
                <div className="relative">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="w-14 h-14 md:w-16 md:h-16 relative z-10"
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
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl"
                  />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-primary flex items-center gap-2">
                    Little Einstein
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ✨
                    </motion.span>
                  </h1>
                  <p className="text-sm md:text-lg text-secondary font-black">Staking Portal 💜</p>
                </div>
              </motion.div>
            </Link>

            {/* Navigation Menu */}
            <nav className="flex items-center gap-2 md:gap-6">
              <Link to="/">
                <motion.div
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 rounded-full font-black text-sm md:text-base text-primary hover:bg-primary/10 transition-all"
                >
                  🏠 Home
                </motion.div>
              </Link>
              <Link to="/staking">
                <motion.div
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 rounded-full font-black text-sm md:text-base bg-primary/20 text-primary transition-all"
                >
                  🔬 Staking
                </motion.div>
              </Link>
              <a href="/#tokenomics">
                <motion.div
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 rounded-full font-black text-sm md:text-base text-primary hover:bg-primary/10 transition-all"
                >
                  📊 Tokenomics
                </motion.div>
              </a>
              <a href="/#roadmap">
                <motion.div
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 rounded-full font-black text-sm md:text-base text-primary hover:bg-primary/10 transition-all"
                >
                  🗺️ Roadmap
                </motion.div>
              </a>
            </nav>

            {/* Back Button */}
            <Link to="/">
              <Button className="bg-gradient-to-r from-primary to-accent hover:scale-110 transition-all text-white font-black rounded-full px-6 md:px-10 py-4 md:py-6 shadow-2xl border-4 border-white/70">
                ← Back
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="inline-block text-6xl md:text-8xl mb-4"
          >
            🔬
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-balance mb-4">
            <span className="text-primary">Stake</span> Your{" "}
            <span className="text-secondary">$LILEIN</span> 🧪
          </h1>
          <p className="text-lg md:text-2xl text-foreground/70 font-bold max-w-2xl mx-auto">
            Earn genius-level rewards by staking your Little Einstein tokens! 💎
          </p>
        </motion.div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              label: "Total Staked",
              value: stats ? `${stats.totalStaked.toLocaleString()} $LILEIN` : "Loading...",
              icon: Lock,
              emoji: "💰",
              gradient: "from-yellow-400 to-orange-500",
            },
            {
              label: "Total Rewards",
              value: stats ? `${stats.totalRewards.toFixed(2)} $LILEIN` : "Loading...",
              icon: Gift,
              emoji: "🎁",
              gradient: "from-pink-400 to-rose-500",
            },
            {
              label: "Active Stakers",
              value: stats ? `${stats.activeStakers}` : "Loading...",
              icon: Users,
              emoji: "👥",
              gradient: "from-purple-400 to-indigo-500",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="border-6 border-white bg-gradient-to-br from-white to-primary/5 shadow-2xl overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-10`} />
                <CardContent className="p-6 text-center relative z-10">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    className="text-5xl mb-3"
                  >
                    {stat.emoji}
                  </motion.div>
                  <p className="text-sm text-foreground/60 font-bold mb-2">{stat.label}</p>
                  <p className="text-xl md:text-2xl font-black text-primary">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Advanced Staking Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="border-8 border-white bg-gradient-to-br from-white via-primary/5 to-accent/5 shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-50" />
            <CardHeader className="relative z-10">
              <CardTitle className="text-3xl md:text-5xl font-black text-center flex items-center justify-center gap-3">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  🧮
                </motion.span>
                Advanced Staking Calculator
              </CardTitle>
              <p className="text-center text-foreground/70 font-bold mt-2">
                Calculate your potential earnings before you stake! 📊
              </p>
            </CardHeader>
            <CardContent className="p-6 md:p-8 relative z-10">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left: Input Section */}
                <div className="space-y-6">
                  <div>
                    <label className="text-lg font-black text-foreground flex items-center gap-2 mb-3">
                      <Calculator className="w-5 h-5 text-primary" />
                      Staking Amount ($LILEIN)
                    </label>
                    <div className="relative">
                      <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                      <Input
                        type="number"
                        value={calcAmount}
                        onChange={(e) => setCalcAmount(e.target.value)}
                        placeholder="5000"
                        className="text-2xl font-black text-center h-16 rounded-2xl border-4 border-primary/30 bg-white shadow-xl pl-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-lg font-black text-foreground flex items-center gap-2 mb-3">
                      <Clock className="w-5 h-5 text-primary" />
                      Select Duration
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {STAKING_OPTIONS.map((option) => (
                        <motion.button
                          key={option.days}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setCalcDuration(option.days)}
                          className={`rounded-xl p-4 border-4 shadow-lg transition-all ${
                            calcDuration === option.days
                              ? "border-primary bg-gradient-to-br " +
                                option.color +
                                " text-white"
                              : "border-primary/20 bg-white hover:border-primary/40"
                          }`}
                        >
                          <p className="text-2xl mb-1">{option.emoji}</p>
                          <p className="font-black text-sm">{option.days}d</p>
                          <p className="text-xs opacity-80">{option.apy}% APY</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Results Section */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-accent/20 to-secondary/20 rounded-2xl p-6 border-4 border-white shadow-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Gauge className="w-5 h-5 text-primary" />
                      <p className="text-sm font-bold text-foreground/70">Selected Plan</p>
                    </div>
                    <p className="text-3xl font-black text-primary mb-1">
                      {calcOption?.label} 🌟
                    </p>
                    <p className="text-lg font-bold text-foreground/70">
                      {calcDuration} Days • {calcOption?.apy}% APY
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-2xl p-6 border-4 border-white shadow-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <p className="text-sm font-bold text-foreground/70">Total Rewards</p>
                    </div>
                    <motion.p
                      key={calcRewards}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-4xl font-black text-green-600 mb-1"
                    >
                      +{calcRewards.toFixed(2)} $LILEIN
                    </motion.p>
                    <p className="text-sm font-bold text-foreground/60">
                      ~{calcDailyRewards.toFixed(2)} $LILEIN per day
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-6 border-4 border-white shadow-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Trophy className="w-5 h-5 text-primary" />
                      <p className="text-sm font-bold text-foreground/70">Final Value</p>
                    </div>
                    <motion.p
                      key={calcTotal}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-4xl font-black text-primary"
                    >
                      {calcTotal.toFixed(2)} $LILEIN
                    </motion.p>
                    <p className="text-sm font-bold text-green-600 mt-2">
                      +{((calcRewards / (parseFloat(calcAmount) || 1)) * 100).toFixed(1)}% Gain
                      🚀
                    </p>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mt-6 text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 border-2 border-primary/20"
              >
                <p className="text-sm text-foreground/70 font-bold">
                  💡 Tip: Longer staking periods = Higher APY = More rewards!
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Why Choose Staking Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block text-6xl mb-4"
            >
              💎
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
              Why Stake with Little Einstein? 🧪
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 font-bold max-w-3xl mx-auto">
              Join the smartest community in crypto and earn rewards with our genius-level staking
              program!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="border-4 border-primary/20 bg-white shadow-xl h-full">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                      className="text-6xl mb-4"
                    >
                      {benefit.emoji}
                    </motion.div>
                    <h3 className="text-xl font-black text-primary mb-3">{benefit.title}</h3>
                    <p className="text-foreground/70 font-medium leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Staking Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-8 border-white bg-gradient-to-br from-white via-primary/5 to-accent/5 shadow-2xl mb-12">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl font-black text-center flex items-center justify-center gap-3">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  ⚛️
                </motion.span>
                Start Staking Now
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              {/* Amount Input */}
              <div className="mb-8">
                <label className="text-xl font-black text-foreground flex items-center gap-2 mb-3">
                  <span className="text-3xl">💰</span>
                  Enter Amount to Stake ($LILEIN)
                </label>
                <div className="relative">
                  <Coins className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
                  <Input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="1000"
                    className="text-2xl md:text-3xl font-black text-center h-16 md:h-20 rounded-2xl border-4 border-primary/30 bg-white shadow-xl pl-16 pr-6"
                  />
                </div>
              </div>

              {/* Duration Options */}
              <div className="mb-8">
                <label className="text-xl font-black text-foreground flex items-center gap-2 mb-4">
                  <span className="text-3xl">⏰</span>
                  Select Staking Duration
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {STAKING_OPTIONS.map((option) => (
                    <motion.div
                      key={option.days}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedDuration(option.days)}
                      className={`cursor-pointer rounded-2xl p-6 border-4 shadow-lg transition-all ${
                        selectedDuration === option.days
                          ? "border-primary bg-gradient-to-br " + option.color + " text-white"
                          : "border-primary/20 bg-white hover:border-primary/40"
                      }`}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-4xl text-center mb-2"
                      >
                        {option.emoji}
                      </motion.div>
                      <p className="text-center font-black text-lg mb-1">{option.label}</p>
                      <p className="text-center text-2xl font-black mb-1">{option.days} Days</p>
                      <p className="text-center text-sm font-bold opacity-80">{option.apy}% APY</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Projected Rewards */}
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 border-4 border-primary/20 mb-6"
              >
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground/70 mb-2">
                    Projected Rewards After {selectedDuration} Days
                  </p>
                  <motion.p
                    key={projectedRewards}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl md:text-5xl font-black text-primary"
                  >
                    +{projectedRewards.toFixed(2)} $LILEIN
                  </motion.p>
                  <p className="text-sm text-foreground/60 font-medium mt-2">
                    Total:{" "}
                    {((parseFloat(stakeAmount) || 0) + projectedRewards).toFixed(2)} $LILEIN
                  </p>
                </div>
              </motion.div>

              {/* Stake Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleStake}
                  disabled={isStaking}
                  className="w-full bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-white font-black text-xl md:text-2xl h-16 md:h-20 rounded-full shadow-2xl border-4 border-white"
                >
                  {isStaking ? (
                    <>
                      <FlaskConical className="mr-2 w-6 h-6 animate-spin" />
                      Staking...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 w-6 h-6" />
                      Stake Tokens 🚀
                    </>
                  )}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Active Stakes */}
        {activeStakes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-6 flex items-center gap-3">
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                🔒
              </motion.span>
              Your Active Stakes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeStakes.map((stake, i) => {
                const option = STAKING_OPTIONS.find((o) => o.days === stake.duration);
                const endTime = stake.startTime + stake.duration * 24 * 60 * 60 * 1000;
                const daysRemaining = Math.max(
                  0,
                  Math.ceil((endTime - Date.now()) / (1000 * 60 * 60 * 24))
                );

                return (
                  <motion.div
                    key={stake._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="border-6 border-white bg-gradient-to-br from-white to-primary/5 shadow-2xl">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <motion.span
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="text-4xl"
                            >
                              {option?.emoji}
                            </motion.span>
                            <div>
                              <p className="text-lg font-black text-primary">{option?.label}</p>
                              <p className="text-sm text-foreground/60 font-bold">
                                {stake.apy}% APY
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-black text-primary">
                              {stake.amount.toFixed(2)}
                            </p>
                            <p className="text-xs text-foreground/60 font-bold">$LILEIN</p>
                          </div>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between items-center bg-accent/10 rounded-xl p-3">
                            <span className="text-sm font-bold text-foreground/70">
                              Rewards Earned
                            </span>
                            <span className="text-lg font-black text-secondary">
                              +{stake.rewards.toFixed(4)} $LILEIN
                            </span>
                          </div>
                          <div className="flex justify-between items-center bg-primary/10 rounded-xl p-3">
                            <span className="text-sm font-bold text-foreground/70">
                              Days Remaining
                            </span>
                            <span className="text-lg font-black text-primary">
                              {daysRemaining} days
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            onClick={() => handleClaim(stake._id)}
                            variant="secondary"
                            className="font-black rounded-xl"
                          >
                            <Gift className="mr-2 w-4 h-4" />
                            Claim
                          </Button>
                          <Button
                            onClick={() => handleUnstake(stake._id)}
                            className="bg-gradient-to-r from-primary to-accent text-white font-black rounded-xl"
                          >
                            <Unlock className="mr-2 w-4 h-4" />
                            Unstake
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Inactive Stakes */}
        {inactiveStakes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-black text-foreground/60 mb-6 flex items-center gap-3">
              <Unlock className="w-6 h-6" />
              Completed Stakes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inactiveStakes.map((stake, i) => {
                const option = STAKING_OPTIONS.find((o) => o.days === stake.duration);
                return (
                  <motion.div
                    key={stake._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="border-2 border-foreground/10 bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl opacity-50">{option?.emoji}</span>
                          <p className="text-sm font-bold text-foreground/60">{option?.label}</p>
                        </div>
                        <p className="text-lg font-black text-foreground/70">
                          {stake.amount.toFixed(2)} $LILEIN
                        </p>
                        <p className="text-xs text-foreground/50">
                          Rewards: +{stake.rewards.toFixed(4)}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="inline-block text-6xl mb-4"
            >
              ❓
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
              Frequently Asked Questions 🤔
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 font-bold max-w-3xl mx-auto">
              Got questions? We've got answers! Find everything you need to know about staking.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="border-8 border-white bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 shadow-2xl p-8 md:p-12">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl mb-6"
            >
              🚀
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-black text-primary mb-4">
              Ready to Start Earning? 💰
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 font-bold mb-8 max-w-2xl mx-auto">
              Join thousands of Einstein stakers and start earning genius-level rewards today!
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-white font-black text-xl md:text-2xl px-12 h-16 md:h-20 rounded-full shadow-2xl border-4 border-white"
              >
                <Sparkles className="mr-2 w-6 h-6" />
                Stake Now 🧪
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default function Staking() {
  return (
    <>
      <Unauthenticated>
        <div className="min-h-screen bg-gradient-to-br from-accent/20 via-background to-primary/10 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Card className="border-8 border-white bg-gradient-to-br from-white to-primary/10 shadow-2xl p-8 md:p-12 max-w-md">
              <motion.div
                animate={{
                  rotate: [0, 8, -8, 0],
                  y: [0, -10, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-8xl mb-6"
              >
                🔬
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
                Welcome Einstein! 🧪
              </h2>
              <p className="text-lg text-foreground/70 font-bold mb-8">
                Please sign in to access the staking portal and start earning rewards!
              </p>
              <SignInButton>
                <Button className="bg-gradient-to-r from-primary to-accent text-white font-black text-xl px-10 py-6 rounded-full shadow-xl">
                  <Sparkles className="mr-2 w-5 h-5" />
                  Sign In
                </Button>
              </SignInButton>
            </Card>
          </motion.div>
        </div>
      </Unauthenticated>
      <AuthLoading>
        <div className="min-h-screen bg-gradient-to-br from-accent/20 via-background to-primary/10 flex items-center justify-center p-4">
          <div className="space-y-4 w-full max-w-4xl">
            <Skeleton className="h-32 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </AuthLoading>
      <Authenticated>
        <StakingPageInner />
      </Authenticated>
    </>
  );
}
