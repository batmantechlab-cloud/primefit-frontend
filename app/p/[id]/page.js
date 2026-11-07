import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '../../../components/ProductCard';
import ProductGallery from '../../../components/ProductGallery';
import { formatPrice } from '../../../lib/api';
import { backendGet } from '../../../lib/server';
import { jsonLd, siteUrl } from '../../../lib/site';

const cap = (text = '') => text.charAt(0).toUpperCase() + text.slice(1).replace(/-/g, ' ');

async function load(id) {
  if (!/^[a-f0-9]{24}$/i.test(id)) return null;
  return (await backendGet(`/api/products/${id}`))?.product || null;
}

// Rich preview when the link is shared on WhatsApp / Instagram / X: photo, price, discount.
export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await load(id);
  if (!product) return { title: 'Product not found', robots: { index: false } };
  const deal = product.originalPrice > product.price ? ` (${product.discountPercent}% off)` : '';
  const title = `${product.name} – ${formatPrice(product.price)}${deal}`;
  const description = `${product.name} by ${product.brand || product.storeName} for ${formatPrice(product.price)}${deal}. See how to style it and similar picks on PrimeFit.`;
  return {
    title,
    description,
    alternates: { canonical: `/p/${product.id}` },
    openGraph: { type: 'website', title, description, url: `/p/${product.id}`, images: product.image ? [{ url: product.image, alt: product.name }] : ['/opengraph-image'] },
    twitter: { card: 'summary_large_image', title, description, images: product.image ? [product.image] : ['/twitter-image'] },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await load(id);
  if (!product) notFound();
  const similar = (await backendGet(`/api/products/${id}/similar`))?.products || [];

  const base = siteUrl();
  const facts = [
    product.fit && ['Fit', cap(product.fit)],
    product.colorName && ['Colour', cap(product.colorName)],
    product.pattern && ['Pattern', cap(product.pattern)],
    product.materials?.length && ['Fabric', product.materials.map(cap).join(', ')],
    product.occasions?.length && ['Wear it for', product.occasions.slice(0, 3).map(cap).join(', ')],
  ].filter(Boolean);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images?.length ? product.images : product.image ? [product.image] : undefined,
    brand: product.brand ? { '@type': 'Brand', name: product.brand } : undefined,
    category: product.category,
    color: product.colorName || undefined,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `${base}/p/${product.id}`,
      seller: { '@type': 'Organization', name: product.storeName },
    },
  };

  return <section className="page-shell product-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href={`/discover?category=${encodeURIComponent(product.category)}`}>{cap(product.category)}</Link><span>/</span><span aria-current="page">{product.brand || product.storeName}</span></nav>

    <div className="product-hero">
      <ProductGallery images={product.images?.length ? product.images : [product.image].filter(Boolean)} alt={product.name} />

      <div className="product-info">
        <p className="eyebrow"><span className="eyebrow-line" /> {(product.brand || product.storeName || '').toUpperCase()}</p>
        <h1>{product.name}</h1>

        <div className="product-page-price">
          <strong>{formatPrice(product.price)}</strong>
          {product.originalPrice > product.price && <><s>{formatPrice(product.originalPrice)}</s><span className="deal-chip">{product.discountPercent}% off · Save {formatPrice(product.originalPrice - product.price)}</span></>}
          {product.valueTag === 'Great price' && !(product.originalPrice > product.price) && <span className="deal-chip">Great price for its category</span>}
        </div>

        <ul className="trust-list">
          <li>Sold and shipped by <strong>{product.storeName}</strong>, the official store</li>
          {product.qualityTag && <li>{product.qualityTag}{/^100%/.test(product.qualityTag) ? '' : ' fabric'}</li>}
          <li>Same price as buying direct. Returns handled by {product.storeName}</li>
        </ul>

        <div className="product-cta">
          <a className="button button-dark buy-button" href={product.shopUrl} target="_blank" rel="sponsored nofollow noopener noreferrer">Buy on {product.storeName} <span>↗</span></a>
        </div>

        {product.sizes?.length > 0 && <div className="size-list"><strong>Sizes in stock</strong><div>{product.sizes.slice(0, 12).map((size) => <span key={size}>{size}</span>)}</div></div>}

        {facts.length > 0 && <dl className="fact-list">{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}

        {product.description && <p className="product-description">{product.description}</p>}

        <div className="fit-check">
          <strong>Will this suit you?</strong>
          <p>Tell us your height, build and skin tone and we'll show whether this piece works for you, plus better matches if it doesn't.</p>
          <Link className="text-link" href="/my-style">Check my style in 2 minutes <span>→</span></Link>
        </div>
      </div>
    </div>

    {similar.length > 0 && <section className="similar-section">
      <div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> MORE LIKE THIS</p><h2>Similar pieces, <em>other stores.</em></h2></div></div>
      <div className="product-rail">{similar.map((item, index) => <ProductCard key={item.id} product={item} index={index} />)}</div>
    </section>}

    <p className="affiliate-note">PrimeFit may earn a commission when you buy through these links, at no extra cost to you. Prices can change on the store's site.</p>
  </section>;
}
