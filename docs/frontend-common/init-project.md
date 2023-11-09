# Frontend project 초기 생성 가이드 (공통개발자영역)

## Vue프로젝트 생성하기(프로젝트 최초 생성 시)
---
* 커맨드 창을 열고 원하는 폴더 위치로 이동하여 최초 프로젝트를 생성할 npm 명령어를 입력한다.
* <span style="color:green">npm init vue@latest</span> 를 입력하여 vue프로젝트를 생성한다.
```sh
npm init vue@latest
```
```sh
# preset 설정 과정 (화상표 키패드로 이동하고 스페이스바로 선택한다)
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add Cypress for both Unit and End-to-End testing? … No / Yes
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes

Scaffolding project in ./<your-project-name>...
Don
```
* 설치가 완료되면 `npm install`을 커맨드 명령어를 실행하여 의존성 라이브러리를 설치한다.

## 생성된 프로젝트 개발 서버 띄우기
---
* `npm run dev`명령어를 실행하여 개발서버를 띄워본다.
```sh
npm run dev 
```

## ESLint설정
---
* **.eslintrc.cjs** 파일에 **rules** 옵션을 추가한다. (아래내용)
```js
module.exports = {
  // ...
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
		//'@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'eol-last': ['error', 'always'],
    'semi': ['error', 'always'],
    'quotes': [ 'error', 'single', { 'allowTemplateLiterals': true }],
    'indent': ['error', 'tab', { 'SwitchCase': 1 }],
    'comma-dangle': ['error', {
        'arrays': 'always',
        'objects': 'always'
      }
    ],
    'object-curly-spacing': ['error', 'always', { 'objectsInObjects': true }],
    'arrow-parens': ['error', 'always'],
    'vue/v-on-style': ['error', 'longform'],
    'vue/v-bind-style': ['error', 'longform'],
    'vue/v-slot-style': ['error', 'longform'],
    'vue/prop-name-casing': ['error', 'camelCase'],
		'vue/no-child-content': ['error', {
			'additionalDirectives': ['text', 'html'] // checks v-foo directive
		}],
		'vue/no-v-text-v-html-on-component': 0,
    'vue/html-self-closing': [
      'error',
      {
        'html': {
          'void': 'always',
          'normal': 'always',
          'component': 'always'
        },
        'svg': 'always',
        'math': 'always'
      }
    ],
    'vue/attribute-hyphenation': ['error', 'always'],
    'vue/html-quotes': ['error', 'double', { 'avoidEscape': true }],
    'vue/attributes-order': [
      'error',
      {
        'order': [
          'GLOBAL',
          'OTHER_ATTR',
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          [
            'UNIQUE',
            'SLOT'
          ],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'EVENTS',
          'CONTENT'
        ],
        'alphabetical': false
      }
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        'singleline': 1,
        'multiline': {
          'max': 1,
        }
      }
    ],
    'vue/html-indent': [
      'error',
      'tab',
      {
        'attribute': 1,
        'baseIndent': 1,
        'closeBracket': 0,
        'alignAttributesVertically': true
      }
    ]
  },
  // ...
};
```

## VSCode settings.json 적용
---
<span style="color:green">FrontEnd</span> 개발 시 필요한 **Visual Studio Code** 설정.
#### settings.json 설정
> <span style="color:#5bc0de">settings.json</span> 파일열기 : **f1 -> settings 입력 -> Preferences: Open Workspace Settings (JSON)** 클릭  
> 위와같이 열면 프로젝트 루트에 <span style="color:#5bc0de">.vscode</span> 디렉토리가 생성되고 <span style="color:#5bc0de">settings.json</span>파일이 생성된다.  
> settings가 적용되는 우선 순위는 <span style="color:#5bc0de">.vscode settings.json > settings.json > defaultSetting.json(건들지 않아요)</span>  
> <span style="color:#5bc0de">defaultSetting.json</span>은 모든 설정내용이 다 들어있다. <span style="color:#ff0000">수정은 하지 않는다.</span>  
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


## @types폴더 사용법
---
* 프로젝트 루트에는 **@types**폴더가 존재한다. 내부에는 기본으로 **index.d.ts**파일이 있다.
* **index.d.ts**파일의 용도는 전체 **App**의 type을 설정한 파일이다.
* 그 외 써드파티 라이브러리 중 **@types**가 제공되지 않은 경우에 **@types**폴더 안에 해당 라이브러리 폴더명을 생성하고 ***.d.ts**파일을 선언해주는 용도로 사용하면 된다.
* 만약 **prismjs** 라이브러리의 ***.d.ts**파일을 선언한다고 가정했을 때 아래와 같이 생성하여 만들어 준다.
```js
// 'prismjs'라는 라이브러리 types를 선언한 예시
...
@types
  ├─ index.d.ts
  ├─ prismjs  // prismjs폴더를 생성
  │  ├─ index.d.ts  // index.d.ts파일을 생성한다.
...
```
* index.d.ts파일의 소스 예제
```ts
declare module 'prismjs';
```
::: tip tsconfig.json 설정
* tsconfig.json에는 **typeRoots**를 아래와 같이 설정함.
```js
"typeRoots": ["./node_modules/@types", "./@types"]
```
:::


