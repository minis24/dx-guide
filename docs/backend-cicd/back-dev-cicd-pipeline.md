# Jenkins 파이프라인 설정

## Jenkins Pipeline SCM 구성

git repository에 push  

![git repository](/assets/image/back-cicd/img33.png)

```sh
https://git-codecommit.ap-northeast-2.amazonaws.com/v1/repos/dfpcen-pipeline-script
```
아래와 같이 파이프라인 구성  

## 코드커밋 설정
### 1. Credential 설정
Credential 설정은 [Jenkins 초기 설정 가이드](back-dev-cicd-jenkins-setting.md)의 [Manage Credential](back-dev-cicd-jenkins-setting.md#manage-credential-codecommit)을 참고해 설정한다.
  

### 2. 브랜치 생성 및 변경

원격저장소에서 브랜치를 생성한 후 로컬저장소의 브랜치를 새로 생성한 브랜치로 업데이트한다.  

#### 원격 저장소에서의 브랜치 생성
CodeCommit에서 "브랜치 생성" 클릭  
![브랜치생성](/assets/image/back-cicd/img35.png)
  
#### main 브랜치를 base로 신규 브랜치 생성  
![main base 브랜치 생성](/assets/image/back-cicd/img34.png)
  
#### 로컬 저장소의 브랜치 정보 확인
(-a 옵션은 지역저장소와 원격저장소의 브랜치 정보를 같이 보여줌)  
```bash
git branch -a
```
![브랜치 정보 확인](/assets/image/back-cicd/img36.png)
(*) 표시는 현재 작업중인 브랜치를 의미함
  
#### 로컬 저장소에 원격 브랜치 정보 업데이트
(새로 생성한 dev_03 브랜치가 업데이트 되었음)  
```bash
git remote update
```
![브랜치 정보 업데이트](/assets/image/back-cicd/img37.png)
  
#### 원격저장소에서 생성한 브랜치를 로컬저장소의 브랜치로 설정함
(-t 옵션으로 원격저장소에서 생성한 브랜치를 지정)
```bash
git checkout -t origin/dev_03
```
![브랜치 설정](/assets/image/back-cicd/img43.png)
  
로컬저장소를 바라보고 있는 이클립스 프로젝트의 브랜치정보도 **"dev_03"** 으로 업데이트 되었음  
![브랜치 변경](/assets/image/back-cicd/img39.png)

### 3. git pull 코드 작성

```groovy
pipeline {
    agent any

    tools {

        maven "maven3.6.3"
    }

    stages {
        stage('git_pull') {
            steps {
                git credentialsId: 'CODECOMMIT_CREDENTIAL',
                branch:'main' ,
                url: 'https://git-codecommit.ap-northeast-2.amazonaws.com/v1/repos/secu_cen_pc'
            }
        }

        stage('build') {
          steps {
                sh 'pwd'
                sh 'mvn -f secu_cen_pc/pom.xml clean install'
              	//archive '**/target/*.war'
          }
        }
    } //stages
}
```

git credentialId 항목에는 Jenkins Credential 관리에서 설정한 ID 값을 입력한다.  

![credential id](/assets/image/back-cicd/img40.png)
  
branch 값과 url은 CodeCommit 저장소에서 확인한 후 스크립트에 입력한다.  
![credential](/assets/image/back-cicd/img41.png)

### 4. Maven 빌드 설정
  
**(1) Maven 설치 (ubuntu)**
  
우선 패키지를 최신버전으로 업데이트한다.  
```bash
$ sudo apt update
```
  
그리고 Maven 설치 명령어를 입력한다.  
```bash
$ sudo apt install maven
```
  
설치가 잘 되었는지 확인한다.  
```bash
$ mvn -version
```
![mvn 확인](/assets/image/back-cicd/img42.png)

**(2) Maven 홈디렉토리**
  
ubuntu MAVEN_HOME 경로
  
<span style="color:blue">1) /etc/maven</span>  
![etc maven](/assets/image/back-cicd/img65.png)  

<span style="color:blue">2) /usr/share/maven</span>  
![share maven](/assets/image/back-cicd/img66.png)  

