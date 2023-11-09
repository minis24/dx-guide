# React 스타일 가이드


## <span style="color:#0089ff">*.tsx</span> 파일명  
---
**컴포넌트, 페이지** 이름은 **PascalCase** 형식을 사용합니다.

::: danger 나쁨
```js
reservationCard.tsx
reservation-card.tsx
```
:::
::: tip 좋음
```js
// PascalCase 사용
ReservationCard.tsx
```
:::


## 참조 이름 명
---
**컴포넌트**의 참조명은 **PascalCase**로 사용합니다.  
**변수명, 인스턴스명**은 **camelCase**를 사용합니다.
::: danger 나쁨
```js
import reservationCard from './ReservationCard';
const ReservationItem = <ReservationCard />;
```
:::
::: tip 좋음
```js
// PascalCase 사용(컴포넌트)
import ReservationCard from './ReservationCard';
// camelCase 사용(인스턴스)
const reservationItem = <ReservationCard />;
```
:::

## 디렉터리 루트 요소 이름 지정
---
디렉터리 루트 파일은 `index.tsx`로 지정하고 참조명은 해당 디렉터리명으로 지정 합니다.
::: danger 나쁨
```js
import Footer from './Footer/Footer';
import Footer from './Footer/index';
```
:::
::: tip 좋음
```js
import Footer from './Footer';
```
:::

## <span style="color:#0089ff">jsx구문</span>의 속성 정렬
---
다음과 같은 ESLint의 정렬 규칙을 따릅니다.
::: danger 나쁨
```html
<Foo superLongParam="bar"
     anotherSuperLongParam="baz" />
```
:::
::: tip 좋음
```html
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
/>
```
:::

## <span style="color:#0089ff">Props</span> 이름
---
prop 이름은 항상 **camelCase**를 사용합니다.  
prop의 값이 컴포넌트명 일때는 **PascalCase**를 사용합니다.
::: danger 나쁨
```html
<Foo
  UserName="hello"
  phone_number={12345678}
/>
```
:::
::: tip 좋음
```html
<Foo
  userName="hello"
  phoneNumber={12345678}
  Component={SomeComponent}
/>
```
:::

## <span style="color:#0089ff">Refs</span> 할당
---
**ref**에는 항상 콜백함수를 사용합니다.
::: danger 나쁨
```html
<Foo
  ref="myRef"
/>
```
:::
::: tip 좋음
```html
<Foo
  ref={(ref) => { this.myRef = ref; }}
/>
```
:::

## <span style="color:#0089ff">jsx 태그 괄호</span>
---
**jsx** 태그가 두 줄 이상일 경우에는 괄호로 묶습니다.
::: danger 나쁨
```js
render() {
  return <MyComponent variant="long body" foo="bar">
           <MyChild />
         </MyComponent>;
}
```
:::
::: tip 좋음
```js
render() {
  return (
    <MyComponent variant="long body" foo="bar">
      <MyChild />
    </MyComponent>
  );
}
```
:::


