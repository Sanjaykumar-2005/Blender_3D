'use client';
import { useEffect, useRef } from 'react';

export default function Contact() {
  const innerRef = useRef<HTMLDivElement>(null);

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
    });
  }, []);

  return (
    <section id="contact" className="py-24 px-16 bg-paper">
      <div ref={innerRef} className="max-w-2xl mx-auto">
        <p className="section-tag">Get a Quote</p>
        <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-3">Fill your cart.</h2>
        <p className="text-[1rem] text-ink-mid mb-10">Tell us what you need. We'll build you a custom package.</p>
        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="bg-cream border border-ink/20 px-5 py-4 text-[0.9rem] text-ink outline-none focus:border-accent transition-colors font-sans"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="bg-cream border border-ink/20 px-5 py-4 text-[0.9rem] text-ink outline-none focus:border-accent transition-colors font-sans"
            />
          </div>
          <textarea
            placeholder="Describe your project..."
            rows={4}
            required
            className="bg-cream border border-ink/20 px-5 py-4 text-[0.9rem] text-ink outline-none focus:border-accent transition-colors resize-y font-sans"
          />
          <button type="submit" className="btn-primary self-start">
            Send to Kitchen →
          </button>
        </form>
      </div>
    </section>
  );
}
