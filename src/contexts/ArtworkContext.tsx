'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Interface pour les œuvres d'art
export interface Artwork {
  id: string;
  title: string;
  image: string;
  year: string;
  description?: string;
  technique: string; // remplace medium et technique est maintenant requise
  featured?: boolean;
}

interface ArtworkContextType {
  artworks: Artwork[];
  setArtworks: React.Dispatch<React.SetStateAction<Artwork[]>>;
  loading: boolean;
  addArtwork: (artwork: Omit<Artwork, 'id'>) => void;
  updateArtwork: (id: string, artwork: Partial<Artwork>) => void;
  deleteArtwork: (id: string) => void;
  refreshArtworks: () => void;
  lastUpdate: number;
}

const ArtworkContext = createContext<ArtworkContextType | undefined>(undefined);

export function ArtworkProvider({ children }: { children: React.ReactNode }) {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());

  // Fonction pour forcer l'actualisation des composants
  const refreshArtworks = () => {
    console.log("Actualisation forcée du contexte des œuvres");
    
    // Recharger les données explicitement depuis le localStorage
    try {
      const storedArtworks = localStorage.getItem('artworks');
      if (storedArtworks) {
        const freshArtworks = JSON.parse(storedArtworks);
        setArtworks(freshArtworks);
        console.log(`Rechargement réussi : ${freshArtworks.length} œuvres`);
      }
    } catch (error) {
      console.error("Erreur lors du rechargement des œuvres:", error);
    }
    
    // Mettre à jour le timestamp pour forcer l'actualisation des composants dépendants
    setLastUpdate(Date.now());
  };

  // Charger les œuvres d'art depuis le localStorage ou initialiser avec des valeurs par défaut
  useEffect(() => {
    const storedArtworks = localStorage.getItem('artworks');
    
    if (storedArtworks) {
      try {
        setArtworks(JSON.parse(storedArtworks));
      } catch (error) {
        console.error("Erreur lors du chargement des œuvres depuis localStorage:", error);
        // En cas d'erreur, utiliser les données initiales
        initializeDefaultArtworks();
      }
    } else {
      // Données initiales d'œuvres d'art
      initializeDefaultArtworks();
    }
    
    setLoading(false);
  }, []);

  // Fonction pour initialiser les œuvres par défaut
  const initializeDefaultArtworks = () => {
    const initialArtworks: Artwork[] = [
      {
        id: '1',
        title: 'The Innkeepers',
        image: '/images/TerrariaPFP.png',
        year: '2024',
        description: 'Slightly modernist painting based on two outfits from the game Terraria. A tribute to my girlfriend and I.',
        technique: 'Digital, Imitating Oil Paint',
        featured: true
      },
      {
        id: '2',
        title: 'Inscryption',
        image: '/images/Inscryption.png',
        year: '2023',
        description: 'Portrait of the four Magicks from the game Inscryption.',
        technique: 'Digital',
        featured: true
      },
      {
        id: '3',
        title: 'Spooky Critters',
        image: '/images/spookyGFs.png',
        year: '2023',
        description: 'Simplistic painting of a snake and a ferret dressed up for Halloween, inside a Jack-o-Lantern.',
        technique: 'Digital',
        featured: true
      },
      {
        id: '4',
        title: 'Jörn Khazad',
        image: '/images/Jorn-Khazad.png',
        year: '2024',
        description: 'Character portrait of a Harengon Original Character for a D&D campaign.',
        technique: 'Digital',
        featured: true
      },
      {
        id: '5',
        title: 'Brogan',
        image: '/images/Brogan.png',
        year: '2024',
        description: 'Character portrait of a Goliath Original Character for a D&D campaign.',
        technique: 'Digital'
      },
      {
        id: '6',
        title: 'O\'kkac',
        image: '/images/Okkac.png',
        year: '2024',
        description: 'Character portrait of an Aarakocra Original Character for a D&D campaign.',
        technique: 'Digital, Sketch'
      },
      {
        id: '7',
        title: 'Griff Hardsteel',
        image: '/images/Griff-Hardsteel.png',
        year: '2024',
        description: 'Character portrait of a Reborn Original Character for a D&D campaign.',
        technique: 'Digital'
      },
      {
        id: '8',
        title: 'Yellow Umbrella',
        image: '/images/Yellow-Umbrella.png',
        year: '2023',
        description: 'A digital portrait homenaging my girlfriend and I\'s first date.',
        technique: 'Digital'
      }
    ];
    
    setArtworks(initialArtworks);
    localStorage.setItem('artworks', JSON.stringify(initialArtworks));
  };

  // Sauvegarder les œuvres d'art dans le localStorage chaque fois qu'elles sont mises à jour
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('artworks', JSON.stringify(artworks));
    }
  }, [artworks, loading]);

  // Ajouter une nouvelle œuvre d'art
  const addArtwork = (artwork: Omit<Artwork, 'id'>) => {
    const newArtwork = {
      ...artwork,
      id: Date.now().toString()
    };
    
    setArtworks(prev => [...prev, newArtwork]);
    refreshArtworks();
  };

  // Mettre à jour une œuvre d'art existante
  const updateArtwork = (id: string, artwork: Partial<Artwork>) => {
    setArtworks(prev => {
      const updatedArtworks = prev.map(item => 
        item.id === id ? { ...item, ...artwork } : item
      );
      
      // Sauvegarde immédiate dans localStorage pour éviter des problèmes de synchronisation
      localStorage.setItem('artworks', JSON.stringify(updatedArtworks));
      
      return updatedArtworks;
    });
    
    // Forcer l'actualisation des composants qui utilisent ces données
    refreshArtworks();
  };

  // Supprimer une œuvre d'art
  const deleteArtwork = (id: string) => {
    setArtworks(prev => {
      const filtered = prev.filter(item => item.id !== id);
      localStorage.setItem('artworks', JSON.stringify(filtered));
      return filtered;
    });
    refreshArtworks();
  };

  return (
    <ArtworkContext.Provider value={{ 
      artworks, 
      setArtworks, 
      loading, 
      addArtwork, 
      updateArtwork, 
      deleteArtwork,
      refreshArtworks,
      lastUpdate
    }}>
      {children}
    </ArtworkContext.Provider>
  );
}

export function useArtworks() {
  const context = useContext(ArtworkContext);
  
  if (context === undefined) {
    throw new Error('useArtworks must be used within an ArtworkProvider');
  }
  
  return context;
} 