import { profileData } from '@/data/profile';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {profileData.name}
        </p>
        <ul className="footer-links">
          <li>
            <a href={`mailto:${profileData.email}`}>Email</a>
          </li>
          <li>
            <a href={profileData.linkedIn} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="#top">Back to top</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
