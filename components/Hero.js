'use client';

import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import styles from './Hero.module.css';

const firstName = 'MICHAEL';
const lastName = 'PASHCHENKO';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.3,
    },
  },
};

const letterVariants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 1.2,
    },
  },
};

export default function Hero({ visible = true }) {
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const videoScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 1.18]
  );
  const videoOpacity = useTransform(scrollYProgress, [0, 1], [0.82, 0.48]);

  return (
    <section ref={heroRef} className={styles.hero}>
      {/* Background video */}
      <motion.video
        className={styles.video}
        style={{ scale: videoScale, opacity: videoOpacity }}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </motion.video>
      <div className={styles.videoTone} />
      <div className={styles.videoBlur} />

      {/* Main content */}
      <div className={styles.content}>
        <motion.h1
          className={styles.nameContainer}
          variants={containerVariants}
          initial="hidden"
          animate={visible ? 'visible' : 'hidden'}
          aria-label="Michael Pashchenko"
        >
          {/* First name line */}
          <motion.div className={styles.nameLine} variants={containerVariants}>
            {firstName.split('').map((char, i) => (
              <motion.span
                key={`first-${i}`}
                className={styles.letter}
                variants={letterVariants}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          {/* Last name line */}
          <motion.div className={styles.nameLine} variants={containerVariants}>
            {lastName.split('').map((char, i) => (
              <motion.span
                key={`last-${i}`}
                className={styles.letter}
                variants={letterVariants}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className={styles.subtitle}
          variants={subtitleVariants}
          initial="hidden"
          animate={visible ? 'visible' : 'hidden'}
        >
          UI/UX Designer &amp; Web Developer
        </motion.p>
      </div>

      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0, x: 16 }}
        animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
        transition={{ duration: 0.7, delay: 1.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        aria-hidden="true"
      >
        <span className={styles.scrollText}>Scroll to view</span>
        <span className={styles.scrollArrow}>↓</span>
      </motion.div>
    </section>
  );
}
