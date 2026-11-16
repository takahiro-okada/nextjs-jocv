/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@prisma/client", ".prisma/client"],
  images: {
    unoptimized: true,
    domains: ['lh3.googleusercontent.com', 'localhost'],
  },
};

export default nextConfig;
