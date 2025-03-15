import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/admin/dashboard/'],
    },
    sitemap: 'https://portfolio-wonderfulgemini.com/sitemap.xml',
  };
} 