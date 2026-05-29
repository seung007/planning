# 003 — server 빌드 경로 정합성 수정

> 계획 파일: `C:\Users\goril\.claude\plans\claude-md-docs-tasks-md-docs-planning-p-shimmying-locket.md`
> 작업일: 2026-05-29

## 배경

`server`의 빌드 산출물과 실행 진입점이 어긋나 `npm run start`가 깨져 있었다.

- `server/tsconfig.json:7` `"rootDir": "."` + `include`에 `src`·`generated` 동시 포함(`:17`) → `tsc`가 계층 보존 → 실제 출력은 `dist/src/index.js`.
- `server/package.json`의 `main`·`start`는 존재하지 않는 `dist/index.js`를 가리킴.
- T-001 스캐폴딩 시점부터 존재, `progress.md` Phase 6·7·8에서 3회 미뤄진 후속 이슈.

## 접근 (옵션 A 채택)

`rootDir`을 좁히면(옵션 B) `generated/**/*`가 rootDir 밖이 되어 TS6059 + Prisma 클라이언트 미컴파일로 런타임이 깨진다. `server/src/db/client.ts`가 `../../generated/prisma/client`를 import하므로 generated는 함께 컴파일되어야 한다. 따라서 진입점 경로를 실제 출력에 맞추는 옵션 A 채택.

## 체크리스트

- [x] `server/package.json:5` `main`: `dist/index.js` → `dist/src/index.js`
- [x] `server/package.json:9` `start`: `node dist/index.js` → `node dist/src/index.js`

## 검증 결과

- [x] `npm run build` → exit 0, `dist/src/index.js` 생성
- [x] `main`·`start` 모두 `dist/src/index.js`로 정렬 확인
- [x] `node dist/src/index.js` 기동 → `Server running on port 4000`
- [x] `curl /health` → `{"status":"ok"}` (이전엔 `Cannot find module` 실패)

## 비고

- 파일 1개·2줄 수정. tsconfig·의존성 무변경.
- 향후 server 빌드 구조 단순화(rootDir 좁히기 + generated 별도 처리)는 별도 검토 사항으로 유지.
