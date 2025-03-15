'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useArtworks } from '@/contexts/ArtworkContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageSlideshowProps {
  interval?: number;
  className?: string;
  includeSelfPortrait?: boolean;
  showControls?: boolean;
}

export function ImageSlideshow({ 
  interval = 5000, 
  className = '',
  includeSelfPortrait = false,
  showControls = true
}: ImageSlideshowProps) {
  const { artworks, lastUpdate } = useArtworks();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Préparation des images au chargement
  useEffect(() => {
    console.log("Rechargement des images du slider, timestamp:", lastUpdate);
    if (artworks.length > 0) {
      setIsLoading(true);
      
      try {
        // Filtrer uniquement les images des œuvres mises en avant
        let featuredArtworks = artworks.filter(artwork => artwork.featured);
        
        console.log(`Slider: ${featuredArtworks.length} œuvres mises en avant trouvées sur ${artworks.length} œuvres total`);
        
        // Si aucune œuvre n'est mise en avant, montrer toutes les œuvres
        if (featuredArtworks.length === 0) {
          console.warn("Aucune œuvre n'est mise en avant. Affichage de toutes les œuvres.");
          featuredArtworks = artworks;
        }
        
        let artworkImages = featuredArtworks.map(artwork => artwork.image);
        
        // Mélanger les images pour un affichage aléatoire
        const shuffledImages = [...artworkImages]
          .sort(() => Math.random() - 0.5);
        
        setImages(shuffledImages);
        setCurrentIndex(0); // Réinitialiser à la première image
      } catch (error) {
        console.warn('Problème lors de la préparation des images:', error);
        setError('Impossible de charger les images');
      } finally {
        setIsLoading(false);
      }
    }
  }, [artworks, includeSelfPortrait, lastUpdate]);

  // Navigation des images
  const goToNext = useCallback(() => {
    if (images.length <= 1) return;
    
    setCurrentIndex(prevIndex => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    if (images.length <= 1) return;
    
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);
  
  // Fonction pour supprimer une image du carousel si elle ne charge pas
  const handleImageError = useCallback((index: number) => {
    try {
      console.warn(`Image à l'index ${index} non disponible, suppression du slider`);
      
      setImages(prevImages => {
        if (prevImages.length <= 1) {
          setError('Aucune image valide disponible');
          return prevImages;
        }
        
        const newImages = [...prevImages];
        newImages.splice(index, 1);
        
        if (newImages.length === 0) {
          setError('Aucune image valide disponible');
        }
        
        return newImages;
      });
      
      if (currentIndex >= images.length - 1) {
        setCurrentIndex(0);
      }
    } catch (err) {
      // Capture silencieuse des erreurs pour éviter les erreurs dans la console
    }
  }, [currentIndex, images.length]);

  // Gestion des touches du clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToNext, goToPrevious]);

  // Changement automatique d'image
  useEffect(() => {
    if (images.length <= 1 || isPaused) return;
    
    const timer = setInterval(() => {
      goToNext();
    }, interval);
    
    return () => clearInterval(timer);
  }, [images.length, interval, isPaused, goToNext]);

  if (isLoading) {
    return (
      <div className={`relative h-[600px] w-full overflow-hidden rounded-lg shadow-2xl ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Chargement...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || images.length === 0) {
    return (
      <div className={`relative h-[600px] w-full overflow-hidden rounded-lg shadow-2xl ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <p>{error || "Aucune image disponible"}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative h-[600px] w-full overflow-hidden rounded-lg shadow-2xl ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2 }}
          className="relative w-full h-full"
        >
          <Image 
            src={images[currentIndex]}
            alt={`Œuvre de AileeNyx ${currentIndex + 1}`}
            fill
            priority={currentIndex === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
            loading={currentIndex === 0 ? "eager" : "lazy"}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ5lw5wowAAAABJRU5ErkJggg=="
            onError={() => {
              try {
                handleImageError(currentIndex);
              } catch (err) {
                // Capture silencieuse
              }
            }}
          />
          
          {/* Overlay teinté pour améliorer la lisibilité des contrôles */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 transition-opacity duration-300"></div>
        </motion.div>
      </AnimatePresence>
      
      {/* Titre de l'œuvre */}
      {/* <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute bottom-12 left-6 right-6 z-20"
      >
        <h3 className="text-white text-xl font-serif mb-2">
          {currentIndex === 0 && includeSelfPortrait 
            ? "Portrait de l'artiste" 
            : artworks[Math.max(0, currentIndex - (includeSelfPortrait ? 1 : 0))]?.title || "Œuvre sans titre"}
        </h3>
      </motion.div> */}
      
      {/* Indicateurs de navigation (petits points) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
            aria-label={`Voir l'image ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Boutons de navigation (précédent/suivant) */}
      {showControls && images.length > 1 && (
        <>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered || isPaused ? 0.9 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Image précédente"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered || isPaused ? 0.9 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Image suivante"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
          
          {/* Bouton pause/play */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered || isPaused ? 0.9 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsPaused(prev => !prev)}
            className="absolute bottom-4 right-4 z-20 bg-black/30 hover:bg-black/60 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={isPaused ? "Démarrer le diaporama" : "Mettre en pause le diaporama"}
          >
            {isPaused ? (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            )}
          </motion.button>
        </>
      )}
    </div>
  );
} 