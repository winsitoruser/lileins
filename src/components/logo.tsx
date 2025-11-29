import { motion } from "motion/react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
}

export default function Logo({ size = "md", animated = true }: LogoProps) {
  const sizeClasses = {
    sm: "w-12 h-12 text-xl",
    md: "w-16 h-16 text-2xl",
    lg: "w-24 h-24 text-4xl",
    xl: "w-32 h-32 text-5xl"
  };

  const LogoContent = () => (
    <div className={`${sizeClasses[size]} relative flex items-center justify-center rounded-full bg-gradient-to-br from-primary via-accent to-secondary shadow-2xl border-4 border-white overflow-hidden`}>
      {/* Animated background glow */}
      <motion.div
        animate={animated ? {
          rotate: 360,
          scale: [1, 1.2, 1]
        } : {}}
        transition={{
          duration: 8,
          repeat: animated ? Infinity : 0,
          ease: "linear"
        }}
        className="absolute inset-0 bg-gradient-to-br from-accent/50 via-secondary/50 to-primary/50 blur-xl"
      />
      
      {/* Main logo content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Lab flask emoji or Einstein symbol */}
        <motion.div
          animate={animated ? {
            scale: [1, 1.15, 1],
            rotate: [0, 5, -5, 0]
          } : {}}
          transition={{
            duration: 2,
            repeat: animated ? Infinity : 0
          }}
          className="text-white drop-shadow-lg"
        >
          🧪
        </motion.div>
        
        {/* Little text badge */}
        <div className="absolute -bottom-1 bg-white rounded-full px-2 py-0.5 shadow-lg">
          <span className="text-[8px] font-black text-primary">LE</span>
        </div>
        
        {/* Sparkle effects */}
        {animated && (
          <>
            <motion.div
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0
              }}
              className="absolute -top-1 -right-1 text-yellow-300 text-xs"
            >
              ✨
            </motion.div>
            <motion.div
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                rotate: [0, -180, -360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1
              }}
              className="absolute -bottom-1 -left-1 text-yellow-300 text-xs"
            >
              ✨
            </motion.div>
          </>
        )}
      </div>
    </div>
  );

  return animated ? (
    <motion.div
      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
      transition={{ duration: 0.3 }}
    >
      <LogoContent />
    </motion.div>
  ) : (
    <LogoContent />
  );
}
