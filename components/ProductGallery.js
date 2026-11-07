'use client';

import { useState } from 'react';

export default function ProductGallery({ images = [], alt }) {
  const [active, setActive] = useState(0);
  if (!images.length) return <div className="product-gallery"><div className="gallery-main product-image-missing">PrimeFit</div></div>;
  return <div className="product-gallery">
    <div className="gallery-main"><img src={images[active]} alt={alt} /></div>
    {images.length > 1 && <div className="gallery-thumbs">{images.map((src, index) => <button type="button" key={src} className={index === active ? 'is-active' : ''} onClick={() => setActive(index)} aria-label={`Photo ${index + 1}`}><img src={src} alt="" loading="lazy" /></button>)}</div>}
  </div>;
}
