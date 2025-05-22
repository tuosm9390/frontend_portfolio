"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function ScrollToTop() {
  const pathname = usePathname()
  const searchParams = useSearchParams() // Moved to top level as per the update
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // 페이지 이동 시 스크롤을 맨 위로 이동
    window.scrollTo({
      top: 0,
      behavior: "instant", // 즉시 이동 (smooth로 설정하면 부드럽게 이동)
    })
  }, [pathname]) // searchParams 의존성 제거

  // 컴포넌트가 마운트된 후에만 searchParams 관련 효과 실행
  useEffect(() => {
    if (!mounted) return

    window.scrollTo({
      top: 0,
      behavior: "instant",
    })
  }, [mounted]) // 마운트 상태에만 의존

  return null // UI를 렌더링하지 않음
}
