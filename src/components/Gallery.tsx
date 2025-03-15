'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useArtworks } from '@/contexts/ArtworkContext';

// Techniques disponibles
const techniques = ['Tous', 'Peinture à l\'huile', 'Acrylique', 'Aquarelle', 'Digital'];

const Gallery = () => {
  const { artworks, loading, lastUpdate } = useArtworks();
  const [selectedArtwork, setSelectedArtwork] = useState<any | null>(null);
  // État pour le mode plein écran de l'image
  const [fullscreenMode, setFullscreenMode] = useState(false);
  // État pour la technique sélectionnée
  const [selectedTechnique, setSelectedTechnique] = useState('Tous');
  // État local pour les œuvres filtrées
  const [filteredArtworks, setFilteredArtworks] = useState(artworks);

  // Fonction pour basculer le mode plein écran de l'image
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFullscreenMode(!fullscreenMode);
  };

  // Filtrer les œuvres par technique lorsque la technique sélectionnée change ou que les artworks sont mis à jour
  useEffect(() => {
    console.log("Gallery: Mise à jour des œuvres filtrées, timestamp:", lastUpdate);
    
    const newFilteredArtworks = selectedTechnique === 'Tous'
      ? artworks
      : artworks.filter(artwork => artwork.technique === selectedTechnique);
    
    setFilteredArtworks(newFilteredArtworks);
    
    // Afficher un journal des techniques disponibles pour le débogage
    console.log("Techniques disponibles dans les œuvres:", 
      [...new Set(artworks.map(artwork => artwork.technique))].join(", "),
      "- Nombre d'œuvres par technique:", 
      techniques.map(tech => 
        tech === 'Tous' 
          ? { technique: tech, count: artworks.length } 
          : { technique: tech, count: artworks.filter(a => a.technique === tech).length }
      )
    );
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
        <h2 className="text-4xl font-serif font-bold text-artist-text-light text-center mb-8">Galerie d'œuvres</h2>
        
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
                  {/* Sticker "VENDU" pour les œuvres non disponibles */}
                  {!artwork.available && (
                    <div className="absolute -right-[46px] top-[32px] z-10 rotate-45 transform origin-center w-[200px] overflow-hidden">
                      {/* Ruban principal */}
                      <div className="relative py-2 bg-gradient-to-r from-red-700/95 via-red-600/95 to-red-700/95 shadow-lg shadow-red-900/30 border-t border-b border-red-400/30">
                        {/* Texture */}
                        <div className="absolute inset-0 bg-[url('/images/ui/noise.svg')] opacity-10 mix-blend-overlay"></div>
                        
                        {/* Reflet brillant */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-1/2"></div>
                        
                        {/* Effet de brillance animé */}
                        <div className="absolute inset-0 overflow-hidden">
                          <div className="absolute inset-y-0 w-1/5 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[20deg] -translate-x-full animate-[ribbonShine_3s_ease-in-out_infinite_alternate_1s]"></div>
                        </div>
                        
                        {/* Coins du ruban */}
                        <div className="absolute -left-3 -bottom-[14px] w-3 h-14 bg-red-800/90 transform skew-y-[45deg] origin-top-right shadow-md"></div>
                        <div className="absolute -right-3 -bottom-[14px] w-3 h-14 bg-red-800/90 transform skew-y-[-45deg] origin-top-left shadow-md"></div>
                        
                        {/* Texte */}
                        <span className="relative flex justify-center items-center gap-1.5 font-serif font-bold text-white text-sm uppercase tracking-[0.2em]">
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                          </svg>
                          Vendu
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-artist-overlay-dark via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-lg font-serif font-medium text-white">{artwork.title}</h3>
                    <p className="text-white/80 text-sm">{artwork.year} • {artwork.technique}</p>
                  </div>
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
            <p className="text-gray-400">Aucune œuvre trouvée dans cette technique</p>
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
                
                {/* Sticker "VENDU" pour l'œuvre non disponible dans le modal */}
                {!selectedArtwork.available && !fullscreenMode && (
                  <div className="absolute left-8 top-8 z-20">
                    <div className="relative px-5 py-2.5 bg-gradient-to-r from-red-700/95 via-red-600/95 to-red-700/95 rounded-md shadow-lg shadow-red-900/30 border border-red-400/40 transform hover:scale-105 transition-transform duration-300">
                      {/* Texture */}
                      <div className="absolute inset-0 bg-[url('/images/ui/noise.svg')] opacity-10 mix-blend-overlay rounded-md"></div>
                      
                      {/* Effet de brillance animé */}
                      <div className="absolute inset-0 overflow-hidden rounded-md">
                        <div className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[20deg] -translate-x-full animate-[ribbonShine_3s_ease-in-out_infinite_alternate_1s]"></div>
                      </div>
                      
                      {/* Texte */}
                      <span className="relative flex items-center gap-2 font-serif font-bold text-white text-sm uppercase tracking-wider">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Vendu
                      </span>
                    </div>
                  </div>
                )}
                
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
                    
                    <div className="transform hover:-translate-x-1 transition-transform duration-300">
                      <h3 className="text-white/70 text-sm uppercase tracking-wider mb-1">Dimensions</h3>
                      <p className="text-white text-lg font-light">{selectedArtwork.dimensions}</p>
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
                    {selectedArtwork.available && (
                      <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600/30 to-green-500/20 text-green-200 rounded-full text-sm font-medium border border-green-500/30 shadow-sm shadow-green-500/10">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                        Disponible
                      </span>
                    )}
                    {!selectedArtwork.available && (
                      <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-700/30 via-red-600/25 to-red-700/30 text-red-200 rounded-full text-sm font-medium border border-red-500/30 shadow-sm shadow-red-500/10">
                        {/* Indicateur de statut animé */}
                        <span className="relative mr-2 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-40"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-400"></span>
                        </span>
                        Vendu
                      </span>
                    )}
                    {selectedArtwork.featured && (
                      <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-artist-accent/30 to-artist-accent/20 text-artist-accent/90 rounded-full text-sm font-medium border border-artist-accent/30 shadow-sm shadow-artist-accent/10">
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                        </svg>
                        Œuvre mise en avant
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