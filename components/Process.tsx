'use client';
import { useEffect, useRef } from 'react';

const STEPS = [
  { n: '01', title: 'Ingredients Check', desc: 'We audit your current brand, competitors, and goals — understanding what\'s already in the pantry.' },
  { n: '02', title: 'Recipe Design',     desc: 'Strategy, information architecture, wireframes. The full recipe before we start cooking.' },
  { n: '03', title: 'Craft & Bake',      desc: 'Design, development, 3D modelling, motion. Every detail is obsessed over until it\'s shelf-ready.' },
  { n: '04', title: 'Ship & Iterate',    desc: 'Launch, measure, refine. We don\'t disappear after delivery — we stay on the shelf with you.' },
];

export default function Process() {
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    let gsap: typeof import('gsap').gsap;
    let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;

    import('gsap').then((g) => {
      gsap = g.gsap;
      return import('gsap/ScrollTrigger');
    }).then((st) => {
      ScrollTrigger = st.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      stepsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.7,
            ease: 'power2.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        );
      });
    });
  }, []);

  return (
    <section className="bg-ink text-cream py-24 px-16 text-center">
      <p className="inline-block text-[0.7rem] tracking-[0.25em] uppercase text-gold border border-gold px-3 py-1 mb-5">
        How It Works
      </p>
      <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-16">From brief to shelf.</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {STEPS.map((s, i) => (
          <div
            key={s.n}
            ref={(el) => { if (el) stepsRef.current[i] = el; }}
            className="p-8 border border-cream/10 text-left hover:border-gold hover:bg-gold/5 transition-all duration-300"
          >
            <span className="block text-4xl font-black text-gold/40 mb-4">{s.n}</span>
            <h4 className="text-[1rem] font-bold mb-3">{s.title}</h4>
            <p className="text-[0.85rem] leading-7 text-cream/60">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
