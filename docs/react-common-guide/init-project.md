# Frontend project 처음 생성 가이드 (공통개발자영역)

## React프로젝트 생성하기(프로젝트 최초 생성 시)
---
* 커맨드 창을 열고 원하는 폴더 위치로 이동하여 최초 프로젝트를 생성할 npm 명령어를 입력한다.
* <span style="color:green">npm create vite@latest</span> 를 입력하여 Vite 프로젝트 생성을 진행한다.
```sh
npm create vite@latest
```
:::tip Vite(빌드 도구)를 이용한 프로젝트 생성
* Vite를 이용한 빌드 도구를 사용할 것이므로 최초 Vite 환경으로 프로젝트를 생성한다.
:::
* 설치과정 중 아래와 같이 **Project name**을 입력하고, framework는 **React**, variant는 **TypeScript** 를 선택한다.
![Vite 프로젝트 설치](/assets/image/react-common-guide/common01.png){width=370}
* 생성된 프로젝트로 이동하여 `npm install`명령어를 실행하여 의존성 라이브러리를 설치 하고 `npm run dev`명령어로 Frontend서버를 띄워 확인해 본다.
```sh
cd react-project
npm install
npm run dev
```
![설치한 Vite프로젝트 브라우저에서 확인](/assets/image/react-common-guide/common02.png){width=80%}
:::tip
* `.eslintrc.cjs`파일에 'module' is not defined.eslint(no-undef) 빨간줄 에러발생 시 처리.
!['module'에러 발생](/assets/image/react-common-guide/common03.png){width=350}
:point_right:처리: .eslintrc파일에 **env** 옵션에 `node: true` 추가.
```js
module.exports = {
	...
  env: { node: true, ... },
	...
}
```
:::




