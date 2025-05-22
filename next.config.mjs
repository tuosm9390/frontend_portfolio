/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['via.placeholder.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 320],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60, // 이미지 캐시 유지 시간(초)
    dangerouslyAllowSVG: true, // SVG 이미지 허용 (기술 스택 아이콘용)
  },
  // 정적 자산에 대한 캐시 헤더 설정
  async headers() {
    return [
      {
        // 이미지에 대한 캐시 설정
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=31536000',
          },
        ],
      },
      {
        // 기술 스택 아이콘에 대한 캐시 설정 (더 긴 캐시 시간)
        source: '/images/skills/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // 정적 자산(JS, CSS)에 대한 캐시 설정
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // 폰트에 대한 캐시 설정
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
