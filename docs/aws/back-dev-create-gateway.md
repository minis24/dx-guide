# API Gateway API 생성 가이드  

## Amazon API Gateway API 등록

API Gateway에서 제공하는 API 유형은 4가지가 있다.  
	- HTTP API  
	- WebSocket API  
	- **<span style="color:blue">REST API (선택)</span>**  
	- PRIVATE REST API  
  
![REST API](/assets/image/back-api-gateway/api-gateway-guide1.png)
  
이 중 REST API 구축(Build)을 선택한다.  

---

1) New API 선택  
2) API name, Description을 입력하고  
3) Endpoint Type에 Regional(지역)을 선택한 후  
4) Create API 클릭.  

![new API](/assets/image/back-api-gateway/api-gateway-guide2.png)
![create API](/assets/image/back-api-gateway/api-gateway-guide3.png)
  

## Resources 등록
<h3><span style="color:blue">리소스는 실제 api를 호출하는 api url을 정의한다.</span></h3>  

![create Resource](/assets/image/back-api-gateway/api-gateway-guide4.png)
  
**Resource Name을 입력하면 Resource Path가 자동으로 생성된다.**  
  
![Resource Path](/assets/image/back-api-gateway/api-gateway-guide5.png)
  
**/api 생성함.**  

![api method](/assets/image/back-api-gateway/api-gateway-guide6.png)
  
**다시 /api를 선택한 후 Actions > Create Resource 선택**  

![recreate Resource](/assets/image/back-api-gateway/api-gateway-guide7.png)
  
**Resource Name을 입력하면 /api 하위에 Resource Path가 자동으로 생성된다.**  

![path 자동생성](/assets/image/back-api-gateway/api-gateway-guide8.png)
  
**<span style="color:red">이 때, {authorid}, {bookid}와 같은 괄호를 사용하여 리소스(경로 파라미터)를 추가할 수 있다.  
예를 들어, 리소스 경로 {username}은(는) 'username'이라는 경로 파라미터를 나타낸다.</span>**  

**/api/pilot 생성함.**  
  
![api pilot](/assets/image/back-api-gateway/api-gateway-guide9.png)
  
**위 작업을 반복해서 API URL을 구성한다.**  

  
**<span style="color:red">/api/pilot/{proxy+}을(를) 프록시 리소스로 구성하면 그 하위 리소스에 대한 모든 요청이 포착된다.
이 경로는 예를 들어 /api/pilot/testapi 에 대한 GET 요청에 대해 작동한다. </span>**
  
![GET 요청](/assets/image/back-api-gateway/api-gateway-guide10.png)
  
**Create Resource를 클릭하면 Any로 메서드를 생성하는 화면이 열린다.**  
  
## Method 등록
  
HTTP Proxy 선택  
Endpilot URL 입력  
**http://<span>ec2-3-39-88-103.ap-northeast-2.compute.</span><span>amazonaws.</span>com:8088/<span style="color:blue">api/pilot/</span><span style="color:red">{proxy}</span>**
  
백엔드 API 주소에서 리소스는 /api/pilot 이므로 나머지 주소는 {proxy}로 설정하면  
/api/pilot 이하의 모든 주소에 매핑이 됨.  

<span style="color:red">Save 클릭</span>
![proxy save](/assets/image/back-api-gateway/api-gateway-guide11.png)
  

<h3><span style="color:blue">Method Request에서 매핑정보 입력.</span></h3>  

Http Header 값을 매핑해줌.  

![header Mapping](/assets/image/back-api-gateway/api-gateway-guide12.png)
  
<h3><span style="color:red">Authorization 설정</span></h3>  
  
![Authorization](/assets/image/back-api-gateway/api-gateway-guide13.png)
  
<h3><span style="color:blue">Integration Request에서 매핑정보 입력.</span></h3>  

Http Header 항목에서 **<span style="color:red">Authorization</span>** 을 **<span style="color:red">method.request.header.Authorization</span>** 으로 매핑  
Method Request로 전달된 Authorization과 매핑이 되므로 먼저 등록이 되어 있어야  
Validation 넘어감.  
  
![authorization mapping](/assets/image/back-api-gateway/api-gateway-guide14.png)
  
## (참고) 통합 요청 파라미터에 메서드 요청 데이터 매핑
경로 변수 형식의 통합 요청 파라미터, 쿼리 문자열 또는 헤더를 정의된 메서드 요청 파라미터 및 페이로드에서 매핑할 수 있습니다.  
 
![매핑 표현식](/assets/image/back-api-gateway/api-gateway-guide15.png)
  
![응답 데이터 매핑](/assets/image/back-api-gateway/api-gateway-guide16.png)
  

### <span style="color:blue">TEST</span>

![test](/assets/image/back-api-gateway/api-gateway-guide17.png)
  
<span style="color:blue">테스트할 백엔드 URL (파라미터 없는 테스트용 API)  
/api/pilot/board/bbsAttrbCodeList	--> GET</span>
  
**헤더는 ":" 으로 헤더이름과 헤더값을 구분하고 줄바꿈으로 다른 헤더를 추가할 수 있다.**  
  
Method : GET  
  
![test get](/assets/image/back-api-gateway/api-gateway-guide18.png)
  
<h3><span style="color:blue">테스트 성공!!!</span></h3>
  
![method test](/assets/image/back-api-gateway/api-gateway-guide19.png)
  
**API 배포  
Action > Deploy API 선택**
  
  
![deploy API](/assets/image/back-api-gateway/api-gateway-guide20.png)


  
**스테이지 설정  
기존에 있는 DEV 스테이지로 설정**
  
  
![method actions](/assets/image/back-api-gateway/api-gateway-guide21.png)
  
![DEV stage Editor](/assets/image/back-api-gateway/api-gateway-guide22.png)
  
**Any로 생성됨.**  
  
![API methods](/assets/image/back-api-gateway/api-gateway-guide23.png)
  
## API URL <U>호출 테스트</U>
  
<span style="color:orange">https://<span>e5509qjj9a.execute-api</span>.ap-northeast-2.amazonaws.com/DEV</span>
  
![호출 태스트](/assets/image/back-api-gateway/api-gateway-guide24.png)
  

```sh
curl -v -X OPTIONS  https://e5509qjj9a.execute-api.ap-northeast-2.amazonaws.com/DEV
```