## Vuetify 3.x 설치
---
* `npm install vuetify`명령어를 실행하여 **vuetify** Vue component framework을 설치 한다.
* 2023-03-03 현재 Vuetify버전 : `3.1.7`
* `vue add vuetify` 명령어로 설치 하면 현재는 **beta** 버전이 설치 됨.
```sh
npm install vuetify
```
* `src` 폴더 아래 `plugins`폴더가 없다면 생성하고 안쪽에 **vuetify.ts** 파일을 생성한다.
* **vuetify**관련 코드를 아래와 같이 **vuetify.ts** 파일에 추가한다.
```js
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

export default vuetify;
```
* **main.ts**파일에 **vuetify**를 연결 합니다.
```js
import vuetify from '@/plugins/vuetify';

const app = createApp(App);
// ...
app.use(vuetify);
app.mount('#app');
```
::: tip
* 지금까지 진행 과정에 tsconfig.node.json파일 내부와, vite.config.ts파일(import.meta)에서 VSCode에러가 보이지만 VSCode를 닫고 다시 열면 사라진다.
:::


## 소스파일 정리
---
* 기본으로 만들어져 있는 파일이나 폴더들을 삭제또는 수정한다.
* 아래 내용대로 진행한 후 가장 기본이 되는 화면 레이아웃을 만든다.
::: info
* views폴더 삭제
* router폴더 삭제
* main.ts파일 내부에 `import './assets/main.css';` 삭제
* **assets**폴더 내에 있는 파일 모두 삭제.
* **components**폴더 삭제
* **App.vue** 파일의 소스를 `<v-app>`을 이용하여 구성한 형식으로 수정.
* **@types** 폴더 생성하고 `index.d.ts`파일 생성 및 `tsconfig.json`에 **@types** 연결.
* **app**폴더를 생성하고 공통 기본 구조대로 생성(router,pages등)
* **domains**폴더 생성하고 **home**폴더 생성한 후 최초 루트 화면 **HomeIndex.vue**파일 생성
* **home**을 라우터 연결
:::


## vuetify SASS variables 사용
---
* **Vite** 프로젝트는 **SASS/SCSS**를 사용하기 위하여 따로 플러그인을 설치 할 필요는 없지만, 해당 전처리기는 필요하므로 **sass**의 설치가 필요하다.
```sh
npm install -D sass
```
* Automatic treeshaking 을 위해 `vite-plugin-vuetify`을 설치 한다.
```sh
npm i -D vite-plugin-vuetify
```
* `vite.config.ts`파일에 아래내용 적용.
```js
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

export default {
  plugins: [
    vue(),
    vuetify(),
  ],
}
```
* 자동 트리쉐이킹이 적용 되었기 때문에 아래 코드를 `vuetify.ts`파일에서 제거한다.
```js
- import * as components from 'vuetify/components'
- import * as directives from 'vuetify/directives'
```
* **vite.config.ts**에 아래처럼 원하는 위치의 scss를 불러와 적용한다.
```js
export default defineConfig({
	plugins: [
		vue(),
		vuetify({
			styles: { configFile: 'src/assets/scss/_variables.scss', },
		}),
	],
});
```

* `src/plugins/vuetify.ts`에 연결되어 있는 vuetify 기본 스타일 `import 'vuetify/styles';`는 상황에 따라 삭제 하고 구현할 스타일을 적용하는 것이 스타일 중복을 피할 수 있다. 
* 하지만 모든 스타일을 정의 하지 않는 경우에는 같이 사용해도 된다.
```js
// vuetify/styles삭제
//import 'vuetify/styles';
```
* **src/assets/scss/_variables.scss**파일에서는 아래와 같이 구성요소별 변수를 재설정 할 수 있다.
```scss
// variables 사용
@use 'vuetify/settings' with (
  $button-background: blue,
);

// 새로은 class 생성...
.my-btn {
	background-color: greenyellow;
}
```
::: tip vuetify 3.1.8에서 버그
* vuetify 3.1.8에서 `No known conditions for "./settings" specifier in "vuetify" package` 에러 발생.
* 원인은 `@use 'vuetify/settings' with` 사용부분때문. 원인 못찾음.
* vite 버전을 `4.2.0-beta.1`로 사용해보니 잘됨.
:::