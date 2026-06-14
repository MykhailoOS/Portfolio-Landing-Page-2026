'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './About.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: i * 0.15,
    },
  }),
};

const stats = [
  { number: '2+', label: 'Years Experience' },
  { number: '10+', label: 'Projects' },
  { number: '3', label: 'Languages' },
];

export default function About() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.grid}>
        {/* Photo Column */}
        <motion.div
          className={styles.photoContainer}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <Image
            src="/images/me.png"
            alt="Michael Pashchenko"
            fill
            sizes="(max-width: 900px) 360px, 480px"
            priority={false}
            unoptimized
            className={styles.photo}
          />
          <div className={styles.photoGlow} />
        </motion.div>

        {/* Text Column */}
        <div className={styles.textContent}>
          <motion.h2
            className={styles.heading}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            custom={0}
          >
            Crafting digital experiences with{' '}
            <span className={styles.headingAccent}>precision</span>
          </motion.h2>

          <motion.p
            className={styles.bio}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            custom={1}
          >
            I craft digital experiences at the intersection of design and
            technology. With a meticulous eye for detail and a passion for
            pixel-perfect execution, I transform complex ideas into elegant,
            intuitive interfaces that resonate with users and drive results.
          </motion.p>

          {/* Stats */}
          <motion.div
            className={styles.stats}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            custom={2}
          >
            {stats.map((stat) => (
              <div className={styles.stat} key={stat.label}>
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
