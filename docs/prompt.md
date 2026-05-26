# Stitch 화면별 시안 프롬프트

## Persona

퇴근 후 작업하는 1인 부업 스마트스토어 셀러 "김스마트".
월매출 100~500만원, 월 5~20개 상품 등록. 스마트스토어 센터·캔바에 익숙.
피로도 높고 시간 제한적 → 빠른 작업 완료가 핵심.

## 공통 스타일 가이드

- **테마**: 네이버 비즈니스 톤 — 화이트 베이스, 네이버 그린(#03C75A) 포인트 컬러
- **모서리**: semi-rounded (6~8px)
- **폰트**: Pretendard (본문 14px / 제목 20~24px / 캡션 12px)
- **간격**: 섹션 간 24px, 요소 간 12~16px
- **언어**: 한국어 UI
- **디바이스**: 데스크톱(1280px) 우선, 반응형 태블릿(768px) 고려

---

## Screen 1 — 인증 (로그인/회원가입)

```
Design a clean login page for a Korean SaaS product called "카피메이커".

Layout: centered card (max-width 420px) on a light gray (#F5F6F8) background.

Card contains, top to bottom:
- Service logo + tagline "AI가 만드는 당신만의 카피"
- Trust metrics row: "12,000+ 셀러 사용중 · 150,000+ 카피 생성"
- Email input field (placeholder: "이메일 주소")
- Password input field (placeholder: "비밀번호")
- Primary green (#03C75A) login button "로그인", full width
- Divider line with "또는" text centered
- Two social login buttons, secondary style:
  - Kakao (yellow #FEE500, "카카오로 시작하기")
  - Naver (green #03C75A outline, "네이버로 시작하기")
- Footer text link: "계정이 없으신가요? 회원가입"

Style: Pretendard font, semi-rounded corners (8px), subtle card shadow.
Minimal, professional. No decorative illustrations.
```

---

## Screen 2 — 대시보드

```
Design a dashboard page for "카피메이커", a Korean AI copywriting SaaS.

Top navigation bar: logo left, navigation links center (대시보드, 카피 생성, 카피 분석, 카피 관리, 설정), user avatar + name right.

Layout: single column, vertical stack.

Section 1 — KPI cards row (3 cards, equal width):
- Card 1: "평균 검색 순위" value "23위" with green down-arrow badge "▼5 상승"
- Card 2: "노출 클릭수" value "340회" with green up-arrow badge "+12%"
- Card 3: "이번 달 생성" value "12건" with gray badge "목표 20건"

Section 2 — Line chart:
- Title: "검색 순위 변화 추이"
- X-axis: recent 30 days, Y-axis: ranking (inverted, lower is better)
- Single green (#03C75A) line with data points

Section 3 — Recent copies list:
- Title: "최근 생성 카피" with "전체보기" text link right
- 3 rows, each showing: copy title, originality score badge (87%, 92%, 85%), date
- Subtle hover highlight

Floating action button bottom-right: green circle "+ 새 카피" 

Style: white background, light gray (#F5F6F8) card backgrounds, Pretendard font, 8px rounded corners. Clean data-focused layout.
```

---

## Screen 3 — 카피 생성

```
Design a copy generation page for "카피메이커", Korean AI copywriting tool.

Layout: single column, vertical stack, max-width 800px centered.

Section 1 — Input form:
- Page title: "카피 생성" with subtitle "상품 정보를 입력하면 AI가 차별화된 카피를 만들어 드려요"
- Form fields, all full width, stacked:
  - "상품명" text input (value: "여름 리넘 원피스")
  - "핵심 키워드" tag input with chips (values: "리넘", "원피스", "여름코디")
  - "상품 특징" textarea 3 rows (value: "시원한 마 소재, 자연스러운 핏, 데일리룩")
  - "브랜드" text input (value: "선선하게")
  - "소재" text input (value: "마 혼방")
  - "용도" text input (value: "출근룩, 데이트룩")
- Primary green button "카피 생성하기" full width, large (48px height)

Section 2 — Results (below form, appears after generation):
- Title: "생성된 카피 3안"
- 3 cards side by side (horizontal on desktop, stacked on mobile):
  - Card A: green badge "독창성 87%", copy text preview (3 lines), action row: [복사] [저장] [분석] icon buttons
  - Card B: green badge "독창성 92%" (highlighted as best), same structure
  - Card C: green badge "독창성 85%", same structure
- Below cards: secondary button "다시 생성하기" with refresh icon

Sample copy text for Card B: "올여름, 바람이 통하는 리넘 원피스 하나면 충분해요. 자연스럽게 흐르는 마 소재가 시원한 하루를 만들어줍니다."

Style: white cards on #F5F6F8 background, green accents, Pretendard font, 8px corners. The best-scoring card gets a subtle green border (2px #03C75A).
```

---

## Screen 4 — 카피 분석

```
Design a copy analysis page for "카피메이커", Korean AI copywriting tool.

Layout: single column, vertical sections, max-width 800px centered.

Top — Copy preview:
- Gray card showing the selected copy text: "올여름, 바람이 통하는 리넘 원피스 하나면 충분해요. 자연스럽게 흐르는 마 소재가 시원한 하루를 만들어줍니다."
- Small label: "카피 B · 2026.05.25 생성"

Section 1 — Originality score:
- Left: circular gauge/donut chart showing 87%, green fill
- Right: label "독창성 점수" with large "87%" number
- Expandable accordion "상세 보기 ▼" → when open shows:
  - "유사 카피 비교: 3건 중 0건 고유사도"
  - "표현 다양성: 상위 15%"

Section 2 — SEO evaluation:
- Summary card: "SEO 평가 85점"
- Expandable accordion "상세 보기 ▼" → when open shows:
  - Keyword relevance bar: "리넘" 95%, "원피스" 90%, "여름코디" 72% — horizontal bars, green fill
  - "중복 키워드: 1건 (리넘 2회 사용)"
  - Monthly search volume badges: "리넘 원피스 12,100" "여름 원피스 33,400"

Section 3 — Improvement feedback:
- Title: "개선 피드백"
- 3 feedback items, each in a light yellow (#FFF8E1) card:
  1. "'리넘' 키워드를 제목 앞부분으로 이동하면 검색 노출에 유리합니다"
  2. "'여름코디' 키워드를 본문에 자연스럽게 추가해 보세요"
  3. "소재 강조 문구를 구체적 수치(예: 마 60%)로 보강하면 신뢰도가 높아집니다"
- Primary button: "피드백 반영하여 카피 수정" full width

Style: white background, green gauge, light yellow feedback cards, Pretendard font, 8px corners. Accordion sections collapsed by default.
```

---

## Screen 5 — 카피 관리

```
Design a copy management page for "카피메이커", Korean AI copywriting tool.

Layout: single column, vertical stack.

Top bar:
- Page title: "카피 관리" left
- Search input right (placeholder: "카피 검색...", search icon)
- Filter dropdown: "전체", "패션", "식품", "생활용품"

Table list:
- Header row: 카피명 | 독창성 | SEO | 생성일 | 상태 | 액션
- Data rows:
  - "여름 리넘 원피스 카피" | 87% (green badge) | 85점 | 2026.05.25 | 사용중 (blue badge) | ··· menu
  - "무선 미니 가습기 카피" | 92% (green badge) | 90점 | 2026.05.24 | 저장됨 (gray badge) | ··· menu
  - "제주 한라봉 세트 카피" | 78% (yellow badge) | 72점 | 2026.05.23 | 저장됨 (gray badge) | ··· menu
  - "오가닉 코튼 수건 카피" | 91% (green badge) | 88점 | 2026.05.22 | 사용중 (blue badge) | ··· menu
- ··· menu opens dropdown: 편집, 복사, 내보내기, 삭제(red text)

Bottom: pagination (< 1 2 3 >)

Style: white background, subtle row borders, zebra striping optional. Green badges for 80%+, yellow for 70-79%, Pretendard font, 8px corners on badges. Clean data-table aesthetic.
```

---

## Screen 6 — 설정

```
Design a settings page for "카피메이커", Korean AI copywriting tool.

Layout: single column, vertical sections, max-width 640px centered.

Section 1 — "계정 정보":
- Profile row: circular avatar placeholder (gray, initials "김") + name "김스마트" + email "smart@mail.com"
- Two secondary buttons side by side: "프로필 수정", "비밀번호 변경"

Section 2 — "알림 설정":
- Toggle rows, each with label left and toggle switch right:
  - "카피 생성 완료 알림" — toggle ON (green)
  - "SEO 리포트 알림" — toggle ON (green)
  - "마케팅 소식 알림" — toggle OFF (gray)

Section 3 — "연결된 계정":
- Row: Kakao icon + "카카오 계정 연결됨" + "연결 해제" text link
- Row: Naver icon + "네이버 계정" + "연결하기" green text link

Divider line.

Bottom: "로그아웃" button, outlined red style (#E53E3E), left-aligned.

Style: white background, grouped sections with subtle dividers (1px #E5E7EB), Pretendard font, 8px corners. Toggle switches use green (#03C75A) for on state.
```
