import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
      { hostname: 'media-cdn.tripadvisor.com' },
      { hostname: 'www.sectoralarm.it' },
      { hostname: 'preview.redd.it' },
      { hostname: 'magazine.bimbostore.com' },
      { hostname: 'img.joomcdn.net' },
      { hostname: 'www.sevenitalia.it' },
      { hostname: 'encrypted-tbn0.gstatic.com' },
      { hostname: 'www.lookathome.it' },
      { hostname: 'i0.wp.com' },
      { hostname: 'www.elettronsicurezza.it' },
    ],
  },
};

export default nextConfig;
