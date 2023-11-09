# ui
* **SFC(Single-File-Components)** 에서 사용할 수 있는 **ui component**에 대한 가이드 입니다.
---
* **ui 객체를 가져오는 4가지 방법**  

| ui객체 가져오는 방법                    |      설명      |
| ------------------------------------- | :------------: |
| **window.ui.함수명()**                 | window객체에서 ui를 가져와서 함수를 사용한다.         |
| **const ui = inject('ui');<br />ui.함수명()** | 'ui'라는 이름으로 application에서 provide하고 있으므로, inject를 사용하여 ui전역함수를 호출한다.                    |
| **import { getCurrentInstance } from 'vue';<br>const inst = getCurrentInstance();<br>inst.appContext.config.globalProperties.$ui.함수명()**   | app.config.globalProperties에 '$ui'로 등록 되어있는 객체를 사용한다.(코드가 다소 길어짐.)                             |
| **this.$ui.함수명()**                 | `<script setup>`에서는 사용할 수 없고, 일반 `<script>`안에서만 `this`객체를 이용하여 **$ui** 라는 이름으로 사용할 수 있다.         |




## <span style="color:#005192;">ui.alert()</span>
---
**alert()** 함수는 ui창을 띄워 사용자에게 중요한 정보를 전달하는 데 사용됩니다.
### **alert 타입:**
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

### ui.alert 사용 예제
* **ui.alert('메시지')**  
  가장 심플한 기본 사용법 입니다.
```html
※ option api방식의 script태그에서 사용한 방법
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SampleComponent',
  methods: {
    method1() {
      // this를 이용하여 $ui객체를 사용한 방법
      // (composition API의 setup함수 내부에서는 this를 사용할 수 없음.)
      this.$ui.alert('alert샘플 입니다.');
      // window객체를 이용하여 사용한 방법
      window.ui.alert('alert샘플 입니다.');
    },
  },
});
</script>
```

* **ui.alert('메시지', {옵션객체})**  
  메시지 text와 함께 추가 설정할 옵션값을 입력할 수 있습니다.  
  **옵션 종류** 는 아래와 같습니다.
  | 옵션 명            |      타입      |  설명  |  값 예시            |
  | ------------------ | :-----------: | :----: | :---------------------: |
  | **close**          | boolean       | alert을 닫을지 여부(옵션객체가 첫번째 인자일때만 적용 됨) | true, false |
  | **title**          | string        | alert창의 title을 입력  |              |
  | **autoDismiss**    | number        | alert창을 띄우고 옵션에 설정한 밀리초 후에 자동으로 닫음.<br>millisecond 숫자값을 입력. | 2000 (2초) |
  | **type**          | string        | alert창의 type을 정의.  | 'success'             |

```html
※ composition api방식의 script setup태그에서 사용한 방법
<script setup lang="ts">
import { getCurrentInstance, onMounted, type ComponentCustomProperties } from 'vue';
import type { IUi } from '@types';

const inst = getCurrentInstance();
const self = inst?.appContext.config.globalProperties as ComponentCustomProperties;

onMounted(() => {
  // 위에서 getCurrentInstance()로 globalProperties를 가져온 self변수를 이용합니다.
  self.$ui.alert('alert샘플 입니다.', { title: 'alert제목 입니다!', });
  // window객체를 이용하여 사용한 방법
  // 5초후 자동 닫힘 적용
  window.ui.alert('alert샘플 입니다.', {
    autoDismiss: 5000,
    title: '제목',
  });
  // inject함수에서 alert창을 사용한 방법.
  const ui = inject('ui') as IUi;
  ui.alert('alert샘플 입니다.', {
    title: '제목',
  });
});
</script>
```

* **ui.alert({ close: true })**  
첫번째 인자로 옵션객체의 `close`를 넘겨주면 alert창이 닫히는 예제.  
보통은 alert창에 있는 '확인'버튼을 통해 닫게 되지만, 예외로 script로직으로 닫고 싶은 경우에 사용한다.  
(주의) : `close`옵션은 alert창이 여러개 열려 있을 경우, 모든 열려있는 alert창 순서의 마지막 alert창 부터 닫히게 적용 되어있다.
```html
// close옵션 사용 예시
<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  // setTimeout을 이용하여 3초 후 alert을 닫게 적용함.
  // close옵션은 alert함수의 첫번째 인자로만 사용한다.
  setTimeout(() => {
    // window객체를 이용하여 사용한 방법
    window.ui.alert({close: true});
  }, 3000);
});
</script>
```

