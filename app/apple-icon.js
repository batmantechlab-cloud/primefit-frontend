import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#29352d' }}>
      <svg width="150" height="150" viewBox="0 0 64 64">
        <path d="M22 50V16h12.5a10.5 10.5 0 0 1 0 21H22" fill="none" stroke="#f6f5f1" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="44.5" cy="47.5" r="4.5" fill="#b5bcae" />
      </svg>
    </div>,
    size,
  );
}
