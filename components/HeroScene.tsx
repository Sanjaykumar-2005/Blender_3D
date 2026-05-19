'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { PRODUCTS } from '@/lib/products';
import { createRenderer, addLights, BUILDERS } from '@/lib/three-builders';

const HERO_SLOTS = [
  { ...PRODUCTS[0], offsetX: -1.5, offsetY: -0.2 },
  { ...PRODUCTS[2], offsetX:  0.0, offsetY:  0.3 },
  { ...PRODUCTS[1], offsetX:  1.5, offsetY: -0.1 },
];

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;

    const renderer = createRenderer();
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block;';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.2, 5.5);

    addLights(scene, { amb: 0.5, key: 3, fill: 1, rim: 1.5 });

    const meshes = HERO_SLOTS.map((slot, i) => {
      const m = BUILDERS[slot.shape](slot);
      m.position.set(slot.offsetX, slot.offsetY - 3, 0);
      m.rotation.y = (i - 1) * 0.15;
      scene.add(m);
      return m;
    });

    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.ShadowMaterial({ opacity: 0.15 })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -1.3;
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

    // GSAP entrance drop
    meshes.forEach((m, i) => {
      gsap.to(m.position, {
        y: HERO_SLOTS[i].offsetY,
        duration: 1.2,
        ease: 'back.out(1.2)',
        delay: 0.3 + i * 0.15,
      });
    });

    let mouseX = 0, mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    const clock = new THREE.Clock();
    let id: number;
    const animate = () => {
      id = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      meshes.forEach((m, i) => {
        m.rotation.y = (i - 1) * 0.15 + Math.sin(t * 0.4 + i) * 0.12 + mouseX * 0.08;
        m.position.y = HERO_SLOTS[i].offsetY + Math.sin(t * 0.6 + i * 1.3) * 0.05;
      });

      camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.04;
      camera.position.y += (mouseY * -0.15 - camera.position.y + 0.2) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(id);
      ro.disconnect();
      window.removeEventListener('mousemove', onMouse);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