## VSCode settings.json 적용
---
<span style="color:green">FrontEnd</span> 개발 시 필요한 **Visual Studio Code** 에디터 설정.
#### settings.json 설정
> <span style="color:#5bc0de">settings.json</span> 파일열기 : **f1 -> settings 입력 -> Preferences: Open Workspace Settings (JSON)** 클릭  
> 위와같이 열면 프로젝트 루트에 <span style="color:#5bc0de">.vscode</span> 디렉토리가 생성되고 <span style="color:#5bc0de">settings.json</span>파일이 생성된다.  
> .vscode 디렉토리에 생성된 `settings.json`에 아래 내용 입력.  
:::tip VSCode의 settings 우선순위
* settings가 적용되는 우선 순위는 <span style="color:#5bc0de">.vscode의 settings.json > settings.json > defaultSetting.json(건들지 않음)</span>  
* <span style="color:#5bc0de">defaultSetting.json</span>은 모든 설정내용이 다 들어있다. <span style="color:#ff0000">수정은 하지 않는다.</span>  
:::

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
}
```




## ESLint설정
---
* **.eslintrc.cjs** 파일에 **rules** 옵션을 추가한다. (아래내용)
```js
module.exports = {
	env: { node: true, browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react-refresh'],
	rules: {
		'react-refresh/only-export-components': ['warn', { checkJS: true }],
		'@typescript-eslint/no-explicit-any': 0, // any타입을 에러표시할지 체크.
		'@typescript-eslint/no-var-requires': 0,
		'@typescript-eslint/explicit-module-boundary-types': 0,
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'eol-last': ['error', 'always'],
		semi: ['error', 'always'],
		quotes: ['error', 'single', { allowTemplateLiterals: true }],
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'comma-dangle': [
			'error',
			{
				arrays: 'always-multiline',
				objects: 'always-multiline',
				functions: 'only-multiline',
				imports: 'only-multiline',
			},
		],
		'object-curly-spacing': ['error', 'always', { objectsInObjects: true }],
		'arrow-parens': ['error', 'always'],
		'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
		'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
		'react/self-closing-comp': [
			'error',
			{
				component: true,
				html: true,
			},
		],
		'jsx-quotes': ['error', 'prefer-double'],
		'react/jsx-no-target-blank': ['error', { allowReferrer: false }],
		'react/jsx-max-props-per-line': ['error', { maximum: 1 }],
		'react/jsx-indent': [
			'error',
			'tab',
			{
				checkAttributes: true,
				indentLogicalExpressions: false,
			},
		],
		'react/prop-types': ['error', { skipUndeclared: true }],
	},
};
```

:::tip ESLint rules 적용 후 설정한 rule이 없다는 에러 관련.
* 아래와 같이 rule을 찾을 수 없다는 에러 발생
!['module'에러 발생](/assets/image/react-common-guide/common04.png){width=90%}
* **:star:eslint-plugin-react 플러그인 설치**
	- React에 대한 Lint 규칙을 추가하기 위하여 `eslint-plugin-react` 플러그인을 설치한다. ex) 'react/...' 관련 룰.
	```sh
	npm i -D eslint-plugin-react
	```
	그리고 아래 내용 `.eslintrc.cjs`파일에 추가한다.
	```js
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
	],
	```
:::

:::tip ESLint rule 적용으로 인해 각 페이지 오류 표시 관련.
* 대표적으로 **App.tsx** 파일을 확인해 보면 ESLint 적용으로 인해 빨간 에러줄 표시가 많이 보인다.
* 모든 파일은 이제부터 ESLint적용 룰을 따라야 하므로, 모두 ESLint에 맞게 파일 내용을 수정해 주어야 한다.
* 이미 VSCode의 **settings.json** 설정에 파일 저장 시 바로 ESLint에 맞게 자동 수정되어 저장 되게 적용이 되어 있으므로, 오류가 있는 파일을 열고 바로 저장을 하면 ESLint관련 오류 부분은 수정이 된다.
:::

:::tip :star:'React' must be in scope when using JSX 에러 발생 시 처리.
* 이와 같은 에러 발생 원인은 코드 상단에 `import React from 'react';`가 없어서 생기는 에러이다.
* 좀 더 쉽게 처리하기 위하여 `.eslintrc.cjs`파일에 아래 코드를 추가 하고 맨처음 시작하는 `App.tsx`나 `main.tsx`파일 한군데만 `import React from 'react';`를 추가해 주면 나머지 파일에는 **import**해주지 않아도 된다.
```js
extends: [
	'plugin:react/jsx-runtime',
],
```
:::


:::tip
=============

WARNING: You are currently running a version of TypeScript which is not officially supported by @typescript-eslint/typescript-estree.

You may find that it works just fine, or you may not.

SUPPORTED TYPESCRIPT VERSIONS: >=3.3.1 <5.1.0

YOUR TYPESCRIPT VERSION: 5.1.3

Please only submit bug reports when using the officially supported version.

* Typescript버전 관련 에러 발생 시 Typescript버전을 바꿔 설치한다.
:::

:::tip :star:`npm run lint` 명령 실행 시 아래 오류 발생했을 때 처리
* Warning: React version not specified in eslint-plugin-react settings. See https://github.com/jsx-eslint/eslint-plugin-react#configuration .
  - 위 에러 발생 시 **.eslintrc.cjs**파일에 아래 내용 추가하면 에러 사라짐.
```sh
module.exports = {
  settings: {
		react: {
			version: 'detect',
		},
	},
};
```
:::
* ESLint의 **rules**를 지정해 주었기 때문에 `App.tsx, main.tsx`등의 파일에서 Lint에러가 많이 발생할 수 있다. Lint rule에 맞게 모두 직접 수정해 준다. (현재까지 진행 하였을 경우 VSCode의 settings.json 설정에 '파일 저장 시 ESLint가 바로 수정' 되므로 오류 페이지를 열고 저장을 실행 하면 된다.)




## prettier설정
---
:::tip Prettier 참조 내용
* **Prettier**는 작성된 JS 코드의 스타일을 중점적으로 수정해주는 코드 스타일링 도구이다.
* **ESLint**와 차이점
	- ESLint는 Formatting, Code Quality등 코드의 전반적인 에러 방지 및 수준을 높여주는 역할을 하고, Prettier는 코드의 스타일링에 특화 되어 있어, Formatter 역할 만 한다.
* 사용이유
	- 개발자 마다 다른 코드 스타일을 가지고 협업을 진행할 경우, 코드의 일관성이 떨어지고 유지보수 측면에도 좋지 않은 결과를 초래하므로 **작성된 코드의 일관성**을 지정하기 위함이다.
:::

* :star: 주의할 점
	- ESLint에도 Formatting기능이 있기 때문에 ESLint와 함께 사용하게 되면 상호 간의 충돌이 발생하는 경우가 있다. 그래서 Prettier와 함께 ESLint를 사용할 때는 ESLint의 Formatting Rule을 전부 Disabled 처리 한다.
	- `eslint-config-prettier`는 Prettier와 충돌 가능성이 있는 옵션을 전부 Off 해준다.
	- `eslint-plugin-prettier`는 eslintrc의 plugins에 포함하고 rules에 `prettier/prettier`를 설정할 수 있다.


* 설치
```sh
npm install -D prettier
npm install -D eslint-config-prettier eslint-plugin-prettier
```
* 프로젝트 루트에 **.prettierrc.cjs**파일 생성하고 룰을 설정한다.
```js
/**
 * @name: .pretteierrc.cjs
 * @description: Prettier는 코드를 읽어들여서 사용자 옵션에 따라 코드를 다시 포맷팅하는 "코드 포맷터" 입니다.
 * @version: 2.8.8
 */
