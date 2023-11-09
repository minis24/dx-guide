# spa.utils

* 프로젝트 내에서 사용할 수 있는 **spa.utils** 전역 객체 사용 가이드 입니다.
---

* **spa.utils 객체를 가져오는 4가지 방법**  

| ui객체 가져오는 방법                    |      설명      |
| ------------------------------------- | :------------: |
| **window.spa.utils.함수명()**                 | window객체에서 spa.utils를 가져와서 함수를 사용한다.         |
| **const spa = inject('spa');<br />spa.utils.함수명()** | 'spa'라는 이름으로 application에서 provide하고 있으므로, inject를 사용하여 spa.utils전역함수를 호출한다.                    |
| **import { getCurrentInstance } from 'vue';<br>const inst = getCurrentInstance();<br>inst.appContext.config.globalProperties.$spa.utils.함수명()**   | app.config.globalProperties에 '$spa'로 등록 되어있는 객체를 사용한다.(코드가 다소 길어짐.)                             |
| **this.$spa.utils.함수명()**                 | `<script setup>`에서는 사용할 수 없고, 일반 `<script>`안에서만 `this`객체를 이용하여 **$spa** 라는 이름으로 사용할 수 있다.         |


## <span style="color:#005192;">spa.utils.getCookie()</span>
---
**spa.utils.getCookie()** 함수는 저장 되어있는 브라우저 쿠기를 가져오는 함수이다.
### **spa.utils.getCookie() 타입:**
```typescript
type getCookie = (key: string) => 
	string;
```

### spa.utils.getCookie() 사용 예제
* **spa.utils.getCookie('키 값')**  
  기본 사용법 입니다.
```html
※ option api방식의 script태그에서 사용한 방법
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SampleComponent',
  methods: {
    method1() {
      // this를 이용하여 $spa객체를 사용한 방법
      // (composition API의 setup함수 내부에서는 this를 사용할 수 없음.)
      const value = this.$spa.utils.getCookie('key');
      // window객체를 이용하여 사용한 방법
      const value = window.spa.utils.getCookie('key');
    },
  },
});
</script>
```
```html
※ composition api방식의 script setup태그에서 사용한 방법
<script setup lang="ts">
import { getCurrentInstance, onMounted, type ComponentCustomProperties } from 'vue';
import type { ISPA } from '@types';

const inst = getCurrentInstance();
const self = inst?.appContext.config.globalProperties as ComponentCustomProperties;

onMounted(() => {
  // 위에서 getCurrentInstance()로 globalProperties를 가져온 self변수를 이용합니다.
  const value1 = self.$spa.utils.getCookie('key');
  // window객체를 이용하여 사용한 방법
  const value2 = window.spa.utils.getCookie('key');
  // inject함수에서 spa.utils를 사용한 방법.
  const spa = inject('spa') as ISPA;
  const value3 = spa?.utils.getCookie('key');
});
</script>
```


## <span style="color:#005192;">spa.utils.setCookie()</span>
---
**spa.utils.setCookie()** 함수는 브라우저 쿠기 공간에 지정한 키값으로 값을 저장하는 함수이다.   
### **spa.utils.setCookie() 타입:**
```typescript
type setCookie = (key: string, value: string, expireTimes?: string) => 
	void;
```


### spa.utils.setCookie() 사용 예제
* **spa.utils.setCookie('키 값', value)**  
  기본 사용법 입니다.
