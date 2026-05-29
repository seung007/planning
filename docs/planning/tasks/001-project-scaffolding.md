# T-001: 프로젝트 스캐폴딩

## 구조
단일 레포 + 폴더 분리: `client/` (Next.js 15 App Router) + `server/` (Express) + `shared/` (공유 타입) + `prisma/` (스키마)

## 체크리스트
- [x] 루트 `package.json` + `concurrently` 스크립트
- [x] `client/` — Next.js 초기화 (TypeScript, Tailwind, App Router)
- [x] `server/` — Express + TypeScript + cors + dotenv, health 엔드포인트
- [x] `shared/types.ts` — 공유 타입 배럴 파일
- [x] `prisma/schema.prisma` — User 모델 초기 정의
- [x] `.env.example` — 환경 변수 템플릿
- [x] `.gitignore` 갱신 (node_modules, .env, .next, dist, generated)
- [x] Prisma v7 driver adapter 설정 (`@prisma/adapter-pg`)
- [x] TypeScript 타입 체크 통과 (client + server)

## 결정 사항
- 패키지 매니저: npm
- Node.js: 20 LTS
- 동시 실행: concurrently
- Prisma 위치: 루트 prisma/, 생성 클라이언트는 server/generated/prisma
- Prisma v7: @prisma/adapter-pg 사용 (driver adapter 필수)
