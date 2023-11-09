# EC2 인스턴스 시작/중지 자동화

## 소개
- AWS의 **Lambda** 와 **CloudWatch** 서비스를 사용하여 EC2 인스턴스를 자동으로  
	중지하고 시작
    
    > <span style="color:darkblue"><b>다음 해결 방법은 약식으로, 고급 해결 방법이 필요한 경우 AWS Instance Scheduler를 사용</b></span>

- 해당 규칙설정을 통해 EC2 인스턴스가 종료되고 재시작 되었을 경우 인스턴스 내 필요한  
	서비스가 미실행 상태가 아닌지 확인 및 고려

- **처리 순서 요약**
    1. Lambda 함수에 대한 AWS IAM 정책 및 실행 역할 생성
    2. EC2 인스턴스를 중지 및 시작하는 Lambda 함수 생성 및 테스트
    3. **CloudWatch** 또는 **EventBridge**에서 일정에 따라 함수를 실행하는 규칙을 생성 및 연결

## 해결 방법

### 1. Lambda 함수에 대한 IAM 정책 및 실행 역할 생성

<span style="color:darkblue"><b>IAM 정책 생성</b></span>
  
1. IAM 콘솔 왼쪽의 탐색창에서 정책 메뉴 선택
2. **[정책 생성]** 버튼 클릭
![정책 생성](/assets/image/aws/img1.png)
3. 다음 **JSON** 정책 문서를 복사하여 편집기에 붙여넣어 정책 생성 완료
```JSON
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ec2:Start*",
        "ec2:Stop*"
      ],
      "Resource": "*"
    }
  ]
}
```

<span style="color:darkblue"><b>IAM 역할 생성</b></span>

1. IAM 콘솔 왼쪽의 탐색창에서 역할 메뉴 선택
2. **[역할 만들기]** 버튼 클릭
![역할 만들기](/assets/image/aws/img2.png)
3. 사용 사례에서 **'Lambda'** 선택
  
	![사용 사례 선택](/assets/image/aws/img3.png)
4. **이전 단계에서 생성한 on-off 정책** 연결 후 생성 완료

### 2. EC2 인스턴스를 중지 및 시작하는 Lambda 함수 생성

1. Lambda 콘솔을 열고 **[함수 생성]** 을 선택
2. **[새로 작성]** 을 선택
3. **Basic information**(기본 정보) 아래에서 다음 정보를 추가합니다.
    - **Function name**(함수 이름)에 EC2 인스턴스를 시작 or 중지하는 데 사용되는 함수임을 식별하는 이름을 입력 (ex. 'StartEC2Instances' , 'StopEC2Instances' )
    - 런타임(Runtime)에서 **Python 3.9**를 선택
    - **실행 역할(Execution role)** 아래에서 기존 역할 사용(Use an existing role)을 선택
    - **[기존 역할]** 이전단계에서 생성한 IAM 역할을 선택 후 **[함수생성]**

		![기존 역할](/assets/image/aws/img5.png)
4. **Code >Code source**(코드 소스)의 **코드 편집기**에 아래 코드를 붙여 넣고 배포
	- EC2 인스턴스를 <span style="color:red"><b>중지하는 함수</b></span> 코드 예제
	```bash
	import boto3
	region = 'ap-northeast-2'
	instances = ['i-12345cb6de4f78g9h', 'i-08ce9b2d7eccf6d26']
	ec2 = boto3.client('ec2', region_name=region)

	def lambda_handler(event, context):
  	ec2.StopEC2Instances(InstanceIds=instances)
    print('stopped your instances: ' + str(instances))
	```
	::: info :bulb:
	**region(리전)** : 사용자의 인스턴스가 위치하는 AWS 리전 입력  
	**instances(인스턴스)** : Lambda를 적용할 EC2 인스턴스의 ID
	:::
  
5. Configuration(구성) 탭 > General configuration(일반 구성) > Edit(편집)를 선택  
	**Timeout**(제한 시간)을 10초로 설정한 다음 Save(저장) 선택  
  (각자의 사용 사례에 맞춰 구성. 예를 들어, 여러 인스턴스를 중지하고 시작하기 위해 Timeout(제한 시간)과 Memory(메모리)에 다른 값을 입력 가능)
    
6. 앞의 1~5단계를 반복하여 **EC2 인스턴스를 실행하는 함수** 추가 생성

### 3. Lambda 함수 테스트

<span style="color:darkblue"><b>Lambda 함수 테스트</b></span>

