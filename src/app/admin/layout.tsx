'use client';

import { ReactNode } from 'react';
import { ArtworkProvider } from '@/contexts/ArtworkContext';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ArtworkProvider>
      {children}
    </ArtworkProvider>
  );
} 