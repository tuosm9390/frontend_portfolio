"use client"
import { useState } from "react"
import { BlogPosts } from "@/components/blog-posts"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function BlogPageClient() {
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = () => {
    setIsLoading(true)
    // 페이지 새로고침
    window.location.reload()
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">블로그</h1>
        <p className="text-xl text-muted-foreground">Velog에 작성한 기술 블로그 글 목록입니다</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Button onClick={handleRefresh} variant="outline" disabled={isLoading}>
          {isLoading ? "새로고침 중..." : "페이지 새로고침"}
        </Button>

        <Button asChild variant="outline" size="sm">
          <Link href="https://velog.io/@tuosm9390" target="_blank" rel="noopener noreferrer">
            원본 블로그 방문
          </Link>
        </Button>
      </div>

      <BlogPosts showViewMore={false} />
    </div>
  )
}
