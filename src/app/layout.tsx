import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { VibrantGradientBackground } from "@/components/ui/vibrant-gradient-background";
import { ArtworkProvider } from "@/contexts/ArtworkContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aileenyx.com"),
  title: "Aileenyx's Portfolio",
  description: "Personal portfolio of Aileenyx, a creative artist and Game Dev. Check out my best artworks and get to know me a little better!",
  keywords: ["art", "artista", "paint", "games", "GameDev", "gallery", "AileeNyx"],
  authors: [{ name: "AileeNyx", url: "https://aileenyx.com" }],
  creator: "AileeNyx",
  publisher: "AileeNyx",
  openGraph: {
    type: "website",
    locale: "en_EN",
    url: "https://aileenyx.com",
    title: "Aileenyx's Portfolio",
    description: "Personal portfolio of Aileenyx, a creative artist and Game Dev. Check out my best artworks and get to know me a little better!",
    siteName: "Aileenyx's Portfolio",
    images: [
      {
        url: "/images/portrait.jpg",
        width: 1200,
        height: 630,
        alt: "AileeNyx - Artiste and Game Dev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aileenyx's Portfolio",
    description: "Personal portfolio of Aileenyx, a creative artist and Game Dev. Check out my best artworks and get to know me a little better!",
    creator: "AileeNyx",
    images: ["/images/portrait.jpg"],
  },
  alternates: {
    canonical: "https://aileenyx.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: ['/favicon.ico'],
    apple: ['/apple-icon.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased text-artist-white min-h-screen`}
      >
        <div className="grain-overlay"></div>
        
        <VibrantGradientBackground className="min-h-screen">
          <ArtworkProvider>
            {children}
          </ArtworkProvider>
        </VibrantGradientBackground>
      </body>
    </html>
  );
}
