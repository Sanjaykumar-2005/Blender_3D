export default function Footer() {
  return (
    <footer className="bg-ink text-cream px-16 py-12">
      <div className="flex justify-between items-center pb-6 border-b border-cream/10 mb-6">
        <div className="text-3xl font-black tracking-[0.12em]">
          SHELF<span className="text-accent">™</span>
        </div>
        <p className="text-[0.85rem] text-cream/50">Premium digital agency. Hand-crafted since 2024.</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-[0.8rem] text-cream/40">© 2025 SHELF Agency. All rights reserved.</p>
        <div className="flex gap-6">
          {['Privacy', 'Terms', 'Instagram'].map((l) => (
            <a key={l} href="#" className="text-[0.8rem] text-cream/40 no-underline hover:text-cream transition-colors">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
