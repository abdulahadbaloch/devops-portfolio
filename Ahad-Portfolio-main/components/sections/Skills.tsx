'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '@/data/skills';
import {
  FiCloud,
  FiCode,
  FiRepeat,
  FiBox,
  FiSliders,
  FiActivity,
  FiLock,
  FiGlobe,
  FiTerminal,
  FiGitBranch,
  FiCpu,
  FiUsers
} from 'react-icons/fi';

export default function Skills() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Cloud Platform':
        return <FiCloud className="text-cyan-400" size={18} />;
      case 'Infrastructure as Code':
        return <FiCode className="text-emerald-400" size={18} />;
      case 'CI/CD':
        return <FiRepeat className="text-sky-400" size={18} />;
      case 'Containers & Orchestration':
        return <FiBox className="text-indigo-400" size={18} />;
      case 'Configuration Management':
        return <FiSliders className="text-amber-400" size={18} />;
      case 'Monitoring & Logging':
        return <FiActivity className="text-rose-400" size={18} />;
      case 'Security & Secrets Management':
        return <FiLock className="text-teal-400" size={18} />;
      case 'Networking':
        return <FiGlobe className="text-blue-400" size={18} />;
      case 'Scripting':
        return <FiTerminal className="text-lime-400" size={18} />;
      case 'Version Control':
        return <FiGitBranch className="text-purple-400" size={18} />;
      case 'Image & Environment Tools':
        return <FiCpu className="text-yellow-400" size={18} />;
      case 'Collaboration Tools':
        return <FiUsers className="text-emerald-400" size={18} />;
      default:
        return <FiTerminal className="text-cyan-400" size={18} />;
    }
  };

  return (
    <section id="skills" className="py-5 position-relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">Technical Competencies</span>
          <h2 className="section-title">Technical Skills & Tooling</h2>
          <p className="section-subtitle">
            Categorized infrastructure, automation, and observability capabilities applied across multi-environment AWS deployments.
          </p>
        </motion.div>

        <div className="row g-4">
          {skillsData.map((item, idx) => (
            <div key={item.category} className="col-12 col-md-6 col-lg-4">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                className="glass-card p-4 h-100 d-flex flex-column"
              >
                <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom border-white/10">
                  <div className="p-2 rounded bg-slate-900 border border-white/10">
                    {getCategoryIcon(item.category)}
                  </div>
                  <h3 className="h6 fw-bold mb-0 font-monospace" style={{ color: 'var(--text-heading)' }}>
                    {item.category}
                  </h3>
                </div>

                <div className="d-flex flex-wrap gap-2 mt-auto">
                  {item.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="tech-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
