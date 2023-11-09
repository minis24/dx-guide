# 부하 분산 및 자동조절(ALB, ASG)

- 비즈니스 시스템의 고가용성 확보를 위해서 여러 가용 영역에 서비스를 실행하고,  
	수요변화에 따른 부하 분산 및 자동 조정 환경을 구성
- 수신트래픽을 분산하기 위해 퍼블릭 서브넷에 로드밸런서를 구성
- 프라이빗 서브넷에 웹 서버를 생성하기 위한 시작 템플릿을 설정하고 오토스케일링 그룹을  
	생성한 후 로드밸런서와 연결하여 고가용성 서비스 환경을 구성
- 아래 그림을 기준으로 간략하게 진행하며 설명  
  
---
![부하 분산 및 자동조절](/assets/image/back-cicd/cicd-guide72.png)
<span style="color:#808080">인프라구성도_예시</span>

## 1. Application Load Balancer

### 로드밸런싱 > 대상그룹(Target groups) 생성
1. 로드밸런싱 하위 메뉴에서 대상그룹 선택 후 ‘Create target group’ 버튼 클릭
2. Specify group details 페이지 설정
    - Choose a target type : Instances 선택
    - Target group name : sample-ALB-TG
    - VPC : sample-VPC
    - Port는 AMI로 설정한 EC2인스턴스의 설정포트로 맞춤(ex:8081)
3. NEXT 버튼 클릭하여 Register targets 페이지로 이동
4. Targets은 로드밸런서의 요청에 응답할 인스턴스를 의미, 아직 인스턴스 생성 전이므로 건너뜀
5. ‘Create target group’ 버튼을 클릭하면 대상그룹 생성 완료

  

### 로드밸런싱 > 로드밸런서(Load Balancer) 생성
1. 로드밸런싱 하위 메뉴에서 로드밸런서 선택 후 ‘create load balancer’ 버튼 클릭
2. 로드밸런서 유형선택 창에서  Application Load Balancer 섹션의 ‘create’ 버튼 클릭
3. Basic configuration 섹션 설정
    - Load balancer name : sample-ALB
    - Scheme : Internet-facing
    - IP address type : IPv4
4. Network mapping 섹션 설정
    - VPC : sample-VPC
    - Mappings : 각 가용영역 체크후 퍼블릭 서브넷을 선택
5. Security group 섹션 설정
    - ‘Create new security group’ 클릭
    - sample-ALB-SG :  VPC선택, 인바운드 HTTP 유형에 Anywhere IPv4 선택하여 생성
    - 또는 위와같은 기존 보안그룹 선택하여 사용
6. Listeners and routing 섹션 설정
    - HTTP/80 포트의 Default action으로 위에 생성한 대상그룹 ‘sample-ALB-TG’ 선택
7. ‘Create load balancer’ 버튼 클릭하여 로드밸런서 생성 완료


## 2. 시작 템플릿 구성
### AMI 생성
1. 인스턴스 메뉴로 이동
2. 인스턴스 목록 중 이미지로 생성할 인스턴트를 우클릭하여 이미지 생성
  
![이미지 생성](/assets/image/back-cicd/cicd-guide73.png)
  
3. 이미지 생성 정보 입력 후 생성 완료

### 시작 템플릿 생성
1. 인스턴스 하위 메뉴에서 시작 템플릿 선택 후 ‘시작 템플릿 생성’ 버튼 클릭
2. 시작 템플릿 생성 정보입력
    - 탬플릿 이름 : sample-template
    - 버전 설명 : 웹서버용  v1
    - Auto Scaling 지침 체크
    - 탬플릿 태그에서 키는 Name, 값은 WebServer로 입력
3. 애플리케이션 및 OS 이미지에서 내 AMI에서 위에 생성한 AMI 선택
4. 인스턴스 유형선택(프리티어- t2.micro)
5. 키페어 선택 or 생성
6. 네트워크 설정 섹션의 서브넷은 시작 템플릿에 포함하지 않음으로 선택
    
    → 뒤에 Auto Scaling Group 생성 시 서브넷을 지정하기 때문
    
