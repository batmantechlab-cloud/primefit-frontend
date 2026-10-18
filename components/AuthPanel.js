"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { API_ROUTES, apiRequest, readLocalProfile } from "../lib/api";
import { useAuth } from "./AuthProvider";

export default function AuthPanel() {
  const router = useRouter();
  const params = useSearchParams();
  const { user, ready, setUser } = useAuth();
  const [mode, setMode] = useState(params.get("mode") === "register" ? "register" : "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const next = params.get("next")?.startsWith("/") ? params.get("next") : "/discover";

  useEffect(() => {
    if (ready && user) router.replace(next);
  }, [ready, user, next, router]);

  function switchMode(value) {
    setMode(value);
    setError("");
  }

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const path = mode === "login" ? API_ROUTES.login : API_ROUTES.register;
      const result = await apiRequest(path, {
        method: "POST",
        body: JSON.stringify({ email, password, ...(mode === "register" ? { name } : {}) }),
      });

      // Carry a profile built before signing in over to the new account.
      const localProfile = readLocalProfile();
      if (localProfile) {
        const existing = await apiRequest(API_ROUTES.myStyle).catch(() => null);
        if (!existing?.profile) {
          await apiRequest(API_ROUTES.saveStyle, { method: "POST", body: JSON.stringify(localProfile) }).catch(() => {});
        }
      }
      setUser(result.user);
    } catch (e) {
      setError(e.message || "Could not sign in. Please try again.");
      setBusy(false);
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-tabs" role="tablist">
        <button type="button" role="tab" aria-selected={mode === "login"} className={mode === "login" ? "active" : ""} onClick={() => switchMode("login")}>Sign in</button>
        <button type="button" role="tab" aria-selected={mode === "register"} className={mode === "register" ? "active" : ""} onClick={() => switchMode("register")}>Create account</button>
        <span className="auth-tab-indicator" style={{ transform: `translateX(${mode === "login" ? 0 : 100}%)` }} />
      </div>
      <form onSubmit={submit} className="auth-form" key={mode}>
        {mode === "register" && (
          <label className="float-field">
            <input autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder=" " required />
            <span>Your name</span>
          </label>
        )}
        <label className="float-field">
          <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" " required />
          <span>Email address</span>
        </label>
        <label className="float-field">
          <input
            type={showPassword ? "text" : "password"}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            required
          />
          <span>Password</span>
          <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </label>
        {mode === "register" && <span className="field-help">Use at least 8 characters.</span>}
        <button className="button button-dark auth-submit" disabled={busy}>
          {busy ? <span className="button-spinner" /> : mode === "login" ? "Sign in" : "Create my account"} <span>↗</span>
        </button>
      </form>
      {error && <p className="form-error" role="alert">{error}</p>}
      <p className="auth-optional">
        Just browsing? <Link href="/my-style">Build your style profile without an account →</Link>
      </p>
      <p className="privacy-hint">
        By continuing, you agree to our <Link href="/terms">Terms</Link> and acknowledge our <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    </div>
  );
}