module.exports = {
	/**
	 * @template: printWidth: <int>
	 * @description: 코드 한줄의 개수
	 * 추천) 가독성을 위해 80자 이상을 사용하지 않는 것이 좋습니다.
	 * 추천) 코드 스타일 가이드에서 최대 줄 길이 규칙은 종종 100 또는 120으로 설정됩니다.
	 */
	printWidth: 120,

	/**
	 * @template: tabWidth: <int>
	 * @description: 들여쓰기 너비 수(탭을 사용할 경우 몇칸을 띄워줄지)
	 */
	tabWidth: 2,

	/**
	 * @template: useTabs: <bool>
	 * @description: 탭 사용 여부 (미사용 시 스페이스바로 간격조정을 해야함.)
	 */
	useTabs: true,

	/**
	 * @template: semi: <bool>
	 * @description: 명령문의 끝에 세미콜론(;)을 인쇄합니다.
	 * true: (;)를 추가함
	 * false: (;)를 지움
	 */
	semi: true,

	/**
	 * @template: singleQuote: <bool>
	 * @description: 큰따옴표("") 대신 작은따옴표('')를 사용여부
	 * true: 홀따옴표로 사용
	 * false: 큰따옴표로 사용
	 */
	singleQuote: true,

	/**
	 * @template: jsxSingleQuote: <bool>
	 * @description: JSX내에서 큰따옴표("") 대신 작은따옴표('')를 사용여부
	 * true: 홀따옴표로 사용
	 * false: 큰따옴표로 사용
	 */
	jsxSingleQuote: false,

	/**
	 * @template: trailingComma: "<es5|none|all>"
	 * @description: 객체나 배열을 작성하여 데이터를 넣을때, 마지막에 후행쉼표를 넣을지 여부
	 * es5: 후행쉼표 제외
	 * none: 후행쉼표 없음
	 * all: 후행쉼표 포함
	 */
	trailingComma: 'all',

	/**
	 * @template: jsxBracketSameLine: <bool> [Deprecated](대신 bracketSameLine 사용)
	 * @description: ">" 다음 줄에 혼자 있는 대신 여러 줄 JSX 요소를 마지막 줄 끝에 넣습니다
	 * true: 줄넘김하지 않음
	 * false: 줄넘김을 수행
	 */
	//jsxBracketSameLine: false,
	bracketSameLine: false,

	/**
	 * @template: bracketSpacing: <bool>
	 * @description: 개체 리터럴에서 대괄호 사이의 공백을 넣을지 여부
	 * true: 공백을 넣음 { foo: bar }
	 * false: 공백을 제외 {foo: bar}
	 */
	bracketSpacing: true,
	/**
	 * @template: singleAttributePerLine: <bool>
	 * @description: HTML, Vue 및 JSX에서 한 줄에 하나의 속성을 적용할지 여
	 * true: 속성이 한개 이상일경우 multi속성 적용
	 * false: 적용하지 않음
	 */
	singleAttributePerLine: true,
};
```
* **prettier**설치와 **.prettierrc.cjs**파일로 원하는 옵션을 설정한 후 **prettier 포맷 체크** 해보기
```sh
npx prettier --check ./src
```
* 명령어를 실행하면 아래와 같이 prettier 설정 포맷에 어긋나는 파일 리스트를 확인할 수 있다.
```sh
Checking formatting...
[warn] jsxBracketSameLine is deprecated.
[warn] src/App.css
[warn] src/App.tsx
[warn] src/index.css
[warn] src/main.tsx
[warn] Code style issues found in 4 files. Forgot to run Prettier?
```
* 포맷팅 적용하기
```sh
npx prettier --write ./src
```
	- 명령어를 실행하면 prettier 옵션 포맷팅 형식에 맞게 바뀌어 모든 파일이 적용된다.
* VSCode에 적용하기
	- setting.json파일 내용 추가
	```json
	{
		"editor.formatOnSave": true,
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	}
	```
	- 이와같이 작성하면 파일 수정 후 저장 시 **prettier**형식에 맞게 포맷팅이 자동 변경되어 저장 된다. 만약 저장 시 포맷 자동 적용을 빼고 싶다면 `editor.formatOnSave: false` 로 적용하면 된다. 대신 파일 저장 시 자동 포맷팅이 되지 않으므로 직접 일일이 수정 해주어야 한다.



* 명령어 자동화를 위해 상황에 맞게 **package.json**파일의 **scripts**부분에 아래와 같이 셋팅하여 `npm run` 명령어로 사용할 수 있다. 
```js
"scripts": {
	"lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
	"lint:fix": "eslint src/**/*.{ts,tsx} --fix",
	"format": "prettier --check ./src",
	"format:fix": "prettier --write ./src"
}
```

* **eslint**에 **prettier** 함께 적용하기 (설치 되어있으면 설치 과정은 패스)
```sh
npm i -D eslint-config-prettier eslint-plugin-prettier
```
**eslint-config-prettier**와 **eslint-plugin-prettier** 를 설치 되었다면 **.eslintrc.cjs**파일에 아래 내용을 추가한다.

```js
module.exports = {
	extends: [
		'plugin:prettier/recommended',
	],
};
```
:::tip eslint와 prettier 설정의 충돌
* **ESLint**와 **Prettier**는 모두 포맷팅 룰이 있어서 서로 겹치는 설정 값이 있다. 이것을 각각 옵션을 따로 설정하다 보면 충돌이 발생하는 경우가 있다. 이럴때는 같은 기능을 하는 옵션을 서로 같은 결과가 나오게 수정해 주어야 한다.
* 예를 들어 **ESLint**의 **semi**값은 `never`이고, **Prettier**의 **semi**값은 `true`라고 설정하면 서로 충돌이 발생한다.
:::








## @types폴더 사용법
---
* 프로젝트 루트에 **@types**폴더를 생성한다. 폴더 내부에는 기본 **index.d.ts**파일을 생성한다.
* **index.d.ts**파일의 용도는 전체 **App**의 전역 type을 설정하는 용도의 파일이다. 나중에 전역 컴포넌트, 전역함수를 만들고 타입을 설정할때 **index.d.ts**파일에 전역타입 설정을 하게 된다.
* 그 외 써드파티 라이브러리 중 **@types/...** 가 제공되지 않는 경우에 **@types**폴더 안에 해당 라이브러리 ***.d.ts**파일을 선언해주는 용도로 사용하면 된다.
* 만약 **prismjs** 라이브러리의 ***.d.ts**파일을 선언한다고 가정했을 때 아래와 같이 생성하여 만들어 준다.
```js
// 'prismjs'라는 라이브러리 types를 선언한 예시
...
@types
  ├─ index.d.ts
  ├─ prismjs.d.ts  // prismjs.d.ts파일을 생성한다.
