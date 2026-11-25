import { profileData } from '@/data/profile';
import { educationData } from '@/data/education';
import { revealDelay } from '@/lib/reveal';

const facts = [
  { label: 'Experience', value: '4+ years' },
  { label: 'Focus', value: 'AWS, Terraform, EKS, CI/CD' },
  { label: 'Education', value: educationData.degree },
  { label: 'Based in', value: profileData.location }
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-heading" data-reveal>
          About
        </h2>
        <div className="about-grid">
          <div className="prose">
            {profileData.about.map((paragraph, index) => (
              <p key={paragraph} data-reveal style={revealDelay(index)}>
                {paragraph}
              </p>
            ))}
          </div>
          <dl className="facts">
            {facts.map((fact, index) => (
              <div key={fact.label} data-reveal style={revealDelay(index + 1)}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
