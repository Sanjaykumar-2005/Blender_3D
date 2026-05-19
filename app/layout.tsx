import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SHELF™ — Premium Agency',
  description: 'Hand-crafted digital products, beautifully packaged and ready to ship.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
