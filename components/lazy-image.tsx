"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"

interface LazyImageProps extends Omit<ImageProps, "onLoad" | "onLoadingComplete"> {
  containerClassName?: string
  showLoadingIndicator?: boolean
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  containerClassName,
  showLoadingIndicator = true,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, ref] = useIntersectionObserver({ threshold: 0.1, freezeOnceVisible: true })
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  // 뷰포트에 들어왔을 때만 이미지 소스 설정
  useEffect(() => {
    if (isInView && !imageSrc) {
      setImageSrc(typeof src === "string" ? src : src.src)
    }
  }, [isInView, imageSrc, src])

  // 이미지 로드 완료 핸들러
  const handleLoadingComplete = () => {
    setIsLoaded(true)
  }

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={cn("relative overflow-hidden", containerClassName)}>
      {/* 로딩 인디케이터 */}
      {showLoadingIndicator && !isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 animate-pulse">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      )}

      {/* 이미지 플레이스홀더 */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-muted/10"
          style={{
            width: typeof width === "number" ? `${width}px` : width,
            height: typeof height === "number" ? `${height}px` : height,
          }}
        />
      )}

      {/* 실제 이미지 */}
      {imageSrc && (
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className={cn("transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-0", className)}
          onLoadingComplete={handleLoadingComplete}
          {...props}
        />
      )}
    </div>
  )
}
