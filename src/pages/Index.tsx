import { motion } from "motion/react";
import { Atom, Beaker, Brain, Calculator, FlaskConical, Heart, Rocket, SparklesIcon, Star, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useState, useEffect } from "react";

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

      {/* Super Cute Header with Lab Theme */}
      <header className="relative z-10 bg-gradient-to-r from-card/90 via-primary/5 to-accent/5 backdrop-blur-md border-b-4 border-primary/30 shadow-xl overflow-hidden">
        {/* Lab Equipment Background in Header */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <motion.div
            animate={{ x: [-20, 20, -20] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute left-10 top-1/2 text-4xl"
          >
            ⚗️
          </motion.div>
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute right-20 top-1/2 text-3xl"
          >
            🔬
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute left-1/2 top-2 text-2xl"
          >
            ⚛️
          </motion.div>
        </div>
        
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex justify-between items-center">
            <motion.div 
              whileHover={{ scale: 1.08, y: -3 }}
              className="flex items-center gap-4"
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    rotate: [0, 8, -8, 0],
                    y: [0, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl relative z-10"
                >
                  🧪
                </motion.div>
                {/* Bubbling effect */}
                <motion.div
                  animate={{ 
                    scale: [0, 1, 0],
                    y: [-20, -40, -60]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-0 left-1/2 text-2xl"
                >
                  💧
                </motion.div>
              </div>
              <div>
                <h1 className="text-3xl font-black text-primary flex items-center gap-2">
                  Little Einstein
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ✨
                  </motion.span>
                </h1>
                <p className="text-lg text-secondary font-black flex items-center gap-1">
                  $LILEIN 💜
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-sm"
                  >
                    ⚛️
                  </motion.span>
                </p>
              </div>
            </motion.div>
            <Button className="bg-gradient-to-r from-primary to-accent hover:scale-110 transition-all text-white font-black text-lg rounded-full px-10 py-6 shadow-2xl border-4 border-white/70 relative overflow-hidden">
              <motion.span
                animate={{ x: [-100, 400] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
              Connect Wallet 🚀
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Super Cute! */}
      <section className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-full font-bold text-sm shadow-xl border-4 border-white/50">
                <Zap className="w-5 h-5 fill-white" />
                PRESALE LIVE NOW! 🚀
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-black text-balance leading-tight">
              The Cutest
              <span className="text-primary block mt-2 relative inline-block">
                Genius Token! 
                <motion.span
                  animate={{ rotate: [0, 20, -20, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                  className="inline-block ml-2"
                >
                  🧪
                </motion.span>
              </span>
            </h1>
            
            <p className="text-2xl text-foreground/70 text-balance font-medium">
              Join our adorable lab where science meets memes! Little Einstein is bringing genius-level gains with maximum cuteness! 💜
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-black text-xl px-10 h-16 rounded-full shadow-2xl border-4 border-white/50">
                  <Rocket className="mr-2 w-6 h-6" />
                  Buy $LILEIN 🎉
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="border-4 border-primary/30 hover:bg-primary/10 text-xl h-16 px-10 rounded-full font-bold bg-white shadow-xl text-foreground">
                  <Heart className="mr-2 w-6 h-6 fill-primary text-primary" />
                  Join Community
                </Button>
              </motion.div>
            </div>

            <div className="flex gap-6 pt-6">
              {[
                { label: "Raised", value: "$2.8M+", emoji: "💰" },
                { label: "Holders", value: "12K+", emoji: "👥" },
                { label: "Cuteness", value: "100%", emoji: "🥰" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  className="bg-white rounded-3xl p-4 shadow-xl border-4 border-primary/20"
                >
                  <p className="text-3xl font-black text-primary">{stat.value}</p>
                  <p className="text-sm text-foreground/60 font-bold">{stat.label} {stat.emoji}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
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
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                  whileHover={{ scale: 1.15, rotate: 0, y: -20 }}
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
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
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
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 text-6xl"
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

            {/* Interactive Profit Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 relative"
            >
              {/* Floating Astronauts around calculator */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -left-10 top-10 hidden lg:block"
              >
                <img 
                  src="https://cdn.hercules.app/file_GdU16Deo5WW9TBkLtZB03gTC"
                  alt="Astronaut"
                  className="w-20 h-20 opacity-60"
                />
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -25, 0],
                  rotate: [0, -10, 10, 0]
                }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute -right-10 bottom-10 hidden lg:block"
              >
                <img 
                  src="https://cdn.hercules.app/file_GdU16Deo5WW9TBkLtZB03gTC"
                  alt="Astronaut"
                  className="w-20 h-20 opacity-60"
                />
              </motion.div>

              <Card className="border-8 border-white bg-gradient-to-br from-white via-primary/5 to-accent/5 shadow-2xl rounded-3xl overflow-hidden max-w-3xl mx-auto">
                <CardContent className="p-8 md:p-12">
                  {/* Calculator Title */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-center mb-8"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="inline-block text-6xl mb-4"
                    >
                      🧮
                    </motion.div>
                    <h3 className="text-4xl md:text-5xl font-black text-primary mb-2">
                      Profit Calculator
                    </h3>
                    <p className="text-lg text-foreground/70 font-bold">
                      Calculate your genius gains! 💎
                    </p>
                  </motion.div>

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
                  </motion.div>
                  
                  {/* Rocket trail smoke */}
                  <motion.div
                    animate={{
                      scale: [0.8, 2, 0.8],
                      opacity: [0.8, 0.3, 0.8],
                      y: [0, 100, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                    className="absolute bottom-0 text-8xl"
                  >
                    💨
                  </motion.div>

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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "238%", label: "Already Up!", emoji: "📊" },
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
            </div>

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

      {/* Super Cute Presale Box */}
      <motion.section 
        {...bounceAnimation}
        className="relative z-10 container mx-auto px-4 py-12"
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
                <h2 className="text-4xl md:text-5xl font-black text-primary">Presale Progress</h2>
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
              <p className="text-xl text-foreground/70 font-bold">Join the cutest experiment in crypto! 🧪✨</p>
            </motion.div>

            {/* Chubby Progress Bar */}
            <div className="space-y-6 mb-8">
              <div className="relative h-16 bg-muted rounded-full overflow-hidden border-4 border-white shadow-xl">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-secondary rounded-full"
                >
                  <motion.div
                    animate={{ x: ["0%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
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
                <div className="bg-white rounded-2xl px-6 py-3 shadow-lg border-4 border-primary/20">
                  <span className="text-3xl font-black text-primary">
                    ${(raised / 1000000).toFixed(2)}M 💰
                  </span>
                </div>
                <div className="bg-white rounded-2xl px-6 py-3 shadow-lg border-4 border-primary/20">
                  <span className="text-3xl font-black text-foreground/60">
                    ${(target / 1000000).toFixed(1)}M 🎯
                  </span>
                </div>
              </div>
            </div>

            {/* Cute Countdown */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 border-4 border-white shadow-xl mb-8">
              <p className="text-center text-lg text-foreground/80 font-bold mb-6">
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
                    <div className="text-4xl md:text-5xl font-black text-primary font-mono mb-1">
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
                  <span className="text-lg font-bold text-foreground/70">Current Price 💎</span>
                  <span className="text-3xl font-black text-primary">$0.00042</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl p-6 border-4 border-white shadow-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-foreground/70">Next Price 📈</span>
                  <span className="text-3xl font-black text-secondary">$0.00055</span>
                </div>
              </div>
            </div>

            {/* Big Buy Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="w-full bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-white font-black text-2xl md:text-3xl h-20 rounded-full shadow-2xl border-4 border-white">
                <Rocket className="mr-3 w-8 h-8" />
                Buy $LILEIN Now! 🎉
                <SparklesIcon className="ml-3 w-8 h-8" />
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Trust Badges Section - Investor Friendly */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 container mx-auto px-4 py-12"
      >
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-3xl p-8 border-4 border-white shadow-xl relative overflow-hidden">
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
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 container mx-auto px-4 py-20"
      >
        <div className="text-center space-y-4 mb-16">
          <motion.div className="flex justify-center gap-3 mb-4">
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity }}>
              💎
            </motion.div>
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}>
              🚀
            </motion.div>
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}>
              📈
            </motion.div>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-balance">
            Why Smart Investors Choose <span className="text-primary">$LILEIN!</span>
          </h2>
          <p className="text-2xl text-foreground/70 max-w-2xl mx-auto text-balance font-medium">
            Genius tokenomics + Adorable branding = Moon Mission! 🌙✨
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              emoji: "🔐",
              title: "100% Secure",
              description: "Audited by top firms! Liquidity locked! Your investment is SAFU!",
              badge: "✅ Verified",
              char: "https://cdn.hercules.app/file_MzK2FlqYRQ1s1N9BUUg8QpEB"
            },
            {
              emoji: "👥",
              title: "12K+ Holders",
              description: "Fastest growing community! Join thousands of smart investors!",
              badge: "🔥 Trending",
              char: "https://cdn.hercules.app/file_PNjYB0sYpNm2eBwQ9LkZHS7T"
            },
            {
              emoji: "📈",
              title: "1000x Potential",
              description: "Early stage gem! Strategic tokenomics for massive gains!",
              badge: "💎 Gem",
              char: "https://cdn.hercules.app/file_qh9lQO74hZOTlAORAm770ptM"
            },
            {
              emoji: "⚡",
              title: "Low Tax (3/3)",
              description: "Minimal fees, maximum profits! More gains in your pocket!",
              badge: "💰 Profit",
              char: "https://cdn.hercules.app/file_1DNbhR6KrSldPZ6E5VvTyuZF"
            },
            {
              emoji: "🎁",
              title: "Passive Income",
              description: "Staking rewards up to 25% APY! Earn while you sleep!",
              badge: "🤑 Rewards",
              char: "https://cdn.hercules.app/file_qJXZyBLaxE0xJtlA4o5mQFkf"
            },
            {
              emoji: "🚀",
              title: "Major CEX Soon",
              description: "Binance & Coinbase listings coming! Get in before the pump!",
              badge: "🌟 Coming",
              char: "https://cdn.hercules.app/file_l2LLX68sCT6FX97121lGTIKy"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            >
              <Card className="h-full border-4 border-white bg-gradient-to-br from-white to-primary/5 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-xs font-black shadow-lg">
                  {feature.badge}
                </div>
                <CardContent className="p-8 space-y-4 text-center">
                  <div className="relative">
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-6xl mb-4 relative z-10"
                    >
                      {feature.emoji}
                    </motion.div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-24 opacity-30">
                      <img src={feature.char} alt="" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-primary">{feature.title}</h3>
                  <p className="text-foreground/70 font-medium text-lg">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Tokenomics - Cute Style */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 container mx-auto px-4 py-20"
      >
        <div className="text-center space-y-4 mb-16 relative">
          {/* Lab Equipment Animation */}
          <div className="flex justify-center gap-4 items-center mb-4">
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, 0],
                y: [0, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl"
            >
              ⚗️
            </motion.div>
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-6xl"
            >
              🧪
            </motion.div>
            <motion.div
              animate={{ 
                rotate: [0, 360],
                y: [0, -8, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-5xl"
            >
              🔬
            </motion.div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black relative">
            The Genius <span className="text-primary">Formula!</span> 💜
            {/* Floating formulas around title */}
            <motion.span
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 15, -15, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -left-10 top-0 text-2xl text-primary/40 hidden md:inline"
            >
              E=mc²
            </motion.span>
            <motion.span
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, -15, 15, 0]
              }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="absolute -right-10 bottom-0 text-2xl text-accent/40 hidden md:inline"
            >
              π=3.14
            </motion.span>
          </h2>
          <p className="text-2xl text-foreground/70 max-w-2xl mx-auto font-medium">
            Scientific distribution for maximum cuteness gains! 📊✨
          </p>
          
          {/* Floating atoms around */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`atom-tokenomics-${i}`}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.5
              }}
              className="absolute text-3xl"
              style={{
                left: `${10 + i * 25}%`,
                top: i % 2 === 0 ? "-5%" : "100%"
              }}
            >
              ⚛️
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-8 border-white bg-gradient-to-br from-card to-primary/5 shadow-2xl rounded-3xl">
            <CardContent className="p-8 md:p-12">
              <div className="space-y-6">
                {[
                  { label: "Presale 🎉", value: "40%", color: "from-primary to-primary/60" },
                  { label: "Liquidity Pool 💧", value: "25%", color: "from-accent to-accent/60" },
                  { label: "Staking Rewards 🎁", value: "20%", color: "from-secondary to-secondary/60" },
                  { label: "Team & Dev 👨‍💻", value: "10%", color: "from-chart-4 to-chart-4/60" },
                  { label: "Marketing 📢", value: "5%", color: "from-chart-5 to-chart-5/60" }
                ].map(({ label, value, color }, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-black text-foreground">{label}</span>
                      <span className="text-3xl font-black text-primary">{value}</span>
                    </div>
                    <div className="h-6 bg-muted rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: value }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                        className={`h-full bg-gradient-to-r ${color} relative`}
                      >
                        <motion.div
                          animate={{ x: ["0%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 grid md:grid-cols-2 gap-6">
                {[
                  { label: "Total Supply 📊", value: "100B $LILEIN" },
                  { label: "Starting Price 💎", value: "$0.00042" },
                  { label: "Launch Price 🚀", value: "$0.00080" },
                  { label: "Network ⛓️", value: "Ethereum" },
                  { label: "Tax Rate 💰", value: "3% Buy / 3% Sell" },
                  { label: "Min Buy 🎯", value: "$25" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-white to-primary/10 rounded-2xl p-6 border-4 border-primary/20 shadow-lg"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-foreground/70">{item.label}</span>
                      <span className="text-xl font-black text-primary">{item.value}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
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
                    BUY $LILEIN NOW - GET 50% BONUS! 🎉
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
                    rotate: [0, 10, -10, 0],
                    y: [0, -8, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-7xl relative z-10"
                >
                  🧪
                </motion.div>
                {/* Chemical bubbles */}
                <motion.div
                  animate={{ 
                    scale: [0, 1.5, 0],
                    y: [-10, -40, -70],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-0 left-1/2 text-3xl"
                >
                  💧
                </motion.div>
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
  );
}
