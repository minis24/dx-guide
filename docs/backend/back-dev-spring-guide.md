# 스프링부트 개발 레이어 설명
## ADMIN 로그인 방법
* 서버가 정상적으로 실행되었다면 포트번호를 확인한 뒤 주소창에 입력해 접속한다.

![포트 확인](/assets/image/back-dev-guide/admin-app-guide4.png)

```
localhost:8091
```
* 사용자ID와 Password를 확인한 뒤 `Sign in` 버튼을 클릭해 로그인한다.

![메인 화면](/assets/image/back-dev-guide/admin-app-guide1.png)

## Controller (프리젠테이션) 레이어
* Controller는 사용자의 요청을 처리한 후 지정된 View에 Model 객체를 넘겨준다.  
→ 화면(View)과 비즈니스 로직(Model)을 연결시키는 다리 역할.  
(1) 사용자의 요청을 URI로 컨트롤러가 받게 된다.  
(2) 요청에 대한 응답(View)을 반환한다.

::: info :speech_balloon: URI란?
*URI (Uniform Resource Identifier)* 자원의 식별자.  
위치로 찾아가는 것이 아닌 아이디로 매핑시키는 것으로, 사용자에게 파일 이름, 위치 노출이 되지 않는다.
:::
  
### Controller 레이어 생성
* 패키지에 Controller class를 생성한다.
![controller 생성](/assets/image/back-dev-guide/admin-app-guide2.png)
  
### 요청의 수신 및 응답
* class 선언부에 @Controller 어노테이션을 붙여준다.
```java
@Controller		// 컨트롤러 지정
public class MsgController {}
```
  
### 요청 파라미터 정리
* RequestMapping을 이용해 view의 요청 경로를 지정해준다.
```java
@Controller
@RequestMapping("/views/msg")		// 요청 경로 지정(class 및 method)
public class MsgController {}
```
  
### 서비스 호출
* 요청 처리 로직을 구현한 뒤, view에 맞춰 리턴해준다.  
```java
@Controller
@RequestMapping("/views/msg")
public class MsgController {

	@RequestMapping(value="/fieldgroup")
	public ModelAndView fieldgroup(){
		ModelAndView mv = new ModelAndView();
		...				// 파라미터 설정
		mv.setViewName("thymeleaf/msg/msg_fieldgroup");
		// properties 설정을 이용한 thymeleaf viewName set
		return mv;		// ModelAndView return
	}
}
```  
  
::: info :speech_balloon: @Controller와 @RestController
Spring에서 컨트롤러를 지정해주기 위한 어노테이션.  

---
**@Controller**  
Model 객체를 만들어 데이터를 담고 View를 반환한다.  
데이터를 반환해야 할 시 @ResponseBody 어노테이션을 사용해 JSON 형태로 데이터를 반환할 수 있다.

**Controller의 흐름**  
(1) Client는 URI 형식으로 웹서비스에 요청을 보낸다.  
(2) Mapping되는 Handler와 그 Type을 찾는 DispatcherServlet이 요청을 인터셉트한다.  
(3) @ResponseBody를 사용하여 Client에게 JSON 형태로 데이터를 반환한다.  

---
**@RestController**  
@Controller와 @ResponseBody 동작을 하나로 결합한 RESTful한 컨트롤러.  
객체만을 반환하며 객체 데이터는 JSON 또는 XML 형식으로 HTTP 응답에 담아 전송한다.  

**RestController의 흐름**  
(1) Client는 URI 형식으로 웹서비스에 요청을 보낸다.  
(2) Mapping되는 Handler와 그 Type을 찾는 DispatcherServlet이 요청을 인터셉트한다.  
(3) RestController는 해당 요청을 처리하고 데이터를 반환한다.  
:::
  
::: info :speech_balloon: @RequestMapping  
요청에 대해 어떤 Controller와 method가 처리할지 mapping하기 위한 어노테이션.  
class나 method 선언부에 @RequestMapping과 함께 URL을 명시하여 사용한다.  
  
:white_medium_square: class 선언부 : 현재 class의 모든 method들의 기본적인 URL 경로.  
:white_medium_square: method 선언부 : class 선언부에 작성된 주소 뒤에 추가적으로 붙는 경로로 설정.  
  
viewName 생략 시 @RequestMapping의 path로 설정한 URL이 default viewName.  
  
```java
@Controller
@RequestMapping("/views/msg")
public class MsgController {

			@RequestMapping(value="/fieldgroup")
			public ModelAndView fieldgroup(){
			return mv;
			}
}
```

  
:::
---
## Service 레이어  
* Controller에게 요청을 받은 뒤 Repository를 통해 자원을 얻어와 비즈니스 로직을 수행하여 Controller에게 전달한다.  
* Controller에서도 비즈니스 로직을 처리할 수는 있으나 서비스 레이어로 분리하면서 컨트롤러의 부담을 줄이고 코드를 편하게 관리할 수 있다.

### Service 레이어 생성
  
* 패키지 내에 Service class를 생성한다.  
![service 생성](/assets/image/back-dev-guide/admin-app-guide3.png)  
  
* class 선언부에 @Service 어노테이션을 붙여준다.
```java
@Service(ResourceName.SERVICE_MSG)	// 서비스 지정 (config - ResourceName.java)
public class MsgService {}	
```
  
