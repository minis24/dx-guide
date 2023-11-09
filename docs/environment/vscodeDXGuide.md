# VSCode + DX기술지원팀 안내 사이트 작성을 위한 개발환경 구성

::: tip :bell: Nodejs, Git, VSCode 설치
* PC에 Nodejs, Git, VSCode가 설치되어 있다는 가정하에 진행 합니다.  
설치되어있지 않다면 [Frontend개발환경구성](/frontend/dev-env-config.md) 내용에 따라 환경설정을 먼저 한 후 진행 합니다.
:::

## 새 프로젝트를 생성
---
* DX가이드 사이트 소스코드를 Git을 통해 내려받을 폴더를 PC에 먼저 생성한다.
```sh
mkdir project-name
cd project-name
```

## Git 레파지토리 소스 clone하기
---
* 생성한 폴더에서 Git 저장소 DX가이드 소스를 **clone**하여 내려 받는다.  
  `Git저장소 URL : https://git-codecommit.ap-northeast-2.amazonaws.com/v1/repos/dfpcen-dx-guide`
```sh
git clone https://git-codecommit.ap-northeast-2.amazonaws.com/v1/repos/dfpcen-dx-guide
```

## 내려받은 소스의 의존성 라이브러리 설치
---
Git을 통해 내려받은 소스코드는 사이트 제작에 필요한 의존성 라이브러리들이 명시만 되어있으므로 설치가 필요하다.  
내려받은 소스의 `dx_guide` 폴더 내부로 들어가서 `npm install`명령어를 통해 npm 의존성 라이브러리를 설치 한다.
```sh
cd dx_guide
npm install
```

## VSCode를 열고 dx_guide 프로젝트 폴더를 open 한다.
---
VSCode의 File > Open Folder로 내려받은 소스 폴더로 이동하여 open한다.
![VSCode열기 이미지](/assets/image/dxguide/img1.png)


## 해당 프로젝트의 로컬서버 띄워서 브라우저에서 확인해보기
---
DX가이드 제작을 위한 준비가 모두 완료 되었으므로,  
프로젝트 루트인 `dx_guide` 폴더에서 아래와 같이 입력하여 로컬 서버를 띄운다.
```sh
npm run docs:dev
```
![VSCode열기 이미지](/assets/image/dxguide/img3.png)
* 브라우저에서 확인해보기
![VSCode열기 이미지](/assets/image/dxguide/img4.png)



## 폴더 구조
---
![폴더구조 이미지](/assets/image/dxguide/img2.png)
* **docs** : 모든 페이지 작업은 **docs** 폴더 내부에서 한다.
* **docs/.vitepress** : vitepress설정 및 빌드
* **docs/.vitepress/config.js** : vitepress설정파일  
  -> base : 프로젝트 빌드 후 서버 root폴더  
  -> title : 사이트 명  
  -> themeConfig : 사이트 전체 레이아웃 및 그에따른 설정값 셋팅
* **docs/assets** : 페이지에서 사용되는 이미지
* **docs/backend** : backend관련 페이지
* **docs/frontend** : frontend관련 페이지
* **docs/environment** : 환경설정관련 페이지

## 새 페이지 만들어 보기
---
모든 페이지는 ***.md** 파일 확장자로 생성한다.  
우선 예를들어 `backend` 폴더 아래 `test.md`파일을 생성한다.
```sh
cd dx_guide/docs/backend
touch test.md
```
생성한 파일을 열어서 내용을 아래와 같이 간단하게 작성 한다.  
모든 소스 작업은 `markdown`형식으로 작성 한다.  
[Markdown 참조 URL: https://vitepress.vuejs.org/guide/markdown](https://vitepress.vuejs.org/guide/markdown)
```sh
# 안녕 테스트 페이지!
```

## 만들어진 새 페이지(test.md) 좌측메뉴에 연결해 보기
---
* `.vitepress/config.js`파일을 연다.
* `config.js`파일 구조 (config설정 방법은 공식문서를 참조) [config공식문서링크](https://vitepress.vuejs.org/config/introduction)
![메뉴연결 이미지](/assets/image/dxguide/img5.png)
* 브라우저에서 추가된 테스트 페이지 확인  
![테스트페이지 브라우저 확인 이미지](/assets/image/dxguide/img6.png)


## 수정된 소스는 항상 Git최신화
---
[Git 명령어 참조 URL: https://git-scm.com/docs](https://git-scm.com/docs)
* 소스를 올리기 전에 `Git` 레파지토리의 최신 소스를 먼저 `pull`받아서 내 소스를 최신화 시킨다.
```sh
git pull origin master
```
* 수정된 소스는 항상 `Git` 레파지토리에 `push`를 진행해서 올린다.  

```sh
git status
git add .
git commit -m '테스트페이지생성'
git push origin master
```


## 프로젝트 빌드 배포
---
::: tip jenkins로 배포하기
* jenkins 배포 준비가 되어있지 않은 경우에만 FTP로 아래와 같이 배포 한다.
* 현재 DX기술지원팀 가이드 배포 jenkins url : (jenkins.dfpcen.com:8090) <- 접속 계정은 관리자에게 요청.
![jenkins로그인](/assets/image/dxguide/img9.png)
:::

* 프로젝트 루트에서 빌드 스크립트를 입력하여 프로젝트를 빌드 하면 `.vitepress`폴더아래 `dist`폴더로 **정적페이지** 파일들이 생성된다.
```sh
# 수정한 소스를 빌드하는 명령어
npm run docs:build
```
```sh
# 빌드 진행과정이 아래와 같이 보여진다.
> dx_front_guide@1.0.0 docs:build
> vitepress build docs

vitepress v1.0.0-alpha.38
✓ building client + server bundles...
✓ rendering pages...    
build complete in 8.15s.
```
* 빌드된 `dist`내 정적파일들은 **FTP**로 웹서버에 올린다.
![ftp셋팅 이미지](/assets/image/dxguide/img7.png)
![ftp 위치 이미지](/assets/image/dxguide/img8.png)