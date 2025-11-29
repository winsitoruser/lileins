# 🎬 Animation Guide - Professional & Subtle

## 📋 Overview

Panduan lengkap untuk menggunakan animasi yang smooth, professional, dan tidak mengganggu UX.

**Prinsip Utama:**
- ✅ Smooth & Subtle
- ✅ Performance-oriented
- ✅ User-friendly (tidak distracting)
- ✅ Consistent & Reusable
- ✅ Accessible (reduced-motion support)

---

## 🎨 Animation Library

File: `/src/lib/animations.ts`

Berisi 40+ pre-built animation variants yang ready to use!

---

## 📦 Categories

### **1. Entrance Animations** (Page Load)

#### **fadeInUp** - Smooth dari bawah
```tsx
<motion.div
  variants={animations.fadeInUp}
  initial="hidden"
  animate="visible"
>
  Content
</motion.div>
```
**Effect:** Fade in + slide up 40px  
**Duration:** 0.6s  
**Best for:** Hero sections, headlines

#### **slideInLeft** - Dari kiri
```tsx
<motion.div
  variants={animations.slideInLeft}
  initial="hidden"
  animate="visible"
>
  Content
</motion.div>
```
**Effect:** Fade in + slide from left  
**Duration:** 0.7s  
**Best for:** Text content, feature lists

#### **scaleIn** - Scale dengan bounce
```tsx
<motion.div
  variants={animations.scaleIn}
  initial="hidden"
  animate="visible"
>
  Content
</motion.div>
```
**Effect:** Fade in + scale from 0.8 → 1  
**Duration:** 0.5s  
**Best for:** Icons, badges, stats

---

### **2. Scroll Animations** (Viewport Triggered)

#### **scrollFadeIn** - Muncul saat di-scroll
```tsx
<motion.div {...animations.scrollFadeIn}>
  Content
</motion.div>
```
**Effect:** Fade in when 100px before viewport  
**Trigger:** Once (tidak repeat)  
**Best for:** Sections, cards

**Example:**
```tsx
// Trust Badges Section
<motion.section {...animations.scrollFadeIn}>
  <h2>Trust Badges</h2>
  {/* Content */}
</motion.section>
```

---

### **3. Hover Animations** (Interactive)

#### **hoverLift** - Kartu terangkat
```tsx
<motion.div
  whileHover={animations.hoverLift}
  className="card"
>
  Card Content
</motion.div>
```
**Effect:**
- Scale: 1.02x
- Move up: 8px
- Shadow: Enhanced
- Duration: 0.3s

**Best for:** Cards, product items

#### **hoverScale** - Scale simple
```tsx
<motion.button
  whileHover={animations.hoverScale}
  whileTap={animations.buttonTap}
>
  Button Text
</motion.button>
```
**Effect:** Scale to 1.05x  
**Best for:** Buttons, clickable elements

---

### **4. Continuous Animations** (Ambient)

#### **floatingAnimation** - Mengambang gentle
```tsx
<motion.div
  animate={animations.floatingAnimation}
>
  Floating Element
</motion.div>
```
**Effect:** Up & down 15px  
**Duration:** 3s infinite  
**Best for:** Icons, decorative elements

#### **gentleRotate** - Rotasi subtle
```tsx
<motion.div
  animate={animations.gentleRotate}
>
  Rotating Icon
</motion.div>
```
**Effect:** ±5° rotation  
**Duration:** 4s infinite  
**Best for:** Logo, special icons

#### **subtlePulse** - Pulse halus
```tsx
<motion.div
  animate={animations.subtlePulse}
>
  Pulsing Badge
</motion.div>
```
**Effect:** Scale 1 → 1.03 + opacity  
**Duration:** 2s infinite  
**Best for:** Status indicators, badges

---

### **5. Stagger Animations** (Lists)

#### **staggerContainer + staggerItem**
```tsx
<motion.div
  variants={animations.staggerContainer}
  initial="hidden"
  animate="visible"
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={animations.staggerItem}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```
**Effect:** Children appear one by one  
**Delay:** 0.1s between items  
**Best for:** Feature grids, testimonials

