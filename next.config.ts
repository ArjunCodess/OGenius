import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*",
        protocol: "https",
      },
      {
        hostname: "*",
        protocol: "http",
      },
    ],
  },
};

export default nextConfig;