import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">페이지를 찾을 수 없습니다</h2>
      <p className="text-muted-foreground mb-8 max-w-md">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
      <Button asChild>
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  )
}
