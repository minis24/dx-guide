# VSCode + Spring boot 개발환경 구축

::: tip Nodejs, VSCode 설치
PC에 Nodejs와 VSCode가 설치되어 있다는 가정하에 진행 합니다.
:::

## java 설치
---
[java설치링크: https://www.oracle.com/java/technologies/downloads/#jdk19-windows](https://www.oracle.com/java/technologies/downloads/#jdk19-windows) 
* 설치된경로 : C:\Program Files\Java\jdk-19\

## java 환경변수등록
---
* 윈도우 검색창에 "시스템 환경 변수 편집" 검색 후 시스템 환경변수 창 오픈.  
* 시스템 환경 변수 편집 > 고급 > 환경변수(N)... > 시스템 변수(S) > 새로만들기(W)
* JAVA_HOME을 등록한다.
![java 환경변수 등록 이미지](/assets/image/springboot/environment_variable.png)
![JAVA_HOME등록](/assets/image/springboot/environment_variable2.png)
* 시스템 환경 변수 편집 > 고급 > 환경변수(N)... > Administrator에 대한 사용자 변수(U) > 변수:Path > 편집(E) 선택하여 아래와 같이 %JAVA_HOME%\bin을 입력한다.
![JAVA_HOME등록](/assets/image/springboot/environment_variable3.png)
* java 버전 확인
![JAVA_HOME등록](/assets/image/springboot/environment_variable4.png)

## VSCode 환경설정
---
### VSCode JAVA_HOME 설정
* File > Preferences > Settings로 진입하여 Extensions의 Java에서 Jdt > Ls > Java:Home부분에서 Edit in settings.json을 클릭한다.
::: tip
* 만약 Extensions에 Java가 보이지 않는다면 **Spring Boot Extension Pack** 익스텐션을 먼저 설치하면 보임.
:::
![VSCode JAVA_HOME등록](/assets/image/springboot/environment_variable5.png)
* settings.json파일에서 아래와 같이 java home경로를 등록한다.
![VSCode JAVA_HOME등록](/assets/image/springboot/environment_variable6.png)

## VSCode Extension 설치
---
* VSCode Extensions 탭을 연다
![VSCode Extension온라인 설치](/assets/image/vscode_et01.png)
* 검색어 입력란에 **Spring Boot Extension Pack**를 입력하고 바로 설치한다.
![VSCode Extension설치](/assets/image/springboot/environment_variable7.png)

## VSCode Spring 프로젝트 생성
---
* 단축키 **Ctrl + P**를 하면 VSCode 명령어 프롬프트를 열고 `Spring Initialize~~` 입력하면 3가지 정도 메뉴가 나온다. 여기서 원하는 프로젝트를 선택하여 계속 진행합니다.
![VSCode Spring boot 프로젝트 생성](/assets/image/springboot/environment_variable8.png)
* 계속해서 프로그래밍 언어선택, 기본경로, 의존성 버전등을 추가로 선택하고 프로젝트를 생성한다.