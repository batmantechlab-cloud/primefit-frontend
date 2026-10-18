'use client';

import { useEffect, useRef, useState } from 'react';

// Muted, looping background video. Loads a lighter file on phones, pauses when
// off screen, and shows the poster only for people who prefer reduced motion.
export default function AmbientVideo({ name, poster, className = '' }) {
  const ref = useRef(null);
  const [src, setSrc] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setSrc(`/media/${name}-${window.innerWidth < 760 ? 360 : 720}.mp4`);
  }, [name]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !src) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.15 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return <div className={`ambient-video ${playing ? 'is-playing' : ''} ${className}`}>
    <img src={poster} alt="" aria-hidden="true" className="ambient-poster" />
    {src && <video ref={ref} src={src} muted loop playsInline autoPlay preload="auto" aria-hidden="true" onPlaying={() => setPlaying(true)} />}
  </div>;
}
