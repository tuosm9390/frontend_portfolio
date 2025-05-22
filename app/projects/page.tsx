"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ExternalLink, Github, Briefcase, Code, Filter, X } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { getProjectsByType, type Project } from "@/lib/projects-data"
import { LazyImage } from "@/components/lazy-image"
import { cn } from "@/lib/utils"

export default function ProjectsPage() {
  const router = useRouter()

  // 프로젝트를 타입별로 분류
  const companyProjects = getProjectsByType("company")
  const personalProjects = getProjectsByType("personal")
  const allProjects = [...companyProjects, ...personalProjects]

  // 모든 기술 스택 추출 및 중복 제거
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>()
    allProjects.forEach((project) => {
      project.technologies.forEach((tech) => techSet.add(tech))
    })
    return Array.from(techSet).sort()
  }, []) // Removed allProjects from the dependency array

  // 필터 상태 관리
  const [selectedTechs, setSelectedTechs] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // 필터링된 프로젝트 목록
  const filteredCompanyProjects = useMemo(() => {
    if (selectedTechs.length === 0) return companyProjects
    return companyProjects.filter((project) => selectedTechs.some((tech) => project.technologies.includes(tech)))
  }, [companyProjects, selectedTechs])

  const filteredPersonalProjects = useMemo(() => {
    if (selectedTechs.length === 0) return personalProjects
    return personalProjects.filter((project) => selectedTechs.some((tech) => project.technologies.includes(tech)))
  }, [personalProjects, selectedTechs])

  // 기술 스택 토글 핸들러
  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) => (prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]))
  }

  // 필터 초기화
  const clearFilters = () => {
    setSelectedTechs([])
  }

  // 프로젝트 카드 클릭 핸들러
  const handleProjectClick = (projectId: string, e: React.MouseEvent<HTMLDivElement>) => {
    // 이벤트 타겟이 a 태그나 버튼이 아닌 경우에만 라우팅 처리
    if (
      !(e.target instanceof HTMLAnchorElement) &&
      !(e.target instanceof HTMLButtonElement) &&
      !(e.target instanceof SVGElement) &&
      !e.target?.closest("a") &&
      !e.target?.closest("button")
    ) {
      // 페이지 이동 전에 스크롤을 맨 위로 이동
      window.scrollTo({
        top: 0,
        behavior: "instant",
      })
      router.push(`/projects/${projectId}`)
    }
  }

  // 프로젝트 카드 렌더링 함수
  const renderProjectCard = (project: Project) => (
    <div
      key={project.id}
      className="block group transition-transform hover:-translate-y-1 duration-300 cursor-pointer"
      onClick={(e) => handleProjectClick(project.id, e)}
    >
      <Card className="overflow-hidden flex flex-col h-full border-primary/20 hover:border-primary/50 transition-colors">
        <div className="overflow-hidden">
          <div className="aspect-video w-full overflow-hidden">
            <LazyImage
              src={project.thumbnail || "/placeholder.svg"}
              alt={project.title}
              width={600}
              height={300}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-2 flex-1">
          <p className="text-muted-foreground line-clamp-2 min-h-[3rem]">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.technologies.map((tech) => (
              <Badge
                key={tech}
                variant={selectedTechs.includes(tech) ? "default" : "secondary"}
                className={selectedTechs.includes(tech) ? "animate-pulse" : ""}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Link href={`/projects/${project.id}`} passHref>
            <Button variant="default" size="sm">
              자세히 보기
            </Button>
          </Link>
          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-9 w-9"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-9 w-9"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-5 w-5" />
                <span className="sr-only">데모</span>
              </a>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )

  // 필터 결과가 없을 때 표시할 컴포넌트
  const NoResults = () => (
    <div className="col-span-full py-12 text-center">
      <p className="text-muted-foreground mb-4">선택한 기술 스택을 사용한 프로젝트가 없습니다.</p>
      <Button variant="outline" onClick={clearFilters}>
        필터 초기화
      </Button>
    </div>
  )

  return (
    <div className="container py-12">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">프로젝트</h1>
        <p className="text-xl text-muted-foreground">개발한 프로젝트 목록입니다</p>
      </div>

      {/* 필터 섹션 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            기술 스택 필터
            {selectedTechs.length > 0 && (
              <Badge variant="default" className="ml-2">
                {selectedTechs.length}
              </Badge>
            )}
          </Button>

          {selectedTechs.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
              <X className="h-4 w-4 mr-2" />
              필터 초기화
            </Button>
          )}
        </div>

        {showFilters && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {allTechnologies.map((tech) => (
                  <div key={tech} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tech-${tech}`}
                      checked={selectedTechs.includes(tech)}
                      onCheckedChange={() => toggleTech(tech)}
                    />
                    <label
                      htmlFor={`tech-${tech}`}
                      className={cn(
                        "text-sm cursor-pointer",
                        selectedTechs.includes(tech) ? "font-medium text-primary" : "text-muted-foreground",
                      )}
                    >
                      {tech}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {selectedTechs.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedTechs.map((tech) => (
              <Badge key={tech} variant="default" className="flex items-center gap-1 px-3 py-1">
                {tech}
                <button
                  onClick={() => toggleTech(tech)}
                  className="ml-1 rounded-full hover:bg-primary-foreground/20 p-0.5"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">{tech} 필터 제거</span>
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* 기업 프로젝트 섹션 */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">기업 프로젝트</h2>
          {selectedTechs.length > 0 && <Badge variant="outline">{filteredCompanyProjects.length}개 표시 중</Badge>}
        </div>
        <p className="text-muted-foreground mb-8">
          기업에서 진행한 프로젝트입니다. 실무 경험과 협업을 통해 완성한 프로젝트를 소개합니다.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompanyProjects.length > 0 ? filteredCompanyProjects.map(renderProjectCard) : <NoResults />}
        </div>
      </section>

      <Separator className="my-12" />

      {/* 개인 프로젝트 섹션 */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Code className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">개인 프로젝트</h2>
          {selectedTechs.length > 0 && <Badge variant="outline">{filteredPersonalProjects.length}개 표시 중</Badge>}
        </div>
        <p className="text-muted-foreground mb-8">
          개인적으로 진행한 토이 프로젝트입니다. 새로운 기술을 학습하고 실험하기 위해 개발한 프로젝트를 소개합니다.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPersonalProjects.length > 0 ? filteredPersonalProjects.map(renderProjectCard) : <NoResults />}
        </div>
      </section>
    </div>
  )
}
