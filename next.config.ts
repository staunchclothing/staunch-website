import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/shop/limited-edition-autumn-heavyweight-tee",
        destination: "/shop/embroidered-premium-cotton-heavyweight-t",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
