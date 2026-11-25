import { ImageResponse } from 'next/og';
import { profileData } from '@/data/profile';

// Edge runtime avoids a Next 14 bug where the Node OG renderer fails to prerender on Windows.
export const runtime = 'edge';
export const alt = `${profileData.name}, ${profileData.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '96px',
          backgroundColor: '#fafaf8',
          borderTop: '16px solid #1f5f8b'
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700, color: '#1c1d1f' }}>{profileData.name}</div>
        <div style={{ marginTop: 12, fontSize: 36, color: '#1f5f8b' }}>{profileData.title}</div>
        <div style={{ marginTop: 40, fontSize: 28, color: '#5c5f66', maxWidth: 900, lineHeight: 1.4 }}>
          {`AWS · Terraform · Kubernetes (EKS) · CI/CD · ${profileData.location}`}
        </div>
      </div>
    ),
    size
  );
}
