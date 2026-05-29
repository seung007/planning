# T-002: 디자인 시스템 세팅

## 개요
`rules/DESIGN.md` YAML frontmatter의 디자인 토큰(색상·타이포·간격·라운딩)을 Tailwind 4의 CSS-first 방식(`@theme` directive)으로 매핑하고, 라이트 전용 글로벌 스타일을 정의한다.

## 사용자 결정 사항
- **색상 시스템**: YAML frontmatter 전체(Material 3 팔레트 51개) 매핑
- **다크모드**: 제거 (라이트 전용)

## 영향 파일 (2개)
- `E:\planing\client\app\globals.css` — 토큰 정의 + 글로벌 스타일
- `E:\planing\client\app\layout.tsx` — 폰트 교체 + 메타데이터

## 체크리스트

### Step 1 — `client/app/globals.css` 갱신
- [x] 다크모드 자동 전환(`@media (prefers-color-scheme: dark)`) 블록 제거
- [x] `:root` 변수: 기존 `--background`, `--foreground` 외에 DESIGN.md 핵심 색상 추가 검토
- [x] `@theme` 블록 확장:
  - **색상 (51개)**: YAML frontmatter의 모든 색상을 `--color-<name>` 형식으로 등록
    - 예: `--color-primary: #006e2e;`, `--color-on-primary: #ffffff;`, `--color-surface: #f9f9ff;`
  - **typography (6종)**: 각 typography 항목을 Tailwind utility로 노출하기 위해 `--text-<name>` 등록
    - 예: `--text-display-lg: 24px;`, `--text-body-md: 14px;` (lineHeight·weight·letterSpacing은 inline class에서 처리하거나 별도 `@utility` 정의)
  - **rounded (6종)**: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-full` (DEFAULT은 `--radius` 사용 검토)
  - **spacing (5종)**: `--spacing-section-gap: 24px;`, `--spacing-sidebar-width: 260px;` 등
- [x] body 폰트 패밀리: Plus Jakarta Sans 우선 + 한국어 fallback (`'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`)
- [x] body 기본 색상: `var(--color-background)`, `var(--color-on-background)` 사용

### Step 2 — `client/app/layout.tsx` 갱신
- [x] `next/font/google`에서 `Geist`, `Geist_Mono` import 제거
- [x] `Plus_Jakarta_Sans` import 및 CSS 변수(`--font-jakarta`) 노출
- [x] `metadata.title`: "스마트스토어 셀러를 위한 AI 카피 생성"
- [x] `metadata.description`: PRD 한 줄 정의 기반(약 100자 이내)
- [x] `<html lang>`: `"ko"`로 변경 (한국어 셀러 대상)
- [x] `<html>` className: `${plusJakartaSans.variable} h-full antialiased`

### Step 3 — 검증
- [x] `cd client; npm run build` exit 0
- [x] `.next/` 생성 확인
- [x] 임의 컴포넌트에서 토큰 사용 가능 확인 (예: `<div className="bg-primary text-on-primary rounded-md p-section-gap" />`)
- [x] 브라우저에서 폰트가 Plus Jakarta Sans로 렌더링되는지 확인 (수동, dev 서버)

## 결정 사항 / 가정

1. **Tailwind 4의 v3 컨벤션 미적용**: `tailwind.config.ts` 파일을 생성하지 않음. tasks.md의 T-002 예시는 v3 기준이며, Tailwind 4는 CSS-first 방식이라 globals.css의 `@theme`만으로 충분.
2. **YAML과 본문 #03C75A 불일치**: 사용자 선택대로 YAML 우선. 본문의 #03C75A는 YAML의 `primary-container`에 해당. 추후 컴포넌트 작업에서 "녹색 강조"가 필요하면 `primary-container` 토큰을 사용.
3. **typography lineHeight/weight/letterSpacing**: Tailwind 4의 단일 `--text-<name>` 변수만으로는 4가지 속성을 함께 매핑하기 어려움. 우선 `--text-<name>`(fontSize)만 등록하고, 나머지(weight/lineHeight/letterSpacing)는 컴포넌트별 utility class 조합으로 처리. 향후 필요 시 `@utility` directive로 packaged class 정의 검토.
4. **다크모드 비활성**: `@media (prefers-color-scheme: dark)` 블록 + `--color-foreground` 다크 변수 모두 제거. 향후 다크모드 도입 시 별도 작업.
5. **한국어 폰트**: Plus Jakarta Sans는 영문 폰트. 한글은 시스템 폰트 fallback. 향후 Pretendard 등 한글 전용 폰트 도입은 별도 작업.

## 의존성
- 선행: T-001 ✅ 완료
- 후행: T-003 (App Shell 레이아웃)이 본 작업을 직접 사용

## 예상 변경 라인 수
- `globals.css`: ~100줄 (현재 27줄 → 약 130줄)
- `layout.tsx`: ~10줄 변경

## 진척 기록
- 완료 후 `docs/planning/progress.md`에 "T-002 디자인 시스템 세팅" 섹션 추가