---

## 🎯 Usage Examples

### **Example 1: Hero Section**

```tsx
<motion.section
  variants={animations.fadeInUp}
  initial="hidden"
  animate="visible"
>
  <motion.h1
    variants={animations.scaleIn}
    initial="hidden"
    animate="visible"
    transition={{ delay: 0.2 }}
  >
    Little Einstein 🧠
  </motion.h1>
  
  <motion.p
    variants={animations.fadeIn}
    initial="hidden"
    animate="visible"
    transition={{ delay: 0.4 }}
  >
    The cutest genius meme token!
  </motion.p>
  
  <motion.div
    variants={animations.slideInLeft}
    initial="hidden"
    animate="visible"
    transition={{ delay: 0.6 }}
  >
    <Button>Get Started</Button>
  </motion.div>
</motion.section>
```

---

### **Example 2: Feature Cards with Hover**

```tsx
<motion.div
  variants={animations.staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="grid grid-cols-3 gap-6"
>
  {features.map((feature, i) => (
    <motion.div
      key={i}
      variants={animations.staggerItem}
      whileHover={animations.hoverLift}
    >
      <Card>
        <motion.div animate={animations.floatingAnimation}>
          {feature.icon}
        </motion.div>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </Card>
    </motion.div>
  ))}
</motion.div>
```

---

### **Example 3: Floating Background Elements**

```tsx
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  {['⚗️', '🧪', '💎'].map((emoji, i) => (
    <motion.div
      key={i}
      animate={{
        ...animations.floatingAnimation,
        x: animations.gentleWave.x,
      }}
      transition={{
        duration: 5 + i * 2,
        repeat: Infinity,
        delay: i * 0.5
      }}
      className="absolute text-6xl opacity-20"
      style={{
        left: `${10 + i * 30}%`,
        top: `${20 + i * 20}%`
      }}
    >
      {emoji}
    </motion.div>
  ))}
</div>
```

---

### **Example 4: Button with Micro-interactions**

```tsx
<motion.button
  whileHover={animations.buttonHover}
  whileTap={animations.buttonTap}
  className="bg-primary text-white px-6 py-3 rounded-full"
>
  <motion.span animate={animations.gentleRotate}>
    ⚗️
  </motion.span>
  Swap Tokens
</motion.button>
```

---

## ⚡ Performance Tips

### **1. Use `whileInView` untuk Lazy Loading**

```tsx
// ❌ Bad - Animates immediately
<motion.div animate={{ y: [0, -20, 0] }}>
  Content far down the page
</motion.div>

// ✅ Good - Animates when visible
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

### **2. Use `willChange` untuk GPU Acceleration**

```tsx
<motion.div
  style={{ willChange: 'transform, opacity' }}
  animate={{ x: 100 }}
>
  Fast Animation
</motion.div>
```

### **3. Limit Continuous Animations**

```tsx
// ❌ Bad - Too many continuous animations
{[...Array(50)].map((_, i) => (
  <motion.div animate={animations.floatingAnimation} />
))}

// ✅ Good - Reasonable amount
{[...Array(5)].map((_, i) => (
  <motion.div animate={animations.floatingAnimation} />
))}
```

### **4. Use `viewport.once` untuk One-time Triggers**

```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ 
    once: true,  // Don't re-trigger
    margin: '-100px'  // Trigger earlier
  }}
>
  Content
