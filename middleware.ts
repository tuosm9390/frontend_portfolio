import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // 응답 객체 생성
  const response = NextResponse.next()

  // 이미지 요청에 대한 캐시 헤더 추가
  if (request.nextUrl.pathname.match(/\.(jpg|jpeg|png|webp|avif|svg)$/)) {
    response.headers.set("Cache-Control", "public, max-age=86400, stale-while-revalidate=31536000")
  }

  return response
}

// 미들웨어가 실행될 경로 지정
export const config = {
  matcher: [
    // 이미지 파일에 대한 요청 매칭
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
