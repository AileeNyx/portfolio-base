export interface Artwork {
  id: number;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  category: string;
  image: string;
  description?: string;
  available?: boolean;
  featured?: boolean;
  price?: number;
  createdAt?: string;
  updatedAt?: string;
  technique?: string;
} 