...
```
* prismjs.d.ts파일의 소스 예제
```ts
declare module 'prismjs';
```
::: tip tsconfig.json 설정
* tsconfig.json에는 **typeRoots**를 아래와 같이 설정함.
```js
"compilerOptions": {
  "typeRoots": ["./node_modules/@types", "./@types"]
},
"include": ["src", "@types/index.d.ts"], // 컴파일 할 파일 경로
```
* 내가 만든 `@types` 타입 루트를 인식하기 위해 tsconfig.json의 **typeRoots**옵션에 설정해줘야 한다.
* './node_modules/@types'는 원래 기본 타입루트이며, 내가 설정한 새로운 타입루트가 설정되면 명시적으로 함께 넣어줘야 한다.
:::





## cross-env 사용 관련
---
* **OS**상관없이 동일하게 커맨드 명령어로 환경설정을 할 수 있다.(필요한 경우에만 사용)
* `npm install --save-dev cross-env` 설치 후 아래와 같이 사용.
```js
cross-env NODE_ENV=production ... ...
```
* package.json `scripts`에 작성 예시
```js
{
  "scripts": {
    ...
    "serve": "cross-env NODE_ENV=development node server",
    ...
  }
}
```





## src 폴더 '@'별칭 만들기
---
* 코드 작성 시 좀 더 편의를 제공하기 위해 src폴더의 위치를 **@** 별칭으로 만들어 사용한다.
* **tsconfig.json** **@** 별칭 셋팅 (TypeScript용 별칭)
```sh
// tsconfig.json 파일의 baseUrl옵션과 paths옵션을 설정 한다.
{
	"compilerOptions": {
		"baseUrl": ".",
		"paths": {
			"@/*": ["./src/*"]
		}
	}
}
```
* **vite.config.ts** **@** 별칭 셋팅 (번들링 시 별칭)
	- **fileURLToPath**와 **URL**을 사용하기 위해 먼저 "@types/node"를 설치 하고 아래 코드를 작성한다.
	```sh
	npm i -D @types/node
	``` 
```sh
import { fileURLToPath, URL } from 'node:url';

