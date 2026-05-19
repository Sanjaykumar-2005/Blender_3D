export interface ProductConfig {
  name: string;
  color: number;
  labelColor: number;
  accentColor: number;
  shape: 'can' | 'box' | 'bottle' | 'tube';
  tag: string;
  desc: string;
  weight: string;
  price: string;
}

export const PRODUCTS: ProductConfig[] = [
  {
    name: 'Brand Strategy',
    color: 0xc8401a,
    labelColor: 0xf5f0e8,
    accentColor: 0x1a1612,
    shape: 'can',
    tag: 'Vol. 01',
    desc: 'A carefully blended mix of market research, positioning, and voice — aged to perfection.',
    weight: '500g net',
    price: 'From $4,800',
  },
  {
    name: 'Web Design',
    color: 0x1c2e4a,
    labelColor: 0xd4a843,
    accentColor: 0xf5f0e8,
    shape: 'box',
    tag: 'Vol. 02',
    desc: 'Pure, pixel-perfect interfaces distilled from years of user research and obsessive craft.',
    weight: '1kg net',
    price: 'From $7,200',
  },
  {
    name: '3D Experience',
    color: 0x2d5a27,
    labelColor: 0xf5f0e8,
    accentColor: 0xd4a843,
    shape: 'bottle',
    tag: 'Vol. 03',
    desc: 'Immersive, real-time 3D rendered with WebGL. Your brand, spinning beautifully on every screen.',
    weight: '750g net',
    price: 'From $9,500',
  },
  {
    name: 'Motion Design',
    color: 0x4a2d6e,
    labelColor: 0xf5f0e8,
    accentColor: 0xc8401a,
    shape: 'tube',
    tag: 'Vol. 04',
    desc: 'Frame-by-frame animations and micro-interactions blended into a smooth, 60fps experience.',
    weight: '250g net',
    price: 'From $3,600',
  },
];
