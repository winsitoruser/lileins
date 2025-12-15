import { motion, useScroll, useTransform } from "motion/react";
import { Atom, Beaker, Brain, Calculator, FlaskConical, Heart, Rocket, SparklesIcon, Star, Users, Zap, X, Droplets, Search, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { WalletButton } from "@/components/wallet/WalletButton.tsx";
import { useWallet } from "@/hooks/useWallet.ts";
import * as animations from "@/lib/animations.ts";

export default function Index() {
  const [raised, setRaised] = useState(2847500);
  const target = 5000000;
  const progress = (raised / target) * 100;
  const [countdown, setCountdown] = useState({
    days: 15,
    hours: 7,
    minutes: 32,
    seconds: 45
  });
  const [investmentAmount, setInvestmentAmount] = useState<string>("1000");
  const [showMoonCalculator, setShowMoonCalculator] = useState(false);
  const [moonInvestment, setMoonInvestment] = useState<string>("100");
  const [targetPrice, setTargetPrice] = useState<number>(1.0); // Dynamic target price

  // Calculator multipliers
  const currentMultiplier = 2.38; // 238% up
  const targetMultiplier = 10; // 10x target

  const calculateValues = (amount: string) => {
    const numAmount = parseFloat(amount) || 0;
    return {
      current: (numAmount * currentMultiplier).toFixed(2),
      target: (numAmount * targetMultiplier).toFixed(2)
    };
  };

  const calculatedValues = calculateValues(investmentAmount);

  // Moon Calculator - Projection with dynamic target
  const presalePrice = 0.00042; // Current presale price

  const calculateMoonProjection = (investment: string, targetPriceValue: number) => {
    const amount = parseFloat(investment) || 0;
    const tokensReceived = amount / presalePrice;
    const valueAtTarget = tokensReceived * targetPriceValue;
    const multiplier = targetPriceValue / presalePrice;
    const profit = valueAtTarget - amount;
    const roi = ((profit / amount) * 100);

    return {
      investment: amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      tokens: tokensReceived.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      valueAtTarget: valueAtTarget.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      multiplier: multiplier.toFixed(0),
      profit: profit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      roi: roi.toFixed(0)
    };
  };

  const moonProjection = calculateMoonProjection(moonInvestment, targetPrice);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const bounceAnimation = {
    initial: { scale: 0, rotate: -180 },
    whileInView: { scale: 1, rotate: 0 },
    viewport: { once: true },
    transition: { type: "spring" as const, stiffness: 200, damping: 15 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 via-background to-primary/10 relative overflow-hidden">
      {/* Scientific Laboratory Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Einstein Formulas */}
        {[
          "E=mc²", "a²+b²=c²", "π=3.14", "∑F=ma",
          "√x²+y²", "∫dx", "∂f/∂x", "α+β=γ",
          "E=hv", "PV=nRT", "F=G(m₁m₂/r²)", "λ=h/p"
        ].map((formula, i) => (
          <motion.div
            key={`formula-${i}`}
            animate={{
              y: [0, -150, 0],
              x: [0, Math.random() * 80 - 40, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
            className="absolute text-xl md:text-3xl font-black text-primary/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            {formula}
          </motion.div>
        ))}

        {/* Cute Floating Bubbles - Lab Style */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            animate={{
              y: [0, -120, 0],
              x: [0, Math.random() * 60 - 30, 0],
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute rounded-full bg-gradient-to-br from-accent/40 to-secondary/40 border-2 border-primary/20"
            style={{
              width: `${20 + Math.random() * 60}px`,
              height: `${20 + Math.random() * 60}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}

        {/* Lab Equipment Icons */}
        {[...Array(10)].map((_, i) => {
          const icons = ["🧪", "⚗️", "🔬", "⚛️", "🧬"];
          return (
            <motion.div
              key={`lab-${i}`}
              animate={{
                y: [0, -80, 0],
                rotate: [0, 360],
                scale: [1, 1.4, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 8 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 4
              }}
              className="absolute text-4xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            >
              {icons[i % icons.length]}
            </motion.div>
          );
        })}

        {/* DNA Helix Animation */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`dna-${i}`}
            animate={{
              y: [0, -200, 0],
              rotate: [0, 720],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              delay: i * 3
            }}
            className="absolute text-6xl"
            style={{
              left: `${20 + i * 30}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            🧬
          </motion.div>
        ))}

        {/* Cute Stars & Hearts */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
            className="absolute text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            {i % 3 === 0 ? "⭐" : i % 3 === 1 ? "💜" : "✨"}
          </motion.div>
        ))}

        {/* Atomic Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`atom-${i}`}
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
              scale: [1, 1.2, 0.8, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Simple Clean Header */}
      <header className="relative z-10 bg-white/95 backdrop-blur-sm border-b border-primary/10 shadow-sm sticky top-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12">
                <img
                  src="https://cdn.hercules.app/file_M4JirWbGZiXJPCbh2GIEp7ys"
                  alt="Little Einstein"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-black text-primary">Little Einstein</h1>
                <p className="text-xs font-bold text-secondary">$Einz</p>
              </div>
            </Link>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/einswap" className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors flex items-center gap-1">
                <Beaker className="w-4 h-4" />
                EinSwap
              </Link>
              <Link to="/pools" className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors flex items-center gap-1">
                <Droplets className="w-4 h-4" />
                Pools
              </Link>
              <Link to="/explorer" className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors flex items-center gap-1">
                <Search className="w-4 h-4" />
                Explorer
              </Link>
              <Link to="/staking" className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors">
                Staking
              </Link>
              <a href="#tokenomics" className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors">
                Tokenomics
              </a>
              <a href="#roadmap" className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors">
                Roadmap
              </a>
            </nav>

            {/* Connect Wallet / Account Button */}
            <WalletButton />
          </div>
        </div>
      </header>

      {/* Hero Section - Super Cute! */}
      <section className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={animations.fadeInUp}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div
              animate={animations.subtlePulse}
              className="inline-block"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-primary to-accent text-white rounded-full font-bold text-sm shadow-xl border-4 border-white/50">
                <Zap className="w-5 h-5 fill-white" />
                PRESALE LIVE NOW! 🚀
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black text-balance leading-tight">
              $Einz: The Smart
              <span className="text-primary block mt-2 relative">
                Utility Token
                <motion.span
                  animate={{ rotate: [0, 20, -20, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                  className="inline-block ml-2"
                >
                  🧪
                </motion.span>
              </span>
            </h1>

            {/* <h1 className="text-5xl md:text-7xl font-black text-balance leading-tight">
              The Cutest
              <span className="text-primary block mt-2 relative">
                Genius Token!
                <motion.span
                  animate={{ rotate: [0, 20, -20, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                  className="inline-block ml-2"
                >
                  🧪
                </motion.span>
              </span>
            </h1> */}

            <p className="text-2xl text-foreground/70 text-balance font-medium">
              $little Einstein ($Einz) is a next-generation token powering a revolutionary Smart Utility Layer. We combine the speed of Swap, the earning potential of Staking, and the transparency of Explorer to create the most reliable and rewarding crypto ecosystem. 💜
            </p>

            <motion.div
              variants={animations.fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <motion.div
                whileHover={animations.buttonHover}
                whileTap={animations.buttonTap}
              >
                <Button size="lg" className="bg-linear-to-r from-primary to-accent hover:opacity-90 text-white font-black text-xl px-10 h-16 rounded-full shadow-2xl border-4 border-white/50">
                  <Rocket className="mr-2 w-6 h-6" />
                  Buy $Einz 🎉
                </Button>
              </motion.div>
              <motion.div
                whileHover={animations.buttonHover}
                whileTap={animations.buttonTap}
              >
                <Button size="lg" className="border-4 border-primary/30 hover:bg-primary/10 text-xl h-16 px-10 rounded-full font-bold bg-white shadow-xl text-foreground">
                  <Heart className="mr-2 w-6 h-6 fill-primary text-primary" />
                  Join Community
                </Button>
              </motion.div>
            </motion.div>

            {/* <motion.div
              variants={animations.staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex gap-6 pt-6"
            >
              {[
                { label: "Raised", value: "$2.8M+", emoji: "💰" },
                { label: "Holders", value: "12K+", emoji: "👥" },
                { label: "Cuteness", value: "100%", emoji: "🥰" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={animations.staggerItem}
                  whileHover={animations.hoverLift}
                  className="bg-white rounded-3xl p-4 shadow-xl border-4 border-primary/20 cursor-pointer"
                >
                  <p className="text-3xl font-black text-primary">{stat.value}</p>
                  <p className="text-sm text-foreground/60 font-bold">{stat.label} {stat.emoji}</p>
                </motion.div>
              ))}
            </motion.div> */}
          </motion.div>

          <motion.div
            variants={animations.scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.15, 1]
              }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-primary/40 via-accent/40 to-secondary/40 rounded-full blur-3xl"
            />

            {/* Floating Einstein Formulas Around Characters */}
            {["E=mc²", "π=3.14", "a²+b²", "∑F=ma"].map((formula, i) => (
              <motion.div
                key={`hero-formula-${i}`}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 360],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
                className="absolute text-2xl md:text-4xl font-black text-primary/50"
                style={{
                  left: i % 2 === 0 ? "-10%" : "100%",
                  top: `${20 + i * 15}%`
                }}
              >
                {formula}
              </motion.div>
            ))}

            {/* Main Einstein Characters Circle */}
            <div className="relative z-10 grid grid-cols-2 gap-6 max-w-lg mx-auto">
              {[
                { img: "https://cdn.hercules.app/file_1DNbhR6KrSldPZ6E5VvTyuZF", emoji: "💎", lab: "⚗️" },
                { img: "https://cdn.hercules.app/file_qh9lQO74hZOTlAORAm770ptM", emoji: "📈", lab: "🔬" },
                { img: "https://cdn.hercules.app/file_PNjYB0sYpNm2eBwQ9LkZHS7T", emoji: "🔥", lab: "🧪" },
                { img: "https://cdn.hercules.app/file_MzK2FlqYRQ1s1N9BUUg8QpEB", emoji: "🚀", lab: "⚛️" }
              ].map(({ img, emoji, lab }, i) => (
                <motion.div
                  key={i}
                  animate={animations.floatingAnimation}
                  transition={{
                    duration: 2.5 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                  whileHover={animations.hoverScale}
                  className="relative group cursor-pointer"
                >
                  <div className="bg-white rounded-3xl p-3 border-6 border-primary/30 shadow-2xl overflow-hidden relative">
                    <img src={img} alt="" className="w-full h-full object-cover rounded-2xl" />
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 20, -20, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-2 -right-2 text-4xl"
                    >
                      {emoji}
                    </motion.div>
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        y: [0, -10, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                      className="absolute -bottom-2 -left-2 text-3xl"
                    >
                      {lab}
                    </motion.div>
                  </div>
                  {/* Cute glow */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-3xl blur-xl -z-10"
                  />
                </motion.div>
              ))}
            </div>

            {/* Lab Equipment & Formulas floating around */}
            {[...Array(6)].map((_, i) => {
              const elements = ["🧬", "⚛️", "💜", "✨", "🔬", "⚗️"];
              return (
                <motion.div
                  key={`hero-float-${i}`}
                  animate={{
                    y: [0, -40, 0],
                    x: [0, Math.random() * 30 - 15, 0],
                    rotate: [0, 360],
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                  className="absolute text-4xl"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`
                  }}
                >
                  {elements[i]}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Einstein to the Moon - Profit Section */}
      <motion.section
        {...animations.scrollFadeIn}
        className="relative z-10 container mx-auto px-4 py-20"
      >
        <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-3xl p-8 md:p-16 border-8 border-white shadow-2xl overflow-hidden relative">
          {/* Space Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Stars */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`space-star-${i}`}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}

            {/* Planets */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`planet-${i}`}
                animate={{
                  y: [0, -50, 0],
                  rotate: [0, 360],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 15 + i * 5,
                  repeat: Infinity,
                  delay: i * 2
                }}
                className="absolute text-6xl"
                style={{
                  left: `${10 + i * 25}%`,
                  top: `${Math.random() * 80}%`
                }}
              >
                {["🪐", "⭐", "💫", "🌟"][i]}
              </motion.div>
            ))}

            {/* Flying Astronaut Trail */}
            <motion.div
              animate={{
                x: ["-20%", "120%"],
                y: [80, -80, 80],
                rotate: [0, 360]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-1/2"
            >
              <img
                src="https://cdn.hercules.app/file_GdU16Deo5WW9TBkLtZB03gTC"
                alt="Flying Einstein"
                className="w-16 h-16 opacity-40"
              />
            </motion.div>
          </div>

          <div className="relative z-10">
            {/* Title with Astronaut Einstein */}
            <div className="text-center mb-12 relative">
              {/* Flying Astronaut Einstein */}
              <motion.div
                animate={{
                  y: [0, -30, 0],
                  x: [0, 20, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="inline-block mb-8"
              >
                <div className="relative">
                  <motion.img
                    src="https://cdn.hercules.app/file_GdU16Deo5WW9TBkLtZB03gTC"
                    alt="Einstein Astronaut"
                    className="w-64 md:w-80 mx-auto drop-shadow-2xl"
                    animate={{
                      filter: ["drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))", "drop-shadow(0 0 40px rgba(168, 85, 247, 0.8))", "drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))"]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {/* Rocket boost effect */}
                  <motion.div
                    initial={{ rotate: 33 }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6],
                      rotate: 33,
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute bottom-0 left-87 -translate-x-1/2 text-6xl"
                  >
                    💨
                  </motion.div>

                </div>
              </motion.div>

              {/* Moon decoration */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-0 right-10 text-6xl hidden md:block"
              >
                🌙
              </motion.div>

              <h2 className="text-5xl md:text-7xl font-black text-balance mb-4">
                <span className="text-primary">Einstein</span> to the <span className="text-secondary">Moon!</span> 🚀
              </h2>
              <p className="text-2xl md:text-3xl text-foreground/80 font-bold max-w-3xl mx-auto">
                Smart tokenomics designed for sustainable growth. Join the genius community! 📈💎
              </p>
            </div>

            {/* Calculator Modal (Hidden Trigger) */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="hidden">
                  <Button>Open Calculator</Button>
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white via-primary/5 to-accent/5 border-4 border-primary/30">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-center mb-4"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="inline-block text-5xl mb-3"
                      >
                        🧮
                      </motion.div>
                      <h3 className="text-3xl md:text-4xl font-black text-primary mb-2">
                        Profit Calculator
                      </h3>
                      <p className="text-base text-foreground/70 font-bold">
                        Calculate your genius gains! 💎
                      </p>
                    </motion.div>
                  </DialogTitle>
                </DialogHeader>

                {/* Input Section */}
                <div className="space-y-6 mb-8">
                  <div className="space-y-3">
                    <label className="text-xl font-black text-foreground flex items-center gap-2">
                      <span className="text-3xl">💰</span>
                      Enter Your Investment Amount ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-black text-primary">
                        $
                      </span>
                      <Input
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        placeholder="1000"
                        className="text-3xl font-black text-center h-20 rounded-2xl border-4 border-primary/30 bg-white shadow-xl pl-12 pr-6"
                      />
                    </div>
                  </div>
                </div>

                {/* Results Display */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Current Value Card */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gradient-to-br from-accent/20 to-accent/10 rounded-3xl p-6 border-4 border-white shadow-xl"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-5xl mb-3 text-center"
                    >
                      📈
                    </motion.div>
                    <p className="text-center text-sm text-foreground/60 font-bold mb-2">
                      Current Value (238% Up!)
                    </p>
                    <motion.div
                      key={calculatedValues.current}
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-4xl font-black text-center text-accent"
                    >
                      ${calculatedValues.current}
                    </motion.div>
                    <div className="mt-3 bg-gradient-to-r from-accent to-primary text-white px-4 py-2 rounded-full font-black text-center shadow-lg">
                      +138% Gain! 🎉
                    </div>
                  </motion.div>

                  {/* Target Value Card */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-3xl p-6 border-4 border-white shadow-xl"
                  >
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        scale: [1, 1.3, 1]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-5xl mb-3 text-center"
                    >
                      🚀
                    </motion.div>
                    <p className="text-center text-sm text-foreground/60 font-bold mb-2">
                      10x Target Value
                    </p>
                    <motion.div
                      key={calculatedValues.target}
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-4xl font-black text-center text-secondary"
                    >
                      ${calculatedValues.target}
                    </motion.div>
                    <div className="mt-3 bg-gradient-to-r from-secondary to-primary text-white px-4 py-2 rounded-full font-black text-center shadow-lg">
                      +900% Potential! 🌙
                    </div>
                  </motion.div>
                </div>

                {/* Formula Display */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mt-8 text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 border-2 border-primary/20"
                >
                  <p className="text-sm text-foreground/70 font-bold flex items-center justify-center gap-2">
                    <span className="text-2xl">🧪</span>
                    Einstein Formula: Investment × Multiplier = Profit
                    <span className="text-2xl">⚛️</span>
                  </p>
                </motion.div>

                {/* Disclaimer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="mt-6 bg-muted/50 rounded-2xl p-4 border-2 border-foreground/10"
                >
                  <p className="text-xs text-center text-foreground/60 font-medium leading-relaxed">
                    <span className="font-black text-foreground/80">⚠️ DISCLAIMER:</span> This calculator is for simulation purposes only.
                    Actual returns may vary significantly based on market conditions, timing, and other factors.
                    Cryptocurrency investments carry high risk. Past performance does not guarantee future results.
                    Please do your own research and invest responsibly.
                  </p>
                </motion.div>
              </DialogContent>
            </Dialog>

            {/* Presale Progress Box - Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="border-8 border-white bg-gradient-to-br from-card via-accent/5 to-primary/5 shadow-2xl overflow-hidden rounded-3xl">
                <CardContent className="p-8 md:p-12">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-center mb-8"
                  >
                    <div className="flex justify-center gap-4 items-center mb-4">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-6xl"
                      >
                        🎉
                      </motion.div>
                      <h2 className="text-3xl md:text-4xl font-black text-primary">Presale Progress</h2>
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, -10, 10, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-6xl"
                      >
                        💜
                      </motion.div>
                    </div>
                    <p className="text-base md:text-lg text-foreground/70 font-bold">Join the cutest experiment in crypto! 🧪✨</p>
                  </motion.div>

                  {/* Chubby Progress Bar */}
                  <div className="space-y-6 mb-8">
                    <div className="relative h-16 bg-muted rounded-full overflow-hidden border-4 border-white shadow-xl">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute inset-y-0 left-0 bg-linear-to-r from-primary via-accent to-secondary rounded-full"
                      >
                        <motion.div
                          animate={{ x: ["0%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl"
                        >
                          🚀
                        </motion.div>
                      </motion.div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-black text-white drop-shadow-lg">
                          {progress.toFixed(1)}% Complete! 🎉
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="bg-white rounded-2xl px-4 py-2 shadow-lg border-4 border-primary/20">
                        <span className="text-2xl md:text-3xl font-black text-primary">
                          ${(raised / 1000000).toFixed(2)}M 💰
                        </span>
                      </div>
                      <div className="bg-white rounded-2xl px-4 py-2 shadow-lg border-4 border-primary/20">
                        <span className="text-2xl md:text-3xl font-black text-foreground/60">
                          ${(target / 1000000).toFixed(1)}M 🎯
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Cute Countdown */}
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 border-4 border-white shadow-xl mb-8">
                    <p className="text-center text-base md:text-lg text-foreground/80 font-bold mb-4">
                      ⏰ Hurry! Presale Ends In:
                    </p>
                    <div className="grid grid-cols-4 gap-4">
                      {[
                        { label: "Days", value: countdown.days, emoji: "📅" },
                        { label: "Hours", value: countdown.hours, emoji: "⏰" },
                        { label: "Minutes", value: countdown.minutes, emoji: "⏱️" },
                        { label: "Seconds", value: countdown.seconds, emoji: "⚡" }
                      ].map(({ label, value, emoji }) => (
                        <motion.div
                          key={label}
                          whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                          className="bg-white rounded-2xl p-4 md:p-6 border-4 border-primary/30 shadow-lg text-center"
                        >
                          <div className="text-3xl md:text-4xl font-black text-primary font-mono mb-1">
                            {value.toString().padStart(2, '0')}
                          </div>
                          <div className="text-xs md:text-sm text-foreground/60 font-bold">{label}</div>
                          <div className="text-2xl mt-1">{emoji}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Price Info */}
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl p-6 border-4 border-white shadow-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm md:text-base font-bold text-foreground/70">Current Price 💎</span>
                        <span className="text-2xl md:text-3xl font-black text-primary">$0.0005</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl p-6 border-4 border-white shadow-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm md:text-base font-bold text-foreground/70">Next Price 📈</span>
                        <span className="text-2xl md:text-3xl font-black text-secondary">$0.00065</span>
                      </div>
                    </div>
                  </div>

                  {/* Big Buy Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="w-full bg-linear-to-r from-primary via-accent to-secondary hover:opacity-90 text-white font-black text-xl md:text-2xl h-16 md:h-20 rounded-full shadow-2xl border-4 border-white">
                      <Rocket className="mr-3 w-8 h-8" />
                      Buy $Einz Now! 🎉
                      <SparklesIcon className="ml-3 w-8 h-8" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Rocket Launch Section */}
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-8 md:p-12 border-4 border-white shadow-xl mb-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h3 className="text-4xl font-black text-primary flex items-center gap-3">
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🧮
                    </motion.span>
                    Calculated for Success!
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: "Presale Price", value: "$0.00042", icon: "💎" },
                      { label: "Launch Target", value: "$0.00080 - $0.001", icon: "🚀" },
                      { label: "3 Month Goal", value: "$0.002 - $0.005", icon: "📈" },
                      { label: "1 Year Target", value: "$0.004 - $0.008", icon: "🌙" }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex justify-between items-center bg-white rounded-2xl p-4 border-4 border-primary/20 shadow-lg"
                      >
                        <span className="font-black text-foreground flex items-center gap-2">
                          <span className="text-2xl">{item.icon}</span>
                          {item.label}
                        </span>
                        <span className="text-xl font-black text-primary">{item.value}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Moon Calculator Button */}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => setShowMoonCalculator(true)}
                      size="lg"
                      className="w-full bg-linear-to-r from-primary via-accent to-secondary hover:opacity-90 text-white font-black text-xl h-16 rounded-full shadow-2xl border-4 border-white mt-6"
                    >
                      <Calculator className="mr-2 w-6 h-6" />
                      Moon Calculator 🌙
                    </Button>
                  </motion.div>
                </div>

                <div className="relative flex items-center justify-center min-h-[400px]">
                  {/* Launching Astronaut */}
                  <motion.div
                    animate={{
                      y: [0, -250],
                      scale: [1, 1.3],
                      rotate: [0, 15, -15, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    <motion.img
                      src="https://cdn.hercules.app/file_GdU16Deo5WW9TBkLtZB03gTC"
                      alt="Einstein Astronaut Launching"
                      className="w-48 md:w-64 drop-shadow-2xl"
                      animate={{
                        filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                      initial={{ rotate: 27 }}
                      animate={{
                        scale: [0.8, 1, 0.8],
                        opacity: [0.8, 0.3, 0.8],
                        // y: [0, 100, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                      className="absolute -bottom-5 left-55 text-8xl"
                    >
                      💨
                    </motion.div>
                  </motion.div>

                  {/* Rocket trail smoke */}


                  {/* Stars around rocket */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={`launch-star-${i}`}
                      animate={{
                        scale: [0, 1.5, 0],
                        rotate: [0, 180, 360],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                      className="absolute text-4xl"
                      style={{
                        left: `${30 + i * 10}%`,
                        top: `${20 + i * 15}%`
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Moon Landing Stats */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "238%", label: "Potential", emoji: "📊" },
                { value: "12K+", label: "Smart Holders", emoji: "👥" },
                { value: "$2.8M", label: "Raised", emoji: "💰" },
                { value: "10x", label: "Target", emoji: "🌙" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  className="bg-white rounded-2xl p-6 border-4 border-primary/20 shadow-xl text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    className="text-4xl mb-2"
                  >
                    {stat.emoji}
                  </motion.div>
                  <div className="text-3xl font-black text-primary mb-1">{stat.value}</div>
                  <div className="text-sm font-bold text-foreground/60">{stat.label}</div>
                </motion.div>
              ))}
            </div> */}

            {/* CTA */}
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-12 text-center"
            >
              <Button size="lg" className="bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-white font-black text-2xl md:text-3xl px-16 h-20 rounded-full shadow-2xl border-4 border-white">
                <Rocket className="mr-3 w-8 h-8" />
                Join the Journey! 🌙
                <SparklesIcon className="ml-3 w-8 h-8" />
              </Button>
              <p className="mt-4 text-foreground/70 font-bold text-lg">
                ⚡ Early Bird Bonus: Get Extra Tokens During Presale! ⚡
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Tokenomics Section */}
      <motion.section
        id="tokenomics"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 container mx-auto px-4 py-20"
      >
        <div className="text-center mb-16">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="inline-block text-6xl mb-4"
          >
            📊
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-balance mb-4">
            <span className="text-primary">Smart</span> Tokenomics 🧪
          </h2>
          <p className="text-xl md:text-2xl text-foreground/70 font-bold max-w-3xl mx-auto">
            Scientifically calculated for maximum value and community growth!
          </p>
        </div>

        {/* Token Info Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="border-8 border-white bg-linear-to-br from-primary/10 via-accent/10 to-secondary/10 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Token Name", value: "Little Einstein", icon: "🧪" },
                  { label: "Symbol", value: "$Einz", icon: "💎" },
                  { label: "Total Supply", value: "20,000,000,000", icon: "📈" },
                  { label: "Network", value: "BASE L2", icon: "⚡" }
                ].map((info, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white rounded-2xl p-6 border-4 border-primary/20 shadow-lg text-center"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                      className="text-5xl mb-3"
                    >
                      {info.icon}
                    </motion.div>
                    <p className="text-sm text-foreground/60 font-bold mb-1">{info.label}</p>
                    <p className="text-lg md:text-xl font-black text-primary break-words">{info.value}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Token Distribution */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Distribution Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-6 border-white bg-white shadow-2xl rounded-3xl h-full">
              <CardContent className="p-8">
                <h3 className="text-3xl font-black text-primary mb-6 flex items-center gap-3">
                  <span className="text-4xl">🥧</span>
                  Token Distribution
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Presale", percent: 25, color: "from-primary to-accent", icon: "🚀" },
                    { label: "Staking & Rewards", percent: 20, color: "from-accent to-secondary", icon: "💧" },
                    { label: "Chain Reserves/Treasury", percent: 22, color: "from-secondary to-primary", icon: "📢" },
                    { label: "Liquidity (DEX)", percent: 11, color: "from-primary via-accent to-secondary", icon: "👥" },
                    { label: "CEX Reserves", percent: 11, color: "from-accent to-primary", icon: "🔧" },
                    { label: "Marketing & Partnership", percent: 11, color: "from-secondary to-accent", icon: "🎁" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-2xl p-4 border-2 border-primary/20"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-black text-foreground flex items-center gap-2">
                          <span className="text-2xl">{item.icon}</span>
                          {item.label}
                        </span>
                        <span className="text-2xl font-black text-primary">{item.percent}%</span>
                      </div>
                      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Vesting Schedule */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-6 border-white bg-white shadow-2xl rounded-3xl h-full">
              <CardContent className="p-8">
                <h3 className="text-3xl font-black text-primary mb-6 flex items-center gap-3">
                  <span className="text-4xl">📅</span>
                  Vesting Schedule
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      category: "Presale Investors",
                      tge: "0%",
                      cliff: "2 Months",
                      release: "15% each month after the cliff ends. (Full release achieved after 6.67 months post-cliff).",
                      icon: "🚀",
                      color: "primary"
                    },
                    // {
                    //   category: "Liquidity",
                    //   tge: "0%",
                    //   cliff: "2 Months",
                    //   release: "-",
                    //   icon: "🔒",
                    //   color: "accent"
                    // },
                    {
                      category: "Marketing",
                      tge: "0%",
                      cliff: "2 Months",
                      release: "10% each month after the cliff ends.",
                      icon: "📢",
                      color: "primary"
                    },
                    {
                      category: "Partnership",
                      tge: "0%",
                      cliff: "2 Months",
                      release: "10% each month after the cliff ends.",
                      icon: "👥",
                      color: "secondary"
                    }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.02, y: -3 }}
                      className="bg-linear-to-br from-muted/30 to-muted/10 rounded-2xl p-4 border-2 border-primary/20"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{item.icon}</span>
                        <span className="font-black text-lg text-foreground">{item.category}</span>
                      </div>
                      <div className="pl-11 space-y-1">
                        <p className="text-sm font-bold text-foreground/70">
                          <span className="text-primary">Token Unlock at TGE:</span> {item.tge}
                        </p>
                        <p className="text-sm font-bold text-foreground/70">
                          <span className="text-primary">Cliff Period:</span> {item.cliff}
                        </p>
                        <p className="text-sm font-bold text-foreground/70">
                          <span className="text-secondary">Monthly Release:</span> {item.release}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* TGE Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="border-8 border-white bg-gradient-to-br from-accent/10 via-primary/10 to-secondary/10 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-block text-6xl mb-4"
                >
                  🎯
                </motion.div>
                <h3 className="text-4xl font-black text-primary mb-2">TGE Details</h3>
                <p className="text-lg text-foreground/70 font-bold">Token Generation Event Information</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "TGE Date", value: "Q2 2025", icon: "📅" },
                  { label: "Initial Price", value: "$0.00042", icon: "💰" },
                  { label: "Launch Price", value: "$0.00080", icon: "🚀" },
                  { label: "Initial Market Cap", value: "$840K", icon: "📊" }
                ].map((detail, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                    className="bg-white rounded-2xl p-6 border-4 border-primary/20 shadow-lg text-center"
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      className="text-5xl mb-3"
                    >
                      {detail.icon}
                    </motion.div>
                    <p className="text-sm text-foreground/60 font-bold mb-1">{detail.label}</p>
                    <p className="text-xl font-black text-primary">{detail.value}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Token Utility & Security */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Token Utility */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-6 border-white bg-gradient-to-br from-primary/5 to-accent/5 shadow-2xl rounded-3xl h-full">
              <CardContent className="p-8">
                <h3 className="text-3xl font-black text-primary mb-6 flex items-center gap-3">
                  <span className="text-4xl">⚡</span>
                  Token Utility
                </h3>
                <div className="space-y-4">
                  {[
                    { text: "Governance voting rights", icon: "🗳️" },
                    { text: "Staking rewards (up to 25% APY)", icon: "💰" },
                    { text: "Exclusive NFT access", icon: "🎨" },
                    { text: "Community events & airdrops", icon: "🎁" },
                    { text: "Reduced trading fees", icon: "📉" },
                    { text: "Early access to new features", icon: "🚀" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.03, x: 5 }}
                      className="flex items-center gap-3 bg-white rounded-xl p-4 border-2 border-primary/20 shadow"
                    >
                      <span className="text-3xl">{item.icon}</span>
                      <span className="font-bold text-foreground">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-6 border-white bg-gradient-to-br from-secondary/5 to-primary/5 shadow-2xl rounded-3xl h-full">
              <CardContent className="p-8">
                <h3 className="text-3xl font-black text-primary mb-6 flex items-center gap-3">
                  <span className="text-4xl">🛡️</span>
                  Security Features
                </h3>
                <div className="space-y-4">
                  {[
                    { text: "Multi-sig wallet protection", icon: "🔐" },
                    { text: "Audited by CertiK", icon: "✅" },
                    { text: "Liquidity locked 2 years", icon: "🔒" },
                    { text: "Anti-whale mechanism", icon: "🐋" },
                    { text: "Anti-bot protection", icon: "🤖" },
                    { text: "Verified contract on BSCScan", icon: "📜" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.03, x: 5 }}
                      className="flex items-center gap-3 bg-white rounded-xl p-4 border-2 border-primary/20 shadow"
                    >
                      <span className="text-3xl">{item.icon}</span>
                      <span className="font-bold text-foreground">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Trust Badges Section - Investor Friendly */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 container mx-auto px-4 py-12"
      >
        <div className="bg-linear-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-3xl p-8 border-4 border-white shadow-xl relative overflow-hidden">
          {/* Floating cute elements in background */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                rotate: [0, 360],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 6 + i * 1.5,
                repeat: Infinity,
                delay: i * 1.5
              }}
              className="absolute text-6xl"
              style={{
                left: `${10 + i * 15}%`,
                top: `${-10 + i * 15}%`
              }}
            >
              {["💎", "🚀", "⭐", "💜", "✨", "🔥"][i]}
            </motion.div>
          ))}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            {[
              { emoji: "🔒", label: "Audited", value: "100% Safe" },
              { emoji: "💎", label: "Liquidity", value: "Locked" },
              { emoji: "✅", label: "KYC", value: "Verified" },
              { emoji: "🔥", label: "Contract", value: "Renounced" }
            ].map((badge, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl p-6 border-4 border-primary/20 shadow-lg text-center"
              >
                <div className="text-4xl mb-2">{badge.emoji}</div>
                <div className="text-sm font-bold text-foreground/60 mb-1">{badge.label}</div>
                <div className="text-lg font-black text-primary">{badge.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Invest Section */}
      <motion.section
        {...animations.scrollFadeIn}
        className="relative z-10 container mx-auto px-4 py-20"
      >
        <div className="text-center space-y-4 mb-16">
          <motion.div
            variants={animations.staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center gap-3 mb-4 text-5xl"
          >
            {['💎', '🚀', '�'].map((emoji, i) => (
              <motion.div
                key={i}
                variants={animations.staggerItem}
                animate={animations.floatingAnimation}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.3 }}
              >
                {emoji}
              </motion.div>
            ))}
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-balance">
            Why Smart Investors Choose <span className="text-primary">$Einz!</span>
          </h2>
          <p className="text-2xl text-foreground/70 max-w-2xl mx-auto text-balance font-medium">
            Genius tokenomics + Adorable branding = Moon Mission! 🌙✨
          </p>
        </div>

        <motion.div
          variants={animations.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              emoji: "🔐",
              title: "100% Secure",
              description: "Audited by top firms! Liquidity locked! Your investment is SAFU!",
              badge: "✅ Verified",
              color: "from-green-500 to-emerald-600",
              char: "https://cdn.hercules.app/file_MzK2FlqYRQ1s1N9BUUg8QpEB"
            },
            {
              emoji: "👥",
              title: "12K+ Holders",
              description: "Fastest growing community! Join thousands of smart investors!",
              badge: "🔥 Trending",
              color: "from-orange-500 to-red-600",
              char: "https://cdn.hercules.app/file_PNjYB0sYpNm2eBwQ9LkZHS7T"
            },
            {
              emoji: "📈",
              title: "1000x Potential",
              description: "Early stage gem! Strategic tokenomics for massive gains!",
              badge: "💎 Gem",
              color: "from-purple-500 to-pink-600",
              char: "https://cdn.hercules.app/file_qh9lQO74hZOTlAORAm770ptM"
            },
            {
              emoji: "⚡",
              title: "Low Tax (3/3)",
              description: "Minimal fees, maximum profits! More gains in your pocket!",
              badge: "💰 Profit",
              color: "from-yellow-500 to-amber-600",
              char: "https://cdn.hercules.app/file_1DNbhR6KrSldPZ6E5VvTyuZF"
            },
            {
              emoji: "🎁",
              title: "Passive Income",
              description: "Staking rewards up to 25% APY! Earn while you sleep!",
              badge: "🤑 Rewards",
              color: "from-blue-500 to-cyan-600",
              char: "https://cdn.hercules.app/file_qJXZyBLaxE0xJtlA4o5mQFkf"
            },
            {
              emoji: "🚀",
              title: "Major CEX Soon",
              description: "Binance & Coinbase listings coming! Get in before the pump!",
              badge: "🌟 Coming",
              color: "from-indigo-500 to-violet-600",
              char: "https://cdn.hercules.app/file_l2LLX68sCT6FX97121lGTIKy"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={animations.staggerItem}
              whileHover={animations.hoverLift}
              className="group"
            >
              <Card className="h-full border-4 border-white bg-gradient-to-br from-white via-primary/5 to-accent/10 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl relative overflow-hidden group-hover:border-primary/30">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                  style={{
                    background: `linear-gradient(135deg, transparent 0%, var(--tw-gradient-stops))`,
                    padding: '4px',
                    margin: '-4px'
                  }}
                />

                {/* Badge */}
                <motion.div
                  className={`absolute top-4 right-4 bg-gradient-to-r ${feature.color} text-white px-4 py-2 rounded-full text-xs font-black shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.badge}
                </motion.div>
                <CardContent className="p-8 space-y-4 text-center relative z-10">
                  <div className="relative mb-6 min-h-[140px]">
                    {/* Glow Effect - Behind everything */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full opacity-0 group-hover:opacity-20 blur-3xl transition-opacity z-0"
                      style={{ background: `linear-gradient(135deg, ${feature.color.split(' ')[0].replace('from-', '')}, ${feature.color.split(' ')[1].replace('to-', '')})` }}
                    />

                    {/* Character Background - More visible */}
                    <motion.div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 opacity-30 group-hover:opacity-60 transition-opacity z-10"
                      animate={animations.gentleRotate}
                      transition={{ duration: 5 + i, repeat: Infinity }}
                    >
                      <img src={feature.char} alt="" className="w-full h-full object-contain drop-shadow-lg" />
                    </motion.div>

                    {/* Floating Emoji - On top */}
                    <motion.div
                      animate={animations.floatingAnimation}
                      transition={{ duration: 2.5 + i * 0.3, repeat: Infinity }}
                      className="text-7xl mb-4 absolute z-20 -left-3 -top-5 drop-shadow-2xl"
                    >
                      {feature.emoji}
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-black bg-linear-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                    {feature.title}
                  </h3>

                  <p className="text-foreground/70 font-medium text-base leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Learn More Link */}
                  <motion.div
                    className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ y: 10 }}
                    whileHover={{ y: 0 }}
                  >
                    <span className={`text-sm font-bold bg-linear-to-r ${feature.color} bg-clip-text text-transparent cursor-pointer inline-flex items-center gap-1`}>
                      Learn More →
                    </span>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* FOMO Section with Characters */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 container mx-auto px-4 py-12"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Early Bird Bonus",
              subtitle: "50% Extra Tokens!",
              desc: "First 500 buyers get bonus tokens!",
              char: "https://cdn.hercules.app/file_1DNbhR6KrSldPZ6E5VvTyuZF",
              color: "from-primary to-accent"
            },
            {
              title: "Presale Ending",
              subtitle: "Only 44% Left!",
              desc: "Price increases by 30% after presale!",
              char: "https://cdn.hercules.app/file_qh9lQO74hZOTlAORAm770ptM",
              color: "from-secondary to-primary"
            },
            {
              title: "Next Price",
              subtitle: "$0.00055 Soon!",
              desc: "Buy now at $0.00042 before pump!",
              char: "https://cdn.hercules.app/file_qJXZyBLaxE0xJtlA4o5mQFkf",
              color: "from-accent to-secondary"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative"
            >
              <Card className="border-4 border-white shadow-2xl rounded-3xl overflow-hidden bg-white">
                <CardContent className="p-0">
                  <div className={`bg-gradient-to-br ${item.color} p-6 text-white text-center relative`}>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute top-2 right-2 text-4xl"
                    >
                      🔥
                    </motion.div>
                    <div className="text-sm font-bold opacity-90 mb-1">{item.title}</div>
                    <div className="text-3xl font-black">{item.subtitle}</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="w-24 h-24 mx-auto mb-4 relative">
                      <motion.img
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        src={item.char}
                        alt=""
                        className="w-full h-full object-contain drop-shadow-xl"
                      />
                    </div>
                    <p className="text-lg font-bold text-foreground/80">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section - Extra Cute with Social Proof */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 container mx-auto px-4 py-20"
      >
        <Card className="border-8 border-white bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-12 md:p-16 text-center space-y-8 relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10"
            />
            <div className="relative z-10">
              {/* Character Showcase */}
              <div className="flex justify-center gap-2 mb-6">
                {[
                  "https://cdn.hercules.app/file_qJXZyBLaxE0xJtlA4o5mQFkf",
                  "https://cdn.hercules.app/file_1DNbhR6KrSldPZ6E5VvTyuZF",
                  "https://cdn.hercules.app/file_PNjYB0sYpNm2eBwQ9LkZHS7T",
                  "https://cdn.hercules.app/file_qh9lQO74hZOTlAORAm770ptM",
                  "https://cdn.hercules.app/file_MzK2FlqYRQ1s1N9BUUg8QpEB"
                ].map((char, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    className="w-16 h-16 bg-white rounded-2xl border-4 border-primary/30 shadow-xl overflow-hidden"
                  >
                    <img src={char} alt="" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center gap-3 items-center mb-6">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-5xl"
                >
                  🔥
                </motion.div>
                <div className="inline-block bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-full font-black text-lg shadow-xl">
                  250+ Investors Joined in Last Hour! 💎
                </div>
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="text-5xl"
                >
                  🚀
                </motion.div>
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-balance mb-6">
                Don't Miss The <span className="text-primary">Biggest Meme Token</span> of 2025!
              </h2>
              <p className="text-2xl text-foreground/70 max-w-3xl mx-auto text-balance font-bold mb-8">
                Join 12,000+ smart investors and secure your spot in the genius revolution! Limited presale spots remaining! ⏰💎
              </p>
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="space-y-6"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="w-full max-w-2xl mx-auto bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-white font-black text-3xl px-16 h-24 rounded-full shadow-2xl border-4 border-white">
                    <Rocket className="mr-3 w-10 h-10" />
                    BUY $Einz NOW - GET 50% BONUS! 🎉
                    <SparklesIcon className="ml-3 w-10 h-10" />
                  </Button>
                </motion.div>

                <div className="flex flex-wrap gap-4 justify-center text-sm font-bold text-foreground/80">
                  <div className="flex items-center gap-2">
                    ✅ Instant Delivery
                  </div>
                  <div className="flex items-center gap-2">
                    🔒 100% Secure
                  </div>
                  <div className="flex items-center gap-2">
                    💎 Audited Contract
                  </div>
                  <div className="flex items-center gap-2">
                    🚀 Listed on DEX
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="border-4 border-white bg-white/90 hover:bg-white text-xl px-10 h-16 rounded-full font-black shadow-2xl text-foreground">
                      <Users className="mr-2 w-6 h-6" />
                      Join Telegram (5.2K)
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="border-4 border-white bg-white/90 hover:bg-white text-xl px-10 h-16 rounded-full font-black shadow-2xl text-foreground">
                      View Chart 📊
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

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
                © {new Date().getFullYear()} Little Einstein ($Einz) 💜 All rights reserved.
              </p>
              <p className="text-foreground/50 text-sm mt-2">
                Made with 💜 and genius-level cuteness! | Community-driven meme token.
              </p>
              <p className="text-foreground/40 text-xs mt-3">
                Disclaimer: Cryptocurrency investments carry risk. Always do your own research.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Moon Calculator Modal */}
      {showMoonCalculator && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowMoonCalculator(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-8 border-primary/20"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-primary via-accent to-secondary p-6 relative">
              <button
                onClick={() => setShowMoonCalculator(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
              <div className="text-center">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-block text-6xl mb-3"
                >
                  🌙
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                  Moon Calculator
                </h2>
                <p className="text-white/90 font-bold">
                  Calculate your potential gains at different price targets! 🚀
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6">
              {/* Input Section */}
              <div>
                <label className="block text-lg font-black text-foreground mb-3">
                  💰 Your Investment (USD)
                </label>
                <Input
                  type="number"
                  value={moonInvestment}
                  onChange={(e) => setMoonInvestment(e.target.value)}
                  placeholder="Enter amount..."
                  className="text-2xl font-black h-16 border-4 border-primary/20 rounded-2xl"
                />
              </div>

              {/* Target Price Selector */}
              <div>
                <label className="block text-lg font-black text-foreground mb-3">
                  🎯 Target Price (USD)
                </label>
                <div className="space-y-4">
                  {/* Quick Select Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "$0.002", value: 0.002 },
                      { label: "$0.01", value: 0.01 },
                      { label: "$0.05", value: 0.05 },
                      { label: "$0.10", value: 0.10 },
                      { label: "$0.50", value: 0.50 },
                      { label: "$1.00", value: 1.00 }
                    ].map((preset) => (
                      <Button
                        key={preset.value}
                        onClick={() => setTargetPrice(preset.value)}
                        className={`rounded-full font-bold px-4 py-2 ${targetPrice === preset.value
                          ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg"
                          : "bg-white border-2 border-primary/20 text-foreground hover:bg-primary/5"
                          }`}
                      >
                        {preset.label}
                      </Button>
                    ))}
                  </div>

                  {/* Slider */}
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0.002"
                      max="1"
                      step="0.001"
                      value={targetPrice}
                      onChange={(e) => setTargetPrice(parseFloat(e.target.value))}
                      className="w-full h-3 bg-gradient-to-r from-primary via-accent to-secondary rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, rgb(var(--primary)) 0%, rgb(var(--accent)) 50%, rgb(var(--secondary)) 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs font-bold text-foreground/60">
                      <span>$0.002</span>
                      <span className="text-primary text-lg font-black">${targetPrice.toFixed(3)}</span>
                      <span>$1.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Price Info */}
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border-4 border-white shadow-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-bold text-foreground/60 mb-1">Current Price</p>
                    <p className="text-2xl font-black text-primary">${presalePrice}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground/60 mb-1">Target Price</p>
                    <p className="text-2xl font-black text-accent">${targetPrice.toFixed(3)}</p>
                  </div>
                </div>
              </div>

              {/* Projection Results */}
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-primary flex items-center gap-2">
                  <span className="text-3xl">🎯</span>
                  Your Moon Projection
                </h3>

                {/* Results Cards */}
                <div className="space-y-3">
                  <div className="bg-white rounded-2xl p-4 border-4 border-primary/20 shadow-lg flex justify-between items-center">
                    <span className="font-black text-foreground">💵 Investment</span>
                    <span className="text-xl font-black text-primary">${moonProjection.investment}</span>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border-4 border-accent/20 shadow-lg flex justify-between items-center">
                    <span className="font-black text-foreground">🪙 Tokens Received</span>
                    <span className="text-xl font-black text-accent">{moonProjection.tokens} LILEIN</span>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-4 border-4 border-white shadow-lg flex justify-between items-center">
                    <span className="font-black text-foreground">🌙 Value at ${targetPrice.toFixed(3)}</span>
                    <span className="text-xl font-black text-green-600">${moonProjection.valueAtTarget}</span>
                  </div>

                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-4 border-4 border-white shadow-lg flex justify-between items-center">
                    <span className="font-black text-foreground">💰 Profit</span>
                    <span className="text-xl font-black text-green-600">+${moonProjection.profit}</span>
                  </div>

                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border-4 border-white shadow-lg">
                    <div className="text-center">
                      <p className="text-sm font-bold text-foreground/60 mb-2">Potential Multiplier</p>
                      <motion.p
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-5xl font-black text-primary mb-2"
                      >
                        {moonProjection.multiplier}x
                      </motion.p>
                      <p className="text-xl font-black text-accent">
                        {moonProjection.roi}% ROI 🚀
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-yellow-50 border-4 border-yellow-200 rounded-2xl p-4">
                <div className="flex items-start gap-2">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <p className="text-sm font-bold text-foreground/80">
                      <strong>Disclaimer:</strong> These are hypothetical projections based on the token reaching your selected target price.
                      Cryptocurrency investments carry risks. Past performance does not guarantee future results.
                      Always do your own research (DYOR) and invest responsibly.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-white font-black text-xl h-16 rounded-full shadow-2xl border-4 border-white"
                >
                  <Rocket className="mr-2 w-6 h-6" />
                  Join Presale Now! 🎉
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
