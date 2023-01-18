# githubApi

github restApi connect

## 기본 실행 방법

- **npm run dev**를 통해 local, host로 실행 가능
- **npm run build**를 통해 build 파일 생성 가능

## 기본 세팅 환경

- node version **16.18.0**
- npm version **8.5.5**
- react **18.2.0**
- build **vite**
- airbnb 스타일의 eslint 적용

## 사용 library

- 기본 통신 **axios**
- api 사용법 **react-query**
- 상태관리 **recoil**
- 날짜관련 **date-fns**
- css **emotion**

### api 정리

- GET /repos/{owner}/{repo} : owner에 대한 리포지토리 보기
- GET /repos/{owner}/{repo}/issues : 리포지토리에 대한 이슈 보기(여러 querystring을 받지만 page, page_per_page만 이용)
- 여러 error들이 있지만 error 처리는 404일때만 화면에 보이도록 작업

### 사용법

- 상단 네비게이션에 원하는 owner를 정한 후 /에서 리포지토리 검색(3초 딜레이로 디바운스 설정) 및 추가, 삭제 가능
- 이슈 보기에서 15개씩 이슈를 볼 수 있으며 보기를 통해 링크 이동, <를 클릭하여 전화면으로 이동 가능
- ex) owner : TanStack, repo : query,table,react-charts,router
