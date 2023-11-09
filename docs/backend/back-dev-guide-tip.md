## Spring MVC 패턴
**MVC 패턴이란?**  
애플리케이션의 역할을 모델(Model), 뷰(View), 컨트롤러(Controller)로 나누어 의존 관계를 DI 컨테이너에서 관리하여 유연하게 구현 및 개발할 수 있는 아키텍쳐 패턴이다.  
MVC 패턴 사용 시 유지 보수성과 애플리케이션의 확장성, 유연성이 증가하고 중복코딩이라는  
문제점 또한 사라진다는 장점이 있다.  
  
::: info :speech_balloon: DI란?  
*Dependency Injection*  
스프링이 제공하는 의존관계 주입 기능으로, 객체를 직접 생성하는 것이 아닌 외부에서 생성한 후 주입시켜주는 방식. 모듈 간 결합도가 낮아지고 유연성이 높아진다.  
:::
  
**Spring MVC 동작 순서**  
(그림 넣을 예정...)  
1. 클라이언트가 URL을 통해 서버에 요청을 하면 DispatcherServlet 클래스가 요청을 받는다.  
2. DispatcherServlet은 요청을 HandlerMapping에게 전송, HandlerMapping은 요청에 해당하는 적합한 controller를 조회한다.  
3. 호출해야 하는 Controller의 정보를 DispatcherServlet에게 리턴하고, HandlerAdapter에게 요청을 보낸다.  
4. HandlerAdapter는 controller의 메소드들 중 요청에 맞는 적합한 메소드를 매칭해 직접 실행한다.  
5. Controller의 메소드는 Service 레이어를 거쳐 비지니스 로직을 수행 후 View의 논리적인 이름만 리턴한다.  
6. HandlerAdapter는 반환받은 정보를 DispatcherServlet에게 전달한다.  
7. DispatcherServlet은 ViewResolver를 찾아 실행, ViewResolver는 응답할 View에 대한 JSP를 찾아 DispatcherServlet에게 전달한다.  
8. DispatcherServlet은 응답할 뷰의 랜더링을 지시하고 처리 후 클라이언트에게 응답한다.  


## Spring Bean
**Spring Been(스프링 빈)이란?**  
Spring IoC 컨테이너가 관리하는 자바 객체를 빈(Bean)이라고 한다.
또한 해당 Bean들을 관리하는 컨테이너를 'Bean Factory'라고 한다.

::: info :speech_balloon: IoC란?  
*Inversion of Control 제어의 역전.*  
객체에 대한 생성, 변경 등의 관리를 개발자가 아닌 프로그램을 구동하는 컨테이너에서 직접 관리하는 것.  
의존성을 주입해 객체 간의 결합도를 줄이고 유연한 코드를 작성할 수 있게 함으로써 가독성이 높아지고 유지 보수가 편해진다.  
:::
  
**IoC 컨테이너의 역할**  
(1) 객체의 생명주기와 의존성을 관리한다.  
(2) VO(DTO/POJO) 객체의 생성, 초기화, 소멸 등의 처리를 담당한다.  
(3) 개발자가 직접 객체를 생성할 수 있지만 해당 권한을 컨테이너에 맡김으로써 소스 코드 구현 시간을 단축할 수 있다.  
  
::: info :speech_balloon: DTO / VO / POJO  
*- DTO (Data Transfer Object)*  
계층 간 데이터 교환을 위해 사용하는 객체.  
(계층이란 View-Controller-Service-DAO와 같은 각 계층을 지칭함)  
데이터를 담을 private 변수와 그 변수를 조작할 수 있는 Getter, Setter 메소드로 구성되어 있다.  
  
*- VO (Value Object)*  
DTO와 비슷하나 내부 속성 값을 변경할 수 없는(immutable) Read-Only의 의미적 특성을 가진 객체.  
  
*- POJO (Plain Old Java Object)*  
특정 인터페이스나 클래스를 상속하지 않고, 순수하게 Getter, Setter로만 구성된 어디에도 종속되지 않은 자바 객체.  
POJO와 설정 정보(Configuration metadata)를 Spring IoC Container에 주입시키면 Bean으로 등록, 사용이 가능하다.

