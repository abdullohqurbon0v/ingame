import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "e7.pngegg.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
      },
      {
        protocol: "https",
        hostname: "api.mirmakhmudoff.uz",
      },
      {
        protocol: "https",
        hostname: "a.storyblok.com",
      },
    ],
  },
  i18n: {
    locales: ["uz", "ru"],
    defaultLocale: "uz",
    localeDetection: false,
  },
};

export default nextConfig;
