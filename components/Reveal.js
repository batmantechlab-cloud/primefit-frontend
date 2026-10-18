'use client';

import { useEffect, useRef, useState } from 'react';

// Fades and lifts its content into view the first time it scrolls on screen.
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...props }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!('IntersectionObserver' in window)) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <Tag ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ '--reveal-delay': `${delay}ms` }} {...props}>{children}</Tag>;
}
