"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Github, Mail, Phone, Send, BookOpen, Users, Briefcase, GraduationCap, Heart, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ProfileImage } from "@/components/profile-image"
import { useToast } from "@/hooks/use-toast"

// 자기소개 데이터
const about = [
  {
    title: "자기소개",
    description: "저는 책임감이 강하고 공동의 목표를 우선으로 생각합니다. \n신입으로 구성된 팀에서 경력을 바탕으로 팀장을 맡아 프로젝트 진행 속도를 약 20% 향상시키고, \n팀 분위기를 주도적으로 개선하는 등 맡을 일의 책임감을 발휘하였습니다. \n\n공동의 목표 달성을 위해 팀의 공통된 문제를 주도적으로 개선했으며, 중복 API 호출 문제를 최적화해 성능을 향상시키거나, \n프로젝트 리팩토링 등 협력에 적극적으로 기여했습니다. \n\n부족한 실력은 학습과 몸으로 부딪혀가며 채워나갈 자신이 있습니다. \n회사에 기여할 수 있는 많은 부분에서 노력하는 인재가 되고자 합니다. \n\n즐거움과 행복을 인생의 모토로 삼고 있으며, 저와 주변 모든 이들이 행복하기를 노력하고 기도하고 있습니다.",
  },
]

// 경력 데이터
const experiences = [
  {
    title: "협력사 솔루션 어드민 페이지 개발",
    company: "(주)금성인터내셔널",
    period: "2023년 8월 - 2025년 3월",
    description: "협력사 솔루션 어드민 페이지 개발 \n솔루션에 가입하는 회원을 포함한 데이터를 관리하고, 사용하는 서비스를 개발 \n\n기존 프로젝트 진행 속도 대비 100% 향상 \n- 기존 프로젝트 교체 인원으로 투입 \n- 서비스 개발 속도 및 안정성 100% 향상(기간: 4개월 → 2개월 / 오류사항: 80% 감소) \n\n테이블을 통한 데이터 시각화 \n- MUI DataGrid를 사용하여 테이블로 데이터 표시 \n\n프로젝트 리팩토링 및 성능 개선 \n- 프로젝트 규모가 커짐에 따라 리팩토링 진행 \n- 컴포넌트와 페이지 별 폴더 구조 정립 \n-  레이아웃 컴포넌트를 통해 재사용에 용이하도록 수정 \n\nAPI 호출 성능 개선 \n- 재사용성을 위해 Userquery를 사용하여 템플릿 제작 \n- refetch / loading / error / fetchNextPage 등의 기능을 통해 효율적인 처리 \n- Mutations 기능을 통해 patch와 post 구문을 처리하도록 수정 \n\n복잡한 상태관리 툴 변경 \n- Redux를 사용한 상태관리를 Zustand로 변경 \n- 프로젝트 규모에 비해 Redux로 관리하는 것은 불필요하다고 판단",
    skills: ["React", "Next.js", "Zustand", ,"React-Query", "MUI"],
  },
  {
    title: "미디어 플랫폼 제작예산 관리 시스템 개발",
    company: "(주)하이블럭스",
    period: "2022년 3월 - 2023년 4월",
    description: "예산관리보고서, 정산관리 등 컨텐츠 제작에 필요한 예산을 관리하는 솔루션을 개발하였습니다. \n\n레거시 코드 리빌딩 \n- 기존 JQuery로 개발되어 있던 레거시 코드를 React 프로젝트에 맞게 수정 \n- Drag and Drop 기능 개발 \n- react-beautiful-dnd 라이브러리를 사용하였으나 프로젝트 환경과 맞지 않아 바닐라 JS로 구현 \n\n대시보드 화면을 통한 데이터 시각화 \n- 컨텐츠 별 제작 예산에 관한 합산 및 통계를 차트로 표시 \n- 구글 차트를 사용하여 막대차트와 도넛형 차트를 구현 \n\n데이터 엑셀 추출 \n- 테이블 형태로 표시된 데이터를 엑셀로 추출하는 기능 개발 (백엔드 보조) \n- 컬럼명 매칭과 데이터 변형을 작업 \n\n사내 랜딩페이지 개발 \n기업의 비즈니스와 비전을 소개 \n\n- React Swiper 라이브러리 활용하여 슬라이드 메뉴 구현 \n- sanity 솔루션을 사용하여 회사 관련 기사를 Database로 관리 \n-  instagram api 사용하여 회사 계정의 게시물 표시",
    skills: ["React", "Next.js", "JavaScript", "jQuery", "Spring", "sanity", "React Swiper"],
  },
]

// 학력 데이터
const education = [
  {
    degree: "컴퓨터공학",
    school: "국가평생교육진흥원(학점은행제)",
    period: "2020년 4월 - 진행중",
    description: "124학점 이수중 \n방통대 시간제학습을 통한 잔여 18학점 이수 예정(25년 2학기, 26년 1학기)",
  },
  {
    degree: "전기전자제어공학부",
    school: "한경대학교(4년제)",
    period: "2012년 3월 - 2015년 7월(중퇴)",
    description: "",
    // gpa: "2.7/4.5",
  },
]

// 책 데이터
const books = [
  {
    title: "클린 코드",
    author: "로버트 C. 마틴",
    cover: "/placeholder.svg?height=200&width=150",
    description: "더 나은 코드를 작성하는 방법에 대한 통찰력을 제공하는 책.",
  },
  {
    title: "리팩터링",
    author: "마틴 파울러",
    cover: "/placeholder.svg?height=200&width=150",
    description: "코드 품질을 개선하는 리팩터링 기법을 소개하는 책.",
  },
  {
    title: "You Don't Know JS",
    author: "카일 심슨",
    cover: "/placeholder.svg?height=200&width=150",
    description: "JavaScript의 깊은 이해를 돕는 시리즈.",
  },
]

