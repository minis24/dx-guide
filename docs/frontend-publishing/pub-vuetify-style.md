# Vuetify SASS Variables 적용 방법
:::tip Vuetify SASS Variables
* 우리 Frontend 프로젝트는 UI 프레임워크로 Vuetify를 사용하고 있습니다. 그래서 Vuetify가 제공하는 각 UI컴포넌트별 SASS Variables가 있습니다.
* Vuetify가 제공하는 **SASS Variables**를 사용하여 스타일을 변경할 경우 전체 UI검포넌트의 스타일을 공통으로 변경할 수 있으므로 편리합니다.
* [Vuetify공식문서:(https://vuetifyjs.com/en/)](https://vuetifyjs.com/en/)
:::

## _variables.scss파일에 SASS Variables 사용
---
* `/src/assets/scss/vuetify/_variables.scss` 파일을 열고 아래 코드 위치를 확인 합니다.
```js
// variables 사용
@use 'vuetify/settings' with (
  // ..
  // ..
);
// ..
```
* `@use 'vuetify/settings' with ()`에 Vuetify의 UI컴포넌트에서 각각 제공하는 **SASS Variables**를 넣어 변경합니다.

## SASS Variables를 v-chip컴포넌트에 적용한 예시
---
* **Vuetify**공식문서에서 `v-chip`컴포넌트의 **SASS Variables**를 확인합니다.
* https://vuetifyjs.com/en/api/v-chip/
  ![v-chip 공식문서](/assets/image/vue3-pub-guide/pub01.png)
* `/src/assets/scss/vuetify/_variables.scss`파일을 열고 아래 위치에 스타일을 적용 합니다. border가 3px이고 색깔은 빨간색으로 적용 하였습니다.
```js
// variables 사용
@use 'vuetify/settings' with (
	// v-chip scss변수 셋팅-------------------
	$chip-border-width: 3px,
	$chip-border-color: red
);
```
* SFC(페이지, component)에서 `v-chip`컴포넌트를 셋팅하고, 브라우저에서 확인합니다.
```html
<template>
	<div>
		<ui-chip>테스트</ui-chip>
	</div>
</template>

<!-- script tag는 임시 제외 -->
<!-- style tag는 임시 제외 -->
```
![v-chip스타일 적용 예시](/assets/image/vue3-pub-guide/pub02.png)
