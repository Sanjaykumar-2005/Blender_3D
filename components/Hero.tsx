'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import HeroScene from './HeroScene';

function useMagnetic<T extends HTMLElement>(strength = 22) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(el, { x: (x / r.width) * strength, y: (y / r.height) * strength, duration: 0.4, ease: 'power3.out' });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.35)' });
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);
  return ref;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shape1 = useRef<HTMLDivElement>(null);
  const shape2 = useRef<HTMLDivElement>(null);
  const primaryBtn = useMagnetic<HTMLAnchorElement>(20);
  const ghostBtn = useMagnetic<HTMLAnchorElement>(20);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-tag', { opacity: 0, duration: 0.6 }, 0.2)
        .from('.hero-word > span', { yPercent: 110, duration: 1.1, stagger: 0.08, ease: 'expo.out' }, 0.35)
        .from('.hero-sub', { opacity: 0, y: 20, duration: 0.7 }, 0.85)
        .from('.hero-actions', { opacity: 0, y: 12, duration: 0.6 }, 1.05)
        .from('.hero-scroll-cue', { opacity: 0, duration: 0.6 }, 1.4);
    }

    gsap.to('.hero-scroll-cue-arrow', {
      y: 8,
      duration: 1.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    let mouseX = 0, mouseY = 0;
    const onMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(shape1.current, { x: mouseX * 40, y: mouseY * 30, duration: 1.2, ease: 'power2.out' });
      gsap.to(shape2.current, { x: mouseX * -25, y: mouseY * -20, duration: 1.4, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const titleLines: string[][] = [
    ['We', 'sell'],
    ['ideas'],
    ['by', 'the', 'jar.'],
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center gap-8 px-4 md:px-16 pt-28 pb-12 overflow-hidden"
    >
      <div ref={shape1} className="float-shape w-[420px] h-[420px] -top-20 -left-20 bg-accent/30" />
      <div ref={shape2} className="float-shape w-[320px] h-[320px] bottom-10 left-1/3 bg-gold/40" />

      <div className="relative z-10">
        <p className="hero-tag text-[0.75rem] tracking-[0.2em] uppercase text-ink-mid mb-6">
          Est. 2024 · Premium Digital Agency
        </p>
        <h1 className="text-[clamp(3.5rem,6vw,6rem)] font-black leading-[0.95] tracking-tight mb-6">
          {titleLines.map((line, li) => (
            <span key={li} className="block">
              {line.map((word, wi) => {
                const italic = word === 'ideas';
                return (
                  <span key={wi} className="hero-word reveal-word mr-3">
                    <span className={italic ? 'text-accent italic font-serif' : ''}>{word}</span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>
        <p className="hero-sub text-[1.05rem] leading-7 text-ink-mid max-w-md mb-10">
          Hand-crafted digital products, beautifully packaged and ready to ship. Pick your flavour.
        </p>
        <div className="hero-actions flex gap-4 flex-wrap">
          <a ref={primaryBtn} href="#products" className="btn-primary"><span>Browse the Shelf</span></a>
          <a ref={ghostBtn} href="#about" className="btn-ghost"><span>Our Process</span></a>
        </div>
      </div>

      <div className="relative h-[500px] lg:h-[600px] z-10">
        <HeroScene />
        <div className="absolute top-8 right-8 w-20 h-20 bg-accent rounded-full flex flex-col items-center justify-center text-white text-center animate-badge-spin shadow-xl">
          <span className="text-[0.65rem] font-black tracking-[0.15em]">NEW</span>
          <p className="text-[0.5rem] tracking-[0.1em] uppercase">Season 2025</p>
        </div>
      </div>

      <div className="hero-scroll-cue absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[0.65rem] tracking-[0.3em] uppercase text-ink-mid">Scroll</span>
        <span className="hero-scroll-cue-arrow text-ink-mid text-lg leading-none">↓</span>
      </div>
    </section>
  );
}
