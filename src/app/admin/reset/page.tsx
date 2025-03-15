'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminGuard from '@/components/AdminGuard';

export default function ResetPage() {
  const [resetDone, setResetDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReset = () => {
    try {
      // Supprimer les données du localStorage
      localStorage.removeItem('artworks');
      setResetDone(true);
      setError(null);
    } catch (err) {
      setError('Une erreur est survenue lors de la réinitialisation.');
      console.error(err);
    }
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-black text-white">
        <header className="bg-black/40 backdrop-blur-md py-4 border-b border-white/10 sticky top-0 z-10">
          <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
            <h1 className="text-2xl font-serif font-bold">
              <span className="text-artist-accent">Réinitialisation</span> des données
            </h1>
            <div className="flex items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                Retour au tableau de bord
              </Link>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 md:px-6 py-16">
          <div className="max-w-2xl mx-auto bg-white/5 rounded-lg p-8 backdrop-blur-sm border border-white/10">
            <h2 className="text-2xl font-serif mb-6">Réinitialisation de la galerie</h2>
            
            <p className="mb-8 text-white/80">
              Cette action va supprimer toutes les œuvres actuelles et permettre à l'application de recharger les nouvelles œuvres depuis la source. Cette action est irréversible.
            </p>
            
            {resetDone ? (
              <div className="bg-green-500/20 text-green-300 p-4 rounded-md mb-6">
                Réinitialisation effectuée avec succès. Veuillez rafraîchir la page d'accueil pour voir les nouvelles œuvres.
              </div>
            ) : error ? (
              <div className="bg-red-500/20 text-red-300 p-4 rounded-md mb-6">
                {error}
              </div>
            ) : null}
            
            <div className="flex gap-4">
              <button
                onClick={handleReset}
                disabled={resetDone}
                className={`px-6 py-3 rounded-md ${resetDone 
                  ? 'bg-gray-500/50 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700 transition-colors'}`}
              >
                {resetDone ? 'Réinitialisation effectuée' : 'Réinitialiser la galerie'}
              </button>
              
              <Link
                href="/admin/dashboard"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
              >
                Annuler
              </Link>
            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
} 