import { ImageResponse } from 'next/og';

export const alt = 'PrimeFit, your personal menswear stylist';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Default social share card for every page that doesn't set its own.
export default function TwitterImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '72px 80px', background: 'linear-gradient(135deg, #29352d 0%, #1b231d 100%)', color: '#f6f5f1' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        <svg width="72" height="72" viewBox="0 0 64 64">
          <rect width="64" height="64" rx="16" fill="#f6f5f1" />
          <path d="M22 50V16h12.5a10.5 10.5 0 0 1 0 21H22" fill="none" stroke="#29352d" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="44.5" cy="47.5" r="4.5" fill="#7c8977" />
        </svg>
        <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -2 }}>primefit</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>Dress well.</div>
        <div style={{ fontSize: 84, fontWeight: 400, letterSpacing: -3, lineHeight: 1.1, color: '#c9d0c3' }}>Without the guesswork.</div>
        <div style={{ fontSize: 30, marginTop: 30, color: '#b5bcae' }}>Your personal menswear stylist · Age, height, build &amp; skin tone in. Clothes that suit you out.</div>
      </div>
    </div>,
    size,
  );
}
