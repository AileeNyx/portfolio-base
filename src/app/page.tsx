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
    name: 'Nina Alexandre',
    alternateName: '@Wonderful.Gemini',
    url: 'https://portfolio-wonderfulgemini.com',
    image: 'https://portfolio-wonderfulgemini.com/images/selfie-nina.jpg',
    sameAs: [
      'https://www.instagram.com/wonderful.gemini/',
      'https://twitter.com/wonderful_gemini',
      'https://www.facebook.com/profile.wonderful.gemini',
    ],
    jobTitle: 'Artiste plasticienne',
    description: 'Artiste plasticienne française créant des œuvres expressives dans divers médiums comme la peinture à l\'huile, l\'acrylique et les techniques mixtes.',
    knowsAbout: ['Art contemporain', 'Peinture à l\'huile', 'Acrylique', 'Techniques mixtes'],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://portfolio-wonderfulgemini.com'
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
