import { motion } from "motion/react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import HeaderSecond from "@/components/partials/HeaderSecond";

export default function Tokenomics() {
  const headers = [
    "Category",
    "Allocation (Tokens)",
    "Percentage",
    "Strategic Purpose",
  ];

  const headersVesting = [
    "Category",
    "Allocations",
    "Token Unlocked",
    "Included Circulating Supply",
    "Notes",
  ];

  const headersMonth1 = [
    "Month",
    "Presale Unlock",
    "Marketing Unlock",
    "Staking Rewards",
    "Liquidity & CEX",
    "Estimated Circulating Supply",
    "Community/Event Highlight",
  ];

  const headersMonth2 = [
    "Month",
    "Presale Unlock",
    "Marketing Unlock",
    "Staking Rewards",
    "Liquidity & CEX",
    "Estimated Circulating Supply",
    "Community/Event Highlight",
  ];

  const rows = [
    {
      category: "Category",
      allocation: "5,000,000,000",
      percentage: "25%",
      purpose: "Initial Distribution and Fundraising.",
    },
    {
      category: "Allocations",
      allocation: "4,000,000,000",
      percentage: "20%",
      purpose: "Einstein Endowment - Funding for $EinzStake.",
    },
    {
      category: "Chain Reserves/Treasury",
      allocation: "4,400,000,000",
      percentage: "22%",
      purpose: "Future Ecosystem Development and Maintenance.",
    },
    {
      category: "Liquidity (DEX)",
      allocation: "2,200,000,000",
      percentage: "11%",
      purpose: "Providing Liquidity for $EinzSwap.",
    },
    {
      category: "CEX Reserves",
      allocation: "2,200,000,000",
      percentage: "11%",
      purpose: "Reserves for Centralized Exchange Listings.",
    },
    {
      category: "Marketing & Partnership",
      allocation: "2,200,000,000",
      percentage: "11%",
      purpose: "Market Expansion and User Acquisition.",
    },
  ];

  const rowsVesting = [
    {
      category: "Presale",
      allocation: "25%",
      token: "0",
      supply: "No",
      notes: "0% at Token  Generation Event(TGE)  , 2 Month Cliff, Then 15% Monthly",
    },
    {
      category: "Chain Reserves",
      allocation: "-",
      token: "0",
      supply: "No",
      notes: "Locked Untill 1 weeks after Einstein chain Release ",
    },
    {
      category: "Staking & Rewards",
      allocation: "-",
      token: "15% of Allocations",
      supply: "No/Innitialy",
      notes: "Only Enter Supply When user enter/claim Rewards",
    },
    {
      category: "Marketing",
      allocation: "-",
      token: "0",
      supply: "No",
      notes: "2 Month cliff then 10% Monthly",
    },
    {
      category: "Liquidity",
      allocation: "-",
      token: "100%",
      supply: "Yes",
      notes: "Fully Unlocked at launch",
    },
    {
      category: "Cex Reserves",
      allocation: "-",
      token: "100%",
      supply: "Yes",
      notes: "Fully Unlocked at launch",
    },
  ];

  const rowsMonth1 = [
    {
      month: "Launch",
      presale: "0",
      marketing: "0",
      staking: "600M",
      liquidity: "4.4B+2.2B",
      estimated: "6.6B",
      community: "Launch Celebration: AMA, NFT airdrop for early supporters",
    },
    {
      month: "1",
      presale: "0",
      marketing: "0",
      staking: "+600M",
      liquidity: "-",
      estimated: "~ 7.2B",
      community: "Staker Spotlight: leaderboard, highlight early stakers",
    },
    {
      month: "2",
      presale: "0",
      marketing: "0",
      staking: "+600M",
      liquidity: "-",
      estimated: "~ 7.8B",
      community: "Cliff Countdown: 2 months cliff ends, teaser presale unlock",
    },
    {
      month: "3",
      presale: "750M",
      marketing: "200M",
      staking: "+600M",
      liquidity: "-",
      estimated: "~ 9.37B",
      community: "Presale & Marketing Unlock Event: livestream countdown, unlock simulator",
    },
    {
      month: "4",
      presale: "750M",
      marketing: "200M",
      staking: "+600M",
      liquidity: "-",
      estimated: "~ 10.94B",
      community: "Referral Boosters: reward users who bring in new participants",
    },
    {
      month: "5",
      presale: "750M",
      marketing: "200M",
      staking: "+600M",
      liquidity: "-",
      estimated: "~ 12.51B",
      community: "Mini Game Challenge: NFT or token reward for engagement",
    },
    {
      month: "6",
      presale: "750M",
      marketing: "200M",
      staking: "+600M",
      liquidity: "-",
      estimated: "~ 14.58B",
      community: "Marketing Milestone: major community campaign, staking APR boost",
    },
  ];

  const rowsMonth2 = [
    {
      month: "7",
      presale: "750M",
      marketing: "220M",
      staking: "+600M",
      liquidity: "-",
      estimated: "~ 15.65 B",
      community: "Community Event: meme contest, milestone celebration",
    },
    {
      month: "8",
      presale: "750M",
      marketing: "220M",
      staking: "+600M",
      liquidity: "-",
      estimated: "~ 17.22 B",
      community: "Staking Achievement Rewards: top stakers get exclusive NFT/bonus tokens",
    },
    {
      month: "9",
      presale: "750M",
      marketing: "200M",
      staking: "+600M",
      liquidity: "-",
      estimated: "~ 18.79B",
      community: "Social Media Campaign: unlock countdown, meme challenges",
    },
    {
      month: "10",
      presale: "750M",
      marketing: "200M",
      staking: "+600M",
      liquidity: "-",
      estimated: "~ 20.36 B",
      community: "Liquidity Boost Week: small rewards for liquidity providers",
    },
    {
      month: "11",
      presale: "750M",
      marketing: "200M",
      staking: "+600M",
      liquidity: "-",
      estimated: "~ 21.93B",
      community: "Community AMA: progress update, leaderboard spotlight",
    },
    {
      month: "12",
      presale: "750M",
      marketing: "200M",
      staking: "+600M",
      liquidity: "-",
      estimated: "~ 123.5 B",
      community: "1-Year Anniversary: major event, roadmap update, special NFT/token giveaway",
    },
  ];

  const MotionRow = ({ children, mb = "mb-2" }: { children: React.ReactNode; mb?: string }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      whileHover={{ scale: 1.03, x: 5 }}
      className={`flex items-center gap-3 bg-white rounded-xl p-4 border-2 border-primary/20 shadow ${mb}`}
    >
      <div className="w-full grid grid-cols-4 gap-5">{children}</div>
    </motion.div>
  );

  const MotionRow5 = ({ children, mb = "mb-2" }: { children: React.ReactNode; mb?: string }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      whileHover={{ scale: 1.03, x: 5 }}
      className={`flex items-center gap-3 bg-white rounded-xl p-4 border-2 border-primary/20 shadow ${mb}`}
    >
      <div className="w-full grid grid-cols-5 gap-5">{children}</div>
    </motion.div>
  );

  const MotionRow7 = ({ children, mb = "mb-2" }: { children: React.ReactNode; mb?: string }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      whileHover={{ scale: 1.03, x: 5 }}
      className={`flex items-center gap-3 bg-white rounded-xl p-4 border-2 border-primary/20 shadow ${mb}`}
    >
      <div className="w-full grid grid-cols-7 gap-5">{children}</div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-primary/5 to-accent/5 relative overflow-hidden">
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12 py-20"
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
                Abstract & Introduction 🚀
              </h2>
              <p className="text-lg md:text-xl text-foreground/70 font-semibold max-w-7xl mx-auto">
                Little Einstein ($Einz) is a digital asset built on the principle of Smart Utility, aiming to address common liquidity and transparency issues within the DeFi space. We introduce $EinzSwap, $EinzStake, and $EinzExplorer as the pillars of our ecosystem. This document details the tokenomic architecture and growth strategy.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-6 border-white bg-linear-to-br from-secondary/10 to-accent/10 shadow-xl rounded-3xl">
                <CardContent className="py-6 px-10 text-center">

                  {/* Header */}
                  <MotionRow mb="mb-3">
                    {headers.map((title) => (
                      <div key={title} className="flex items-center gap-2">
                        <span className="text-xl">✨</span>
                        <span className="font-bold text-foreground">{title}</span>
                      </div>
                    ))}
                  </MotionRow>

                  {/* Rows */}
                  {rows.map((row, idx) => (
                    <MotionRow key={idx}>
                      <div className="flex items-center gap-2">
                        <span>✨</span>
                        <span>{row.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>✨</span>
                        <span>{row.allocation}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>✨</span>
                        <span>{row.percentage}</span>
                      </div>
                      <div className="flex items-center text-left gap-2">
                        <span>✨</span>
                        <span>{row.purpose}</span>
                      </div>
                    </MotionRow>
                  ))}

                  {/* TOTAL */}
                  <MotionRow>
                    <div className="flex items-center gap-2">
                      <span>✨</span>
                      <span className="font-bold">TOTAL</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>✨</span>
                      <span className="font-bold">20,000,000,000</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>✨</span>
                      <span className="font-bold">100%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span></span>
                      <span></span>
                    </div>
                  </MotionRow>

                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <div className="text-center mb-8">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block text-6xl mb-4"
            >
              💰
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
              Vesting Strategy (Anti-Dumping Mechanism) 💎
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 font-semibold max-w-7xl mx-auto">
              Vesting is central to $Einz's price stability.
            </p>
          </div>

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
                        className="bg-linear-to-r from-muted/50 to-muted/30 rounded-2xl p-4 border-2 border-primary/20"
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
                            className={`h-full bg-linear-to-r ${item.color} rounded-full`}
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12 py-20"
          >
            <div className="text-center mb-8">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block text-6xl mb-4"
              >
                🚀
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
                Token Vesting 📅
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-6 border-white bg-linear-to-br from-secondary/10 to-accent/10 shadow-xl rounded-3xl">
                <CardContent className="py-6 px-10 text-center">

                  {/* Header */}
                  <MotionRow5 mb="mb-3">
                    {headersVesting.map((title) => (
                      <div key={title} className="flex items-center gap-2">
                        <span className="text-xl">✨</span>
                        <span className="font-bold text-foreground text-left">{title}</span>
                      </div>
                    ))}
                  </MotionRow5>

                  {/* Rows */}
                  {rowsVesting.map((row, idx) => (
                    <MotionRow5 key={idx}>
                      <div className="flex items-center gap-2">
                        <span>✨</span>
                        <span>{row.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>✨</span>
                        <span>{row.allocation}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>✨</span>
                        <span>{row.token}</span>
                      </div>
                      <div className="flex items-center text-left gap-2">
                        <span>✨</span>
                        <span>{row.supply}</span>
                      </div>
                      <div className="flex items-center text-left gap-2">
                        <span>✨</span>
                        <span>{row.notes}</span>
                      </div>
                    </MotionRow5>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5"
            >
              <Card className="border-6 border-white bg-linear-to-br from-secondary/10 to-accent/10 shadow-xl rounded-3xl">
                <CardContent className="py-6 px-10 text-center">

                  {/* Header */}
                  <MotionRow7 mb="mb-3">
                    {headersMonth1.map((title) => (
                      <div key={title} className="flex items-center gap-2">
                        <span className="text-xl">✨</span>
                        <span className="font-bold text-foreground text-left">{title}</span>
                      </div>
                    ))}
                  </MotionRow7>

                  {/* Rows */}
                  {rowsMonth1.map((row, idx) => (
                    <MotionRow7 key={idx}>
                      <div className="flex items-center gap-2">
                        <span>✨</span>
                        <span>{row.month}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>✨</span>
                        <span>{row.presale}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>✨</span>
                        <span>{row.marketing}</span>
                      </div>
                      <div className="flex items-center text-left gap-2">
                        <span>✨</span>
                        <span>{row.staking}</span>
                      </div>
                      <div className="flex items-center text-left gap-2">
                        <span>✨</span>
                        <span>{row.liquidity}</span>
                      </div>
                      <div className="flex items-center text-left gap-2">
                        <span>✨</span>
                        <span>{row.estimated}</span>
                      </div>
                      <div className="flex items-center text-left gap-2">
                        <span>✨</span>
                        <span>{row.community}</span>
                      </div>
                    </MotionRow7>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5"
            >
              <Card className="border-6 border-white bg-linear-to-br from-secondary/10 to-accent/10 shadow-xl rounded-3xl">
                <CardContent className="py-6 px-10 text-center">

                  {/* Header */}
                  <MotionRow7 mb="mb-3">
                    {headersMonth2.map((title) => (
                      <div key={title} className="flex items-center gap-2">
                        <span className="text-xl">✨</span>
                        <span className="font-bold text-foreground text-left">{title}</span>
                      </div>
                    ))}
                  </MotionRow7>

                  {/* Rows */}
                  {rowsMonth2.map((row, idx) => (
                    <MotionRow7 key={idx}>
                      <div className="flex items-center gap-2">
                        <span>✨</span>
                        <span>{row.month}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>✨</span>
                        <span>{row.presale}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>✨</span>
                        <span>{row.marketing}</span>
                      </div>
                      <div className="flex items-center text-left gap-2">
                        <span>✨</span>
                        <span>{row.staking}</span>
                      </div>
                      <div className="flex items-center text-left gap-2">
                        <span>✨</span>
                        <span>{row.liquidity}</span>
                      </div>
                      <div className="flex items-center text-left gap-2">
                        <span>✨</span>
                        <span>{row.estimated}</span>
                      </div>
                      <div className="flex items-center text-left gap-2">
                        <span>✨</span>
                        <span>{row.community}</span>
                      </div>
                    </MotionRow7>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
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
