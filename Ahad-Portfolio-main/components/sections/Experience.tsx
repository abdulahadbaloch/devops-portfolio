import { experienceData } from '@/data/experience';
import { revealDelay } from '@/lib/reveal';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-heading" data-reveal>
          Experience
        </h2>
        <ol className="timeline">
          {experienceData.map((job) => (
            <li key={job.id} className="timeline-entry" data-reveal>
              <div className="timeline-meta">
                <p className="timeline-period">{job.period}</p>
                <p className="muted">{job.location}</p>
              </div>
              <div className="timeline-body">
                <h3>
                  {job.role} <span className="at">· {job.company}</span>
                </h3>
                <ul className="bullets">
                  {job.highlights.map((highlight, index) => (
                    <li key={highlight} data-reveal style={revealDelay(index, 50)}>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