:::
  

## Spring Bean을 Spring IoC Container에 등록하는 방법  
  
**(1) 자바 어노테이션 (Java Annotation) 사용**  
사전상으로는 주석의 의미이지만, Java에서의 Annotation은 소스 코드에 추가하여 사용할 수 있는 메타 데이터의 일종이다.
컴파일러에 문법 에러를 체크하여 빌드 또는 배치 시, 코드를 자동으로 생성할 수 있도록 정보를 제공한다.  
Spring에서는 여러가지 Annotation을 사용하지만 Bean을 등록하기 위해서는 @Component Annotation을 사용한다.
@Component Annotation이 등록되어 있는 경우에는 Spring이 Annotation을 확인하고 자체적으로 Bean으로 등록한다.  
  
**(2) Bean Configuration File에 직접 등록**  
@Configuration과 @Bean Annotation을 이용하여 Bean을 등록할 수 있다.  
  
  
::: info :speech_balloon: @EnableWebMvc  
DispatcherServlet이 스프링 컨테이너를 생성하기 위해 필요한 HandlerMapping 빈과 HandlerAdapter 빈을 자동으로 추가해주는 어노테이션.  
또한 WebMvcConfigurer 인터페이스에서 사용 시, WebMvcConfigurer 타입의 빈을 이용해 MVC 설정을 추가로 생성할 수 있다.  
```java
@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {
	@Override
    public void addFormatters(FormatterRegistry formatterRegistry) {
        formatterRegistry.addConverter(new MyConverter());
    }
}
```
:::

---
  
## 자동 의존성 주입 (@Resource, @Inject, @Autowired)  
Container에 생성된 Bean 객체를 자동으로 주입받을 수 있도록 해주는 Annotation.  
Bean 객체가 생성될 때 어노테이션을 스캔해서 자동 주입해준다.  

|                 |     @Resource       |       @Inject       |     @Autowired     |
| :-------------: | :-----------------: | :-----------------: |:-----------------: |
|       의존      |         Java         |         Javax       |       Spring       |
|  사용 가능 위치  | 필드 / setter | 필드 / 생성자 / setter | 필드 / 생성자 / setter |
|  Bean 검색 우선 순위  |   이름 → 타입   |     타입 → 이름      |     타입 → 이름     |
|  Bean 강제 지정  |   @Resource(name="ID")  |  @Inject @Named("ID")  |   @Autowired @Qualifier("ID")   |
|  Bean 없을 경우  |   예외 발생    |   예외 발생   |   @Autowired(required=false) <br> 처리하면 예외 발생 방지 |

---  
::: info :speech_balloon: @Qualifier
@Autowired와 함께 쓰이며 한 프로젝트 내에 @Autowired로 의존성을 주입하고자 하는 객체가 여러 개 있을 경우,
@Qualifier("name")를 통해 원하는 객체를 지정하여 주입할 수 있다.
:::

## Model / ModelAndView  
|                 |     Model       |       ModelAndView       | 
| :-------------: | :-----------------: | :-----------------: |
| 방식 | 파라미터 방식 | 컴포넌트 방식 |
| return | model에 파라미터를 넣어주고 <br> String 형태로 return | ModelAndView 객체를 생성하여 <br> 객체형태로 return |
| setting | `addAttribute()`를 사용해 <br> 값을 넣음 | `addObject()`를 사용해 값을 넣고 `setViewName()`<br>으로 view를 지정 |
| ex) | model.addAttribute("변수이름", <br> "변수에 넣을 데이터값"); | mv.addObject("변수이름", "데이터값"); <br> mv.setViewName("뷰의 경로"); |
  
* setViewName : 보여줄 페이지 지정  
* addObject : key와 value를 담아 보낼 수 있는 method

## HashMap  
Map은 Key와 value를 쌍으로 저장하는 자료구조로, HashMap은 1차원적인 배열을 가지는 List, Set과는 달리 2차원 배열의 형태를 가지며 Key값으로 데이터에 접근한다.  
  
