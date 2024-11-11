import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: "**",
        pathname: "**",
        protocol: "http",
      },
      {
        hostname: "**",
        pathname: "**",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
