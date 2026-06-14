'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Works', href: '#works' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (ticking.current) return;

    ticking.current = true;
    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // Scrolling down - hide
        setIsHidden(true);
      } else {
        // Scrolling up - show
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = useCallback((href) => {
    setIsMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (!element) return;

    // Use lenis if available for smooth scroll, otherwise fallback
    if (window.lenis) {
      window.lenis.scrollTo(element, { offset: -80, duration: 1.2 });
    } else {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
    },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
    },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.08,
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
      },
    }),
    exit: (i) => ({
      opacity: 0,
      y: -20,
      transition: {
        delay: i * 0.03,
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1],
      },
    }),
  };

  return (
    <>
      <motion.nav
        className={`${styles.navbar} ${isHidden && !isMobileMenuOpen ? styles.hidden : ''} ${isMobileMenuOpen ? styles.menuActive : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 4.5, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Logo */}
        <a
          href="#"
          className={styles.logo}
          onClick={(e) => {
            e.preventDefault();
            if (window.lenis) {
              window.lenis.scrollTo(0, { duration: 1.2 });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          M<span className={styles.logoAccent}>P</span>
        </a>

        {/* Desktop nav links */}
        <ul className={styles.navLinks}>
          {NAV_ITEMS.map((item, i) => (
            <li key={item.href}>
              <motion.button
                className={styles.navLink}
                onClick={() => scrollToSection(item.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 4.7 + i * 0.1,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                {item.label}
              </motion.button>
            </li>
          ))}
        </ul>

        {/* Hamburger (mobile) */}
        <button
          className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            className={styles.mobileMenu}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.href}
                className={styles.mobileLink}
                onClick={() => scrollToSection(item.href)}
                variants={mobileLinkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={i}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.div
              className={styles.mobileDivider}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
