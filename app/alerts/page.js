import AlertSignup from '../../components/AlertSignup';

export const metadata = {
  title: 'Get Deal Alerts for Your Style on WhatsApp & Telegram',
  description: "Register once with your occasions, budget and skin tone. Get men's clothing deals from Levi's, Rare Rabbit, Jack & Jones and more, picked for you, on WhatsApp or Telegram. Free.",
  alternates: { canonical: '/alerts' },
};

export default function AlertsPage() {
  return <section className="page-shell">
    <div className="page-intro">
      <p className="eyebrow"><span className="eyebrow-line" /> FREE DEAL ALERTS</p>
      <h1 className="split-heading">Deals that suit you,<br /><em>sent to your phone.</em></h1>
      <p>Tell us where you need outfits and your budget. When a piece that suits your style goes on sale at Levi's, Rare Rabbit, Jack & Jones and more, we'll message you on WhatsApp or Telegram. Ask for anything too, like "white shirt under 1500".</p>
    </div>
    <AlertSignup />
  </section>;
}
