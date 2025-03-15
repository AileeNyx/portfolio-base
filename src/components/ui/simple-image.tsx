'use client';

interface SimpleImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function SimpleImage({
  src,
  alt,
  className = '',
}: SimpleImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`max-w-full max-h-full object-contain ${className}`}
    />
  );
} 