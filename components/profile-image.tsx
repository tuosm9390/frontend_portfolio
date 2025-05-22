"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProfileImageProps {
  className?: string
  containerClassName?: string
}

export function ProfileImage({ className, containerClassName }: ProfileImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn("relative overflow-hidden rounded-full border-4 border-primary/20", containerClassName)}>
      <div
        className={cn(
          "absolute inset-0 bg-muted/30 flex items-center justify-center",
          isLoading ? "opacity-100" : "opacity-0",
          "transition-opacity duration-300",
        )}
      >
        <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
      </div>

      <picture>
        <source media="(max-width: 640px)" srcSet="/images/profile-small.png" />
        <source media="(max-width: 1024px)" srcSet="/images/profile-medium.png" />
        <source media="(min-width: 1025px)" srcSet="/images/profile-large.png" />

        <Image
          src="/images/profile.png"
          alt="프로필 이미지"
          width={320}
          height={320}
          className={cn("object-cover w-full h-full", className)}
          priority
          onLoadingComplete={() => setIsLoading(false)}
          onError={(e) => {
            setIsLoading(false)
            const target = e.target as HTMLImageElement
            target.onerror = null
            target.src = "https://via.placeholder.com/320x320?text=Profile"
          }}
        />
      </picture>
    </div>
  )
}
