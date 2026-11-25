'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { profileData } from '@/data/profile';
import { FiFileText, FiMail, FiLinkedin, FiTerminal, FiChevronRight, FiCheck, FiCloud } from 'react-icons/fi';
import { FaAws } from 'react-icons/fa6';

interface HeroProps {
  onOpenCvModal: () => void;
}

export default function Hero({ onOpenCvModal }: HeroProps) {
  const [skillIndex, setSkillIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect cycling through real skills only
  useEffect(() => {
    const currentSkill = profileData.terminalSkills[skillIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedText === currentSkill) {
      // Pause at full word
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setSkillIndex((prev) => (prev + 1) % profileData.terminalSkills.length);
    } else {
      const delta = isDeleting ? 40 : 80;
      timer = setTimeout(() => {
        setDisplayedText(
          isDeleting
            ? currentSkill.substring(0, displayedText.length - 1)
            : currentSkill.substring(0, displayedText.length + 1)
        );
      }, delta);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, skillIndex]);

  return (
    <section className="position-relative pt-5 pb-5 d-flex align-items-center" style={{ minHeight: '92vh' }}>
      <div className="container pt-4">
        <div className="row align-items-center g-5">
          {/* Main Hero Copy */}
          <div className="col-12 col-lg-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="d-inline-flex align-items-center gap-2 section-badge mb-3">
                <span className="p-1 rounded-circle bg-emerald-400 d-inline-block" style={{ width: 8, height: 8 }} />
                <span>Available for DevOps & Cloud Architecture</span>
              </div>

              <h1 className="fw-black tracking-tight mb-2" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', lineHeight: 1.1, color: 'var(--text-heading)' }}>
                {profileData.name}
              </h1>

              <div className="h4 fw-bold font-monospace mb-4 d-flex align-items-center gap-2" style={{ color: 'var(--text-accent)' }}>
                <span>{profileData.title}</span>
              </div>

              <p className="lead text-secondary mb-4 leading-relaxed" style={{ maxWidth: '580px', fontSize: '1.15rem' }}>
                Designing, deploying, and automating scalable, secure, and resilient cloud infrastructure on AWS with Terraform, Kubernetes, and automated CI/CD pipelines.
              </p>

              {/* CTAs */}
              <div className="d-flex flex-wrap align-items-center gap-3 mb-5">
                <button
                  type="button"
                  onClick={onOpenCvModal}
                  className="btn btn-cyber-primary"
                  aria-label="View Curriculum Vitae"
                >
                  <FiFileText size={16} />
                  <span>View CV</span>
                </button>

                <a
                  href="#contact"
                  className="btn btn-cyber-secondary"
                >
                  <FiMail size={16} />
                  <span>Contact Me</span>
                </a>

                <div className="d-flex align-items-center gap-2 ms-sm-2">
                  <a
                    href={profileData.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-secondary text-secondary hover:text-cyan-400 p-2.5 rounded-lg border-white/10"
                    aria-label="Abdul Ahad LinkedIn Profile"
                  >
                    <FiLinkedin size={18} />
                  </a>
                  <a
                    href={`mailto:${profileData.email}`}
                    className="btn btn-sm btn-outline-secondary text-secondary hover:text-cyan-400 p-2.5 rounded-lg border-white/10"
                    aria-label="Email Abdul Ahad"
                  >
                    <FiMail size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Terminal Mockup Card */}
          <div className="col-12 col-lg-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="terminal-window"
            >
              <div className="terminal-header">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
                <span className="terminal-title">ahad@cloud-infra:~</span>
                <FaAws className="text-amber-400 ms-auto" size={18} />
              </div>

              <div className="terminal-body font-monospace">
                <div className="mb-2 text-slate-400">
                  <span className="text-emerald-400">$</span> aws sts get-caller-identity
                </div>
                <div className="text-slate-300 ps-3 mb-3 small">
                  <div>&#123;</div>
                  <div className="ps-3">&quot;UserId&quot;: &quot;AROAEXAMPLE:ahad&quot;,</div>
                  <div className="ps-3">&quot;Account&quot;: &quot;AWS-PROD-ARCHITECTURE&quot;,</div>
                  <div className="ps-3">&quot;Role&quot;: &quot;DevOps-CloudArchitect&quot;</div>
                  <div>&#125;</div>
                </div>

                <div className="mb-2 text-slate-400">
                  <span className="text-emerald-400">$</span> terraform plan -target=module.eks_cluster
                </div>
                <div className="text-slate-400 ps-3 mb-3 small">
                  <div className="text-cyan-300">Plan: 18 to add, 0 to change, 0 to destroy.</div>
                  <div className="d-flex align-items-center gap-1 text-emerald-400">
                    <FiCheck size={14} /> EKS Cluster 1.30 with IRSA verified.
                  </div>
                </div>

                <div className="pt-2 border-top border-slate-800 d-flex align-items-center gap-1.5">
                  <span className="text-cyan-400 font-bold">&gt;</span>
                  <span className="text-slate-300">active_stack:</span>
                  <span className="text-white fw-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    {displayedText}
                  </span>
                  <span className="animate-pulse text-cyan-400 font-bold">|</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