// vite.config.ts 파일의 alias옵션을 설정한다.
export default definConfig({
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		}
	}
});
```






## 폴더 및 파일 정리(React구성 완료 시 다시 확인 필요)
---
* 최초 기본 폴더 구조를 생성하기 위해 필요없는 폴더, 파일들을 삭제 또는 수정하고 가장 기본이 되는 아래 폴더 구조로 레이아웃을 만든다.
### 기본 폴더 구조
```sh
...
src
  ├─ App.tsx
  ├─ main.tsx
  ├─ app
  │  ├─ api
  │  ├─ common
  │  ├─ components
  │  ├─ pages
  │  ├─ router
  │  ├─ store
  │  ├─ types
  ├─ assets
  │  ├─ fonts
  │  ├─ images
  │  ├─ scss
  ├─ domains
  │  ├─ home
  │  |  ├─ api
  │  |  ├─ pages
  │  |  ├─ router
  │  |  ├─ store
  │  ├─ example
  │  |  ├─ api
  │  |  ├─ pages
  │  |  ├─ router
  │  |  ├─ store
  │  ├─ // 각 업무 domain 계속 추가할 수 있음.
... // 기타 설정파일들
```
* <span style="color:green;font-weight:bold;">app</span>폴더는 Frontend관련 전체 공통 관련 파일들이 있다. 공통개발자 이 외 업무개발자는 작업하지 않는 공간이다.
* <span style="color:green;font-weight:bold;">assets</span>폴더는 모든 정적 파일들(front, image, css파일 등)을 모아놓은 폴더이다.
* <span style="color:green;font-weight:bold;">domains</span>폴더에는 각 업무 domain들이 있고, 그 하위에는 일률적으로 <span style="color:#0089ff">api, components, pages, router, store, types</span>폴더를 가질 수 있다. 각 폴더는 업무 상황에 따라 생성하여 사용한다. 사용하지 않는 폴더는 없어도 상관없다.  
  - <span style="color:#0089ff">api</span> : REST API URL과 request, response의 type을 정의한다.
  - <span style="color:#0089ff">components</span> : 업무 화면에서 사용하는 컴포넌트들을 모아놓은 폴더.
  - <span style="color:#0089ff">pages</span> : 해당 도메인의 업무화면 *.vue파일들.
  - <span style="color:#0089ff">router</span> : 업무화면의 라우터를 작성하는 폴더.
  - <span style="color:#0089ff">store</span> : api를 통하여 화면에 보여줄 데이타를 사용할 pinia관련 (state,  action, getter) 정리를 하는 폴더.
  - <span style="color:#0089ff">types</span> : 해당 업무에서 사용하는 모든 type을 정리하는 폴더.







## Router 설치 및 설정
---
* 설치
```sh
npm i react-router react-router-dom
npm i -D @types/react-router @types/react-router-dom
```
* **App.tsx**파일에 **Router**연결 (기존 JSX코드를 모두 지우고, **RouterProvider**를 이용하여 router를 바인딩 한다.)
```js
import { FC } from 'react';
import '@/assets/scss/App.scss';
import { RouterProvider } from 'react-router-dom';
import router from '@/app/router';

const App: FC = () => {
	return (
		<>
			{/* TODO: 추가 html 요소가 있으면 추가. */}
			<RouterProvider router={router} />
		</>
	);
};
export default App;
```
* 위에서 설정한 라우터에 연결할 루트 라우터가 현재는 없으므로 **@/app/router**에 라우터 생성한다.
	- `src/app/router/index.ts` 파일을 생성하고 아래 코드를 작성한다.
```js
import { createHashRouter } from 'react-router-dom';
import routes from './app-route';

