'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16 py-5 bg-cream/85 backdrop-blur-xl border-b border-ink/8">
      <div className="text-2xl font-black tracking-[0.12em]">
        SHELF<span className="text-accent">™</span>
      </div>

      <ul className="hidden md:flex gap-10 list-none">
        {['Products', 'About', 'Contact'].map((l) => (
          <li key={l}>
            <Link
              href={`#${l.toLowerCase()}`}
              className="text-[0.85rem] tracking-[0.08em] uppercase text-ink-mid no-underline hover:text-accent transition-colors duration-200"
            >
              {l}
            </Link>
          </li>
        ))}
      </ul>

      <button className="bg-ink text-cream px-6 py-2.5 text-[0.8rem] font-bold tracking-[0.1em] uppercase border-none cursor-pointer transition-all duration-200 hover:bg-accent hover:-translate-y-px">
        Add to Cart
      </button>
    </nav>
  );
}
