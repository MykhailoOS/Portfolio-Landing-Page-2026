'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import projects from '@/data/projects';
import ProjectModal from './ProjectModal';
import styles from './Works.module.css';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Works() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <section id="works" className={styles.section}>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Section Header */}
          <motion.div className={styles.sectionHeader} variants={headerVariants}>
            <h2 className={styles.sectionTitle}>
              Selected <span>Works</span>
            </h2>
            <div className={styles.titleLine} />
          </motion.div>

          {/* Projects Grid */}
          <div className={styles.grid}>
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className={styles.card}
                variants={cardVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.35, ease: 'easeOut' },
                }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedProject(project)}
                role="button"
                tabIndex={0}
                aria-label={`Open ${project.title} project details`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
              >
                <motion.div
                  className={styles.cardMedia}
                  layoutId={`project-image-${project.id}`}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(max-width: 768px) calc(100vw - 2.5rem), (max-width: 1400px) calc((100vw - 8rem) / 2), 650px"
                    unoptimized
                    className={styles.cardImage}
                  />
                </motion.div>

                {/* Overlay */}
                <div className={styles.cardOverlay} />

                {/* Arrow Icon */}
                <div className={styles.cardArrow}>↗</div>

                {/* Content */}
                <div className={styles.cardInner}>
                  <span className={styles.cardCategory}>
                    {project.category}
                  </span>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardYear}>{project.year}</span>
                  </div>
                  <p className={styles.cardDescription}>
                    {project.description}
                  </p>
                  <div className={styles.cardTags}>
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className={styles.cardTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
