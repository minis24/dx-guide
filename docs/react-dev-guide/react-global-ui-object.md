# UI
* **각 Component** 에서 사용할 수 있는 **UI 전역 공통 component**에 대한 가이드 입니다.
* 전역 공통 Component이기 때문에 따로 **import** 하지 않아도 됩니다.
---


## <span style="color:#005192;">UI.Alert($ui.alert)</span>
---
* `UI.Alert`를 **javascript** 코드에서 사용할 때는 `$ui`객체의 `alert`함수를 이용하여 호출 합니다.
* $ui.alert() 함수는 ui창을 띄워 사용자에게 중요한 정보를 전달하는 데 사용됩니다.

### $ui.alert() 함수의 type 정보
```typescript
interface IAlertOption {
	close?: boolean;
	msg?: string;
	title?: string;
	autoDismiss?: number;
}

type alert = (message?: string|IAlertOption, option?: IAlertOption) => 
	Promise<any> & { innerClose: (vnode: any) => void };
```


### 사용법
* **$ui.alert('메시지')**  
  javascript 코드에서 **alert()** 함수를 호출할 때 가장 기본적인 호출 방법 입니다.
```js
import { useEffect } from 'react';

const SampleComponent = () => {
  // useEffect 훅스에서 바로 alert()함수를 호출.
	useEffect(() => {
		$ui.alert('alert샘플 입니다.');
	}, []);
};

export default SampleComponent;
```
* **$ui.alert('메시지', {옵션객체})**   
  **메시지** 와 함께 추가 설정할 **옵션**을 입력할 수 있습니다.  
  **옵션의 종류** 는 아래와 같습니다.
  | 옵션 명            |      타입      |  설명  |  값 예시            |
  | ------------------ | :-----------: | :----: | :---------------------: |
  | **close**          | boolean       | alert을 닫을지 여부(옵션객체가 첫번째 인자일때만 적용 됨) | true, false |
  | **title**          | string        | alert창의 title을 입력  |              |
  | **autoDismiss**    | number        | alert창을 띄우고 옵션에 설정한 밀리초 후에 자동으로 닫음.<br>millisecond 숫자값을 입력. | 2000 (2초) |
  | **type**          | string        | alert창의 type을 정의.  | 'success'             |

```js
import { useEffect } from 'react';

const SampleComponent = () => {
  // useEffect 훅스에서 바로 alert()함수를 호출.
  useEffect(() => {
    // title 옵션을 지정한 예제 입니다.
    $ui.alert('alert샘플 입니다.', { title: 'alert제목 입니다!', });
    // title과 함께 5초후 자동 닫힘 옵션을 적용한 예제 입니다.
    $ui.alert('alert샘플 입니다.', {
      autoDismiss: 5000,
      title: '제목',
    });
  }, []);
};

export default SampleComponent;
```

* **$ui.alert({ close: true })**  
첫번째 인자로 옵션객체의 `close`를 넘겨주면 alert창이 닫히는 예제.  
보통은 alert창에 있는 '확인'버튼을 통해 닫게 되지만, 예외로 script로직으로 닫고 싶은 경우에 사용한다.  
(주의) : `close`옵션은 alert창이 여러개 열려 있을 경우, 모든 열려있는 alert창 순서의 마지막 alert창 부터 닫히게 적용 되어있다.
```js
import { useEffect } from 'react';

const SampleComponent = () => {
  // useEffect 훅스에서 바로 alert()함수를 호출.
  useEffect(() => {
    // setTimeout을 이용하여 3초 후 alert을 닫게 적용함.
    // close옵션은 alert함수의 첫번째 인자로만 사용한다.
    setTimeout(() => {
      $ui.alert({ close: true });
    }, 3000);
  }, []);
};

export default SampleComponent;
```

* **$ui.alert('alert테스트 입니다.', { type: 'success' })**  
alert창을 띄울 때 **경고** 나 **주의** 같은 상태를 알리기 위한 **타입** 옵션을 제공합니다.  
**type 옵션 종류** 는 아래와 같습니다.

