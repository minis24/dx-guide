# 업무 페이지에서 rest API 적용 방법


## 상태관리도구 Pinia
---
Pinia store 흐름도
![Pinia 기본 흐름 구조도](/assets/image/vue3-dev-guide/pinia01.png)
* [Pinia 공식 문서 URL:(https://pinia.vuejs.org/)](https://pinia.vuejs.org/)


## 백앤드 rest API를 화면에 적용하는 순서
---
각 도메인 업무별 사용하는 **rest API**를 호출하여 가져온 **response 데이타**를 **store**에 담고, 화면에서 해당 데이타를 **store**에서 가져와 사용하는 방법을 순서대로 설명한다.

### account(계좌)업무 폴더 구조
* 개발해야 할 업무가 **"계좌(account)"** 라고 가정 했을 때 아래와 같이 폴더 구조를 생성하고, 하위 구조를 만든다.
* **account**폴더가 생성되면 하위로 <span style="color:#0089ff">api, components, composables, pages, router, store, types</span>폴더를 가질 수 있다.  
* 필요없는 폴더는 만들지 않아도 된다.  
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

### <span style="color:green">api/url.ts</span> 파일에 api url을 입력.
* 사용해야할 API url이 **https://app.domain.com/api/v1/search** 라고 가정했을 때 도메인(https://app.domain.com)은 빼고 하위 url만 입력한다.
* 도메인(https://app.domain.com)은 추 후 공통 영역에서 설정한다.
* API명은 대문자로 입력한다.
```js
// api/url.ts파일
// search 라는 api를 사용한다고 가정.
export default {
  SEARCH: '/api/v1/search',
  ...
  ...
};
```

### <span style="color:green">api/SEARCH.ts</span> 파일 생성.
* **api/url.ts**에 입력했던 "SEARCH"와 같은 이름의 **SEARCH.ts**파일을 api폴더 안에 생성한다.
```sh
# SEARCH.ts 파일 생성
src
  ├─ ...
  ├─ ...
  ├─ domains
  │  ├─ ...
  │  ├─ account
  │  │  ├─ api
  │  │  │  ├─ SEARCH.ts
  │  │  │  └─ url.ts
  │  │ ...
  │  └─ ...
```
* **SEARCH.ts**파일의 용도는 api에서 사용하는 request, response관련 모든 타입(typescript)을 정의하는 파일이다.
* **SEARCH.ts**파일에 'SEARCH' api의 **request, response** **type**을 작성한다.
* 중첩된 데이타 구조의 모든 타입을 정의해 준다.
* 타입 작성 시 궁금한 사항은 Frontend 공통개발자에게 문의.
```js
// SEARCH.ts의 타입 설정 예시

// Request interface 작성
// Request 파라미터가 없을경우에는 export type TRequestSEARCH = void
export interface IRequestSEARCH {
  query: string;
  tags: string;
};
// Response interface 작성
// Response 가 없을경우 export type TResponseSEARCH = void
export interface IResponseSEARCH {
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  hits: IHits[];
  hitsPerPage: number;
  nbHits: number;
  nbPages: number;
  page: number;
  params: string;
  processingTimeMS: number;
  query: string;
  renderingContent: any;
}

// IResponseSEARCH 타입중에 hits 배열 interface 정의
export interface IHits {
  author: string;
  comment_text: string | null;
  created_at: string;
  created_at_i: number;
  num_comments: number;
  objectID: string;
  parent_id: number | null;
  points: number;
  relevancy_score: number;
  story_id: string;
  story_text: string;
  story_title: string;
  story_url: string;
  title: string;
  url: string;
  _highlightResult: I_highlightResult;
  _tags: string[];
}

// IHits 타입중에 _highlightResult interface 정의
export interface I_highlightResult {
  author: IAuthor;
  title: IAuthor;
  url: IAuthor;
}

// I_highlightResult 타입중에 author interface 정의
export interface IAuthor {
  matchLevel: string;
  matchedWords: any[];
  value: string;
}
```


### <span style="color:green">store/state.ts</span> 파일 생성 후 search상태(state)만들기
* **search api**를 통하여 가져온 **response**데이타를 담기위한 **search**라는 이름의 state를 생성한다.
* 생성할 search state는 api/url.ts파일의 **api명**과 같게 **search**로 하고 **소문자**로 생성한다.
* 초기값은 **null**로 셋팅해주고, 상황에 따라 적절한 값을 입력해도 상관없다.
```js
// store/state.ts 파일 예시
// state 타입은 아래와 같이 import하고 store/types.ts파일에 IAccountState 타입을 만든다.
import type { IAccountState } from '@/domains/account/store/types';

export default (): IAccountState => {
	return {
    // state명은 api url명과 같게 하고 소문자로 만든다.
		search: null,
	};
};
```


### <span style="color:green">store/types.ts</span>파일에 search state 타입 만들기
* **store/types.ts**파일은 store폴더에서 사용하는 모든 **타입**을 작성하는 파일이다.
* **state.ts**파일에서 사용했던 **IAccountState** 타입을 정의해준다.
```js
// api/SEARCH.ts에 작성한 IResponseSEARCH interface타입을 가져온다.
import type { IResponseSEARCH } from '@/domains/account/api/SEARCH';

export interface IAccountState {
  // search state에 IResponseSEARCH 타입을 적용하고 유니언 타입으로 null도 함께 적용한다.
	search: IResponseSEARCH | null
	// ...
}
```


### <span style="color:green">store/action.ts</span>파일에 action 만들기
* **actions**객체에 **apiHelper** axios핼퍼함수를 이용하여 **search** 액션함수를 아래와 같이 추가해 준다.
```js
// 공통 타입인 ActionTree타입과, axios헬퍼 공통 함수인 apiHelper함수를 가져온다.
import { apiHelper } from '@/app/store/helper';
import type { ActionTree } from '@/app/store/types';
// account api url 사용을 위한 Url을 가져온다.
import Url from '@/domains/account/api/url';
// account search api의 타입을 가져온다.
import type { IRequestSEARCH, IResponseSEARCH } from '@/domains/account/api/SEARCH';

// 생성될 API만큼 Action명을 만든다.
// Action명은 state명과 같게하고 대문자로 한다.
// enum명은 'E' + 업무명(Account) + 'Action' 형태로 만든다.
export enum EAccountAction {
	SEARCH = 'SEARCH',
  // ... action 계속 추가.
}

// 아래와 같은 형태로 apiHelper함수를 사용하여 action을 한줄 추가한다.
const actions: ActionTree<EAccountAction> = {
  [EAccountAction.SEARCH]: apiHelper<IRequestSEARCH, IResponseSEARCH>(Url.SEARCH, EAccountAction.SEARCH),
  // ... 다른 action 계속 추가 할 수 있음.
};

export default actions;
```


### <span style="color:green">store/getter.ts</span> 만들기
* getter는 **필요할 때만 생성**하여 만들면 된다.
```js
// getter참조용 소스
import type { GetterTree } from '@/app/store/types';
import type { IAccountState } from '@/domains/account/store/types';

export const enum EAccountGetter {
	getSearchHitsArray = 'getSearchHitsArray',
  // ... getter 추가
}

const getters: GetterTree<EAccountGetter> = {
  // 추가된 getter만큼 function추가.
	[EAccountGetter.getSearchHitsArray](state: IAccountState) {
    // 필요한 데이타를 state에서 가공하여 return 한다.
		return state.news?.hits;
	},
  // ... getter함수 추가
};

export default getters;
```



### <span style="color:green">store/index.ts</span>에 defineStore를 이용하여 store생성.

* **defineStore**를 이용하여 **Account(계좌)** store를 만들어 준다.
* 만들어진 <span style="color:green">store/getter.ts, store/action.ts, store/state.ts</span>를 **defineStore**를 이용하여 연결한다.
```js
import { defineStore } from 'pinia';

// 만들어진 state, getters, actions를 불러온다.
import state from './state';
import getters from './getter';
import actions from './action';

// 계좌 store를 생성한다. 통상적으로 이름(Account) 앞에 use접두사를 사용한다.
export const useAccountStore = defineStore('accountStore', {
	state,
	getters,
	actions,
});
```



### 지금까지 만든 <span style="color:green">search api</span>를 페이지에서 사용해 보기.
* **store**에 생성한 **search** action을 사용하여 내가 구현하고자 하는 페이지에서 데이타를 가져오는 예제
```html
<template>
  <ul>
    <li
      v-for="(item, index) in search.hits"
      v-bind:key="index"
    >
      <span>{{ item.title }}</span> :
      {{ item.author }}
    </li>
  </ul>
</template>
<script setup lang="ts">
import { useAccountStore } from '@/domains/account/store';
import { storeToRefs } from 'pinia';

// account store를 가져온다.
const accountStore = useAccountStore();
// account store에 있는 search state를 구조분해 문법으로 가져온다.
// storeToRefs를 사용하여 데이터에 대한 반응성을 유지 한다.
const { search } = storeToRefs(accountStore);

onMounted(() => {
  // search API action을 호출한다.
  // 호출하면 위에서 작성한 내부 apiHelper함수가 자동으로 store에 데이타를 저장해 준다.
  accountStore.SEARCH({ query: 'foo', tags: 'story' });
});
</script>
```
  - 작업을 하다 보면 api를 통해 데이타를 가져왔는데 아래와 같은 VSCode 오류 라인이 보이는 경우가 있다. 이것은 최초 데이타가 **null**이거나**undefined**일때 나는 오류로 아래 이미지와 같이 **javascript Optional chaining** 연산자 **물음표 '?'** 를 이용하여 값이 있을때만 for루프를 진행하게 적용할 수 있다.
    - 사용 전
  ![javascript optional chaining사용 전](/assets/image/vue3-dev-guide/api-guide04.png)  
    - 사용 후
  ![javascript optional chaining사용 후](/assets/image/vue3-dev-guide/api-guide05.png)
* **action**을 호출하면 **Promise 객체**를 리턴 하므로 아래와 같은 방법으로 데이타를 가져올 수도 있다.
```js
// search API action을 호출한다.
accountStore.SEARCH({ query: 'foo', tags: 'story' }).then((res: any) => {
  console.log(res.data);
});
```

## API호출 시 <span style="color:green">option</span> 사용 방법
---

* rest api를 호출하기 위한 action 준비가 다 되었으면 아래와 같이 각 페이지에서 기본적으로 호출 할 수 있다.
```js
import { useAccountStore } from '@/domains/account/store';
// account store를 가져온다.
const accountStore = useAccountStore();

// search API action을 호출한다.
accountStore.SEARCH({ query: 'foo', tags: 'story' });
```

* api 호출 시 <span style="color:green">option</span>값을 파라미터로 설정하여 보낼 수 있다.
```js
accountStore.SEARCH({ query: 'foo', tags: 'story', option: { method: 'get', } });
```
* option 파라미터 값 명세서  

| 옵션파라미터 명            |      타입      |  기본값 |  입력 가능 값            |
| ------------------------- | :------------: | :----: | :---------------------: |
| **method**                | string         | 'post' | 'post', 'get', 'delete' |
| **timeout**               | number         | 0      | 숫자값                   |
| **isStatic**              | boolean        | false  | true, false             |
| **headers**               | object         | `{ 'Content-Type': 'application/json;charset=UTF-8', Accept: 'application/json' }` | http header |
| **allowDuplicate**        | boolean        | false  | true, false             |
| **disableLoadingSpinner** | boolean        | false  | true, false             |
| **params**                | object         | undefined | api url에 입력한 변수명 |
| **isSetState**            | boolean        | true   | true, false             |

#### 설명  
* **method :** rest api호출 시 `요청 method`를 변경 할 수 있다.
* **timeout :** rest api호출 시 timeout을 정 할 수 있다.
* **isStatic :** http 요청 시 일반 rest api가 아닌 static파일을 가져오기 위한 옵션이다.
* **headers :** rest api호출 시 `header`정보를 전송 할 수 있다. 기본값이 있기때문에 거의 사용되지 않음.
* **allowDuplicate :** rest api호출 시 중복호출 방지 로직을 사용할지 여부 값.
* **disableLoadingSpinner :** rest api호출 시 로딩 이미지가 기본으로 뜨는데 이것을 사용할지 여부를 정할 수 있다.
* **params :** rest api호출 url에 변수값이 셋팅 되어있는 경우에만 사용한다.
  ```js
  // 아래와 같은 api url이라고 가정한다면, 변수 no가 params에 보져야 한다.
  export default {
    BOARD_DELETE: '/api/pilot/board/delete/:no',
  };

  // api호출 시 option의 params에 넣어줄 no값
  boardListStore.BOARD_DETAIL({
    option: { params: { no: '123', }, }, 
  });
  ```
* **isSetState :** rest api를 호출하고, 결과를 state에 저장할 필요가 없을경우 false로 셋팅한다.


## API호출 시 크롬 브라우저 DevTools로 상태 확인 방법
* API를 페이지에서 호출하고 나서 잘 호출 되었는지, 또는 stats에 잘 저장 되었는지 확인은 크롬 브라우저의 개발자 도구 창을 이용한다.
* 위에서 만든 **SEARCH API**가 네트워크 상에 잘 호출 되었는지, 에러상태 등 확인은 크롬 개발자도구 창의 network탭 화면을 이용한다.
![개발자도구 창의 network탭](/assets/image/vue3-dev-guide/api-guide01.png)
* 페이지에서 호출한 API의 데이타가 페이지에서 잘 가져왔는지는 **DevTools**창을 통해서 확인 해볼 수 있다.
![개발자도구 창의 DevTools](/assets/image/vue3-dev-guide/api-guide03.png)
![개발 페이지](/assets/image/vue3-dev-guide/api-guide02.png)
