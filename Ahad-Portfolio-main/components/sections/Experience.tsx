'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experienceData } from '@/data/experience';
import { FiBriefcase, FiMapPin, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import { useReducedMotion } from '@/hooks/useMediaQuery';

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (lineRef.current && containerRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: 1.2
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section id="experience" className="py-5 position-relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">Career Timeline</span>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            Proven track record designing production-grade cloud architectures, container orchestration, and automated CI/CD pipelines.
          </p>
        </motion.div>

        <div className="timeline-container" ref={containerRef}>
          {/* Animated GSAP line */}
          <div
            ref={lineRef}
            className="timeline-progress-line"
            style={{ transformOrigin: 'top center' }}
          />

          <div className="d-flex flex-column gap-5">
            {experienceData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={item.id} className="timeline-item">
                  {/* Timeline circular node */}
                  <div className="timeline-node" />

                  {/* Experience Card */}
                  <div className={`timeline-card-wrapper ${isEven ? 'left' : 'right'}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                      className="glass-card p-4 text-start"
                    >
                      {/* Role & Company Header */}
                      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3 pb-3 border-bottom border-white/10">
                        <div>
                          <h3 className="h5 fw-bold mb-1 d-flex align-items-center gap-2" style={{ color: 'var(--text-heading)' }}>
                            <FiBriefcase className="text-cyan-400 flex-shrink-0" size={18} />
                            <span>{item.role}</span>
                          </h3>
                          <div className="fw-semibold small font-monospace" style={{ color: 'var(--text-accent)' }}>
                            {item.company}
                          </div>
                        </div>

                        <div className="d-flex flex-column align-items-start align-items-sm-end text-secondary small font-monospace">
                          <span className="d-flex align-items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                            <FiCalendar size={13} className="text-cyan-400" />
                            {item.period}
                          </span>
                          <span className="d-flex align-items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                            <FiMapPin size={13} />
                            {item.location}
                          </span>
                        </div>
                      </div>

                      {/* Responsibilities & Achievements */}
                      <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                        {item.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="d-flex align-items-start gap-2.5 text-secondary small">
                            <span className="text-cyan-400 mt-1 flex-shrink-0">
                              <FiCheckCircle size={14} />
                            </span>
                            <span className="leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                              {highlight}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
