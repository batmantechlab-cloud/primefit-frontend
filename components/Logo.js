// PrimeFit brand mark: a "P" drawn like a tailor's hanger hook, in a rounded tile.
export function LogoMark({ size = 30, className = '' }) {
  return <svg width={size} height={size} viewBox="0 0 64 64" className={`logo-mark ${className}`} aria-hidden="true">
    <rect width="64" height="64" rx="16" fill="#29352d" />
    <path d="M22 50V16h12.5a10.5 10.5 0 0 1 0 21H22" fill="none" stroke="#f6f5f1" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="44.5" cy="47.5" r="4.5" fill="#b5bcae" />
  </svg>;
}

export default function Logo({ className = '' }) {
  return <span className={`logo ${className}`}><LogoMark /><span className="logo-word">primefit</span></span>;
}
