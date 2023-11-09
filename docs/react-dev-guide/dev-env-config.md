# Frontend (React) 개발 환경 구성

## Node.js설치
---
**Node.js**가 PC에 설치되어 있지 않다면 설치한다. v18.16.0 LTS버전을 설치한다.  
[설치링크:(https://nodejs.org)](https://nodejs.org)  

1. LTS버전 v18.16.0
    <!-- - node-v18.16.0-x64.msi
    - node-v18.16.0-win-x64.zip -->
<!-- 3. 환경변수 설정 (설정 > 시스템 > 정보 > 고급시스템설정 > 환경변수)
4. 환경변수에서 시스템변수의 Path를 ‘새로만들기’ 누르고 zip파일 압축 해제한 폴더 경로를 입력한다.
5. 정확하게는 node.exe파일이 있는 폴더의 경로를 지정 해주면 된다. -->
```sh
# 설치 후 설치 버전 확인
node -v
# v18.16.0

npm -v
# 9.5.1
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

* **Visual Studio Code(VSCode)** 를 설치한 후 개발에 도움이 되는 **Extensions**를 설치한다. 

::: tip VSCode Extensions 설치
VSCode에서 사용할 수 있는 <span style="color:#d53f3a">필수</span> 또는 <span style="color:#6363ff">선택</span> 익스텐션 입니다.
* <span style="color:#d53f3a">ESLint</span> : (필수) 코드의 포맷팅과 품질관리 도구.
* <span style="color:#d53f3a">Prettier</span> - Code formatter : (필수) 코드를 정렬해주는 Formatter.
* <span style="color:#d53f3a">GitLens Git supercharged</span> : (필수) 각 파일에서 Line별로 가장 마지막에 누가, 언제, 무슨 commit했는 지 확인할 수 있다.
* <span style="color:#6363ff">indent-rainbow</span> : (선택) 들여쓰기에 컬러표시로 가독성을 좋게함.
* <span style="color:#6363ff">Import Cost (Display import/require package size in the editor)</span> : (선택) import하는 모듈의 사이즈를 보여줌.
* <span style="color:#6363ff">TODO Highlight</span> : (선택) 주석처리 시 'TODO:' 이렇게 시작하는 text를 입력하면 색깔로 반전시켜주는 기능.
* <span style="color:#6363ff">vscode-icons</span> : (선택) VSCode의 아이콘을 이쁘게 보여줌.
* <span style="color:#6363ff">es6-string-html</span> : (선택) es6 여러 줄 문자열에서 구문 강조 표시.
* <span style="color:#6363ff">SVN</span> : (SVN을 사용하는 환경이라면...) 검색된 svn중에 Integrated Subversion source control Chris Johnston을 설치한다.
:::


### VSCode Extensions 온라인 설치 방법
* VSCode에서 아래 이미지와 같이 검색어 입력란에 Extensions명을 입력하여 설치한다.
![VSCode Extension온라인 설치](/assets/image/react-dev-guide/vscode_et01.png)

### VSCode Extensions 오프라인 VSIX설치 방법(외부 인터넷이 되지 않는 환경일때 )
* 외부 인터넷이 되지 않는 환경의 PC에서는 Frontend 공통개발자가 따로 제공하는 ***.visx**파일을 이용하여 설치한다.
* 아래와 같이 순서대로 가지고 있는 ***.vsix**파일을 선택하고 install한다.
![VSCode Extension온라인 설치](/assets/image/react-dev-guide/vscode_et02.png)
* 설치가 완료 되고 오른쪽 하단에 아래와 같이 팝업이 뜨면 성공.
![VSCode Extension온라인 설치](/assets/image/react-dev-guide/vscode_et03.png)




## Chrome Browser 설치
---
Frontend 개발 시 로컬환경에서 다양한 개발자 환경을 제공하는 크롬 브라우저를 설치한다.  
[Chrome 브라우저 설치 링크](https://www.google.co.kr/chrome/?brand=QCDH&gclid=CjwKCAiA8bqOBhANEiwA-sIlN8GC9kFUJffeeF2Ybz1S6hHu3fWQl0lz3T22w26Iuy6bV53q9KBqexoCYGwQAvD_BwE&gclsrc=aw.ds)





## React Developer Tools 설치 (크롬 브라우저 확장 프로그램)
---
React를 사용할 때, React 앱을 보다 사용자 친화적인 인터페이스에서 검사하고 디버깅할 수 있다.  
[React Developer Tools 설치 링크](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ko)





## VSCode에서 <span style="color:#005192;">Git bash</span> 쉘(Shll)프로그램을 사용하자.
---
* VSCode를 사용하여 Frontend개발을 진행하다 보면 terminal창을 이용하는 상황이 많이 생긴다.
* 만약 **Windows**(윈도우) 운영체제(OS)를 사용하는 환경 이라면, <span style="color:#5bc0de;">리눅스 커맨드를 사용</span>할 수 있는 <span style="color:#005192;">Git bash</span> 터미널을 사용한다.
* VSCode에서 터미널창을 열때 아래와 같이 <span style="color:#005192;">Git bash</span>로 바꿔서 사용한다.
![VSCode Extension온라인 설치](/assets/image/react-dev-guide/vscode_et04.png)




## React 프론트앤드 소스코드(react_boilerplate) 내려받기
---
* Git 리포지토리 URL : http://211.208.101.192:4043/reactTest/react_guest.git   
	:point_right: <span style="color:#5bc0de;">프로젝트 진행 시 해당 프로젝트 리포지토리로 대체 필요(해당 관리자에게 요청).</span>
* Frontend 소스를 받기 위해서는 계정 및 권한이 필요하다. (해당 권한은 담당자에게 요청)
* :star: admin react 저장소 : https://git-codecommit.ap-northeast-2.amazonaws.com/v1/repos/frontend-react-admin

### 작업 폴더 생성 및 git clone
* 먼저 PC에 작업 할 폴더를 생성한다.
```sh
# D:\my\ 디렉토리에서 폴더를 생성한다고 가정.
# 내가 작업 할 폴더를 'frontend-react' 라고 한다면
mkdir frontend-react
# D:\my\frontend-react 폴더가 생성 됨.
```
* 위에서 생성한 작업 폴더로 이동한다.
```sh
cd frontend-react
# D:\my\frontend-react로 이동.
```
* 생성한 **frontend-react** 폴더에서 `git clone`을 실행한다.
```sh
git clone http://211.208.101.192:4043/reactTest/react_guest.git 
```
* `git clone`이 진행되면 **front-react**폴더 안에 **react_guest**폴더가 생성되고 그 안에 초기 소스들이 clone되어 있다.




## 내려받은 (Frontend)소스, VSCode로 열기
---
* VSCode를 열고, `git clone`한 폴더를 불러온다.
* 아래 이미지의 "frontend-vue3-boilerplate"가 아닌 **(해당 프로젝트 저장소 명)** 폴더를 선택.
![VSCode로 vue소스 불러오기](/assets/image/react-dev-guide/ide-guide01.png)
* 불러올 폴더를 선택하면 아래와 같이 해당 프로젝트가 VSCode에서 열린다.
![VSCode로 vue소스 불러오기](/assets/image/react-dev-guide/ide-guide02.png)



## hosts파일 설정 (https, 도메인url설정을 해야할 경우만)
---
* 내려받은 (Frontend)소스는 로컬 서버를 띄울 때 **https** 로 띄워지게 설정이 되어있고, 또한 **REST API**호출 시 API서버와 같은 서버 도메인으로 호출 되어야 하므로 **hosts**파일에 아래 내용을 추가 해줘야 한다. 만약 **API서버** 설정과 영향이 없는 경우에는 **hosts**파일 수정을 하지 않아도 된다.
#### Windows에서 설정
* C:\Windows\System32\drivers\etc\ 경로에 **hosts**파일을 열어서 <span style="color:green">127.0.0.1 f.dfpcen.com</span> 을 적어주고 저장한다.
#### MAC 에서 설정
* /etc/ 경로에 **hosts**파일을 열어서 <span style="color:green">127.0.0.1 f.dfpcen.com</span> 을 적어주고 저장한다.



## VSCode 에디터 설정
---
### VSCode 설정
<span style="color:green">FrontEnd</span> 개발 시 모든 개발자의 통일된 소스코드 편집을 위하여 **Visual Studio Code**의 환경설정을 한다.
#### settings.json 설정
> <span style="color:#5bc0de">settings.json</span> 파일열기 : **f1 -> settings 입력 -> Preferences: Open Workspace Settings (JSON)** 클릭  
> 위와같이 열면 프로젝트 루트에 <span style="color:#5bc0de">.vscode</span> 디렉토리가 생성되고 <span style="color:#5bc0de">settings.json</span>파일이 생성된다.  
> settings가 적용되는 우선 순위는 <span style="color:#5bc0de">.vscode settings.json > settings.json > defaultSetting.json(건들지 않아요)</span>  
> <span style="color:#5bc0de">defaultSetting.json</span>은 모든 설정내용이 다 들어있다. <span style="color:#ff0000">수정은 하지 않는다.</span>  
> .vscode 디렉토리에 생성된 settings.json에 아래 내용 입력.

```json
{
	"editor.formatOnSave" : true,
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": true,
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
	"editor.defaultFormatter": "esbenp.prettier-vscode",
}
```
> :star: 이렇게 `settings.json`으로 VSCode 설정을 적용하면 **메뉴(File > Preferences > Settings)** 로 선택하여 적용한 설정보다 우선순위가 높게 적용된다.




## VSCode에서 Frontend 서버 띄우고 브라우저로 확인해 보기
---
* :star:먼저 내려받은 소스의 `node_modules`가 없기 때문에 의존성 라이브러리를 설치 해줘야 한다.
* VSCode의 터미널 창에서 아래 명령어를 실행하여 설치.
```sh
npm install
```
![VSCode에서 npm install 실행](/assets/image/react-dev-guide/ide-guide03.png)

* 의존성 라이브러리가 설치가 완료 되면, 로컬PC에서 Frontend서버를 띄우고 브라우저로 확인해 볼 수 있다.
* Frontend서버 띄우기
```sh
npm run dev
```
![VSCode에서 frontend 서버 띄우기](/assets/image/react-dev-guide/ide-guide04.png)
![VSCode에서 frontend 서버 띄우기](/assets/image/react-dev-guide/ide-guide05.png)
* Frontend 서버가 띄워졌으면, 브라우저로 확인해 보기
![VSCode에서 frontend 서버 띄우기](/assets/image/react-dev-guide/ide-guide06.png)
