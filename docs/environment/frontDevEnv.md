# Frontend (Vue) 개발 환경 구성

## Node.js설치
---
**Node.js**가 PC에 설치되어 있지 않다면 설치한다. 되도록 LTS버전을 설치한다.  
[설치링크:(https://nodejs.org)](https://nodejs.org)  

1. LTS버전 v16.14.2
<!-- 3. 환경변수 설정 (설정 > 시스템 > 정보 > 고급시스템설정 > 환경변수)
4. 환경변수에서 시스템변수의 Path를 ‘새로만들기’ 누르고 zip파일 압축 해제한 폴더 경로를 입력한다.
5. 정확하게는 node.exe파일이 있는 폴더의 경로를 지정 해주면 된다. -->
```sh
# 설치 후 설치 버전 확인
node -v
# v16.14.2

npm -v
# 8.5.0
```

## Git 설치
---
Git사용을 위하여 설치한다.  
[설치링크:(https://git-scm.com/downloads)](https://git-scm.com/downloads) 


## Visual Studio Code 설치
---
**Vue SPA** 개발을 위한 Microsoft사에서 만든 개발용 IDE  
[설치링크:(https://code.visualstudio.com/Download)](https://code.visualstudio.com/Download)

::: tip VSCode Extensions 설치
VSCode를 설치한 후에 VSCode에서 사용할 수 있는 <span style="color:#d53f3a">필수</span> 또는 <span style="color:blue">선택</span> 익스텐션들입니다.
* <span style="color:#d53f3a">Vue Language Features (Volar)</span> : (필수) Syntax-Highlighting, Error Checking, Formatting, Debugging, Auto Completion 등 원활한 코딩을 위해 도움.
  Vue3 공식추천 Extension. `기존 Vetur가 설치되어있다면 비활성화 시킨다.`
* <span style="color:#d53f3a">ESLint</span> : (필수) 코드의 포맷팅과 품질관리 도구.
* <span style="color:#d53f3a">Prettier</span> - Code formatter : (필수) 코드를 정렬해주는 Formatter.
* <span style="color:#d53f3a">GitLens Git supercharged</span> : (필수) 각 파일에서 Line별로 가장 마지막에 누가, 언제, 무슨 commit했는 지 확인할 수 있다.
* <span style="color:blue">Bracket Pair Colorizer 2</span> : (선택) 여는 괄호와 닫는 괄호를 같은 색으로 꾸며줘, 코드 블록 시작과 끝이 어딘지를 쉽게 파악할 수 있도록 도와줌.
* <span style="color:blue">Vue 3 Snippets</span> : (선택) Vue.js 3 및 Vue.js 2 코드 스니펫 확장(코드 자동완성)
* <span style="color:blue">indent-rainbow</span> : (선택) 들여쓰기에 컬러표시로 가독성을 좋게함.
* <span style="color:blue">Import Cost</span> : (선택) import하는 모듈의 사이즈를 보여줌.
* <span style="color:blue">TODO Highlight</span> : (선택) 주석처리 시 'TODO:' 이렇게 시작하는 text를 입력하면 색깔로 반전시켜주는 기능.
* <span style="color:blue">Vue Peek</span> : (선택) 코드상에 작성되어 있는 Vue컴포넌트를 통해서 해당 컴포넌트 파일을 열고 그 파일로 이동할 수 있는 기능.
* <span style="color:blue">vscode-icons</span> : (선택) VSCode의 아이콘을 이쁘게 보여줌.
* <span style="color:blue">es6-string-html</span> : (선택) es6 여러 줄 문자열에서 구문 강조 표시.
* <span style="color:blue">SVN</span> : (SVN을 사용하는 환경이라면...) 검색된 svn중에 Integrated Subversion source control Chris Johnston을 설치한다.
:::

### VSCode Extensions 온라인 설치 방법
* 아래 이미지와 같이 검색어 입력란에 Extensions명을 입력하여 설치한다.
![VSCode Extension온라인 설치](/assets/image/vscode_et01.png)


## Chrome Browser 설치
---
앱 개발 시 로컬환경에서 다양한 개발자 환경을 제공하는 크롬 브라우저를 설치한다.  
[Chrome 브라우저 설치 링크](https://www.google.co.kr/chrome/?brand=QCDH&gclid=CjwKCAiA8bqOBhANEiwA-sIlN8GC9kFUJffeeF2Ybz1S6hHu3fWQl0lz3T22w26Iuy6bV53q9KBqexoCYGwQAvD_BwE&gclsrc=aw.ds)


## Vue Devtools 설치 (크롬 브라우저 확장 프로그램)
---
Vue를 사용할 때, Vue 앱을 보다 사용자 친화적인 인터페이스에서 검사하고 디버깅할 수 있다.  
[Vue Devtools 설치 링크](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)


## 기타 프로그램
---
### MAC PC를 사용한다면 유용한 유틸리티
**SmartSVN(유료)** : macOS, Windows 및 Linux용으로 널리 사용되는 Subversion 클라이언트.
설치링크(https://www.smartsvn.com/download/)
* SVN을 사용한다면 유용한 유틸리티 이며 무료로 설치해도 일부 기능은 사용 가능하다.


## VSCode Editor 설정
---
### VSCode 설정
<span style="color:green">FrontEnd</span> 개발 시 모든 사람들의 통일된 소스코드 편집을 위하여 **Visual Studio Code**의 환경설정을 한다.
#### settings.json 설정
> <span style="color:#5bc0de">settings.json</span> 파일열기 : **f1 -> settings 입력 -> Preferences: Open Workspace Settings (JSON)** 클릭  
> 위와같이 열면 프로젝트 루트에 <span style="color:#5bc0de">.vscode</span> 디렉토리가 생성되고 <span style="color:#5bc0de">settings.json</span>파일이 생성된다.    
> .vscode 디렉토리에 생성된 settings.json에 아래 내용 입력.
```json
{
	"editor.formatOnSave" : false,
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": false,
	},
	"editor.tabSize": 2,
	"editor.detectIndentation": false,
	"editor.insertSpaces": false,
	"editor.renderWhitespace": "all",
	"editor.comments.insertSpace": false,
	"files.associations": {
		"*.json": "jsonc"
	},
	"eslint.validate": ["typescript","vue","javascript"],
	"eslint.workingDirectores": [{"mode":"auto"}],
}
```