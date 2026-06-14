'use client';

import { motion } from 'framer-motion';
import styles from './Contact.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: i * 0.12,
    },
  }),
};

const contacts = [
  {
    label: 'Email',
    value: 'pashchenkomichael@gmail.com',
    href: 'mailto:pashchenkomichael@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="2 4 12 13 22 4" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '+49 176 42948832',
    href: 'tel:+4917642948832',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: 'Telegram',
    value: '@Michael7_P',
    href: 'https://t.me/Michael7_P',
    icon: <span className={styles.telegramIcon} aria-hidden="true" />,
  },
];

export default function Contact() {
  return (
    <>
      <section className={styles.section} id="contact">
        <div className={styles.divider} />

        <div className={styles.inner}>
          <motion.h2
            className={styles.heading}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={0}
          >
            Let&apos;s Create{' '}
            <span className={styles.headingAccent}>Together</span>
          </motion.h2>

          <motion.p
            className={styles.subtitle}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={1}
          >
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s
            bring your vision to life.
          </motion.p>

          <motion.a
            className={styles.emailLink}
            href="mailto:pashchenkomichael@gmail.com"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={2}
          >
            pashchenkomichael@gmail.com
          </motion.a>

          <motion.div
            className={styles.contactMethods}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={3}
          >
            {contacts.map((contact) => (
              <a
                key={contact.label}
                className={styles.contactCard}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  contact.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
              >
                <span className={styles.contactIcon}>{contact.icon}</span>
                <span className={styles.contactValue}>{contact.value}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © {new Date().getFullYear()}{' '}
          <span className={styles.footerAccent}>Michael Pashchenko</span>. All
          rights reserved.
        </p>
      </footer>
    </>
  );
}
