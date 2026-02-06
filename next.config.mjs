/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/blog-admin/:path*',
        destination: '/blog-admin/index.html',
      },
    ];
  },
}

export default nextConfig
