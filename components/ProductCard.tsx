'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ProductConfig } from '@/lib/products';
import { createRenderer, addLights, BUILDERS } from '@/lib/three-builders';

interface Props {
  cfg: ProductConfig;
  index: number;
  onAddToCart: () => void;
}

export default function ProductCard({ cfg, index, onAddToCart }: Props) {
  const mountRef  = useRef<HTMLDivElement>(null);
  const cardRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mount = mountRef.current!;
    const card  = cardRef.current!;

    const renderer = createRenderer();
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block;';
    mount.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.1, 3.2);
    camera.lookAt(0, 0, 0);

    addLights(scene, { amb: 0.4, key: 2.5, fill: 0.9, rim: 1.0 });

    const mesh = BUILDERS[cfg.shape](cfg);
    scene.add(mesh);

    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 6),
      new THREE.ShadowMaterial({ opacity: 0.12 })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -1.2;
    shadow.receiveShadow = true;
    scene.add(shadow);

    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(mount);

    let isHovered = false;
    let targetRotY = 0;

    const onEnter = () => {
      isHovered = true;
      gsap.to(mesh.rotation, { x: 0.08, duration: 0.5, ease: 'power2.out' });
      gsap.to(mesh.position, { y: 0.12, duration: 0.5, ease: 'power2.out' });
    };
    const onLeave = () => {
      isHovered = false;
      targetRotY = 0;
      gsap.to(mesh.rotation, { x: 0, duration: 0.6, ease: 'power2.out' });
      gsap.to(mesh.position, { y: 0, duration: 0.6, ease: 'power2.out' });
    };
    const onMove = (e: MouseEvent) => {
      if (!isHovered) return;
      const rect = card.getBoundingClientRect();
      targetRotY = ((e.clientX - rect.left) / rect.width - 0.5) * 2 * 0.6;
    };

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);
    card.addEventListener('mousemove',  onMove);

    // ScrollTrigger entrance
    gsap.fromTo(card,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: index * 0.15,
        scrollTrigger: { trigger: card, start: 'top 85%' },
      }
    );

    const clock = new THREE.Clock();
    let id: number;
    const animate = () => {
      id = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (isHovered) {
        mesh.rotation.y += (targetRotY - mesh.rotation.y) * 0.08;
      } else {
        mesh.rotation.y += 0.006;
        mesh.position.y = Math.sin(t * 0.8 + index) * 0.03;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(id);
      ro.disconnect();
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
      card.removeEventListener('mousemove',  onMove);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [cfg, index]);

  return (
    <div
      ref={cardRef}
      className="bg-cream border border-ink/10 flex flex-col cursor-pointer hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:z-10 transition-all duration-300 origin-bottom opacity-0"
    >
      {/* Three.js canvas */}
      <div ref={mountRef} className="w-full aspect-[3/4] bg-paper overflow-hidden" />

      {/* Label */}
      <div className="p-6 border-t-2 border-ink flex-1 flex flex-col">
        <p className="text-[0.65rem] tracking-[0.25em] uppercase text-ink-mid mb-2">{cfg.tag}</p>
        <h3 className="text-xl font-black mb-2.5 tracking-tight">{cfg.name}</h3>
        <p className="text-[0.82rem] text-ink-mid leading-relaxed flex-1 mb-4">{cfg.desc}</p>
        <div className="flex justify-between items-center mb-4 pt-3 border-t border-dashed border-ink/20">
          <span className="text-[0.7rem] text-ink-mid tracking-wide">{cfg.weight}</span>
          <span className="text-[0.9rem] font-black text-accent">{cfg.price}</span>
        </div>
        <button
          onClick={onAddToCart}
          className="w-full bg-ink text-cream py-3 text-[0.75rem] font-bold tracking-[0.1em] uppercase border-none cursor-pointer transition-colors duration-200 hover:bg-accent"
        >
          Add to Scope
        </button>
      </div>
    </div>
  );
}
