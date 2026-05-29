# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 0. 이 문서 사용법
이 문서는 저장소의 **Stage**에 따라 일부 섹션이 비활성/활성된다.

- **Stage A — 기획기**: 코드 자산 없음. 1·2·3·4·7장만 적용. 5·6장은 Stage B 진입 시 활성될 참고 규약.
- **Stage B — 구현기 (현재)**: 코드 자산 도입 완료(`client/`·`server/`). 5·6장 적용 중이며 4.2장의 코드 작업 분기가 유효하다.

4.2장 4단계 절차의 **적용 트리거**:
- **적용**: 신규 기능 추가, 화면 추가, PRD 장 추가/대규모 개정, (Stage B) 코드 100줄 이상 변경
- **면제**: 오타·1줄 수정, 분석/리뷰/요약 요청, 단일 사실 확인

## 1. 저장소 성격

이 저장소는 **제품 기획 워크스페이스에서 출발해 구현 코드가 도입된** 단계다 (Stage B). 기획 산출물과 코드 자산이 공존한다.

- `docs/` — 제품 기획 문서 (PRD, 유저플로우, 화면 시안)
- `data/` — 카피라이팅 레퍼런스 리서치 데이터
- `client/` — Next.js (App Router) 프론트엔드
- `server/` — Express + Prisma API 서버
- `.playwright-mcp/` — Playwright MCP 세션 부산물 (git 미추적, 사용 시 자동 생성)

기획 문서 갱신·리서치 분석/요약과 더불어, 5·6장 규약을 따르는 **코드 구현 작업**이 함께 이뤄진다.

## 2. 제품 컨텍스트

- **제품**: 스마트스토어 셀러를 위한 AI 기반 차별화 상품 카피 생성·최적화 서비스 (Web)
- **타겟**: 월매출 100만~500만원, 월 5~20개 상품을 등록하는 1인/부업 스마트스토어 셀러 (본업 병행, 스마트스토어 센터·포토샵/캔바를 함께 사용)
- **사용자 역할**: `셀러`(주 사용자) + `관리자`(운영자) — 두 역할의 권한·화면 차이를 의식하여 설계
- **핵심 가치**: 카피 작성 시간 단축(현재 상품당 1~2시간) + 독창성 80% 이상 + SEO 최적화로 광고 의존도 절감
- **차별점**: 시장 트렌드·경쟁사 데이터를 분석해 독창적·검색 노출 최적화 카피를 제안
- **지원 환경**: 크롬·엣지·사파리 최신 + 반응형 PC·태블릿 우선 / 모바일은 후순위. 가용률 99.9%
- **자세한 사양**: `docs/prd.md`
- **화면 흐름**: `docs/userflow.md` — 인증·대시보드·카피 생성·카피 분석·카피 관리·설정 6개 서브그래프 (Mermaid `flowchart LR`)

### 2.1 항상 의식할 수용 기준
- 입력 정보 기반 **3개 이상 카피 안 생성**
- **독창성 점수 80% 이상** (내부 기준)
- SEO 관점 키워드 적합성·중복 최소화
- 주요 브라우저·반응형 호환, **99.9% 가용률**

### 2.2 핵심 지표 (KPI)
의사결정의 우선순위 기준. 새 기능이 어느 KPI에 기여하는지 명시할 수 있어야 한다.
1. 사용자당 월평균 카피 생성 수
2. 서비스 이용 후 평균 검색 노출 순위 변화
3. 사용자 유지율
4. 카피 작성 시간 절감 만족도
5. 광고비 대비 매출 기여도 증가율

### 2.3 리스크
- **AI 품질**: 생성 카피 기대 미달·상업적 부적합 → 사람 검수·재생성 동선 필수
- **경쟁사 모방**: 차별점(트렌드·경쟁사 분석) 약화 변경은 지양
- **보안**: 셀러 계정·상품 정보 유출 → Supabase RLS·환경 변수 관리·최소 권한
- **플랫폼 정책 변화**: 스마트스토어·검색광고 API 정책 변동 → 외부 의존부는 격리해 교체 가능하게 유지

## 3. 데이터 자산

### 3.1 `data/`
동일한 30건의 카피라이팅 아티클이 두 포맷으로 저장.
- `articles.json` — `{url, status, title, body, len}` 배열 (UTF-8). 본문 전체 보존.
- `iboss_copy_top30.csv` — `rank, title, url, body` 컬럼. 본문에 큰따옴표·줄바꿈 존재 → **CSV 파서 사용 필수**.

출처는 i-boss.co.kr. 분석/요약/프롬프트 시드용 레퍼런스이며 **제품의 학습/추론 데이터셋이 아니다** — AI 카피 생성 로직이 직접 소비한다고 가정하지 말 것.


## 4. 작업 워크플로우

