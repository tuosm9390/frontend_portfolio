import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, ExternalLink, Github, Briefcase, Code } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getProjectById } from "@/lib/projects-data"
import { LazyImage } from "@/components/lazy-image"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectById(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="container py-12">
      <Link
        href="/projects"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        모든 프로젝트
      </Link>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="flex items-center gap-1">
              {project.type === "company" ? (
                <>
                  <Briefcase className="h-3 w-3" /> 기업 프로젝트
                </>
              ) : (
                <>
                  <Code className="h-3 w-3" /> 개인 프로젝트
                </>
              )}
            </Badge>
          </div>

          <h1 className="text-4xl font-bold tracking-tight mb-4">{project.title}</h1>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              <span>{project.date}</span>
            </div>
          </div>

          <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
            <LazyImage
              src={project.thumbnail || "/placeholder.svg"}
              alt={project.title}
              width={800}
              height={400}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          <div className="prose dark:prose-invert max-w-none mb-8">
            <h2>프로젝트 소개</h2>
            <p>{project.longDescription}</p>

            <h2>주요 기능</h2>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <h2 className="text-2xl font-bold mb-4">프로젝트 스크린샷</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {project.images.map((image, index) => (
              <div key={index} className="aspect-video overflow-hidden rounded-lg">
                <LazyImage
                  src={image || "/placeholder.svg"}
                  alt={`${project.title} 스크린샷 ${index + 1}`}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">프로젝트 정보</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">사용 기술</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  {project.demoUrl && (
                    <Button asChild variant="outline" className="w-full justify-start" size="sm">
                      <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        라이브 데모
                      </Link>
                    </Button>
                  )}

                  {project.githubUrl && (
                    <Button asChild variant="outline" className="w-full justify-start" size="sm">
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        소스 코드
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