1. Lambda 콘솔을 열고 **Functions**(함수)를 선택  
2. 생성한 함수 중 하나를 선택  
3. **Test**(테스트) 탭 선택 후 **[테스트]** 버튼 클릭하여 실행  
	- 테스트 이벤트의 JSON 코드는 변경하지 않는다. 함수에서 이를 사용하지 않음
	  
	![테스트 이벤트](/assets/image/aws/img6.png)
4. 테스트 결과 확인 (생성한 다른 함수에서도 반복)  

	![테스트 결과 확인](/assets/image/aws/img7.png)

  
<span style="color:darkblue"><b>EC2 인스턴스의 상태 확인</b></span>
  
**방법1. AWS Management Console**
  - 테스트 전후에 **EC2 인스턴스의 상태를 확인**하여 예상한 대로 작동하는지 확인 가능
    
**방법2. AWS CloudTrail**
  - CloudTrail로 이벤트를 확인하여 Lambda 함수가 EC2 인스턴스 중지/시작 확인 가능
  1. **[CloudTrail]** 콘솔 왼쪽의 탐색 창에서 **[이벤트 기록]** 선택
  2. **Lookup attributes**(속성 조회) 드롭다운 목록을 선택한 다음 **Event name**(이벤트 이름) 선택
  3. 테스트한 **lambda 함수**(StartInstances, StopInstances)를 검색하여 결과 검토
  4. 결과가 없으면 Lambda 함수가 EC2 인스턴스를 중지하거나 시작하지 않은 것

### 4. Lambda 함수를 실행하는 규칙 생성

<span style="color:darkblue"><b>방법1. CloudWatch 이벤트 규칙 사용</b></span>  

1. CloudWatch 콘솔의 왼쪽 탐색창에서 **이벤트 > 규칙** 메뉴 선택
2. **[규칙 생성]** 버튼 클릭
  
	![규칙 생성](/assets/image/aws/img8.png)

3. **이벤트 소스** 섹션에서 **일정**을 선택
4. **Cron 표현식**으로 일정 설정 
    - UTC 기준으로 한국시간 계산 시 **-9** 적용
    - 예시. 매주 월-금 20시 → 0 11 ? * MON-FRIN *
5. 대상 섹션에서 추가 버튼 클릭하여 생성해둔 Lambda 함수 선택
  
	![규칙 함수 추가](/assets/image/aws/img9.png)
6. 세부 정보 구성에서 규칙의 이름과 설명 설정
7. 반복하여 **시작/중지 각각 규칙 생성**

  
<span style="color:darkblue"><b>방법2. Amazon EventBridge Scheduler 사용(신규)</b></span>  

1. EventBridge 콘솔에서 [규칙 생성]을 선택

	![EventBridge](/assets/image/aws/img10.png)

2. 규칙정보 입력 후  **규칙 유형**에서 **일정**을 선택
3. <b>[EventBridge Scheduler에서 계속]</b>를 선택

	![Scheduler에서 게속](/assets/image/aws/img11.png)
	::: info :bulb: [규칙 생성으로 이동]
	선택 시 위의 CloudWatch처럼 일정패턴과 Lambda 함수 선택 후 규칙생성이 이뤄짐
	:::

4. 일정 패턴에서 **반복 일정** 선택
5. 다음 단계 중 하나를 완료(여기서는 **Cron기반 일정** 선택)
    - **Rate 기반 일정인 경우**
        
        → Rate 표현식에 Rate 값을 입력하고 시간 간격(분, 시간 또는 일)을 선택
        
    - <span style="color:darkblue"><b>Cron 기반 일정인 경우</b></span>
        
        → Cron 표현식으로 함수를 실행할 일정 설정
        
6. 다음 대상선택 화면에서 **Lambda function(invoke)** 을 선택
7. 함수에서 생성해둔 Lambda 함수 선택
8. **Skip to review and create(검토 및 생성으로 건너뛰기)** 를 선택 후 **[생성]** 클릭
9. 반복하여 **시작/중지 각각 생성**

	![이벤트 생성](/assets/image/aws/img12.png)

참고 : [<span style="color:#088A85">AWS 사용설명서 : 규칙에 대한 예약 표현식 (Cron, Rate)</span>](https://docs.aws.amazon.com/ko_kr/AmazonCloudWatch/latest/events/ScheduledEvents.html)

### 5. 실행 로그 확인

1. **CloudWatch** 콘솔의 왼쪽 탐색창에서 **로그 > 로그 그룹** 선택
2. 로그를 확인할 Lambda 함수의 그룹 선택 
3. 로그로 실행여부 확인

	![로그 확인](/assets/image/aws/img13.png)

