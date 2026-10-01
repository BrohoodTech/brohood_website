import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brohood.in';

  const disallowPaths = [
    '/account',
    '/checkout',
    '/order-confirmation',
    '/api/',
    '/_next/',
    '/login',
    '/register',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowPaths,
      },
      // OpenAI ChatGPT / SearchGPT Web Crawlers
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: disallowPaths,
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: disallowPaths,
      },
      // Perplexity AI Crawler
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: disallowPaths,
      },
      // Anthropic Claude Crawler
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: disallowPaths,
      },
      // Google Gemini & AI Overviews
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: disallowPaths,
      },
      // Apple Intelligence & Siri
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: disallowPaths,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
