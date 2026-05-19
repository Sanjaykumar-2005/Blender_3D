'use client';

export default function Ticker() {
  const items = ['Brand Strategy', 'Web Design', '3D Experiences', 'Motion Design', 'UX/UI', 'Digital Marketing'];
  const doubled = [...items, ...items];

  return (
    <div className="group bg-ink text-cream py-3 overflow-hidden whitespace-nowrap">
      <div className="inline-flex gap-8 text-[0.8rem] tracking-[0.15em] uppercase animate-ticker-scroll group-hover:[animation-play-state:paused]">
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`transition-colors duration-200 hover:text-accent ${i % 2 === 1 ? 'text-gold' : ''}`}
          >
            {item} <span className="text-cream/30 ml-8">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
