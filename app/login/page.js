import { Suspense } from "react";
import AuthPanel from "../../components/AuthPanel";

export const metadata = {
  alternates: { canonical: "/login" },
  title: "Sign in or create an account",
  description: "Sign in to PrimeFit to keep your style profile and personal edit on every device.",
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <section className="page-shell auth-page">
      <div className="auth-layout">
        <div className="page-intro">
          <p className="eyebrow"><span className="eyebrow-line" /> YOUR STYLE, KEPT CLOSE</p>
          <h1 className="split-heading">Welcome <em>back.</em></h1>
          <p>Sign in to keep your style profile and personal edit on every device. Prefer to look around first? You can do that without an account.</p>
          <ul className="auth-perks">
            <li><span>01</span>Your edit, synced across devices</li>
            <li><span>02</span>Recommendations that sharpen as you refine your profile</li>
            <li><span>03</span>One edit across Levi's, Rare Rabbit, Jack & Jones and more</li>
          </ul>
        </div>
        <Suspense fallback={<div className="auth-card auth-card-loading"><span className="loading-orb" /></div>}>
          <AuthPanel />
        </Suspense>
      </div>
    </section>
  );
}
