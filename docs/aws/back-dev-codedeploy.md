# CodeDeploy 가이드

## 1. appspec.yml 스펙

```sh
https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/application-revisions-appspec-file.html
```

![EC2 AppSpec](/assets/image/back-cicd/img72.png)
  
**<span style="color:red">appspec.yml 작성</span>**  
```yaml
version: 0.0
os: linux

#--------------------------------------------------------------
#appspec.yml이 있는 디렉터리의 루트부터 있는 모든 파일을 현 EC2 Instance의 destination 아래에 모두 설치
#--------------------------------------------------------------
files:
  - source: /
    destination: /home/ec2-user/codedeploy


hooks:
#--------------------------------------------------------------
#docker build 및 push 까지는 Jenkins 또는 Terminal 작업 후 진행하기 때문에 BeforeInstall Option만 사용
#--------------------------------------------------------------
#  BeforeInstall:
#    - location: scripts/codedeploy_dfpcen_api_pilot.sh

  AfterInstall:
    - location: scripts/codedeploy_dfpcen_api_pilot.sh
#      timeout: 300
#      runas: root
#  ApplicationStart:
#    - location: scripts/start_server.sh
#    - location: scripts/create_test_db.sh
#      timeout: 300
#      runas: root
#  ApplicationStop:
#    - location: scripts/stop_server.sh
#      timeout: 300
#      runas: root
```

* `#appspec.yml`이 있는 디렉토리의 루트부터 있는 모든 파일을 현  EC2 Instance의  destination 아래에 모두 설치  
```yaml
#--------------------------------------------------------------
files:
  - source: /
    destination: /home/ec2-user/codedeploy


hooks:
#--------------------------------------------------------------
#docker build 및 push 까지는 Jenkins 또는 Terminal 작업 후 진행하기 때문에 BeforeInstall Option만 사용
#--------------------------------------------------------------
#  BeforeInstall:
#    - location: scripts/codedeploy_dfpcen_api_pilot.sh

  AfterInstall:
    - location: scripts/codedeploy_dfpcen_api_pilot.sh
#      timeout: 300
#      runas: root
#  ApplicationStart:
#    - location: scripts/start_server.sh
#    - location: scripts/create_test_db.sh
#      timeout: 300
#      runas: root
#  ApplicationStop:
#    - location: scripts/stop_server.sh
#      timeout: 300
#      runas: root
```
  

![yml option](/assets/image/back-cicd/img73.png)

## 2. 배포실행 스크립트 작성

<span style="color:red"><b>codedeploy_dfpcen_api_pilot.sh 작성</b></span>  

```sh
DATE_STR=$(date "+%Y%m%d_%H%M%S")

#---------------------------------------------------------------
## AWS ECR 로그인 
#---------------------------------------------------------------
echo "1> aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 615314566947.dkr.ecr.ap-northeast-2.amazonaws.com" >> /home/ec2-user/codedeploy/logs/deploy_$DATE_STR.log
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 615314566947.dkr.ecr.ap-northeast-2.amazonaws.com


#---------------------------------------------------------------
## 실행중인 컨테이너 PID 확인
#---------------------------------------------------------------
echo "2> 현재 실행 중인 Docker 컨테이너 pid 확인" >> /home/ec2-user/codedeploy/logs/deploy_$DATE_STR.log
CURRENT_PID=$(sudo docker container ls -q --filter name=dfpcen-api-pilot)

#---------------------------------------------------------------
# 컨테이너 중지 및 삭제
#---------------------------------------------------------------
# 컨테이너 기동여부 확인 - PID 길이가 0인 경우로 체크 ( -z $VALUE 와 같이 씀)
if [ -z $CURRENT_PID ]
then
  echo "3> 현재 구동중인 Docker 컨테이너가 없으므로 종료하지 않습니다."  >> /home/ec2-user/codedeploy/logs/deploy_$DATE_STR.log
else
  echo "3-1> sudo docker stop $CURRENT_PID"  >> /home/ec2-user/codedeploy/logs/deploy_$DATE_STR.log
  sudo docker stop $CURRENT_PID

  echo "3-2> sudo docker rm $CURRENT_PID" >> /home/ec2-user/codedeploy/logs/deploy_$DATE_STR.log
  sudo docker rm $CURRENT_PID
  sleep 5
fi

#---------------------------------------------------------------
# 컨테이너 기동
#---------------------------------------------------------------
echo "4> sudo docker run -d --name dfpcen-api-pilot -p 8088:8088 615314566947.dkr.ecr.ap-northeast-2.amazonaws.com/dfpcen-api-pilot:latest" >> /home/ec2-user/codedeploy/logs/deploy_$DATE_STR.log
sudo docker run -d --name dfpcen-api-pilot -p 8088:8088 615314566947.dkr.ecr.ap-northeast-2.amazonaws.com/dfpcen-api-pilot:latest
sleep 5

#---------------------------------------------------------------
# 미사용중인 컨테이너 이미지 삭제 
#---------------------------------------------------------------
echo "4> yes | sudo docker image prune -a"  >> /home/ec2-user/codedeploy/logs/deploy_$DATE_STR.log
yes | sudo docker image prune -a
```

