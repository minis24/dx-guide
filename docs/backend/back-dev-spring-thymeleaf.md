# 타임리프 화면 개발 프로세스  
  

Thymeleaf 사용을 위한 환경설정은 [참고](../backend/back-dev-guide-tip.md)의 [Thymeleaf](../backend/back-dev-guide-tip.md#thymeleaf) 항목을 참조한다. 

## Controller 레이어  
* Controller class를 생성하고 class 선언부에 @Controller 어노테이션을 붙여준다.  
```java
@Controller
public class MsgController {}
```
  
* @RequestMapping을 이용해 URL을 설정한 뒤 요청에 따라 수행할 method를 추가한다.  
```java
@Controller
@RequestMapping("/views/msg")
public class MsgController {

	@RequestMapping(value="/fieldgroup")
	public ModelAndView fieldgroup() {}
}
```
* 요청 처리 로직을 작성하고 응답할 return 값을 적절하게 반환한다.  
```java
@Controller
@RequestMapping("/views/msg")
public class MsgController {

	@RequestMapping(value="/fieldgroup")
	public ModelAndView fieldgroup() {

		ModelAndView mv = new ModelAndView();
		...
		mv.addObject("LIST", selecteFieldList);
		mv.setViewName("thymeleaf/msg/msg_fieldgroup");	// view page 경로 설정

		return mv;
	}
}
```
* Service 호출을 위해 Controller에 @Resource를 이용해 Service bean을 추가한다.  
```java
@Resource(name = ResourceName.SERVICE_MSG)
protected MsgService service;
```
* Service 호출 method를 작성한 뒤 service class를 생성하고 method를 추가한다.  
```java
@Controller
@RequestMapping("/views/msg")
public class MsgController {

	@RequestMapping(value="/fieldgroup")
	public ModelAndView fieldgroup() {

		ModelAndView mv = new ModelAndView();

		Map<String, Object> selectParamData = new HashMap<String, Object>();
		List<Map<String, Object>> selectFieldList 
				= service.selectFieldGroupList(selectParamData);	
				// service method
		...
		mv.addObject("LIST", selecteFieldList);
		mv.setViewName("thymeleaf/msg/msg_fieldgroup");

		return mv;
	}
}
```

## Service 레이어  
* 생성한 Service class의 선언부에 @Service 어노테이션을 붙이고  
	설정해둔 ResourceName Component를 작성해 Service bean을 설정해준다.  
```java
@Service(ResourceName.SERVICE_MSG)
public class MsgService {}
```
* Repository 호출을 위해 Service에 @Resource를 이용해 Repository bean을 추가한다.  
```java
@Resource(name = ResourceName.REPOSITORY_MSG)
MsgRepository msgRepository;
```
* 생성해둔 Service method의 return 값으로 호출할 repository와 method를 작성한 뒤,  
	repository class와 method를 생성한다.  
```java
public List<Map<String, Object>> selectFieldGroupList(Map<String, Object> selectParamData) {
	return msgRepository.selectFieldGroupList(selectParamData);
}
```

## Persistence 레이어 (Repository)  
* 생성한 repository class의 선언부에 @Repository 어노테이션을 붙이고  
	설정해둔 ResourceName Component를 작성해 Repository bean을 설정해준다.  
```java
@Repository(ResourceName.REPOSITORY_MSG)
public class MsgRepository {}
```
  
* @Autowired를 이용해 sqlSessionTemplate bean을 주입하고 mapper name space를 통해 SQL을 mapping한다.  
* Spring - myBatis 연동과 SqlSessionTemplate에 관한 자세한 내용은 [참고](../backend/back-dev-guide-tip.md)의 [SqlSessionTemplate](../backend/back-dev-guide-tip.md#sqlsessiontemplate) 항목을 참조한다. 
```java
@Repository(ResourceName.REPOSITORY_MSG)
public class MsgRepository {

	private staitc final String MAPPER_NAME_SPACE = "msg.";

	@Autowired
	private SqlSessionTemplate sqlSessionTemplate;

}
```
  
* mybatis query를 호출하기 위해 알맞은 parameter type과 method를 작성해 return 구문을 완성한다. 이후 xml 파일에서 참조하여 동일하게 작성하게 된다.  

**`<SELECT>`**

```java
// selectList
public List<Map<String, Object>> selectFieldGroupList(Map<String, Object> selectParamData) {
	Map<String,Object> params = new HashMap();
  	return sqlSessionTemplate.selectList(MAPPER_NAME_SPACE + "selectFieldGroupList", params);
}

// selectOne
public UserVO getUserInfo(Map<String, Object> param_map) {
	return sqlSessionTemplate.selectOne(MAPPER_NAME_SPACE+ "getUserInfo",param_map);
}
```

**`<INSERT>, <UPDATE>, <DELETE>`**

``` java
// insert
public int insertFieldGroup(Map<String, Object> selectParamData) {
	return sqlSessionTemplate.insert(MAPPER_NAME_SPACE+ "insertFieldGroup", selectParamData);
}

// update
public int updateFieldGroup(Map<String, Object> selectParamData) {
	return sqlSessionTemplate.update(MAPPER_NAME_SPACE+ "updateFieldGroup", selectParamData);
}

// delete
public int deleteFieldInfo(Map<String, Object> selectParamData) {
	return sqlSessionTemplate.delete(MAPPER_NAME_SPACE+ "deleteFieldInfo", selectParamData);
}

```
  

## SQL mapping  
* SQL을 매핑할 xml 파일을 생성한 뒤, 문서 상단에 namespace를 추가한다.  
  
![xml 파일 생성](/assets/image/back-dev-guide/admin-app-guide10.png)
  
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="msg"></mapper>
```

* repository에 작성한 내용에 따라 id와 parameterType, resultMap 등을 동일하게 작성해준다.  

**`<SELECT>`**
|      속성         |        설명       |     기능       |
| :-------------: | :-----------------: | :-----------------: |
|       id      | 구문을 찾기 위해 사용될 수 있는 네임스페이스내 유일한 구분자 |  Repository class의 method에 주어진 key 이름과 일치하도록 작성  |
|       parameterType      | 구문에 전달될 파라미터의 패키지 경로를 포함한 전체 클래스명이나 별칭 |  구문에 전달될 파라미터 타입  |
|       resultMap      | 외부 resultMap의 참조명. |  결과 반환 타입 / 외부 Map 타입을 이용한 반환 타입  |  

```xml
<!-- SELECT -->
<select id="selectFieldGroupList" parameterType="hashMap" resultMap="resultMap_selectFieldGroupList"></select>
```

::: tip :speech_balloon: resultMap
검색 결과를 특정 자바 객체에 매핑하여 리턴하기 위해 사용한다.  
검색된 테이블의 컬럼명과 매칭될 객체의 변수 이름이 다르면 매핑되지 않는다.  
작성한 쿼리에서 참조하여 반환하도록 설정된다.  
column에는 DB의 필드명을, property에는 property method명을 작성한다.

```xml
<!-- resultMap -->
<resultMap type="hashMap" id="resultMap_selectFieldGroupList">...</resultMap>

<!-- sql query -->
<select id="selectFieldGroupList" parameterType="hashMap" 
									resultMap="resultMap_selectFieldGroupList"></select>
```
:::

**`<INSERT>, <UPDATE>, <DELETE>`**
|      속성         |       설명       |       기능       |
| :-------------: | :-----------------: | :-----------------: |
|       id      | 구문을 찾기 위해 사용될 수 있는 네임스페이스내 유일한 구분자 | Repository class의  method에 주어진 key 이름과 일치하도록 작성  |
|       parameterType      | 구문에 전달될 파라미터의 패키지 경로를 포함한 전체 클래스명이나 별칭 |  구문에 전달될 파라미터 타입  |

```xml
<!-- INSERT -->
<insert id="insertFieldGroup" parameterType="hashmap"></insert>

<!-- UPDATE -->
<update id="updateFieldGroup" parameterType="hashMap"></update>

<!-- DELETE -->
<delete id="deleteFieldInfo" parameterType="hashMap"></delete>
```

  

* 테이블을 참조하여 실행시키고자 하는 기능에 맞춰 SQL 구문을 작성하고,  SELECT의 경우  
	반환받고자 하는  resultMap을 작성해 매핑시킨다.  

```xml
<!-- 필드 테이블 목록 조회 결과 맵 -->
<resultMap type="hashMap" id="resultMap_selectMsgSearchList">
	<result column="ID" 			property="ID" 			/>
	<result column="KOR_NAME" 		property="KOR_NAME" 	/>
	<result column="ENG_NAME" 		property="ENG_NAME" 	/>
	<result column="LEN" 			property="LEN" 			/>
	<result column="FIELD_MASK" 	property="FIELD_MASK" 	/>
	<result column="DESCRIPTION" 	property="DESCRIPTION" 	/>
	<result column="UPDATE_USER" 	property="UPDATE_USER" 	/>
	<result column="UPDATE_DATE" 	property="UPDATE_DATE" 	/>
	<result column="STATE" 			property="STATE" 		/>
	<result column="TMP_TYPE" 		property="TMP_TYPE" 	/>
	<result column="FIELD_DIVISION" property="FIELD_DIVISION"/>
</resultMap>

<!-- 필드 검색 query -->
<select id="selectMsgSearchList" parameterType="hashMap" resultMap="resultMap_selectMsgSearchList">
	SELECT	META_KEY, 
			KOR_NAME, 
			ENG_NAME, 
			ENG_VARIABLE, 
			LEN, 
			ID, 
			DESCRIPTION, 
			TEMPLATE_TYPE, 
			CREATE_USER, 
			CREATE_DATE, 
			UPDATE_USER, 
			UPDATE_DATE, 
			FIELD_MASK, 
			STATE, 
			IS_COMM_FIELD, 
			IS_DELETED
	FROM	TM_MSG_META
	<trim prefix="WHERE" prefixOverrides = "AND | OR">
		<if test = "ID != null and ID != ''"> AND ID = #{ID}</if>
		<if test = "KOR_NAME != null and KOR_NAME != ''"> AND KOR_NAME = #{KOR_NAME}</if>
		<if test = "LEN != null and LEN != ''"> AND LEN = #{LEN}</if>
		<if test = "FIELD_DIVISION != null and FIELD_DIVISION != ''"> AND IS_COMM_FIELD = #{FIELD_DIVISION} </if>
	</trim>
</select>
```

## Thymeleaf Resource file

### 폴더 구성
* resources 폴더 하위의 assets에는 css, img, js, scss와 같은 정적 파일을 넣어 관리하고,  
	templates에는 html 파일을 만들어 관리한다.  

```sh
src
  ├─ main
  │	├─ resources
  │	│  ├─ ...
  │	│  ├─ assets
  │	│  │  ├─ css
  │	│  │  │  └─ ... 
  │	│  │  ├─ js
  │	│  │  │  └─ ...
  │	│  │  ├─ scss
  │	│  │  │  └─ ...
  │	│  │  └─ ...
  │	│  ├─ templates
  │	│  │  ├─ fragments
  │	│  │  │  └─ ...	
  │	│  │  ├─ layout	
  │	│  │  │  └─ ...		
  │	│  │  ├─ thymeleaf
  │	│  │  │  └─ ...
  │	│  │  └─ ...
  │	│  └─ ...
```

### CSS 및 JS 타임리프 적용
* css와 js를 타임리프 문법을 이용해 구현할 수 있도록 추가 및 설정해준다.  
	다음은 부트스트랩과 jquery를 사용하기 위해 설정한 내용 예시이다.

**resources/templates/fragments/default/head.html**
```html
<!-- head setting -->

<!DOCTYPE html>
<html lang="ko" xmlns:th="http://www.thymeleaf.org">
<!-- 공통 영역을 정의하는 조각 설정 -->
<th:block th:fragment="headFragment">
  <head>
	  <meta charset="utf-8">
	  <meta http-equiv="X-UA-Compatible" content="IE=edge">
	  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	  <meta name="description" content="">
	  <meta name="author" content="">
	</head>

	<!-- thymeleaf를 이용한 page별 menu명 출력 -->
	<title th:text="${requestMenuNM}"> </title>

</th:block>
</html>
```

``` html
<!-- .css -->
<!-- 부트스트랩 메인 템플릿[sb-admin-2] CSS  -->
<link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
<!-- th:href를 이용해 해당 경로에 있는 css로 이동 -->
<link th:href="@{/assets/vendor/fontawesome-free/css/all.min.css}" rel="stylesheet" type="text/css">
<link th:href="@{/assets/css/sb-admin-2.min.css}" rel="stylesheet">

<!-- DataTable -->
<link th:href="@{/assets/vendor/datatables/dataTables.bootstrap4.css}" rel="stylesheet">

<!-- 공통 CSS -->
<link th:href="@{/assets/css/cmm/mbpcen.css}" rel="stylesheet">
```

``` html
<!-- .js -->

<!-- Javascript  [jQuery]-->
<!-- th:src를 이용해 해당 url 호출 -->
<script th:src="@{/webjars/jquery/3.6.0/jquery.min.js}"></script>

<!-- MBPCEN 공통 스크립트 -->
<script th:src="@{/assets/js/WMbp.js}"></script>
<script th:src="@{/assets/js/cmm/ajaxCall.js}"></script>
```

  

**resources/templates/fragments/layout/default.html**  

``` html
<!DOCTYPE html>
<html lagn="ko" xmlns:th="http://www.thymeleaf.org" xmlns:layout="http://www.ultraq.net.nz/thymeleaf/layout">
<!-- fragment들의 조합 -->

	<!-- 공통 헤더-->
	<!-- th:replace로 파일경로와 조각이름을 지정해 해당 부분에 조각을 삽입한다. -->
	<th:block th:replace="fragments/default/head :: headFragment"></th:block>
	
	<body id="page-top">
		<div id="wrapper">
			<!-- 사이드바-->
				<th:block th:replace="fragments/default/sidebar :: sidebarFragment"></th:block>
					...
			<!-- 공통 스크립트 -->
			<th:block th:replace="fragments/default/script :: scriptFragment"></th:block>
	</body>
</html>
```

## Thymeleaf Layout 설정 및 추가

* 타임리프 레이아웃 설정에 대한	자세한 내용은 [Thymeleaf Layout 설정](../backend/back-dev-guide-tip.md#thymeleaf-layout-setting) 항목을 참조한다.  
* 화면이 될 html 파일 상위에 thymeleaf 사용과 레이아웃 지정을 위해 다음 내용을 추가한다.  
	본문 영역은 `layout:fragment="content"`로 설정한 뒤 내부에 내용을 작성한다.  
```html
<html xmlns:th="http://www.thymeleaf.org"
      xmlns:layout="http://www.ultraq.net.nz/thymeleaf/layout"
      layout:decorate="layout/default">
<th:block layout:fragment="content"></th:block>

	<script type="text/javascript" src="/webjars/jquery/3.6.0/jquery.min.js"></script>
	<script src="/assets/js/demo/datatables-demo.js"></script>
	<script th:inline="javascript"></script>
	// thymeleaf에서 javascript를 편리하게 사용할 수 있음
</html>
```

* Controller Layer에서 경로에 맞는 파일명을 setting해야 해당 화면을 불러낼 수 있다.  
```java
// Controller 
mv.setViewName("thymeleaf/msg/msg_fieldgroup");
```
### HTML 레이아웃 타임리프 문법

* 레이아웃은 전부 `/resources/templates`에서 관리하며 추가 생성 후 동일하게 설정을 추가해 작성해준다. 
```html
<!-- th:each로 테이블에 들어갈 내용들을 반복문을 통해 출력 -->
<tr th:each="msg, iterState : ${LIST}">
	<td>
		<span class="link">
			<!-- th:text로 ${LIST} 내 해당하는 데이터값을 출력 -->
			<a href="#" th:text="${msg.MESSAGE_LIST_ID}" th:onclick="getSearchList('[[ ${msg.BODY_MESSAGE_ID} ]]');"></a>
		</span>
	</td>
	<td th:text="${msg.DESCRIPTION}"> </td>
	<td th:text="${msg.BODY_MESSAGE_ID}"> </td>
	<td class="text-center" th:text="${msg.IS_DELETED_TEXT}"> </td>
	<td th:text="${msg.UPDATE_DATE}"> </td>
	<td class="text-center" th:text="${msg.UPDATE_USER}"> </td>
	<td th:text="${msg.DEPLOY_DATE}"> </td>
	<td class="text-center" th:text="${msg.STATE_TEXT}"> </td>
</tr>
```

## Thymeleaf 정적 리소스 캐싱(cache) 처리
정적 리소스를 업로드하면 서버를 재시작하지 않으면 바로 반영되지 않는데,  
설정을 통해 새로고침만으로 리소스를 반영시켜줄 수 있도록 설정할 수 있다.  


* **devtools dependency 추가**  

**pom.xml**  
```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-devtools</artifactId>
</dependency>
```

* **yml 설정 추가**  

**application-local.yml**  
```yaml
spring:
# SpringBoot Devtools 설정 - 자동 리로드 기능 on/off
# 정적 리소스에 변화가 있을 때 바로 반영 
  devtools: 
    livereload: 
      enabled: true
    restart: 
      enabled: true  
# thymeleaf View 설정 
  thymeleaf: 
    cache: false
		
    prefix: classpath:templates/
    suffix: .html
    view-names: thymeleaf/*
```
