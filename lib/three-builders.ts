import * as THREE from 'three';
import type { ProductConfig } from './products';

export function hexToRgb(hex: number): string {
  return `${(hex >> 16) & 0xff},${(hex >> 8) & 0xff},${hex & 0xff}`;
}

function hexStr(n: number) {
  return `#${n.toString(16).padStart(6, '0')}`;
}

export function createRenderer(canvas?: HTMLCanvasElement): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  return renderer;
}

export function addLights(
  scene: THREE.Scene,
  cfg: { amb?: number; key?: number; fill?: number; rim?: number } = {}
) {
  scene.add(new THREE.AmbientLight(0xfff5e4, cfg.amb ?? 0.4));

  const key = new THREE.DirectionalLight(0xffffff, cfg.key ?? 2.5);
  key.position.set(3, 5, 4);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xd4e8ff, cfg.fill ?? 0.8);
  fill.position.set(-3, 2, -2);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(0xffd4aa, cfg.rim ?? 1.2);
  rim.position.set(0, -3, -4);
  scene.add(rim);
}

export function buildCan(cfg: ProductConfig): THREE.Group {
  const group = new THREE.Group();
  const r = 0.42, h = 1.5;

  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(r, r, h, 64),
    new THREE.MeshStandardMaterial({ color: cfg.color, metalness: 0.7, roughness: 0.25 })
  );
  body.castShadow = true;
  group.add(body);

  const canvas = document.createElement('canvas');
  canvas.width = 1024; canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = hexStr(cfg.labelColor);
  ctx.fillRect(0, 0, 1024, 512);
  ctx.fillStyle = hexStr(cfg.color);
  ctx.fillRect(0, 0, 1024, 80);
  ctx.fillRect(0, 432, 1024, 80);
  ctx.fillStyle = hexStr(cfg.accentColor);
  ctx.font = 'bold 110px Helvetica Neue, Helvetica, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SHELF', 512, 270);
  ctx.font = '40px Helvetica Neue';
  ctx.fillStyle = `rgba(${hexToRgb(cfg.accentColor)},0.7)`;
  ctx.fillText(cfg.name.toUpperCase(), 512, 340);
  ctx.fillStyle = `rgba(${hexToRgb(cfg.accentColor)},0.15)`;
  for (let i = 0; i < 20; i++) ctx.fillRect(400 + i * 12, 370, i % 3 === 0 ? 8 : 5, 28);

  const labelMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(r + 0.002, r + 0.002, h * 0.75, 64, 1, true),
    new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(canvas), roughness: 0.5, side: THREE.FrontSide })
  );
  group.add(labelMesh);

  const lidMat = new THREE.MeshStandardMaterial({ color: cfg.accentColor, metalness: 0.6, roughness: 0.3 });
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.88, r, 0.08, 32), lidMat);
  lid.position.y = h / 2 + 0.04;
  group.add(lid);

  const rim = new THREE.Mesh(new THREE.TorusGeometry(r, 0.025, 8, 64), lidMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = h / 2;
  group.add(rim);

  return group;
}

export function buildBox(cfg: ProductConfig): THREE.Group {
  const group = new THREE.Group();
  const w = 0.75, h = 1.8, d = 0.38;

  function makeTexture(main: boolean) {
    const c = document.createElement('canvas');
    c.width = 512; c.height = 768;
    const cx = c.getContext('2d')!;
    cx.fillStyle = main ? hexStr(cfg.color) : hexStr(cfg.accentColor);
    cx.fillRect(0, 0, 512, 768);
    if (main) {
      cx.fillStyle = hexStr(cfg.labelColor);
      cx.fillRect(24, 80, 464, 180);
      cx.fillStyle = hexStr(cfg.color);
      cx.font = 'bold 90px Helvetica Neue, Helvetica, Arial, sans-serif';
      cx.textAlign = 'center';
      cx.fillText('SHELF', 256, 205);
      cx.fillStyle = `rgba(${hexToRgb(cfg.labelColor)},0.9)`;
      cx.font = 'bold 38px Helvetica Neue';
      cx.fillText(cfg.name.toUpperCase(), 256, 310);
      cx.font = '22px Helvetica Neue';
      cx.fillStyle = `rgba(${hexToRgb(cfg.labelColor)},0.5)`;
      cx.fillText('Premium Agency Service', 256, 360);
      for (let i = 0; i < 8; i++) {
        cx.fillStyle = `rgba(${hexToRgb(cfg.labelColor)},${0.03 + i * 0.005})`;
        cx.fillRect(0, 650 - i * 20, 512, 12);
      }
    }
    return new THREE.CanvasTexture(c);
  }

  const faceTex = makeTexture(true);
  const sideTex = makeTexture(false);
  const mat = (tex: THREE.CanvasTexture) => new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6 });

  const box = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), [
    mat(sideTex), mat(sideTex),
    new THREE.MeshStandardMaterial({ color: cfg.accentColor, roughness: 0.5 }),
    new THREE.MeshStandardMaterial({ color: cfg.accentColor, roughness: 0.5 }),
    mat(faceTex), mat(sideTex),
  ]);
  box.castShadow = true;
  group.add(box);
  return group;
}

