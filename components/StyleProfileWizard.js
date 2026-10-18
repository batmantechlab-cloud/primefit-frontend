'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { API_ROUTES, PROFILE_KEY, apiRequest, readLocalProfile } from '../lib/api';
import { useAuth } from './AuthProvider';

// Only questions anyone can answer about themselves. No fashion knowledge needed:
// our stylist model turns these facts into colours, fits and looks.
const AGES = ['18-24', '25-34', '35-44', '45+'];
const BUILDS = [
  { value: 'slim', label: 'Slim', hint: 'Lean frame, narrow shoulders', shoulders: 15, waist: 12 },
  { value: 'average', label: 'Average', hint: 'Neither slim nor heavy', shoulders: 18, waist: 16 },
  { value: 'athletic', label: 'Athletic', hint: 'Broad shoulders, gym-fit', shoulders: 23, waist: 15 },
  { value: 'broad', label: 'Broad / heavy', hint: 'Fuller chest or tummy', shoulders: 21, waist: 23 },
];
const SKIN_TONES = [
  { value: 'fair', label: 'Fair', color: '#f1d3bd' },
  { value: 'wheatish', label: 'Wheatish', color: '#d9a77c' },
  { value: 'dusky', label: 'Dusky', color: '#a8714a' },
  { value: 'dark', label: 'Deep', color: '#6b4329' },
];
const OCCASIONS = [
  { value: 'daily', label: 'Daily & college' },
  { value: 'office', label: 'Office' },
  { value: 'date', label: 'Dates & outings' },
  { value: 'party', label: 'Parties' },
  { value: 'wedding', label: 'Weddings & festivals' },
  { value: 'travel', label: 'Travel' },
  { value: 'gym', label: 'Gym & sports' },
];
const BUDGETS = ['Under ₹1,000', '₹1,000–₹2,000', '₹2,000–₹3,500', '₹3,500–₹6,000', '₹6,000+', 'Flexible'];
const SIZES = ['S', 'M', 'L', 'XL', 'XXL', '3XL'];

const STEPS = [
  { title: 'A little about you.', subtitle: 'Just the basics. No fashion questions, promise.' },
  { title: 'How would you describe your build?', subtitle: 'Pick the closest. It helps us choose fits that flatter you.' },
  { title: 'Which is closest to your skin tone?', subtitle: 'Look at your inner wrist in daylight. This decides which colours make you look your best.' },
  { title: 'Where will you wear it?', subtitle: 'Choose all that apply, and what you usually spend on one piece.' },
];

const initial = { ageRange: '', heightCm: 172, bodyType: '', skinTone: '', occasions: [], budgetPerItem: '', topSize: '' };

function feetAndInches(cm) {
  const totalInches = Math.round(cm / 2.54);
  return `${Math.floor(totalInches / 12)}′ ${totalInches % 12}″`;
}

function Silhouette({ shoulders, waist }) {
  const top = 34;
  const bottom = 96;
  return <svg viewBox="0 0 100 110" aria-hidden="true" className="silhouette">
    <circle cx="50" cy="18" r="10" />
    <path d={`M${50 - shoulders} ${top} Q50 ${top - 7} ${50 + shoulders} ${top} L${50 + waist} ${bottom} Q50 ${bottom + 6} ${50 - waist} ${bottom} Z`} />
  </svg>;
}

function Chip({ selected, onClick, children, index = 0 }) {
  return <button type="button" style={{ '--i': index }} onClick={onClick} className={`choice-chip ${selected ? 'selected' : ''}`} aria-pressed={selected}>
    {children}<span>{selected ? '✓' : '+'}</span>
  </button>;
}

