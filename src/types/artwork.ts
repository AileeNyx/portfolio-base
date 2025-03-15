export interface Artwork {
  id: number;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  category: string;
  image: string;
  description?: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
  technique?: string;
} 