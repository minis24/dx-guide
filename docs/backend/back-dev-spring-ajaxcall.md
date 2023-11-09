# Ajax 요청 개발 프로세스

Ajax에 관한 개념은 [참고](../backend/back-dev-guide-tip.md)의 [Ajax](../backend/back-dev-guide-tip.md#ajax) 항목을 참조한다.

### Ajax 동작 순서
1. 요청(request): 브라우저가 서버에 정보를 요청  
2. 서버의 동작: 서버는 JSON, XML 등의 형식으로 데이터 전달  
3. 응답(response): 브라우저에서 이벤트가 발생하여 콘텐츠를 처리  

## Ajax 호출 Script 작성

* Ajax 호출 함수 스크립트를 작성한다. url은 controller에 mapping되는 value값에 맞춰  
	작성하고 POST 또는 GET 등의 적절한 요청방식과 함께 콜백함수를 작성한다.  
  
**.html**
```javaScript
jQuery(document).ready(function() {

	jQuery('#btn_field_reg_submit').click(function(){

		var formdata = jQuery("#submit_form").serializeArray();
		...
	});

	// ajax 실행 요청
	var url = ""
	if($("#fieldEditBtn").text() == "필드수정") {
		url = "/views/msg/fieldEdit_action";
	} else {
		url = "/views/msg/fieldreg_action";
	}
	
	var jsonData = JSON.stringify(sendData);

	ajax.callAjaxMsg(url, jsonData, function(responseData) {
		var rsCd = responseData.rsCd;
		var rsMsg = responseData.rsMsg;

		if(rsCd == "OK"){
			alert(rsMsg);
			location.reload();
		} else {
			alert(rsMsg);
			return false;
		}
	});	// end ajax.callAjaxMsg
});
```

:::info :speech_balloon: serializeArray()
form 요소들(input, textarea, select)의 이름을 key로, 값을 value로 하는 배열로 인코딩한다.
  
:speech_balloon: **JSON.stringify()**  
객체의 직렬화(serializing)  
자바스크립트 객체에 저장된 데이터를 서버로 전송하기 위해서는 객체를 JSON 형식의 문자열로  
변경해야 한다.
:::

**ajaxCall.js**  

* POST 또는 GET 방식의 타입별 ajax 호출함수를 만들어두고 사용하기도 한다.

```javaScript
var ajax = {
	//POST
	callAjaxMsg : function(url, send_data, success_callBack, error_callback, complete_callback) {
		var option =
		{
			url : url,
			data : send_data,
			dataType : 'json',
			contentType : 'application/json',
			type : 'post',
			async : true,
			headers : {
				"X-User-Agent" : "ios",
				"X-App-Version-Code" : "1.0.0"
			},
			success : success_callBack,
			error : error_callback,
			complete : complete_callback
		};
		jQuery.ajax(option);
	}
};
```

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

	@ResponseBody
	@RequestMapping(value="/fieldEdit_action")
	public String fieldEdit_action(@RequestBody(required=true) String request_body) throws Exception {}
}
```

* 요청 처리 로직을 작성하고 응답할 return 값을 적절하게 반환한다.
```java
@Controller
@RequestMapping("/views/msg")
public class MsgController {

	@ResponseBody
	@RequestMapping(value="/fieldEdit_action")
	public String fieldEdit_action(@RequestBody(required=true) String request_body) throws Exception {
		...
		JSONParser parser = new JSONParser();
		JSONObject requestBody = (JSONObject) parser.parse(request_body);
		
		Map<String, Object> selectParamData = new HashMap<String, Object>();
		...

		int pid = service.updateFieldInfo(selectParamData);

		JSONObject response = new JSONObject();
		response.put("rsCd", "OK");
		response.put("rsMsg", "정상처리되었습니다.");

		return response.toJSONString();
	}
```

::: info :speech_balloon: parse()
객체의 역직렬화(deserializing)  
서버로부터 전송받은 문자열 상태의 JSON 데이터는 다시 자바스크립트 객체로 변환해야  
객체의 데이터에 접근해 페이지에서 사용할 HTML을 생성할 수 있다. (문자열 파싱)
:::

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
public int updateFieldInfo(Map<String, Object> selectParamData) {
	return msgRepository.updateFieldInfo(selectParamData);
}
```

## Persistencen 레이어 (Repository)

* 생성한 repository class의 선언부에 @Repository 어노테이션을 붙이고  
	설정해둔 ResourceName Component를 작성해 Repository bean을 설정해준다.  
```java
@Repository(ResourceName.REPOSITORY_MSG)
public class MsgRepository {}
```

* @Autowired를 이용해 sqlSessionTemplate bean을 주입하고 mapper name space를 통해  
	SQL을 mapping한다.  
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

**`<INSERT>, <UPDATE>, <DELETE>`**

``` java
// insert
public int insertFieldInfo(Map<String, Object> selectParamData) {
	return sqlSessionTemplate.insert(MAPPER_NAME_SPACE+ "insertFieldInfo", selectParamData)
}

// update
// 보통 delete도 데이터를 완전히 삭제하기보다는 노출여부 상태값을 바꾸므로 update를 사용한다.
public int deleteFieldInfo(Map<String, Object> selectParamData) {
	return sqlSessionTemplate.update(MAPPER_NAME_SPACE+ "deleteFieldInfo", selectParamData)
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

```xml
<!-- INSERT -->
<insert id="insertFieldInfo" parameterType="hashMap">
...
</insert>

<!-- UPDATE -->
<update id="updateFieldInfo" parameterType="hashMap">
...
</update>
```

