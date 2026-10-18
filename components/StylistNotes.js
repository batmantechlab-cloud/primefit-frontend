import Link from 'next/link';
import { COLOUR_HEX } from '../lib/api';

const cap = (text) => text.charAt(0).toUpperCase() + text.slice(1);

// The stylist's reasoning, in plain words, so shoppers learn what suits them.
export default function StylistNotes({ brief }) {
  if (!brief) return null;
  return <section className="stylist-notes" aria-label="Your stylist notes">
    <div className="notes-head">
      <p className="eyebrow"><span className="eyebrow-line" /> YOUR STYLIST NOTES</p>
      <Link className="text-link" href="/my-style">Edit my details <span>→</span></Link>
    </div>
    <div className="notes-grid">
      {brief.colours?.length ? <div className="notes-block">
        <h3>Colours that suit you</h3>
        <div className="notes-swatches">{brief.colours.map((colour) => <span key={colour}><i style={{ background: COLOUR_HEX[colour] || '#ccc' }} />{cap(colour)}</span>)}</div>
        {brief.avoidColours?.length ? <p className="notes-muted">Go easy on {brief.avoidColours.join(', ')}.</p> : null}
      </div> : null}
      {brief.fits?.length ? <div className="notes-block">
        <h3>Fits that flatter you</h3>
        <div className="notes-pills">{brief.fits.map((fit) => <span key={fit}>{cap(fit)} fit</span>)}</div>
        {brief.avoidFits?.length ? <p className="notes-muted">We'll skip {brief.avoidFits.join(' and ')} fits for you.</p> : null}
      </div> : null}
      {brief.tips?.length ? <div className="notes-block notes-tips">
        <h3>Why these picks</h3>
        <ul>{brief.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
      </div> : null}
    </div>
  </section>;
}
