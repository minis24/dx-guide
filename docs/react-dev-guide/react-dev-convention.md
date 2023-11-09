# Frontend (React) 개발 규칙 및 구조

## Folder Structure
---
::: tip DDD(Domain Driven Design)
* Frontend영역 개발의 기본 폴더 구조는 <span style="color:#0089ff">DDD(Domain Driven Design)</span> 설계 방법론을 따른다.  
[참고링크: https://steemit.com/kr/@frontalnh/domain-driven-design](https://steemit.com/kr/@frontalnh/domain-driven-design)
* DDD에서 말하는 Domain은 **비지니스 Domain**이다. 즉 유사한 업무의 집합으로 구성하여, 어플리케이션의 모듈간의 의존성을 최소화하고, 비지니스 응집성을 최대화 한다.
* 업무가 복잡한 대형 프로젝트에 적합한 구조.
* domains폴더에 각각 업무(domain)별로 분리되어 영향도와 의존성이 적고 확장성이 용이해서 유지보수가 쉽다.
* 각 업무 담당 개발자는 자신이 맡은 업무 영역에서만 코딩 작업을 진행하며 서로 다른 업무간에 충돌 가능성이 적어진다.
* 부득이하게 자신의 업무 외 상위 업무나 공통 업무에 접근 해야하는 상황이라면 Frontend공통 개발자와 상의하여 shared를 통해 공유 하거나 app공통 객체를 통해 소통한다.
:::


### 기본 폴더 구조
```sh
...
@types
src
  ├─ App.tsx
  ├─ main.tsx
  ├─ app
  │  ├─ api
  │  ├─ common
  │  ├─ components
  │  ├─ pages
  │  ├─ plugins
  │  ├─ router
  │  ├─ store
  │  ├─ types
  ├─ assets
  │  ├─ fonts
  │  ├─ images
  │  ├─ scss
  ├─ domains
  │  ├─ home
  │  |  ├─ api
  │  |  ├─ pages
  │  |  ├─ router
  │  |  ├─ store // 현재는 필요 없을 것으로 보임
  │  ├─ example
  │  |  ├─ api
  │  |  ├─ pages
  │  |  ├─ router
  │  |  ├─ store // 현재는 필요 없을 것으로 보임
  │  ├─ // domain 업무를 계속 추가.
.env.development
.env.production
... // 기타 설정파일들
```

* <span style="color:green;font-weight:bold;">app</span> 폴더는 Frontend 전체 공통 모듈들이 있다. 공통개발자 이 외 업무개발자는 작업하지 않는 공간이다.
* <span style="color:green;font-weight:bold;">assets</span>폴더는 모든 정적 파일들(font, image, css파일 등)을 모아 놓은 폴더이다.
* <span style="color:green;font-weight:bold;">domains</span>폴더에는 각 업무(domain)들이 있고, 그 하위에는 일률적으로 <span style="color:#0089ff">api, components, pages, router, store, types</span>폴더를 가질 수 있다. 각 폴더는 업무 상황에 따라 생성하여 사용한다. **사용하지 않는 폴더는 없어도 상관없다.** 
  - <span style="color:#0089ff">api</span> : 해당 업무(domain)에서 사용하는 REST API URL을 정리한 `url.ts`를 정의한다.
  - <span style="color:#0089ff">components</span> : 업무 화면에서 사용하는 컴포넌트들을 모아 놓은 폴더.
  - <span style="color:#0089ff">pages</span> : 해당 업무(domain)의 화면 *.tsx파일들을 생성하는 폴더.
  - <span style="color:#0089ff">router</span> : 업무(domain)화면의 라우터를 작성하는 폴더.
  - <span style="color:#0089ff">store</span> : api를 통하여 화면에 보여줄 데이터를 관리하는 폴더. 
  - <span style="color:#0089ff">types</span> : 해당 업무에서 사용하는 모든 type을 정리하는 폴더.




## Code Convention
---
많은 개발자들의 협업으로 개발자 개인마다 코딩 스타일이 달라 유지보수가 어렵고 코드의 품질이 떨어질 수 있다.
그래서 아래와 같은 <span style="color:#0089ff">코딩 스타일</span>을 정의하여 따르도록 한다.


### Folder convention(<span style="color:#0089ff">폴더명</span>)
* 모든 폴더명은 **kebab-case**로 한다.
* **camelCase**보다 가독성이 좋고 node_modules의 모든 프로젝트들도 **kebab-case**를 사용하므로 그대로 따르기로 한다.
```sh
# 폴더명 적용 예시
src
  ├─ main.tsx
  ├─ App.tsx
  ├─ components
  │  ├─ common
  │  │  ├─ header-left  # 폴더명 kebab-case
  │  │  │  ├─ DefaultLeft.tsx
  │  │  ├─ header-right # 폴더명 kebab-case
  │  │  ├─ header-center # 폴더명 kebab-case
  │  ├─ ui
  │  │  ├─ dialog
  │  │  │  ├─ dialog-alert  # 폴더명 kebab-case
  │  │  │  ├─ dialog-confirm  # 폴더명 kebab-case
  │  │  │  ├─ dialog-prompt # 폴더명 kebab-case
  │  └─ ...
```


### File convention (<span style="color:#0089ff">파일명</span>)
* <span style="color:#0089ff">*.tsx</span>의 화면 또는 컴포넌트의 파일명은 **PascalCase**로 만든다.
* HTML 엘리먼트와의 차별성과 충돌 방지 차원.
* 되도록이면 **컴포넌트 명**은 두 단어가 합쳐진 **합성어를 사용**한다.
```sh
# 컴포넌트 *.tsx 파일명 예시
TodoItem.tsx
```

* <span style="color:#0089ff">*.ts, *.js, *.scss</span> 등 일반 파일명은 **kebab-case**로 만든다.
```sh
todo-system.ts
todo-style.scss
```


### TypeScript convention
* Frontend개발 시  **Typescript**를 사용하므로 관련 convention을 정의한다.
* **Interface**명은 관례적으로 앞에 '**I**'를 붙이고 **PascalCase**로 만든다.
```js
// TypeScript의 Interface명
interface ITodoList {
  id: number;
  content: string;
  completed: boolean;
}
```
* **type, enum**명은 앞에 '**T, E**'을 붙이고 **PascalCase**로 만든다.
```js
// TypeScript의 Enum명
enum EDirection {
  Up = 1,
  Down,
  Left,
  Right,
}
// Type명
type TPerson = {
  name: string;
  age: number;
}
```

### Router convention
* **path**는 **kebab-case**로 만든다.
* **id**는 **PascalCase**로 만든다.
```js
{
  path: '/ui-button',
  id: 'UiButton',
  component: <LayoutIndex />,
},
```



## React 스타일 가이드
---
* 좀 더 자세한 Frontend(React) 스타일 가이드를 정의한다.  
[React 스타일가이드 링크 이동](./react-style-guide.md)



