# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 1. 프로젝트 개요
1인 스마트스토어 셀러를 위한
카피 생성 도구.
상품 사진과 키워드로
카피 3개를 빠르게 만들어줌.

## 2. 기술 스택과 파일 구조

**Frontend:** React + Vite, Tailwind CSS
**AI:** Claude API (claude-sonnet) — 이미지 분석 + 한국어 카피 생성
**배포:** Vercel (서버리스 API Routes 포함, 별도 백엔드 없음)

```
src/
  components/   # PascalCase.jsx — UI 컴포넌트
  hooks/        # camelCase — 커스텀 훅
  utils/        # camelCase — 유틸 함수
  api/          # AI 호출 로직
api/            # Vercel 서버리스 함수 (Claude API 키 보호)
public/
```

## 3. 코딩 가이드라인

- 네이밍: camelCase 함수, PascalCase 컴포넌트
- 파일: kebab-case .jsx
- 커밋: `feat` / `fix` / `docs` + 한 줄 요약 (한국어)
- 테스트: 통합만, vitest 1개 (단위 테스트 생략)
- 주석: 왜만 (무엇은 제외)

## 4. 제약사항
- 모바일 안 함
- 한국어만

자세한 내용은 docs/prd.md 참조
