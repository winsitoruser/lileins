import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const COLORS = {
    primary: "#8B87FF",
    secondary: "#FFD6A5",
    accent: "#FFB7E3",
    textDim: "#A1A1AA",
    highlight: "#FFFFFF",
};

const roadmapImages = Array.from({ length: 5 }, (_, i) => `/images/${i + 1}.png`);

const ScrollRoadmap: React.FC = () => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    const roadmapData = [
        {
            quarter: "M1",
            title: "Genesis & Liquidity",
            description: "",
            tag: "Launch",
            points: [
                "TGE",
                "Token Launch",
                "DEX Listing ($EinzSwap)",
                "Unlocking of Liquidity & CEX Reserves",
            ],
        },
        {
            quarter: "M2",
            title: "Testing & Security",
            description: "",
            tag: "",
            points: [
                "Full Contract Audit",
                "$EinzStake (Beta Test) Launch",
                "End of Cliff Countdown",
            ],
        },
        {
            quarter: "M3",
            title: "Transparency & Unlocks",
            description: "",
            tag: "",
            points: [
                "1st Presale Vesting Unlock (15%)",
                "Full $EinzExplorer Launch",
                "Major Marketing Campaign Kickoff",
            ],
        },
        {
            quarter: "M4 - M7",
            title: "Intelligence & Growth",
            description: "",
            tag: "",
            points: [
                "Yield Farming Feature Integration on $EinzSwap",
                "Release of New Staking Contracts",
                "Minor CEX Listings",
            ],
        },
        {
            quarter: "M8 - M12",
            title: "Scale & Innovation",
            description: "",
            tag: "",
            points: [
                "Major CEX Listing",
                "Development of V2 Ecosystem (e.g., $Einz Governance Protocol)",
                "Annual Community Event",
            ],
        },
    ];

    useEffect(() => {
        setIsMounted(true);

        const handleScroll = () => {
            const target = targetRef.current;
            if (!target) return;

            const rect = target.getBoundingClientRect();
            const totalItems = roadmapData.length;
            const windowHeight = window.innerHeight;

            // 🔒 belum masuk section → tetap index 0
            if (rect.top > 0) {
                setActiveIndex(0);
                return;
            }

            const scrollableHeight = rect.height - windowHeight;
            if (scrollableHeight <= 0) return;

            const scrolled = Math.abs(rect.top);
            const progress = Math.min(1, Math.max(0, scrolled / scrollableHeight));

            const index = Math.min(
                Math.floor(progress * totalItems),
                totalItems - 1
            );

            setActiveIndex(index);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [roadmapData.length]);

    return (
        <div className="relative w-full">
            <div
                ref={targetRef}
                style={{ height: `${roadmapData.length * 100}vh` }}
                className="relative w-full"
            >
                <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                    <div className="opacity-45">
                        <div className="absolute bottom-[calc(33%)] left-[calc(100%-33rem)] w-[500px] h-[300px] rotate-40 bg-[linear-gradient(180deg,#7b75ff_0%,#fe8d00_100%)] opacity-30 blur-[100px] rounded-[50rem] pointer-events-none animate-flare-drift "></div>
                        <div className="absolute top-[calc(100%-60rem)] right-[calc(100%-15rem)] w-[500px] h-[300px] rotate-40 bg-[linear-gradient(-180deg,#7b75ff_0%,#fe8d00_100%)] opacity-30 blur-[100px] rounded-[50rem] pointer-events-none animate-flare-drift  "></div>
                    </div>
                    <div className="relative w-full container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                        {/* --- LEFT SIDE: TEXT CONTENT --- */}
                        <div className="relative z-10 order-2 lg:order-1 flex flex-col justify-center">
                            {roadmapData.map((item, index) => {
                                const isActive = index === activeIndex;
                                return (
                                    <div
                                        key={index}
                                        className="absolute max-lg:bottom-0 top-[unset] left-0 w-full transition-all duration-700 ease-out flex flex-col justify-center"
                                        style={{
                                            opacity: isActive ? 1 : 0,
                                            transform: isActive
                                                ? "translateY(0)"
                                                : "translateY(30px)",
                                            pointerEvents: isActive ? "all" : "none",
                                        }}
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <span
                                                className="font-bold text-xl tracking-widest uppercase"
                                                style={{ color: COLORS.accent }}
                                            >
                                                {item.quarter}
                                            </span>
                                            <span
                                                className="px-3 py-1 rounded-full text-xs font-mono border"
                                                style={{
                                                    backgroundColor: `${COLORS.primary}15`,
                                                    color: COLORS.primary,
                                                    borderColor: `${COLORS.primary}30`,
                                                }}
                                            >
                                                {item.tag}
                                            </span>
                                        </div>
                                        <h2 className="text-[36px] md:text-[42px] font-bold text-primary mb-6 leading-tight">
                                            {item.title}
                                        </h2>
                                        <ul className="space-y-2">
                                            {item.points.map((point, i) => (
                                                <li
                                                    key={i}
                                                    className="text-sm md:text-sm leading-relaxed max-w-md border-l-2 pl-6 border-l-secondary"
                                                >
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>

                        {/* --- RIGHT SIDE: 3D STACK --- */}
                        <div className="relative order-1 lg:order-2 flex items-center justify-center h-[600px] perspective-container">
                            <div
                                className="absolute transition-all duration-700 rounded-full!"
                                style={{
                                    width: `200px`,
                                    height: `200px`,
                                    top: "7rem",
                                    transformStyle: "preserve-3d",
                                    transform: `rotateX(60deg) rotateZ(-45deg) translateZ(30px)`,
                                    zIndex: 2,
                                    opacity: activeIndex === 5 ? 1 : 0,
                                    transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
                                }}
                            >
                                <div
                                    className="absolute inset-0 border flex items-center justify-center backface-hidden rounded-full!"
                                    style={{
                                        borderColor: "rgba(255,255,255,0)",
                                        transition: "border-color 0.5s ease",
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 transition-opacity duration-700 blur-[60px] opacity-30 rounded-full!"
                                        style={{
                                            backgroundColor: COLORS.secondary,
                                        }}
                                    />
                                </div>
                            </div>

                            <div className={`relative w-0 h-0 transform-style-3d transition-all duration-1000 ${isMounted ? "opacity-100" : "opacity-0"}`}>
                                {roadmapData.map((_, index) => {
                                    const isActive = index === activeIndex;
                                    const widthSize = 500;
                                    const heightSize = 500;
                                    const halfSize = widthSize / 2;

                                    return (
                                        <div
                                            key={index}
                                            className="absolute transition-all duration-700"
                                            style={{
                                                width: `${widthSize}px`,
                                                height: `${heightSize}px`,
                                                left: `-${halfSize}px`,
                                                top: `-${halfSize}px`,
                                            }}
                                        >
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
                                            <div className="absolute inset-0 flex z-10 items-center justify-center">
                                                <motion.img
                                                    src={roadmapImages[index]}
                                                    alt={`Roadmap ${index + 1}`}
                                                    className="w-full h-full object-contain"
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0.95,
                                                        y: 10,
                                                    }}
                                                    animate={{
                                                        opacity: isActive ? 1 : 0,
                                                        scale: isActive ? 1 : 0.97,
                                                        y: isActive ? 0 : 10,
                                                    }}
                                                    transition={{
                                                        duration: 0.6,
                                                        ease: [0.25, 1, 0.5, 1],
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScrollRoadmap;