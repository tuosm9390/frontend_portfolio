import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react" // Suspense 추가
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceWorkerRegister } from "@/components/service-worker-register"
import { ScrollToTop } from "@/components/scroll-to-top"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "계발자 포트폴리오",
  description: "3년차 프론트엔드 개발자 포트폴리오",
  // 캐싱 관련 메타데이터 추가
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "계발자 포트폴리오",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#2b5797",
    "msapplication-tap-highlight": "no",
    "theme-color": "#ffffff",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* 프리로드 및 프리커넥트 힌트 추가 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        {/* 서비스 워커 등록 컴포넌트 추가 */}
        <ServiceWorkerRegister />
        {/* 스크롤 맨 위로 이동 컴포넌트를 Suspense로 감싸기 */}
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
      </body>
    </html>
  )
}