### 4.1 작업 분기

| 작업 종류 | 대상 영역 | 적용 가이드 |
|---|---|---|
| 기획 문서 작업 | `docs/`·`CLAUDE.md` | 4.2장 (트리거 충족 시) |
| 리서치 분석·요약 | `data/`·`.playwright-mcp/` 기반 | 4.2장 면제, 직접 응답 |
| 코드 작업 (Stage B) | 코드 자산 도입 후 | 4.2장 + 5·6장 적용 |

### 4.2 4단계 절차 (트리거 충족 시에만)

0장의 적용 트리거를 만족할 때만 수행한다.

1. **Research** — 관련 파일 조사. Stage A는 `docs/`·`data/` 위주, Stage B는 코드베이스 포함(`file:line` 참조). 변경 대상 정리.
2. **Plan** — 접근 방법을 `docs/planning/tasks/XXX-description.md`에 체크리스트로 문서화. **사용자 승인 후 구현 시작**.
3. **Implement** — 승인된 계획의 한 페이즈씩 실행. 각 항목 완료 시 4.3장 진척 파일 갱신. 계획 외 변경은 계획부터 재승인.
4. **Validate** — 구현이 계획과 일치하는지 검증. Stage B는 테스트 실행 포함. 결과·이슈를 진척 파일에 기록.

광범위한 탐색·리서치는 서브에이전트에 위임하여 메인 세션은 계획·조율에 집중한다.

### 4.3 관리 파일

모든 관리 파일은 `docs/planning/` 하위에 둔다.

- `docs/planning/plan.md` — 고수준 계획·우선순위. 새 작업은 마지막 완료 항목 다음에 삽입.
- `docs/planning/progress.md` — 완료 체크박스·결정 사항·막힌 지점·다음 액션.
- `docs/planning/tasks/XXX-description.md` — 개별 태스크 상세. 숫자 3자리 + kebab-case (예: `001-db.md`).

파일명은 소문자 통일 (네이밍 규약 일관성).

### 4.4 작업 단위 (전역 지침 정렬)

- 1작업 = 파일 수정 **1~3개**.
- 단일 파일 수정이 **5천자**를 초과하면 작업을 분할.
- 1페이즈 = 1작업 단위 (≤3파일, ≤5천자/파일).

### 4.5 컨텍스트 관리

- **50% 도달**: 컨텍스트 비대 알림 + `/compact` 요약 메시지 정리 요청 (전역 지침 6).
- **60% 도달**: 현재 페이즈를 끊고 진척을 `docs/planning/progress.md`에 저장 후 `/clear` 권장.

### 4.6 동시 정렬 (사용자 확인 후 적용)

원칙적으로 요청 범위 외 변경은 금지(7장)이지만, 다음은 **동시 정렬을 제안**하고 사용자 확인 후 반영한다.
- `docs/prd.md` 차별점·KPI·리스크·수용 기준 변경 → `CLAUDE.md 2장` 갱신 제안
- `docs/userflow.md` 서브그래프 추가/삭제 → `CLAUDE.md 2장` 화면 흐름 갱신 제안

### 4.7 그 외 유의사항

- 새 문서는 `docs/` 하위에 작성. `prd.md`/`userflow.md`의 용어·기능 번호(예: `1.1`, `1.2`)와 정렬.
- 유저플로우 수정 시 `flowchart LR` 구조와 노드 ID 컨벤션(`n1`, `s1`) 유지.
- **응답·문서는 한국어**, **MECE** 원칙 준수 (전역 지침).
- 가정한 내용은 명시적으로 밝히고, 불확실하면 추측 대신 명확히 묻는다.

## 5. 기술 스택 (Stage B 적용)

새 기능 제안·화면 추가 시 이 조합을 전제로 한다.

- **프론트엔드**: Next.js (App Router) + TypeScript + Tailwind — SSR/SEO/라우팅 담당, Vercel 배포. API는 Express 서버를 REST로 호출.
- **백엔드**: Node.js + Express (별도 API 서버) — REST API로 AI 호출·독창성 평가·SEO 평가·비즈니스 로직 처리. Next.js는 프론트엔드/SSR 전용이며 fetch로 Express 서버를 호출한다.
- **데이터 저장**: Supabase (Postgres + Auth + Storage) — DB·인증(이메일 + 카카오/네이버 소셜)·파일·RLS 통합
- **데이터 액세스**: Prisma ORM — Express 서버에서 모든 DB 읽기/쓰기는 Prisma Client 경유. 스키마는 `prisma/schema.prisma`에 단일 정의, raw SQL 작성 금지.
- **외부 API**:
  - **Anthropic Claude API** — 한국어 카피 생성 및 독창성 평가
  - **네이버 검색광고 API** — SEO 평가용 월간 검색량·연관 키워드 조회
