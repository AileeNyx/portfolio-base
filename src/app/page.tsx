'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Script from 'next/script';

export default function Home() {
  // Données structurées JSON-LD pour artiste
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'AileeNyx',
    alternateName: '@Wonderful.Gemini',
    url: 'https://aileenyx.com',
    image: 'https://aileenyx.com/images/portrait.jpg',
    sameAs: [],
    jobTitle: 'Artist and Game Dev',
    description: 'Personal portfolio of Aileenyx, a creative artist and Game Dev. Check out my best artworks and get to know me a little better!',
    knowsAbout: ['Art', 'Painting', 'GameDev'],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://aileenyx.com'
    }
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Gallery />
        <About />
      </main>
      <Footer />
    </div>
  );
}
