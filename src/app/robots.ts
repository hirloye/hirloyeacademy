import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Replace with your actual production domain
  const baseUrl = 'https://hirloyeacademy.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/', 
        '/staff/', 
        '/student-login', 
        '/dashboard/', 
        '/progress/', 
        '/settings/'
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
