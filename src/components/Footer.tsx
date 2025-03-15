'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/40 backdrop-blur-md text-white py-8 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            © {currentYear} Portfolio @Wonderful.Gemini. Tous droits réservés.
          </p>
          <div className="flex space-x-6 text-sm text-white/60">
            <Link href="/mentions-legales" className="hover:text-artist-accent transition-colors duration-300">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-artist-accent transition-colors duration-300">
              Politique de confidentialité
            </Link>
            <Link href="/admin" className="opacity-80 hover:opacity-100 hover:text-artist-accent transition-all duration-300">
              Administration
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 