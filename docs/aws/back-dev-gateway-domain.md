# 사용자 지정 도메인 이름 설정 가이드

## 사용자 지정 도메인 이름  
  

사용자 지정 도메인 이름은 API 사용자에게 제공할 수 있는 더 간단하고 직관적인 URL입니다.  
API를 배포한 후 사용자 및 사용자 고객은 다음 형식의 기본 URL을 사용하여 API를 호출할 수 있습니다.  

**https://<span style="color:red">api-id</span>.execute-api.<span style="color:red">region</span>.amazonaws.com<span style="color:red">/stage</span>**
  
여기서 api-id는 API Gateway에서 생성되고, region(AWS 리전)은 API를 생성할 때 사용자가  
지정하며, stage는 API를 배포할 때 사용자가 지정합니다.  
  
URL의 호스트 이름 부분 (즉, `api-id.execute-api.region.amazonaws.com`)은 API 엔드포인트를 가리킵니다.  
기본 API 엔드포인트는 기억하기가 어려우며 사용자에게 친숙하지 않을 수 있습니다.  
  
사용자 지정 도메인 이름을 사용하면 API의 호스트 이름을 설정하고 기본 경로 (예: myservice)를 선택하여
대체 URL을 API에 매핑할 수 있습니다.  
예를 들어, 더 사용자 친화적인 API 기본 URL은 다음과 같습니다.  
  
<h3><span style="color:blue">https:/<span>/api.example</span>.com/myservice</span></h3>  
  

<h3>1) 도메인 발급</h3>  

Route 53 에서 도메인 발급  
**<span>dfpcen.com</span>**  

<h3>2) AWS Certificate Manager(ACM) 공인인증서 발급</h3>  

AWS에서는 공인 인증서를 무료로 발급받을 수 있는 ACM 서비스를 제공한다.  
**<span style="color:blue">Request certificate > Request a public certificate > Next</span>**  
  
![공인 인증서 발급](/assets/image/back-api-gateway/api-gateway-guide25.png)
  
**<span style="color:blue">dapi.dfpcen.com</span>** 에 대한 인증서 요청  
**<span style="color:blue">DNS Validation 선택</span>**  
  
![공인 인증서 발급 요청](/assets/image/back-api-gateway/api-gateway-guide26.png)  
  
![공인 인증서 발급 확인](/assets/image/back-api-gateway/api-gateway-guide27.png)  
  
목록에서 인증서 ID를 클릭해서 들어온 화면에서 **<span style="color:blue">"Create record in Route 53"</span>** 을  
클릭해서 Route 53에서 레코드 생성  
  
![create record](/assets/image/back-api-gateway/api-gateway-guide28.png)  
![create records](/assets/image/back-api-gateway/api-gateway-guide29.png)  
  
위와 같이 정상적으로 요청이 완료되면 수분에서 최대 30분까지 등록 시간이 발생할 수 있다.  
  
![certificates](/assets/image/back-api-gateway/api-gateway-guide30.png)  
  
정상 발급이 완료되면 검증 보류에서 검증 상태가 발급완료로 변경됨. (15분정도 걸림)  
  
![발급완료](/assets/image/back-api-gateway/api-gateway-guide31.png)  
  
<h3>3) 사용자지정 도메인 설정</h3>  
  
인증서 발급이 완료되었으며 API Gateway로 돌아와 사용자 지정 도메인 이름을 등록한다.  
  
![create domain name](/assets/image/back-api-gateway/api-gateway-guide32.png)  
  
**API Mapping 설정**  
  
![API mapping setting](/assets/image/back-api-gateway/api-gateway-guide33.png)  
  
**Configure API Mappings 설정**  
  
![Configure API Mappings](/assets/image/back-api-gateway/api-gateway-guide34.png)  
![add new mappings](/assets/image/back-api-gateway/api-gateway-guide35.png)  
![API mappings save](/assets/image/back-api-gateway/api-gateway-guide36.png)  
  
<h3>4) Route 53 호스팅영역 설정</h3>  
  
![create record](/assets/image/back-api-gateway/api-gateway-guide37.png)  
  
<h3>5) 호출 테스트</h3>  
  
사용자지정 도메인 설정에서 Path를 "api"로 설정하였기 때문에 api 리소스 경로 (**/api/pilot/{proxy+}**) 앞에 
**api**를 추가해줘야 호출이 됨.  
--> 로그인 API의 경우 예시 :  
( **https://<span>dapi.dfpcen.</span>com/**<span style="color:red">api</span>**/api/login** )  
  
![API 호출](/assets/image/back-api-gateway/api-gateway-guide38.png)  
![login API request](/assets/image/back-api-gateway/api-gateway-guide39.png)  