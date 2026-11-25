'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '@/data/profile';
import { FiMapPin, FiMail, FiClock, FiShield, FiCloud, FiServer } from 'react-icons/fi';

export default function About() {
  const quickFacts = [
    {
      icon: <FiClock className="text-cyan-400" size={20} />,
      label: 'Experience',
      value: profileData.experienceYears
    },
    {
      icon: <FiMapPin className="text-emerald-400" size={20} />,
      label: 'Location',
      value: profileData.location
    },
    {
      icon: <FiMail className="text-sky-400" size={20} />,
      label: 'Email',
      value: profileData.email
    },
    {
      icon: <FiShield className="text-cyan-400" size={20} />,
      label: 'Specialization',
      value: 'AWS Cloud & IaC Automation'
    }
  ];

  return (
    <section id="about" className="py-5 position-relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">Background & Focus</span>
          <h2 className="section-title">Professional Summary</h2>
          <p className="section-subtitle">
            Reliable, compliant, and cost-efficient cloud engineering built upon AWS architectural best practices.
          </p>
        </motion.div>

        <div className="row g-4 align-items-stretch">
          {/* Summary Text Card */}
          <div className="col-12 col-lg-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card p-4 p-md-5 h-100 d-flex flex-column justify-content-between"
            >
              <div>
                <div className="d-flex align-items-center gap-2 mb-4 text-cyan-400 font-monospace small">
                  <FiCloud size={18} />
                  <span>INFRASTRUCTURE ARCHITECTURE & CI/CD AUTOMATION</span>
                </div>
                <p className="lead mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-primary)' }}>
                  {profileData.summary}
                </p>
              </div>

              <div className="pt-4 border-top border-white/10 d-flex flex-wrap gap-4 text-secondary small font-monospace">
                <div className="d-flex align-items-center gap-2">
                  <span className="p-1.5 rounded bg-cyan-500/10 text-cyan-400">
                    <FiServer size={14} />
                  </span>
                  <span>EKS & Microservices</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="p-1.5 rounded bg-emerald-500/10 text-emerald-400">
                    <FiShield size={14} />
                  </span>
                  <span>IAM & Compliance Aligned</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Facts Bento Cards */}
          <div className="col-12 col-lg-4">
            <div className="d-flex flex-column gap-3 h-100">
              {quickFacts.map((fact, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card p-3 p-md-3.5 d-flex align-items-center gap-3 flex-fill"
                >
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-white/10 d-flex align-items-center justify-content-center">
                    {fact.icon}
                  </div>
                  <div>
                    <span className="text-secondary small font-monospace d-block">
                      {fact.label}
                    </span>
                    <span className="fw-bold small" style={{ fontSize: '0.95rem', color: 'var(--text-heading)' }}>
                      {fact.value}
                    </span>
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