HashMap 컬렉션 구성  
(그림 추가 예정)  
* key와 value를 하나의 쌍으로 묶어서 저장하는 컬렉션 인터페이스  
* key는 중복될 수 없지만 value는 중복 가능  
* 동일한 key에 새로운 value를 삽입하면 기존 value는 제거되고 새로운 value 갱신  


## @PathVariable / @RequestParam  
**@PathVariable**  
* URI 경로의 일부를 파라미터로 사용할 때 이용  
* 탬플릿 변수의 값을 추출하고 그 값을 메소드 변수에 할당하는데 사용  
```java
@RequestMapping(value="/chkid/{user_id}", method=RequestMethod.POST)
public String prglist(@PathVariable(value="user_id",required=true)String user_id){}
```  
* URL에 특수문자나 구분기호 등을 사용하면 인식하지 못할 수 있다.  
::: tip :bulb: 해결방법
1. {path:.+} 처럼 작성할 시 +와 &을 포함하여 파라미터를 매핑할 수 있다.  
2. 특수문자에 /가 포함된 경우 path값을 /** 로 설정하여 모든 URL path를 받아 split으로 잘라서 사용.
:::
  
**@RequestParam**  
* GET 방식으로 넘어온 URI에 쿼리스트링을 받을 때 사용  
* 단일 파라미터를 변환  
```java
@RequestMapping(value="/mnureg_action")
public String mnureg_action(@RequestParam(value="prefix_menu_id", required=true)
							String prefix_menu_id, ...){}
					// url이 전달될 때 name 파라미터(name에 담긴 value)를 받아옴
```
::: warning :warning: 주의
파라미터 값이 넘어오지 않을 경우 Bad Request 400 Error가 발생한다.  
이를 방지하기 위해서는 DefaultValue를 이용하여 기본 값("required=false")을 설정해줘야 한다.   
옵션 속성에 defaultValue를 사용하면 파라미터 값이 없을 때 적용될 디폴트 값을 설정할 수 있다.
```java
@RequestParam(value="exposure_yn", required=false, defaultValue="") String exposure_yn
```
:::

## @RequestBody / @ResponseBody  
**@RequestBody**  
HTTP 요청의 body 내용을 Java 객체로 매핑해주는 역할


**@ResponseBody**  
Java 객체를 body 내용으로 매핑해주는 역할

## Persistence Framework  
데이터베이스와 연동되는 시스템을 빠르게 개발하고 안정적인 구동을 보장해주는 프레임워크  
  
1. SQL Mapper  
	: SQL 문장으로 직접 데이터베이스 데이터를 다룸 (MyBatis)  

2. ORM (Object Relational Mapping)  
	: 객체를 통해 간접적으로 데이터베이스를 다룸 (Hibernate, JPA)  


## SqlSessionTemplate  

**SqlSession이란?**  
MyBatis의 쿼리문을 실행시켜주는 역할을 하는 클래스  
세션을 한번 생성하면 매핑구문을 실행하거나 커밋 또는 롤백을 하기 위해 세션을 사용할 수 있고,  
더 이상 필요하지 않은 상태가 되면 세션을 닫는다.  

**SqlSessionTemplate**  
MyBatis Spring 연동모듈의 핵심으로, Sqlsession을 구현하고 코드에서 SqlSession을 대체하는 역할을 한다.  

### MyBatis 라이브러리 추가  
스프링부트 기반에서는 mybatis-spring-boot-starter를 사용  
  
pom.xml
```html
<dependency>
		<groupId>org.mybatis.spring.boot</groupId>
		<artifactId>mybatis-spring-boot-starter</artifactId>
		<version>2.2.2</version>
</dependency>
```
MyBatis에서는 쿼리 매핑 구문을 실행하기 위해 sqlSession 객체를 사용하며,  
sqlSession 객체를 생성하기 위해 SqlSessionFactory를 사용한다.  
  
스프링과 같이 사용할 때는 SqlSessionTemplate를 사용하는데 스프링 사용 시 sqlSession을  
대체할 수 있고 예외처리를 스프링에 DataAcessException으로 처리해주기 때문이다.  
  

### MyBatis SqlSessionTemplate 설정  
MybatisConfig.java  
```java
@Configuration
@ComponentScan(basePackages = {"com.qry.mbpcen"})
public class MybatisConfig {

	@Bean
	public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
		return new SqlSessionTemplate(sqlSessionFactory);
	}

	@Bean
  public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception{
      SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
      sqlSessionFactoryBean.setDataSource(dataSource);
      sqlSessionFactoryBean.setConfigLocation((new PathMatchingResourcePatternResolver().getResource("classpath:sql/mybatis-config.xml")));
      sqlSessionFactoryBean.setMapperLocations(
          new PathMatchingResourcePatternResolver().getResources("classpath:sql/mapper/*.xml"));
	  return sqlSessionFactoryBean.getObject();
  }
}
```
* sqlSessionTemplate 생성자에 Mybatis 매퍼 설정 정보가 있는 sqlSessionFactory 빈을  
	전달해서 빈을 생성  
  
### Mapper XML 작성  
resources/sql/mapper/userMapper.xml  
```html
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
      PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
      "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="sample.mapper.userMapper">
	<select id="selectUserInfoAll" resultType="hashMap">
    <![CDATA[
		SELECT id, username, password
		FROM TBL_USER
	]]>
  </select>
</mapper>
```

### Repository 생성  
SqlSessionTemplate를 사용해 sqlMap을 사용하는 Repository 클래스 생성  
mapper namespace는 package + mybatis mapper명으로 하고 sqlSessionTemplate에 Autowired를 사용해 의존성을 주입한다.  
  

## Thymeleaf  
**타임리프(thymeleaf)란?**  
Spring Boot에서 공식적으로 지원하고 권장하는 서버 사이드 자바 템플릿 엔진의 일종으로  
웹뿐만 아니라 웹이 아닌 환경 모두에서 작동할 수 있다  
HTML 태그를 기반으로 하여 동적인 View를 제공하며, th:속성을 이용하여 데이터를 바인딩한다.  

::: info :speech_balloon: Server Side Template Engine
서버에서 DB나 API에서 가져온 데이터를 미리 정의된 Template에 넣어 html을 그린 뒤 클라이언트에게 전달한다. 
HTML에서 고정적으로 사용되는 부분을 template로 만들고 동적으로 생성되는 부분만 템플릿에 끼워넣는 방식이다.  
  
*ex) JSP, Thymeleaf, Velocity, Freemaker 등*
:::

### Spring Boot Thymeleaf 환경 설정  
**pom.xml dependency 추가**  
```html
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```
```html
<!-- thymeleaf layout -->
<!-- thymeleaf를 이용해서 layout을 만들기 위해 추가적으로 사용되는 라이브러리 -->
<dependency>
	<groupId>nz.net.ultraq.thymeleaf</groupId>
	<artifactId>thymeleaf-layout-dialect</artifactId>
</dependency>
```
**application-dev.properties**  

```sh
#---------------------------------------------------------------------------
# thymeleaf View 설정 
#---------------------------------------------------------------------------
#thymeleaf를 사용하다가 수정하는 경우 재시작을 해야한다. 
#하지만 이를 무시하고 브라우저에서 새로고침으로 변경사항을 취하도록 설정한다. 
#true를 운영 도중에 사용하는 것이 좋다.
spring.thymeleaf.cache=false
spring.thymeleaf.prefix=classpath:templates/
spring.thymeleaf.suffix=.html
#view-names는 jsp와 같이 사용할 경우 구분짓기 위하여 사용 
#thymeleaf로 시작하는 경우는 thymeleaf로 처리  
spring.thymeleaf.view-names=thymeleaf/*
```

* **.cache=false**  
	캐시를 남기지 않기 때문에 서버를 재시작하지 않고 스프링부트에서 수정하기만 해도  
	바로 html을 띄워서 사용할 수 있다. 

* **.prefix= .suffix=**  
	prefix + 경로 + suffix가 실제 경로가 된다.  
	→ `classpath: templates/ + controller return 이름 + .html`

### Thymeleaf Layout setting  
반복되는 HTML 코드를 줄이기 위해 고정적으로 들어가는 header와 footer는 layout을  
설정해두고 사용한다.  

**폴더 구조**  
![layout folder](/assets/image/back-dev-guide/admin-app-guide9.png)
  
**fragments**  
  
**/default/footer.html**  
```html
<html xmlns:th="http://www.thymeleaf.org">
<!-- footerFragment 선언 -->
<th:block th:fragment="footerFragment">
...
</th:block>
</html>
```
* `xmlns:th="http://www.thymeleaf.org"`  
	: Thymeleaf를 사용한다는 선언으로 html 태그에 추가한다.  
  