// 모임 활동 데이터
const communities = [
  {
    name: "프론트엔드 개발자 모임",
    role: "정회원",
    period: "2022년 1월 - 현재",
    description: "매월 최신 프론트엔드 기술 트렌드를 공유하고 토론하는 모임에 참여.",
  },
  {
    name: "오픈 소스 컨트리뷰터",
    role: "기여자",
    period: "2021년 6월 - 현재",
    description: "다양한 오픈 소스 프로젝트에 기여하며 협업 경험을 쌓고 있습니다.",
  },
  {
    name: "코딩 멘토링",
    role: "멘토",
    period: "2022년 9월 - 현재",
    description: "프로그래밍을 배우는 학생들에게 멘토링을 제공하는 봉사 활동에 참여.",
  },
]

export default function AboutPage() {
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
      {/* 프로필 섹션 */}
      <section className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-16">
        <div className="w-full max-w-xs">
          <ProfileImage containerClassName="w-64 h-64 mx-auto" />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold tracking-tight mb-4">김상찬</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Briefcase className="h-3 w-3" /> 프론트엔드 개발자
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> 의정부시, 경기도, 대한민국
            </Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            안녕하세요, 책임감이 강하고, 공동의 목표를 우선시하는 3년차 개발자입니다. <br/>
            새로운 기술을 배우고 적용하는 것을 좋아하며, 깔끔하고 유지보수가 용이한 코드를 작성하기 위해 노력합니다. <br/>
            팀 협업을 통해 함께 성장하는 것을 중요하게 생각합니다.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" size="sm">
              <Link href="https://github.com/tuosm9390" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="mailto:tuosm123@gmail.com">
                <Mail className="mr-2 h-4 w-4" /> tuosm123@gmail.com
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="tel:+821091218397">
                <Phone className="mr-2 h-4 w-4" /> +82 10 9121 8397
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 탭 섹션 */}
      <Tabs defaultValue="about" className="mb-16">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
          <TabsTrigger value="about" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" /> 자기소개
          </TabsTrigger>
          <TabsTrigger value="career" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" /> 경력
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" /> 학력
          </TabsTrigger>
          <TabsTrigger value="books" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> 읽는 책
          </TabsTrigger>
          <TabsTrigger value="communities" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> 모임 활동
          </TabsTrigger>
        </TabsList>

        {/* 자기소개 탭 */}
        <TabsContent value="about">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">자기소개</h2>
            {about.map((info, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{info.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 whitespace-pre-line">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 경력 탭 */}
        <TabsContent value="career">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">경력 사항</h2>
            {experiences.map((exp, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{exp.company}</CardTitle>
                      <CardDescription>{exp.title}</CardDescription>
                    </div>
                    <Badge variant="outline">{exp.period}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 whitespace-pre-line">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 학력 탭 */}
        <TabsContent value="education">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">학력 사항</h2>
            {education.map((edu, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{edu.school}</CardTitle>
                      <CardDescription>{edu.degree}</CardDescription>
                    </div>
                    <Badge variant="outline">{edu.period}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">{edu.description}</p>
                  {edu.gpa && <p className="text-sm font-medium">학점: {edu.gpa}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 읽는 책 탭 */}
        <TabsContent value="books">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">읽는 책</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {books.map((book, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row gap-4 p-6">
                    <div className="w-full md:w-1/3 flex justify-center">
                      <Image
                        src={book.cover || "/placeholder.svg"}
                        alt={book.title}
                        width={150}
                        height={200}
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">저자: {book.author}</p>
                      <p className="text-sm">{book.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* 모임 활동 탭 */}
        <TabsContent value="communities">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">모임 활동</h2>
            <div className="space-y-6">
              {communities.map((community, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{community.name}</CardTitle>
                        <CardDescription>{community.role}</CardDescription>
                      </div>
                      <Badge variant="outline">{community.period}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{community.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* 삶의 방향 섹션 */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" /> 삶의 방향
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="prose dark:prose-invert max-w-none">
              <p>
                저는 기술을 통해 사람들의 삶을 더 편리하고 풍요롭게 만드는 것을 목표로 합니다. 단순히 코드를 작성하는
                것을 넘어, 사용자의 필요와 경험을 깊이 이해하고 그에 맞는 솔루션을 제공하는 개발자가 되고자 합니다.
              </p>
              <p>
                지속적인 학습과 성장을 통해 기술적 역량을 키우는 것은 물론, 팀원들과의 원활한 소통과 협업을 통해 함께
                성장하는 문화를 만들어가고 싶습니다. 또한 개발 커뮤니티에 기여하고 지식을 공유함으로써 더 넓은 개발자
                생태계에 긍정적인 영향을 미치고자 합니다.
              </p>
              <p>
                더 나아가 어느 분야에서 일을 하던지 긍정적인 영향을 미치고 싶습니다.
                서비스를 사용하거나, 제공받는 모든 이들이 만족할 수 있는 그런 일을 하고 싶습니다. 그러기 위해 계속해서 계발하고 발전해 나갈 것이며, 깊은 이해를 바탕으로 시각을 넓히고 키워나가려고 하고 있습니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 연락처 섹션 */}
      <section>
        <h2 className="text-2xl font-bold mb-8">연락하기</h2>
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
      </section>
    </div>
  )
}
