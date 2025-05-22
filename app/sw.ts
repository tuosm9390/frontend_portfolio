/// <reference lib="webworker" />

// 서비스 워커 타입 선언
declare const self: ServiceWorkerGlobalScope

const CACHE_NAME = "portfolio-cache-v1"

// 캐시할 정적 자산 목록
const STATIC_ASSETS = [
  "/",
  "/projects",
  "/blog",
  "/contact",
  "/images/profile.png",
  "/images/profile-small.png",
  "/images/profile-medium.png",
  "/images/profile-large.png",
]

// 기술 스택 이미지 캐싱
const SKILL_IMAGES = [
  "/images/skills/HTML.svg",
  "/images/skills/CSS.svg",
  "/images/skills/JavaScript.svg",
  "/images/skills/TypeScript.svg",
  "/images/skills/React.svg",
  "/images/skills/NextJS-Light.svg",
  "/images/skills/TailwindCSS-Light.svg",
  "/images/skills/Spring-Light.svg",
  "/images/skills/MySQL-Light.svg",
  "/images/skills/Prisma.svg",
  "/images/skills/MaterialUI-Light.svg",
  "/images/skills/Github-Light.svg",
  "/images/skills/Figma-Light.svg",
  "/images/skills/Discord.svg",
  "/images/skills/Vercel-Light.svg",
]

// 서비스 워커 설치 시 정적 자산 캐싱
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([...STATIC_ASSETS, ...SKILL_IMAGES])
    }),
  )
})

// 서비스 워커 활성화 시 이전 캐시 정리
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName !== CACHE_NAME).map((cacheName) => caches.delete(cacheName)),
      )
    }),
  )
})

// 네트워크 요청 가로채기 및 캐시 전략 적용
self.addEventListener("fetch", (event) => {
  // API 요청은 캐싱하지 않음
  if (event.request.url.includes("/api/")) {
    return
  }

  // 이미지 요청에 대한 캐시 우선 전략
  if (event.request.destination === "image" || event.request.url.match(/\.(jpg|jpeg|png|webp|avif|svg)$/)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // 캐시에 있으면 캐시된 응답 반환
        if (cachedResponse) {
          // 백그라운드에서 네트워크 요청으로 캐시 업데이트
          fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse.ok) {
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, networkResponse.clone())
                })
              }
            })
            .catch(() => {
              // 네트워크 오류 무시
            })

          return cachedResponse
        }

        // 캐시에 없으면 네트워크 요청 후 캐싱
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response
          }

          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
      }),
    )
    return
  }

  // 기타 요청에 대한 네트워크 우선 전략
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // 성공적인 응답만 캐싱
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response
        }

        const responseToCache = response.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache)
        })

        return response
      })
      .catch(() => {
        // 네트워크 실패 시 캐시에서 제공
        return caches.match(event.request)
      }),
  )
})