* `th:fragment="fragment명"`  
	: th:fragment는 해당 부분을 fragement로 선언한다는 의미이다. layout 템플릿을 만들어  
	재정의할 컨텐츠 요소를 포함한다.  

**layout**  
  
**/default.html**  
```html
<!DOCTYPE html>
<html lagn="ko" xmlns:th="http://www.thymeleaf.org" 
	xmlns:layout="http://www.ultraq.net.nz/thymeleaf/layout">

  <!-- 공통 헤더-->
  <th:block th:replace="fragments/default/head :: headFragment"></th:block>

  <body id="page-top">
    <div id="wrapper">
      <!-- 사이드바-->
      <th:block th:replace="fragments/default/sidebar :: sidebarFragment"></th:block>

      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
         	<!-- 상단바-->
         	<th:block th:replace="fragments/default/topbar :: topbarFragment"></th:block>
         	<!-- 본문-->
         	<th:block layout:fragment="content"></th:block>
        </div>
        <!-- 공통 하단-->
        <th:block th:replace="fragments/default/footer :: footerFragment"></th:block>
      </div>
    </div>

      <!-- 공통 스크립트-->
      <th:block th:replace="fragments/default/script :: scriptFragment"></th:block>
    </body>
</html>
```
* `xmlns:layout="http://"http://www.ultraq.net.nz/thymeleaf/layout"` 를 추가한다.  
* `<th:block layout:fragment="content"></th:block>` : content 영역 설정  
* `<th:block th:replace="fragments/default/head></th:block>`  
	`<th:block th:replace="fragments/default/footer></th:block>` 등  
	: `th:replace="fragment위치/fragment명"`을 호출하여 fragment를 불러올 수 있다.  

  

