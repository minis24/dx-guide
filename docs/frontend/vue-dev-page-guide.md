# 업무(domain) 화면 개발 방법 가이드
Frontend개발자는 각 업무(domain)별로 자신이 맡은 공간에서 작업을 진행한다.

## 업무(Domain) 폴더 구조 만들기
---
* 모든 업무(domain)는 **domains**폴더 아래 생성하여 작업한다.
* 개발해야 할 업무가 **"계좌(account)"** 라고 가정 했을 때 아래와 같이 폴더 구조를 생성하고, 하위 구조를 만든다.
* **account**폴더가 생성되면 하위로 <span style="color:#0089ff">api, components, composables, pages, router, store, types</span>폴더를 가질 수 있다.  
자세한 내용은 [Frontend 개발 규칙 및 구조](./vue-dev-convention.md) 가이드 내용을 참조 하세요.
```sh
# 내가 작업할 업무가 "계좌(account)" 업무라고 가정한다면
# 아래와 같은 기본 구조를 가진다.
src
  ├─ ...
  ├─ ...
  ├─ domains
  │  ├─ ...
  │  ├─ account # account폴더를 생성
  │  │  ├─ api
  │  │  │  └─ url.ts
  │  │  ├─ components
  │  │  │  └─ AccountList.vue # 계좌 리스트 컴포넌트(가정)
  │  │  ├─ pages
  │  │  │  ├─ AccountIndex.vue  # 계좌메인화면(가정)
  │  │  │  └─ AccountUsage.vue  # 계좌이용내역화면(가정)
  │  │  ├─ router
  │  │  │  └─ index.ts
  │  │  ├─ store
  │  │  │  ├─ action.ts
  │  │  │  ├─ index.ts
  │  │  │  ├─ getter.ts
  │  │  │  ├─ state.ts
  │  │  │  └─ types.ts
  │  │  └─ types
  │  │     └─ index.ts
  │  └─ ...
```
::: info 설명
* 내가 작업하는 업무는 **account**라고 가정한다.
* **account**업무의 하위에는 **api, components, composables, pages, router, store, types**폴더를 가질 수 있다.
* 각 폴더는 업무 상황에 따라 생성하여 사용한다. 사용하지 않는 폴더는 없어도 상관없다.
* **router, store, types** 폴더는 기본적으로 진입 파일인 **index.ts**파일을 가진다.
:::

## Page 만들기
---
* 업무 폴더 구조가 완성되면 원하는 페이지를 만들어 본다.
* 페이지는 **pages** 폴더 내부에 Vue의 **SFC(Single-File-Components)** 파일로 생성한다.
* 페이지 소스 ***.vue**파일의 기본 구조는 아래와 같다.
```html
<template>
	<div>html 마크업 작성.</div>
</template>

<script lang="ts">
import { onMounted, ref, defineComponent } from 'vue';
export default defineComponent({
	name: 'SampleComponent',
	data() {
		return {};
	},
});
</script>
<script setup lang="ts">
// data
const data = ref('');
// method
const addData = () => {
	data.value = '값';
};
// lifecycle hooks
onMounted(() => {
	// ...
});
</script>
<style lang='scss' scoped></style>
```
::: info 설명
* Frontend 개발 시 코드는 **TypeScript**를 사용하며, **ES6문법**에 익숙해야 한다.
* ***.vue**파일에 정의된 블록은 `<template>`, `<script lang="ts">`, `<script setup lang="ts">`, `<style>` 블록으로 되어있다.
* `<script lang="ts">`블록 에서는 필수적으로 **defineComponent**를 통해 component를 정의하는것을 권장한다.(defineComponent없이도 사용 가능하지만, typescript를 사용하면 vue component내의 타입을 올바르게 추론하기 위하여 권장.)
* `<script setup lang="ts">`블록은 **Composition API**를 사용하기 위한 setup함수 블록이다. `<script lang="ts">`블록과 공존할 수 있다.
:::



