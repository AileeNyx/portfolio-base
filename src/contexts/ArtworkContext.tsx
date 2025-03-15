'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Interface pour les œuvres d'art
export interface Artwork {
  id: string;
  title: string;
  image: string;
  year: string;
  dimensions: string;
  description?: string;
  technique: string; // remplace medium et technique est maintenant requise
  available: boolean;
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
        title: 'Aphrodite',
        image: '/images/Aphrodite.jpg',
        year: '2023',
        dimensions: '60 x 80 cm',
        description: 'Une interprétation contemporaine de la déesse de l\'amour, captant l\'essence de la beauté et de la féminité.',
        technique: 'Peinture à l\'huile',
        available: true,
        featured: true
      },
      {
        id: '2',
        title: 'Entre Deux Eaux',
        image: '/images/entre-deux-eaux.jpg',
        year: '2022',
        dimensions: '50 x 70 cm',
        description: 'Un portrait évocateur explorant la dualité et l\'équilibre entre différents états d\'être.',
        technique: 'Acrylique',
        available: true
      },
      {
        id: '3',
        title: 'Le Théâtre Intérieur',
        image: '/images/Le-theatre-interieur.jpg',
        year: '2023',
        dimensions: '40 x 60 cm',
        description: 'Une exploration des paysages intérieurs de l\'esprit, représentés comme une scène théâtrale.',
        technique: 'Aquarelle',
        available: false,
        featured: true
      },
      {
        id: '4',
        title: 'Star Child',
        image: '/images/star-child.jpg',
        year: '2021',
        dimensions: '30 x 40 cm',
        description: 'Une vision onirique d\'un enfant né des étoiles, capturant l\'innocence et le mystère cosmique.',
        technique: 'Digital',
        available: true
      },
      {
        id: '5',
        title: 'Hera',
        image: '/images/Hera.jpg',
        year: '2022',
        dimensions: '70 x 90 cm',
        description: 'Un hommage à la reine des dieux, symbolisant la force, la fierté et la protection.',
        technique: 'Peinture à l\'huile',
        available: true
      },
      {
        id: '6',
        title: 'Double Je',
        image: '/images/double-je.jpg',
        year: '2021',
        dimensions: '45 x 55 cm',
        description: 'Une exploration de la dualité de l\'identité et des masques que nous portons en société.',
        technique: 'Acrylique',
        available: false
      },
      {
        id: '7',
        title: 'Fusion Cosmique',
        image: '/images/fusion-cosmique.jpg',
        year: '2023',
        dimensions: '65 x 85 cm',
        description: 'Une représentation abstraite de la fusion des énergies cosmiques, mêlant couleurs vibrantes et formes flottantes.',
        technique: 'Peinture à l\'huile',
        available: true,
        featured: true
      },
      {
        id: '8',
        title: 'Asmodeus',
        image: '/images/Asmodeus.jpg',
        year: '2022',
        dimensions: '55 x 75 cm',
        description: 'Une interprétation moderne d\'une figure mythologique, explorant les thèmes de tentation et de transformation.',
        technique: 'Digital',
        available: true
      },
      {
        id: '9',
        title: 'Dialogue Silencieux',
        image: '/images/Dialogue-Silencieux.jpg',
        year: '2023',
        dimensions: '60 x 80 cm',
        description: 'Un portrait captivant illustrant la communication non-verbale et les émotions silencieuses.',
        technique: 'Acrylique',
        available: false,
        featured: true
      },
      {
        id: '10',
        title: 'Les Marginaux de la Voie Lactée',
        image: '/images/Les-marginaux-de-la-voie-lactée.jpg',
        year: '2021',
        dimensions: '70 x 90 cm',
        description: 'Une œuvre surréaliste explorant le sentiment d\'aliénation et de marginalité à l\'échelle cosmique.',
        technique: 'Peinture à l\'huile',
        available: true
      },
      {
        id: '11',
        title: 'Misfit Genesis',
        image: '/images/Misfit-Genesis.jpg',
        year: '2022',
        dimensions: '50 x 70 cm',
        description: 'Une création expérimentale sur l\'origine et l\'évolution de ceux qui ne rentrent pas dans les moules conventionnels.',
        technique: 'Digital',
        available: true
      },
      {
        id: '12',
        title: 'Nine Lives Passed',
        image: '/images/Nine-lives-passed.jpg',
        year: '2023',
        dimensions: '40 x 60 cm',
        description: 'Une réflexion mystique sur le cycle de la vie et de la mort, inspirée par le concept des neuf vies du chat.',
        technique: 'Aquarelle',
        available: false
      },
      {
        id: '13',
        title: 'Prélèvement à la Source',
        image: '/images/Prelevement-a-la-source.jpg',
        year: '2021',
        dimensions: '55 x 75 cm',
        description: 'Une œuvre abstraite qui joue sur les notions de prélèvement, d\'origine et d\'authenticité.',
        technique: 'Acrylique',
        available: true,
        featured: true
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