**page**  
  
**templates/thymeleaf/ .html**
```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org"
	xmlns:layout="http://www.ultraq.net.nz/thymeleaf/layout"
	layout:decorate="layout/default">

<th:block layout:fragment="content">
	...
</th:block>
</html>
```
  
* 각 content html에 `layout:decorate="layout/default"`를 추가해 화면구성을 상속받는다.  
* `<th:block layout:fragment="content">`를 추가해 page content를 적용해준다.  
  

### 표준 표현식 구문  
  
**간단한 표현**  
* 변수(variable) : `${...}`  
* 선택 변수(selection variable) : `*{...}`  
* 메세지(message) : `#{...}`  
* 링크 URL(link url) : `@{...}`  
* 단편(fragment) : `~{...}`  
* 인라인 : `[[...]] [(...)]`

  
**텍스트 작업**  
* 문자열 연결 : `+`  
* 문장 결합 : `|id : ${usr.id}, name : ${usr.name}|`  

**조건부 연산자**  
* if-then : `(if) ? (then)`  
* if-then-else : `(if) ? (then) : (else)`  
* Default : `(value) ? : (defaultvalue)`  

**th:text / th:utext**  
* **th:text** : model에 HTML 태그가 담겨있어도 문자열로 출력  
* **th:utext** : model에 HTML 태그가 담겨있으면 HTML 태그로 출력  

  

### thymeleaf 문법  
  
