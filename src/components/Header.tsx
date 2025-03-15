'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction pour faire défiler vers une section spécifique
  const scrollToSection = (id: string) => {
    // Si nous sommes déjà sur la page d'accueil
    if (pathname === '/') {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    } else {
      // Si nous sommes sur une autre page, rediriger vers la page d'accueil avec ancre
      router.push(`/#${id}`);
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'Œuvres', href: '#gallery', isAnchor: true },
    { name: 'À propos', href: '#about', isAnchor: true },
    { name: 'Contact', href: '/contact', isAnchor: false },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/30 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link href="/" className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-white">
            <span className="text-artist-accent">P</span>ortfolio <span className="text-artist-accent">@</span>Wonderful.Gemini
          </h1>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            link.isAnchor ? (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href.substring(1))}
                className="text-artist-text-light hover:text-artist-accent font-bold transition-colors duration-300 font-medium cursor-pointer"
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className="text-artist-text-light hover:text-artist-accent font-bold transition-colors duration-300 font-medium"
              >
                {link.name}
              </Link>
            )
          ))}
        </nav>

        {/* Bouton menu mobile */}
        <button
          className="md:hidden text-white z-10"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Menu mobile */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full h-screen bg-artist-overlay-dark backdrop-blur-lg flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navLinks.map((link) => (
              link.isAnchor ? (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href.substring(1))}
                  className="text-2xl text-artist-text-light hover:text-artist-accent font-bold transition-colors duration-300 font-serif"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-2xl text-artist-text-light hover:text-artist-accent font-bold transition-colors duration-300 font-serif"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              )
            ))}
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header; 