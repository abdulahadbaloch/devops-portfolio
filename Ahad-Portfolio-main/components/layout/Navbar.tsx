'use client';

import React, { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiFileText, FiTerminal } from 'react-icons/fi';
import { profileData } from '@/data/profile';

interface NavbarProps {
  onOpenCvModal: () => void;
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' }
];

export default function Navbar({ onOpenCvModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Section spy
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  const handleNavClick = (href: string) => {
    setShowOffcanvas(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed-top transition-all duration-300 ${
          scrolled ? 'py-2 scrolled-navbar' : 'py-4 bg-transparent'
        }`}
        style={{ zIndex: 1020 }}
      >
        <div className="container d-flex align-items-center justify-content-between">
          {/* Logo / Brand */}
          <a
            href="#"
            className="text-decoration-none d-flex align-items-center gap-2 group"
            aria-label="Abdul Ahad Home"
          >
            <div className="d-flex align-items-center justify-content-center p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <FiTerminal size={18} />
            </div>
            <div className="d-flex flex-column">
              <span className="fw-bold font-monospace tracking-wide" style={{ color: 'var(--text-heading)', fontSize: '1rem' }}>
                {profileData.name}
              </span>
              <span className="text-secondary small font-monospace" style={{ fontSize: '0.7rem' }}>
                DevOps // Cloud
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="d-none d-lg-flex align-items-center gap-1 p-1 rounded-pill nav-pill-container">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="position-relative px-3 py-1.5 rounded-pill text-decoration-none font-monospace small transition-colors"
                  style={{
                    color: isActive ? 'var(--text-accent)' : 'var(--text-secondary)',
                    fontWeight: isActive ? 600 : 400
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="position-absolute inset-0 rounded-pill bg-cyan-500/15 border border-cyan-500/30 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Actions: View CV, Theme Toggle, Mobile Menu */}
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              onClick={onOpenCvModal}
              className="btn btn-sm btn-cyber-primary d-none d-sm-inline-flex align-items-center gap-2"
              aria-label="View Curriculum Vitae"
            >
              <FiFileText size={15} />
              <span>View CV</span>
            </button>

            {mounted && (
              <button
                type="button"
                onClick={toggleTheme}
                className="btn btn-sm p-2 rounded-lg text-slate-300 hover:text-cyan-400 border border-white/10 bg-slate-900/60"
                aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {resolvedTheme === 'dark' ? <FiSun size={17} /> : <FiMoon size={17} />}
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowOffcanvas(true)}
              className="btn btn-sm p-2 rounded-lg text-slate-300 d-lg-none border border-white/10 bg-slate-900/60"
              aria-label="Open mobile navigation"
            >
              <FiMenu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Offcanvas Drawer */}
      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="end"
        className="border-start border-cyan-500/20"
        style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }}
      >
        <Offcanvas.Header className="border-bottom border-white/10 p-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <div className="p-2 rounded bg-cyan-500/10 text-cyan-400">
              <FiTerminal size={18} />
            </div>
            <span className="fw-bold font-monospace" style={{ color: 'var(--text-heading)' }}>{profileData.name}</span>
          </div>
          <button
            type="button"
            className="btn btn-sm text-secondary border-0"
            onClick={() => setShowOffcanvas(false)}
            aria-label="Close navigation"
          >
            <FiX size={22} />
          </button>
        </Offcanvas.Header>

        <Offcanvas.Body className="d-flex flex-column justify-content-between p-4">
          <div className="d-flex flex-column gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`p-2.5 rounded-lg text-decoration-none font-monospace d-flex align-items-center justify-content-between ${
                  activeSection === link.href.substring(1)
                    ? 'bg-cyan-500/10 border border-cyan-500/30'
                    : 'hover:bg-slate-900'
                }`}
                style={{
                  color: activeSection === link.href.substring(1) ? 'var(--text-accent)' : 'var(--text-primary)'
                }}
              >
                <span>{link.label}</span>
                <span className="text-secondary small">&rarr;</span>
              </a>
            ))}
          </div>

          <div className="pt-4 border-top border-white/10 d-flex flex-column gap-2">
            <button
              type="button"
              onClick={() => {
                setShowOffcanvas(false);
                onOpenCvModal();
              }}
              className="btn btn-cyber-primary w-100 justify-content-center"
            >
              <FiFileText size={16} />
              <span>View CV</span>
            </button>

            <span className="text-secondary small font-monospace text-center mt-2">
              {profileData.location}
            </span>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
