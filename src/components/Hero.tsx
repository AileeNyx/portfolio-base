'use client';

import { motion } from 'framer-motion';
import { AnimatedTitle } from '@/components/ui/animated-title';
import Image from 'next/image';
import { InstagramButton } from '@/components/ui/instagram-button';
import { ImageSlideshow } from '@/components/ui/ImageSlideshow';
import { DecorativeFrame, FloatingElement, ArtistSignature } from '@/components/ui/decorative-elements';

const Hero = () => {
  // Fonction pour faire défiler vers la section galerie
  const scrollToGallery = () => {
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Éléments décoratifs du fond */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-artist-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-artist-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-2 lg:order-1 w-full px-2 sm:px-4 lg:col-span-2"
        >
          <AnimatedTitle 
            title="Alexandre Nina"
            subtitle="Artiste plasticienne"
            titleClassName="font-serif font-bold mb-2 leading-tight text-artist-text-light text-3xl sm:text-4xl md:text-5xl lg:text-5xl w-full"
            subtitleClassName="text-xl md:text-2xl mb-4 text-artist-text-light font-serif italic"
            animationType="letter"
            duration={0.08}
            delay={0.05}
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-artist-text-light mb-8 max-w-2xl leading-relaxed"
          >
            Bienvenue dans mon univers artistique où chaque œuvre raconte une histoire unique.
            Je crée des pièces qui transmettent émotions et sensibilité à travers différentes techniques.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <motion.button 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.5 }}
              onClick={scrollToGallery}
              className="px-8 py-3 bg-white text-black rounded-md hover:bg-artist-accent hover:text-white transition-colors duration-300 text-center font-medium shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Découvrir mes œuvres
            </motion.button>
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.5 }}
            >
              <InstagramButton 
                variant="accent" 
                instagramUrl="https://www.instagram.com/wonderful.gemini/"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="order-1 lg:order-2 relative flex justify-center lg:col-span-3"
        >
          <div className="w-full max-w-3xl mx-auto relative">
            <DecorativeFrame className="relative">
              <ImageSlideshow 
                interval={6000}
                includeSelfPortrait={true}
                showControls={true}
                className="shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              />
              
              {/* Éléments flottants autour du slider */}
              <FloatingElement 
                delay={0.5} 
                x={30} 
                y={25} 
                size={12} 
                className="top-20 right-20"
              />
              <FloatingElement 
                delay={1.2} 
                x={20} 
                y={35} 
                size={8} 
                color="bg-white/30" 
                className="bottom-32 left-10"
              />
              <FloatingElement 
                delay={2} 
                x={25} 
                y={20} 
                size={10} 
                duration={10}
                className="top-32 left-8"
              />
              
              {/* Signature de l'artiste */}
              <ArtistSignature />
            </DecorativeFrame>
            
            {/* Éléments décoratifs supplémentaires */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/20 backdrop-blur-md rounded-full z-0"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-white/40 rounded-full z-0"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 