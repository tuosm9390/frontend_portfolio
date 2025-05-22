"use client"

import type React from "react"
import { redirect } from "next/navigation"
import { useState } from "react"
import { Github, Mail, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  redirect("/about")

  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 실제 구현에서는 이 부분을 API 호출로 대체해야 합니다
      // const response = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // })

      // 성공 메시지 표시
      toast({
        title: "메시지가 전송되었습니다",
        description: "빠른 시일 내에 답변 드리겠습니다.",
      })

      // 폼 초기화
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "오류가 발생했습니다",
        description: "메시지 전송에 실패했습니다. 다시 시도해 주세요.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">연락처</h1>
        <p className="text-xl text-muted-foreground">프로젝트 문의나 궁금한 점이 있으시면 연락해 주세요</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>연락 방법</CardTitle>
            <CardDescription>아래 방법으로 연락하실 수 있습니다</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">전화번호</h3>
                <p className="text-sm text-muted-foreground">010-9121-8397</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">이메일</h3>
                <p className="text-sm text-muted-foreground">tuosm123@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Github className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">GitHub</h3>
                <p className="text-sm text-muted-foreground">github.com/tuosm9390</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>메시지 보내기</CardTitle>
            <CardDescription>아래 양식을 작성하여 메시지를 보내주세요</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">제목</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="문의 제목"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">메시지</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="메시지 내용을 입력해주세요"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  "전송 중..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> 메시지 보내기
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