* Controller class에 @Resource 어노테이션을 이용해 생성한 service component를 지정한다.
```java
@EnableWebMvc
@Controller
@RequestMapping("/views/msg")
public class MsgController {
	/* Msg Service */
	@Resource(name = ResourceName.SERVICE_MSG)	// 지정 Service component 명칭 일치
	protected MsgService service;
}
```
  
* 요청을 처리할 지정 service를 호출한다.
```java
@Controller
@RequestMapping("/views/msg")
public class MsgController {

	@RequestMapping(value="/fieldgroup")
	public ModelAndView fieldgroup(){
		...
		List<Map<String, Object>> selectFieldList 
		= service.selectFieldGroupList(selectParamData);	// service 호출
		...
		return mv;
	}
}
```  
  
* Service에 method가 존재하지 않을 경우 마우스오버 메뉴에서 생성할 수 있다.  
  
![service method 생성](/assets/image/back-dev-guide/admin-app-guide5.png)  
  
### 비즈니스 로직 처리 
* 초기 return 값은 null로, 처리에 적절한 return 값을 입력해준다.  
* Repository를 통해 알맞은 정보를 가공하여 Controller에게 넘기기까지의 과정을  
	'비즈니스 로직을 수행한다' 라고 한다.  
```java
public List<Map<String, Object>> selectFieldGroupList(Map<String, Object> selectParamData) {
	return repository.selectFieldGroupList(selectParamData);
}
```

  
---
## Persistence 레이어  
**Persistence란?**  
프로그램이 종료되더라도 사라지지 않는 데이터의 특성. (영속성)  
어플리케이션을 종료하고 다시 실행하더라도 이전에 저장한 데이터를 다시 불러올 수 있는 기술.  
  
::: info :speech_balloon: Persistence layer
데이터에 영속성을 부여해주는 계층으로, 보통 DB에 접근하는 역할.  
  
|      DAO (Data Access Object)      |    Repository       |
| :--------------------------------: | :-----------------: |
|  DB에 접근해 서비스와 연결하는 객체  | DB에 접근하기 위한 객체 |
|          Persistence layer         |     Domain layer    |
|            SQL 수준의 매핑          |   객체 수준의 매핑   |
| DB의 CRUD 쿼리와 1:1 매칭되는 세밀한 단위의 operation을 제공 | 메모리에 로드된 객체 컬렉션에 대한 집합처리를 위한 인터페이스 제공 |
|  | 하나의 Repository 내부에서 다수의 DAO를 호출하는 방식으로 Repository 구현이 가능 |  
:::
  
### Persistence 레이어
* 데이터에 영속성을 부여해주는 계층  
* 보통 DB에 접근하는 역할로 CRUD를 수행한다.  

  
### Persistence 레이어 (Repository) 생성
* 패키지 내에 Repository class를 생성한다.  
![repository 생성](/assets/image/back-dev-guide/admin-app-guide6.png)  

* class 선언부에 @Repository 어노테이션을 붙여준다.  
```java
@Repository(ResourceName.REPOSITORY_MSG)
// 리포지토리 지정 (config - ResourceName.java)
public class MsgRepository {}	
```

* Service class에 @Resource 어노테이션을 이용해 생성한 Repository component를 지정한다.  
```java
@Service(ResourceName.SERVICE_MSG)
public class MsgService {
	/* Msg Repository */
	@Resource(name=ResourceName.REPOSITORY_MSG) 
	// 지정 Repository component 명칭 일치
	MsgRepository msgRepository;
}
```

* 실행할 Repository를 호출한다.  
```java
@Service(ResourceName.SERVICE_MSG)
public class MsgService {
	@Resource(name=ResourceName.REPOSITORY_MSG)
	MsgRepository msgRepository;

	public List<Map<String, Object>> selectFieldGroupList(Map<String, Object> selectParamData) {
		return msgRepository.selectFieldGroupList(selectParamData);
	}
}
```

  

* Repository에 method가 존재하지 않을 경우 마우스오버 메뉴에서 생성할 수 있다.  
![repository method 생성](/assets/image/back-dev-guide/admin-app-guide7.png)  

**DBMS 처리**
* 초기 return 값은 null로, 처리에 적절한 return 값을 입력해준다.  
* SqlSessionTemplate를 사용하여 sqlMap을 사용하는 Repository 클래스로 생성하고  
	Autowired를 사용해 의존성을 주입한다.  
* MAPPER_NAME_SPACE의 명칭은 매핑할 xml 파일의 namespace와 맞춰 작성하여  
	매핑시킨다.  
```java
@Repository(ResourceName.REPOSITORY_MSG)
public class MsgRepository {
	private static final String MAPPER_NAME_SPACE = "msg.";

	@Autowired
	private SqlSessionTemplate sqlSessionTemplate;

	public List selectFieldList(Map<String, Object> paramData){
		Map<String, Object> params = new HashMap();
		return sqlSessionTemplate.selectList(MAPPER_NAME_SPACE + "selectFieldList", params);
	}
}
```
/resources/sql/mapper/SQLMAP_MSG.xml
```html
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="msg">
	...
	<!-- id, parameterType 맞춰주기 -->
	<select id="selectFieldList" parameterType="hashMap" resultMap="resultMap_selectFieldList">
		...
	</select>
</mapper>
```