'use client';

import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Project } from '@/data/projects';
import { useLenis } from './SmoothScrollProvider';
import { FiX, FiCheckCircle, FiCpu, FiLayers } from 'react-icons/fi';

interface ProjectModalProps {
  project: Project | null;
  show: boolean;
  onHide: () => void;
}

export default function ProjectModal({ project, show, onHide }: ProjectModalProps) {
  const { stop, start } = useLenis();

  useEffect(() => {
    if (show) {
      stop();
    } else {
      start();
    }
  }, [show, stop, start]);

  if (!project) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      keyboard={true}
      backdrop="static"
      aria-labelledby="project-modal-title"
      contentClassName="border border-cyan-500/20 shadow-2xl rounded-2xl overflow-hidden"
    >
      <div className="modal-header border-b border-white/10 px-4 py-3 d-flex align-items-center justify-content-between" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div>
          <span className="section-badge mb-1">{project.focusTag}</span>
          <h4 className="modal-title fs-5 fw-bold mb-0" id="project-modal-title" style={{ color: 'var(--text-heading)' }}>
            {project.title}
          </h4>
        </div>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary border-0"
          style={{ color: 'var(--text-secondary)' }}
          onClick={onHide}
          aria-label="Close project modal"
        >
          <FiX size={22} />
        </button>
      </div>

      <div className="modal-body p-4" style={{ maxHeight: '70vh', overflowY: 'auto', backgroundColor: 'var(--bg-surface)' }}>
        <div className="mb-4">
          <div className="d-flex align-items-center gap-2 mb-3 text-cyan-400">
            <FiLayers size={18} />
            <h6 className="fw-bold mb-0 text-uppercase tracking-wider small" style={{ color: 'var(--text-accent)' }}>
              Complete Architectural Deliverables & Implementation
            </h6>
          </div>
          <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
            {project.allBullets.map((bullet, idx) => (
              <li key={idx} className="d-flex align-items-start gap-2.5 text-secondary">
                <span className="text-cyan-400 mt-1 flex-shrink-0">
                  <FiCheckCircle size={16} />
                </span>
                <span className="small leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-3 border-top border-white/10">
          <div className="d-flex align-items-center gap-2 mb-2 text-emerald-400">
            <FiCpu size={18} />
            <h6 className="fw-bold mb-0 text-uppercase tracking-wider small" style={{ color: 'var(--accent-emerald)' }}>
              Infrastructure & Technologies
            </h6>
          </div>
          <div className="d-flex flex-wrap gap-2">
            {project.techStack.map((tech, idx) => (
              <span key={idx} className="tech-chip">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="modal-footer border-t border-white/10 px-4 py-3" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <button
          type="button"
          className="btn btn-cyber-secondary btn-sm ms-auto"
          onClick={onHide}
        >
          Close View
        </button>
      </div>
    </Modal>
  );
}
