import { skillsData } from '@/data/skills';
import { revealDelay } from '@/lib/reveal';

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-heading" data-reveal>
          Skills
        </h2>
        <dl className="skills">
          {skillsData.map((group, index) => (
            <div key={group.category} className="skills-row" data-reveal style={revealDelay(index, 40)}>
              <dt>{group.category}</dt>
              <dd>
                <ul className="tags">
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
