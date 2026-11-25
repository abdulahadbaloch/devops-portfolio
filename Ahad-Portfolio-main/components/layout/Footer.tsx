'use client';

import React from 'react';
import { RESUME_PATH, RESUME_FILENAME } from '@/lib/constants';
import { profileData } from '@/data/profile';
import { FiDownload, FiLinkedin, FiMail, FiMapPin, FiShield, FiTerminal } from 'react-icons/fi';

interface FooterProps {
  onOpenCvModal: () => void;
}

export default function Footer({ onOpenCvModal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-5 pb-4 position-relative border-top border-cyan-500/15 backdrop-blur" style={{ backgroundColor: 'var(--header-bg)' }}>
      <div className="container">
        {/* Final CTA Section */}
        <div className="glass-card p-4 p-md-5 mb-5 text-center position-relative overflow-hidden">
          <div
            className="position-absolute rounded-circle pointer-events-none"
            style={{
              width: '300px',
              height: '300px',
              top: '-50%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }}
          />

          <span className="section-badge mb-2">Ready to Scale & Automate</span>
          <h2 className="section-title mb-3">Looking for a Cloud Architect or DevOps Engineer?</h2>
          <p className="text-secondary mx-auto mb-4" style={{ maxWidth: '600px' }}>
            Designing, deploying, and automating scalable, secure, and compliant cloud infrastructure aligned with AWS best practices.
          </p>

          <div className="d-flex flex-wrap justify-content-center gap-3">
            <a
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              className="btn btn-cyber-primary"
              aria-label="Download CV"
            >
              <FiDownload size={16} />
              <span>Download CV</span>
            </a>

            <button
              type="button"
              onClick={onOpenCvModal}
              className="btn btn-cyber-secondary"
            >
              <span>View CV in Browser</span>
            </button>

            <a
              href={`mailto:${profileData.email}`}
              className="btn btn-cyber-secondary"
              aria-label="Send Email"
            >
              <FiMail size={16} />
              <span>Contact Directly</span>
            </a>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 pt-3 border-top border-white/10 font-monospace small text-secondary">
          <div className="d-flex align-items-center gap-2">
            <span className="text-cyan-400">
              <FiTerminal size={14} />
            </span>
            <span>&copy; {currentYear} Abdul Ahad. All rights reserved.</span>
          </div>

          <div className="d-flex align-items-center gap-3">
            <a
              href={profileData.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center gap-1.5 text-secondary hover:text-cyan-400 text-decoration-none transition"
              aria-label="Abdul Ahad LinkedIn"
            >
              <FiLinkedin size={15} />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${profileData.email}`}
              className="d-flex align-items-center gap-1.5 text-secondary hover:text-cyan-400 text-decoration-none transition"
              aria-label="Abdul Ahad Email"
            >
              <FiMail size={15} />
              <span>{profileData.email}</span>
            </a>
          </div>

          <div className="d-flex align-items-center gap-1">
            <FiMapPin size={13} className="text-cyan-400" />
            <span>{profileData.location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