### 기본 기능  
* **th:text="${}"**  
	JSP의 EL 표현식인 ${}와 마찬가지로 ${} 표현식을 사용해 컨트롤러에서 전달받은 데이터에 접근할 수 있다.  
```html
<td th:text="${msg.DESCRIPTION}"></td>
```
  
* **th:href="@{}"**  
	`<a>`태그의 href 속성과 동일하다.	괄호 안에 클릭 시 이동하고자 하는 url을 입력한다.  
```html
<link th:href="@{/assets/css/cmm/mbpcen.css}" rel="stylesheet">
```
* **th:with="${}"**  
	변수형태의 값을 재정의하는 속성이다. 즉, th:with를 이용해 새로운 변수값을 생성할 수 있다.  
```html
<div th:with="userId=${number}" th:text="${userId}"></div>
```
* **th:value="${}"**  
	input의 value에 값을 삽입할 때 사용한다. 값을 여러 개 넣을 땐 + 기호를 사용한다.  
```html
<input type="radio" class="form-check-input" id="msg_req" name="comm_msg_type" 
	th:value="request" th:onclick="btnMsgType('request')">
```
### 레이아웃  
* **th:block**  
	타임리프 표현을 어느 곳에서든 사용할 수 있도록 하는 구문이다.  
	동적인 처리가 필요할 때 사용되며 주로 layout기능이나 switch에 많이 사용된다.  

* **th:fragment=""**  
	공통 영역을 정의해 코드를 정리해준다. 특히 header와 footer에 삽입하여 조각화한다.  
```html
<th:block th:fragment="scriptFragment"></th:block>
```
* **th:replace="~{파일경로 :: 조각이름}"**  
	JSP의 `<include>` 태그와 유사한 속성으로, fragment로 조각화한 공통 영역을  
	HTML에 삽입하는 역할을 한다.  
	`::`을 기준으로 앞에는 **조각이 있는 경로**를, 뒤에는 **조각의 이름**을 넣어준다.  
	`insert`와 다르게 완전하게 대체한다.  

```html
<th:block th:replace="fragments/default/script :: scriptFragment"></th:block>
```

* **th:insert="~{파일경로 :: 조각이름}"**  
	insert는 태그 내로 조각을 삽입하는 방법이다.  
	`replace`는 완전하게 대체하기 때문에 replace 태그가 입력된 `<div>`가 사라지고  
	fragment로 조각화한 코드가 완전히 대체된다.  
	하지만 `insert`는 insert가 입력된 `<div>`안에 fragment를 삽입하는 개념이기 때문에  
	`<div>` 안에 조각화한 코드가 삽입된다. 형식은 replace와 동일하다.  
```html
<th:block th:insert="fragments/default/script :: scriptFragment"></th:block>
```
### Form   

* **th:action="@{}"**  
	`<form>` 태그 사용 시, 해당 경로로 요청을 보낼 때 사용한다.  
```html
<form th:action="@{/join}" th:object="${joinForm}" method="post">
	<input type="text" id="userId" th:field="*{userId}">
	<input type="password" id="userPw" th:field="*{userPw}">
</form>
```
  
* **th:object="${}"**  
	`<form>` 태그에서 데이터를 보내기 위해 submit을 할 때 데이터가 `th:object` 속성을 통해  
	object에 지정한 객체에 값을 담아 넘긴다. 	이 때 값을 `th:field` 속성과 함께 사용하여 넘긴다.  
```html
<tr th:object="${bbs_mstr}" th:each="bbs_mstr, iterState : ${BBS_MSTR_LIST}">
```
  
* **th:field="*{}"**  
	`th:object` 속성과 함께 `th:field`를 이용해서 HTML 태그에 멤버 변수를 매핑할 수 있다.  
	`th:field`를 이용한 사용자 입력 필드는 id, name, value 속성 값이 자동으로 매핑된다.  
	`th:object`와 `th:field`는 Controller에서 특정 클래스의 객체를 전달받은 경우에만 사용할 수 있다.  

  

### 조건문과 반복문  

* **th:if="${}"**  
	JAVA의 조건문에 해당하는 속성으로 if를 뜻한다.  
