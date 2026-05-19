'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS } from '@/lib/products';
import { createRenderer, addLights, BUILDERS } from '@/lib/three-builders';

const CLUSTER = [
  { ...PRODUCTS[3], offsetX: -0.8, offsetY: -0.3, scale: 0.7,  rotY: -0.4 },
  { ...PRODUCTS[0], offsetX:  0.6, offsetY:  0.1, scale: 0.8,  rotY:  0.3 },
  { ...PRODUCTS[2], offsetX:  0.0, offsetY:  0.4, scale: 0.75, rotY:  0.0 },
];

const STATS = [
  { value: '48+', label: 'Projects shipped' },
  { value: '12',  label: 'Countries reached' },
  { value: '100%', label: 'Client retention' },
];

export default function About() {
  const mountRef  = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs  = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mount = mountRef.current!;

    const renderer = createRenderer();
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block;';
    mount.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.5, 5);
    camera.lookAt(0, 0, 0);

    addLights(scene, { amb: 0.5, key: 2.8, fill: 1.2, rim: 0.8 });

    const meshes = CLUSTER.map((d) => {
      const m = BUILDERS[d.shape](d);
      m.position.set(d.offsetX, d.offsetY - 2, 0);
      m.rotation.y = d.rotY;
      m.scale.setScalar(d.scale);
      scene.add(m);
      return m;
    });

    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(mount);

    ScrollTrigger.create({
      trigger: sectionRef.current!,
      start: 'top 80%',
      onEnter: () => {
        meshes.forEach((m, i) => {
          gsap.to(m.position, {
            y: CLUSTER[i].offsetY,
            duration: 1.2,
            ease: 'back.out(1.2)',
            delay: i * 0.15,
          });
        });
      },
    });

    statRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: i * 0.15, scrollTrigger: { trigger: el, start: 'top 85%' } }
      );
    });

    const clock = new THREE.Clock();
    let id: number;
    const animate = () => {
      id = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      meshes.forEach((m, i) => {
        m.rotation.y = CLUSTER[i].rotY + t * 0.3;
        m.position.y = CLUSTER[i].offsetY + Math.sin(t * 0.5 + i * 1.2) * 0.06;
      });
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(id);
      ro.disconnect();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="section-tag">The Recipe</p>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-none mb-6">
            Small batch.<br />No fillers.
          </h2>
          <p className="text-[1rem] leading-loose text-ink-mid max-w-md mb-10">
            We are a boutique digital agency that believes every brand deserves premium packaging. We work with founders and CMOs who are done with bloated agencies and want a tight, talented team that ships fast and sweats the details.
          </p>
          <div className="flex gap-10 flex-wrap">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                ref={(el) => { if (el) statRefs.current[i] = el; }}
                className="opacity-0"
              >
                <span className="block text-4xl font-black text-accent leading-none mb-1">{s.value}</span>
                <p className="text-[0.75rem] tracking-[0.1em] uppercase text-ink-mid">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div ref={mountRef} className="h-[400px] lg:h-[500px]" />
      </div>
    </section>
  );
}
