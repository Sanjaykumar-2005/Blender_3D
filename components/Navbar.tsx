'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const cartBtnRef = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY && y > 200);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const btn = cartBtnRef.current;
    if (!btn) return;
    const strength = 18;
    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(btn, { x: (x / r.width) * strength, y: (y / r.height) * strength, duration: 0.35, ease: 'power3.out' });
    };
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);
    return () => {
      btn.removeEventListener('mousemove', onMove);
      btn.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-cream/85 backdrop-blur-xl border-b border-ink/8 transition-all duration-300 ${
        scrolled ? 'py-3 px-8 md:px-12' : 'py-5 px-8 md:px-16'
      } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className={`font-black tracking-[0.12em] transition-all duration-300 ${scrolled ? 'text-xl' : 'text-2xl'}`}>
        SHELF<span className="text-accent">™</span>
      </div>

      <ul className="hidden md:flex gap-10 list-none">
        {['Products', 'About', 'Contact'].map((l) => (
          <li key={l}>
            <Link
              href={`#${l.toLowerCase()}`}
              className="link-underline text-[0.85rem] tracking-[0.08em] uppercase text-ink-mid no-underline hover:text-accent transition-colors duration-200"
            >
              {l}
            </Link>
          </li>
        ))}
      </ul>

      <button
        ref={cartBtnRef}
        className="bg-ink text-cream px-6 py-2.5 text-[0.8rem] font-bold tracking-[0.1em] uppercase border-none cursor-pointer transition-colors duration-200 hover:bg-accent"
      >
        Add to Cart
      </button>
    </nav>
  );
}
