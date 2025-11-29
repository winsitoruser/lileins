// Animation Variants Library
// Smooth, professional animations that enhance UX without being distracting

import type { Variants } from 'motion/react';

// ============================================
// ENTRANCE ANIMATIONS (Page Load)
// ============================================

export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] // Custom easing
    }
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1] // Bouncy effect
    }
  }
};

// ============================================
// STAGGER ANIMATIONS (Lists & Grids)
// ============================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

// ============================================
// HOVER ANIMATIONS (Interactive Elements)
// ============================================

export const hoverScale = {
  scale: 1.05,
  transition: {
    duration: 0.2,
    ease: 'easeOut' as const
  }
};

export const hoverLift = {
  y: -8,
  scale: 1.02,
  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
  transition: {
    duration: 0.3,
    ease: 'easeOut' as const
  }
};

export const hoverGlow = {
  boxShadow: '0 0 30px rgba(147, 51, 234, 0.5)',
  transition: {
    duration: 0.3
  }
};

// ============================================
// CONTINUOUS ANIMATIONS (Ambient Effects)
// ============================================

export const floatingAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut' as const
  }
};

export const gentleRotate = {
  rotate: [0, 5, -5, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut' as const
  }
};

export const subtlePulse = {
  scale: [1, 1.03, 1],
  opacity: [0.8, 1, 0.8],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut' as const
  }
};

export const gentleWave = {
  x: [0, 10, -10, 0],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: 'easeInOut' as const
  }
};

// ============================================
// SCROLL ANIMATIONS (Viewport Triggered)
// ============================================

export const scrollFadeIn = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: 'easeOut' as const }
};

export const scrollSlideIn = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

// ============================================
// BUTTON ANIMATIONS
// ============================================

export const buttonHover = {
  scale: 1.05,
  transition: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 10
  }
};

export const buttonTap = {
  scale: 0.95,
  transition: {
    duration: 0.1
  }
};

// ============================================
// CARD ANIMATIONS
// ============================================

export const cardHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  hover: {
    scale: 1.03,
    y: -8,
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// ============================================
// LOADING ANIMATIONS
// ============================================

export const spinner = {
  rotate: 360,
  transition: {
    duration: 1,
    repeat: Infinity,
    ease: 'linear'
  }
};

export const pulseAnimation = {
  scale: [1, 1.2, 1],
  opacity: [0.7, 1, 0.7],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: 'easeInOut' as const
  }
};

// ============================================
// SPECIAL EFFECTS
// ============================================

export const glowPulse = {
  textShadow: [
    '0 0 10px rgba(147, 51, 234, 0.5)',
    '0 0 20px rgba(147, 51, 234, 0.8)',
    '0 0 10px rgba(147, 51, 234, 0.5)',
  ],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut' as const
  }
};

export const shimmer = {
  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'linear' as const
  }
};

// ============================================
// NUMBERS/COUNTERS ANIMATION
// ============================================

export const countUp = (duration: number = 2) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration,
    ease: 'easeOut' as const
  }
});

// ============================================
// MODAL/DIALOG ANIMATIONS
// ============================================

export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

export const modalContent: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: {
      duration: 0.2
    }
  }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

export const getStaggerDelay = (index: number, baseDelay: number = 0.1) => ({
  delay: index * baseDelay
});

export const createCustomEase = (x1: number, y1: number, x2: number, y2: number) => [x1, y1, x2, y2];

// Popular easing curves
export const easings = {
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeOutExpo: [0.19, 1, 0.22, 1],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  spring: { type: 'spring', stiffness: 300, damping: 20 }
} as const;

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Use these for GPU-accelerated animations
export const willChange = {
  willChange: 'transform, opacity'
} as const;

// Use layoutId for smooth shared element transitions
export const sharedLayoutProps = (id: string) => ({
  layoutId: id,
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 30
  }
});
