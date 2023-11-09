# 업무(domain) 화면 개발 방법 가이드
Frontend개발자는 각 업무(domain)별로 자신이 맡은 공간에서 작업을 진행한다.


## 업무(Domain) 폴더 구조 만들기
---
* 모든 업무(domain)는 **domains**폴더 아래 생성하여 작업한다.
* 개발해야 할 업무가 **"계좌(account)"** 라고 가정 했을 때 아래와 같이 폴더 구조를 생성하고, 하위 구조를 만든다.
* **account**폴더가 생성되면 하위로 <span style="color:#0089ff">api, components, pages, router, store, types</span>폴더를 가질 수 있다. 불필요 시 생성하지 않아도 된다.  
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
  │  │  ├─ store
  │  │  └─ types
  │  │     └─ index.ts
  │  └─ ...
```
::: info 설명
* 내가 작업하는 업무는 **account**라고 가정한다.
* **account**업무의 하위에는 **api, components, pages, router, store, types**폴더를 가질 수 있다.
* 각 폴더는 업무 상황에 따라 생성하여 사용한다. 사용하지 않는 폴더는 없어도 상관없다.
* **router, store, types** 폴더는 기본적으로 진입 파일인 **index.ts**파일을 가진다.
:::


## 페이지 만들기
---
* 업무 폴더 구조가 완성되면 원하는 페이지를 만들어 본다.
* 페이지는 **pages** 폴더 내부에 ***.tsx** 파일로 생성한다.
* 페이지 ***.tsx**파일의 기본 구조는 아래와 같다.
```js
import { useEffect, FC } from 'react';

const SampleComponent: FC = () => {
  // useEffect hooks
  useEffect(() => {
    // ...
  }, []);

  return (
    <>
      <div>New Page!!</div>
    </>
  );
};

export default SampleComponent;
```
::: info 설명
* Frontend 개발 시 코드는 **TypeScript**를 사용하며, **ES6문법**에 익숙해야 한다.
:::



## 만든 페이지 라우터 연결
---
* **src/domains/account/pages/AccountIndex.tsx** 라는 페이지를 만들었다고 가정한다.
* 업무폴더에서(account폴더) **router/index.ts** 파일을 생성하고, **index.ts** 파일을 열어 기본 **router**코드를 작성한다.
* 만든 페이지가 **AccountIndex.tsx**파일이므로 아래와 같이 작성한다.
```js
import { TCustomRoute } from '@/app/types/router';
import AccountIndex from '@/domains/account/pages/AccountIndex';

const routes: TCustomRoute[] = [
  {
    path: 'account-page',
    element: <AccountIndex />,
    name: '계좌 메인',
  },
];

export default routes;
```
:star: **router/index.ts** 파일 작업이 완료 되면 해당 업무 라우터를 **Frontend 공통개발자**에게 요청하여 공통router에도 연결 해줘야 한다.
  * **Frontend 공통개발자**는 **src/app/router/app-route.ts**파일에 **추가된 업무 account 라우터**를 연결한다.
  ```js
  import { RouteObject } from 'react-router-dom';
  import LayoutIndex from '@/app/pages/layout/LayoutIndex';
  import homeRouter from '@/domains/home/router';
  // 새로 추가된 AccountRouter를 import한다.
  import accountRouter from '@/domains/account/router';

  const routes: RouteObject[] = [
    {
      path: '/',
      element: <LayoutIndex />,
      children: homeRouter,
    },
    // account관련 라우터를 연결한다.
    {
      path: '/account',
      element: <LayoutIndex />,
      children: accountRouter,
    },
  ];

  export default routes;
  ```

## account라우터를 브라우저에서 확인해보기
---
* 위에서 만든 **account**업무관련 페이지와 라우터 연결이 되었으면, 로컬(Frontend)서버를 띄우고 브라우저로 확인해 본다.  
* 로컬(Frontend)서버 띄우는 방법은 [Frontend 개발 환경 구성/VSCode에서 Frontend 서버 띄우고 브라우저로 확인해 보기 ](./dev-env-config.md#vscode에서-frontend-서버-띄우고-브라우저로-확인해-보기) 부분을 참조 하세요.
* 브라우저를 열고 **localhost:포트/account/account-page**를 입력하면 아래와 같이 보인다.
![Chrome브라우저에서 account페이지 확인하기](/assets/image/react-dev-guide/ide-guide06.png)
:star: 여기까지 했으면 해당 업무의 코딩 준비가 완료 되었다. 필요에 따라 기능을 추가하고 페이지 코딩을 진행하면 된다.

