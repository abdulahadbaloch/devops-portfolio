import { projectsData } from '@/data/projects';
import { revealDelay } from '@/lib/reveal';

const VISIBLE_BULLETS = 3;

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-heading" data-reveal>
          Projects
        </h2>
        <div className="project-list">
          {projectsData.map((project, index) => {
            const shownBullets = project.bullets.slice(0, VISIBLE_BULLETS);
            const moreBullets = project.bullets.slice(VISIBLE_BULLETS);
            return (
              <article key={project.id} className="project" data-reveal style={revealDelay(index, 100)}>
                <p className="project-focus">{project.focusTag}</p>
                <h3>{project.title}</h3>
                <ul className="bullets">
                  {shownBullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                {moreBullets.length > 0 && (
                  <details className="project-more">
                    <summary>More detail ({moreBullets.length})</summary>
                    <ul className="bullets">
                      {moreBullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </details>
                )}
                <ul className="tags" aria-label="Technologies used">
                  {project.techStack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