## 3. 개정 업로드

### Step3. S3에 개정파일 업로드

appspec.yml 파일, 배포 실행스크립트를 S3에 업로드.  
S3는 zip, tar 형식만 지원하므로 zip으로 압축해서 업로드.  

(1) 압축  
<span style="color:blue">➜ zip codedeploy-dfpcen-api-pilot.zip appspec.yml scripts/*  
➜ zip codedeploy-dfpcen-dx-guide.zip appspec.yml codedeploy-scripts/*
</span>

(2) S3 업로드  
<span style="color:blue">➜ aws s3 cp ./codedeploy-dfpcen-api-pilot.zip s3://codedploy-dfpcen  
➜ aws s3 cp ./codedeploy-dfpcen-dx-guide.zip s3://codedploy-dfpcen</span>
  
![S3 업로드](/assets/image/back-cicd/img75.png)
  
### S3 버킷에 업로드된 결과
  
![S3 업로드 결과](/assets/image/back-cicd/img76.png)

## 4. EC2에 CodeDeploy Role 부여

### (1) 역할 생성

![역할 생성](/assets/image/back-cicd/img77.png)

### (2) 역할 부여

![역할 부여](/assets/image/back-cicd/img78.png)

## 5. CodeDeploy EC2 Agent 설치

codedeploy agent 설치  
Amazon linux 2  

```bash
sudo yum update
sudo yum install ruby -y
sudo yum install wget -y
```

이전 에이전트 캐싱 정보의 AMI를 정리하려면 다음 스크립트를 실행한다.  
```bash
#!/bin/bash
CODEDEPLOY_BIN="/opt/codedeploy-agent/bin/codedeploy-agent"
$CODEDEPLOY_BIN stop
yum erase codedeploy-agent -y
```

```bash
wget https://bucket-name.s3.region-identifier.amazonaws.com/latest/install
```

```bash
wget https://aws-codedeploy-ap-northeast-2.s3.ap-northeast-2.amazonaws.com/latest/install
```

bucket-name은 해당 리전의 CodeDeploy 리소스 키트 파일이 포함되어 있는 Amazon S3  
버킷의 이름이다. region-identifier는 리전의 식별자이다.  
예를 들어, 미국 동부(오하이오) 리전의 경우 bucket-name을 aws-codedeploy-us-east-2로  
바꾸고 region-identifier를 us-east-2로 바꾼다.  
버킷 이름 및 리전 식별자 목록은 [리전별 리소스 키트 버킷 이름](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/resource-kit.html#resource-kit-bucket-names) 단원을 참조한다.  

```bash
chmod +x ./install
```

최신 버전의 CodeDeploy 에이전트를 설치하려면 다음을 수행한다.  

```bash
sudo ./install auto
```

특정 버전의 CodeDeploy 에이전트를 설치하려면 다음을 수행한다.  
  
(1) 해당 리전에서 사용 가능한 버전을 나열한다.  
```bash
aws s3 ls s3://aws-codedeploy-region-identifier/releases/ | grep '\.rpm$'
```

(2) 다음 버전 중 하나를 설치한다.  
```bash
sudo ./install auto -v releases/codedeploy-agent-###.rpm
```

서비스가 실행 중인지 확인하려면 다음 명령을 실행한다.  
```bash
sudo service codedeploy-agent status
```

![서비스 확인](/assets/image/back-cicd/img79.png)

```bash
sudo service codedeploy-agent start
```

![리전별 bucket-name](/assets/image/back-cicd/img80.png)

## CodeDeploy 에러 목록

### 1. Missing credentials
에러 메시지: InstanceAgent::Plugins::CodeDeployPlugin::CommandPoller: Missing credentials - please check if this instance was started with an IAM instance profile  

![missing credentials](/assets/image/back-cicd/img81.png)

<span style="color:red">해당 에러가 발생하게 된 원인은 아래와 같다.</span>  
1. IAM 역할을 지정하지 않고 인스턴스를 실행시킨다.  
2. 이후 실행시킨 인스턴스에 CodeDeploy Agent를 설치한다.  
3. 이 때 설치된 CodeDeploy에는 해당 역할을 실행할 수 있는 자격증명이 없기에 위와 같은 에러가 발생하는 것이다.  

### 해결법
CodeDeploy Agent를 다시 실행시키면 된다.  
```bash
sudo service codedeploy-agent restart
```

## 6. CodeDeploy용 역할 생성

![CodeDeploy용 역할 생성 및 지정](/assets/image/back-cicd/img82.png)

## 7. CodeDeploy 배포그룹 생성

### (1) 애플리케이션 생성

![애플리케이션 생성](/assets/image/back-cicd/img83.png)
![애플리케이션 구성](/assets/image/back-cicd/img84.png)

### (2) 배포그룹 생성

![배포 그룹 이름](/assets/image/back-cicd/img85.png)

배포 그룹 이름 입력, 미리 만들어둔 CodeDeploy 서비스 역할을 설정  
현재 위치에서 배포방법 설정
  
![서비스 역할](/assets/image/back-cicd/img86.png)
  
EC2 인스턴스 추가  
Name 태그로 인스턴스를 설정해줌
  
![환경 구성](/assets/image/back-cicd/img87.png)
  
배포그룹 생성  
(로드밸런서 없는 경우 테스트 환경에서는 로드밸런서를 비활성화 함)  

![배포 설정](/assets/image/back-cicd/img88.png)

## 8. CodeDeploy 배포생성

애플리케이션 > 배포 탭에서 "배포만들기" 클릭  

![배포 만들기](/assets/image/back-cicd/img89.png)
  
위에서 만든 배포그룹을 선택하고  
개정위치를 S3 버킷과 압축해서 업로드한 개정파일을 설정한다.  

![개정파일 배포 설정](/assets/image/back-cicd/img90.png)
  
배포만들기 클릭  

![배포 만들기 상세](/assets/image/back-cicd/img91.png)

## 9. CodeDeploy EC2 배포 (S3, Docker 배포)

### Step1. Spring boot Application 생성
먼저 배포할 샘플 애플리케이션을 생성할 것이다.  
--> 이미 생성되어 있음

### Step2. Application Docker Build 후 ECR Push
--> jenkins에서 빌드 후 ECR push 완료  

![ECR Push](/assets/image/back-cicd/img92.png)  

![settings](/assets/image/back-cicd/img93.png)  

**<span style="color:red">위의 AWS_ACCESS_KEY_ID와 AWS_SECRET_ACESS_KEY로  
아래의 aws deploy 명령어를 실행한다.</span>**

![aws deploy 명령어](/assets/image/back-cicd/img94.png)

## 10. CodeDeploy 로그
```bash
less /opt/codedeploy-agent/deployment-root/deployment-group-ID/deployment-ID/logs/scripts.log
less /opt/codedeploy-agent/deployment-root/dfpcen-adm-group/d-AUPCZ7ILL/logs/scripts.log
less /opt/codedeploy-agent/deployment-root/dfpcen-dx-guide-group/d-C7H59CNQL/logs/scripts.log

tail -f /opt/codedeploy-agent/deployment-root/
```

### CodeDeploy 로그 위치
Amazon Linux 2
경로: /var/log/aws/codedeploy-agent/codedeploy-agent.log

```bash
tail -f /opt/codedeploy-agent/deployment-root/deployment-logs/codedeploy-agent-deployments.log
```

