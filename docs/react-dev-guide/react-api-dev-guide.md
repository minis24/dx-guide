# 개발 페이지에서 REST API 사용 방법


## SWR(stale-while-revalidate)을 사용한 데이터 관리
---
* SWR은 먼저 캐시(스태일)로부터 데이터를 반환한 후, fetch 요청(재검증)을 하고, 최종적으로 최신화된 데이터를 가져오는 전략입니다.
* [https://swr.vercel.app/ko](https://swr.vercel.app/ko)

## REST API를 사용하여 화면에 데이터 적용 순서
---
각 도메인 업무 별 사용하는 **REST API**를 **React Hook**방식으로 호출해서 가져온 **response 데이터**를 화면에서 사용하는 방법을 순서대로 설명한다.


### account(계좌)업무 폴더 구조
* 개발해야 할 업무가 **"계좌(account)"** 라고 가정 했을 때 아래와 같이 폴더 구조를 생성하고, 하위 구조를 만든다.
* **account**폴더가 생성되면 하위로 <span style="color:#0089ff">api, components, pages, router, types</span>폴더를 가질 수 있다.  
* 필요없는 폴더는 만들지 않아도 된다.  
자세한 내용은 [Frontend 개발 규칙 및 구조](./react-dev-convention.md) 가이드 내용을 참조 하세요.
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
  │  │  │  └─ AccountList.tsx # 계좌 리스트 컴포넌트(가정)
  │  │  ├─ pages
  │  │  │  ├─ AccountIndex.tsx  # 계좌메인화면(가정)
  │  │  │  └─ AccountUsage.tsx  # 계좌이용내역화면(가정)
  │  │  ├─ router
  │  │  │  └─ index.tsx
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

// url의 타입을 호출 시 사용하기 위하여 선언 해준다.
export type TUrl = (typeof url)[keyof typeof url];

const url = {
	SEARCH: '/api/v1/search',
} as const;

export default url;
```


### 생성한 <span style="color:green">url.ts</span>파일을 이용하여 <span style="color:green">search api</span>를 페이지에서 사용해 보기.
* **url.ts**파일에 생성한 **search API**를 사용하여 화면에서 데이터를 불러온다.
* API 호출용 공통 **<span style="color:green">useAPI</span> hook**을 사용하여 API를 호출한다.
```jsx
import { useEffect } from 'react';
import url, { TUrl } from '@/domains/account/api/url';
import { setState, useAPI } from '@/app/store';
import Button from 'react-bootstrap/Button';

const AccountIndex = () => {
  const { data, setData, error, fetch } = useAPI<TUrl>(url.SEARCH);

  // 버튼 클릭 시 search api를 호출한다.
  const callSearchAPI = () => {
    fetch({ option: { method: 'get' } });
  };
  // 초기화 버튼 클릭 시 search 데이터 상태값을 변경 한다.
  const initSearchAPI = () => {
    // setData() 함수는 패치할 데이터만 넘겨주면 search 데이터에 대한 상태값이 패치 된다.
    setData('');
    // 또는 setState는 전역함수이기 때문에 상태 키값을 첫번째 매개변수로 넣어주어야 한다.
    setState(url.SEARCH, '');
  };

  useEffect(() => {
    // 페이지 진입과 동시에 search API를 호출한다.
    callSearchAPI();
  }, []);

  return (
    <>
      <h1>Search API Test Page</h1>
      <Button onClick={callSearchAPI}>Call API</Button>
      <Button onClick={initSearchAPI}>API 데이터 초기화</Button>
      <div>{data ? JSON.stringify(data) : ''}</div>
      {error ? <p style={{ color: 'red' }}>{error.message}</p> : null}
    </>
  );
};

export default AccountIndex;
```
![api호출 결과 페이지](/assets/image/react-dev-guide/api-guide01.png)
:::tip :star: API호출 또는 전역 상태값 저장을 위한 store 훅 공통 함수에 대하여
* REST API호출과 상태값을 사용하기 위한 전역 공통 함수를 제공한다.
* import 위치.
```js
import { setState, useAPI, useStore } from '@/app/store';
```
* **<span style="color:#6363ff">useAPI</span>**: REST API 호출 후 상태값 사용을 위한 공통 훅 함수.
  - 사용 예시
  ```js
  const { data, setData, error, fetch } = useAPI<TUrl>(url.SEARCH);
  ```
* **<span style="color:#6363ff">setState</span>**: 저장 되어있는 상태값을 변경하기 위한 공통 훅 함수.
  - 사용 예시
  ```js
  setState('url또는 임의로 정한 키값', '변경할 값');
  ```
* **<span style="color:#6363ff">useStore</span>**: API 호출이 아닌 임의로 정한 Key값에 대한 상태 데이터를 저장하거나 가져오기 위한 공통 훅 함수.
  - 사용 예시
  ```js
  const [loadData, setLoadData] = useStore('임의로 정한 키값', '초기 데이터');
  ```
:::


## API 호출 시 <span style="color:green">option</span> 사용 방법
---
### REST API를 호출하기 위한 각 페이지에서 기본적으로 호출 방법.
* url.ts 파일을 만들고 각 API리스트를 셋팅.
```js
// url.ts
export type TUrl = (typeof url)[keyof typeof url];

const url = {
  SEARCH: '/api/v1/search',
} as const;

export default url;
```
* 각 페이지에서 API호출 코드
```js
import url, { TUrl } from '@/domains/.../api/url';
import { useAPI } from '@/app/store';

// search API 호출하기 위한 hook함수를 작성한다.
const { data, setData, error, fetch } = useAPI<TUrl>(url.SEARCH);
// useAPI함수로 부터 가져온 fetch함수를 이용하여 실제 API를 호출하는 부분
// 매개변수가 없는 API는 넣지 않아도 된다.
fetch({ query: 'foo', tags: 'story' });
```

### api 호출 시 <span style="color:green">option</span>값을 파라미터로 설정하여 보낼 수 있다.
```js
fetch({ query: 'foo', tags: 'story', option: { method: 'get' } });
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
  // 아래와 같은 api url이라고 가정한다면, 변수 no가 params에 보내져야 한다.
  const url = {
    BOARD_DELETE: '/api/pilot/board/delete/:no',
  } as const;

  // api호출 시 option의 params에 넣어줄 no값
  fetch({
    option: { params: { no: '123' } }, 
  });
  ```
* **isSetState :** rest api를 호출하고, 결과를 state에 저장할 필요가 없을경우 false로 셋팅한다.

## API호출 시 크롬 브라우저 React Developer Tools로 상태 확인 방법
---
* API를 페이지에서 호출하고 나서 잘 호출 되었는지, 또는 state에 잘 저장 되었는지 확인은 크롬 브라우저의 개발자 도구 창을 이용한다.
* 위에서 만든 **SEARCH API**가 네트워크 상에 잘 호출 되었는지, 에러상태 등 확인은 크롬 개발자도구 창의 network탭 화면을 이용한다.
![개발자도구 창의 network탭](/assets/image/react-dev-guide/api-guide02.png)
* 화면에서 호출한 API의 데이터가 화면에 잘 세팅 되어 있는지 **React Developer Tools**창을 통해서 확인 해볼 수 있다.
![개발자도구 창의 React Developer Tools탭](/assets/image/react-dev-guide/api-guide03.png)