* **ui.alert('alert테스트 입니다.', { type: 'success' })**  
alert창을 띄울 때 **경고** 나 **주의** 같은 상태를 알리기 위한 **타입** 옵션을 제공합니다.  
**type 옵션 종류** 는 아래와 같습니다.

| type 옵션      |   타입   |  설명                                   |  비고            |
| -------------- | :------: | :-------------------------------------: | :-------------: |
| **success**    | string   | 체크 아이콘과 초록색 정보창을 띄워줍니다.  |                 |
| **info**       | string   | 'i' 아이콘과 파란색 정보창을 띄워줍니다.   |                 |
| **warning**    | string   | 느낌표 아이콘과 주황색 정보창을 띄워줍니다. |                |
| **error**      | string   | 'X' 아이콘과 빨간색 정보창을 띄워줍니다.   |                 |


```html
// type 옵션 사용 예시
<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  // window객체를 이용하여 사용한 방법
  window.ui.alert('alert 테스트 입니다.', { type: 'success', });
});
</script>
```

* **ui.alert('alert테스트 입니다.', { icon: 'mdi-home-remove' })**
type옵션 이외에 다른 아이콘을 적용하여 alert창에 표시하기 위한 옵션 입니다.  

* **ui.alert('alert테스트 입니다.', { color: '#ff0000' })**  
alert창의 배경색을 지정하는 옵션 입니다.  




## <span style="color:#005192;">ui.confirm()</span>
---
**confirm()** 함수는 사용자에게 작업을 확인하거나 취소할 수 있는 선택권을 제공하는 **ui** 전역함수 입니다.

### **confirm 타입:**
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
### **confirm 사용 예제:**
* **ui.confirm('메시지').then((result) => { console.log(result); })**  
가장 기본 사용예제 입니다.  
**confirm()** 함수는 **Promise**객체를 리턴 하므로 매개변수로 받은 result값에 '확인'또는 '취소'값인 boolean값을 받아 처리 합니다.  
```html
※ option api방식의 script태그에서 사용한 방법
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SampleComponent',
  methods: {
    method1() {
      // this를 이용하여 $ui객체를 사용한 방법
      // (composition API의 setup함수 내부에서는 this를 사용할 수 없음.)
      this.$ui.confirm('confirm샘플 입니다.').then((result: boolean) => {
        // true, false값에 따라 나머지 로직을 구현할 수 있습니다.
        console.log(result);
      });
      // window객체를 이용하여 사용한 방법
      window.ui.confirm('confirm샘플 입니다.').then((result: boolean) => {
        // true, false값에 따라 나머지 로직을 구현할 수 있습니다.
        console.log(result);
      });
    },
  },
});
</script>
```

* **ui.confirm('메시지', { 옵션객체 }).then((result) => { console.log(result); })**  
메시지 text와 함께 추가 설정할 옵션값을 입력할 수 있습니다.  
**옵션 종류** 는 아래와 같습니다.  
  | 옵션 명            |      타입      |  설명  |  값 예시            |
  | ------------------ | :-----------: | ----------------------------------- | :-----------: |
  | **title**          | string        | confirm창의 title을 입력  | '타이틀'  |
  | **confirmButton**  | string        | confirm창의 확인버튼의 text를 설정    | '다른 텍스트'      |
  | **cancelButton**   | string        | confirm창의 취소버튼의 text를 설정    | '다른 텍스트'      |

```html
※ composition api방식의 script setup태그에서 사용한 방법
<script setup lang="ts">
import { getCurrentInstance, onMounted, type ComponentCustomProperties } from 'vue';
import type { IUi } from '@types';

const inst = getCurrentInstance();
const self = inst?.appContext.config.globalProperties as ComponentCustomProperties;

onMounted(() => {
  // 위에서 getCurrentInstance()로 globalProperties를 가져온 self변수를 이용합니다.
  self.$ui.confirm('confirm샘플 입니다.', { title: 'confirm제목 입니다!', });
  // window객체를 이용하여 사용한 방법
  // 확인, 취소버튼 텍스트 변경 옵션 적용
  window.ui.confirm('confirm샘플 입니다.', {
    confirmButton: '등록',
    cancelButton: '등록취소',
  });
  // inject함수에서 confirm창을 사용한 방법.
  const ui = inject('ui') as IUi;
  ui.confirm('confirm샘플 입니다.', {
    title: '제목',
  });
});
</script>
```

