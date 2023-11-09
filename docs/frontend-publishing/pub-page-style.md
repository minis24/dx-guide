# SFC(Vue페이지)에 scss적용하기

## SFC(페이지, component)기본 구조
---
* 화면을 만들거나, Vue컴포넌트를 만들 때 기본 구조는 아래와 같습니다.
```html
<template>
	<div>html 마크업 작성.</div>
</template>

<script lang="ts">
import { onMounted, ref, defineComponent } from 'vue';
export default defineComponent({
	name: 'SampleComponent',
});
</script>
<script setup lang="ts">
// data
const data = ref('');
// method
const addData = () => {
	data.value = '값';
};
// lifecycle hook
onMounted(() => {
	// ...
});
</script>

<!-- 현재 페이지에만 적용할 스타일 -->
<style lang='scss' scoped></style>
```
:::tip SFC페이지 구조, 영역별 설명
* `<template> 영역`: html마크업 영역 입니다. (기본 html tag를 사용하거나 vuetify컴포넌트 사용)
* `<script> 영역`: 해당 페이지의 javascript, typescript 코드를 작성하는 영역입니다.
* `<style lang="scss" scoped> 영역`: 해당 페이지에만 적용될 스타일(scss)을 작성하는 영역입니다.
  - **lang="scss"** 와 **scoped**속성을 반드시 입력해 줍니다.
:::
:::tip SCSS란?
* CSS Preprocessor
  - 우리 프로젝트는 CSS 전처리기 **SCSS**를 사용 합니다.
  - CSS 문법과 굉장히 유사하지만 선택자의 중첩(Nesting)이나 조건문, 반복문, 다양한 단위(Unit)의 연산 등… 표준 CSS 보다 훨씬 많은 기능을 사용해서 편리하게 작성할 수 있습니다.
* **SCSS** 구문으로 작성된 코드를 Frontend프로젝트에서 컴파일하여 동작합니다.
* Sass(Syntactically Awesome Style Sheets)의 3버전에서 새롭게 등장한 SCSS는 CSS 구문과 완전히 호환되도록 새로운 구문을 도입해 만든 Sass의 모든 기능을 지원하는 CSS의 상위집합(Superset) 입니다.
즉, SCSS는 CSS와 거의 같은 문법으로 Sass 기능을 지원합니다.  
더 쉽게, Sass와 SCSS의 간단한 차이는 {}(중괄호)와 ;(세미콜론)의 유무입니다.
:::


## 현재 컴포넌트(페이지, component)에만 스타일(scss)적용하기
---
* Frontend 소스 git 레파지토리에서 clone 받고 프로젝트 기본 구조가 셋팅된 상태에서 **domains**폴더의 특정 업무 페이지를 만든다고 가정합니다.
* 예를들어 `domains/account/pages/AccountIndex.vue` 페이지를 생성했다고 가정하고, `AccountIndex.vue`페이지에 **html마크업** 합니다.
```html
<template>
	<div>
    <div class="sample">
      class sample test
    </div>
  </div>
</template>

<!-- script tag는 임시 제외 -->

<!-- 현재 페이지에만 적용할 스타일 -->
<style lang='scss' scoped>
.sample {
  background-color: #ff0000;
}
</style>
```
:::tip 페이지 설명
* `<style lang="scss" scoped>`부분에 **scoped** 속성은 현재 페이지만 스타일을 적용 한다는 의미입니다.
* **sample** `class`를 현재 페이지의 `<style>`영역에 정의합니다.
```css
.sample {
  background-color: #ff0000;
}
```
* 이렇게 정의된 **sample** `class`는 다른 페이지나 공통 스타일에는 적용 되지 않습니다.
* `<template>`영역에 페이지 html마크업을 하고 원하는 위치에 `class` 속성을 적용합니다.
:::

## 전역 컴포넌트 생성 및 스타일(scss)적용하기
---
* 전역으로 사용될 공통 컴포넌트의 스타일(scss)을 적용하는 방법
* **전역 컴포넌트의 폴더 위치**는 `/src/app/components/ui` 폴더 이며 아래와 같은 구조로 되어 있습니다.
```sh
...
src
  ├─ app
  │  ├─ ...
  │  ├─ components
  │  │  ├─ ui
  │  │  │  ├─ ...
  │  │  │  ├─ ui-dialog
  │  │  │  │  └─ UIAlert.vue
  │  │  │  ├─ ui-chip
  │  │  │  │  └─ UIChip.vue
  │  │  │  └─ ...
  ├─ assets
  │  ├─ ...
  │  ├─ scss
  │  │  ├─ index.scss
  │  │  ├─ ui
  │  │  │  ├─ dialog.scss
  │  │  │  └─ ...
  │  │  ├─ ...
...
```
### UI 전역 컴포넌트 생성하기