const router = createHashRouter(routes);

export default router;
```
* `src/app/router/app-route.tsx` 파일을 생성하고 아래 코드를 작성한다.
	- **path**속성에 이동할 라우터를 입력 합니다.
	- **LayoutIndex**는 전체 공통 레이아웃을 컴포넌트로 만들어 **element**속성에 바인딩 한다.
	- **HomeRouter**와 같이 각 업무 라우터를 생성하여 **children**속성에 바인딩 한다.
```js
import { RouteObject } from 'react-router-dom';
import HomeRouter from '@/domains/home/router';
// HomeRouter처럼 업무가 새로 생성되면 각 업무의 router를 만들어 import 한다.

import LayoutIndex from '@/app/pages/layout/LayoutIndex';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <LayoutIndex />,
		children: HomeRouter,
	},
	// 새롭게 생성된 업무의 라우터를 여기에 계속 추가한다.
];

export default routes;
```
* **LayoutIndex** 공통 컴포넌트 파일의 생성 (예시)
	- 공통 레이아웃 컴포넌트 이므로 `src/app/pages/layout` 폴더에 생성한다.
	- 레이아웃의 구조는 각 사이트에 맞게 퍼블리싱 하여 작업 한다.
	- **react-bootstrap**은 현재까지 설치를 하지 않았으므로 페이지 생성 후 설치 진행한다.(아래쪽 설명)
```js
import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

const LayoutIndex = memo(() => {
	return (
		<>
			{/* TODO: 사이트 구조에 맞게 JSX 요소 추가. */}
			<Container>
				<Outlet />
			</Container>
		</>
	);
});
LayoutIndex.displayName = 'LayoutIndex';
export default LayoutIndex;
```
* **HomeRouter**를 연결하기 위하여 Home업무의 라우터를 `/src/domains/home/router/index.tsx`에 파일 생성 후 설정한다.
	- **path**속성에 HomeIndex업무의 라우터를 작성한다(최초 홈 화면이므로 `/`로 설정).
	- 진입 페이지인 **HomeIndex.tsx**페이지 컴포넌트를 `src/domains/home/pages`폴더에 만들고 **element**속성에 바인딩 한다.
```js
// /src/domains/home/router/index.tsx 파일
import { RouteObject } from 'react-router-dom';
import HomeIndex from '@/domains/home/pages/HomeIndex';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <HomeIndex />,
	},
];

export default routes;
```

```js
// /src/domains/home/pages/HomeIndex.tsx 파일
const HomeIndex = () => {
	return <div>홈 화면!</div>;
};

export default HomeIndex;
```




## React Bootstrap 설치 및 사용(UI Component 사용 용도)
---
* 설치
```sh
npm i react-bootstrap bootstrap
```
* **css적용:** App.tsx나 main.tsx 파일에서 최초 셋팅 해준다.
```css
import 'bootstrap/dist/css/bootstrap.min.css';
```
* 프로젝트 상황에 따라 Sass를 사용하고자 할때는 **sass**를 설치한다.
```sh
npm i -D sass
```
* sass를 설치하고 적용하기
	- **App** 전체 루트 스타일 파일을 `/src/assets/scss/App.scss`에 생성한다.
	- 생성한 **App.scss**파일을 **App.tsx**파일에서 **import**하여 가져온다.
	
* 추가 사용자 정의 스타일 파일을 적용하는 방법
	- custom.scss파일을 원하는 경로에 생성한다. 현재 프로젝트에서는 `/src/assets/scss/custom.scss`에 생성한다.
	- 루트 스타일시트 파일(**App.scss**)에 커스텀으로 생성한 scss파일을 import한다.
	```css
	/* App.scss파일 예시  */
	/* The following line can be included in a src/App.scss */
	@import 'custom';

	html,
	body {
		height: 100%;
	}

	#root {
		height: 100%;
	}
	```
	```css
	/* custom.scss파일 생성  */
	$colors: #ff0000;

	.test {
		background-color: $colors;
	}
	```

* **React Bootstrap**을 이용한 버튼 컴포넌트를 사용 예제
```jsx
import Button from 'react-bootstrap/Button';

const ButtonComponent = () => {
	return (
		<Button variant="primary">
			Button
		</Button>
	);
};
```

