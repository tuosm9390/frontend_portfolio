"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github, Menu, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "홈", href: "/" },
  { name: "소개", href: "/about" }, // "연락처"에서 "소개"로 변경
  { name: "프로젝트", href: "/projects" },
  { name: "블로그", href: "/blog" },
]

export function Header() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  // 모바일 메뉴에서 링크 클릭 핸들러 추가
  const handleNavClick = (href: string) => {
    // 현재 페이지와 다른 경우에만 스크롤 조정
    if (pathname !== href) {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">계발자</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground/80",
                pathname === item.href ? "text-foreground" : "text-foreground/60",
              )}
              onClick={() => handleNavClick(item.href)}
            >
              {item.name}
            </Link>
          ))}
          <Link href="https://github.com/tuosm9390" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">테마 변경</span>
          </Button>
        </nav>
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">메뉴 열기</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground/80",
                    pathname === item.href ? "text-foreground" : "text-foreground/60",
                  )}
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="https://github.com/tuosm9390"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start px-2"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="mr-2 h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="mr-2 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span>{theme === "dark" ? "light" : "dark"}</span>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
