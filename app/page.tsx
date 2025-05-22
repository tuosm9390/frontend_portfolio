import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BlogPosts } from "@/components/blog-posts"
import { ProfileImage } from "@/components/profile-image"
import { LazyImage } from "@/components/lazy-image"

// 기술 스택 데이터 구조 변경 - 실제 이미지 사용
const skills = [
  { name: "HTML", icon: "/images/skills/HTML.svg" },
  { name: "CSS", icon: "/images/skills/CSS.svg" },
  { name: "JavaScript", icon: "/images/skills/JavaScript.svg" },
  { name: "TypeScript", icon: "/images/skills/TypeScript.svg" },
  { name: "React", icon: "/images/skills/React.svg" },
  { name: "Next.js", icon: "/images/skills/NextJS-Light.svg" },
  { name: "Tailwind CSS", icon: "/images/skills/TailwindCSS-Light.svg" },
  { name: "Spring", icon: "/images/skills/Spring-Light.svg" },
  { name: "MySQL", icon: "/images/skills/MySQL-Light.svg" },
  { name: "Prisma", icon: "/images/skills/Prisma.svg" },
  { name: "MaterialUI", icon: "/images/skills/MaterialUI-Light.svg" },
  { name: "GitHub", icon: "/images/skills/Github-Light.svg" },
  { name: "Figma", icon: "/images/skills/Figma-Light.svg" },
  { name: "Discord", icon: "/images/skills/Discord.svg" },
  { name: "Vercel", icon: "/images/skills/Vercel-Light.svg" },
]

export default function Home() {
  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <section className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            안녕하세요, 프론트엔드 개발자 <br />
            <span className="text-primary">김상찬</span>입니다
          </h1>
          <div className="text-muted-foreground space-y-3">
            <p>
              <b className="text-white">책임감</b>이 강하고 <b className="text-white">공동의 목표</b>를 우선으로
              생각합니다. <br />
              신입으로 구성된 팀에서 경력을 바탕으로 팀장을 맡아 프로젝트 진행 속도를 약 20% 향상시키고, 팀 분위기를
              주도적으로 개선하는 등 맡은 일의 <b className="text-white">책임감을 발휘하였고,</b>
            </p>
            <p>
              <b className="text-white">공동의 목표 달성</b>을 위해 팀의 공통된 문제를 주도적으로 개선했으며, <br />
              본인의 업무가 아니어도 업무를 분담하여 처리하는 등 협력에 적극적으로 기여했습니다.
            </p>
            <p>
              부족한 실력은 학습과 몸으로 부딪혀가며 채워나가겠습니다. <br />
              회사에 기여할 수 있는 모든 부분에서 노력하는 인재가 되고자 합니다.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Button asChild size="lg">
              <Link href="/projects">프로젝트 보기</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">연락하기</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <ProfileImage containerClassName="w-72 h-72 md:w-80 md:h-80" />
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-3xl font-bold tracking-tight mb-8">기술 스택</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {skills.map((skill) => (
            <Card
              key={skill.name}
              className="border border-primary/20 hover:border-primary/50 transition-all duration-300 group overflow-hidden"
            >
              <CardContent className="flex flex-col items-center justify-center p-6 gap-4">
                <div className="w-16 h-16 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  {/* 기존 Image 컴포넌트를 LazyImage로 대체 */}
                  <LazyImage
                    src={skill.icon || "/placeholder.svg"}
                    alt={`${skill.name} 로고`}
                    width={64}
                    height={64}
                    className="object-contain transition-all duration-300 group-hover:rotate-12"
                  />
                </div>
                <span className="text-lg font-medium text-center transition-all duration-300 group-hover:text-primary">
                  {skill.name}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-3xl font-bold tracking-tight mb-8">최근 블로그 글</h2>
        <div className="relative">
          <BlogPosts limit={3} />
        </div>
      </section>
    </div>
  )
}
