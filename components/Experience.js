'use client';

import { motion } from 'framer-motion';
import styles from './Experience.module.css';

const experience = [
  {
    company: 'SaleRow Software',
    role: 'UI/UX Designer',
    date: '2024 - 2026',
    description:
      'Designed interfaces and user flows for web and mobile products. Created wireframes, prototypes, and UI systems for seamless product implementation across platforms.',
  },
  {
    company: 'Drinkers Startup',
    role: 'Web Developer / UI-UX Designer',
    date: '2024',
    description:
      'Designed UI/UX for web pages and flows. Built responsive websites with React and Next.js. Prepared developer-ready deliverables and design handoffs.',
  },
];

const skills = [
  'UI/UX Design',
  'Figma',
  'Design Systems',
  'React.js',
  'Next.js',
  'React Native',
  'HTML/CSS/JS',
  'Git',
  'AI Workflows',
];

const education = [
  {
    school: 'Poznan University of Technology',
    program: 'Automatic Control & Robotics',
  },
  {
    school: 'Alpaca School',
    program: 'Certified Web Designer',
  },
];

const languages = [
  { name: 'English', level: 'B2', width: 72 },
  { name: 'German', level: 'B1', width: 55 },
  { name: 'Polish', level: 'B1', width: 55 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: i * 0.1,
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const pillVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 200,
    },
  },
};

export default function Experience() {
  return (
    <section className={styles.section} id="experience">
      {/* Section Header */}
      <motion.div
        className={styles.sectionHeader}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        custom={0}
      >
        <h2 className={styles.sectionTitle}>Experience &amp; Skills</h2>
      </motion.div>

      <div className={styles.grid}>
        {/* ── Left: Timeline ── */}
        <div className={styles.timelineColumn}>
          <motion.h3
            className={styles.columnTitle}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={0}
          >
            Work Experience
          </motion.h3>

          <div className={styles.timeline}>
            {experience.map((entry, i) => (
              <motion.div
                key={entry.company}
                className={styles.timelineEntry}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                custom={i}
              >
                <div className={styles.timelineDot} />
                <span className={styles.entryDate}>{entry.date}</span>
                <h4 className={styles.entryCompany}>{entry.company}</h4>
                <span className={styles.entryRole}>{entry.role}</span>
                <p className={styles.entryDescription}>{entry.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Right: Skills, Education, Languages ── */}
        <div className={styles.rightColumn}>
          {/* Skills */}
          <div>
            <motion.h3
              className={styles.columnTitle}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              custom={0}
            >
              Skills
            </motion.h3>
            <motion.div
              className={styles.skillsContainer}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  className={styles.skillPill}
                  variants={pillVariant}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Education */}
          <div>
            <motion.h3
              className={styles.columnTitle}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              custom={0}
            >
              Education
            </motion.h3>
            <div className={styles.educationCards}>
              {education.map((edu, i) => (
                <motion.div
                  key={edu.school}
                  className={styles.educationCard}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  custom={i}
                >
                  <h4 className={styles.educationSchool}>{edu.school}</h4>
                  <p className={styles.educationProgram}>{edu.program}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <motion.h3
              className={styles.columnTitle}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              custom={0}
            >
              Languages
            </motion.h3>
            <div className={styles.languagesList}>
              {languages.map((lang, i) => (
                <motion.div
                  key={lang.name}
                  className={styles.languageItem}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  custom={i}
                >
                  <div className={styles.languageInfo}>
                    <span className={styles.languageName}>{lang.name}</span>
                    <span className={styles.languageLevel}>{lang.level}</span>
                  </div>
                  <div className={styles.languageBarTrack}>
                    <motion.div
                      className={styles.languageBarFill}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.width}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: 0.3 + i * 0.15,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
