export default function Ticker() {
  const items = ['Brand Strategy', 'Web Design', '3D Experiences', 'Motion Design', 'UX/UI', 'Digital Marketing'];
  const doubled = [...items, ...items];

  return (
    <div className="bg-ink text-cream py-3 overflow-hidden whitespace-nowrap">
      <div className="inline-flex gap-8 text-[0.8rem] tracking-[0.15em] uppercase animate-ticker-scroll">
        {doubled.map((item, i) => (
          <span key={i} className={i % 2 === 1 ? 'text-gold' : ''}>{item}</span>
        ))}
      </div>
    </div>
  );
}