**(3) .setting.xml 경로 설정**  
```groovy
pipeline {
    agent any

    tools {

        maven "maven3.6.3"
    }
￼
    stages {
        stage('git_pull') {
            steps {
                git credentialsId: 'CODECOMMIT_CREDENTIAL',
                branch:'main' ,
                url: 'https://git-codecommit.ap-northeast-2.amazonaws.com/v1/repos/secu_cen_pc'
            }
        }

        stage('build') {
          steps {
                sh 'pwd'
                sh 'mvn -f secu_cen_pc/pom.xml clean install'
              	//archive '**/target/*.war'
          }
        }
    } //stages
}
```

mvn 실행 시 -s 옵션으로 settings.xml 경로 설정함.  

![xml 경로](/assets/image/back-cicd/img71.png)  

local repository 경로 설정 (settings.xml)  

![repository 경로](/assets/image/back-cicd/img67.png)  

빌드 실행결과  
![빌드 결과](/assets/image/back-cicd/img68.png)  

<다운로드 된 라이브러리들>  
![라이브러리](/assets/image/back-cicd/img69.png)  

**(4) Maven 빌드 스크립트 작성**  

![maven 빌드 스크립트](/assets/image/back-cicd/img70.png)  

  


### 5. AWS ECR PUSH

**(1) IAM 계정권한 설정**  
**ECR Public Gallery**에서 이미지를 pull하기 위해서는 먼저 **ecr-public:GetAuthorizationToken**, **sts:GetServiceBearerToken
권한을 가진 IAM User**가 있어야 한다.
  
**<span style="color:blue">아래 화면에서 "인라인 정책 추가" 클릭</span>**  

![인라인 정책 추가](/assets/image/back-cicd/img44.png)

**<span style="color:blue">아래 정책을 JSON으로 입력함</span>**  

```JSON
{
  "Version": "2012-10-17",
  "Statement": [
      {
        "Effect": "Allow",
        "Action": [
            "sts:GetServiceBearerToken"
        ],
        "Resource": "*"
      },
      {
        "Effect": "Allow",
        "Action": [
            "ecr-public:GetAuthorizationToken"
        ],
        "Resource": "*"
    	}
      ]
}
```

![정책 JSON 작성](/assets/image/back-cicd/img45.png)  
  
**<span style="color:blue">아래와 같이 정책이 추가됨.</span>**  
![정책 추가](/assets/image/back-cicd/img46.png)  
  
**<span style="color:blue">ECR Public Gallery 인증</span>**  
**IAM User**를 생성했다면 이제 **ECR Public Gallery에 인증**할 차례이다.  
그 전에 먼저 **aws configure** 명령어로 **위에서 생성한 IAM 계정을 AWS CLI에 설정**해준다.  

<span style="color:red">AWS CLI를 설치 및 구성했으면, 기본 레지스트리에 대해 Docker CLI를 인증한다.  
이렇게 하면 docker 명령이 Amazon ECR을 사용하여 이미지를 푸시하고 가져올 수 있다.  
AWS CLI는 인증 절차를 간소화하는</span> **<span style="color:blue">get-login-password</span>** <span style="color:red">명령을 제공한다.</span>  

![Docker CLI](/assets/image/back-cicd/cicd-guide51.png)
  
이미 설정되어 있으므로 `~/.aws/credential`을 확인하여 설정해준다.  

![CLI 확인](/assets/image/back-cicd/cicd-guide52.png)
  
아래 명령어로 **ECR Public Gallery에 인증**해준다. 리전은 꼭 **us-east-1로 지정**해줘야 한다.  
```bash
aws ecr-public get-login-password --region us-east-1 | 
docker login --username AWS --password-stdin public.ecr.aws
```

**ECR Private Repository 로그인**  
이미지를 가져오려는 Amazon ECR 레지스트리에 대해 Docker 클라이언트를 인증한다.  
인증 토큰은 사용되는 레지스트리마다 필요하며, 12시간동안 유효하다.  

```bash
aws ecr get-login-password --region region | 
docker login --username AWS --password-stdin aws_account_id.dkr.ecr.region.amazonaws.com
```