export function buildBottle(cfg: ProductConfig): THREE.Group {
  const group = new THREE.Group();

  const pts = [
    new THREE.Vector2(0.0, -0.9),
    new THREE.Vector2(0.42, -0.8),
    new THREE.Vector2(0.48, -0.3),
    new THREE.Vector2(0.46, 0.1),
    new THREE.Vector2(0.35, 0.55),
    new THREE.Vector2(0.22, 0.7),
    new THREE.Vector2(0.18, 0.8),
    new THREE.Vector2(0.16, 0.9),
  ];

  const body = new THREE.Mesh(
    new THREE.LatheGeometry(pts, 64),
    new THREE.MeshPhysicalMaterial({
      color: cfg.color,
      roughness: 0.15,
      metalness: 0.0,
      transmission: 0.3,
      thickness: 0.4,
      ior: 1.45,
    })
  );
  body.castShadow = true;
  group.add(body);

  const c = document.createElement('canvas');
  c.width = 1024; c.height = 512;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = hexStr(cfg.labelColor);
  ctx.fillRect(0, 0, 1024, 512);
  ctx.fillStyle = hexStr(cfg.color);
  ctx.fillRect(0, 0, 1024, 60);
  ctx.fillRect(0, 452, 1024, 60);
  ctx.fillStyle = hexStr(cfg.accentColor);
  ctx.font = 'bold 100px Helvetica Neue';
  ctx.textAlign = 'center';
  ctx.fillText('SHELF', 512, 230);
  ctx.font = '38px Helvetica Neue';
  ctx.fillStyle = `rgba(${hexToRgb(cfg.accentColor)},0.7)`;
  ctx.fillText(cfg.name.toUpperCase(), 512, 300);

  const label = new THREE.Mesh(
    new THREE.CylinderGeometry(0.485, 0.485, 0.72, 64, 1, true),
    new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(c), roughness: 0.5, side: THREE.FrontSide })
  );
  label.position.y = -0.1;
  group.add(label);

  const cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.16, 0.18, 32),
    new THREE.MeshStandardMaterial({ color: cfg.accentColor, metalness: 0.5, roughness: 0.3 })
  );
  cap.position.y = 1.0;
  group.add(cap);

  return group;
}

export function buildTube(cfg: ProductConfig): THREE.Group {
  const group = new THREE.Group();
  const r = 0.28, h = 2.0;

  const c = document.createElement('canvas');
  c.width = 1024; c.height = 512;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = hexStr(cfg.labelColor);
  ctx.fillRect(0, 0, 1024, 512);

  ctx.save();
  ctx.translate(512, 256);
  ctx.rotate(Math.PI / 6);
  ctx.fillStyle = `rgba(${hexToRgb(cfg.color)},0.08)`;
  for (let i = -4; i < 5; i++) ctx.fillRect(-600, i * 120, 1200, 60);
  ctx.restore();

  ctx.fillStyle = hexStr(cfg.color);
  ctx.fillRect(0, 0, 1024, 80);
  ctx.fillRect(0, 432, 1024, 80);
  ctx.fillStyle = hexStr(cfg.accentColor);
  ctx.font = 'bold 100px Helvetica Neue';
  ctx.textAlign = 'center';
  ctx.fillText('SHELF', 512, 250);
  ctx.font = '38px Helvetica Neue';
  ctx.fillStyle = `rgba(${hexToRgb(cfg.accentColor)},0.7)`;
  ctx.fillText(cfg.name.toUpperCase(), 512, 310);

  const tex = new THREE.CanvasTexture(c);
  const outer = new THREE.Mesh(
    new THREE.CylinderGeometry(r, r, h, 64),
    new THREE.MeshStandardMaterial({ color: cfg.color, roughness: 0.35, metalness: 0.1 })
  );
  outer.castShadow = true;
  group.add(outer);

  group.add(new THREE.Mesh(
    new THREE.CylinderGeometry(r, r, h, 64, 1, true),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.45, side: THREE.FrontSide })
  ));

  const topCap = new THREE.Mesh(
    new THREE.CylinderGeometry(r * 0.7, r, 0.15, 32),
    new THREE.MeshStandardMaterial({ color: cfg.accentColor, metalness: 0.6, roughness: 0.25 })
  );
  topCap.position.y = h / 2 + 0.07;
  group.add(topCap);

  return group;
}

export const BUILDERS: Record<ProductConfig['shape'], (cfg: ProductConfig) => THREE.Group> = {
  can: buildCan,
  box: buildBox,
  bottle: buildBottle,
  tube: buildTube,
};
