import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BroHood™ India — 1:1 First Copy Luxury Store',
    short_name: 'BroHood',
    description: 'Premier Indian destination for 1:1 master quality luxury watches, hype sneakers, designer goggles, and heavyweight streetwear.',
    start_url: '/',
    display: 'standalone',
    background_color: '#08080a',
    theme_color: '#08080a',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
