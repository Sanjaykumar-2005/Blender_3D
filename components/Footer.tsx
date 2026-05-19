'use client';
import { useEffect, useRef } from 'react';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    import('gsap').then((g) =>
      Promise.all([Promise.resolve(g.gsap), import('gsap/ScrollTrigger')])
    ).then(([gsap, st]) => {
      gsap.registerPlugin(st.ScrollTrigger);
      if (!footerRef.current) return;
      const tween = gsap.fromTo(
        footerRef.current.querySelectorAll('.footer-fade'),
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: footerRef.current!, start: 'top 90%' },
        }
      );
      cleanup = () => tween.scrollTrigger?.kill();
    });
    return () => cleanup?.();
  }, []);

  return (
    <footer ref={footerRef} className="bg-ink text-cream px-8 md:px-16 py-12">
      <div className="flex flex-wrap gap-4 justify-between items-center pb-6 border-b border-cream/10 mb-6">
        <div className="footer-fade text-3xl font-black tracking-[0.12em]">
          SHELF<span className="text-accent">™</span>
        </div>
        <p className="footer-fade text-[0.85rem] text-cream/50">Premium digital agency. Hand-crafted since 2024.</p>
      </div>
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <p className="footer-fade text-[0.8rem] text-cream/40">© 2025 SHELF Agency. All rights reserved.</p>
        <div className="flex gap-6">
          {['Privacy', 'Terms', 'Instagram'].map((l) => (
            <a
              key={l}
              href="#"
              className="footer-fade link-underline text-[0.8rem] text-cream/40 no-underline hover:text-cream transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}