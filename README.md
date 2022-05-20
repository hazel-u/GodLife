# 갓생살기

> ‘갓생(God+生)’ 빙고 인증 및 공유 플랫폼

![Untitled](ReadMe%200b5233aa851a46be977f025c104dd82a/Untitled.png)

`쉽게만 살아가면 재미없어 빙고!`

여러분은 얼마나 ‘갓생(God+生)’을 살고 계시나요?

‘갓생살기’와 함께 매일의 갓생 빙고판을 채우고 친구들과 공유해보세요!

**[ 바로가기 ]**

🖥 갓생살기 | 📄 프로젝트 노션 | ⚙ 이용 가이드 

## 1️⃣ 기능 소개

### 주요 기능

- ‘갓생(God+生)’ 빙고
- ‘갓생(God+生)’ 공유 피드

### 세부 기능

| 구분                             | 기능        | 설명                                                         |
| -------------------------------- | ----------- | ------------------------------------------------------------ |
| 1                                | 빙고 만들기 | ‘갓생(God+生)’ 기준의 목표를 선택하여 빙고 생성              |
| 9개 미만 선택 시, 목표 자동 선택 |             |                                                              |
| 2                                | 빙고 진행   | 3줄 빙고 시, ‘갓생(God+生)’ 기준 충족으로 ‘갓생(God+生)’ 달성 |
| 3                                | 공유하기    | 이미지 저장, 링크 복사, 카카오톡, 트위터, 페이스북 공유 기능 |
| 4                                | 피드 기능   | 팔로우하는 사용자의 갓생 목록이 피드 형태로 보여짐           |

## 2️⃣ 설계 요소

### 아키텍쳐

![Untitled](ReadMe%200b5233aa851a46be977f025c104dd82a/Untitled%201.png)

### Wireframe

![Untitled](ReadMe%200b5233aa851a46be977f025c104dd82a/Untitled%202.png)

## 3️⃣ 팀 소개

### 인원

| 천민우    | 강수현    | 승나연   | 유혜승   | 이수민    | 이정음   |
| --------- | --------- | -------- | -------- | --------- | -------- |
|           |           |          |          |           |          |
| 💪팀장     |           |          |          |           |          |
| 🖼FrontEnd | 🖼FrontEnd | 🛠BackEnd | 🛠BackEnd | 🖼FrontEnd | 🛠BackEnd |
| ⚙Infra    |           |          |          |           |          |

### 기술 스택

1. 이슈관리: Jira
2. 형상관리: Gitlab
3. 커뮤니케이션: MatterMost, Notion
4. 디자인: Figma
5. 개발 환경
   - DB: MariaDB, H2, Redis
   - Server: AWS EC2, Ubuntu 20.04, nginx
6. Frontend
   - JavaScript, HTML, CSS
   - React
   - Redux toolkit
   - TypeScript
7. Backend
   - Java 11
   - Spring Boot, Spring Data JPA, Spring Security, Querydsl,
   - Lombok, Swagger, JWT
8. IDE & Tool
   - intelliJ
   - Heidi SQL
   - Visual Studio Code

### 일정

| 스프린트 | 내용                          |
| -------- | ----------------------------- |
| Sprint 1 | 주제 설정 및 아이디어 구체화  |
|          | 1차 MVP 요구사항 명세         |
|          | 와이어 프레임 작성            |
|          | 협업 컨벤션 설정              |
| Sprint 2 | 컴포넌트 구조 설계            |
|          | ERD 설계 및 API 설계          |
| Sprint 3 | 1차 MVP 기능 제작 및 QA 진행  |
| Sprint 4 | 1차 MVP 배포                  |
|          | 2차 MVP 요구사항 명세         |
|          | 컴포넌트 구조 재 설계         |
|          | ERD 및 API 재 설계            |
| Sprint 5 | 2차 MVP 기능 제작 및 QA 진행  |
|          | 산출물(ReadMe, 발표자료) 제작 |
