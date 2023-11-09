# 프로젝트 환경 셋팅 과정 중 발생한 에러내용 정리


## Build후 SVG로고 이미지 웹서버에서 찾지 못하는 현상
---
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


::: tip 셋팅 과정 중 발생한 에러 대처 내용
* npm run build했을때 `'require' is not defined. eslint(no-undef)` 에러 발생 시 eslintrc.js에 아래 옵션 추가 한다.
```javascript
env: {
  node: true,
},
```
* package.js의 `scripts`에 명령어를 설정할때 아래와 같이 `node`를 사용하여 명령어 작성 시, 기존 명령어에서 사용한 기본 모듈 경로를 수정하여 위치를 정확히 작성 해줘야 한다.
```javascript
// vite 모듈을 찾을 수 없다는 에러 발생
"build-origin": "node --max_old_space_size=4096 vite build",
// 이와같이 경로를 정확히 작성해 준다.
"build-origin": "node --max_old_space_size=4096 ./node_modules/vite/bin/vite.js build",
```
* Node.js로 응용프로그램 실행 시 메모리 문제 발생할 수 있는데  
  V8 옵션인 `--max_old_space_size=<memory in MB>`를 사용하여 메모리 제한을 변경할 수 있다.
```sh
# 기본 메모리 제한은 32bit시스템:512MB, 64bit시스템:1GB 이지만 V8버전마다 다를 수 있다.
# 4GB로 변경한 예시
node --max-old-space-size=4096 index.js
```
* `tsconfig.json, tsconfig.config.json`내부에서 `extends`에서 에러 발생 시  
  `include`옵션의 파일 경로 앞에 `./`를 추가
* `.env` 파일에 VUE_APP_PROJECT_NAME 값은 공백없이 입력한다.
* `npm run dev`로 로컬서버를 띄우고 `npm run build`를 실행하면 <span style="color:red">Permission denied</span>에러가 발생하므로 띄운 서버를 내리고 빌드를 진행한다.
:::