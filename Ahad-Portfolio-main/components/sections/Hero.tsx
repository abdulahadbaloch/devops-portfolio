import type { CSSProperties } from 'react';
import { FiArrowRight, FiDownload, FiFileText, FiLinkedin, FiMapPin } from 'react-icons/fi';
import { profileData } from '@/data/profile';
import { RESUME_FILENAME, RESUME_PATH } from '@/lib/constants';

// Decorative pipeline: each stage lights up in turn, on a loop.
const PIPELINE = [
  { stage: 'Commit', tool: 'GitHub' },
  { stage: 'Plan', tool: 'Terraform' },
  { stage: 'Build', tool: 'Docker' },
  { stage: 'Deploy', tool: 'ArgoCD → EKS' },
  { stage: 'Monitor', tool: 'Prometheus' }
];

const HIGHLIGHTS = ['AWS', 'Terraform', 'Kubernetes', 'CI/CD'];

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-glow" />
      </div>

      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <FiMapPin aria-hidden /> {profileData.location}
          </p>
          <h1>{profileData.name}</h1>
          <p className="hero-title">{profileData.title}</p>
          <p className="hero-intro">{profileData.intro}</p>

          <ul className="hero-highlights" aria-label="Core skills">
            {HIGHLIGHTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="button-row">
            <a className="button button-primary" href={RESUME_PATH} target="_blank" rel="noopener noreferrer">
              <FiFileText aria-hidden /> View résumé
            </a>
            <a className="button" href={RESUME_PATH} download={RESUME_FILENAME}>
              <FiDownload aria-hidden /> Download PDF
            </a>
            <a className="button button-arrow" href="#contact">
              Get in touch <FiArrowRight aria-hidden />
            </a>
            <a
              className="button button-icon"
              href={profileData.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              <FiLinkedin aria-hidden />
            </a>
          </div>
        </div>

        <div className="pipeline" aria-hidden="true">
          <div className="pipeline-head">
            <span className="pipeline-file">deploy.yml</span>
            <span className="pipeline-branch">main</span>
          </div>
          <ol className="pipeline-steps">
            {PIPELINE.map(({ stage, tool }, index) => (
              <li key={stage} style={{ ['--step' as string]: index } as CSSProperties}>
                <span className="pipeline-dot" />
                <span className="pipeline-stage">{stage}</span>
                <span className="pipeline-tool">{tool}</span>
              </li>
            ))}
          </ol>
          <div className="pipeline-bar">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
