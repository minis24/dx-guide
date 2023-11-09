# ESLint 설정

* Vite v4.0.0, ESLint v8.22.0, Prettier v2.7.1 기준으로 작성함.  
* ESLint : 코드에러방지, Prettier :  코드 가독성 향상.  
* `npm init vue@latest` 로 프로젝트를 설치 시 ESLint와 Prettier를 포함하여 설치 했을 경우 추가적인 설치는 필요없음.  
* package.json에서 lint 시--fix 옵션으로 커맨드라인에서 수행시 자동 수정 할 수 있으나 권장하지 않음--no-fix)  
* **eslint**가 **src**폴더 아래 소스만 검사하기 위하여 **package.json**의 lint명령어 `src/*`를 아래와 같이 수정 함.
```json
// 기존 명령어
"lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --no-fix --ignore-path .gitignore",
// 수정한 명령어()
"lint": "eslint src/* --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --no-fix --ignore-path .gitignore",
// --ext옵션
// 이 옵션을 사용하면 지정한 디렉토리에서 대상 파일을 검색 할 때 ESLint가 사용할 파일 확장자를 지정할 수 있습니다. 예를 들어, npx eslint lib/* --ext .js   lib/디렉토리 내의 모든 파일과 일치합니다 .
```
* 유의사항
  - .eslintrc, .prettierrc 파일을 별도로 생성해서 관리한다.
  - package.json파일에 설정 내용을 입력하여 사용할 경우, .eslintrc파일이 우선 적용 되고 package.json에 설정된 내용은 무시된다.
  - prettier보다 ESLint가 우선순위가 높기때문에 Prettier설정은 ESLint설정 하위에 정의해서 사용한다.
  - VSCode의 **formatOnSave**는 ESLint, Prettier가 동시에동작하므로 충돌가능성이 있다. (**비활성화** 권장)
  - .eslintrc.js의 extends의 '**@vue/eslint-config-prettier**'는 제거(ESLint로 모두 대체한다.)
  - ESLint 버전별로 설정방법이 계속 바뀌기 때문에(deprecated되거나 removed 되는 경우가 많음) 공식문서를 꼭 확인하며 설정을 한다.  
  [ESLint 공식문서 rules 사이트(https://eslint.org/docs/latest/rules/)](https://eslint.org/docs/latest/rules/),  
  [Prettier 공식문서(https://prettier.io/docs/en/options.html)](https://prettier.io/docs/en/options.html)  
  - @vue/eslint-config-prettier를 살리고 .prettierrc.json파일에서 ESLint와 중복되는 옵션을 맞춰가면서 수정을 해보려 했으나 eslint(common-dangle)와 prettier(trailingComma)옵션이 서로 맞지 않아 적용이 안되서 다시 @vue/eslint-config-prettier를 삭제하여 사용하는 방향으로 원복함, 추 후 다시 확인 해 봐야 할것 같음.  
  - **eslintIgnore** : ESLint를 적용하지 않고 싶은 파일이 있다면 package.json파일에 "eslintIgnore" 옵션에 파일명을 명시해 놓으면 eslint를 피할 수 있다.
  eslintIgnore옵션은 ".eslintignore" 파일로 만들어 내용을 작성 할 수도 있다.

  ## Code Formatter(ESLint)
  ```javascript
  module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'plugin:vue/essential',
      'eslint:recommended',
      '@vue/typescript/recommended',
      '@vue/prettier/@typescript-eslint',
    ],
    parserOptions: {
      ecmaVersion: 2020,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-var-requires': 0,
      // '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 0,
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      
      // 비어 있지 않은 파일의 끝에 적어도 하나의 줄 바꿈(또는 줄 바꿈이 없음)을 적용
      'eol-last': ['error', 'always'],
      // 세미콜론 사용하지않음
      'semi': ['error', 'never'],
      // 작은 따옴표를 사용하고 백틱을 사용할 수 있음.
      'quotes': [ 'error', 'single', { 'allowTemplateLiterals': true }],
      // 들여쓰기를 tab으로 설정
      'indent': ['error', 'tab', { 'SwitchCase': 1 }],
      // 객체 리터럴의 뒤에 항상 콤마 표기
      'comma-dangle': ['error', {
          'arrays': 'always',
          'objects': 'always'
        }
      ],
      // object 사이 일정한 간격을 적용
      'object-curly-spacing': ['error', 'always', { 'objectsInObjects': true }],
      // 화살표 함수에서 항상 매개변수를 괄호로 묶기
      'arrow-parens': ['error', 'always'],
      // v-on 줄임 사용하지 않기(eslint-plugin-vue)
      'vue/v-on-style': ['error', 'longform'],
      // v-bind 줄임 사용하지 않기(eslint-plugin-vue)
      'vue/v-bind-style': ['error', 'longform'],
      // v-slot 줄임 사용하지 않기(eslint-plugin-vue)
      'vue/v-slot-style': ['error', 'longform'],
      // props명 카멜케이스 사용
      'vue/prop-name-casing': ['error', 'camelCase'],
      // html문에 셀프닫기 적용
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
      // html속성을 케박케이스 형태로 입력
      'vue/attribute-hyphenation': ['error', 'always'],
      // html문에서는 쌍따옴표 사용
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
  };
  ```