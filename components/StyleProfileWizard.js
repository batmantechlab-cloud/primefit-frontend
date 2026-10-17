'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API_ROUTES, apiRequest } from '../lib/api';

const steps = [
  { title: 'What are you dressing for?', subtitle: 'Choose all that apply.', fields: [
    { key: 'occasions', label: 'Occasions', type: 'multi', options: ['Everyday', 'Work', 'Date night', 'Wedding', 'Party', 'Travel', 'Gym / active', 'Festive', 'Formal event'] },
  ]},
  { title: 'Tell us about your fit.', subtitle: 'This helps us make more relevant suggestions.', fields: [
    { key: 'heightCm', label: 'Height (cm)', type: 'number', placeholder: 'e.g. 172' },
    { key: 'bodyBuild', label: 'Build', type: 'single', options: ['Lean', 'Average', 'Athletic', 'Broad', 'Plus size', 'Prefer not to say'] },
    { key: 'fitPreference', label: 'How do you like clothes to fit?', type: 'single', options: ['Slim', 'Regular', 'Relaxed', 'Oversized', 'Depends on the piece'] },
    { key: 'usualTopSize', label: 'Usual top size', type: 'single', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL+', 'Not sure'] },
    { key: 'usualBottomSize', label: 'Usual bottom size', type: 'text', placeholder: 'e.g. 32 / M / not sure' },
  ]},
  { title: 'Choose your visual direction.', subtitle: 'No right answers. Select what feels like you.', fields: [
    { key: 'stylePersonalities', label: 'Your style', type: 'multi', options: ['Minimal', 'Classic', 'Smart casual', 'Streetwear', 'Athleisure', 'Old money', 'Contemporary', 'Traditional / ethnic', 'Experimental'] },
    { key: 'preferredColours', label: 'Colours you reach for', type: 'multi', options: ['Black', 'White', 'Navy', 'Earth tones', 'Neutrals', 'Blue', 'Green', 'Pastels', 'Bold colours'] },
    { key: 'avoidColours', label: 'Colours you avoid (optional)', type: 'text', placeholder: 'Any colours you rarely wear?' },
    { key: 'skinTone', label: 'Skin tone (optional)', type: 'single', options: ['Light', 'Medium', 'Tan', 'Deep', 'Prefer not to say'] },
  ]},
  { title: 'Make it practical.', subtitle: 'So we can keep suggestions within your comfort zone.', fields: [
    { key: 'budgetPerItem', label: 'Budget per item', type: 'single', options: ['Under ₹750', '₹750–₹1,500', '₹1,500–₹3,000', '₹3,000–₹6,000', '₹6,000+', 'Flexible'] },
    { key: 'preferredBrands', label: 'Brands you like (optional)', type: 'text', placeholder: 'Add brands separated by commas' },
    { key: 'avoidMaterials', label: 'Materials or details to avoid (optional)', type: 'text', placeholder: 'e.g. wool, loud logos' },
  ]},
];

const initial = { occasions: [], heightCm: '', bodyBuild: '', fitPreference: '', usualTopSize: '', usualBottomSize: '', stylePersonalities: [], preferredColours: [], avoidColours: '', skinTone: '', budgetPerItem: '', preferredBrands: '', avoidMaterials: '' };

export default function StyleProfileWizard() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const cached = localStorage.getItem('primefit-style-profile');
      if (cached) setProfile({ ...initial, ...JSON.parse(cached) });
    } catch { /* Ignore invalid local cache and allow a fresh profile. */ }
  }, []);

  function update(key, value) { setProfile((current) => ({ ...current, [key]: value })); setSaved(false); }
  function toggle(key, value) { const current = profile[key] || []; update(key, current.includes(value) ? current.filter((item) => item !== value) : [...current, value]); }

  async function save() {
    setSaving(true); setError('');
    try {
      localStorage.setItem('primefit-style-profile', JSON.stringify(profile));
      let result;
      try { result = await apiRequest(API_ROUTES.saveStyle, { method: 'POST', body: JSON.stringify(profile) }); }
      catch (apiError) {
        // Keep a usable anonymous local profile if the backend is offline; do not pretend it was saved to the database.
        if (apiError instanceof TypeError || /fetch|network|failed/i.test(apiError.message)) {
          setError('Saved on this device. Connect the backend to sync your profile across devices.');
          setSaved(true); return;
        }
        throw apiError;
      }
      const id = result?.profileId || result?.id || result?.data?.id;
      if (id) localStorage.setItem('primefit-style-profile-id', String(id));
      setSaved(true);
    } catch (e) { setError(e.message || 'We could not save your profile. Please try again.'); }
    finally { setSaving(false); }
  }

  return <div className="wizard-card">
    <div className="wizard-top"><span>YOUR STYLE PROFILE</span><span>{step + 1} / {steps.length}</span></div>
    <div className="progress-track"><span style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
    <div className="wizard-content" key={step}>
      <h2>{steps[step].title}</h2><p className="wizard-subtitle">{steps[step].subtitle}</p>
      {steps[step].fields.map((field) => <div className="field-group" key={field.key}><label className="field-label">{field.label}</label>
        {field.type === 'multi' && <div className="choice-grid">{field.options.map((option) => <button type="button" key={option} onClick={() => toggle(field.key, option)} className={`choice-chip ${(profile[field.key] || []).includes(option) ? 'selected' : ''}`} aria-pressed={(profile[field.key] || []).includes(option)}>{option}<span>{(profile[field.key] || []).includes(option) ? '✓' : '+'}</span></button>)}</div>}
        {field.type === 'single' && <div className="choice-grid">{field.options.map((option) => <button type="button" key={option} onClick={() => update(field.key, option)} className={`choice-chip ${profile[field.key] === option ? 'selected' : ''}`} aria-pressed={profile[field.key] === option}>{option}<span>{profile[field.key] === option ? '✓' : '+'}</span></button>)}</div>}
        {field.type === 'number' && <input className="text-input" type="number" min="80" max="250" value={profile[field.key]} onChange={(e) => update(field.key, e.target.value)} placeholder={field.placeholder} />}
        {field.type === 'text' && <input className="text-input" value={profile[field.key]} onChange={(e) => update(field.key, e.target.value)} placeholder={field.placeholder} />}
      </div>)}
    </div>
    {error && <p className={saved ? 'form-note' : 'form-error'} role="status">{error}</p>}
    {saved ? <div className="save-success"><span>✓</span><div><strong>Your style is saved.</strong><p>Use it to discover a more relevant edit.</p></div><Link className="button button-dark" href="/discover">See my edit ↗</Link></div> : <div className="wizard-actions"><button className="button button-quiet" onClick={() => step === 0 ? window.location.assign('/') : setStep(step - 1)}>{step === 0 ? 'Cancel' : '← Back'}</button>{step < steps.length - 1 ? <button className="button button-dark" onClick={() => setStep(step + 1)}>Continue <span>→</span></button> : <button className="button button-dark" disabled={saving} onClick={save}>{saving ? 'Saving…' : 'Save my style'} <span>↗</span></button>}</div>}
    <p className="privacy-hint">Optional details can be skipped. Your choices are stored on this device and sent to our backend when available. <Link href="/privacy-policy">Privacy details</Link>.</p>
  </div>;
}
