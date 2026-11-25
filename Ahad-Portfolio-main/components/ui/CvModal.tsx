'use client';

import React, { useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import { RESUME_PATH, RESUME_FILENAME } from '@/lib/constants';
import { useLenis } from './SmoothScrollProvider';
import { FiDownload, FiExternalLink, FiX, FiFileText } from 'react-icons/fi';

interface CvModalProps {
  show: boolean;
  onHide: () => void;
}

export default function CvModal({ show, onHide }: CvModalProps) {
  const { stop, start } = useLenis();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (show) {
      stop();
      // Auto focus close button for accessibility
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      start();
    }
  }, [show, stop, start]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      centered
      keyboard={true}
      backdrop="static"
      aria-labelledby="cv-modal-title"
      className="cv-viewer-modal"
      contentClassName="border border-cyan-500/20 shadow-2xl rounded-2xl overflow-hidden"
    >
      <div className="modal-header border-b border-white/10 px-4 py-3 d-flex align-items-center justify-content-between backdrop-blur" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div className="d-flex align-items-center gap-2">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
            <FiFileText size={18} />
          </div>
          <div>
            <h5 className="modal-title fs-6 fw-bold mb-0" id="cv-modal-title" style={{ color: 'var(--text-heading)' }}>
              Abdul Ahad — DevOps & Cloud Architect Resume
            </h5>
            <span className="text-secondary small font-monospace">PDF Document Viewer</span>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <a
            href={RESUME_PATH}
            download={RESUME_FILENAME}
            className="btn btn-sm btn-cyber-primary d-none d-sm-inline-flex"
            aria-label="Download CV"
          >
            <FiDownload size={14} />
            <span>Download CV</span>
          </a>

          <button
            ref={closeButtonRef}
            type="button"
            className="btn btn-sm btn-outline-secondary border-0"
            style={{ color: 'var(--text-secondary)' }}
            onClick={onHide}
            aria-label="Close CV modal"
          >
            <FiX size={20} />
          </button>
        </div>
      </div>

      <div className="modal-body p-0 position-relative" style={{ height: '75vh', minHeight: '480px', backgroundColor: '#090d16' }}>
        <object
          data={RESUME_PATH}
          type="application/pdf"
          width="100%"
          height="100%"
          className="d-block w-100 h-100"
          aria-label="Abdul Ahad Resume PDF Preview"
        >
          {/* Fallback for browsers/mobile that cannot render embedded PDF directly */}
          <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center p-4">
            <div className="p-3 rounded-circle bg-cyan-500/10 text-cyan-400 mb-3">
              <FiFileText size={48} />
            </div>
            <h4 className="fw-bold mb-2" style={{ color: '#ffffff' }}>Resume Preview</h4>
            <p className="text-secondary small max-w-md mb-4" style={{ maxWidth: '420px' }}>
              Your current browser or mobile viewport does not support embedded PDF previews. You can open the resume in a new tab or download it directly.
            </p>
            <div className="d-flex flex-wrap gap-3 justify-content-center">
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-cyber-secondary btn-sm"
              >
                <FiExternalLink size={14} />
                <span>Open in New Tab</span>
              </a>
              <a
                href={RESUME_PATH}
                download={RESUME_FILENAME}
                className="btn btn-cyber-primary btn-sm"
              >
                <FiDownload size={14} />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </object>
      </div>

      <div className="modal-footer border-t border-white/10 px-4 py-2 d-flex justify-content-between align-items-center" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <a
          href={RESUME_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary small d-flex align-items-center gap-1 hover:text-cyan-400 transition"
        >
          <FiExternalLink size={14} />
          <span>Open raw PDF</span>
        </a>

        <div className="d-flex gap-2">
          <a
            href={RESUME_PATH}
            download={RESUME_FILENAME}
            className="btn btn-sm btn-cyber-primary"
            aria-label="Download CV"
          >
            <FiDownload size={14} />
            <span>Download CV</span>
          </a>
          <button
            type="button"
            className="btn btn-sm btn-cyber-secondary"
            onClick={onHide}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
