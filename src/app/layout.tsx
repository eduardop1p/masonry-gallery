import './globals.css';
import type { Metadata } from 'next';

import StyledComponentsRegistry from '@/lib/registry';

export const metadata: Metadata = {
  title: 'Masonry Gallery',
  description: 'Galeria feita com nextjs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
