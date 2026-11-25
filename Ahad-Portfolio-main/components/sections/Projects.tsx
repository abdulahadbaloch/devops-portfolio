'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projectsData, Project } from '@/data/projects';
import ProjectModal from '@/components/ui/ProjectModal';
import { FiLayers, FiCheckCircle, FiMaximize2, FiCpu } from 'react-icons/fi';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-5 position-relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">Featured Deployments</span>
          <h2 className="section-title">Recent Cloud Projects</h2>
          <p className="section-subtitle">
            Enterprise AWS infrastructure deployments demonstrating high availability, zero-downtime automation, and healthcare-grade compliance.
          </p>
        </motion.div>

        <div className="row g-4 align-items-stretch">
          {projectsData.map((project, index) => (
            <div key={project.id} className="col-12 col-lg-4">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-4 h-100 d-flex flex-column justify-content-between position-relative group"
              >
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="section-badge mb-0" style={{ fontSize: '0.75rem' }}>
                      {project.focusTag}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="btn btn-sm p-1.5 rounded-lg text-secondary hover:text-cyan-400 bg-slate-900 border border-white/10"
                      aria-label={`View complete details for ${project.title}`}
                    >
                      <FiMaximize2 size={15} />
                    </button>
                  </div>

                  <h3
                    className="h5 fw-bold mb-3"
                    style={{ cursor: 'pointer', lineHeight: 1.3, color: 'var(--text-heading)' }}
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.title}
                  </h3>

                  <ul className="list-unstyled d-flex flex-column gap-2 mb-4">
                    {project.cardBullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="d-flex align-items-start gap-2 text-secondary small">
                        <span className="text-cyan-400 mt-1 flex-shrink-0">
                          <FiCheckCircle size={13} />
                        </span>
                        <span className="leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="pt-3 border-top border-white/10 mb-3">
                    <div className="d-flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 5).map((tech, tIdx) => (
                        <span key={tIdx} className="tech-chip" style={{ fontSize: '0.7rem' }}>
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 5 && (
                        <span className="tech-chip text-cyan-400 font-bold" style={{ fontSize: '0.7rem' }}>
                          +{project.techStack.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="btn btn-cyber-secondary btn-sm w-100 d-flex align-items-center justify-content-center gap-2"
                  >
                    <FiLayers size={14} />
                    <span>View Architecture Details</span>
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        show={Boolean(selectedProject)}
        onHide={() => setSelectedProject(null)}
      />
    </section>
  );
}
