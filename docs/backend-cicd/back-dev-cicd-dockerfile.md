# JENKINS 이미지 생성 (DOCKERFILE)  

## 1. Jenkins 공식 이미지(Docker Hub) 내려받기
* [URL: https://hub.docker.com/r/jenkins/jenkins](https://hub.docker.com/r/jenkins/jenkins)  
* 터미널에서 다음 명령어 중 하나 실행  

```bash
docker pull jenkins/jenkins
docker pull jenkins/jenkins:lts-jdk11
```

LTS버전이 반영주기가 상대적으로 늦지만 안정적이라고 평가한다.  

![image pull](/assets/image/back-cicd/cicd-guide1.png)

### 내려받은 이미지 확인
```bash
docker images
```
![docker images](/assets/image/back-cicd/img49.png)

## 2. Docker로 jenkins container 기동

### (1) Dockerfile 이용

* [Amazon EC2](https://aws.amazon.com/ko/ec2/) 로그인 후 사용할 인스턴스를 생성하고 `.pem` 프라이빗 키 파일이 있는 파일 경로에서 다음과 같이 명령어를 입력해 인스턴스에 연결한다.
  
![EC2 연결1](/assets/image/back-cicd/img47.png)
  
![EC2 연결2](/assets/image/back-cicd/img48.png)
  
* 임의의 특정 폴더를 생성한 뒤 'Dockerfile'을 생성한다.  
* 'Dockerfile' 작성 시 `[FROM]`옵션에서 베이스이미지를 설정한다.  
	(ex. jenkins/jenkins:lts-jdk11)

![docker file root](/assets/image/back-cicd/img50.png)

```bash
vi Dockerfile  
```

```bash
#-----------------------------------------------------------------------------
# Dockerfile (jenkins 2.385 in debian)
# ver.1.0.0 by jangkwan kim
# 아래 항목 추가.
# docker
# maven
# Aws Corretto jdk 11
# util : telnet ,net-tools ,wget
#-----------------------------------------------------------------------------

FROM jenkins/jenkins:2.385
LABEL email="jkkim@secucen.com"
LABEL name="kim jangkwan"
LABEL version="1.0"
LABEL description="DFPCEN Cloud Jenkins Docker image"


USER root

ENV DEBCONF_NOWARNINGS yes
ENV DEBIAN_FRONTEND noninteractive

ARG HOST_DOCKER_GID

RUN echo "#--------------------------------------------------------" && \
    echo "## apt-get update " && \
    echo "#--------------------------------------------------------" && \
    apt-get update && \
    echo "#--------------------------------------------------------" && \
    echo "## wget 설치" && \
    echo "#--------------------------------------------------------" && \
    apt-get install wget -y && \
		echo "#--------------------------------------------------------" && \
    echo "## OpenJDK(*Corretto 11) 설치" && \
    echo "#--------------------------------------------------------" && \
    wget -O- https://apt.corretto.aws/corretto.key | apt-key add - && \
    apt-get -y install software-properties-common && \
    add-apt-repository 'deb https://apt.corretto.aws stable main' && \
    apt-get update && \
    apt-get install -y java-11-amazon-corretto-jdk && \
    echo "#--------------------------------------------------------" && \
    echo "## Maven 설치" && \
    echo "#--------------------------------------------------------" && \
    apt-get install -y maven  && \
    echo "#--------------------------------------------------------" && \
    echo "## net-tools 설치" && \
    echo "#--------------------------------------------------------" && \
    apt-get install -y net-tools && \
    echo "#--------------------------------------------------------" && \
    echo "## telnet 설치" && \
    echo "#--------------------------------------------------------" && \
    apt-get install -y telnet && \
    echo "#--------------------------------------------------------" && \
    echo "## docker 설치" && \
    echo "#--------------------------------------------------------" && \
    curl -s https://get.docker.com/ | sh && \
    echo "#--------------------------------------------------------" && \
    echo "## groupmod:${HOST_DOCKER_GID}" && \
    echo "## groupmod:$HOST_DOCKER_GID" && \
    echo "#--------------------------------------------------------" && \
    groupmod -g ${HOST_DOCKER_GID} docker && \
    usermod -aG docker jenkins

USER jenkins

ENV JAVA_HOME=/usr/lib/jvm/java-11-amazon-corretto
ENV MAVEN_HOME=/usr/share/maven
ENV PATH=$JAVA_HOME/bin:$MAVEN_HOME/bin:$PATH
```

### docker.sock 파일의 실행권한 해결  

**docker in docker의 Permission denied 문제 해결**  
도커 컨테이너 안에서 도커를 사용하는 방법은 Host의 /var/run/docker.sock를  
컨테이너에서 bind mount하면 된다.  
쉽게 설명해 docker run할 때 아래처럼 -v /var/run/docker.sock:/var/run/docker.sock  
옵션을 주면 된다는 뜻이다. 물론 컨테이너 안에는 도커가 설치되어 있어야 한다.  
  
이 문제의 해결 방법으로 사람들이 이야기하는 방법은  
<span style="background-color:#FFF5B1">chown으로 컨테이너 내부에서 owner를 root:docker 로 바꾸고 사용하는 방법,  
또는 chmod로 아예 a+rw 를 주는 방법</span>을 이야기하는데,  
  
chown으로 owner를 바꾸면 컨테이너 외부의 호스트 파일의 소유자 정보도 바뀌는 문제가 있다.  
위의 docker의 gid가 컨테이너에서는 999, 호스트에서는 134인 경우에 컨테이너에서  
chown root:docker를 해보면 호스트에서 gid가 999인 그룹에 속한 파일로 나온다.  
즉, 호스트의 도커 실행 환경에 문제가 생긴다.  

![permission denied](/assets/image/back-cicd/cicd-guide3.png)
  


### Dockerfile로 Image 생성  
```bash
docker build --build-arg HOST_DOCKER_GID=$(stat -c "%g" /var/run/docker.sock) -t sjk/jenkins .
```
**넘길 arg가 2개 이상일 땐** 각각 `--build-arg` 를 선언해줘야 한다.  
입력 후 `docker images` 명령어로 확인한다.

* **HOST_DOCKER_GID=$(stat -c "%g" /var/run/docker.sock)**  
'Dockerfile'에 넘길 인자값을 세팅  
해당 인자값으로 컨테이너 내부에 '호스트그룹아이디' 로 'docker'라는 이름의 그룹을 만들고
'jenkins' 유저를 그 그룹에 속하게 함으로써, 젠킨스 job에서 직접 도커 명령어 사용권한이 생긴다.  

**Dockerfile로 container 생성 및 실행**
```bash
docker run -d -p 9092:8080 -v /var/run/docker.sock:/var/run/docker.sock -v /jenkins/var/jenkins_home --name sjk-jenkins -u root shlee2/jenkins
```

* **-v /var/run/docker.sock:/var/run/docker.sock**  
젠킨스 컨테이너에서 플러그인으로 도커 빌드하기 + 컨테이너 내부에서 도커 명령어 사용하기
  
### 명령어 옵션 설명

|    명령어    |                      설명                          |
| :---------: | :------------------------------------------------: |
|      -d     |      detached mode 흔히 말하는 백그라운드 모드       |
|      -p     |      호스트와 컨테이너의 포트를 연결 (포워딩)         |
|      -v     |      호스트와 컨테이너의 디렉토리를 연결 (마운트)      |
|   --name    |                  컨테이너 이름 설정                  |
|      -u     |                  실행할 사용자 지정                  |
  

`--name` 옵션을 사용하지 않으면 임의의 name이 부여된다.  

이미 생성된 컨테이너의 이름을 바꾸고 싶으면 `docker rename [현재 이름] [바꿀 이름]`  
명령어로 변경한다. 컨테이너명을 변경해도 컨테이너 ID는 변경되지 않는다.  
  
'jenkins/jenkins' 해당 레포지토리 이미지가 없을 경우 docker hub에서 가져오니 주의.  
한 번 가져온 이미지는 재사용이 가능하다.
  
### (2) docker-compose 이용
[도커 컨테이너 생성](back-dev-cicd-compose.md) 항목 참조 
  
[참조문서] [Docker in Docker](https://postlude.github.io/2020/12/26/docker-in-docker/)




## 3. 실행중인 컨테이너 확인
```bash
docker ps
```

![실행중 컨테이너](/assets/image/back-cicd/img51.png)
  

|    항목    |                      설명                          |
| :---------: | :------------------------------------------------: |
|      CONTAINER ID     |      컨테이너에 할당되는 고유한 컨테이너 ID <br> 전체 ID에서 12자리만 출력       |
|      IMAGE     |      컨테이너를 생성할 때 사용된 이미지         |
|      COMMAND     |      컨테이너가 시작될 때 실행될 명령어 <br> `docker run`이나 `docker create` 명령어의 맨 끝에 새로운 명령어를 <br> 입력해서 컨테이너를 생성할 때 대체 가능      |
|    CREATED    |                  컨테이너 생성 후 경과 시간                  |
|      STATUS     |                  컨테이너의 상태 <br> 실행 중(Up), 종료(Exited), 일시 중지(Pause)                  |
|      PORTS     |                  컨테이너가 개방한 포트와 호스트에 연결된 포트                  |

## 4. 설정한 포트로 접속하여 'jenkins' 확인 및 설치

* AWS 인스턴스 > 보안그룹 - 인바운드 규칙 > 인바운드 규칙 편집 > 규칙 추가 (ex.9092)  

![인스턴스](/assets/image/back-cicd/img52.png)  
![인바운드 규칙](/assets/image/back-cicd/img53.png)  
![인바운드 규칙 추가](/assets/image/back-cicd/img54.png)  
![인바운드 규칙 확인](/assets/image/back-cicd/img55.png)  

* AWS 인스턴스 > 퍼블릭 IPv4 DNS:9092 접속  

![네트워킹 세부 정보](/assets/image/back-cicd/img56.png)
  
* Jenkins 최초 Unlock  

![패스워드 입력](/assets/image/back-env/img29.png)
  
<span>(1) 컨테이너 bash 열기</span>
```bash
docker exec -it sjk-jenkins /bin/bash [컨테이너 ID or 컨테이너 Name]
```

컨테이너 ID 또는 컨테이너 Name을 잘 확인하여 입력할 것  

![컨테이너 bash](/assets/image/back-cicd/img57.png)


<span>(2) 패스워드 확인</span>
* 설치시 필요한 initialAdminPassword는 아래 명령어 또는 경로를 통해 확인 가능하다.  
```bash
$ docker logs jenkins
```
```bash
cat /var/jenkins_home/secrets/initialAdminPassword
```

![패스워드 확인](/assets/image/back-cicd/img60.png)
  
* 플러그인 설치  
* 계정 생성  

![계정 생성](/assets/image/back-cicd/img58.png)
  

* 인스턴스 설정  
EC2 인스턴스 퍼블릭 IPv4 DNS:port number 동일한지 확인할 것  

![port number 확인](/assets/image/back-cicd/img59.png)
  
## 5. Jenkins 초기 설정

* 플러그인 추가 설치  
**Dashboard > Jenkins 관리 > 플러그인 관리 > Available plugins**  

![dashboard](/assets/image/back-cicd/cicd-guide23.png)  
![플러그인 관리](/assets/image/back-cicd/cicd-guide24.png)  

<b>1. Amazon ECR plugin  
	2. AWS Global Configuration plugin  
	3. docker  
	4. docker-build-step</b>  

각각 검색 후 Install  

![available plugins](/assets/image/back-cicd/img62.png)  


* Global Tool Configuration  
**Dashboard > Jenkins 관리 > Global Tool Configuration**  

![Global Tool Configuration](/assets/image/back-cicd/cicd-guide29.png)
  
경로는 dockerfile ENV 설정 기준  

(1) JDK  
Name : openjdk_corretto_11  
JAVA_HOME : /usr/lib/jvm/java-11-amazon-corretto  

(2) Maven  
Name : maven  
MAVEN_HOME : /usr/share/manven
  
* Jenkins credentials 추가  

(1) [CodeCommit](back-dev-cicd-jenkins-setting.md#manage-credential-codecommit)  
(2) [AWS ECR](back-dev-cicd-jenkins-setting.md#manage-credential-aws-ecr)  
(3) [dockerhub](back-dev-cicd-jenkins-setting.md#manage-credential-docker-hub)  
  
## 6. Jenkins 파이프라인 생성

**Dashboard > + 새로운 Item > 이름 정한 뒤 pipeline 선택**  

![새로운 아이템](/assets/image/back-cicd/img61.png)  
![pipeline](/assets/image/back-cicd/img63.png)  

**Configure > Pipeline**  

![Configuration pipeline](/assets/image/back-cicd/img64.png)  

* Definition: Pipeline script from SCM / Git 선택  
* Repositories URL: CodeCommit - 레파지토리의 git http url 입력  
* Credentials: CodeCommit 자격증명 선택  
* Branches to build: 브랜치 이름 확인 및 수정 (ex. */main)  
* Script Path (default: Jenkinsfile):  
	파이프라인 스크립트명 "jenkins-pipeline-script-dfpcen-admin"  

## 7. Jenkins 빌드  
* 지금 빌드 하면 끝

