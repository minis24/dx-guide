# Vue 스타일 가이드


## 컴포넌트 이름에 합성어 사용
---
**컴포넌트 이름**은 루트 컴포넌트인 App과 Vue에서 제공하는 내장 컴포넌트(`<transition>`, `<component>` 등)를 제외하고 항상 **합성어를 사용**한다.
::: danger 나쁨
```js
app.component('todo', {
  // ...
});
```
---
```html
<Item />
<item></item>
```
:::
::: tip 좋음
```js
app.component('todo-item', {
  // ...
});
```
---
```html
<!-- kebab-case 사용 -->
<todo-item></todo-item>
```
:::


## v-for에 key 지정
---
* v-for에 항상 key가 필요합니다. 엘리먼트의 경우에도 애니메이션의 객체 불변성과 같이 예측 가능한 행동을 유지하는 것이 좋다.
::: danger 나쁨
```html
<ul>
  <li v-for="todo in todos">
    { { todo.text } }
  </li>
</ul>
```
:::
::: tip 좋음
```html
<ul>
  <li
    v-for="todo in todos"
    v-bind:key="todo.id"
  >
    { { todo.text } }
  </li>
</ul>
```
:::


## v-if와 v-for 동시 사용 금지
---
* v-for를 쓰고있는 앨리면트에 v-if를 절대 중복 사용하지 않는다.
::: danger 나쁨
```html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    { { user.name } }
  </li>
</ul>i>
</ul>
```
:::
::: tip 좋음
```html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    { { user.name } }
  </li>
</ul>
```
---
```html
<ul>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">
      { { user.name } }
    </li>
  </template>
</ul>
```
:::


## props를 정의할 때 최대한 자세히 작성한다.
---
* 컴포넌트에서 **props**를 정의할 때는 가능한 한 상세하게 하며, 최소한 type정도는 지정한다.
::: danger 나쁨
```js
const props = defineProps(['status'])
```
:::
::: tip 좋음
```js
const props = defineProps({
  status: String
})
```
---
```js
const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: (value) => {
      return ['syncing', 'synced', 'version-conflict', 'error'].includes(
        value
      )
    }
  }
})
```
:::


## 컴포넌트(SFC: Single file component) 범위 안에 있는 style은 <span style="color:#0089ff">scoped</span>를 사용.

::: danger 나쁨
```html
<template>
  <button class="btn btn-close">×</button>
</template>

<style lang="scss">
.btn-close {
  background-color: red;
}
</style>
```
:::
::: tip 좋음
```html
<template>
  <button class="button button-close">×</button>
</template>

<!-- Using the `scoped` attribute -->
<style scoped lang="scss">
.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}
</style>
```
:::


## 컴포넌트(SFC: Single file component)의 Base가 되는 컴포넌트의 이름.
---
* 컴포넌트의 기본이 되는 <span style="color:#0089ff">Base</span>컴포넌트는 **접두사**로 <span style="color:#0089ff">Base</span>를 붙인다.
::: danger 나쁨
```sh
# 제각각 정해져 버린 컴포넌트 이름.
components/
|- MyButton.vue
|- VueTable.vue
|- Icon.vue
```
:::
::: tip 좋음
```sh
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```
:::


## 밀접한 연관 컴포넌트의 이름
* **부모 컴포넌트**와 밀접하게 연관된 **자식 컴포넌트**는 **접두사**로 부모 컴포넌트의 이름을 사용해야 한다.
* 이렇게 명명했을 때 **코드 에디터**는 주로 **알파벳순으로 파일을 정렬**하므로 연관된 컴포넌트 파일의 순서가 나란히 유지된다.
::: danger 나쁨
```sh
components/
|- TodoList.vue
|- TodoItem.vue
|- TodoButton.vue
```
---
```sh
components/
|- SearchSidebar.vue
|- NavigationForSearchSidebar.vue
```
:::
::: tip 좋음
```sh
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```
---
```sh
components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```
:::


## 컴포넌트 이름의 단어 순서
---
* 컴포넌트 이름은 최상위 수준의 단어(대부분이 자주 또 일반적으로 사용하는 단어)로 시작하고 설명을 나타내는 단어로 끝나야 한다.
::: danger 나쁨
```sh
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```
:::
::: tip 좋음
```sh
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```
:::


## Self-closing 컴포넌트 template 태그
---
* HTML 태그 및 컴포넌트 template은 내용이 없을 경우 불필요한 닫기 태그 없이 깔끔하게 적용 한다.
* self-closing은 ESLint로도 표시 해 준다.
::: danger 나쁨
```html
<my-component></my-component>
```
:::
::: tip 좋음
```html
<my-component />
```
:::
