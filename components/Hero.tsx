'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import HeroScene from './HeroScene';

export default function Hero() {
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to('.hero-tag',     { opacity: 1, duration: 0.6 }, 0.2)
      .to('.hero-title',   { opacity: 1, y: 0, duration: 0.9 }, 0.4)
      .to('.hero-sub',     { opacity: 1, y: 0, duration: 0.7 }, 0.7)
      .to('.hero-actions', { opacity: 1, duration: 0.6 }, 0.9);
  }, []);

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center gap-8 px-4 md:px-16 pt-28 pb-12">
      {/* Text */}
      <div>
        <p className="hero-tag text-[0.75rem] tracking-[0.2em] uppercase text-ink-mid mb-6 opacity-0">
          Est. 2024 · Premium Digital Agency
        </p>
        <h1 className="hero-title text-[clamp(3.5rem,6vw,6rem)] font-black leading-none tracking-tight mb-6 opacity-0 translate-y-10">
          We sell<br />
          <span className="text-accent italic font-serif">ideas</span><br />
          by the jar.
        </h1>
        <p className="hero-sub text-[1.05rem] leading-7 text-ink-mid max-w-md mb-10 opacity-0 translate-y-5">
          Hand-crafted digital products, beautifully packaged and ready to ship. Pick your flavour.
        </p>
        <div className="hero-actions flex gap-4 flex-wrap opacity-0">
          <a href="#products" className="btn-primary">Browse the Shelf</a>
          <a href="#about"    className="btn-ghost">Our Process</a>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="relative h-[500px] lg:h-[600px]">
        <HeroScene />
        <div className="absolute top-8 right-8 w-20 h-20 bg-accent rounded-full flex flex-col items-center justify-center text-white text-center animate-badge-spin">
          <span className="text-[0.65rem] font-black tracking-[0.15em]">NEW</span>
          <p className="text-[0.5rem] tracking-[0.1em] uppercase">Season 2025</p>
        </div>
      </div>
    </section>
  );
}