```bash
aws ecr get-login-password --region ap-northeast-2 | 
docker login --username AWS --password-stdin 615314566947.dkr.ecr.ap-northeast-2.amazonaws.com
```
  

<span style="color:red">Amazon ECR 인증 토큰을 docker login 명령에 전달할 때 사용자 이름으로 AWS 값을 사용하고,  
인증하려는 Amazon ECR 레지스트리 URI를 지정한다.  
여러 레지스트리에 대해 인증하는 경우 각 레지스트리에 대해 명령을 반복해야 한다.</span>  
  
![docker login](/assets/image/back-cicd/cicd-guide53.png)
  
![URI](/assets/image/back-cicd/cicd-guide54.png)
  
**(2) ECR 리파지토리 생성**  
  
**이미지 리포지토리 생성하기**  
리포지토리는 Amazon ECR에서 Docker 또는 Open Container Initiative(OCI) 이미지를 저장하는 위치이다.  
Amazon ECR에서 이미지를 푸시하거나 가져올 때마다 이미지를 푸시할 위치나 이미지를 가져올 위치를 알리는
리포지토리 및 레지스트리 위치를 지정한다.  
  
Amazon ECR 콘솔 (https://console.aws.amazon.com/ecr/)을 연다.
  
![ECR main](/assets/image/back-cicd/cicd-guide55.png)
  
위의 콘솔 화면에서 **시작하기**를 선택한다.
  
![리포지토리 생성](/assets/image/back-cicd/cicd-guide56.png)
  
1. <b>가시성 설정(Visibility settings)</b>에 대해 <span style="color:red"><b>프라이빗(Private)을 선택</b></span>한다.  
2. <b>리포지토리 이름(Repository names)</b>에서 리포지토리 이름을 지정한다.  
3. <b>태그 불변성</b>에서 리포지토리의 태그 변경 가능 설정을 선택한다.  
	변경 불가능 태그로 구성된 리포지토리는 이미지 태그를 덮어쓰는 것을 방지해준다.  
	자세한 내용은 
[이미지 태그 변경 가능성](https://docs.aws.amazon.com/ko_kr/AmazonECR/latest/userguide/image-tag-mutability.html)을(를) 참조한다.  
  
<span style="color:red"><b>이미지 스캔 기능을 비활성으로 설정</b></span>
  
![이미지 스캔 설정](/assets/image/back-cicd/cicd-guide57.png)
  
1. <b>푸시 시 스캔</b>에서 리포지토리의 이미지 스캔 설정을 선택한다.  
	푸시할 때 스캔하도록 구성된 리포지토리는 이미지가 푸시될 때마다 이미지 스캔을 시작한다.  
	이렇게 구성되지 않았다면 이미지 스캔을 수동으로 시작해야 한다.  

![이미지 스캔 중요](/assets/image/back-cicd/cicd-guide58.png)
  
이미지 스캔 : https://docs.aws.amazon.com/ko_kr/AmazonECR/latest/userguide/image-scanning.html  
  
**<span style="color:red">암호화 기능을 비활성으로 설정</span>**
  
![암호화 설정](/assets/image/back-cicd/cicd-guide59.png)
  
1. <b>KMS 암호화(KMS encryption)</b>의 경우 AWS Key Management Service에 저장된  
	AWS KMS 키를 사용하여 서버 측 암호화를 사용할지 여부를 선택한다.  
	이 기능에 대한 자세한 내용은 [저장된 데이터 암호화](https://docs.aws.amazon.com/ko_kr/AmazonECR/latest/userguide/encryption-at-rest.html) 단원을 참조한다.  
2. <b>리포지토리 생성</b>을 선택한다.  
  
**(3) AWS ECR 크리덴셜 설정**
  
[Jenkins 초기 설정](back-dev-cicd-jenkins-setting.md)의 [AWS ECR 접속 자격증명 설정](back-dev-cicd-jenkins-setting.md#manage-credential-aws-ecr)을 참조한다. 
  
**(4) AWS ECR에 이미지 푸시**
  
아래와 같이 jenkins 파이프라인 구성
  
![jenkins pipeline](/assets/image/back-cicd/cicd-guide60.png)
  
AWS ECR 확인
  
![AWS ECR sample](/assets/image/back-cicd/cicd-guide61.png)
  
**커맨드로 push**
  
(1) 인증 (get-login-password)  
```bash
aws ecr get-login-password --region region | 
docker login --username AWS --password-stdin aws_account_id.dkr.ecr.region.amazonaws.com
```
  
```bash
aws ecr get-login-password --region ap-northeast-2 | 
docker login --username AWS --password-stdin 615314566947.dkr.ecr.ap-northeast-2.amazonaws.com
```
  
(2) tag 명령어로 빌드된 이미지명 변경  
```bash
docker tag e9ae3c220b23 aws_account_id.dkr.ecr.region.amazonaws.com/my-repository:tag
```
  
```bash
docker tag dfpcen-create-jenkins-image-jenkins 615314566947.dkr.ecr.ap-northeast-2.amazonaws.com/dfpcen-jenkins:latest
```
  
(3) 이미지 Push 실행
  
```bash
docker push aws_account_id.dkr.ecr.region.amazonaws.com/my-repository:tag
```
  
```bash
docker push 615314566947.dkr.ecr.ap-northeast-2.amazonaws.com/dfpcen-jenkins:latest
```

**(5) Amazon ECR 리포지토리에서 Docker 이미지를 가져오려면**
  
![AWS ECR image push](/assets/image/back-cicd/cicd-guide62.png)
  
https://docs.aws.amazon.com/ko_kr/AmazonECR/latest/userguide/docker-pull-ecr-image.html
  
1. 이미지를 가져오려는 Amazon ECR 레지스트리에 대해 Docker 클라이언트를 인증한다.  
	인증 토큰은 사용되는 레지스트리마다 필요하며, 12시간동안 유효하다.  
	자세한 정보는 [프라이빗 레지스트리 인증](https://docs.aws.amazon.com/ko_kr/AmazonECR/latest/userguide/registry_auth.html)을 참조한다.  

```bash
aws ecr get-login-password --region region | 
docker login --username AWS --password-stdin aws_account_id.dkr.ecr.region.amazonaws.com
```

```bash
aws ecr get-login-password --region ap-northeast-2 | 
docker login --username AWS --password-stdin 615314566947.dkr.ecr.ap-northeast-2.amazonaws.com
```

![private registry](/assets/image/back-cicd/cicd-guide63.png)
  
2. <b>docker pull</b> 명령을 사용하여 이미지를 풀링한다.  
	이미지 이름 형식은 태그를 기준으로 가져오는 경우 `registry/repository[:tag]`,  
	다이제스트를 기준으로 가져오는 경우 `registry/repository[@digest]`이다.  

```bash
docker pull aws_account_id.dkr.ecr.us-west-2.amazonaws.com/amazonlinux:latest
```

```bash
docker pull 615314566947.dkr.ecr.ap-northeast-2.amazonaws.com/dfpcen_sampleapp:latest
```

![image pull](/assets/image/back-cicd/cicd-guide64.png)


### 6. 도커 이미지로 빌드

**- 추가 플러그인 설치**
  
![plugins](/assets/image/back-cicd/cicd-guide66.png)
  
실제로 아래의 플러그인이 설치된다.  

![list](/assets/image/back-cicd/cicd-guide65.png)
  
jenkins 파이프라인으로 아래와 같이 구성
  
![pipeline code](/assets/image/back-cicd/cicd-guide67.png)

**<span style="color:red">미리 도커 허브 접속 자격증명 설정을 먼저 해둔다.</span>**  
도커 허브 접속 자격증명 설정은 [Jenkins 초기 설정](back-dev-cicd-jenkins-setting.md)의 [도커허브 접속 자격증명 설정](back-dev-cicd-jenkins-setting.md#manage-credential-docker-hub)을 참조한다.  

  
### Jenkins Pipeline 작성
  
스크립트 작성
  
![pipeline script1](/assets/image/back-cicd/cicd-guide68.png)
![pipeline script2](/assets/image/back-cicd/cicd-guide69.png)
![pipeline script3](/assets/image/back-cicd/cicd-guide70.png)
![pipeline script4](/assets/image/back-cicd/cicd-guide71.png)