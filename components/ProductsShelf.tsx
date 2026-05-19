'use client';
import { useState } from 'react';
import { PRODUCTS } from '@/lib/products';
import ProductCard from './ProductCard';
import CartToast from './CartToast';

export default function ProductsShelf() {
  const [cartTrigger, setCartTrigger] = useState(0);

  return (
    <section id="products" className="py-24 px-4 md:px-16 bg-paper">
      <div className="text-center mb-16">
        <p className="section-tag">Our Services</p>
        <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">Pick your package.</h2>
        <p className="text-[1rem] text-ink-mid max-w-lg mx-auto">
          Every service is hand-crafted, small-batch, and made with intention. Hover a product to inspect.
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {PRODUCTS.map((cfg, i) => (
            <ProductCard
              key={cfg.name}
              cfg={cfg}
              index={i}
              onAddToCart={() => setCartTrigger((n) => n + 1)}
            />
          ))}
        </div>
        {/* Shelf rail */}
        <div className="absolute -bottom-3 -left-[2%] -right-[2%] h-3.5 rounded-sm bg-gradient-to-b from-[#b8a98a] to-[#8a7a62] shadow-xl z-10" />
      </div>

      <CartToast trigger={cartTrigger} />
    </section>
  );
}