7. 보안 그룹 선택 또는 생성
    - 이름 : sample-ASG-SG
    - VPC : sample-VPC
    - 보안 그룹 규칙 추가(Add security group rule) 버튼 클릭
        - HTTP 인바운드 트래픽 허용 추가(0.0.0.0/0)
        - VPC 내부에서 SSH 접속 허용 추가(10.X.0.0/16)
8. 리소스태그에서 키는 Name, 값은 Web Server, 유형은 인스턴스로 태그 추가
9. 시작 탬플릿 생성 버튼 클릭하여 생성 완료  

::: tip :bulb: 
AutoScalingGroup을 사용하여 인스턴스 실행 시 docker를 사용하는 경우 docker service가 자동으로 시작되도록 설정할 것인지 고려
:::

### 부팅 시 docker service 자동실행 설정 방법

**방법1.** AMI 생성 전 인스턴스에서 systemctl를 통하여 부팅 시 자동실행 설정  
```bash
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
```
![자동실행 설정](/assets/image/back-cicd/cicd-guide74.png)
  
**방법2**. 시작 템플릿 생성 시 ‘고급 세부 정보’ 섹션의 ‘사용자 데이터’를 통해 실행 스크립트 추가
  
![스크립트 추가](/assets/image/back-cicd/cicd-guide75.png)

## 3. Auto Scaling 그룹

### Auto Scaling 그룹 생성
1. 왼쪽 탐색 창 Auto Scaling 하위 메뉴에서 Auto Scaling 그룹 클릭
2. 시작 템플릿 또는 구성 선택 단계 설정
    - 그룹 이름 : sample-ASG
    - 시작 템플릿 : sample-template
3. 인스턴스 시작 옵션 선택 단계 설정
    - VPC : sample-VPC
    - 가용 영역 및 서브넷 : 프라이빗 서브넷 2개 선택
4. 고급 옵션 구성 단계 설정
    - 로드 밸런싱 옵션에서 기존 로드 밸런서에 연결 선택
    - 기존 로드 밸런서 대상그룹에서 생성한 대상그룹(sample-ALB-TG) 선택
    - 위 설정으로 Auto Scaling 그룹이 대상그룹에 EC2 인스턴스를 등록하고  
    로드밸런서는 대상그룹에 있는 인스턴스로 트래픽을 보냄
    - 상태 확인/추가 설정 필요옵션 선택 후 다음
5. 그룹 크기 및 크기 조정 정책 구성 단계 설정
    - 용량/최소용량/최대용량 각 2/2/4 설정
    - 크기 조정 정책과 인스턴스 축소보호는 기본값 유지 후 다음
6. 알림추가 단계는 Amazon SNS를 통한 알림 설정 기능이며 샘플에서는 설정없이 다음
7. 태그 추가 단계에서는 키는 Name, 값은 ASG-Web Server 입력 및 체크설정 후 다음
8. 검토 단계에서는 각 단계별 설정된 내용 확인 후 ‘Auto Scaling 그룹 생성’ 버튼으로 완료

  

## 4. 작동 테스트

### Auto Scaling Group 확인
1. 인스턴스 메뉴로 이동하여 ‘ASG-Web Server’ 인스턴스 2개(용량설정) 실행 확인
2. 대상그룹 메뉴로 이동하여 세부정보에서 등록된 두개의 인스턴스가 보이며,  
	Health Check 수행결과 확인
  
![health check](/assets/image/back-cicd/cicd-guide76.png)

### Load balancer 확인
1. 로드밸런서 메뉴로 이동하여 세부정보 확인
2. DNS name과 리스너 Port 확인하여 브라우저에서 접속 확인
  
![접속 확인](/assets/image/back-cicd/cicd-guide77.png)

::: tip :bulb:
새로고침 시 트래픽을 수신하는 호스트 IP가 변경되며, 이는 각 가용영역에 생성된 인스턴스로 적절하게 트래픽을 전달하는 것이므로 로드밸런서가 잘 작동됨을 의미
:::