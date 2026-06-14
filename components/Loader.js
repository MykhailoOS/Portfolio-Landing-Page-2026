'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Loader.module.css';

export default function Loader({ onComplete }) {
  const overlayRef = useRef(null);
  const counterRef = useRef(null);
  const nameRef = useRef(null);
  const lineRef = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const overlay = overlayRef.current;
    const counterEl = counterRef.current;
    const nameEl = nameRef.current;
    const lineEl = lineRef.current;

    if (!overlay || !counterEl || !nameEl || !lineEl) return;

    // Build individual letter spans
    const nameText = 'MICHAEL PASHCHENKO';
    nameEl.innerHTML = '';
    const letterElements = [];

    nameText.split('').forEach((char) => {
      const span = document.createElement('span');
      span.className = styles.letter;
      span.textContent = char === ' ' ? '\u00A0' : char;
      nameEl.appendChild(span);
      letterElements.push(span);
    });

    // Counter object for GSAP tween
    const counterObj = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    // Phase 1: Animate counter from 0 to 100
    tl.to(counterObj, {
      value: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        counterEl.textContent = Math.floor(counterObj.value);
      },
    });

    // Phase 2: Fade out counter and show name
    tl.to(counterEl, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in',
    });

    // Show the name container
    tl.set(nameEl, { opacity: 1 });

    // Phase 3: Stagger reveal letters
    tl.to(letterElements, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: 'power3.out',
    });

    // Phase 4: Animate the decorative line
    tl.to(lineEl, {
      scaleX: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.3');

    // Phase 5: Hold briefly
    tl.to({}, { duration: 0.6 });

    // Phase 6: Slide the entire overlay up
    tl.to(overlay, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power3.inOut',
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={overlayRef} className={styles.loaderOverlay}>
      <div className={styles.loaderContent}>
        <div ref={counterRef} className={styles.counter}>
          0
        </div>
        <div className={styles.nameWrapper}>
          <div ref={nameRef} className={styles.name} />
        </div>
        <div ref={lineRef} className={styles.line} />
      </div>
    </div>
  );
}
