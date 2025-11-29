// Animation Showcase Component
// Demo semua animasi yang tersedia dengan examples

import { motion } from 'motion/react';
import * as animations from '@/lib/animations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function AnimationShowcase() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Entrance Animations */}
      <section>
        <h2 className="text-3xl font-black mb-6">Entrance Animations</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* fadeInUp */}
          <motion.div
            variants={animations.fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle>fadeInUp</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Smooth fade in + slide up</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Duration: 0.6s
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* slideInLeft */}
          <motion.div
            variants={animations.slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle>slideInLeft</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Slide from left</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Duration: 0.7s
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* scaleIn */}
          <motion.div
            variants={animations.scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle>scaleIn</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Scale with bounce</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Duration: 0.5s
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Hover Animations */}
      <section>
        <h2 className="text-3xl font-black mb-6">Hover Animations</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* hoverLift */}
          <motion.div whileHover={animations.hoverLift}>
            <Card className="cursor-pointer">
              <CardHeader>
                <CardTitle>hoverLift</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Hover to see card lift effect</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* hoverScale */}
          <motion.div whileHover={animations.hoverScale}>
            <Card className="cursor-pointer">
              <CardHeader>
                <CardTitle>hoverScale</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Simple scale on hover</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Button with hover + tap */}
          <Card>
            <CardHeader>
              <CardTitle>Button Interactions</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div
                whileHover={animations.buttonHover}
                whileTap={animations.buttonTap}
              >
                <Button className="w-full">
                  Hover & Click Me!
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Continuous Animations */}
      <section>
        <h2 className="text-3xl font-black mb-6">Continuous Animations</h2>
        
        <div className="grid md:grid-cols-4 gap-6">
          {/* floatingAnimation */}
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-sm">Floating</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div
                animate={animations.floatingAnimation}
                className="text-6xl"
              >
                🎈
              </motion.div>
            </CardContent>
          </Card>

          {/* gentleRotate */}
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-sm">Gentle Rotate</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div
                animate={animations.gentleRotate}
                className="text-6xl"
              >
                ⚗️
              </motion.div>
            </CardContent>
          </Card>

          {/* subtlePulse */}
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-sm">Subtle Pulse</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div
                animate={animations.subtlePulse}
                className="text-6xl"
              >
                💎
              </motion.div>
            </CardContent>
          </Card>

          {/* gentleWave */}
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-sm">Gentle Wave</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div
                animate={animations.gentleWave}
                className="text-6xl"
              >
                🌊
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stagger Animation */}
      <section>
        <h2 className="text-3xl font-black mb-6">Stagger Animation</h2>
        
        <motion.div
          variants={animations.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-4"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <motion.div
              key={num}
              variants={animations.staggerItem}
            >
              <Card className="text-center p-6">
                <p className="text-4xl font-black">{num}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Scroll Trigger Animation */}
      <section>
        <h2 className="text-3xl font-black mb-6">Scroll Trigger</h2>
        
        <motion.div {...animations.scrollFadeIn}>
          <Card className="p-12 text-center">
            <h3 className="text-2xl font-black mb-4">
              This appears when you scroll to it! 🎉
            </h3>
            <p className="text-muted-foreground">
              Uses viewport detection with `once: true`
            </p>
          </Card>
        </motion.div>
      </section>

      {/* Combined Example */}
      <section>
        <h2 className="text-3xl font-black mb-6">Combined Example</h2>
        
        <motion.div
          variants={animations.fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Card className="p-8">
            <div className="flex items-center gap-6">
              <motion.div
                animate={animations.floatingAnimation}
                className="text-8xl"
              >
                🧪
              </motion.div>
              <div>
                <motion.h3
                  variants={animations.scaleIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-black mb-2"
                >
                  Perfect Combination
                </motion.h3>
                <motion.p
                  variants={animations.fadeIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground"
                >
                  Entrance animation + floating icon + stagger text
                </motion.p>
                <motion.div
                  variants={animations.fadeIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.6 }}
                  className="mt-4"
                >
                  <motion.div
                    whileHover={animations.buttonHover}
                    whileTap={animations.buttonTap}
                  >
                    <Button>Get Started</Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
