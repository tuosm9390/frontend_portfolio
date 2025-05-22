"use client"

import { useEffect } from "react"

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator && typeof window !== "undefined" && window.location.hostname !== "localhost") {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("Service Worker 등록 성공:", registration.scope)
          })
          .catch((error) => {
            console.error("Service Worker 등록 실패:", error)
          })
      })
    }
  }, [])

  return null // 이 컴포넌트는 UI를 렌더링하지 않습니다
}
