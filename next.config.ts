import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/shop/limited-edition-autumn-heavyweight-tee",
        destination: "/shop/ox-t-shirt-tallow",
        permanent: true,
      },
      {
        source: "/shop/embroidered-premium-cotton-heavyweight-t",
        destination: "/shop/ox-t-shirt-tallow",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
