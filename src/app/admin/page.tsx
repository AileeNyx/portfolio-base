'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Vérifier si déjà connecté
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple vérification des identifiants
    if (username === 'admin' && password === 'admin') {
      // Enregistrer l'état de connexion
      localStorage.setItem('adminLoggedIn', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Identifiants incorrects');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-white mb-2">
            <span className="text-artist-accent">Accès</span> Administration
          </h1>
          <p className="text-white/70">Connectez-vous pour gérer vos œuvres</p>
        </div>

        {error && (
          <div className="bg-red-500/20 text-red-200 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white/80 mb-2">
              Nom d'utilisateur
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-artist-accent/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-artist-accent/30"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-artist-accent/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-artist-accent/30"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors ${
              isLoading
                ? 'bg-artist-accent/50 cursor-not-allowed'
                : 'bg-artist-accent hover:bg-artist-accent/80'
            }`}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-white/60 hover:text-artist-accent text-sm">
            Retour au site
          </Link>
        </div>
      </div>
    </div>
  );
} 