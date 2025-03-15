'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface DecorativeDotsProps {
  className?: string;
}

export const DecorativeDots = ({ className = '' }: DecorativeDotsProps) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className="absolute top-12 left-12 w-1 h-1 bg-artist-accent/80 rounded-full"></div>
      <div className="absolute top-20 left-20 w-2 h-2 bg-artist-accent/60 rounded-full"></div>
      <div className="absolute bottom-32 right-16 w-1.5 h-1.5 bg-artist-accent/70 rounded-full"></div>
      <div className="absolute top-1/4 right-16 w-2 h-2 bg-white/40 rounded-full"></div>
      <div className="absolute bottom-1/3 left-24 w-2 h-2 bg-white/40 rounded-full"></div>
    </div>
  );
};

interface DecorativeFrameProps {
  children: ReactNode;
  className?: string;
}

export const DecorativeFrame = ({ children, className = '' }: DecorativeFrameProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* Cadre avec coins accentués */}
      <div className="absolute -inset-px rounded-lg overflow-hidden pointer-events-none">
        <div className="absolute -top-1.5 -left-1.5 w-10 h-10 border-t-2 border-l-2 border-artist-accent/80 rounded-tl-lg"></div>
        <div className="absolute -top-1.5 -right-1.5 w-10 h-10 border-t-2 border-r-2 border-artist-accent/80 rounded-tr-lg"></div>
        <div className="absolute -bottom-1.5 -left-1.5 w-10 h-10 border-b-2 border-l-2 border-artist-accent/80 rounded-bl-lg"></div>
        <div className="absolute -bottom-1.5 -right-1.5 w-10 h-10 border-b-2 border-r-2 border-artist-accent/80 rounded-br-lg"></div>
      </div>
      
      {children}
      
      {/* Points décoratifs */}
      <DecorativeDots />
    </div>
  );
};

interface FloatingElementProps {
  delay?: number;
  x?: number;
  y?: number;
  size?: number;
  color?: string;
  duration?: number;
  className?: string;
}

export const FloatingElement = ({ 
  delay = 0, 
  x = 20, 
  y = 20, 
  size = 8, 
  color = 'bg-artist-accent/40',
  duration = 8,
  className = ''
}: FloatingElementProps) => {
  return (
    <motion.div
      className={`absolute rounded-full backdrop-blur-sm ${color} ${className}`}
      style={{ width: size, height: size }}
      initial={{ x: 0, y: 0 }}
      animate={{ 
        x: [0, x, 0, -x, 0],
        y: [0, y, -y, 0, y, 0]
      }}
      transition={{ 
        repeat: Infinity,
        duration: duration,
        delay: delay,
        ease: "easeInOut" 
      }}
    />
  );
};

export const ArtistSignature = () => {
  return (
    <motion.div
      className="absolute right-6 bottom-6 z-10"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
        <path d="M10 20C15 10 25 15 20 25C15 35 5 30 10 20Z" stroke="white" strokeWidth="0.8" />
        <path d="M25 30C30 15 40 10 45 25" stroke="white" strokeWidth="0.8" />
        <path d="M45 10C50 10 50 30 45 30" stroke="white" strokeWidth="0.8" />
      </svg>
    </motion.div>
  );
}; 