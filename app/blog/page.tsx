import type { Metadata } from "next"
import BlogPageClient from "./BlogPageClient"

export const metadata: Metadata = {
  title: "블로그 | 계발자 포트폴리오",
  description: "프론트엔드 개발자 블로그 글 모음",
}

export default function BlogPage() {
  return <BlogPageClient />
}
