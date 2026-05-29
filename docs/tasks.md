# 구현 태스크 목록

> **기준 문서**: `docs/prd.md`, `docs/userflow.md`, `docs/screen/*.png`, `rules/DESIGN.md`
> **작업 단위**: 태스크당 파일 수정 1~3개 · userflow 수직 슬라이스 기준
> **의존성 표기**: `←` 뒤에 선행 태스크 번호

---

## 진행 현황

> 상태의 단일 소스(SSOT)는 `docs/planning/progress.md`. 아래 표는 요약 포인터다.

| 태스크 | 상태 | 비고 |
|---|---|---|
| T-001 프로젝트 스캐폴딩 | ✅ 완료 | client/server/Prisma 구조 + 모노레포 재정비(Phase 1~8). Prisma 스키마는 `User` 모델만 정의(점진 확장 예정) |
| T-002 디자인 시스템 | ✅ 완료 | `globals.css` @theme 토큰 (Tailwind 4 CSS-first). `002-t002-design-system.md` |
| (유지보수) server 빌드 경로 | ✅ 완료 | `main`·`start` → `dist/src/index.js` 정렬. `003-server-build-path.md` |
| T-003 App Shell 레이아웃 | ⬜ 예정 | 다음 크리티컬 패스 |
| 그 외 (T-004·T-005·T-007~T-018) | ⬜ 미착수 | |

---

## Group 0 — 공통 기반

공통 기반은 특정 화면에 속하지 않으나, 모든 화면 태스크의 선행 조건이다.

| ID | 태스크 | 설명 | 수정 파일 (예상) | 의존성 |
|---|---|---|---|---|
| T-001 | 프로젝트 스캐폴딩 | Next.js (App Router) + Express 서버 + Prisma 초기 설정. 모노레포 또는 분리 구조 결정 포함. | `package.json`, `tsconfig.json`, `prisma/schema.prisma` | — |
| T-002 | 디자인 시스템 세팅 | `rules/DESIGN.md` 토큰(색상·타이포·간격·라운딩)을 Tailwind config에 매핑. 글로벌 스타일 정의. | `tailwind.config.ts`, `app/globals.css` | ← T-001 |
| T-003 | 앱 Shell 레이아웃 | 사이드바(Home·Products·Orders·Sales·Settings) + 탑 내비게이션(검색·알림·프로필) + 푸터. 인증/비인증 분기 라우트 그룹. | `app/layout.tsx`, `components/Sidebar.tsx`, `components/TopNav.tsx` | ← T-002 |

---

## Group 1 — 인증 (`docs/screen/login.png`)

> **유저플로우**: s1 (인증) — n1→n2→n4→n6
> **PRD**: §2 웹 서비스 접근성

| ID | 태스크 | 설명 | 수정 파일 (예상) | 의존성 |
|---|---|---|---|---|
| T-004 | 로그인·회원가입 페이지 UI | 센터 카드 레이아웃(max-width 420px), 로고+태그라인, 이메일/비밀번호 입력, "로그인 상태 유지" 체크박스, "비밀번호 찾기" 링크, 회원가입 링크, 푸터(이용약관·개인정보처리방침·고객센터). 회원가입 폼은 같은 카드 구조를 공유. | `app/(auth)/login/page.tsx`, `app/(auth)/signup/page.tsx`, `components/auth/AuthForm.tsx` | ← T-002, T-005 |
| T-005 | Supabase Auth 세션 관리 | Supabase Auth 초기 설정. 세션 쿠키 미들웨어로 인증 상태 유지. Prisma `User` 모델 정의. | `lib/supabase.ts`, `server/routes/auth.ts`, `middleware.ts` | ← T-001 |

---

## Group 2 — 대시보드 (`docs/screen/dashboard.png`)

> **유저플로우**: s2 (대시보드) — n6→n7, n8, n9
> **PRD**: 핵심 지표 대시보드 (KPI 시각화)

