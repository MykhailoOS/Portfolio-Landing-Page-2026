'use client';

import { useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProjectModal.module.css';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 28,
      stiffness: 300,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 20,
    transition: { duration: 0.25, ease: 'easeInOut' },
  },
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedElementRef = useRef(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab' || !dialogRef.current) return;

      const focusableElements = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!project) return undefined;

    previouslyFocusedElementRef.current = document.activeElement;
    document.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('modal-open');
    window.lenis?.stop?.();
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
      window.lenis?.start?.();
      previouslyFocusedElementRef.current?.focus?.();
    };
  }, [project, handleKeyDown]);

  return (
    <AnimatePresence mode="wait">
      {project && (
        <motion.div
          className={styles.overlay}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Modal */}
          <motion.div
            ref={dialogRef}
            className={styles.modal}
            data-lenis-prevent
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            tabIndex={-1}
          >
            {/* Close Button */}
            <div className={styles.modalHeader}>
              <span className={styles.modalEyebrow}>Project details</span>
              <motion.button
                ref={closeButtonRef}
                className={styles.closeButton}
                onClick={onClose}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                aria-label="Close project details"
                type="button"
              >
                <span aria-hidden="true">×</span>
              </motion.button>
            </div>

            <motion.div
              className={styles.modalBody}
              data-lenis-prevent
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Preview Image */}
              <motion.div
                className={styles.preview}
                variants={itemVariants}
                layoutId={`project-image-${project.id}`}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  sizes="(max-width: 768px) calc(100vw - 4.5rem), 856px"
                  unoptimized
                  className={styles.previewImage}
                  priority
                />
              </motion.div>

              {/* Title */}
              <motion.h2
                id="project-modal-title"
                className={styles.title}
                variants={itemVariants}
              >
                {project.title}
              </motion.h2>

              {/* Meta Row */}
              <motion.div className={styles.metaRow} variants={itemVariants}>
                <span className={styles.category}>{project.category}</span>
                <span className={styles.metaDivider} />
                <span className={styles.year}>{project.year}</span>
              </motion.div>

              {/* Description */}
              <motion.p className={styles.description} variants={itemVariants}>
                {project.longDescription}
              </motion.p>

              {/* Tags */}
              <motion.div className={styles.tags} variants={itemVariants}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* Role */}
              <motion.p className={styles.role} variants={itemVariants}>
                {project.role}
              </motion.p>

              {/* Action Buttons */}
              <motion.div className={styles.actions} variants={itemVariants}>
                {project.figmaUrl && (
                  <motion.a
                    href={project.figmaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.figmaButton}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
                      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
                      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
                      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
                      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
                    </svg>
                    View in Figma
                  </motion.a>
                )}
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.liveButton}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    View Live
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
