"use client"

import { useState, useEffect, useRef, type RefObject } from "react"

interface UseIntersectionObserverProps {
  threshold?: number
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = "0px",
  freezeOnceVisible = true,
}: UseIntersectionObserverProps = {}): [boolean, RefObject<HTMLElement>] {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const frozen = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // 이미 한 번 보였고, freezeOnceVisible이 true라면 더 이상 관찰하지 않음
    if (frozen.current && freezeOnceVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementVisible = entry.isIntersecting
        setIsVisible(isElementVisible)

        // 요소가 보이면 frozen 상태로 설정
        if (isElementVisible && freezeOnceVisible) {
          frozen.current = true
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, freezeOnceVisible])

  return [isVisible, ref as RefObject<HTMLElement>]
}
