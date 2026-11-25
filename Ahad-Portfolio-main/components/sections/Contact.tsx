import { FiLinkedin, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { profileData } from '@/data/profile';
import ContactForm from './ContactForm';

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-heading" data-reveal>
          Contact
        </h2>
        <div className="contact-grid" data-reveal>
          <div>
            <p className="prose">
              I’m open to DevOps and cloud infrastructure roles. The quickest way to reach me is email.
            </p>
            <ul className="contact-list">
              <li>
                <FiMail aria-hidden />
                <a href={`mailto:${profileData.email}`}>{profileData.email}</a>
              </li>
              <li>
                <FiPhone aria-hidden />
                <a href={`tel:${profileData.phone.replace(/\s+/g, '')}`}>{profileData.phone}</a>
              </li>
              <li>
                <FiLinkedin aria-hidden />
                <a href={profileData.linkedIn} target="_blank" rel="noopener noreferrer">
                  {profileData.linkedInLabel}
                </a>
              </li>
              <li>
                <FiMapPin aria-hidden />
                <span>{profileData.location} (PKT, UTC+5)</span>
              </li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
