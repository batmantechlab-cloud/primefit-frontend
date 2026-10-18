import AdminPanel from '../../components/AdminPanel';

export const metadata = { title: 'Studio', robots: { index: false, follow: false } };

export default function AdminPage() {
  return <section className="page-shell admin-page">
    <div className="page-intro"><p className="eyebrow"><span className="eyebrow-line" /> PRIMEFIT STUDIO</p><h1>Curate the <em>edit.</em></h1><p>Import menswear from partner stores, manage what's live, and watch which pieces shoppers click.</p></div>
    <AdminPanel />
  </section>;
}