| ID | 태스크 | 설명 | 수정 파일 (예상) | 의존성 |
|---|---|---|---|---|
| T-007 | 대시보드 통계 카드 + API | 4개 통계 카드(총 생성 카피·평균 독창성·월간 사용량·이번 달 저장). Express 집계 API 엔드포인트. | `app/(main)/dashboard/page.tsx`, `components/dashboard/StatCard.tsx`, `server/routes/stats.ts` | ← T-003, T-005 |
| T-008 | 카피 목록 테이블 + 페이지네이션 | 카피명·독창성·SEO·생성일·상태 컬럼. 상태 배지(서비스중·생성됨 등). 페이지네이션("전체 N개 결과 중 1-4 표시"). 검색 바. 액션 버튼(편집·삭제). | `components/dashboard/CopyTable.tsx`, `components/ui/StatusBadge.tsx`, `server/routes/copies.ts` | ← T-007 |
| T-009 | 대시보드 CTA 배너 + 신규 생성 진입 | "새로운 아이디어가 필요하신가요?" CTA 영역 + "지금 생성하기" 버튼. 좌측 하단 "+ New Product" FAB. 카피 생성 페이지 라우팅 연결. | `app/(main)/dashboard/page.tsx`, `components/dashboard/CtaBanner.tsx` | ← T-007 |

---

## Group 3 — 카피 생성 (`docs/screen/copy.png`)

> **유저플로우**: s3 (카피 생성) — n10→n11→n12~n15→n16→n17~n20
> **PRD**: §1 AI 기반 차별화 카피 생성, §1.1 다양한 상품 정보 입력 지원

| ID | 태스크 | 설명 | 수정 파일 (예상) | 의존성 |
|---|---|---|---|---|
| T-010 | 카피 생성 폼 UI | 상품명 입력, 핵심 키워드 태그 입력(칩 UI + "X" 삭제), 상품 특징 textarea, 브랜드·소재 2열 입력, 용도 입력. "카피 생성하기" 버튼(초록, full-width). | `app/(main)/copy/page.tsx`, `components/copy/CopyForm.tsx`, `components/copy/KeywordTagInput.tsx` | ← T-003 |
| T-011 | AI 카피 생성 API | Express에서 Claude API를 호출하여 3개 이상 카피 안 생성. 프롬프트 설계, 응답 파싱, Prisma `Copy` 모델 저장. | `server/routes/generate.ts`, `lib/api/claudeClient.ts`, `prisma/schema.prisma` | ← T-005 |
| T-012 | 카피 결과 표시 + 액션 | 3안 카드 레이아웃: 독창성 점수 배지, BEST MATCH 표시(최고 점수), 카피 본문. 각 카드 하단 아이콘(복사·저장·공유·분석). "다시 생성하기" 버튼. 저장 시 DB 반영, 분석 클릭 시 카피 분석 페이지 이동. | `components/copy/CopyResultSection.tsx`, `components/copy/CopyCard.tsx`, `server/routes/copies.ts` | ← T-010, T-011 |

---

## Group 4 — 카피 분석 (`docs/screen/Analysis.png`)

> **유저플로우**: s4 (카피 분석) — n21→n22→n23, n24→n25~n27
> **PRD**: §1.2 AI 기반 독창성 점수 산출, §1.3 검색 엔진 최적화(SEO) 자동 평가

| ID | 태스크 | 설명 | 수정 파일 (예상) | 의존성 |
|---|---|---|---|---|
| T-013 | 카피 분석 페이지 UI | 보고서 ID 표시, 카피 원문 인용 블록, 독창성 점수(도넛 차트 87% + "상세 보기" 아코디언), SEO 평가 점수(85점 + "우수함" 배지 + 상세 분석 데이터 아코디언). 레이아웃은 단일 컬럼 카드 스택. | `app/(main)/analysis/[id]/page.tsx`, `components/analysis/ScoreDonut.tsx`, `components/analysis/SeoPanel.tsx` | ← T-003, T-012, T-014 |
| T-014 | 독창성 + SEO 평가 API | 독창성 평가: Claude API로 기존 콘텐츠 대비 중복 검사 → 점수 산출(`scoreOriginality`). SEO 평가: 네이버 검색광고 API로 월간 검색량·연관 키워드 조회 → 키워드 적합성 점수 산출. 결과를 Prisma `Analysis` 모델에 저장. | `server/services/originality.ts`, `server/services/seoEvaluator.ts`, `server/routes/analysis.ts` | ← T-011 |
| T-015 | 개선 피드백 + 카피 수정 반영 | 피드백 번호 리스트(색상 구분: 초록/노랑/주황), "피드백 반영하여 카피 수정" 버튼 → Claude API에 피드백 포함 재생성 요청 → 수정된 카피로 업데이트. | `components/analysis/FeedbackList.tsx`, `server/routes/analysis.ts` | ← T-013, T-014 |

