'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';
import CvModal from '@/components/ui/CvModal';

export default function Home() {
  const [showCvModal, setShowCvModal] = useState(false);

  const handleOpenCvModal = () => setShowCvModal(true);
  const handleCloseCvModal = () => setShowCvModal(false);

  return (
    <>
      <Navbar onOpenCvModal={handleOpenCvModal} />

      <main id="main-content">
        <Hero onOpenCvModal={handleOpenCvModal} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer onOpenCvModal={handleOpenCvModal} />

      {/* Global Curriculum Vitae PDF Viewer Modal */}
      <CvModal show={showCvModal} onHide={handleCloseCvModal} />
    </>
  );
}
