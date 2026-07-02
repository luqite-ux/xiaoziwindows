/** @type {import('next').NextConfig} */
const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL?.trim().replace(/[\r\n]/g, '').replace(/\/$/, '')

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    if (!adminUrl) return []
    return {
      // afterFiles: runs AFTER filesystem routes but before fallback.
      // /admin/login and /admin/logout have real pages so they stay on customer site.
      // Everything else under /admin/* proxies to huanqiu-admin backend.
      afterFiles: [
        { source: '/admin', destination: `${adminUrl}/admin` },
        { source: '/admin/:path*', destination: `${adminUrl}/admin/:path*` },
        { source: '/api/admin/:path*', destination: `${adminUrl}/api/admin/:path*` },
      ],
    }
  },
}

export default nextConfig
