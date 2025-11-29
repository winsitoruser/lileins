import { motion } from "motion/react";
import { Atom, Beaker, Brain, CircuitBoard, FlaskConical, Rocket, SparklesIcon, TrendingUp, Users, Zap } from "lucide-react";
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

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-accent/10 rounded-full blur-3xl"
        />
        
        {/* Floating Formulas */}
        {["E=mc²", "π", "∑", "∫", "∞", "α", "β", "γ"].map((formula, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
            className="absolute text-primary/20 font-mono text-4xl font-bold"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`
            }}
          >
            {formula}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary">
              <Brain className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Little Einstein</h1>
              <p className="text-xs text-muted-foreground font-mono">$LILEIN</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#about" className="text-foreground/80 hover:text-primary transition-colors">About</a>
            <a href="#tokenomics" className="text-foreground/80 hover:text-primary transition-colors">Tokenomics</a>
            <a href="#roadmap" className="text-foreground/80 hover:text-primary transition-colors">Roadmap</a>
          </nav>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
            Connect Wallet
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
              <span className="text-primary font-bold text-sm flex items-center gap-2">
                <Zap className="w-4 h-4" />
                PRESALE LIVE NOW!
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
              Genius Level
              <span className="text-primary block mt-2">Meme Token</span>
            </h1>
            
            <p className="text-xl text-muted-foreground text-balance">
              Join the laboratory of innovation! Little Einstein combines the brilliance of science with the power of community-driven crypto. 
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 h-14">
                <Rocket className="mr-2 w-5 h-5" />
                Buy $LILEIN
              </Button>
              <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10 text-lg h-14 px-8">
                <FlaskConical className="mr-2 w-5 h-5" />
                Learn More
              </Button>
            </div>

            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-primary">$2.8M+</p>
                <p className="text-sm text-muted-foreground">Raised</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">12K+</p>
                <p className="text-sm text-muted-foreground">Holders</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">24/7</p>
                <p className="text-sm text-muted-foreground">Support</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-full blur-3xl"
              />
              <img 
                src="https://cdn.hercules.app/file_Pb5HPr06hchE93rmsspdhXwU" 
                alt="Little Einstein" 
                className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl"
              />
              
              {/* Floating Icons */}
              {[
                { Icon: Atom, delay: 0, x: -20, y: -40 },
                { Icon: Beaker, delay: 0.5, x: 30, y: -20 },
                { Icon: CircuitBoard, delay: 1, x: -30, y: 20 }
              ].map(({ Icon, delay, x, y }, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [y, y - 15, y],
                    rotate: [0, 15, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay
                  }}
                  className="absolute w-12 h-12 bg-card/80 backdrop-blur-sm border border-primary/30 rounded-lg flex items-center justify-center"
                  style={{ 
                    left: `${50 + x}%`, 
                    top: `${50 + y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <Icon className="w-6 h-6 text-primary" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Presale Progress Section */}
      <motion.section {...fadeInUp} className="relative z-10 container mx-auto px-4 py-12">
        <Card className="border-2 border-primary/30 bg-card/80 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
                  <SparklesIcon className="w-8 h-8 text-primary" />
                  Presale Progress
                  <SparklesIcon className="w-8 h-8 text-primary" />
                </h2>
                <p className="text-muted-foreground">Join the experiment before it's too late!</p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Raised</span>
                  <span className="text-muted-foreground">Target</span>
                </div>
                <div className="relative h-12 bg-muted rounded-full overflow-hidden border-2 border-primary/30">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-secondary"
                  >
                    <motion.div
                      animate={{ x: ["0%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  </motion.div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-background drop-shadow-md">
                      {progress.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-xl font-bold text-primary">
                    ${(raised / 1000000).toFixed(2)}M
                  </span>
                  <span className="text-xl font-bold text-muted-foreground">
                    ${(target / 1000000).toFixed(1)}M
                  </span>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="bg-muted/50 rounded-xl p-6 border border-primary/20">
                <p className="text-center text-sm text-muted-foreground mb-4">
                  Presale Ends In:
                </p>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: "Days", value: countdown.days },
                    { label: "Hours", value: countdown.hours },
                    { label: "Minutes", value: countdown.minutes },
                    { label: "Seconds", value: countdown.seconds }
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-card rounded-lg p-4 border border-primary/30 text-center">
                      <div className="text-3xl md:text-4xl font-bold text-primary font-mono">
                        {value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buy Section */}
              <div className="space-y-4">
                <div className="bg-muted/30 rounded-lg p-4 border border-primary/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Current Price</span>
                    <span className="text-2xl font-bold text-primary">$0.00042</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Next Price</span>
                    <span className="text-lg text-secondary">$0.00055</span>
                  </div>
                </div>
                <Button size="lg" className="w-full bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-primary-foreground font-bold text-xl h-16">
                  <Rocket className="mr-2 w-6 h-6" />
                  Buy $LILEIN Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Why Little Einstein Section */}
      <motion.section {...fadeInUp} id="about" className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">
            Why <span className="text-primary">Little Einstein</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            More than just a meme token - it's a revolutionary experiment in community-driven finance
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Brain,
              title: "Big Brain Energy",
              description: "Smart contract audited by leading security firms. Your investment protected by genius-level security."
            },
            {
              icon: Users,
              title: "Community Lab",
              description: "Join 12,000+ holders in our thriving community. Together we're building the future of meme finance."
            },
            {
              icon: TrendingUp,
              title: "Exponential Growth",
              description: "Strategic tokenomics designed for long-term value. Early holders get maximum rewards."
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              description: "Built on optimized blockchain technology for instant transactions and minimal fees."
            },
            {
              icon: FlaskConical,
              title: "Experimental Features",
              description: "Staking rewards, NFT collections, and exclusive holder benefits in our laboratory ecosystem."
            },
            {
              icon: Rocket,
              title: "To The Moon",
              description: "Backed by experienced team with proven track record in launching successful crypto projects."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Card className="h-full border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/30">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Tokenomics Section */}
      <motion.section {...fadeInUp} id="tokenomics" className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            The <span className="text-primary">Formula</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Scientific distribution model designed for sustainable growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Atom className="w-7 h-7 text-primary" />
                Token Distribution
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Presale", value: "40%", color: "bg-primary" },
                  { label: "Liquidity Pool", value: "25%", color: "bg-accent" },
                  { label: "Staking Rewards", value: "20%", color: "bg-secondary" },
                  { label: "Team & Development", value: "10%", color: "bg-chart-4" },
                  { label: "Marketing", value: "5%", color: "bg-chart-5" }
                ].map(({ label, value, color }) => (
                  <div key={label} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/90">{label}</span>
                      <span className="font-bold text-primary">{value}</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: value }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full ${color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/30 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <CircuitBoard className="w-7 h-7 text-primary" />
                Key Metrics
              </h3>
              <div className="space-y-6">
                {[
                  { label: "Total Supply", value: "100B $LILEIN" },
                  { label: "Initial Price", value: "$0.00042" },
                  { label: "Listing Price", value: "$0.00080" },
                  { label: "Network", value: "Ethereum" },
                  { label: "Tax", value: "3% Buy / 3% Sell" },
                  { label: "Min Purchase", value: "$25" }
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center p-4 bg-muted/30 rounded-lg border border-primary/10">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-bold text-primary">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Roadmap Section */}
      <motion.section {...fadeInUp} id="roadmap" className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            The <span className="text-primary">Experiment</span> Timeline
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our scientific roadmap to revolutionize meme token economics
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {[
            {
              phase: "Phase 1",
              title: "Launch & Ignition",
              items: ["Presale Launch", "Smart Contract Audit", "Website & Socials", "Community Building"],
              status: "complete"
            },
            {
              phase: "Phase 2",
              title: "Market Entry",
              items: ["DEX Listing", "CEX Applications", "Marketing Campaign", "10,000 Holders"],
              status: "active"
            },
            {
              phase: "Phase 3",
              title: "Expansion",
              items: ["Staking Platform", "NFT Collection", "Strategic Partnerships", "Major CEX Listings"],
              status: "upcoming"
            },
            {
              phase: "Phase 4",
              title: "Innovation",
              items: ["DeFi Integration", "Cross-chain Bridge", "DAO Governance", "100,000 Holders"],
              status: "upcoming"
            }
          ].map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <Card className={`border-2 ${phase.status === 'active' ? 'border-primary' : 'border-primary/20'} bg-card/50 backdrop-blur-sm`}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl border-2 flex-shrink-0 ${
                      phase.status === 'complete' ? 'bg-primary/20 border-primary text-primary' :
                      phase.status === 'active' ? 'bg-primary text-primary-foreground border-primary' :
                      'bg-muted border-muted-foreground/20 text-muted-foreground'
                    }`}>
                      {i + 1}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <span className="text-sm text-primary font-mono">{phase.phase}</span>
                        <h3 className="text-2xl font-bold mt-1">{phase.title}</h3>
                      </div>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {phase.items.map((item, j) => (
                          <li key={j} className="flex items-center gap-2 text-muted-foreground">
                            {phase.status === 'complete' && (
                              <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-primary rounded-full" />
                              </div>
                            )}
                            {phase.status === 'active' && (
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center"
                              >
                                <div className="w-2 h-2 bg-primary rounded-full" />
                              </motion.div>
                            )}
                            {phase.status === 'upcoming' && (
                              <div className="w-5 h-5 bg-muted rounded-full" />
                            )}
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section {...fadeInUp} className="relative z-10 container mx-auto px-4 py-20">
        <Card className="border-2 border-primary bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 backdrop-blur-sm">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">
              Ready to Join the <span className="text-primary">Laboratory</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Don't miss out on this revolutionary experiment. Be part of crypto history!
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <Button size="lg" className="bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-primary-foreground font-bold text-xl px-12 h-16">
                <Rocket className="mr-2 w-6 h-6" />
                Buy $LILEIN Now
              </Button>
              <Button size="lg" variant="outline" className="border-primary hover:bg-primary/10 text-xl px-12 h-16">
                Join Community
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-primary">Little Einstein</h3>
                  <p className="text-xs text-muted-foreground font-mono">$LILEIN</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                The genius meme token revolutionizing crypto with community-driven innovation.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
                <li><a href="#tokenomics" className="text-muted-foreground hover:text-primary transition-colors">Tokenomics</a></li>
                <li><a href="#roadmap" className="text-muted-foreground hover:text-primary transition-colors">Roadmap</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Whitepaper</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Audit Report</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contract</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Community</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Telegram</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Little Einstein. All rights reserved.</p>
            <p className="mt-2 text-xs">
              Cryptocurrency investments carry high risk. Invest responsibly.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