- **배포**: Next.js는 Vercel, Express 서버는 Railway/Render/Fly.io 중 1곳. 두 서비스 간 통신은 HTTPS + 환경변수로 주입한 API 베이스 URL.
- **리포 구조**: 루트에 통합 `package.json`이 없다. `client/`·`server/`가 각자 `package.json`·`node_modules`를 갖는 독립 패키지이며, 개발은 터미널 2개(`client` :3000 / `server` :4000)로 구동한다. `.env`·Prisma(스키마·`generated/`)는 모두 `server/` 내부에 자기 완결로 둔다.

스택 변경 제안 전 PRD 수용 기준(99.9% 가용률·독창성 80%·SEO 평가)과의 충돌 여부를 검증한다.

### 5.1 설계 문서 참조

- **화면 스크린샷 인용**: 화면을 구현·수정할 때 대상 화면에 해당하는 `docs/screen/*.png`를 반드시 읽고(Read), 시각 명세와 구현이 일치하는지 확인한다. 빌드·구현 단계마다 화면 단위로 인용할 것.
- **디자인 토큰 준수**: `rules/DESIGN.md`에 정의된 토큰(색상·타이포그래피·간격·라운딩·컴포넌트 명세 등)을 임의로 무시하거나 재정의하지 않는다. 변경이 필요하면 `DESIGN.md`를 먼저 갱신하고 사용자 승인을 받은 뒤 코드에 반영한다.
- **문서 충돌 시 우선순위**: `docs/` 하위 문서 간 내용이 충돌할 경우 **`docs/prd.md`를 최우선**으로 한다.

## 6. 코드 컨벤션 (Stage B 적용)

1인 작업 기준. 협업·대규모 팀용 규칙(엄격한 커버리지·복잡한 커밋 푸터·과도한 리뷰 게이트)은 제외.

### 6.1 네이밍
- 변수·함수: `camelCase` / 컴포넌트·타입·클래스: `PascalCase` / 상수: `UPPER_SNAKE_CASE`
- Supabase 컬럼: `snake_case` (코드 진입 시 `created_at → createdAt` 매핑)
- Prisma 모델: `PascalCase` (예: `Copy`, `Seller`). 필드는 `camelCase`로 정의하고 `@map("snake_case")`로 Postgres 컬럼과 매핑.
- Boolean: `is`/`has`/`can` 접두사
- 환경 변수: `UPPER_SNAKE_CASE`, 클라이언트 노출분은 `NEXT_PUBLIC_` 접두사

### 6.2 파일/폴더
- 컴포넌트: `PascalCase.tsx`
- 훅·유틸: `camelCase.ts` (Next.js 측). Express 서버 측 유틸도 동일 규칙.
- App Router 라우트 폴더: `kebab-case/`
- Express 라우트: `server/routes/<도메인>.ts` (도메인별 라우터 분리)
- 프론트→백엔드 API 클라이언트: `lib/api/<도메인>Client.ts`
- Prisma 스키마: `server/prisma/schema.prisma` (단일 파일). 마이그레이션은 `server/prisma/migrations/` 자동 생성.
- Prisma Client 진입점: `server/src/db/client.ts`에서 단일 인스턴스 export (생성물 타입은 `server/generated/prisma/`).
- 테스트: 대상과 같은 폴더에 `*.test.ts` / `*.test.tsx`
- 타입: 컴포넌트 내부에 두되, 2곳 이상 공유 시 `types.ts` 분리

### 6.3 커밋
- 형식: `<type>: <한국어 제목>`
- type 5종: `feat` / `fix` / `docs` / `refactor` / `chore`
- 예: `feat: 카피 생성 폼 추가`, `fix: 독창성 점수 NaN 처리`
- scope·footer·breaking change 표기 생략 (1인 작업)

### 6.4 테스트
- 단위·통합: **Vitest**
- React 컴포넌트: **Vitest + React Testing Library**
- E2E 스모크: **Playwright** — 핵심 경로 5~10개만 (로그인 → 카피 생성 → 저장 등)
- 커버리지 수치 목표 없음. 단, 단위 테스트 필수 영역:
  - 독창성 점수 산출 로직 (예: `scoreOriginality`)
  - SEO 평가·키워드 매칭 로직
- AI·외부 API는 단위·통합에서 mock, E2E에서는 fixture/stub (실제 과금 호출 금지)

## 7. 금지 사항

- 0장 트리거 충족 작업에서 계획 없이 바로 구현 시작.
- 한 번에 여러 페이즈 동시 구현.
- 4.3장 진척 파일 업데이트 건너뛰기.
- 요청 범위 외 리팩터링·"개선"을 임의로 추가 (4.6장의 동시 정렬은 사용자 확인 후에만 적용).

