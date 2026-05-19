'use client';
import { useEffect, useState } from 'react';

export default function CartToast({ trigger }: { trigger: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger === 0) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(t);
  }, [trigger]);

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 bg-ink text-cream px-6 py-4 text-[0.85rem] font-bold tracking-[0.05em] border-l-4 border-accent transition-transform duration-300 ${
        visible ? 'translate-x-0' : 'translate-x-[200%]'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)' }}
    >
      🛒 Added to scope!
    </div>
  );
}
