# 004 — 문서 동기화 (CLAUDE.md Stage B 전환 + tasks.md 상태)

> 작업일: 2026-05-29
> 근거: `docs/planning/progress.md`가 Phase 6·8 및 T-002에서 반복 대기시킨 "CLAUDE.md 동시 정렬" 후속 항목 (CLAUDE.md 4.6 동시 정렬 절차, 사용자 "다음" 승인).

## 배경

코드 자산(`client/`·`server/`)이 도입됐는데 CLAUDE.md는 여전히 Stage A를 "현재"로 표기하고, Prisma 경로·리포 구조 설명이 실제와 어긋나 있었다. tasks.md에는 상태 추적 수단이 없어 progress.md와 단절돼 있었다.

## 체크리스트

### CLAUDE.md (실제 구조 정렬)
- [x] 0장: Stage 표기 `(현재)`를 A → **B**로 이동, 코드 자산 도입 명시
- [x] 1장: "코드베이스가 아닌 ... (Stage A)" → Stage B 공존 서술, 산출물 목록에 `client/`·`server/` 추가, `.playwright-mcp` git 미추적 명시
- [x] 5장: 리포 구조 항목 추가 — 루트 통합 package.json 부재, 터미널 2개 개발, `.env`·Prisma의 server 자기완결
- [x] 6.2장: Prisma 스키마 `server/prisma/schema.prisma`, Client 진입점 `server/src/db/client.ts`(생성물 `server/generated/prisma/`)로 정정

### tasks.md (상태 동기화)
- [x] 상단에 "진행 현황" 요약 표 추가 (SSOT는 progress.md로 명시)
- [x] 미결 사항에 T-006 번호 공백 확인 항목 추가

## 검증
- [x] CLAUDE.md 4개 편집 모두 적용 (Edit 성공)
- [x] tasks.md 2개 편집 적용
- [x] 변경은 문서 한정, 코드·빌드 영향 없음

## 비고 / 잔여
- `.playwright-mcp` 언급이 1장·4.1장 등 일부 잔존하나 무해(자동 재생성)하여 본 작업에서 전수 정리는 보류.
- T-006 공백의 실제 처리(예약/신규 정의)는 사용자 확인 필요 — 미결 사항으로 등록.