## 만든 Page 라우터 연결
---
* **src/domains/account/pages/AccountIndex.vue** 라고 페이지를 만들었다고 가정한다.
* 업무폴더에서(account폴더) **router/index.ts** 파일을 생성하고, **index.ts** 파일을 열어 기본 **router**코드를 작성한다.
* 만든 페이지가 **AccountIndex.vue**파일이므로 아래와 같이 작성한다.
```js
export default [
	{
		path: 'account-page',
		name: 'AccountPage',
		component: () => import('@/domains/account/pages/AccountIndex.vue'),
	},
	// ... 다른 라우터 추가
];
```
:star: **router/index.ts** 파일 작업이 완료 되면 해당 업무 라우터를 **Frontend 공통개발자**에게 요청하여 공통router에도 연결 해줘야 한다.
  * **Frontend 공통개발자**는 **src/app/router/app-route.ts**파일에 **추가된 업무 account 라우터**를 연결한다.
  ```js
  // src/app/router/app-route.ts 파일 내용 -------------

  import type { RouteRecordRaw } from 'vue-router';

  // 각 업무 도메인 라우터 개수만큼 import한다.
  import HomeRouter from '@/domains/home/router';
  import AccountRouter from '@/domains/account/router';

  const Layout = () => import('@/app/pages/layout/LayoutIndex.vue');

  const route: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'home',
      component: Layout,
      children: HomeRouter,
    },
    // Frontend공통개발자에 의해 추가된 account업무 라우터 부분.
    {
      path: '/account',
      component: Layout,
      children: AccountRouter,
    },
  ];

  export default route;
  ```


