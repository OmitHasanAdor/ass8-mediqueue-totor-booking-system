/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
        pathname: "**",
      },
    ],
  },

  // ✅ Correct way for Next.js 16
  serverExternalPackages: [
    "mongodb",
    "better-auth",
    "@better-auth/mongo-adapter",
  ],
};

export default nextConfig;