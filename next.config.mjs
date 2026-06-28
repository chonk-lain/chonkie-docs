import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "raw.githubusercontent.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/docs/overview",
        destination: "/python/installation",
        permanent: true,
      },
      {
        source: "/docs/overview/:path*",
        destination: "/python/installation",
        permanent: true,
      },
      {
        source: "/overview",
        destination: "/python/installation",
        permanent: true,
      },
      {
        source: "/overview/:path*",
        destination: "/python/installation",
        permanent: true,
      },
      {
        source: "/docs",
        destination: "/python/installation",
        permanent: true,
      },
      {
        source: "/docs/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
