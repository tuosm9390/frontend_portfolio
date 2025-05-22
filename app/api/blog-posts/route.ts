import { NextResponse } from "next/server"
import { XMLParser } from "fast-xml-parser"

export async function GET() {
  try {
    // Velog RSS 피드 URL (최신 형식으로 업데이트)
    // 참고: Velog RSS URL 형식이 변경될 수 있으므로 두 가지 형식을 시도합니다
    let rssUrl = "https://v2.velog.io/rss/tuosm9390"
    let response = null
    let fetchError = null

    try {
      response = await fetch(rssUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
        next: { revalidate: 3600 }, // 1시간마다 재검증
      })
    } catch (error) {
      console.log(`첫 번째 RSS URL 요청 실패:`, error)
      fetchError = error
    }

    // 첫 번째 URL이 실패하면 대체 URL 시도
    if (!response || !response.ok) {
      console.log(`첫 번째 RSS URL 실패${response ? ` 상태: ${response.status}` : ""}. 대체 URL 시도...`)
      rssUrl = "https://velog.io/@tuosm9390/rss"
      try {
        response = await fetch(rssUrl, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          },
          next: { revalidate: 3600 },
        })
      } catch (error) {
        console.log(`두 번째 RSS URL 요청 실패:`, error)
        fetchError = error
      }
    }

    if (!response || !response.ok) {
      console.error(`RSS 피드 가져오기 실패${response ? `: ${response.status}` : ""}`)
      throw new Error(
        `RSS 피드를 가져오는데 실패했습니다${response ? ` (${response.status})` : ""}: ${fetchError?.message || "알 수 없는 오류"}`,
      )
    }

    const xml = await response.text()

    // XML 파싱 (오류 처리 강화)
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      isArray: (name) => ["item", "category"].includes(name), // item과 category는 항상 배열로 처리
    })

    let result
    try {
      result = parser.parse(xml)
    } catch (parseError) {
      console.error("XML 파싱 오류:", parseError)
      throw new Error(`RSS 피드 형식을 파싱하는데 실패했습니다: ${parseError.message}`)
    }

    // RSS 피드 구조 검증
    if (!result.rss || !result.rss.channel) {
      console.error("유효하지 않은 RSS 구조:", JSON.stringify(result).substring(0, 200) + "...")
      throw new Error("유효하지 않은 RSS 피드 구조입니다")
    }

    // RSS 피드에서 포스트 추출
    const channel = result.rss.channel
    const items = channel.item || []

    if (items.length === 0) {
      console.log("RSS 피드에서 포스트를 찾을 수 없습니다")
      return NextResponse.json({
        posts: getExamplePosts(),
        message: "RSS 피드에서 포스트를 찾을 수 없어 예시 데이터를 반환합니다",
      })
    }

    const posts = items.map((item, index) => {
      try {
        // 날짜 형식 변환 (오류 처리 추가)
        let formattedDate = "날짜 정보 없음"
        if (item.pubDate) {
          try {
            const pubDate = new Date(item.pubDate)
            formattedDate = `${pubDate.getFullYear()}-${String(pubDate.getMonth() + 1).padStart(2, "0")}-${String(pubDate.getDate()).padStart(2, "0")}`
          } catch (dateError) {
            console.warn("날짜 파싱 오류:", dateError)
          }
        }

        // 태그 추출 (카테고리가 있는 경우)
        let tags = []
        if (item.category && Array.isArray(item.category)) {
          tags = item.category
        } else if (item.category) {
          tags = [item.category]
        } else {
          tags = ["일반"]
        }

        // 요약 생성 (description에서 HTML 태그 제거)
        let summary = item.description || ""
        summary = summary.replace(/<[^>]*>/g, "") // HTML 태그 제거
        summary = summary.substring(0, 200) + (summary.length > 200 ? "..." : "") // 200자로 제한

        // 읽기 시간 계산 (대략적으로 1분당 500자)
        const wordCount = item.description ? item.description.replace(/<[^>]*>/g, "").length : 0
        const readingTime = `${Math.max(1, Math.ceil(wordCount / 500))}분`

        return {
          id: item.guid || String(index),
          title: item.title || "제목 없음",
          summary,
          date: formattedDate,
          tags,
          url: item.link || "#",
          readingTime,
        }
      } catch (itemError) {
        console.error("RSS 항목 처리 오류:", itemError)
        // 오류가 발생해도 기본 항목 반환
        return {
          id: String(index),
          title: "포스트 정보 처리 중 오류 발생",
          summary: "이 포스트 정보를 처리하는 중 오류가 발생했습니다.",
          date: "날짜 정보 없음",
          tags: ["오류"],
          url: "#",
          readingTime: "1분",
        }
      }
    })

    return NextResponse.json({ posts })
  } catch (error) {
    console.error("블로그 포스트 가져오기 오류:", error)

    // 오류 발생 시 예시 데이터 반환
    return NextResponse.json(
      {
        posts: getExamplePosts(),
        message: `블로그 포스트를 가져오는 중 오류가 발생했습니다: ${error.message || "알 수 없는 오류"}`,
      },
      { status: 200 },
    ) // 클라이언트에게는 200 상태 코드 반환
  }
}