```html
<li class="nav-item" th:if="${menu.MENU_LEVEL}==1">
	...
```
  
* **th:unless="${}"**  
	JAVA의 조건문에 해당하는 속성으로 else를 뜻한다.  
	`th:unless`는 일반적인 언어의 else문과는 달리 th:if에 들어가는 조건과 동일한 조건을  
	지정해야 한다.  
```html
<li class="nav-item" th:unless="${menu.MENU_LEVEL}==2">
```
  
* **th:each="변수 : ${list}"**  
	JSP의 JSTL에서 `<c:foreach>` 그리고 JAVA의 반복문 중 `for문`을 뜻한다.  
	`${list}`로 값을 받아온 것을 변수로 하나씩 가져온다는 뜻으로, 변수는 이름을 마음대로  
	지정할 수 있다.  
```html
<tr th:each="msg, iterState : ${LIST}">
```
::: tip :speech_balloon: iterState
상태변수는 th:each의 attribute에 상태변수 자신의 이름이 콤마로 구분되어 정의되어 있다.  
상태변수가 설정되면, 이 변수는 th:each attribute가 태그 내에 정의되어 있는 코드 블록 내부에서만  
사용할 수 있다.  
:::
  
* **th:switch, th:case**  
	JAVA의 `switch-case`문과 동일하다.  
```html
<div th:switch="${codeCategory.USE_AT}">
	<td th:case="'Y'">배포완료</td>
	<td th:case="'N'">배포대기</td>
	<td th:case="*">기타</td>
</div>
```

## Ajax

### Ajax란?
* JavaScript를 사용한 비동기 서버 통신 방식으로, 클라이언트와 서버간 XML, JSON, TEXT 등 데이터를 주고 받는 기술이다.  
* Ajax를 사용하면 웹페이지 전체를 새로고침하지 않아도 뷰를 갱신할 수 있다.  

### 비동기(Asynchronous)란?
* 작업을 요청하고 작업결과가 오기 전까지 다른 작업을 처리하는 것으로 자원을 효율적으로 활용할 수 있다.  
* 서버에 요청(Request)해놓고 응답이 오기 전까지 다른 작업을 처리하고 응답(Response)이  
	오면 정해놓은 함수(콜백함수)를 호출해 실행한다.  

### Ajax를 사용하는 이유
* WEB화면에서 단순이 데이터를 조회하고 싶을 때 페이지를 전체 새로고침하지 않기 위해  
	사용한다.  
* 동작이 일어났을 때 일부만 업데이트해서 사용할 수 있기 때문에, 자원과 시간을 아낄 수 있다.  
	(JSON이나 XML 형태로 필요한 데이터만 받아서 갱신한다.)  
  

## JSON

### JSON이란?
JavaScript Object Notation의 축약어로 데이터를 저장하거나 전송할 때 많이 사용되는 경량의 DATA 교환 형식이다.  

### JSON의 특징
* 일반적으로 서버와 클라이언트 간의 교류에서 많이 사용된다.  
* JSON 문서 형식은 자바스크립트 객체의 형식을 기반으로 만들어졌다.  
* 자바스크립트의 문법과 유사하지만 텍스트 형식일 뿐이다.  
* 특정 언어에 종속되지 않으며, 대부분의 프로그래밍 언어에서 JSON 포맷의 데이터를 핸들링할 수 있는 라이브러리를 제공한다.  

### JSON 문법과 형식
```js
{
	"id": "admin",
	"password": "1234",
	"details": [
		{
			"name": "kim",
			"age": "20"
		},
		{
			"name": "lee",
			"age": "18"
		}
	]
}
```
* JSON은 자바스크립트 객체와 마찬가지로 key와 value가 존재하며 key값이나 문자열은 항상 쌍따옴표를 이용하여 표기한다.  
* 객체, 배열 등의 표기를 사용할 수 있다.  
* name - value 형식의 쌍: { `String key` : `String value` }
* 배열(Array) 표현: [`value1`, `value2`, ... ]

