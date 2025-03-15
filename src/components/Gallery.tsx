'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useArtworks } from '@/contexts/ArtworkContext';

// Techniques disponibles
const techniques = ['All', 'Oil Paint', 'Sketch', 'Digital'];

const Gallery = () => {
  const { artworks, loading, lastUpdate } = useArtworks();
  const [selectedArtwork, setSelectedArtwork] = useState<any | null>(null);
  // État pour le mode plein écran de l'image
  const [fullscreenMode, setFullscreenMode] = useState(false);
  // État pour la technique sélectionnée
  const [selectedTechnique, setSelectedTechnique] = useState('All');
  // État local pour les œuvres filtrées
  const [filteredArtworks, setFilteredArtworks] = useState(artworks);

  // Fonction pour basculer le mode plein écran de l'image
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFullscreenMode(!fullscreenMode);
  };

  // Filtrer les œuvres par technique lorsque la technique sélectionnée change ou que les artworks sont mis à jour
  useEffect(() => {
    
    const newFilteredArtworks = selectedTechnique === 'All'
      ? artworks
      : artworks.filter(artwork => 
        artwork.technique && artwork.technique.toLowerCase().includes(selectedTechnique.toLowerCase())
      );
    
    setFilteredArtworks(newFilteredArtworks);
    
    // Afficher un journal des techniques disponibles pour le débogage
  }, [selectedTechnique, artworks, lastUpdate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-artist-accent"></div>
      </div>
    );
  }

  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Titre de la galerie */}
        <h2 className="text-4xl font-serif font-bold text-artist-text-light text-center mb-8">Gallery</h2>
        
        {/* Filtres par technique */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {techniques.map((technique) => (
            <button
              key={technique}
              onClick={() => setSelectedTechnique(technique)}
              className={`
                relative px-6 py-2.5 rounded-md text-sm md:text-base transition-all duration-300
                ${selectedTechnique === technique 
                  ? 'bg-gradient-to-r from-artist-accent/90 to-artist-accent text-white font-medium shadow-lg shadow-artist-accent/20 border border-artist-accent/50' 
                  : 'bg-black/20 backdrop-blur-sm text-white/90 hover:bg-black/30 hover:text-white border border-white/10 hover:border-white/30'}
                overflow-hidden group
              `}
            >
              {/* Effet de brillance subtil sur hover */}
              <span className={`
                absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent
                transition-transform duration-700 -translate-x-full group-hover:translate-x-full
              `}></span>
              
              {/* Point de couleur indicateur pour la technique sélectionnée */}
              {selectedTechnique === technique && (
                <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"></span>
              )}
              
              <span className="relative">
                {technique}
              </span>
            </button>
          ))}
        </div>

        {/* Grille d'œuvres */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          layout
        >
          <AnimatePresence>
            {filteredArtworks.map((artwork) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                layout
                className="relative group cursor-pointer"
                onClick={() => setSelectedArtwork(artwork)}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-md">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ5lw5wowAAAABJRU5ErkJggg=="
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-serif font-medium text-artist-text-light">{artwork.title}</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-artist-text-light/90 text-sm">{artwork.year} • {artwork.technique}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredArtworks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">Couldn't find any works using that technique.</p>
          </div>
        )}
      </div>

      {/* Modal pour afficher les détails de l'œuvre */}
      <AnimatePresence>
        {selectedArtwork && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center p-2 md:p-4" onClick={() => {
            setFullscreenMode(false);
            setSelectedArtwork(null);
          }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`${fullscreenMode ? 'max-w-[95vw] max-h-[95vh]' : 'max-w-7xl'} w-full h-full max-h-[95vh] flex flex-col md:flex-row overflow-hidden rounded-2xl border border-artist-accent/30 shadow-2xl shadow-artist-accent/20 bg-gradient-to-br from-black/80 via-black/70 to-[#111]/90 backdrop-blur-lg`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Conteneur de l'image avec effet subtil */}
              <div className={`relative ${fullscreenMode ? 'w-full h-full' : 'h-[50vh] md:h-auto md:w-3/5'} overflow-hidden transition-all duration-300 group`}>
                {/* Effet de grain sur l'image */}
                <div className="absolute inset-0 bg-[url('/images/ui/noise.svg')] opacity-[0.05] mix-blend-overlay pointer-events-none z-10"></div>
                
                {/* Effet de vignette sur l'image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none z-10"></div>
                
                {/* Boutons de contrôle avec effet de hover amélioré */}
                <div className="absolute top-4 right-4 z-20 flex space-x-3">
                  <button 
                    className="bg-black/40 hover:bg-artist-accent/90 p-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-artist-accent/30 border border-white/10 hover:border-artist-accent/50"
                    onClick={toggleFullscreen}
                    aria-label={fullscreenMode ? "Réduire l'image" : "Agrandir l'image"}
                  >
                    {fullscreenMode ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    )}
                  </button>
                  {!fullscreenMode && (
                    <button 
                      className="bg-black/40 hover:bg-red-500/90 p-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 border border-white/10 hover:border-red-500/50"
                      onClick={() => setSelectedArtwork(null)}
                      aria-label="Fermer"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  )}
                </div>
                
                <div className="h-full w-full relative cursor-zoom-in group-hover:scale-[1.02] transition-transform duration-700" onClick={!fullscreenMode ? toggleFullscreen : undefined}>
                  <Image
                    src={selectedArtwork.image}
                    alt={selectedArtwork.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                  />
                </div>
              </div>

              {/* Informations détaillées sur l'œuvre avec design amélioré */}
              {!fullscreenMode && (
                <div className="w-full md:w-2/5 p-6 md:p-10 flex flex-col overflow-y-auto">
                  {/* Titre avec design amélioré */}
                  <div className="mb-8 relative">
                    <h2 className="text-4xl font-serif font-bold text-white group-hover:text-artist-accent transition-colors mb-2 tracking-tight">{selectedArtwork.title}</h2>
                    <div className="h-1 w-16 bg-gradient-to-r from-artist-accent to-artist-accent/50 rounded-full"></div>
                    <p className="text-artist-accent mt-4 font-light text-lg">{selectedArtwork.year}</p>
                  </div>
                  
                  <div className="space-y-6 mb-8 pl-2 border-l-2 border-artist-accent/30">
                    <div className="transform hover:-translate-x-1 transition-transform duration-300">
                      <h3 className="text-white/70 text-sm uppercase tracking-wider mb-1">Technique</h3>
                      <p className="text-white text-lg font-light">{selectedArtwork.technique}</p>
                    </div>
                  </div>
                  
                  {selectedArtwork.description && (
                    <div className="mb-8 relative">
                      <h3 className="text-white/70 text-sm uppercase tracking-wider mb-2">Description</h3>
                      <p className="text-white/90 leading-relaxed text-base italic border-l border-artist-accent/30 pl-4">{selectedArtwork.description}</p>
                      {/* Élément décoratif */}
                      <div className="absolute -left-4 -top-4 w-16 h-16 border-t border-l border-artist-accent/20 rounded-tl-xl -z-10"></div>
                    </div>
                  )}
                  
                  <div className="mt-auto flex space-x-4">
                    
                    {selectedArtwork.featured && (
                      <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-artist-accent/30 to-artist-accent/20 text-artist-accent/90 rounded-full text-sm font-medium border border-artist-accent/30 shadow-sm shadow-artist-accent/10">
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                        </svg>
                        Featured Work
                      </span>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery; 