'use client';

import React from 'react';
import Image from 'next/image';

interface PlaceholderImageProps {
  width?: number;
  height?: number;
  text?: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
  style?: React.CSSProperties;
  fill?: boolean;
}

export function PlaceholderImage({
  width = 800,
  height = 600,
  text = 'Image',
  bgColor = '#D4AF37',
  textColor = '#FFFFFF',
  className = '',
  style = {},
  fill = false,
}: PlaceholderImageProps) {
  const [dataUrl, setDataUrl] = React.useState<string>('');

  React.useEffect(() => {
    // Créer un canvas pour générer l'image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Définir les dimensions
    canvas.width = width;
    canvas.height = height;
    
    // Remplir le fond
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    
    // Ajouter un motif
    ctx.fillStyle = `${textColor}20`;
    for (let i = 0; i < width; i += 40) {
      for (let j = 0; j < height; j += 40) {
        ctx.fillRect(i, j, 20, 20);
      }
    }
    
    // Ajouter le texte
    ctx.font = `bold ${Math.min(width, height) / 10}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = textColor;
    ctx.fillText(text, width / 2, height / 2);
    
    // Convertir en data URL
    setDataUrl(canvas.toDataURL('image/png'));
  }, [width, height, text, bgColor, textColor]);

  if (fill) {
    return (
      <div className={`relative w-full h-full ${className}`} style={style}>
        {dataUrl && (
          <Image
            src={dataUrl}
            alt={text}
            fill
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      {dataUrl && (
        <Image
          src={dataUrl}
          alt={text}
          width={width}
          height={height}
        />
      )}
    </div>
  );
} 