| type 옵션      |   타입   |  설명                                   |  비고            |
| -------------- | :------: | :-------------------------------------: | :-------------: |
| **success**    | string   | 체크 아이콘과 초록색 정보창을 띄워줍니다.  |                 |
| **info**       | string   | 'i' 아이콘과 파란색 정보창을 띄워줍니다.   |                 |
| **warning**    | string   | 느낌표 아이콘과 주황색 정보창을 띄워줍니다. |                |
| **error**      | string   | 'X' 아이콘과 빨간색 정보창을 띄워줍니다.   |                 |
```js
import { useEffect } from 'react';

const SampleComponent = () => {
  // useEffect 훅스에서 바로 alert()함수를 호출.
  useEffect(() => {
    $ui.alert('alert 테스트 입니다.', { type: 'success' });
  }, []);
};

export default SampleComponent;
```
// TODO
* **$ui.alert('alert테스트 입니다.', { icon: 'mdi-home-remove' })**
type옵션 이외에 다른 아이콘을 적용하여 alert창에 표시하기 위한 옵션 입니다.  
// TODO
* **$ui.alert('alert테스트 입니다.', { color: '#ff0000' })**  
alert창의 배경색을 지정하는 옵션 입니다. 









## <span style="color:#005192;">UI.Button</span>
---
**UI.Button** 컴포넌트는 페이지에 버튼을 표시할 수 있는 컴포넌트 입니다.  
다양한 크기, 상태 등을 지원하고 alert, confirm등의 대화상자 작업에 사용자 정의 버튼으로 스타일을 변경하여 사용할 수도 있습니다.

### 사용법
```js
const SampleComponent = () => {
	return (
    <UI.Button variant="success">버튼</UI.Button>
	);
};

export default SampleComponent;
```
### Props
* **UI.Button**에서 사용 가능한 **Props**입니다.  
  | Props명           |  타입       | default    |  설명                       |
  | ---------------- | :--------- | :--------- | :------------------------- |
  | **bsPrefix**     | string     | 'btn'      | 기본 구성 요소 CSS 기본 클래스 이름 및 한정자 클래스 이름 접두사를 변경합니다. 이것은 고도로 맞춤화된 부트스트랩 CSS로 작업하기 위한 탈출구입니다 .             |
  | **variant**      | string     | 'primary'  | 버튼의 변형된 스타일 조합입니다. 버튼은 다음과 같은 다양한 변형 중 하나일 수 있습니다. 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', 'link' * "outline" 버전('outline-*'이 접두사로 붙음) 'outline-primary', 'outline-secondary', 'outline-success', 'outline-danger', 'outline-warning', 'outline-info', 'outline-dark', 'outline-light'                 |
  | **onClick**          | function  |       | 버튼의 클릭 이벤트 처리    |
  | **size**         | 'sm', 'lg'    |       | 크거나 작은 버튼 지정. |
  | **active**         | boolean     | false | 버튼의 시각적 상태를 수동으로 설정 ':active' |
  | **disabled**         | boolean   | false | 이벤트를 처리하지 않게 방지. |
  | **href**         | string        |       | **a**태그로 렌더링 되며, href요소가 입력된다. |
  | **type**         | 'button', 'reset', 'submit', null     | 'button' | 버튼 유형 속성을 정의한다. |
  | **as**         | elementType     |       | 사용자 지정 요소를 사용할 수 있다. |

### UI Button의 다른 사용방법
* **UI.Button**을 아래와 같이 **UIButton**이라는 컴포넌트 이름으로도 사용 가능 합니다.
```js
const SampleComponent = () => {
	return (
    <UIButton variant="success">버튼</UIButton>
	);
};

export default SampleComponent;
```






## <span style="color:#005192;">UI.Confirm($ui.confirm)</span>
---
* `UI.Confirm`을 **javascript** 코드에서 사용할 때는 `$ui`객체의 `confirm`함수를 이용하여 호출 합니다.
* $ui.confirm() 함수는 사용자에게 작업을 확인하거나 취소할 수 있는 선택권을 제공하는 **ui** 전역함수 입니다.

