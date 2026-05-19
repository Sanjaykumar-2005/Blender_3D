import type { Metadata } from 'next';
import './globals.css';
import Cursor from '@/components/Cursor';
import ScrollProgress from '@/components/ScrollProgress';

export const metadata: Metadata = {
  title: 'SHELF™ — Premium Agency',
  description: 'Hand-crafted digital products, beautifully packaged and ready to ship.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ScrollProgress />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
