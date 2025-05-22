export interface Project {
  id: string
  title: string
  description: string
  thumbnail: string
  technologies: string[]
  demoUrl?: string
  githubUrl?: string
  features: string[]
  longDescription: string
  images: string[]
  date: string
  type: "company" | "personal" // 프로젝트 타입 필드 추가
}

export const projects: Project[] = [
  {
    id: "portfolio-website",
    title: "포트폴리오 웹사이트",
    description: "Next.js와 Tailwind CSS를 사용하여 개발한 개인 포트폴리오 웹사이트입니다.",
    thumbnail: "/placeholder.svg?height=300&width=600",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://portfolio.example.com",
    githubUrl: "https://github.com/tuosm9390/portfolio",
    features: ["반응형 디자인", "다크 모드 지원", "블로그 통합", "프로젝트 쇼케이스", "연락처 폼"],
    longDescription:
      "이 포트폴리오 웹사이트는 Next.js 15와 App Router를 사용하여 개발되었습니다. Tailwind CSS를 활용하여 반응형 디자인을 구현하였으며, 다크 모드를 지원합니다. 블로그 섹션에서는 Velog RSS 피드를 통해 작성한 기술 블로그 글을 자동으로 가져와 표시합니다. 프로젝트 섹션에서는 개발한 다양한 프로젝트를 소개하고, 연락처 폼을 통해 방문자가 메시지를 보낼 수 있습니다.",
    images: [
      "/placeholder.svg?height=400&width=800",
      "/placeholder.svg?height=400&width=800",
      "/placeholder.svg?height=400&width=800",
    ],
    date: "2023-12-15",
    type: "personal",
  },
  {
    id: "admin-project",
    title: "미디어 플랫폼 제작예산 관리 시스템",
    description: "React와 Next.js를 사용하여 개발에 참여한 프로젝트입니다.",
    thumbnail: "/hiblocks_thumbnail.jpg?height=300&width=600",
    technologies: ["React", "Next.js", "Zustand", "MySql", "Spring", "Github"],
    demoUrl: "",
    githubUrl: "",
    features: [
      "드래그 앤 드롭",
      "데이터 검색 및 필터링",
      "데이터 임시저장",
      "데이터 엑셀 추출",
      "관리자 대시보드 및 차트",
    ],
    longDescription:
      "넷플릭스와 업무 협약을 통해 진행했던 프로젝트입니다. 하나의 플랫폼에서 예산관리, 정산관리, 자금계획서, 비용보고서 등을 작성부터 회계작업까지 모든 과정을 제작사 및 투자사와 함께 공유 및 처리할 수 있도록 합니다.",
    images: [
      "/placeholder.svg?height=400&width=800",
      "/placeholder.svg?height=400&width=800",
      "/placeholder.svg?height=400&width=800",
    ],
    date: "2023-08 ~ 2025-03",
    type: "company",
  },
  {
    id: "binance-clone",
    title: "바이낸스 거래 페이지 클론",
    description: "Vue.js와 Firebase를 사용하여 개발한 실시간 태스크 관리 애플리케이션입니다.",
    thumbnail: "/placeholder.svg?height=300&width=600",
    technologies: ["Vue.js", "Firebase", "Vuex", "Tailwind CSS"],
    demoUrl: "https://taskmanager.example.com",
    githubUrl: "https://github.com/tuosm9390/task-manager",
    features: ["실시간 데이터 동기화", "드래그 앤 드롭 인터페이스", "태스크 우선순위 설정", "마감일 알림", "협업 기능"],
    longDescription:
      "이 태스크 관리 애플리케이션은 Vue.js와 Firebase를 사용하여 개발되었습니다. Firebase Realtime Database를 활용하여 실시간 데이터 동기화를 구현하였으며, Vuex를 사용하여 상태 관리를 효율적으로 처리하였습니다. 드래그 앤 드롭 인터페이스를 통해 사용자가 직관적으로 태스크를 관리할 수 있으며, 마감일이 다가오는 태스크에 대한 알림 기능을 제공합니다. 또한 팀 멤버를 초대하여 프로젝트를 함께 관리할 수 있는 협업 기능을 갖추고 있습니다.",
    images: [
      "/placeholder.svg?height=400&width=800",
      "/placeholder.svg?height=400&width=800",
      "/placeholder.svg?height=400&width=800",
    ],
    date: "2023-06-10",
    type: "personal",
  },
  {
    id: "pokemon",
    title: "포켓몬 도감",
    description: "React와 OpenWeather API를 사용하여 개발한 날씨 정보 대시보드입니다.",
    thumbnail: "/placeholder.svg?height=300&width=600",
    technologies: ["React", "Chart.js", "OpenWeather API", "Styled Components"],
    demoUrl: "https://weather.example.com",
    githubUrl: "https://github.com/tuosm9390/weather-dashboard",
    features: ["현재 날씨 정보", "5일 예보", "날씨 차트 시각화", "위치 기반 검색", "즐겨찾기 위치 저장"],
    longDescription:
      "이 날씨 대시보드는 React와 OpenWeather API를 사용하여 개발되었습니다. 사용자의 현재 위치 또는 검색한 위치의 날씨 정보를 실시간으로 제공하며, 5일 예보를 통해 앞으로의 날씨 변화를 확인할 수 있습니다. Chart.js를 활용하여 온도, 습도, 기압 등의 데이터를 시각적으로 표현하였으며, Styled Components를 사용하여 날씨 상태에 따라 UI가 변화하도록 구현하였습니다. 또한 자주 확인하는 위치를 즐겨찾기에 저장하여 빠르게 접근할 수 있는 기능을 제공합니다.",
    images: [
      "/placeholder.svg?height=400&width=800",
      "/placeholder.svg?height=400&width=800",
      "/placeholder.svg?height=400&width=800",
    ],
    date: "2023-03-05",
    type: "personal",
  },
  {
    id: "social-media-app",
    title: "맛집 앱",
    description: "React와 Firebase를 사용하여 개발한 맛집 앱입니다.",
    thumbnail: "/placeholder.svg?height=300&width=600",
    technologies: ["React Native", "Firebase", "Redux", "Expo"],
    demoUrl: "https://next-map-topaz.vercel.app/",
    githubUrl: "https://github.com/tuosm9390/social-media-app",
    features: ["카카오 지도 API를 이용한 지도표시", "전역 상태관리(Recoil)", "React Query를 사용한 데이터 CRUD", "무한 스크롤(useInfiniteQuery)", "Next.js API Route를 이용한 백엔드 API 작성", "Next-auth를 사용한 사용자 인증", "Prisma, Supabase를 이용한 데이터 관리 및 마이그레이션"],
    longDescription:
      "이 소셜 미디어 애플리케이션은 React Native와 Firebase를 사용하여 개발된 크로스 플랫폼 모바일 앱입니다. Firebase Authentication을 통해 사용자 인증을 구현하였으며, Firestore를 사용하여 게시물, 댓글, 사용자 프로필 등의 데이터를 관리합니다. Firebase Cloud Messaging을 활용하여 실시간 알림 시스템을 구축하였으며, Firebase Storage를 통해 이미지 및 동영상 업로드 기능을 제공합니다. 또한 Redux를 사용하여 애플리케이션의 상태를 효율적으로 관리하고, Expo를 활용하여 개발 및 배포 과정을 간소화하였습니다.",
    images: [
      "/placeholder.svg?height=400&width=800",
      "/placeholder.svg?height=400&width=800",
      "/placeholder.svg?height=400&width=800",
    ],
    date: "2024-03",
    type: "personal",
  },
  {
    id: "twitter-app",
    title: "트위터 앱",
    description: "React와 firebase를 사용하여 개발한 트위터 앱입니다.",
    thumbnail: "/placeholder.svg?height=300&width=600",
    technologies: ["React", "Firebase", "recoil", "Context API", "vercel"],
    demoUrl: "https://react-twitter-five.vercel.app/",
    githubUrl: "https://github.com/tuosm9390/fitness-tracker",
    features: ["전역 상태관리(Recoil, Context API)", "Firebase를 사용한 데이터관리", , "실시간 동기화", "Firebase auth 사용자 인증", "vercel 배포"],
    longDescription:
      "이 피트니스 트래커는 Angular와 Spring Boot를 사용하여 개발된 웹 애플리케이션입니다. 사용자가 운동 활동을 기록하고 추적할 수 있으며, 개인 목표를 설정하고 진행 상황을 모니터링할 수 있습니다. Spring Boot 백엔드는 RESTful API를 제공하며, MySQL 데이터베이스를 사용하여 사용자 데이터를 저장합니다. Chart.js를 활용하여 운동 통계 및 진행 상황을 시각적으로 표현하였으며, Bootstrap을 사용하여 반응형 디자인을 구현하였습니다. 또한 사용자가 자신의 성과를 소셜 미디어에 공유할 수 있는 기능을 제공합니다.",
    images: [
      "/placeholder.svg?height=400&width=800",
      "/placeholder.svg?height=400&width=800",
      "/placeholder.svg?height=400&width=800",
    ],
    date: "2024-02",
    type: "personal",
  },
  {
    id: "blog-app",
    title: "블로그 앱",
    description: "React와 firebase를 사용하여 개발한 블로그 앱입니다.",
    thumbnail: "/placeholder.svg?height=300&width=600",
    technologies: ["React", "Firebase", "Context API", "vercel"],
    demoUrl: "http://fastcampus-react-blog-4de58.web.app",
    githubUrl: "https://github.com/tuosm9390/fitness-tracker",
    features: ["전역 상태관리(Context API)", "사용자 권한관리", "테마관리", "Firebase를 사용한 데이터관리", "실시간 동기화", "Firebase auth 사용자 인증", "vercel 배포"],
    longDescription:
      "이 피트니스 트래커는 Angular와 Spring Boot를 사용하여 개발된 웹 애플리케이션입니다. 사용자가 운동 활동을 기록하고 추적할 수 있으며, 개인 목표를 설정하고 진행 상황을 모니터링할 수 있습니다. Spring Boot 백엔드는 RESTful API를 제공하며, MySQL 데이터베이스를 사용하여 사용자 데이터를 저장합니다. Chart.js를 활용하여 운동 통계 및 진행 상황을 시각적으로 표현하였으며, Bootstrap을 사용하여 반응형 디자인을 구현하였습니다. 또한 사용자가 자신의 성과를 소셜 미디어에 공유할 수 있는 기능을 제공합니다.",
    images: [
      "/placeholder.svg?height=400&width=800",
      "/placeholder.svg?height=400&width=800",
      "/placeholder.svg?height=400&width=800",
    ],
    date: "2024-02",
    type: "personal",
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id)
}

// 프로젝트 타입별로 필터링하는 함수 추가
export function getProjectsByType(type: "company" | "personal"): Project[] {
  return projects.filter((project) => project.type === type)
}