```html
※ option api방식의 script태그에서 사용한 방법
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SampleComponent',
  methods: {
    method1() {
      // this를 이용하여 $spa객체를 사용한 방법
      // (composition API의 setup함수 내부에서는 this를 사용할 수 없음.)
      this.$spa.utils.setCookie('key', 'value');
      // window객체를 이용하여 사용한 방법
      window.spa.utils.setCookie('key', 'value');
    },
  },
});
</script>
```
```html
※ composition api방식의 script setup태그에서 사용한 방법
<script setup lang="ts">
import { getCurrentInstance, onMounted, type ComponentCustomProperties } from 'vue';
import type { ISPA } from '@types';

const inst = getCurrentInstance();
const self = inst?.appContext.config.globalProperties as ComponentCustomProperties;

onMounted(() => {
  // 위에서 getCurrentInstance()로 globalProperties를 가져온 self변수를 이용합니다.
  self.$spa.utils.setCookie('key', 'value');
  // window객체를 이용하여 사용한 방법
  window.spa.utils.setCookie('key', 'value');
  // inject함수에서 spa.utils를 사용한 방법.
  const spa = inject('spa') as ISPA;
  spa?.utils.setCookie('key', 'value');
});
</script>
```



## <span style="color:#005192;">spa.utils.removeCookie()</span>
---
**spa.utils.removeCookie()** 함수는 브라우저 쿠기 공간에 저장 되어있는 특정 키값의 쿠기를 삭제하는 함수이다.   
### **spa.utils.removeCookie() 타입:**
```typescript
type removeCookie = (key: string) => 
	void;
```


### spa.utils.removeCookie() 사용 예제
* **spa.utils.removeCookie('키 값')**  
  기본 사용법 입니다.
```html
※ option api방식의 script태그에서 사용한 방법
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SampleComponent',
  methods: {
    method1() {
      // this를 이용하여 $spa객체를 사용한 방법
      // (composition API의 setup함수 내부에서는 this를 사용할 수 없음.)
      this.$spa.utils.removeCookie('key');
      // window객체를 이용하여 사용한 방법
      window.spa.utils.removeCookie('key');
    },
  },
});
</script>
```
```html
※ composition api방식의 script setup태그에서 사용한 방법
<script setup lang="ts">
import { getCurrentInstance, onMounted, type ComponentCustomProperties } from 'vue';
import type { ISPA } from '@types';

const inst = getCurrentInstance();
const self = inst?.appContext.config.globalProperties as ComponentCustomProperties;

onMounted(() => {
  // 위에서 getCurrentInstance()로 globalProperties를 가져온 self변수를 이용합니다.
  self.$spa.utils.removeCookie('key');
  // window객체를 이용하여 사용한 방법
  window.spa.utils.removeCookie('key');
  // inject함수에서 spa.utils를 사용한 방법.
  const spa = inject('spa') as ISPA;
  spa?.utils.removeCookie('key');
});
</script>
```

## <span style="color:#005192;">spa.utils.getLocalStorage()</span>
---
* **spa.utils.getLocalStorage('키 값')** 함수는 브라우저 로컬 스토리지 공간에 저장 되어있는 특정 키의 값을 가져오는 함수이다.
### **spa.utils.removeCookie() 타입:**
```typescript
type getLocalStorage = (key: string) => 
	string|null;
```

## <span style="color:#005192;">spa.utils.setLocalStorage()</span>
---
* **spa.utils.setLocalStorage('키', '데이타')** 함수는 브라우저 로컬 스토리지 공간에 지정한 키값으로 값을 저장하는 함수이다.
### **spa.utils.setLocalStorage() 타입:**
```typescript
type setLocalStorage = (key: string, value: string) => 
	string|null;
```

## <span style="color:#005192;">spa.utils.delItemLocalStorage()</span>
---
* **spa.utils.delItemLocalStorage('키 값')** 함수는 브라우저 로컬 스토리지 공간에 저장 되어있는 특정 키의 값을 삭제하는 함수이다.
### **spa.utils.delItemLocalStorage() 타입:**
```typescript
type delItemLocalStorage = (key: string) => 
	void;
```

## <span style="color:#005192;">spa.utils.delAllLocalStorage()</span>
---
* **spa.utils.delAllLocalStorage()** 함수는 브라우저 로컬 스토리지 공간에 저장 되어있는 모든 데이타를 삭제하는 함수이다.
### **spa.utils.delAllLocalStorage() 타입:**
```typescript
type delAllLocalStorage = () => 
	void;
```

