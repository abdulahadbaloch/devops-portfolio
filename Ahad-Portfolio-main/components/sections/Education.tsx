'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { educationData } from '@/data/education';
import { FiAward, FiMapPin, FiCalendar, FiBookOpen } from 'react-icons/fi';

export default function Education() {
  return (
    <section id="education" className="py-5 position-relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">Academic Foundation</span>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">
            Formal engineering foundation supporting enterprise software systems and cloud architecture.
          </p>
        </motion.div>

        <div className="row">
          <div className="col-12 col-lg-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="glass-card p-4 p-md-5 d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-4"
            >
              <div className="d-flex align-items-start gap-3">
                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex-shrink-0">
                  <FiAward size={28} />
                </div>
                <div>
                  <h3 className="h5 fw-bold mb-1" style={{ color: 'var(--text-heading)' }}>
                    {educationData.degree}
                  </h3>
                  <div className="font-monospace small mb-2" style={{ color: 'var(--text-accent)' }}>
                    {educationData.institution}
                  </div>
                  <div className="d-flex flex-wrap align-items-center gap-3 text-secondary small font-monospace">
                    <span className="d-flex align-items-center gap-1" style={{ color: 'var(--text-primary)' }}>
                      <FiMapPin size={13} className="text-cyan-400" />
                      {educationData.location}
                    </span>
                    <span className="d-flex align-items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                      <FiCalendar size={13} />
                      Graduated: {educationData.graduationYear}
                    </span>
                  </div>
                </div>
              </div>

              <div className="d-none d-md-flex align-items-center gap-2 p-2 px-3 rounded-pill bg-slate-900 border border-white/10 text-cyan-400 font-monospace small">
                <FiBookOpen size={14} />
                <span>Verified Degree</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