* `/src/app/components/ui`폴더 내부에 전역 컴포넌트를 생성하는 규칙
  1. `/src/app/components/ui` 폴더 내부에 원하는 이름의 컴포넌트 폴더를 먼저 생성한다. 폴더명은 반드시 (**<span style="color:#ff0000">ui-\*</span>**) 구조로 명명합니다. ex) ui-dialog, ui-button.
  2. 위에서 생성한 (**<span style="color:#ff0000">ui-\*</span>**)폴더 안에 Vue(SFC)컴포넌트 파일을 생성합니다. 파일명은 반드시 <span style="color:#ff0000">Ui컴포넌트명.vue (PascalCase)</span>로 생성 합니다.
  ```js
  ui-dialog/UiDialog.vue
  ui-button/UiButton.vue
  ```
  3. 이렇게 생성한 전역 컴포넌트는 프로젝트 실행 시 자동으로 전역 컴포넌트로 등록 됩니다. 만약 위와 같은 구조(폴더명, 파일명)로 되어있지 않다면 자동으로 전역 컴포넌트 등록이 되지 않습니다.

### 생성한 전역 컴포넌트에 스타일(scss) 적용하기
* 스타일을 적용할 전역 컴포넌트가 `ui-sample/UiSample.vue`이라고 가정합니다.
* **폴더구조**
```sh
...
src
  ├─ app
  │  ├─ ...
  │  ├─ components
  │  │  ├─ ui
  │  │  │  ├─ ...
  │  │  │  ├─ ui-sample
  │  │  │  │  └─ UISample.vue
  │  │  │  └─ ...
  ├─ assets
  │  ├─ ...
  │  ├─ scss
  │  │  ├─ index.scss
  │  │  ├─ ui
  │  │  │  ├─ sample.scss
  │  │  │  └─ ...
  │  │  ├─ ...
...
```
:::tip 전역 공통 컴포넌트에 적용할 스타일 파일(scss)를 `assets/scss/ui`폴더에서 관리합니다.
* 예를 들어 UISample.vue 컴포넌트에 적용할 scss를 `/src/assets/scss/ui/sample.scss` 위치에 생성해서 사용합니다.
* 이렇게 생성한 `sample.scss`파일은 `/src/assets/scss/index.scss`파일에서 **import** 합니다.
```js
// /src/assets/scss/index.scss 파일
@import "ui/dialog";
@import "ui/sample";  // 생성한 sample.scss파일을 import 합니다.
// ...
// ...
```
:::
:::tip UI검포넌트 스타일 적용 예
* UiSample.vue
```html
<template>
	<div>
    <div class="ui-sample-class">
      class sample test
    </div>
  </div>
</template>

<!-- script tag는 임시 제외 -->

<!-- style tag는 임시 제외 -->
```
* sample.scss
```css
.ui-sample-class {
  background-color: #ff0000;
}
```
:::

## 그 외 사용자 정의 class생성
---
* 내가 원하는 `class명`을 생성해서 전역으로 사용하고자 한다면 `/src/assets/scss`폴더 내부에 아래와 같이 자유롭게 폴더 및 파일을 생성해서 사용 합니다. 아래 예시는 `custom`폴더에 `custom.scss`파일을 생성한 구조 입니다.
```sh
...
src
  ├─ assets
  │  ├─ ...
  │  ├─ scss
  │  │  ├─ index.scss
  │  │  ├─ ui
  │  │  ├─ custom
  │  │  │  └─ custom.scss
  │  │  ├─ ...
...
```
* 이렇게 생성한 `custom.scss`파일은 `/src/assets/scss/index.scss`파일에서 **import** 해줘야 합니다.
* 전역으로 사용될 **class명**은 **다른class명**과 충돌나지 않게 주의 합니다.
```js
// /src/assets/scss/index.scss 파일
@import "ui/dialog";
@import "custom/custom";  // 생성한 custom.scss파일을 import 합니다.
// ...
// ...
```

