"use client"

import React, { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface VibrantGradientBackgroundProps {
  className?: string
  children?: React.ReactNode
  primaryColor?: string
  secondaryColor?: string
  tertiaryColor?: string
  quaternaryColor?: string
  quinaryColor?: string
  interactive?: boolean
}

export function VibrantGradientBackground({
  className,
  children,
  primaryColor = "#FF61D8",     // Rose vif
  secondaryColor = "#FFA84B",   // Orange
  tertiaryColor = "#FFEC5C",    // Jaune
  quaternaryColor = "#5CE1FF",  // Bleu ciel
  quinaryColor = "#7C4DFF",     // Violet
  interactive = true,
}: VibrantGradientBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!containerRef.current || !interactive) return

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [interactive])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  // Calculer les positions relatives pour les blobs
  const getRelativePosition = () => {
    if (!dimensions.width || !dimensions.height) return { x: '50%', y: '50%' }
    
    const x = (mousePosition.x / dimensions.width) * 100
    const y = (mousePosition.y / dimensions.height) * 100
    
    return {
      x: `${Math.max(0, Math.min(100, x))}%`,
      y: `${Math.max(0, Math.min(100, y))}%`
    }
  }

  const position = getRelativePosition()

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden",
        className
      )}
      onMouseMove={handleMouseMove}
      style={{
        '--primary-color': primaryColor,
        '--secondary-color': secondaryColor,
        '--tertiary-color': tertiaryColor,
        '--quaternary-color': quaternaryColor,
        '--quinary-color': quinaryColor,
        '--mouse-x': position.x,
        '--mouse-y': position.y,
      } as React.CSSProperties}
    >
      {/* Blobs animés - avec opacité réduite et tailles augmentées */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
        <div 
          className="absolute w-[70%] aspect-square rounded-full blur-[120px] mix-blend-screen animate-first"
          style={{ 
            background: 'var(--primary-color)',
            top: '50%',
            left: interactive ? 'var(--mouse-x)' : '40%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-[80%] aspect-square rounded-full blur-[140px] mix-blend-screen animate-second"
          style={{ 
            background: 'var(--secondary-color)',
            top: '50%',
            left: interactive ? 'var(--mouse-x)' : '60%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-[75%] aspect-square rounded-full blur-[130px] mix-blend-screen animate-third"
          style={{ 
            background: 'var(--tertiary-color)',
            top: interactive ? 'var(--mouse-y)' : '60%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-[85%] aspect-square rounded-full blur-[150px] mix-blend-screen animate-fourth"
          style={{ 
            background: 'var(--quaternary-color)',
            top: interactive ? 'var(--mouse-y)' : '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-[65%] aspect-square rounded-full blur-[110px] mix-blend-screen animate-fifth"
          style={{ 
            background: 'var(--quinary-color)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Overlay pour améliorer la lisibilité du contenu - légèrement réduit */}
      <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px]" />

      {/* Contenu */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
} 