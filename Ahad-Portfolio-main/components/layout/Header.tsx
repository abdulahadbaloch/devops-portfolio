'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import { profileData } from '@/data/profile';
import { NAV_ITEMS, RESUME_PATH } from '@/lib/constants';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMounted(true), []);

  // Add a soft shadow under the header once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the nav link for the section currently in the middle of the viewport.
  useEffect(() => {
    const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const isDark = resolvedTheme === 'dark';

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="container header-inner">
        <a href="#top" className="brand" onClick={() => setMenuOpen(false)}>
          {profileData.name}
        </a>

        <nav id="site-nav" className="site-nav" data-open={menuOpen} aria-label="Main">
          <ul>
            {NAV_ITEMS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={activeId === id ? 'location' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="nav-cv">
              <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer">
                Résumé
              </a>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={mounted ? `Switch to ${isDark ? 'light' : 'dark'} theme` : 'Toggle theme'}
          >
            {mounted ? isDark ? <FiSun aria-hidden /> : <FiMoon aria-hidden /> : <span className="icon-placeholder" />}
          </button>
          <button
            type="button"
            className="icon-button menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <FiX aria-hidden /> : <FiMenu aria-hidden />}
          </button>
        </div>
      </div>
    </header>
  );
}