// 예시 데이터 함수
function getExamplePosts() {
  return [
    {
      id: "1",
      title: "React 컴포넌트 최적화하기",
      summary:
        "React 애플리케이션의 성능을 향상시키기 위한 다양한 최적화 기법에 대해 알아봅니다. 메모이제이션, 가상 DOM, 렌더링 최적화 등 실제 프로젝트에서 적용할 수 있는 방법들을 소개합니다.",
      date: "2023-05-15",
      tags: ["React", "성능", "최적화"],
      url: "https://velog.io/@tuosm9390/react-optimization",
      readingTime: "8분",
    },
    {
      id: "2",
      title: "TypeScript로 타입 안전성 확보하기",
      summary:
        "TypeScript를 사용하여 JavaScript 코드의 타입 안전성을 높이는 방법에 대해 설명합니다. 인터페이스, 제네릭, 유니온 타입 등 TypeScript의 핵심 기능을 활용한 예제 코드를 통해 실무에서 바로 적용할 수 있는 팁을 제공합니다.",
      date: "2023-04-20",
      tags: ["TypeScript", "JavaScript"],
      url: "https://velog.io/@tuosm9390/typescript-safety",
      readingTime: "6분",
    },
    {
      id: "3",
      title: "Next.js 13의 새로운 기능",
      summary:
        "Next.js 13에서 추가된 App Router, Server Components 등 새로운 기능에 대해 살펴봅니다. 기존 Pages Router와의 차이점과 마이그레이션 방법, 그리고 새로운 기능을 활용한 예제 애플리케이션을 함께 알아봅니다.",
      date: "2023-03-10",
      tags: ["Next.js", "React"],
      url: "https://velog.io/@tuosm9390/nextjs-13-features",
      readingTime: "10분",
    },
    {
      id: "4",
      title: "CSS Grid 레이아웃 마스터하기",
      summary:
        "CSS Grid를 사용하여 복잡한 레이아웃을 쉽게 구현하는 방법에 대해 알아봅니다. 그리드 컨테이너와 아이템의 속성, 반응형 그리드 구현 방법, 그리고 실제 디자인을 Grid로 구현하는 과정을 단계별로 설명합니다.",
      date: "2023-02-05",
      tags: ["CSS", "레이아웃", "웹디자인"],
      url: "https://velog.io/@tuosm9390/css-grid-mastery",
      readingTime: "7분",
    },
    {
      id: "5",
      title: "JavaScript 비동기 프로그래밍",
      summary:
        "Promise, async/await를 활용한 JavaScript 비동기 프로그래밍 패턴에 대해 설명합니다. 콜백 지옥을 탈출하는 방법부터 실제 API 호출 시 에러 처리까지, 비동기 코드를 효과적으로 작성하는 방법을 다룹니다.",
      date: "2023-01-15",
      tags: ["JavaScript", "비동기"],
      url: "https://velog.io/@tuosm9390/js-async-programming",
      readingTime: "9분",
    },
  ]
}
