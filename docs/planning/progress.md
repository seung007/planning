# 진척 기록 — 모노레포 구조 재정비

> 계획 파일: `C:\Users\goril\.claude\plans\docs-prd-md-hidden-coral.md`
> 작업 시작일: 2026-05-28

본 문서는 prisma·shared 일체를 server로 이관하고 root에 client/server/기획문서만 남기는 6 Phase 작업의 진척을 기록한다.

---

## Phase 1: 루트 generated/ 부산물 정리 — ✅ 완료

**완료일**: 2026-05-28

### 변경 사항
- 삭제: `E:\planing\generated\` (Prisma Client 중복본 12개 파일)
- 수정: `E:\planing\.gitignore`
  - 5~7번 라인: `/generated/prisma` 항목 제거, `server/generated/`만 유지

### 검증 결과
- `Test-Path E:\planing\generated` → False ✅
- `Test-Path E:\planing\server\generated\prisma` → True ✅
- `.gitignore` 6번 라인이 `server/generated/`로 정리됨 ✅

### 결정 사항
- 루트 `generated/`는 과거 잘못된 cwd에서 `prisma generate` 실행으로 생성된 파편으로 확인. 향후 server cwd에서만 generate 실행하면 재발 없음.

### 다음 액션
→ Phase 2 완료. Phase 3으로 진행.

---

## Phase 2: shared/types.ts 분산 — ✅ 완료

**완료일**: 2026-05-28

### 변경 사항
- 생성: `E:\planing\client\src\` 디렉토리
- 생성: `E:\planing\client\src\types.ts` ← shared/types.ts에서 복제 (4줄 ApiResponse<T>)
- 생성: `E:\planing\server\src\types.ts` ← shared/types.ts에서 복제
- 삭제: `E:\planing\shared\` 디렉토리

### 검증 결과
- `Test-Path E:\planing\shared` → False ✅
- `Compare-Object` 결과 없음 (양쪽 types.ts 동일) ✅

### 결정 사항
- `client/src/` 디렉토리 신설. 향후 client에서 공통 유틸·타입을 두는 위치로 사용 가능. Next.js App Router는 `app/`이 루트에 있는 현 구조 유지(src/app/ 미사용).
- types.ts 향후 변경 시 양쪽 동기화 필요. 현재는 1개 인터페이스라 부담 적음.

### 다음 액션
→ Phase 3 완료. Phase 4로 진행.

---

## Phase 3: Prisma 일체 server 이관 — ✅ 완료

**완료일**: 2026-05-28

### 변경 사항
- 이동: `E:\planing\prisma\` → `E:\planing\server\prisma\` (schema.prisma 포함)
- 이동: `E:\planing\prisma.config.ts` → `E:\planing\server\prisma.config.ts`
- 수정: `E:\planing\server\prisma\schema.prisma:3`
  - output: `../server/generated/prisma` → `../generated/prisma`
- 수정: `E:\planing\server\package.json`
  - scripts에 `db:migrate`, `db:generate` 추가 (9~10번 라인)
  - devDependencies에 `prisma ^7.8.0` 추가 (27번 라인)
- 수정: `E:\planing\package.json` (루트)
  - scripts에서 `db:migrate`, `db:generate` 제거
  - devDependencies에서 `prisma ^7.8.0` 제거 (concurrently만 남음)

### 검증 결과
- `npx prisma validate` (server cwd) → "schema is valid 🚀" ✅
- `npx prisma generate` (server cwd) → `./generated/prisma`에 Client 생성 (22ms) ✅
- `Test-Path E:\planing\prisma` → False ✅
- `Test-Path E:\planing\prisma.config.ts` → False ✅
- `Test-Path E:\planing\server\prisma\schema.prisma` → True ✅
- `Test-Path E:\planing\server\generated\prisma\client.ts` → True ✅

### 결정 사항
- prisma.config.ts의 `schema: "prisma/schema.prisma"`는 cwd=server 기준 정상 동작. 변경 불필요.
- 루트 node_modules에 호이스팅된 prisma CLI가 server에서도 작동하여 의존성 재설치 없이 성공. Phase 5에서 workspaces 도입 시 server 워크스페이스에 명시적으로 prisma가 설치됨.

### 다음 액션
→ Phase 4 완료. Phase 5로 진행.

---

## Phase 4: .env server 이동 및 로딩 검증 — ✅ 완료

**완료일**: 2026-05-28

### 변경 사항
- 이동: `E:\planing\.env` → `E:\planing\server\.env`
- 이동: `E:\planing\.env.example` → `E:\planing\server\.env.example`
- 코드 변경: `server/src/index.ts`는 `import "dotenv/config"` 그대로 유지 (cwd=server라 server/.env 자동 로드)

### 검증 결과
- `Test-Path E:\planing\.env` → False ✅
- `Test-Path E:\planing\server\.env` → True ✅
- `node -e "require('dotenv').config(); console.log(...)" (server cwd)` → "injected env (1) from .env" 메시지, DATABASE_URL 로드 확인 ✅
- `npx prisma generate` (server cwd) → DATABASE_URL 정상 인식, Client 재생성 성공 ✅

### 결정 사항
- dotenv는 cwd 기준으로 .env를 찾으므로 server에서 npm run dev/start 시 자동으로 server/.env 로드. 별도 path 명시 불필요.
- `server/.env`의 PORT/CLIENT_URL 값이 비어있어 보이지만 이는 사용자의 .env 파일 내용 설정 사항이며 이동·로딩 메커니즘과 무관.
- 계획에 있던 임시 검증 로그 삽입은 외부 node 명령으로 대체 (소스 코드 무변경, 더 안전).

### 다음 액션
→ Phase 5 완료. Phase 6으로 진행.

---

## Phase 5: npm workspaces 도입 — ✅ 완료

**완료일**: 2026-05-28

### 변경 사항
- 수정: `E:\planing\package.json` (루트)
  - `"private": true` 추가
  - `"workspaces": ["client", "server"]` 추가
  - scripts 갱신:
    - `dev`: `concurrently "npm run dev -w client" "npm run dev -w server"`
    - `build`: `npm run build -w client && npm run build -w server` (신규)
    - `db:migrate`: `npm run db:migrate -w server` (server 위임)
    - `db:generate`: `npm run db:generate -w server` (server 위임)
  - 구 `dev:client`, `dev:server` script 제거
- 수정: `E:\planing\server\package.json:4`
  - `"private": true` 추가
- 의존성 재설치: 루트·client·server의 node_modules와 모든 package-lock.json 제거 후 루트에서 `npm install`
  - 결과: 574 packages installed in 22s

### 검증 결과
- `npm ls --workspaces --depth 0` → client(next, react, tailwind 등), server(express, prisma, dotenv 등) 정상 인식 ✅
- `npm run db:generate` (루트) → server 워크스페이스의 prisma generate 위임 호출 성공 ✅
- 루트 node_modules에 next, express, prisma 호이스팅 확인 ✅

### 결정 사항
- 루트 dev script는 `concurrently + npm -w` 조합으로 변경 (기존 cd 방식 대비 워크스페이스 친화적)
- 신규 root build script 추가 (CI/CD에서 일괄 빌드 가능)
- 루트 .gitignore의 `node_modules` 규칙은 워크스페이스 하위 node_modules도 자동 커버 (글로벌 패턴)

### 다음 액션
→ Phase 6 완료. 본 작업(모노레포 재정비) 종료.

---

## Phase 6: tsconfig 및 빌드 검증 — ✅ 완료

**완료일**: 2026-05-28

### 검증 결과
- `cd E:\planing\server; npm run build` → `dist/` 생성 성공 (소스 + Prisma generated 모두 컴파일) ✅
- `cd E:\planing\client; npm run build` → Next.js 16.2.6 Turbopack 빌드 성공, `/`, `/_not-found` 정적 페이지 생성 ✅
- 루트 `npm run build` → client + server 통합 빌드 순차 실행 성공 ✅

### tsconfig 점검 결과
- `client/tsconfig.json`: `paths: { "@/*": ["./*"] }` 그대로 유지. types.ts는 `@/src/types`로 접근 가능. 변경 불필요.
- `server/tsconfig.json`: `include: ["src/**/*", "generated/**/*"]`, `exclude: ["node_modules", "dist"]`. Prisma generated/도 함께 컴파일되어 dist에 포함됨. 변경 불필요.

### 최종 루트 구성

**폴더 (9개)**:
- 실질 폴더 (5): `client/`, `server/`, `docs/`, `data/`, `rules/`
- 도구·VCS 부산물 (4): `.claude/`, `.git/`, `.playwright-mcp/`, `node_modules/`

**파일 (4개)**: `package.json`, `package-lock.json`, `.gitignore`, `CLAUDE.md`

→ 사용자 요구("root에 client/server/기획문서만 남는 형태") 달성 ✅

### 발견된 후속 이슈 (별도 작업 권장)
- `server/package.json:4`의 `"main": "dist/index.js"`와 실제 빌드 출력 `dist/src/index.js` 불일치. `npm run start` 시 경로 어긋남.
  - 옵션 A: `main`을 `"dist/src/index.js"`로 수정 + start script도 변경
  - 옵션 B: server/tsconfig.json `rootDir`을 `"./src"`로 좁혀 dist/index.js로 직접 출력 (generated는 별도 처리 필요)
  - 본 작업 범위 외 — Group 0 T-001 완료 시점부터 존재한 불일치

### 결정 사항
- 통합 빌드(`npm run build`)는 서로 다른 워크스페이스를 순차 빌드하는 방식 채택. 빌드 시간이 길어지면 향후 `npm-run-all`이나 turborepo 도입 검토 가능.

---

## 종합 결과

| 항목 | Before | After |
|---|---|---|
| 루트 폴더 수 (도구 제외) | 6개 (client, server, shared, prisma, generated, data, docs, rules) | **5개 (client, server, data, docs, rules)** |
| 루트 파일 수 | 7개 (.env, .env.example, .gitignore, CLAUDE.md, package.json, package-lock.json, prisma.config.ts) | **4개 (.gitignore, CLAUDE.md, package.json, package-lock.json)** |
| Prisma 위치 | 루트 + server/generated 중복 | **server/ 자기 완결** |
| .env 위치 | 루트 | **server/.env** |
| 공유 타입 | shared/types.ts (별도 폴더) | **client/src/types.ts + server/src/types.ts** |
| 의존성 관리 | 워크스페이스 미적용 | **npm workspaces 적용** |

### CLAUDE.md 동시 정렬 필요 항목
- 6.2장: "Prisma 스키마: `prisma/schema.prisma`" → "`server/prisma/schema.prisma`"
- 6.2장: "Prisma Client 진입점: `server/db/client.ts`" → 현재는 `server/generated/prisma/client.ts` (Prisma가 자동 생성하는 위치)
- 5장 기술 스택 메모: ".env·prisma는 server 디렉토리에 자기 완결" 명시 가능

→ 사용자 확인 후 별도 작업으로 반영 권장 (CLAUDE.md 4.6장 동시 정렬 절차).

---

## Phase 7: 루트 잔재 최종 정리 — ✅ 완료

**완료일**: 2026-05-28

### Phase 7-1: .playwright-mcp/ 정리

#### 변경 사항
- 삭제: `E:\planing\.playwright-mcp\` (page-*.yml 7개, console-*.log 3개 = 232KB)
- 수정: `E:\planing\.gitignore` 18~20번 라인
  - 추가:
    ```
    # Playwright MCP session artifacts
    .playwright-mcp/
    ```

#### 검증 결과
- `Test-Path E:\planing\.playwright-mcp` → False ✅
- `.gitignore`에 `.playwright-mcp/` 패턴 등록 확인 ✅

### Phase 7-2: 루트 package.json 잔재 필드 제거

#### 변경 사항
- 제거: `main`, `directories`, `keywords`, `author`, `description`, `license`
- 유지: `name`, `version`, `private`, `workspaces`, `scripts`, `repository`, `bugs`, `homepage`, `devDependencies`

#### 검증 결과
- `ConvertFrom-Json` 결과 9개 필드만 존재: `bugs, devDependencies, homepage, name, private, repository, scripts, version, workspaces` ✅
- 제거 필드(main, directories, keywords, author, description, license) 없음 확인 ✅
- `npm ls --workspaces --depth 0` → client, server 정상 인식 ✅

### 최종 루트 구성

**폴더 (8개)**:
- 실질 폴더 (5): `client/`, `server/`, `docs/`, `data/`, `rules/`
- 도구·VCS 부산물 (3): `.claude/`, `.git/`, `node_modules/`

**파일 (4개)**: `.gitignore`, `CLAUDE.md`, `package.json`, `package-lock.json`

### 결정 사항
- GitHub 메타(`repository`, `bugs`, `homepage`)는 GitHub 페이지·이슈 링크 표시 용도로 유지.
- `license` 필드는 `private: true`라 npm 배포가 막혀 있어 불필요한 메타로 제거.
- `.playwright-mcp/`는 향후 Playwright MCP 사용 시 자동 재생성되지만, gitignore로 git 추적 차단.

### 후속 사항 (Phase 7 시점)

1. CLAUDE.md 6.2장의 Prisma 경로 동시 정렬 (별도 태스크)
2. `server/package.json:4`의 `main: "dist/index.js"`와 실제 빌드 출력(`dist/src/index.js`) 불일치 정리 (별도 태스크)
3. server 빌드 구조 단순화 검토 (rootDir 좁히기 등)

---

## Phase 8: 루트 package.json 완전 제거 — ✅ 완료

**완료일**: 2026-05-29

### 변경 사항

#### 삭제
- `E:\planing\package.json` — 루트 workspaces 루트 (concurrently 통합 dev 포함)
- `E:\planing\package-lock.json`
- `E:\planing\node_modules\` — 호이스팅된 446개 모듈

#### 재설치 (각 워크스페이스 자체)
- `cd E:\planing\client; npm install` → `client/node_modules`에 289개 디렉토리 설치 (next, react, tailwind 등)
- `cd E:\planing\server; npm install` → `server/node_modules`에 203개 디렉토리 설치 (express, prisma, dotenv 등)

### 검증 결과
- `Test-Path E:\planing\package.json` → False ✅
- `Test-Path E:\planing\package-lock.json` → False ✅
- `Test-Path E:\planing\node_modules` → False ✅
- `Test-Path E:\planing\client\node_modules\next` → True ✅
- `Test-Path E:\planing\server\node_modules\express` → True ✅
- `Test-Path E:\planing\server\node_modules\@prisma\client` → True ✅
- `cd client; npm run build` → exit 0, `.next/` 생성 ✅
- `cd server; npx prisma generate` → `generated/prisma/client.ts` 생성 ✅
- `cd server; npm run build` → exit 0, `dist/src/index.js` 생성 ✅

### 최종 루트 구성

**폴더 (7개)**:
- 실질 폴더 (5): `client/`, `server/`, `docs/`, `data/`, `rules/`
- VCS·설정 (2): `.claude/`, `.git/`

**파일 (2개)**: `.gitignore`, `CLAUDE.md`

→ 사용자 의도 "root에 기획 + client + server만" **최종 달성**.

### 결정 사항
- 통합 dev 명령(`concurrently`)을 포기하고 터미널 2개 운용 워크플로 채택.
- GitHub 메타(repository/bugs/homepage)는 `.git/config`의 remote 정보로 충분히 관리됨 (npm 메타 불필요).
- 의존성 호이스팅을 잃어 client·server 양쪽이 자체 node_modules 보유 (디스크 약간 증가하나 단일 사용자 PC라 무시 가능).

### dev 워크플로 (확정)
- 터미널 A: `cd E:\planing\client; npm run dev` → http://localhost:3000
- 터미널 B: `cd E:\planing\server; npm run dev` → http://localhost:4000

### 후속 사항 (Phase 8 시점)
1. **CLAUDE.md 갱신 권장**: "루트에는 통합 package.json이 없음. 통합 dev는 터미널 2개로 실행." 명시.
2. 기존 후속 사항(Prisma 경로 정렬, server main 정합성)은 그대로 유효.

---

## T-002: 디자인 시스템 세팅 — ✅ 완료

**완료일**: 2026-05-29
**계획 파일**: `docs/planning/tasks/002-t002-design-system.md`

### 변경 사항

#### `client/app/globals.css` (27줄 → 96줄)
- 다크모드 자동 전환(`@media (prefers-color-scheme: dark)`) 블록 제거
- `@theme` 블록 확장:
  - **색상 (51개)**: DESIGN.md YAML frontmatter의 Material 3 팔레트 전체를 `--color-<name>`로 등록 (surface 계열, on-* 변형, primary/secondary/tertiary, primary-fixed 계열, error 계열, background 등)
  - **typography (6개)**: `--text-display-lg/md`, `--text-body-md/sm`, `--text-label-md`, `--text-caption` (fontSize만 등록, weight/lineHeight는 컴포넌트별 처리)
  - **rounded (6개)**: `--radius-sm/md/lg/xl/full` + DEFAULT용 `--radius`
  - **spacing (5개)**: `--spacing-section-gap`, `--spacing-element-gap-lg/md`, `--spacing-container-padding`, `--spacing-sidebar-width`
  - **font-family**: `--font-sans: var(--font-jakarta), system-ui, ...` (Plus Jakarta Sans + 한글 시스템 fallback)
- body: `background: var(--color-background)`, `color: var(--color-on-background)`, `font-family: var(--font-sans)`

#### `client/app/layout.tsx`
- `Geist`, `Geist_Mono` → `Plus_Jakarta_Sans` (next/font/google)
- font 변수: `--font-jakarta`, `display: "swap"`
- `<html lang>`: `"en"` → `"ko"` (한국어 셀러 대상)
- `metadata.title`: "스마트스토어 셀러를 위한 AI 카피 생성"
- `metadata.description`: PRD 한 줄 정의 기반

### 검증 결과
- `cd client; npm run build` exit 0 ✅
- Next.js 16.2.6 Turbopack 빌드 성공 (1098ms 컴파일, TypeScript 951ms 통과) ✅
- 정적 페이지 `/`, `/_not-found` 생성 ✅

### 결정 사항
- **Tailwind 4 CSS-first 방식 채택**: `tailwind.config.ts` 생성하지 않음. tasks.md의 v3 기준 예시와 다름.
- **YAML 우선**: DESIGN.md 본문의 #03C75A는 YAML에서 `primary-container`로 매핑됨 (사용자 확인 결과).
- **typography 부분 매핑**: fontSize만 등록. weight/lineHeight/letterSpacing은 향후 `@utility` 또는 컴포넌트 클래스 조합으로 처리 (별도 작업).
- **다크모드 비활성**: DESIGN.md가 라이트 기반 디자인이므로 별도 작업 전까지 라이트 전용 유지.
- **한글 폰트**: Plus Jakarta Sans + 시스템 fallback. Pretendard 등 한글 전용 폰트 도입은 별도 작업.

### 후속 사항
1. T-003 (App Shell 레이아웃)에서 sidebar 너비는 `--spacing-sidebar-width`(260px) 토큰 사용
2. typography weight/lineHeight 패키징을 `@utility` directive로 정의하는 별도 작업 검토
3. DESIGN.md 본문의 #03C75A primary 표기와 YAML의 primary 불일치 정리 검토 (사용자 결정 사항이라 본 작업에서는 미반영)

---

## 003: server 빌드 경로 정합성 수정 — ✅ 완료

**완료일**: 2026-05-29
**계획 파일**: `docs/planning/tasks/003-server-build-path.md`

### 배경
`server/package.json`의 `main`·`start`가 존재하지 않는 `dist/index.js`를 가리켜 `npm run start`가 `Cannot find module`로 실패. 실제 빌드 출력은 `dist/src/index.js`(tsconfig `rootDir:"."` + `include`에 generated 포함으로 계층 보존). T-001 시점부터 존재, Phase 6·7·8에서 3회 미뤄진 후속 이슈.

### 변경 사항
- `server/package.json:5` `main`: `dist/index.js` → `dist/src/index.js`
- `server/package.json:9` `start`: `node dist/index.js` → `node dist/src/index.js`

### 검증 결과
- `npm run build` → exit 0, `dist/src/index.js` 생성 ✅
- `main`·`start` 모두 `dist/src/index.js`로 정렬 ✅
- `node dist/src/index.js` 기동 → `Server running on port 4000`, `/health` → `{"status":"ok"}` ✅

### 결정 사항
- 옵션 A(진입점 경로를 실제 출력에 정렬) 채택. 옵션 B(rootDir 좁히기)는 `generated/**/*`가 rootDir 밖이 되어 TS6059 + Prisma 클라이언트 미컴파일로 런타임 붕괴 위험이라 기각.
- **Phase 6·7·8의 "server main 정합성" 후속 이슈 해소 완료.**

### 다음 액션
→ 잔여 후속: CLAUDE.md 동시 정렬(Stage B 전환·Prisma 경로·package.json 구조), tasks.md 상태 동기화. 사용자 지시 대기.

---

## 004: 문서 동기화 (CLAUDE.md Stage B 전환 + tasks.md 상태) — ✅ 완료

**완료일**: 2026-05-29
**계획 파일**: `docs/planning/tasks/004-doc-sync.md`

### 변경 사항
- `CLAUDE.md` (4개 편집):
  - 0장: Stage `(현재)` 표기 A → **B** 이동
  - 1장: Stage A 서술 → Stage B 공존 서술, 산출물 목록에 `client/`·`server/` 추가
  - 5장: 리포 구조 항목 신설(루트 통합 package.json 부재·터미널 2개 dev·server 자기완결)
  - 6.2장: Prisma 경로 `server/prisma/schema.prisma`·진입점 `server/src/db/client.ts`로 정정
- `docs/tasks.md` (2개 편집):
  - 상단 "진행 현황" 요약 표 추가 (SSOT는 본 progress.md)
  - 미결 사항에 "T-006 번호 공백 확인" 추가

### 검증 결과
- CLAUDE.md·tasks.md 편집 모두 적용 ✅
- 문서 한정 변경, 코드·빌드 영향 없음 ✅
- **Phase 6·8·T-002의 "CLAUDE.md 동시 정렬" 후속 이슈 해소 완료.**

### 다음 액션
→ 다음 구현 크리티컬 패스: **T-003 App Shell 레이아웃** (선행 T-002 완료). 병렬로 T-005 Supabase Auth 착수 가능. 사용자 지시 대기.
