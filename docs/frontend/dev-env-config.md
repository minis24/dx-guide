# Frontend (Vue) 개발 환경 구성

## Node.js설치
---
**Node.js**가 PC에 설치되어 있지 않다면 설치한다. v16.19.0 LTS버전을 설치한다.  
[설치링크:(https://nodejs.org)](https://nodejs.org)  

1. LTS버전 v16.19.0
    <!-- - node-v16.19.0-x64.msi
    - node-v16.19.0-win-x64.zip -->
<!-- 3. 환경변수 설정 (설정 > 시스템 > 정보 > 고급시스템설정 > 환경변수)
4. 환경변수에서 시스템변수의 Path를 ‘새로만들기’ 누르고 zip파일 압축 해제한 폴더 경로를 입력한다.
5. 정확하게는 node.exe파일이 있는 폴더의 경로를 지정 해주면 된다. -->
```sh
# 설치 후 설치 버전 확인
node -v
# v16.19.0

npm -v
# 8.19.3
```


## Git 설치
---
Git사용을 위하여 설치한다.  
[설치링크:(https://git-scm.com/downloads)](https://git-scm.com/downloads) 
:::tip MAC 사용자 Git 관련
* MAC PC 사용자는 Xcode를 설치하면 Git을 따로 설치할 필요가 없다.
:::



## Visual Studio Code 설치
---
**Vue Frontend** 개발을 위한 Microsoft사에서 만든 개발용 IDE 이다.  
[설치링크:(https://code.visualstudio.com/Download)](https://code.visualstudio.com/Download)

* **Visual Studio Code(VSCode)** 가 설치되면 개발에 도움이 되는 **Extensions**를 설치한다. 

::: tip VSCode Extensions 설치
VSCode에서 사용할 수 있는 <span style="color:#d53f3a">필수</span> 또는 <span style="color:#6363ff">선택</span> 익스텐션 입니다.
* <span style="color:#d53f3a">Vue Language Features (Volar)</span> : (필수) Syntax-Highlighting, Error Checking, Formatting, Debugging, Auto Completion 등 원활한 코딩을 위해 도움.
  Vue3 공식추천 Extension. `기존 Vetur가 설치되어있다면 비활성화 시킨다.`
* <span style="color:#d53f3a">ESLint</span> : (필수) 코드의 포맷팅과 품질관리 도구.
* <span style="color:#d53f3a">Prettier</span> - Code formatter : (필수) 코드를 정렬해주는 Formatter.
* <span style="color:#d53f3a">GitLens Git supercharged</span> : (필수) 각 파일에서 Line별로 가장 마지막에 누가, 언제, 무슨 commit했는 지 확인할 수 있다.
* <span style="color:#6363ff">Vue 3 Snippets(A Vue.js 3 And Vue.js 2 Code Snippets Extension)</span> : (선택) Vue.js 3 및 Vue.js 2 코드 스니펫 확장(코드 자동완성)
* <span style="color:#6363ff">indent-rainbow</span> : (선택) 들여쓰기에 컬러표시로 가독성을 좋게함.
* <span style="color:#6363ff">Import Cost (Display import/require package size in the editor)</span> : (선택) import하는 모듈의 사이즈를 보여줌.
* <span style="color:#6363ff">TODO Highlight</span> : (선택) 주석처리 시 'TODO:' 이렇게 시작하는 text를 입력하면 색깔로 반전시켜주는 기능.
* <span style="color:#6363ff">Vue Peek</span> : (선택) 코드상에 작성되어 있는 Vue컴포넌트를 통해서 해당 컴포넌트 파일을 열고 그 파일로 이동할 수 있는 기능.
* <span style="color:#6363ff">vscode-icons</span> : (선택) VSCode의 아이콘을 이쁘게 보여줌.
* <span style="color:#6363ff">es6-string-html</span> : (선택) es6 여러 줄 문자열에서 구문 강조 표시.
* <span style="color:#6363ff">SVN</span> : (SVN을 사용하는 환경이라면...) 검색된 svn중에 Integrated Subversion source control Chris Johnston을 설치한다.
:::

### VSCode Extensions 온라인 설치 방법
* VSCode에서 아래 이미지와 같이 검색어 입력란에 Extensions명을 입력하여 설치한다.
![VSCode Extension온라인 설치](/assets/image/vue3-dev-guide/vscode_et01.png)

### VSCode Extensions 오프라인 VSIX설치 방법(외부 internet network이 되지 않는 환경일때 )
* 외부 Network가 되지 않는 환경의 PC에서는 따로 제공되어지는 ***.visx**파일을 제공 받아 설치한다.
* 아래와 같이 가지고 있는 *.vsix파일을 선택하고 install한다.
![VSCode Extension온라인 설치](/assets/image/vue3-dev-guide/vscode_et02.png)
* 설치가 완료 되고 오른쪽 하단에 아래와 같이 팝업이 뜨면 성공.
![VSCode Extension온라인 설치](/assets/image/vue3-dev-guide/vscode_et03.png)



## Chrome Browser 설치
---
앱 개발 시 로컬환경에서 다양한 개발자 환경을 제공하는 크롬 브라우저를 설치한다.  
[Chrome 브라우저 설치 링크](https://www.google.co.kr/chrome/?brand=QCDH&gclid=CjwKCAiA8bqOBhANEiwA-sIlN8GC9kFUJffeeF2Ybz1S6hHu3fWQl0lz3T22w26Iuy6bV53q9KBqexoCYGwQAvD_BwE&gclsrc=aw.ds)



## Vue Devtools 설치 (크롬 브라우저 확장 프로그램)
---
Vue를 사용할 때, Vue 앱을 보다 사용자 친화적인 인터페이스에서 검사하고 디버깅할 수 있다.  
[Vue Devtools 설치 링크](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)



## VSCode에서 <span style="color:#005192;">Git bash</span> 쉘(Shll)프로그램을 사용하자.
---
* VSCode를 사용하여 Frontend개발을 진행하다 보면 terminal창을 이용하는 상황이 많이 생긴다.
* 만약 Windows(윈도우) 운영체제(OS)를 사용하는 환경 이라면, <span style="color:#5bc0de;">리눅스 커맨드를 사용</span>할 수 있는 <span style="color:#005192;">Git bash</span> 터미널을 사용한다.
* VSCode에서 터미널창을 열때 아래와 같이 <span style="color:#005192;">Git bash</span>로 바꿔서 사용한다.
![VSCode Extension온라인 설치](/assets/image/vue3-dev-guide/vscode_et04.png)



## Vue3 소스코드(vue3_boilerplate) 내려받기
---
* Git 리포지토리 URL : http://222.108.241.81:4043/vue3test/vue3_guest.git
* Frontend 소스를 받기 위해서는 계정 및 권한이 필요하다. (해당 권한은 담당자에게 요청)

### 작업 폴더 생성 및 git clone
* 먼저 PC에 작업 할 폴더를 생성한다.
```sh
# D:\my\ 디렉토리에서 폴더를 생성한다고 가정.
# 내가 작업 할 폴더를 'frontend-vue3' 라고 한다면
mkdir frontend-vue3
# D:\my\frontend-vue3 폴더가 생성 됨.
```
* 위에서 생성한 작업 폴더로 이동한다.
```sh
cd frontend-vue3
# D:\my\frontend-vue3 로 이동 됨.
```
* 생성된 **frontend-vue3** 폴더에서 `git clone`을 실행한다.
```
git clone http://222.108.241.81:4043/vue3test/vue3_guest.git
```
* `git clone`이 진행되면 **frontend-vue3**폴더안에 **vue3_guest**폴더가 생성이 되어있고 그 안에 vue 소스들이 생성되어있다.


## 내려받은 (Frontend)소스, VSCode로 다시 열기
---
* VSCode를 다시 열고, `git clone`한 폴더를 불러온다.
* "frontend-vue3-boilerplate"가 아닌 **vue3_guest**폴더.
![VSCode로 vue소스 불러오기](/assets/image/vue3-dev-guide/ide-guide01.png)
* 불러올 폴더를 선택하면 아래와 같이 해당 프로젝트가 VSCode에서 열린다.
![VSCode로 vue소스 불러오기](/assets/image/vue3-dev-guide/ide-guide02.png)



## hosts파일 설정
---
#### Windows에서 설정
* C:\Windows\System32\drivers\etc\ 경로에 **hosts**파일을 열어서 <span style="color:green">127.0.0.1 f.dfpcen.com</span> 을 적어주고 저장한다.
#### MAC 에서 설정
* /etc/ 경로에 **hosts**파일을 열어서 <span style="color:green">127.0.0.1 f.dfpcen.com</span> 을 적어주고 저장한다.




## VSCode IDE 설정
---
### VSCode 설정
<span style="color:green">FrontEnd</span> 개발 시 모든 개발자의 통일된 소스코드 편집을 위하여 **Visual Studio Code**의 환경설정을 한다.
#### settings.json 설정
> <span style="color:#5bc0de">settings.json</span> 파일열기 : **f1 -> settings 입력**
> settings를 입력하면 나오는 내용중에 `Preferences: Open Workspace Settings (JSON)`를 찾아 클릭 
> 위와같이 열면 프로젝트 루트에 <span style="color:#5bc0de">.vscode</span> 디렉토리가 생성되고 <span style="color:#5bc0de">settings.json</span>파일이 생성된다.    
> **.vscode** 디렉토리에 생성된 **settings.json**에 아래 내용 입력.
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
> :star: 이렇게 `settings.json`으로 VSCode 설정을 적용하면 **메뉴(File > Preferences > Settings)** 로 선택하여 적용한 설정보다 우선순위가 높게 적용된다.



## VSCode에서 Frontend 서버 띄우고 브라우저로 확인해 보기
---
* :star:먼저 내려받은 소스의 `node_modules`가 없기 때문에 의존성 라이브러리를 설치 해줘야 한다.
* VSCode의 터미널 창에서 아래 명령어를 실행.
```sh
npm install
```
![VSCode에서 npm install 실행](/assets/image/vue3-dev-guide/ide-guide03.png)

* 의존성 라이브러리가 설치가 완료 되면, 로컬PC에서 Frontend서버를 띄우고 브라우저로 확인해 볼 수 있다.
* Frontend서버 띄우기
```sh
npm run dev
```
![VSCode에서 frontend 서버 띄우기](/assets/image/vue3-dev-guide/ide-guide04.png)
![VSCode에서 frontend 서버 띄우기](/assets/image/vue3-dev-guide/ide-guide05.png)
* Frontend 서버가 띄워졌으면, 브라우저로 확인해 보기
![VSCode에서 frontend 서버 띄우기](/assets/image/vue3-dev-guide/ide-guide06.png)
