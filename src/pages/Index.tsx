import { motion } from "motion/react";
import { Atom, Beaker, Brain, FlaskConical, Heart, Rocket, SparklesIcon, Star, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
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
      {/* Cute Floating Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute rounded-full bg-gradient-to-br from-primary/30 to-accent/30"
            style={{
              width: `${30 + Math.random() * 80}px`,
              height: `${30 + Math.random() * 80}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
        
        {/* Cute Stars */}
        {[...Array(20)].map((_, i) => (
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
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            <Star className="w-4 h-4 text-secondary fill-secondary" />
          </motion.div>
        ))}
      </div>

      {/* Chubby Header */}
      <header className="relative z-10 bg-card/80 backdrop-blur-md border-b-4 border-primary/20 shadow-lg">
        <div className="container mx-auto px-4 py-5">
          <div className="flex justify-between items-center">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
              className="flex items-center gap-3"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-primary">Little Einstein</h1>
                <p className="text-sm text-secondary font-bold">$LILEIN 💜</p>
              </div>
            </motion.div>
            <Button className="bg-gradient-to-r from-primary to-accent hover:scale-105 transition-transform text-white font-bold rounded-full px-8 shadow-xl border-4 border-white/50">
              Connect Wallet ✨
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
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/30 to-secondary/30 rounded-full blur-3xl"
            />
            
            <div className="relative z-10 bg-gradient-to-br from-white to-accent/10 rounded-full p-8 shadow-2xl border-8 border-white">
              <motion.img 
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                src="https://cdn.hercules.app/file_2VCcJhyUUMPxSkCno8AKZwLH" 
                alt="Little Einstein" 
                className="w-full max-w-md mx-auto drop-shadow-2xl"
              />
            </div>
            
            {/* Cute Floating Elements */}
            {[
              { Icon: Atom, emoji: "⚛️", x: -15, y: -30, delay: 0 },
              { Icon: Beaker, emoji: "🧪", x: 35, y: -10, delay: 0.5 },
              { Icon: FlaskConical, emoji: "🔬", x: -25, y: 30, delay: 1 },
              { Icon: Brain, emoji: "🧠", x: 30, y: 35, delay: 1.5 }
            ].map(({ Icon, emoji, x, y, delay }, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [y, y - 20, y],
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay
                }}
                whileHover={{ scale: 1.3 }}
                className="absolute w-16 h-16 bg-white backdrop-blur-sm border-4 border-primary/30 rounded-2xl flex items-center justify-center shadow-xl cursor-pointer"
                style={{ 
                  left: `${50 + x}%`, 
                  top: `${50 + y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <span className="text-3xl">{emoji}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
              <div className="inline-flex items-center gap-3 mb-3">
                <Star className="w-10 h-10 text-secondary fill-secondary animate-spin-slow" />
                <h2 className="text-4xl md:text-5xl font-black text-primary">Presale Progress</h2>
                <Star className="w-10 h-10 text-secondary fill-secondary animate-spin-slow" />
              </div>
              <p className="text-xl text-foreground/70 font-bold">Join the cutest experiment in crypto! 🧪💜</p>
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

      {/* Why So Cute Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 container mx-auto px-4 py-20"
      >
        <div className="text-center space-y-4 mb-16">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block text-6xl mb-4"
          >
            🎨
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-balance">
            Why Little Einstein is <span className="text-primary">Adorable!</span> 💜
          </h2>
          <p className="text-2xl text-foreground/70 max-w-2xl mx-auto text-balance font-medium">
            Not just cute - we're genius-level smart too! 🧠✨
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              emoji: "🧠",
              title: "Big Brain Energy",
              description: "Smart contract audited! Your investment is as safe as Little Einstein's lab coat!"
            },
            {
              emoji: "👥",
              title: "Cutest Community",
              description: "Join 12,000+ adorable holders! We're like a big fluffy family of geniuses!"
            },
            {
              emoji: "📈",
              title: "Moon Mission",
              description: "Strategic tokenomics designed for explosive growth. To the moon, cutely! 🚀"
            },
            {
              emoji: "⚡",
              title: "Super Fast",
              description: "Lightning quick transactions! Faster than Little Einstein solving E=mc²!"
            },
            {
              emoji: "🎁",
              title: "Amazing Rewards",
              description: "Staking rewards, NFTs, and exclusive perks for our genius holders!"
            },
            {
              emoji: "💖",
              title: "Pure Love",
              description: "Made with love by a team who believes in cute + genius = success!"
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
              <Card className="h-full border-4 border-white bg-gradient-to-br from-white to-primary/5 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl">
                <CardContent className="p-8 space-y-4 text-center">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl mb-4"
                  >
                    {feature.emoji}
                  </motion.div>
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
        <div className="text-center space-y-4 mb-16">
          <div className="text-6xl mb-4">🧪</div>
          <h2 className="text-4xl md:text-6xl font-black">
            The Genius <span className="text-primary">Formula!</span> 💜
          </h2>
          <p className="text-2xl text-foreground/70 max-w-2xl mx-auto font-medium">
            Scientific distribution for maximum cuteness gains! 📊✨
          </p>
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

      {/* CTA Section - Extra Cute */}
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
              <div className="flex justify-center gap-4 mb-6">
                {["🚀", "💜", "🧪", "✨", "🧠"].map((emoji, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -20, 0],
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    className="text-5xl"
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-balance mb-6">
                Ready to be a <span className="text-primary">Genius?</span>
              </h2>
              <p className="text-2xl text-foreground/70 max-w-3xl mx-auto text-balance font-bold mb-8">
                Join Little Einstein's laboratory and become part of the cutest crypto revolution! Don't miss out on genius-level gains! 🎉💎
              </p>
              <div className="flex flex-wrap gap-6 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-white font-black text-2xl px-16 h-20 rounded-full shadow-2xl border-4 border-white">
                    <Rocket className="mr-3 w-8 h-8" />
                    Buy Now! 🎉
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="border-4 border-white bg-white/90 hover:bg-white text-2xl px-16 h-20 rounded-full font-black shadow-2xl text-foreground">
                    <Users className="mr-3 w-8 h-8" />
                    Join Us! 💜
                  </Button>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Cute Footer */}
      <footer className="relative z-10 bg-card/80 backdrop-blur-md border-t-4 border-primary/20 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-6">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-black text-primary">Little Einstein</h3>
                <p className="text-sm text-secondary font-bold">$LILEIN 💜</p>
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
