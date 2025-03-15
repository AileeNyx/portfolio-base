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
  metadataBase: new URL("https://portfolio-wonderfulgemini.com"),
  title: "Portfolio @Wonderful.Gemini | Œuvres & Expositions",
  description: "Portfolio @Wonderful.Gemini présentant une collection d'œuvres, d'expositions et de projets créatifs par l'artiste plasticienne Nina Alexandre.",
  keywords: ["art", "artiste", "peinture", "exposition", "œuvre", "galerie", "Nina Alexandre", "Wonderful Gemini", "art contemporain"],
  authors: [{ name: "Nina Alexandre", url: "https://www.instagram.com/wonderful.gemini/" }],
  creator: "Nina Alexandre",
  publisher: "Nina Alexandre",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://portfolio-wonderfulgemini.com",
    title: "Portfolio @Wonderful.Gemini | Œuvres & Expositions",
    description: "Portfolio @Wonderful.Gemini présentant une collection d'œuvres, d'expositions et de projets créatifs par l'artiste plasticienne Nina Alexandre.",
    siteName: "Portfolio @Wonderful.Gemini",
    images: [
      {
        url: "/images/selfie-nina.jpg",
        width: 1200,
        height: 630,
        alt: "Nina Alexandre - Artiste plasticienne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio @Wonderful.Gemini | Œuvres & Expositions",
    description: "Portfolio @Wonderful.Gemini présentant une collection d'œuvres, d'expositions et de projets créatifs par l'artiste plasticienne Nina Alexandre.",
    creator: "@wonderful_gemini",
    images: ["/images/selfie-nina.jpg"],
  },
  alternates: {
    canonical: "https://portfolio-wonderfulgemini.com",
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