### $ui.confirm()함수의 type 정보
```typescript
interface IConfirmOption {
	msg?: string;
	title?: string;
	confirmButton?: string;
	cancelButton?: string;
}

type confirm = (message?: string, option?: IConfirmOption) =>
	Promise<any> & { close: (vnode: any, result: boolean) => void };
```

### 사용법
* **ui.confirm('메시지').then((result) => { console.log(result); })**  
javascript 코드에서 confirm() 함수를 호출할 때 가장 기본적인 호출 방법 입니다.
```js
import { useEffect } from 'react';

const SampleComponent = () => {
  // useEffect 훅스에서 바로 confirm()함수를 호출.
	useEffect(() => {
    $ui.confirm('confirm샘플 입니다.').then((result: boolean) => {
      // true, false값에 따라 나머지 로직을 구현할 수 있습니다.
      console.log(result);
    });
	}, []);
};

export default SampleComponent;
```

* **ui.confirm('메시지', { 옵션객체 }).then((result) => { console.log(result); })**  
메시지 text와 함께 추가 설정할 옵션값을 입력할 수 있습니다.  
**옵션 종류** 는 아래와 같습니다.  
  | 옵션 명            |      타입      |  설명  |  값 예시            |
  | ------------------ | :-----------: | ----------------------------------- | :-----------: |
  | **title**          | string        | confirm창의 title을 입력  | '타이틀'  |
  | **confirmButton**  | string        | confirm창의 확인버튼의 text를 설정    | '다른 텍스트'      |
  | **cancelButton**   | string        | confirm창의 취소버튼의 text를 설정    | '다른 텍스트'      |

```js
import { useEffect } from 'react';

const SampleComponent = () => {
  useEffect(() => {
    // confirm창의 제목 설정.
    $ui.confirm('confirm샘플 입니다.', { title: 'confirm제목 입니다!', });
    // 확인, 취소버튼 텍스트 변경 옵션 적용
    $ui.confirm('confirm샘플 입니다.', {
      confirmButton: '등록',
      cancelButton: '등록취소',
    });
  }, []);
};

export default SampleComponent;
```








## <span style="color:#005192;">UI.Icon</span>
---
**UI.Icon** 컴포넌트는 페이지에 아이콘을 표시할 수 있는 컴포넌트 입니다.

### 사용법
```js
const SampleComponent = () => {
	return (
    <UI.Icon
      icon="HouseFill"
      color="blue"
      size={55}
    />
	);
};

export default SampleComponent;
```

### Props
* **UI.Icon**에서 사용 가능한 **Props**입니다.  
  | Props명           |  타입           |  설명                        |
  | ---------------- | :------------- | :-------------------------- |
  | **icon**         | string         | 아이콘의 이름                  |
  | **color**        | string         | 아이콘의 색상                  |
  | **size**         | string, number | 아이콘의 크기(너비, 높이)        |
  | **title**        | string         | 접근성 가능한 짧은 설명 텍스트 입력 |

### 아이콘의 이름
* **Props**로 **icon** props에 아이콘 이름을 입력할 수 있습니다. 이 아이콘의 이름은 아래 **url**주소에 명시 되어있는 이름을 사용합니다.  
[https://icons.getbootstrap.com/](https://icons.getbootstrap.com/)
* 실제 구현 아이콘 예제는 `git clone`한 소스의 **example**에서 확인할 수 있습니다.
:::tip :exclamation: 아이콘 이름 사용 시 주의할 점
* 아이콘 이름의 **kebab-case**를 모두 **PascalCase**로 입력하고, 이름의 시작이 숫자인 경우에는 **Icon**접두사를 사용합니다.
```
// 아이콘 이름의 예시
arrow-right → ArrowRight
1-circle → Icon1Circle
```
:::

### UI Icon의 다른 사용방법
* **UI.Icon**을 아래와 같이 **UIIcon**이라는 컴포넌트 이름으로도 사용 가능 합니다.
```js
const SampleComponent = () => {
	return (
    <UIIcon
      icon="HouseFill"
      color="blue"
      size={55}
    />
	);
};

export default SampleComponent;
```



