import { ImageResponse } from 'next/og';
import { profileData } from '@/data/profile';

export const runtime = 'edge';
export const alt = `${profileData.name} - DevOps Engineer & Cloud Architect`;
export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#070b14',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, rgba(0, 240, 255, 0.15) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(16, 185, 129, 0.1) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '80px',
          fontFamily: 'sans-serif'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 20px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(0, 240, 255, 0.1)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            color: '#00f0ff',
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '30px'
          }}
        >
          DevOps Engineer | Cloud Architect
        </div>

        <h1
          style={{
            fontSize: '64px',
            fontWeight: 900,
            color: '#ffffff',
            margin: '0 0 20px 0',
            letterSpacing: '-0.02em'
          }}
        >
          {profileData.name}
        </h1>

        <p
          style={{
            fontSize: '26px',
            color: '#94a3b8',
            maxWidth: '900px',
            lineHeight: 1.4,
            margin: '0 0 40px 0'
          }}
        >
          Designing, deploying, and automating scalable, secure cloud infrastructure on AWS with Terraform, Kubernetes, and CI/CD pipelines.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '15px'
          }}
        >
          {['AWS', 'Terraform', 'Kubernetes (EKS)', 'CI/CD', 'Ansible'].map((tech) => (
            <div
              key={tech}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#38bdf8',
                fontSize: '18px',
                fontFamily: 'monospace'
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
