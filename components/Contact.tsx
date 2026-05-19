'use client';
import { useEffect, useRef, useState } from 'react';

function FloatingInput({
  type, label, required, multiline,
}: { type?: string; label: string; required?: boolean; multiline?: boolean }) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const labelCls = `absolute left-5 transition-all duration-200 pointer-events-none ${
    active ? 'top-1 text-[0.65rem] tracking-[0.15em] uppercase text-accent' : 'top-4 text-[0.9rem] text-ink-mid'
  }`;

  return (
    <div className="relative">
      <label className={labelCls}>{label}{required && active ? ' *' : ''}</label>
      {multiline ? (
        <textarea
          value={value}
          required={required}
          rows={4}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-cream border border-ink/20 px-5 pt-6 pb-3 text-[0.9rem] text-ink outline-none focus:border-accent transition-colors resize-y font-sans"
        />
      ) : (
        <input
          type={type}
          value={value}
          required={required}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-cream border border-ink/20 px-5 pt-6 pb-3 text-[0.9rem] text-ink outline-none focus:border-accent transition-colors font-sans"
        />
      )}
    </div>
  );
}

export default function Contact() {
  const innerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    import('gsap').then((g) => {
      return Promise.all([Promise.resolve(g.gsap), import('gsap/ScrollTrigger')]);
    }).then(([gsap, st]) => {
      gsap.registerPlugin(st.ScrollTrigger);
      if (!innerRef.current) return;
      gsap.fromTo(innerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: innerRef.current, start: 'top 80%' } }
      );
      if (headingRef.current) {
        gsap.fromTo(headingRef.current.querySelectorAll('.reveal-line > span'),
          { yPercent: 110 },
          {
            yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.1,
            scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
          }
        );
      }
    });
  }, []);

  const ripple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const span = document.createElement('span');
    const size = Math.max(r.width, r.height) * 2;
    span.style.cssText = `position:absolute;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px;width:${size}px;height:${size}px;border-radius:50%;background:rgba(245,240,232,0.35);transform:scale(0);pointer-events:none;transition:transform 0.6s ease-out, opacity 0.6s ease-out;`;
    btn.appendChild(span);
    requestAnimationFrame(() => {
      span.style.transform = 'scale(1)';
      span.style.opacity = '0';
    });
    setTimeout(() => span.remove(), 650);
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-16 bg-paper">
      <div ref={innerRef} className="max-w-2xl mx-auto">
        <p className="section-tag">Get a Quote</p>
        <h2 ref={headingRef} className="text-4xl lg:text-5xl font-black tracking-tight mb-3 leading-[1.1]">
          <span className="reveal-line block overflow-hidden">
            <span className="inline-block">Fill your cart.</span>
          </span>
        </h2>
        <p className="text-[1rem] text-ink-mid mb-10">Tell us what you need. We'll build you a custom package.</p>
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FloatingInput type="text" label="Your Name" required />
            <FloatingInput type="email" label="Your Email" required />
          </div>
          <FloatingInput multiline label="Describe your project..." required />
          <button
            ref={btnRef}
            type="submit"
            onClick={ripple}
            className="btn-primary self-start"
          >
            <span>Send to Kitchen →</span>
          </button>
        </form>
      </div>
    </section>
  );
}