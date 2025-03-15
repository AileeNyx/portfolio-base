"use client";
import { ParallaxScrollSecond } from "@/components/ui/parallax-scroll";

export function ParallaxScrollSecondDemo() {
  // Utiliser des images du projet
  const images = [
    "/images/le-deuil-original.jpg",
    "/images/Etoile-Chatoyante.jpg",
    "/images/Misfit-genesis.jpg",
    "/images/Asmodeus.jpg",
    "/images/Connexion-sauvage.jpg",
    "/images/Give-me-love.jpg",
    "/images/dans-ta-bouche.jpg",
    "/images/ose-me-suivre.jpg",
    "/images/love.mp4.jpg",
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-serif text-white mb-6 text-center">Galerie d'œuvres</h2>
      <ParallaxScrollSecond images={images} />
    </div>
  );
} 