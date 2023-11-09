# 직접 만든 SVG아이콘을 사용하는 방법
* **Vuetify**에서 제공되는 기본 아이콘(Material Design Icons, Material Icons, Font Awesome 4 and Font Awesome 5.) 을 제외한 **내가 SVG를 이용하여 직접 만든 아이콘**을 사용하는 방법에 대하여 설명한다.

## SVG로 제작한 아이콘 컴포넌트를 생성
---
* 먼저 만들고자 하는 아이콘을 `<svg>`를 이용하여 ***.vue** 컴포넌트로 제작한다.
* `<svg>`를 이용하여 만든 컴포넌트를 **src/plugins/vuetify/customSVGs 폴더** 아래 생성한다.
* 컴포넌트명은 **PascalCase**로 자유롭게 정한다.
```html
// src/plugins/vuetify/customSVGs/TestIcon.vue
<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		class="test-icon"
	>
		<g fill="none">
			<mask
				id="home-on-mask"
				fill="#fff">
				<path v-bind:d="d"/>
			</mask>
			<g
				mask="url(#home-on-mask)"
				fill="#0D82FF">
				<path v-bind:d="d"/>
			</g>
		</g> 
	</svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'TestIcon',
	data() {
		return {
			d : `m13.94 7.07-7 6.611A3 3 0 0 0 6 15.862V24.2A1.8 1.8 0 0 0 7.8 26h4.4a1.8 1.8 0 0 0 
				1.8-1.8v-2.7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2.7a1.8 
				1.8 0 0 0 1.8 1.8h4.4a1.8 1.8 0 0 0 1.8-1.8v-8.338a3 3 0 0 0-.94-2.18l-7-6.612a3 3 0 0 0-4.12 0z`,
		};
	},
});
</script>

<style lang="scss" scoped>
.test-icon {
	font-size: 50px !important;
}
</style>
```

## 생성한 SVG컴포넌트를 vuetify icons에 연결
---
* **src/plugins/vuetify/costomSVGs/index.ts** 파일을 연다.
* **index.ts**파일 소스에서 위에서 생성한 SVG컴포넌트를 import하고, **customSvgNameToComponent** 객체에 추가한다.
* 새로운 아이콘이 등록되면 모든 준비는 끝났다.
```js
import type { IconProps, IconSet } from 'vuetify';
import { h } from 'vue';

// 생성한 SVG 아이콘 컴포넌트를 import한다.
import TestIcon from '@/plugins/vuetify/customSVGs/TestIcon.vue';

// 가져온 SVG컴포넌트를 customSvgNameToComponent 오브젝트에 추가한다.
const customSvgNameToComponent: any = {
	TestIcon,
};

const customSVGs: IconSet = {
	component: (props: IconProps) => {
		return h(customSvgNameToComponent[ (props.icon as string) ]);
	},
};

export { customSVGs /* aliases */ };
```

## 생성한 TestIcon을 사용하는 방법
---
* 일반 업무 페이지에서 새롭게 등록한 **TestIcon**을 사용하는 방법
```html
<v-icon icon="custom:TestIcon" />
<v-icon>custom:TestIcon</v-icon>
```