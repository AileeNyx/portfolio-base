'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    
    if (isLoggedIn !== 'true') {
      router.push('/admin');
    } else {
      setIsAuthorized(true);
    }
    
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Chargement...</div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
} 