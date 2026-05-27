# Coding Style

## 네이밍

| 대상 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 파일 | PascalCase.jsx | `ImageUpload.jsx` |
| 훅·유틸 파일 | camelCase.js | `useImageUpload.js` |
| 일반 파일 | kebab-case | `generate-copy.js` |
| 함수 | camelCase | `handleSubmit` |
| 컴포넌트 | PascalCase | `InputForm` |
| 상수 | UPPER_SNAKE | `MAX_KEYWORDS` |

## 컴포넌트 규칙

- 파일 1개 = 컴포넌트 1개
- named export 금지 → `export default` 사용
- props는 구조분해 할당으로 받기

## 스타일

- Tailwind CSS 유틸리티 클래스만 사용 (별도 CSS 파일 금지)
- 인라인 style 금지
- 조건부 클래스는 템플릿 리터럴 또는 `clsx` 사용

## 상태 관리

- 전역 상태 라이브러리 없음 (MVP 기준 useState + props)
- 서버 상태(로딩·에러)는 커스텀 훅으로 추상화

## 에러 응답 포맷

API Route 에러는 반드시 아래 포맷 유지:
```json
{ "error": true, "message": "..." }
```

## 커밋 메시지

```
feat: 한 줄 요약 (한국어)
fix: 한 줄 요약
docs: 한 줄 요약
```

## 기타

- 주석: WHY만 작성 (WHAT 금지)
- 단위 테스트 생략, 통합 테스트 1개 (vitest)
- 한국어만 — UI 텍스트·에러 메시지·주석 모두
