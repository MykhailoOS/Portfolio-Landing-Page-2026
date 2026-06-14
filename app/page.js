'use client';

import { useState } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Works from '@/components/Works';
import Contact from '@/components/Contact';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <SmoothScroll>
      <Loader onComplete={() => setIsLoaded(true)} />
      <Navbar />
      <main>
        <Hero visible={isLoaded} />
        <About />
        <Experience />
        <Works />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
