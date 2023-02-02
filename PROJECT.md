# Project 구조

tms-dhs-user-management(데이터허브 사용자 관리), react(17.0.2), styled-components, react-app-rewired 적용
아래 파일 구조 설명에는 있으나, 실제 해당 디렉토리가 없는 경우 선택 기능으로 가령 다국어를 사용하는 경우에는 해당 디렉토리 구조를 차용 한다.

## Folder Tree

```bash
📦tms-react-boilerplate
 ┣ 📂.vscode                                   # vscode 설정 파일이 있는 디렉토리
 ┣ 📂docs                                      # 프로젝트 관련 documents
 ┣ 📂node_modules
 ┣ 📂public                                    # React Static File
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜index.html
 ┣ 📂src                                       # 개발 소스
 ┃ ┣ 📂assets                                      # assets 자산 파일 모음
 ┃ ┃ ┣ 📂fonts                                         # image 파일 모음
 ┃ ┃ ┣ 📂images                                        # image 파일 모음
 ┃ ┣ 📂i18n                                        # 다국어 관련
 ┃ ┃ ┣ 📜i18n.ts                                       # 다국어 설정 파일
 ┃ ┃ ┣ 📜translation.en.json                           # 영문 다국어 파일
 ┃ ┃ ┣ 📜translation.ko.json                           # 한글 다국어 파일
 ┃ ┣ 📂styles                                      # 스타일 관련
 ┃ ┃ ┣ 📜GlobalFonts.ts                                # 전역 font 스타일 설정 파일
 ┃ ┃ ┣ 📜GlobalStyle.ts                                # 전역 스타일 설정 파일
 ┃ ┃ ┣ 📜theme.ts                                      # 다크모드, 라이트모드 등 테마 처리 파일
 ┃ ┃ ┣ 📜index.ts                                      # 스타일 관련 export, 내보내기 처리
 ┃ ┣ 📂services                                    # service 파일 모음
 ┃ ┃ ┣ 📂utils                                         # 유틸성 파일 모음 (상수, 공통 함수 등)
 ┃ ┃ ┃ ┣ 📜constant.ts                                     # 상수로 쓰이는 변수 선언 파일
 ┃ ┃ ┃ ┣ 📜message.ts                                      # 메세지 선언 파일
 ┃ ┃ ┣ 📂api                                           # restApi 호출 관련 http 통신 관련, api 디렉토리 하위로 서비스 별 구분
 ┃ ┃ ┃ ┣📂... 디렉토리 분류
 ┃ ┃ ┃ ┣📜HttpService.ts                               # 공용 http function 정의 파일
 ┃ ┃ ┣ 📂store                                     # redux 관련, store 디렉토리 하위로 타입 및 기능 별 구분
 ┃ ┃ ┃ ┣📂... 디렉토리 분류
 ┃ ┃ ┃ ┣📜hooks.ts                                     # redux 관련 custom hooks 정의 파일, useSelector / useDispatch
 ┃ ┃ ┃ ┣📜index.ts                                     # redux 관련 export, 내보내기 처리
 ┃ ┣ 📂types                                       # type definition 관련
 ┃ ┃ ┣ 📜fonts.d.ts                                    # font 파일 확장자 허용 관련 type definition 지정
 ┃ ┃ ┣ 📜images.d.ts                                   # 이미지 확장자 허용 관련 type definition 지정
 ┃ ┣ 📂views                                       # views(컴포넌트 및 화면 파일) 소스
 ┃ ┃ ┣ 📂components                                    # 메뉴 별 컴포넌트 모음 (아래는 예제)
 ┃ ┃ ┃ ┣ 📂userManagement                                  # 사용자 관리 관련 컴포넌트 모음
 ┃ ┃ ┃ ┣ 📂groupManagement                                 # 그룹 관리 관련 컴포넌트 모음
 ┃ ┃ ┃ ┣ 📂common                                          # 공통 컴포넌트 모음
 ┃ ┃ ┃ ┣📜index.ts                                         # 컴포넌트 export, 내보내기 처리
 ┃ ┃ ┣ 📂layouts                                   # 레이아웃 컴포넌트 모음
 ┃ ┃ ┃ ┣📜Layout.tsx                                   # 전체를 감싸는 컨텐츠 wrapper
 ┃ ┃ ┃ ┣📜Main.tsx                                     # 컨텐츠 영역 wrapper
 ┃ ┃ ┃ ┣📜Aside.tsx                                    # 사이드 영역 wrapper
 ┃ ┃ ┃ ┣📜index.tsx                                    # 레이아웃 컴포넌트 export, 내보내기 처리
 ┃ ┃ ┣ 📂pages                                     # 페이지 컴포넌트 모음
 ┃ ┃ ┃ ┣📜UserManagement.tsx                           # 사용자 관리 페이지 컴포넌트
 ┃ ┃ ┃ ┣📜GroupManagement.tsx                          # 그룹 관리 페이지 컴포넌트
 ┃ ┃ ┃ ┣📜index.ts                                     # 페이지 컴포넌트 export, 내보내기 처리
 ┃ ┣ 📜app.tsx                                     # app 컴포넌트 파일
 ┃ ┣ 📜index.tsx                                   # react 진입점 파일
 ┣ 📜.env                                      # 환경변수 파일
 ┣ 📜.dockerignore                             # docker ignore 파일
 ┣ 📜.editorconfig                             # vscode 설정 파일
 ┣ 📜.eslintrc.json                            # lint 설정 파일
 ┣ 📜.gitignore                                # git ignore 설정
 ┣ 📜.prettierignore                           # prettier ignore 설정
 ┣ 📜.prettierrc                               # prettier 설정 파일
 ┣ 📜package.json                              # 패키지 정보 파일
 ┣ 📜PROJECT.md                                # 프로젝트 구조 정보 MarkDown 파일
 ┣ 📜README.md                                 # 프로젝트 기본 정보 MarkDown 파일
 ┣ 📜tsconfig.json                             # typescript 설정
 ┣ 📜webpack.dev.config.ts                     # 개발용 웹팩 설정 파일
 ┗ 📜webpack.prod.config                       # 배포용 웹팩 설정 파일
```
