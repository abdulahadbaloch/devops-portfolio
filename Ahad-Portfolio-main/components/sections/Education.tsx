import { educationData } from '@/data/education';

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <h2 className="section-heading" data-reveal>
          Education
        </h2>
        <div className="timeline-entry" data-reveal>
          <div className="timeline-meta">
            <p className="timeline-period">Graduated {educationData.graduationYear}</p>
            <p className="muted">{educationData.location}</p>
          </div>
          <div>
            <h3>{educationData.degree}</h3>
            <p className="muted">{educationData.institution}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
