"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, ArrowRight, AlertCircle, Clock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { LazyImage } from "@/components/lazy-image"

interface BlogPost {
  id: string
  title: string
  summary: string
  date: string
  tags: string[] // 데이터 구조는 유지하지만 UI에서 표시하지 않음
  url: string
  readingTime?: string
  thumbnail?: string // 썸네일 이미지를 위한 필드 추가
}

interface BlogPostsProps {
  limit?: number
  showViewMore?: boolean
}

export function BlogPosts({ limit, showViewMore = true }: BlogPostsProps) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]) // 모든 포스트를 저장하는 상태 추가
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)

      // 예시 데이터를 미리 준비
      const exampleData = getExamplePosts()

      try {
        // 실제 API 호출 시도
        const response = await fetch("/api/blog-posts", {
          cache: "no-store", // 캐시 사용 안 함 (항상 최신 데이터 가져오기)
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error("API 응답 오류:", response.status, errorText)
          throw new Error(`블로그 포스트를 가져오는데 실패했습니다 (${response.status})`)
        }

        const data = await response.json()

        // 모든 포스트 저장
        setAllPosts(data.posts)

        // 포스트 제한이 있는 경우 적용
        const limitedPosts = limit ? data.posts.slice(0, limit) : data.posts
        setPosts(limitedPosts)

        if (data.message) {
          console.log("API 메시지:", data.message)
          toast({
            title: "알림",
            description: data.message,
          })
        }
      } catch (apiError) {
        console.error("API 호출 오류:", apiError)

        // API 호출 실패 시 예시 데이터 사용
        setAllPosts(exampleData)
        setPosts(limit ? exampleData.slice(0, limit) : exampleData)

        toast({
          title: "데이터 로딩 알림",
          description: "블로그 데이터를 가져오는데 문제가 있어 예시 데이터를 표시합니다.",
          variant: "default",
        })

        // 오류 상태는 설정하지 않음 - 사용자 경험을 위해
      }
    } catch (error) {
      console.error("블로그 포스트 로딩 오류:", error)

      // 최종 폴백: 예시 데이터 사용
      const exampleData = getExamplePosts()
      setAllPosts(exampleData)
      setPosts(limit ? exampleData.slice(0, limit) : exampleData)

      setError("블로그 포스트를 불러오는데 문제가 발생했습니다")

      toast({
        title: "오류 발생",
        description: "블로그 포스트를 불러오는데 실패했습니다. 예시 데이터를 표시합니다.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  // limit이 변경될 때 posts 업데이트
  useEffect(() => {
    if (allPosts.length > 0) {
      setPosts(limit ? allPosts.slice(0, limit) : allPosts)
    }
  }, [limit, allPosts])

  if (loading) {
    return <BlogPostsSkeleton count={limit || 3} />
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>오류 발생</AlertTitle>
        <AlertDescription>
          {error}
          <Button
            variant="link"
            className="p-0 h-auto font-normal text-destructive-foreground underline ml-2"
            onClick={fetchPosts}
          >
            다시 시도
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (allPosts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">블로그 포스트가 없습니다</p>
        <Button onClick={fetchPosts} variant="outline" className="mt-4">
          다시 시도
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-muted-foreground">
          총 <span className="font-medium">{allPosts.length}</span>개의 포스트
        </div>
        <Button variant="outline" size="icon" onClick={fetchPosts} title="새로고침">
          <RefreshCw className="h-4 w-4" />
          <span className="sr-only">새로고침</span>
        </Button>
      </div>

      <div className="space-y-8">
        {posts.map((post, index) => (
          <div key={post.id}>
            {post.thumbnail && (
              <div className="mb-3 aspect-video overflow-hidden rounded-md">
                <LazyImage
                  src={post.thumbnail}
                  alt={post.title}
                  width={600}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="group">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  <span>{post.date}</span>
                </div>
                {post.readingTime && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>{post.readingTime}</span>
                  </div>
                )}
              </div>

              <Link
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group-hover:text-primary transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2 group-hover:underline">{post.title}</h3>
              </Link>

              <p className="text-muted-foreground mb-3 line-clamp-2">{post.summary}</p>

              <Link
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                <span>자세히 보기</span>
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>

            {index < posts.length - 1 && <Separator className="mt-6" />}
          </div>
        ))}
      </div>

      {showViewMore && allPosts.length > limit! && (
        <div className="text-center pt-8">
          <Button asChild variant="outline">
            <Link href="/blog">모든 블로그 포스트 보기</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

function BlogPostsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-8">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-7 w-4/5 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-5/6 mb-3" />
          <Skeleton className="h-4 w-24" />

          {index < count - 1 && <Separator className="mt-6" />}
        </div>
      ))}
    </div>
  )
}

// 예시 데이터
function getExamplePosts() {
  return [
    {
      id: "1",
      title: "React 컴포넌트 최적화하기",
      summary: "React 애플리케이션의 성능을 향상시키기 위한 다양한 최적화 기법에 대해 알아봅니다.",
      date: "2023-05-15",
      tags: ["React", "성능"],
      url: "https://velog.io/@tuosm9390/react-optimization",
      readingTime: "8분",
      thumbnail: "https://example.com/thumbnail1.jpg",
    },
    {
      id: "2",
      title: "TypeScript로 타입 안전성 확보하기",
      summary: "TypeScript를 사용하여 JavaScript 코드의 타입 안전성을 높이는 방법에 대해 설명합니다.",
      date: "2023-04-20",
      tags: ["TypeScript", "JavaScript"],
      url: "https://velog.io/@tuosm9390/typescript-safety",
      readingTime: "6분",
      thumbnail: "https://example.com/thumbnail2.jpg",
    },
    {
      id: "3",
      title: "Next.js 13의 새로운 기능",
      summary: "Next.js 13에서 추가된 App Router, Server Components 등 새로운 기능에 대해 살펴봅니다.",
      date: "2023-03-10",
      tags: ["Next.js", "React"],
      url: "https://velog.io/@tuosm9390/nextjs-13-features",
      readingTime: "10분",
      thumbnail: "https://example.com/thumbnail3.jpg",
    },
    {
      id: "4",
      title: "CSS Grid 레이아웃 마스터하기",
      summary: "CSS Grid를 사용하여 복잡한 레이아웃을 쉽게 구현하는 방법에 대해 알아봅니다.",
      date: "2023-02-05",
      tags: ["CSS", "레이아웃"],
      url: "https://velog.io/@tuosm9390/css-grid-mastery",
      readingTime: "7분",
      thumbnail: "https://example.com/thumbnail4.jpg",
    },
    {
      id: "5",
      title: "JavaScript 비동기 프로그래밍",
      summary: "Promise, async/await를 활용한 JavaScript 비동기 프로그래밍 패턴에 대해 설명합니다.",
      date: "2023-01-15",
      tags: ["JavaScript", "비동기"],
      url: "https://velog.io/@tuosm9390/js-async-programming",
      readingTime: "9분",
      thumbnail: "https://example.com/thumbnail5.jpg",
    },
  ]
}
