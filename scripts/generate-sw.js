const fs = require("fs")
const path = require("path")

// sw.ts 파일 읽기
const swContent = fs.readFileSync(path.join(__dirname, "../app/sw.ts"), "utf8")

// TypeScript 코드를 JavaScript로 변환 (간단한 변환)
const jsContent = swContent
  .replace(/declare const self: ServiceWorkerGlobalScope/g, "")
  .replace(/: ServiceWorkerGlobalScope/g, "")
  .replace(/: string\[\]/g, "")

// public 폴더에 sw.js 파일 생성
fs.writeFileSync(path.join(__dirname, "../public/sw.js"), jsContent)

console.log("Service Worker 생성 완료: public/sw.js")
