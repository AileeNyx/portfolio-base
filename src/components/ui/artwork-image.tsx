'use client';

import Image from 'next/image';
import { PlaceholderImage } from './placeholder-image';

interface ArtworkImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function ArtworkImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  priority = false,
  sizes = '100vw',
}: ArtworkImageProps) {
  // Vérifier si l'image commence par http ou https (image externe)
  const isExternalImage = src.startsWith('http');
  
  // Vérifier si l'image est dans le dossier public/images
  const isLocalImage = !isExternalImage && (src.startsWith('/images/') || src.startsWith('images/'));
  
  // Normaliser le chemin de l'image locale
  const normalizedSrc = isLocalImage 
    ? src.startsWith('/') ? src : `/${src}` 
    : src;
  
  // Utiliser un placeholder si l'image n'est pas disponible
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.warn(`Erreur de chargement de l'image: ${normalizedSrc}`);
    // On pourrait remplacer par une image par défaut ici
  };

  try {
    if (fill) {
      return (
        <div className={`relative ${className}`}>
          <Image
            src={normalizedSrc}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            onError={handleError}
          />
        </div>
      );
    }

    return (
      <Image
        src={normalizedSrc}
        alt={alt}
        width={width || 800}
        height={height || 600}
        className={className}
        priority={priority}
        onError={handleError}
      />
    );
  } catch (error) {
    // Fallback en cas d'erreur
    return (
      <PlaceholderImage
        text={alt}
        width={width}
        height={height}
        fill={fill}
        className={className}
      />
    );
  }
} 