---

## Group 5 — 설정 (`docs/screen/setting.png`)

> **유저플로우**: s6 (설정) — n34→n35→n36, n37, n38, n39
> **PRD**: 계정 관리, 알림

| ID | 태스크 | 설명 | 수정 파일 (예상) | 의존성 |
|---|---|---|---|---|
| T-016 | 설정 페이지 — 계정 정보 + 프로필/비밀번호 | 계정 정보 카드(이니셜 아바타·이름·이메일), "프로필 수정" / "비밀번호 변경" 버튼 → 모달 또는 인라인 편집. 로그아웃 버튼. Express 프로필 수정 API. | `app/(main)/settings/page.tsx`, `components/settings/AccountInfo.tsx`, `server/routes/settings.ts` | ← T-003, T-005 |
| T-017 | 알림 설정 + 소셜 계정 연결 | 알림 토글 3종(카피 생성 완료·SEO 리포트·마케팅 소식). 연결된 계정 섹션(카카오: 연결됨/해제, 네이버: 미연결/연결하기). Prisma `UserPreference` 모델. | `components/settings/NotificationSettings.tsx`, `components/settings/LinkedAccounts.tsx`, `server/routes/settings.ts`, `prisma/schema.prisma` | ← T-016 |

---

## Group 6 — 카피 관리 (화면 시안 미제공)

> **유저플로우**: s5 (카피 관리) — n28→n29→n30~n33
> **PRD**: 카피 저장·관리
> **참고**: 전용 화면 시안(`docs/screen/management.png`)이 아직 없음. 대시보드 테이블(T-008)과 UI를 공유하되 검색·편집·삭제·내보내기 기능을 확장하는 방식으로 설계. **시안 확정 후 조정 필요.**

| ID | 태스크 | 설명 | 수정 파일 (예상) | 의존성 |
|---|---|---|---|---|
| T-018 | 카피 관리 — 목록·검색·편집·삭제·내보내기 | 저장된 카피 전체 목록 + 키워드 검색/필터. 인라인 편집 → Express PATCH API. 삭제 확인 모달 → Express DELETE API. 텍스트/CSV 내보내기(GET /copies/export 엔드포인트 포함). | `app/(main)/management/page.tsx`, `components/management/CopyList.tsx`, `server/routes/copies.ts` | ← T-008, T-012 |

---

## 의존성 그래프 요약

```
T-001 ─→ T-002 ─→ T-003 ─┬→ T-007 ─→ T-008 ─→ T-009
  │         │              │                ↘
  │         └→ T-004       ├→ T-016 ─→ T-017  T-018
  │              ↑         │
  └→ T-005 ──┬──┘         └→ T-010 ─┐
             └→ T-011 ─┬────────────┴→ T-012 ─→ T-013 ─→ T-015
                        └→ T-014 ──────────────────↗
```

**크리티컬 패스**: T-001 → T-002 → T-003 → T-010 → T-012 → T-013 → T-015 (7태스크, T-005→T-011→T-014는 병렬 합류)

---

## 미결 사항

- [ ] **카피 관리 화면 시안 필요**: userflow s5에 해당하는 `docs/screen/management.png`가 없음. T-018 착수 전 시안 확정 필요.
- [ ] **Prisma 스키마 전체 설계**: T-001에서 초기 정의 후 T-005·T-011·T-014·T-017에서 점진 확장. 전체 ERD를 별도 태스크로 선행할지 결정 필요.
- [ ] **카피 관리 vs 대시보드 테이블 범위 분리**: T-008(대시보드 테이블)과 T-018(카피 관리)의 UI 공유 범위를 시안 확정 후 확정.
- [ ] **T-006 번호 공백 확인**: T-005 다음이 T-007로 이어지며 T-006이 정의돼 있지 않다. 의도적 예약인지 누락인지 확인 후 정리한다. 재번호는 의존성 참조(`← T-00X`)를 깨뜨릴 수 있어 지양하고, 필요 시 T-006을 신규 태스크로 채우는 방향을 권장.
