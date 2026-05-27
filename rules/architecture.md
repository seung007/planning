# Architecture

## 스택
- **Frontend:** React 19 + Vite + Tailwind CSS
- **AI:** Claude API (claude-sonnet-4) — 이미지 분석 + 한국어 카피 생성
- **배포:** Vercel (서버리스 API Routes)

## 디렉토리 구조

```
app/                        # React + Vite 프론트엔드
  src/
    components/             # UI 컴포넌트 (PascalCase.jsx)
    hooks/                  # 커스텀 훅 (camelCase.js)
    utils/                  # 유틸 함수 (camelCase.js)
    api/                    # 클라이언트 → API Route 호출 로직
  index.html
api/                        # Vercel 서버리스 함수 (Claude API 키 보호)
  generate.js
docs/                       # PRD, 페르소나, 페인포인트, 태스크
rules/                      # 아키텍처·코딩 규칙 (이 파일)
```

## 데이터 흐름

```
사용자 입력 (이미지 + 키워드)
  → src/api/generateCopy.js   (fetch POST)
  → api/generate.js           (Vercel Function, Claude API 호출)
  → 카피 3개 반환
  → ResultSection 렌더링
```

## 제약
- 서버리스 함수에서만 ANTHROPIC_API_KEY 사용 (클라이언트 노출 금지)
- 모바일 미지원 (PC 브라우저 전용)
- 한국어 UI·결과만
