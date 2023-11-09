

# 프로젝트 생성 후 배포 관련 작업

## 배포를 위한 빌드환경 구성하기
---
### dotenv 설치
* dotenv를 설치하여 환경변수를 파일에 저장할 수 있도록 한다.
  - vite를 사용하는 프로젝트는 `dotenv`를 설치하지 않고 `import.meta.env`로 접근 가능하나, 빌드 시 사용할 **build.js**에서 사용할 목적으로 설치함.
```sh
npm i -D dotenv
```
### ".env.development", ".env.production"파일 생성
최종 프로젝트 `build`시 **개발, 운영** 분리 빌드를 위하여 두개의 파일을 아래와 같이 루트에 생성한다.
```
// 프로젝트 루트
   ├─...
   ├─.env.development
   ├─.env.production
   ├─...
   ├─...
```
```javascript
// .env.development
NODE_ENV="development"
VITE_APP_PROJECT_NAME="프로젝트명"
VITE_APP_BUILD_VER="0.0.1"
VITE_APP_기타설정="값"
```
```javascript
// .env.production
NODE_ENV="production"
VITE_APP_PROJECT_NAME="프로젝트명"
VITE_APP_BUILD_VER="0.0.1"
VITE_APP_기타설정="값"
```
### `build.js` 파일
프로젝트 루트에 `build.js`파일을 작성하여 빌드 결과를 프로젝트 상황에 맞게 적용한다.
```javascript
// 프로젝트 루트
   ├─...
   ├─build.js
   ├─...
   ├─...
```
::: info **build.js**파일이 eslint 에러가 발생 할때 대처
`build.js` 파일을 생성하면 **eslint**에 파일 내용 에러가 빨간줄로 많이보이게 된다.
그럴경우 `build.js`파일을 **eslint**에서 제외 시키기 위해, **package.json**파일에 **eslintIgnore**옵션을 사용하여 제외 처리 한다.
```js
"eslintIgnore": [
  "build.js"
]
```
:::


### `package.json`파일에 build scripts 작성
```json
"scripts": {
  "dev": "vite",
  "build": "run-p type-check lint build-development",
  "preview": "vite preview",
  "build-only": "vite build",
  "type-check": "vue-tsc --noEmit",
  "lint": "eslint src/* --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --no-fix --ignore-path .gitignore",
  "format": "prettier --write src/",
  "build-origin": "run-p type-check && node --max_old_space_size=4096 ./node_modules/vite/bin/vite.js build",
  "build-origin-development": "run-p type-check && node --max_old_space_size=4096 ./node_modules/vite/bin/vite.js build --mode development",
  "build-development": "node build.js development",
  "build-production": "run-p type-check lint && node build.js production"
},
```
```sh
#개발 빌드 실행
npm run build
#운영 빌드 실행
npm run build-production
```

### `vite.config.ts`에 `base` 옵션 설정
빌드 후 빌드된 리소스를 웹서버에 올릴때 서버 루트를 확인하고 거기에 맞게 `base`옵션을 작성한다.  
웹서버 루트 변경이 없으면 수정할 필요 없음.
```javascript
export default defineConfig({
  ...
	base: '/www/home',
  ...
  ...
})
```

### Build후 SVG로고 이미지 웹서버에서 찾지 못하는 현상
빌드 후 웹서버 정적파일을 올렸을때 Logo SVG파일을 찾지 못하는 현상이 발견 됨  
아래와 같은 방향으로 수정함.
```html
// 이렇게 기본 SVG파일 로드하는 부분을
<img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
// *.vue 컴포넌트 파일로 만들어서 로드하여 사용함.
// LogoSVG.vue --------------------------------
<template>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 261.76 226.69"  xmlns:v="https://vecta.io/nano"><path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z" fill="#41b883"/><path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z" fill="#34495e"/></svg>
</template>
<script lang="ts">
export default {
   name: 'MySVGComponent',
}
</script>

// App.vue 파일이서 svg컴포넌트를 가져와 적용.-----------
import LogoSVG from '@/components/LogoSVG.vue'
```



## process.env 와 import.meta.env 관련 정리
---
* webpack5에서는 더 이상 `Node.js` 변수에 대한 polyfill을 포함하지 않는다. 따라서 `process.env`도 사용할 수 없다.
* vite에서는 환경변수 접근 시 `import.meta.env` 로 접근하여 사용한다. 또한 `VITE_` prefix를 사용해야 한다. prefix를 변경하고자 한다면 [config의 envPrefix](https://vitejs-kr.github.io/config/shared-options.html#envprefix)를 참조.
* `process.env`는 node.js에서만 사용하며 우리가 사용하는 vue프로젝트 내 `/src`내부에서는 `import.meta.env`로 사용한다.

**import.meta.env** 접근 가능한 환경변수 내용  
| 환경변수                    | 타입     | 설명                              |
| --------------------------- | :-----: | --------------------------------- |
| **import.meta.env.MODE**    | string  | 현재 앱이 동작하고 있는 모드        |
| **import.meta.env.BASE_URL**| string  | 앱이 제공되는 베이스 URL이며, 이 값은 `base`설정값에 의해 결정됨 |
| **import.meta.env.PROD**    | boolean | 앱이 프로덕션에서 실행 중인지 여부   |
| **import.meta.env.DEV**     | boolean | 앱이 개발 환경에서 실행 중인지 여부  |
| **import.meta.env.SSR**     | boolean | 앱이 서버에서 실행 중인지 여부       |

### vite에서 process.env사용 하려면
* loadEnv 헬퍼를 사용해 process.env 객체를 불러오고 .env 파일에 환경변수를 가져온다.
```js
import { defineConfig, loadEnv } from 'vite'

export default (mode) =>
  defineConfig({
    define: {
      'process.env': loadEnv(mode, process.cwd(), ''),
    },
    ...
})
```

## 프로젝트 설치 진행 과정 단순 정리
1. npm init vue@latest
2. package.json 파일의 scripts  부분 수정
3. build.js 파일 만들기 및 수정
4. build.js파일 수정 시 eslint에러가 발생하므로 package.json에 eslintIgnore 옵션에 “build.js”를 추가한다.
5. dotenv를 설치한다. npm i -D dotenv
6. .env.development, .env.production 파일을 생성하여 build시 필요한 내용을 채움.
8. eslintrc.cjs파일에서 @vue/eslint-config-prettier를 삭제함.
9. npm run build 실행 -> build.js파일에서 ‘require’ is not defined no-undef 발생.[에러 대처방법 참조](./init-proj-error-list.md)