export default function StyleProfileWizard() {
  const router = useRouter();
  const { user, ready } = useAuth();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState('forward');
  const [profile, setProfile] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    const local = readLocalProfile();
    if (local) setProfile({ ...initial, ...local });
  }, []);

  // A signed-in account's saved profile wins over the device copy.
  useEffect(() => {
    if (!ready || !user) return;
    apiRequest(API_ROUTES.myStyle)
      .then((result) => { if (result?.profile) setProfile({ ...initial, ...result.profile, heightCm: result.profile.heightCm || initial.heightCm }); })
      .catch(() => {});
  }, [ready, user]);

  function update(key, value) { setProfile((current) => ({ ...current, [key]: value })); setSaved(null); }
  function toggle(key, value) { const current = profile[key] || []; update(key, current.includes(value) ? current.filter((item) => item !== value) : [...current, value]); }
  function go(nextStep) { setDirection(nextStep > step ? 'forward' : 'back'); setStep(nextStep); window.scrollTo({ top: 0, behavior: 'smooth' }); }

  const canContinue = [profile.ageRange, profile.bodyType, profile.skinTone, profile.occasions.length][step];

  async function save() {
    setSaving(true); setError('');
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      if (user) {
        await apiRequest(API_ROUTES.saveStyle, { method: 'POST', body: JSON.stringify(profile) });
        setSaved('account');
      } else setSaved('device');
    } catch (e) {
      setError(`${e.message || 'We could not sync your profile.'} It is still saved on this device.`);
      setSaved('device');
    } finally { setSaving(false); }
  }

  return <div className="wizard-card">
    <div className="wizard-top"><span>YOUR STYLE PROFILE</span><span>{String(step + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}</span></div>
    <div className="wizard-steps" aria-hidden="true">{STEPS.map((item, index) => <span key={item.title} className={index < step ? 'done' : index === step ? 'current' : ''} />)}</div>

    <div className={`wizard-content slide-${direction}`} key={step}>
      <h2>{STEPS[step].title}</h2><p className="wizard-subtitle">{STEPS[step].subtitle}</p>

      {step === 0 && <>
        <div className="field-group"><label className="field-label">Your age</label>
          <div className="choice-grid">{AGES.map((age, index) => <Chip key={age} index={index} selected={profile.ageRange === age} onClick={() => update('ageRange', age)}>{age}</Chip>)}</div>
        </div>
        <div className="field-group"><label className="field-label" htmlFor="height">Your height</label>
          <div className="height-readout"><strong>{feetAndInches(profile.heightCm)}</strong><span>{profile.heightCm} cm</span></div>
          <input id="height" className="height-slider" type="range" min="150" max="200" step="1" value={profile.heightCm} onChange={(e) => update('heightCm', Number(e.target.value))} style={{ '--fill': `${((profile.heightCm - 150) / 50) * 100}%` }} />
          <div className="height-scale"><span>4′ 11″</span><span>5′ 7″</span><span>6′ 7″</span></div>
        </div>
      </>}

      {step === 1 && <>
        <div className="build-grid">{BUILDS.map((build, index) => <button type="button" key={build.value} style={{ '--i': index }} className={`build-card ${profile.bodyType === build.value ? 'selected' : ''}`} aria-pressed={profile.bodyType === build.value} onClick={() => update('bodyType', build.value)}>
          <Silhouette shoulders={build.shoulders} waist={build.waist} />
          <strong>{build.label}</strong><span>{build.hint}</span>
        </button>)}</div>
        <div className="field-group"><label className="field-label">Usual T-shirt size <em className="optional">optional</em></label>
          <div className="choice-grid">{SIZES.map((size, index) => <Chip key={size} index={index} selected={profile.topSize === size} onClick={() => update('topSize', profile.topSize === size ? '' : size)}>{size}</Chip>)}</div>
        </div>
      </>}

      {step === 2 && <div className="skin-grid">{SKIN_TONES.map((tone, index) => <button type="button" key={tone.value} style={{ '--i': index, '--tone': tone.color }} className={`skin-card ${profile.skinTone === tone.value ? 'selected' : ''}`} aria-pressed={profile.skinTone === tone.value} onClick={() => update('skinTone', tone.value)}>
        <span className="skin-swatch" /><strong>{tone.label}</strong>
      </button>)}</div>}

      {step === 3 && <>
        <div className="field-group"><label className="field-label">Occasions</label>
          <div className="choice-grid">{OCCASIONS.map((item, index) => <Chip key={item.value} index={index} selected={profile.occasions.includes(item.value)} onClick={() => toggle('occasions', item.value)}>{item.label}</Chip>)}</div>
        </div>
        <div className="field-group"><label className="field-label">Usual spend per piece</label>
          <div className="choice-grid">{BUDGETS.map((budget, index) => <Chip key={budget} index={index} selected={profile.budgetPerItem === budget} onClick={() => update('budgetPerItem', budget)}>{budget}</Chip>)}</div>
        </div>
      </>}
    </div>

    {error && <p className="form-note" role="status">{error}</p>}
    {saved ? <div className="save-success">
      <span className="success-check">✓</span>
      <div><strong>Your stylist is ready.</strong><p>{saved === 'account' ? 'Saved to your account.' : <>Saved on this device. <Link href="/login?mode=register&next=/discover">Create an account</Link> to keep it everywhere.</>}</p></div>
      <button className="button button-dark" onClick={() => router.push('/discover')}>See my edit <span>↗</span></button>
    </div> : <div className="wizard-actions">
      <button className="button button-quiet" onClick={() => step === 0 ? router.push('/') : go(step - 1)}>{step === 0 ? 'Cancel' : '← Back'}</button>
      {step < STEPS.length - 1
        ? <button className="button button-dark" disabled={!canContinue} onClick={() => go(step + 1)}>Continue <span>→</span></button>
        : <button className="button button-dark" disabled={saving || !canContinue} onClick={save}>{saving ? 'Saving…' : 'Style me'} <span>↗</span></button>}
    </div>}
    <p className="privacy-hint">We only use these answers to pick clothes for you. Without an account they stay on this device. <Link href="/privacy-policy">Privacy details</Link>.</p>
  </div>;
}