</motion.div>
```

---

## 🎨 Best Practices

### **DO's** ✅

1. **Use Entrance Animations Sparingly**
   - Main headline: Yes
   - Every paragraph: No
   - Feature cards: Yes (with stagger)

2. **Hover Effects on Interactive Elements**
   ```tsx
   <motion.button whileHover={animations.hoverScale}>
     Click me
   </motion.button>
   ```

3. **Scroll Animations for Sections**
   ```tsx
   <motion.section {...animations.scrollFadeIn}>
     Section content
   </motion.section>
   ```

4. **Continuous Animations for Accents Only**
   ```tsx
   // Good: Logo icon
   <motion.div animate={animations.gentleRotate}>
     🧪
   </motion.div>
   
   // Bad: Every text element
   ```

### **DON'Ts** ❌

1. **Don't Animate Everything**
   - Not every element needs animation
   - Focus on key elements only

2. **Don't Use Long Durations**
   ```tsx
   // ❌ Too slow
   transition={{ duration: 3 }}
   
   // ✅ Just right
   transition={{ duration: 0.6 }}
   ```

3. **Don't Create Loops That Distract**
   ```tsx
   // ❌ Annoying
   animate={{ scale: [1, 2, 1] }}
   transition={{ repeat: Infinity, duration: 0.5 }}
   
   // ✅ Subtle
   animate={{ scale: [1, 1.05, 1] }}
   transition={{ repeat: Infinity, duration: 3 }}
   ```

4. **Don't Forget Reduced Motion**
   ```tsx
   const shouldReduce = window.matchMedia(
     '(prefers-reduced-motion: reduce)'
   ).matches;
   
   <motion.div
     animate={shouldReduce ? {} : animations.floatingAnimation}
   >
     Content
   </motion.div>
   ```

---

## 📱 Mobile Considerations

### **Reduce Complexity on Mobile**

```tsx
const isMobile = window.innerWidth < 768;

<motion.div
  animate={isMobile ? {} : animations.floatingAnimation}
>
  Content
</motion.div>
```

### **Touch-Friendly Interactions**

```tsx
<motion.button
  whileHover={animations.hoverScale}  // Desktop
  whileTap={animations.buttonTap}    // Mobile
>
  Button
</motion.button>
```

---

## 🎯 Animation Checklist

### **Before Deploying:**
- [ ] Entrance animations < 1s duration
- [ ] Hover effects respond in < 0.3s
- [ ] Continuous animations are subtle (< 15px movement)
- [ ] Scroll animations use `viewport.once`
- [ ] No more than 5 continuous animations per page
- [ ] All animations have `ease` curves
- [ ] Mobile version is optimized
- [ ] Reduced motion is respected
- [ ] Performance tested (60fps)
- [ ] Accessibility verified

---

## 🔧 Quick Start Replacements

### **Replace Old Animations:**

**Before (Old Style):**
```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  Content
</motion.div>
```

**After (New Library):**
```tsx
<motion.div
  variants={animations.fadeInUp}
  initial="hidden"
  animate="visible"
>
  Content
</motion.div>
```

**Benefits:**
- ✅ Consistent timing
- ✅ Professional easing
- ✅ Reusable
- ✅ Maintainable

---

## 📊 Animation Performance Metrics

### **Target Metrics:**
- Entrance: 400-600ms
- Hover: 200-300ms  
- Scroll trigger: 500-700ms
- Continuous: 2-5s loop
- FPS: Maintain 60fps
- Layout shift: < 0.1

---

## 🎬 Advanced Techniques

### **Parallax Scrolling**

```tsx
const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 1000], [0, -200]);

<motion.div style={{ y }}>
  Parallax Content
</motion.div>
```

### **Shared Layout Animations**

```tsx
<motion.div layoutId="card-1">
  Card
</motion.div>

// On another page
<motion.div layoutId="card-1">
  Expanded Card
</motion.div>
```

### **Gesture Animations**

```tsx
<motion.div
  drag
  dragConstraints={{ left: 0, right: 300 }}
  dragElastic={0.2}
>
  Draggable
</motion.div>
```

---

## 🎉 Summary

**Animation Library Created:**
- ✅ 40+ pre-built variants
- ✅ Performance-optimized
- ✅ Consistent timing & easing
- ✅ Easy to use & maintain
- ✅ Mobile-friendly
- ✅ Accessibility support

**Import dan gunakan:**
```tsx
import * as animations from '@/lib/animations';

<motion.div variants={animations.fadeInUp}>
  Beautiful Content
</motion.div>
```

**Result:**
- Smooth, professional animations
- Better UX tanpa distraction
- Consistent across all pages
- Easy to maintain & update

---

**Status:** ✅ READY TO USE!  
**Next:** Apply to all components! 🚀✨