## account라우터를 브라우저에서 확인해보기
---
* 위에서 만든 **account**업무관련 페이지와 라우터 연결이 되었으면, 로컬(Frontend)서버를 띄우고 브라우저로 확인해 본다.  
* 로컬(Frontend)서버 띄우는 방법은 [Frontend 개발 환경 구성/frontend 서버 띄우고 브라우저로-확인 ](./dev-env-config.md#vscode에서-frontend-서버-띄우고-브라우저로-확인해-보기) 부분을 참조 하세요.
* 브라우저를 열고 **localhost:포트/account/account-page**를 입력하면 아래와 같이 보인다.
![Chrome브라우저에서 account페이지 확인하기](/assets/image/vue3-dev-guide/dev-page-guide01.png)
:star: 여기까지 했으면 해당 업무의 코딩 준비가 완료 되었다. 필요에 따라 기능을 추가하고 페이지 코딩을 진행하면 된다.


## 업무 페이지 개발 시 vue 코딩 간략 문법 및 예제
---
* 업무화면 SFC(Single File Components) vue파일 개발 시 문법 정리.



### 템플릿 문법
* 텍스트보간법 : 이중괄호를 사용하여 `template`내부에 바인딩 한다.
```html
<span>메세지: {{ msg }}</span>
```
* `v-html` : html을 출력.
```html
<p>v-html 디렉티브 사용: <span v-html="rawHtml"></span></p>
```
* `v-bind` : 속성 바인딩.
```html
// v-bind 사용 예시
<div v-bind:id="dynamicId"></div>
// 단축 문법으로 아래와 같이 단순하게 사용할 수도 있다.
// 하지만 우리 프로젝트에서는 `v-bind:`를 온전하게 붙여서 사용하도록 한다.
<div :id="dynamicId"></div>

// 여러개의 속성을 동적바인딩한 예시
<script>
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}
</script>
<div v-bind="objectOfAttrs"></div>

```

* javascript 표현식 사용
```html
// '이중괄호', 'v- 디렉티브' 내부에서 하나의 표현식만 사용하여 적용한다.
// javascript표현식은 되도록 지양하고 함수로 빼서 사용하도록 한다.
{{ number + 1 }}
{{ ok ? '예' : '아니오' }}
{{ message.split('').reverse().join('') }}
<div v-bind:id="`list-${id}`"></div>

// 함수호출
// 함수호출은 컴포넌트가 업데이트될 때마다 호출되므로, 주의해서 사용한다.
<span v-bind:title="toTitleDate(date)">
  {{ formatDate(date) }}
</span>
```

### 데이타 선언과 렌더링
---
**반응형data**를 선언하고 생성된data를 텍스트 보간법을 사용하여 DOM에 렌더링하는 방법
* **Composition API**를 사용하여 작성한 코드
```html
<template>
	<div>{{ message }}</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const message = ref('안녕하세요 Vue!')
const book = reactive({
  author: 'Vue Team',
  title: 'Vue 3 Guide',
  price: '무료',
})
</script>
```
* **Options API**를 사용하여 작성한 코드(사용하지 않음)
```html
<template>
  <div>{{ message }}</div>
</template>
<script>
export default {
  data() {
    return {
      message: '안녕하세요 Vue!',
      book: {
        author: 'Vue Team',
        title: 'Vue 3 Guide',
        price: '무료',
      },
    };
  },
}
</script>
```
::: tip ref()와 reactive()의 차이
**Composition API**에서 데이타를 선언할때 `ref()`와`reactive()`를 사용할 수 있다.
* **ref()** : `number, string, boolean`과 같이 단순 값을 반응형으로 선언할때 사용.
  - 사용할때는 message.value 와 같이 `.value`를 붙여서 값을 꺼내 사용한다.
* **reactive()** : `object, array`와 같은 형태의 데이타를 반응형으로 선언할때 사용.
  - 객체일때 : 사용할때는 `book.author`와 같이 그냥 객체형식 사용하듯이 사용.
  - 배열일때 : 사용할때는 `book[0]`와 같이 배열 사용하듯이 사용.
:::
::: tip reactive() 속성에 ref()값을 할당 했을때
``` js
// 객체에 ref값을 할당했을때
const count = ref(1)  
const obj = reactive({ count, })
// 사용 시 obj.count 로 사용. ref값을 할당 했으나 .value는 사용하지 않음.

// 배열또는 컬렉션요소에 ref값을 할당했을때
const books = reactive([ref('Vue 3 Guide')])
// .value가 필요
console.log(books[0].value)
const map = reactive(new Map([['count', ref(0)]]))
// .value 필요
console.log(map.get('count').value)
```
:::
::: tip reactive() 속성을 구조분해 했을때
``` js
const book = reactive({
  author: 'Vue Team',
  title: 'Vue 3 Guide',
  price: '무료',
})

// book을 구조분해하면 반응성을 잃어버림.
const { author, title } = book // 이렇게 사용 자제
// 반응성을 유지하고자 할때는 toRefs(), toRef()를 사용하여 구조분해 한다.
const { author, title } = toRefs(book)
// 반응성을 유지하며 값을 하나씩만 가져오고자 할때는 toRef()를 사용
const author = toRef(book, 'author')
const title = toRef(book, 'title')
```
:::

#### readonly() 사용해보기
선언된 원본 반응형data를 회손시키지 않게 하고자 할때 사용  
주로 많은 컴포넌트로 분리된 실전에서 원본값은 부모컴포넌트에 있고 자식 컴포넌트에서 부모컴포넌트값을 변경하지 못하게 할때 사용하면 좋을것 같음.
```js
// 원본 반응형 데이타
const original = reactive({ count: 0 })
// readonly로 재 할당한 copy데이타
const copy = readonly(original)
// 원본 original은 변경가능
original.count++
// 하지만 readonly로 선언된 copy는 변경할 수 없음
copy.count++  // warning: "Set operation on key 'count' failed: ....."
```
::: tip
이 외에도 많은 반응형 속성이 있다. 공식문서를 참조하여 습득히 필요함.  
[Reactivity공식문서](https://vuejs.org/api/reactivity-core.html)
:::


### data를 이용한 v-bind, v-if, v-for
---
```html
<template>
	<div>
		<span v-bind:title="message">
			내 위에 잠시 마우스를 올리면 동적으로 바인딩 된 title을 볼 수 있습니다!
		</span>
		<p v-if="seen">이제 나를 볼 수 있어요</p>
		<ol>
			<li
				v-for="(todo, i) in todos"
				v-bind:key="i"
			>
				{{ todo.text }}
			</li>
		</ol>
	</div>
</template>
<script lang="ts">
import { ref, reactive } from 'vue'
export default {
	name: 'SampleComponent',
}
</script>
<script setup lang="ts">
// v-bind에서 사용할 data.
const message = ref('안녕하세요 Vue!')
// v-if문에서 사용할 data.(값을 false로 바꾸면 위 메시지가 보이지 않는다.)
const seen = ref(true)
// v-for문에서 사용할 data.
const todos = reactive([
	{ text: 'JavaScript 배우기', },
	{ text: 'Vue 배우기', },
	{ text: '무언가 멋진 것을 만들기', },
])
</script>
```

### v-memo 활용 (vue3.2+)
---
**v-memo**에 들어가는 배열의 반응형 값이 변경이 이루어졌을 때 자식 `element`의 모든 반응형 값들이 한꺼번에 업데이트를 한다.
```html
<div v-memo="[valueA]">
  <span>{{ valueA }}</span>
  <span>{{ valueB }}</span>
  <span>{{ valueC }}</span>
</div>
```
* `valueB`, `valueC`는 반응형data이지만 처음 한번만 값을 셋팅하고 업데이트 하지 않고 있다가 `v-memo`에 셋팅한 `valueA`값이 변경이 이루어졌을때 한꺼번에 `valueA`, `valueB`, `valueC`가 모두 없데이트 된다.
* <span style="color: green">`v-memo`는 일반적인 상황에서는 사용하지 않고 성능 최적화가 필요한 상황에서 사용하면 좋은 디렉티브 이다.</span>
```html
// 성능최적화 예제
<div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
  <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
  <p>...more child nodes</p>
</div>
```


### 이벤트 핸들링
---
일반적으로 `v-on` 디렉티브는 단축 문법으로 `@` 기호를 사용하지만, 우리 프로젝트에서는 `v-on`을 그대로 사용한다.
* **Composition API**를 사용하여 이벤트 핸들링
```html
<template>
	<div>
		<p>{{ message }}</p>
		<button v-on:click="reverseMessage">메시지 뒤집기</button>
	</div>
</template>
<script lang="ts">
import { ref } from 'vue'
export default {
	name: 'SampleComponent',
}
</script>
<script setup lang="ts">
const message = ref('안녕하세요 Vue!')
const reverseMessage = (event: Event) => {
	message.value = message.value.split('').reverse().join('')
}
</script>
```

* **Option API**를 사용하여 이벤트 핸들링(사용하지 않음)
```html
<template>
  <div>
    <p>{{ message }}</p>
    <button v-on:click="reverseMessage">메시지 뒤집기</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: '안녕하세요 Vue!'
    };
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('');
    }
  }
}
</script>
```
::: tip 부모 컴포넌트에서 자식컴포넌트에 이벤트를 사용할 때
* 아래 코드와 같이 부모 컴포넌트에서 자식 컴포넌트에 `click`이벤트를 부여하면 자식 컴포넌트에서는 최상위 `element`에 상속이 되므로 주의 해야한다.
```html
<!-- 부모컴포넌트 -->
<div>
  <CustomButton v-on:click="clickHandler" />
</div>

<!-- 자식컴포넌트(CustomButton.vue) -->
<template>
  <div> <-- 부모컴포넌트에서 바인딩한 'click'이벤트가 여기 DIV에 상속이 된다.
    <button class="btn-class">My Button</button>
  </div>
</template>
// 이와같이 최상위 element에 이벤트가 상속되는것을 막는 방법은 아래와 같이 "inheritAttrs" 옵션을 "false"로 한다.
<script>
export default {
  inheritAttrs: false
}
</script>
// 최상위 element에 바인딩 되지않게 막은 이벤트를 특정 element에 바인딩 하고자 할때는
// 아래와 같이 해당 element에 $attrs를 "v-bind" 한다.
<button v-bind="$attrs">click me</button>
```
:::

### Computed 사용방법
---
`<template>`에서 텍스트보간법"{ { } }" 안에 복잡한 계산식이 많아지면 가독성이 떨어지고 비효율적이다.  
이럴때 `계산된 속성(Computed property)`을 사용한다.
```js
// 아래 계산식을 Computed로 빼서 단순화 시키고 반복적으로 사용할 수도 있다.
<span>{{ people.count.length > 0 ? 'Yes' : 'No' }}</span>
// 위 계산식을 Computed로 만든 예
const hasCount = computed(() => {
  return people.count.length > 0 ? 'Yes' : 'No'
})
// 만든 Computed를 사용 예
<span>{{ hasCount }}</span>
```
::: tip Computed 와 Method 차이
* 같은 기능을 하는 계산식을 Computed와 Method로 똑같이 만들 수 있다.
```html
<script>
// Computed
const hasCount = computed(() => {
  return people.count.length > 0 ? 'Yes' : 'No'
})
// Method
const hasCount2 = () => {
  return people.count.length > 0 ? 'Yes' : 'No'
}
</script>
// <template>에서 사용할때는 아래와 같이 사용한다.
<template>
  <div>
    // Computed사용
    <p>{{ hasCount }}</p>
    // Method사용
    <p>{{ hasCount2() }}</p>
  </div>
</template>
```
:star: **Computed**는 값 변경이 없으면 항상 캐시된 값을 return하므로 **Method**보다 성능면에서 유리하다.  
반면 **Method**는 실행될 때마다 호출이 되므로 **Computed**보다 성능면에서 유리하지 않다.
:::
::: tip Computed는 기본 읽기 전용이다.
* Computed는 기본 읽기 전용이다. 하지만 읽기, 쓰기를 모두 사용하고자 할때는 **getter**와 **setter**를
만들어 사용할 수 있다.
```js
const fullName = computed({
  get() {
    return firstName.value + ' ' + lastName.value
  },
  set(newValue: string) {
    // .value한 값이 'newValue'로 들어온다.
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
```
* Computed에 기본적으로 `fullName.value = '값'`과 같이 Computed에 값을 셋팅하면 오류가 발생한다.
* 하지만 위와같이 setter를 만들어 주면 `fullName.value = '값'`과 같이 값을 셋팅도 할 수 있다.
:::

### Watch 사용방법
---
* `ref`, `reactive`, `computed`, `getter함수`, `array` 타입의 데이타가 변경되는 시점을 감지해서 다른작업을 해야할때 사용한다.
* 첫번째 인자는 `ref`, `reactive`, `computed`, `getter함수`, `array` 타입의 데이타를 넣어준다.
* 두번째 인자는 감지하여 실행할 **callback**함수를 넣어준다.
* 세번째 인자는 watch함수의 옵션을 사용할 수 있다.
```js
// CompositionAPI의 Watch함수 사용 예시
const message = ref('Hello World')

// message 데이터 변경 감지
watch(message, ( newValue, oldValue ) => {
  console.log('newValue: ', newValue)
  console.log('oldValue: ', oldValue)
})
//------------------------------------------------
// getter함수를 사용한 예시
const x = ref(0)
const y = ref(0)
watch (
  () => x.value + y.value,
  sum => {
    console.log('sum: ', sum)
  }
)
//-----------------------------------------------
// array로 여러개를 감지할 수도 있다.
watch([x, y], ([newX, newY]) => {
  console.log(newX, newY)
})
```
::: tip Watch의 deep option
* **watch**로 **object**를 감지할때 **기본은 object의 내부 속성 하위속성까지 감지**하는 깊은 속성까지 감지한다.
:::
::: tip Watch의 immediate옵션 사용
* **Watch**를 최초 생성될때도 즉시 실행하고자 할때는 **immediate**옵션을 사용한다.
```js
const message = ref('Hello World')
const reverseMessage = ref('')
watch(
  message,
  (newValue) => {
    reverseMessage.value = newValue.split('').reverse().join('')
  },
  {
    immediate: true,
  }
)
```
* watch 모든 옵션 종류
```js
interface WatchOptions extends WatchEffectOptions {
  immediate?: boolean // default: false
  deep?: boolean // default: false
  flush?: 'pre' | 'post' | 'sync' // default: 'pre'
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}
```
:::
::: tip Watch와 Computed 용도 차이
* **Watch**는 감시할 데이타가 변경되는 시점에 특정액션(api호출, DOM변경, push route)을 실행할 때 적합하다.
* **Computed**는 감시할 데이타가 변경되는 시점에 종속되는 관계의 다른곳에 자동으로 셋팅을 하고자 할때 적합하다.
* <span style="color: blue">`computed`로 구현이 가능한 상황이라면 `Watch`보다 `Computed`를 사용하는게 좋다.</span>
:::

### watchEffect 사용방법
---
`watch()`는 명시적으로 특정 반응형데이타를 정해서 감시를 하지만 `watchEffect()`는 함수 내부에서 사용되는 모든 반응형데이타를 감시하므로 `watch()`와 다르게 여러개의 데이타를 감시할 수 있다.
```js
const save = (title, contents) => {
  console.log(`저장되었습니다. ${title}, ${contents}`)
}

watchEffect(() => {
  console.log(`watchEffect`)
  save(title.value, contents.value)
})
```

### v-model 사용
---
**Form 요소**(input, textarea select) 또는 **사용자 컴포넌트**에서 양방향 데이터 바인딩을 쉽게 처리 해주는 디렉티브 기능.
### Form 입력요소에서 사용(input, textarea, select)
* **Form요소**에 `v-model`을 사용했을 때 내부적으로 기본적으로 사용되는 `props`와`event`는 다음과 같다.

| Form요소                 |      props |  event  |
| ------------------------ | :--------: | :-----: |
| `<input type="text">`    | value      | input   |
| `<textarea>`             | value      | input   |
| `<input type="checkbox">`| checked    | change  |
| `<input type="radio">`   | checked    | change  |
| `<select>`               | value      | change  |

* `<input type="text">`
```html
<!-- v-model을 사용하지 않고 같은기능을 구현한 예 -->
<input
  type="text"
  v-bind:value="text"
  v-on:input="event => text = event.target.value">
<!-- v-model을 사용한 예 -->
<input type="text" v-model="text">
```


#### 사용자 커스텀 컴포넌트에서 `v-model` 사용
* 커스텀 컴포넌트(`<CustomInput>`)가 아래와 같은 내용으로 있다고 가정한다.
```html
<!-- CustomInput.vue -->
<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```
* `<CustomInput>`를 `v-model`을 이용하지 않고 사용한 방법
```html
<CustomInput
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
/>
```
* `v-model`을 사용한 방법
```html
<CustomInput v-model="searchText" />
```
::: tip 커스텀 컴포넌트에서 computed를 이용한 `v-model`사용을 위한 구성
* 커스텀 컴포넌트의 내부에서 `props`,`emit`을 **computed**를 이용하여 구현할 수 있다.
```html
<!-- CustomInput.vue -->
<script setup>
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <input v-model="value" />
</template>
```
:::

::: tip `v-model` 이름 만들기
* `v-model`의 기본명`modelValue`를 사용하지 않고 내가 정한 이름으로 만들 수 있다.
```html
<!-- MyComponent.vue -->
<script setup>
defineProps(['title'])
defineEmits(['update:title'])
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```
* 컴포넌트 사용부분
```html
<MyComponent v-model:title="bookTitle" />
```
:::

::: tip 다중 `v-model` 사용하기
* `v-model`여러개 사용하기
```html
<script setup>
defineProps({
  firstName: String,
  lastName: String
})

defineEmits(['update:firstName', 'update:lastName'])
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```
* 컴포넌트 사용
```html
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
```
:::

### template refs 사용방법
---
template요소에서 element에 `ref`속성을 사용하여 DOM에 접근할 수 있다.
```html
<template>
  <div>
    <input ref="input" type="text" />
    <!-- 아래와 같은 방법으로 사용할 수 있다. -->
    <p v-if="input">{{ input.value }}, {{ $refs.input.value }}</p>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
export default {
  setup() {
    const input = ref(null)
    // setup() 내에서는 아직 DOM이 생성되지 않았기 때문에 'ref'요소를 사용할 수 없다.
    console.log('setup:', input.value)
    onMounted(() => {
      console.log('onMounted: ', input.value)
    })
    return { input }
  }
}
</script>
```


### Compositions API로 소스코드 그룹핑 개발
---
#### 논리적 관심사 코드를 그룹핑
*.vue페이지에 `data, method, computed, watch` 등 기능별로 그룹핑 되었던 방식을 떠나서,
논리적으로 같은 관심사에 해당하는 `data, method, 등`을 한곳에 묶어서 그룹핑 하여 가독성을 높인다.
* **Composition API**를 사용하여 논리적 관심사가 같은 코드를 그룹핑하여 작성한 코드
::: tip
이렇게 논리적으로 같은 소스(data, method, computed, ... 등)을 한곳에 그룹핑하여 코드를 작성하면 나중에 따로 Util컴포넌트로 파일분리 해서 빼거나, **Composable함수**로 분리해서 **재사용** 하기에 용이하다.  
**Composable함수**로 분리해서 사용하면 **Mixin**을 사용하지 않아도 된다.
:::
```javascript
import { onMounted, computed, reactive, ref } from 'vue'

// counter에 대한 data, method를 같이 그룹핑
const counter = ref(0)
const increment = () => {
	counter.value++
}

// books에 대한 data, method, computed를 같이 그룹핑
const books = reactive([])
const addBook = ( title: string, author: string ) => {
	books.push({ title, author, })
}
const firstBook = computed(() => {
	return books[0]
})

onMounted(() => {
	console.log('컴포넌트가 마운트 되었습니다!')
})
```
* **Options API**를 사용하여 작성한 코드(사용하지 않음)
```javascript
export default {
	data() {
		return {
			counter: 0,
			books: [],
		}
	},
	methods: {
		increment() {
			this.counter++
		},
		addBook(title, author) {
			this.books.push({ title, author, })
		},
	},
	computed: {
		firstBook() {
			return this.books[0]
		},
	},
	mounted() {
		console.log('컴포넌트가 마운트 되었습니다!')
	},
}
```