### JSON 텍스트를 JavaScript Object로 변환하기
* JSON.parse (JSON 형식의 문자열)  
	: JSON 형식의 텍스트를 자바스크립트 객체로 변환한다.  

* JSON.stringify (JSON 형식의 문자열로 변환할 값)  
	: 자바스크립트 객체를 JSON 텍스트로 변환한다.  

### 다양한 형태의 JSON 파일 파싱하기

**google-json-simple을 이용한 JsonObject 만들기**
* google-json-simple을 사용하기 위해 `pom.xml`에 dependency를 추가한다.  
```xml
<dependency>
		<groupId>com.googlecode.json-simple</groupId>
		<artifactId>json-simple</artifactId>
		<version>1.1.1</version>
</dependency>
```

**json-simple 사용법**
|   JSON value  |        java class        |      설명       |
| :-------------: | :------------------------: | :-----------------: |
|     String    |     java.lang.String     |       JSON의 문자열은 String 타입으로 mapping           |
|     number    |     java.lang.Number     |       JSON의 숫자는 Number(Integer, Float 등)의 wrapper <br> 타입으로 mapping        |
|     null      |          null            |       null은 자바에서의 null값              |
|     boolean   |         Boolean          |       true, false를 표현하는 Boolean wrapper class           |
|     객체       |      java.util.Map       |      JSON에서의 객체인 `{}` 표기법은 key-value 형식인 Map으로 <br> 표현 (실제로는 Map을 구현한 **JSONObject**로 mapping 됨)               |
|     배열       |      java.util.List      |      JSON에서의 배열인 `[]` 표기법은 List로 표현 <br> (실제로는 List를 구현한 **JSONArray**로 mapping 됨)                 |



**JSONParser**  
JSON 데이터가 이미 `"[{a,b,c},{d,e,f}]"`와 같이 String으로 가지고 있거나, .json 파일에서 Reader를 통해 텍스트를 읽어 들이는 방법  
```java
public String fieldEdit_group(@RequestBody(required=true) String request_body) 
	throws Exception {
	...
	JSONParser parser = new JSONParser();
	...
}
```

**JSONObject (JSON 객체 단건일 때)**  
`{"name":"kim","job":"student","age":"15"}`와 같이 단건의 json 객체라면 바로 JSONObject에 담는다.  
```java
	JSONObject requestBody = (JSONObject) parser.parse(request_body);
```

**JSONArray (다건 JSON 객체일 때)**  
`{"name":"kim","job":"student","age":"15"}`, `{"name":"lee","job":"teacher","age":"30"}`와 같이 다건의 json 객체라면
JSONArray에 담았다가 JSONObject로 담는다.
```java
JSONArray jsonArr = (JSONArray) parser.parse(request_body);

// jsonArr에서 하나씩 JSONObject로 cast해서 사용
if(jsonArr.size() > 0) {
	for(int i = 0; i < jsonArr.size(); i++) {
		JSONObject responseBody = (JSONObject) jsonArray.get(i);
	}
}
```

**다건 JSON 객체가 JSON 내부에 있을 때**  
`{"month":"june", "grade":[{"name":"kim", "math":"A", "social":"B"}, {"name":"lee", "math":"C", "social":"C"}]}`와 같이
json 안에 있는 array라면 JSONObject와 JSONArray를  
반복하여 사용한다.
```java
	//우선 JSONObject에 담는다.
	JSONObject requestBody = (JSONObject) parser.parse(request_body);
	//jsonObject에서 jsonArray를 get
	JSONArray jsonArr = (JSONArray) requestBody.get("grade");
	// jsonArr에서 하나씩 JSONObject로 cast해서 사용
	if(jsonArr.size() > 0) {
		for(int i = 0; i < jsonArr.size(); i++) {
			JSONObject obj = (JSONObject) jsonArray.get(i);
		}
	}
```

**toJSONString()**  
만들어둔 JSON 객체를 문자열 데이터로 변경할 때는 **toJSONString()** method를 사용한다.  
```java
return json_Response.toJSONString();
```
