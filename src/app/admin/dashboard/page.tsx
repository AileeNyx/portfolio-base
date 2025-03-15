'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AdminGuard from '@/components/AdminGuard';
import { useArtworks } from '@/contexts/ArtworkContext';
import { Artwork } from '@/types/artwork';

// Techniques disponibles
const techniques = ['Peinture à l\'huile', 'Acrylique', 'Aquarelle', 'Digital'];

export default function Dashboard() {
  const router = useRouter();
  const { artworks, addArtwork, updateArtwork, deleteArtwork, loading, setArtworks, refreshArtworks } = useArtworks();
  
  // État pour le formulaire d'ajout d'œuvre
  const [formData, setFormData] = useState({
    title: '',
    year: new Date().getFullYear().toString(),
    technique: 'Peinture à l\'huile',
    image: '',
    description: '',
    featured: false
  });
  
  // État pour les erreurs de validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // État pour l'édition d'une œuvre
  const [editMode, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<string | null>(null);
  
  const [expandedArtwork, setExpandedArtwork] = useState<string | null>(null);
  
  // État pour les artworks triés
  const [sortBy, setSortBy] = useState<string>('featured');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Gérer les changements dans le formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Effacer l'erreur pour ce champ
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Valider le formulaire
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    }
    
    if (!formData.year.trim()) {
      newErrors.year = 'L\'année est requise';
    } else if (!/^\d{4}$/.test(formData.year)) {
      newErrors.year = 'L\'année doit être au format YYYY';
    }
    
    if (!formData.image.trim()) {
      newErrors.image = 'L\'URL de l\'image est requise';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Soumettre le formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (editMode && currentEditId) {
      // Mettre à jour une œuvre existante
      updateArtwork(currentEditId, {
        ...formData
      });
      
      // Réinitialiser le mode d'édition
      setEditMode(false);
      setCurrentEditId(null);
    } else {
      // Ajouter une nouvelle œuvre
      addArtwork({
        ...formData
      });
    }
    
    // Réinitialiser le formulaire
    setFormData({
      title: '',
      year: new Date().getFullYear().toString(),
      technique: 'Peinture à l\'huile',
      image: '',
      description: '',
      featured: false
    });
  };
  
  // Éditer une œuvre
  const handleEdit = (id: string) => {
    const artwork = artworks.find(a => a.id === id);
    
    if (artwork) {
      setFormData({
        title: artwork.title,
        year: artwork.year,
        technique: artwork.technique,
        image: artwork.image,
        description: artwork.description || '',
        featured: artwork.featured || false
      });
      
      setEditMode(true);
      setCurrentEditId(id);
      
      // Faire défiler jusqu'au formulaire
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Modifier rapidement la technique d'une œuvre
  const handleTechniqueChange = (id: string, technique: string) => {
    // Sauvegarde de l'ancienne valeur pour déboguer
    const oldArtwork = artworks.find(a => a.id === id);
    const oldTechnique = oldArtwork?.technique;
    
    // Mise à jour de l'œuvre avec la nouvelle technique
    updateArtwork(id, { technique });
    
    // Vérification que la mise à jour a bien été prise en compte
    setTimeout(() => {
      const updatedArtwork = artworks.find(a => a.id === id);
      
      if (updatedArtwork?.technique !== technique) {
        console.warn(`La technique n'a pas été correctement mise à jour: ${oldTechnique} -> ${technique}, actuel: ${updatedArtwork?.technique}`);
        
        // Force la mise à jour manuellement
        const updatedArtworks = artworks.map(a => 
          a.id === id ? { ...a, technique } : a
        );
        
        // Mettre à jour l'état des œuvres directement
        setArtworks(updatedArtworks);
        
        // Force la mise à jour du localStorage
        localStorage.setItem('artworks', JSON.stringify(updatedArtworks));
        
        // Force l'actualisation des composants
        refreshArtworks();
      }
    }, 100);
  };
  
  // Modifier rapidement le statut "Mis en avant" d'une œuvre
  const handleFeaturedChange = (id: string, featured: boolean) => {
    // Sauvegarde de l'ancienne valeur pour déboguer
    const oldArtwork = artworks.find(a => a.id === id);
    const oldFeatured = oldArtwork?.featured;
    
    // Mise à jour de l'œuvre avec le nouveau statut "Mis en avant"
    updateArtwork(id, { featured });
    
    // Vérification que la mise à jour a bien été prise en compte
    setTimeout(() => {
      const updatedArtwork = artworks.find(a => a.id === id);
      
      if (updatedArtwork?.featured !== featured) {
        console.warn(`Le statut "Mis en avant" n'a pas été correctement mis à jour: ${oldFeatured} -> ${featured}, actuel: ${updatedArtwork?.featured}`);
        
        // Force la mise à jour manuellement
        const updatedArtworks = artworks.map(a => 
          a.id === id ? { ...a, featured } : a
        );
        
        // Mettre à jour l'état des œuvres directement
        setArtworks(updatedArtworks);
        
        // Force la mise à jour du localStorage
        localStorage.setItem('artworks', JSON.stringify(updatedArtworks));
        
        // Force l'actualisation des composants
        refreshArtworks();
      }
    }, 100);
  };
  
  // Supprimer une œuvre
  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette œuvre?')) {
      deleteArtwork(id);
    }
  };
  
  // Annuler l'édition
  const handleCancelEdit = () => {
    setEditMode(false);
    setCurrentEditId(null);
    
    setFormData({
      title: '',
      year: new Date().getFullYear().toString(),
      technique: 'Peinture à l\'huile',
      image: '',
      description: '',
      featured: false
    });
  };
  
  // Ouvrir/fermer les détails d'une œuvre
  const toggleArtworkExpand = (id: string) => {
    if (expandedArtwork === id) {
      setExpandedArtwork(null);
    } else {
      setExpandedArtwork(id);
    }
  };
  
  // Trier les œuvres
  const handleSort = (criteria: string) => {
    if (sortBy === criteria) {
      // Inverser l'ordre si on clique sur le même critère
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
  };
  
  // Obtenir les œuvres triées
  const getSortedArtworks = () => {
    return [...artworks].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'year':
          comparison = a.year.localeCompare(b.year);
          break;
        case 'technique':
          comparison = a.technique.localeCompare(b.technique);
          break;
        case 'featured':
          comparison = (a.featured ? 1 : 0) - (b.featured ? 1 : 0);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };
  
  return (
    <AdminGuard>
      <div className="min-h-screen bg-black text-white">
        {/* En-tête du tableau de bord */}
        <header className="bg-black/40 backdrop-blur-md py-4 border-b border-white/10 sticky top-0 z-10">
          <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
            <h1 className="text-2xl font-serif font-bold">
              <span className="text-artist-accent">Tableau</span> de bord
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  refreshArtworks();
                  // Afficher une notification de succès
                  alert('Les changements ont été appliqués avec succès !');
                }}
                className="px-4 py-2 text-sm bg-artist-accent/80 hover:bg-artist-accent text-white rounded-md transition-colors flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2v6h-6"></path>
                  <path d="M3 12a9 9 0 0 1 15-6.7l3-3"></path>
                  <path d="M3 22v-6h6"></path>
                  <path d="M21 12a9 9 0 0 1-15 6.7l-3 3"></path>
                </svg>
                Appliquer les changements
              </button>
              <button
                onClick={() => {
                  if (confirm('Cette action va vider le cache et recharger la page. Continuer ?')) {
                    // Forcer le rechargement des données
                    localStorage.removeItem('artworks');
                    window.location.reload();
                  }
                }}
                className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
                Vider le cache
              </button>
              <Link 
                href="/" 
                className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                Voir le site
              </Link>
              <Link 
                href="/admin/reset" 
                className="px-4 py-2 text-sm bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded-md transition-colors"
              >
                Réinitialiser
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem('adminLoggedIn');
                  router.push('/admin');
                }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-sm rounded-md transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 md:px-6 py-2 bg-artist-accent/10 border border-artist-accent/20 rounded-md mt-4 mb-2">
          <div className="flex items-start gap-3 text-sm">
            <svg className="w-5 h-5 mt-0.5 text-artist-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <div>
              <p className="text-white/90">
                Après avoir modifié les techniques ou le statut "Mis en avant" des œuvres :
              </p>
              <ul className="list-disc list-inside mt-1 text-white/80 space-y-1">
                <li><strong>Appliquer les changements</strong> : Actualise l'affichage sans recharger la page</li>
                <li><strong>Vider le cache</strong> : Réinitialise complètement les données et recharge la page (en cas de problème persistant)</li>
              </ul>
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 md:px-6 py-8">
          {/* Actions */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-medium">Gestion des œuvres</h2>
              <button
                onClick={() => refreshArtworks()}
                className="p-2 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white rounded-full transition-colors"
                title="Actualiser les données"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2v6h-6"></path>
                  <path d="M3 12a9 9 0 0 1 15-6.7l3-3"></path>
                  <path d="M3 22v-6h6"></path>
                  <path d="M21 12a9 9 0 0 1-15 6.7l-3 3"></path>
                </svg>
              </button>
            </div>
            <button
              onClick={() => {
                setEditMode(false);
                setCurrentEditId(null);
                setFormData({
                  title: '',
                  year: new Date().getFullYear().toString(),
                  technique: 'Peinture à l\'huile',
                  image: '',
                  description: '',
                  featured: false
                });
              }}
              className="px-4 py-2 bg-artist-accent hover:bg-artist-accent/80 rounded-md flex items-center gap-2 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Ajouter une œuvre
            </button>
          </div>

          {/* Formulaire d'ajout/édition d'œuvre */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg mb-8 border border-white/10">
            <h3 className="text-lg font-medium mb-4">
              {editMode ? 'Modifier une œuvre' : 'Ajouter une œuvre'}
            </h3>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Première colonne */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-white/80 mb-1">
                    Titre *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-artist-accent ${errors.title ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-white/80 mb-1">
                    Année *
                  </label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-artist-accent ${errors.year ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
                </div>

                <div>
                  <label htmlFor="dimensions" className="block text-sm font-medium text-white/80 mb-1">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    id="dimensions"
                    name="dimensions"
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-artist-accent ${errors.dimensions ? 'border-red-500' : ''}`}
                  />
                  {errors.dimensions && <p className="text-red-500 text-sm mt-1">{errors.dimensions}</p>}
                </div>
                
                <div>
                  <label htmlFor="technique" className="block text-sm font-medium text-white/80 mb-1">
                    Technique *
                  </label>
                  <select
                    id="technique"
                    name="technique"
                    value={formData.technique}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-artist-accent ${errors.technique ? 'border-red-500' : ''}`}
                    required
                  >
                    {techniques.map((tech) => (
                      <option key={tech} value={tech}>{tech}</option>
                    ))}
                  </select>
                  {errors.technique && <p className="text-red-500 text-sm mt-1">{errors.technique}</p>}
                </div>
              </div>

              {/* Deuxième colonne */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-white/80 mb-1">
                    Image (URL) *
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="/images/nom-de-image.jpg"
                    className={`w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-artist-accent ${errors.image ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-white/80 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-artist-accent ${errors.description ? 'border-red-500' : ''}`}
                  ></textarea>
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="w-4 h-4 mr-2"
                    />
                    <label htmlFor="featured" className="text-sm text-white/80">
                      Mise en avant
                    </label>
                  </div>
                </div>
              </div>

              {/* Boutons de contrôle sur toute la largeur */}
              <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-white bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-artist-accent hover:bg-artist-accent/80 rounded-md transition-colors"
                >
                  {editMode ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>

          {/* Liste des œuvres */}
          {loading ? (
            <div className="text-center py-10">Chargement des œuvres...</div>
          ) : artworks.length === 0 ? (
            <div className="text-center py-10 text-white/70">
              Aucune œuvre trouvée. Ajoutez votre première œuvre !
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Image</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Titre</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Année</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Technique</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Disponible</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Mis en avant</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getSortedArtworks().map((artwork) => (
                    <tr key={artwork.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-4 py-3">
                        <div className="w-16 h-16 relative overflow-hidden rounded-md">
                          <Image
                            src={artwork.image}
                            alt={artwork.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium">{artwork.title}</td>
                      <td className="px-4 py-3 text-white/70">{artwork.year}</td>
                      <td className="px-4 py-3">
                        <select
                          value={artwork.technique || 'Peinture à l\'huile'}
                          onChange={(e) => handleTechniqueChange(artwork.id, e.target.value)}
                          className="px-2 py-1 text-sm bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-artist-accent min-w-[120px]"
                        >
                          {techniques.map((technique) => (
                            <option key={`${artwork.id}-${technique}`} value={technique}>
                              {technique}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={artwork.featured ? 'true' : 'false'}
                          onChange={(e) => handleFeaturedChange(artwork.id, e.target.value === 'true')}
                          className="px-2 py-1 text-sm bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-artist-accent min-w-[80px]"
                        >
                          <option value="true">Oui</option>
                          <option value="false">Non</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(artwork.id)}
                            className="p-1.5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                            title="Modifier"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(artwork.id)}
                            className="p-1.5 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-md transition-colors"
                            title="Supprimer"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </AdminGuard>
  );
} 