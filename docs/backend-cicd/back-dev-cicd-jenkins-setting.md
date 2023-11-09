# Jenkins 초기 설정 가이드

## Jenkins 컨테이너 관리자 로그인

[DFPCEN Jenkins: http://cicd.dfpcen.com/](http://cicd.dfpcen.com/)
  
![Loginform](/assets/image/back-cicd/cicd-guide22.png)
  
## 추가 Plugin 설치
  
**[사이드바 메뉴] > [Jenkins 관리] > [플러그인 관리]**
  
![jenkins list](/assets/image/back-cicd/cicd-guide23.png)

![plugin list](/assets/image/back-cicd/cicd-guide24.png)

설치 유무 확인 후 설치되어 있지 않을 시 Available plugins에서 search 후 install
![plugins menu](/assets/image/back-cicd/cicd-guide25.png)

**docker pipeline**  
![docker pipeline](/assets/image/back-cicd/cicd-guide26.png)
  
**AWS ECR**  
![AWS ECR](/assets/image/back-cicd/cicd-guide27.png)
  
```sh
615314566947.dkr.ecr.ap-northeast-2.amazonaws.com/dfpcen_sampleapp:latest
```

## Global Tool 설정
<h3><span style="color:blue">참조: jenkins 도커 컨테이너 이미지 생성시 아래의 환경변수를 설정함.</span></h3>

```bash
ENV JAVA_HOME=/usr/lib/jvm/java-11-amazon-corretto
ENV MAVEN_HOME=/usr/share/maven
ENV PATH=$JAVA_HOME/bin:$MAVEN_HOME/bin:$PATH
```

![ENV setting](/assets/image/back-cicd/cicd-guide28.png)
  
### 1. JAVA_HOME 설정
  
**[사이드바 메뉴] > [Jenkins 관리] > [Global Tool Configuration]**
  
![java home setting1](/assets/image/back-cicd/cicd-guide30.png)

![java home setting2](/assets/image/back-cicd/cicd-guide29.png)
  
```sh
Name : openjdk_corretto_11  
JAVA_HOME : /usr/lib/jvm/java-11-amazon-corretto
```
**JDK**
![jdk installations](/assets/image/back-cicd/cicd-guide31.png)
  

### 2. MAVEN_HOME 설정
  
```sh
Name : maven
MAVEN_HOME : /usr/share/maven
```

**MAVEN**
![maven installations](/assets/image/back-cicd/cicd-guide32.png)

## Manage Credential (Docker hub)
<h3><span style="color:red">도커허브 접속 자격증명 설정</span></h3>
  
**[Jenkins 관리] > [Manage Credential]**

![manage credential](/assets/image/back-cicd/cicd-guide33.png)
  
`(global)` 클릭

![manage credential](/assets/image/back-cicd/cicd-guide34.png)
  
`+ Add Credentials` 클릭

![add credentials](/assets/image/back-cicd/cicd-guide35.png)
  
Username with password 선택  
ID는 파이프라인 스크립트에서 식별하기 위한 값이므로 유니크하고 가독성있는 값으로 설정한다.  

![username with password](/assets/image/back-cicd/cicd-guide36.png)
  
**<span style="color:red">Username과 Password값은 도커허브 사이트에서 자격증명을 확인하여 입력한다.</span>**

```sh
Username: Docker hub 아이디
Password: docker hub access key
```
**<span style="color:blue">Docker access key(token)은 [Docker hub](https://hub.docker.com/) [Account Settings] - [Security]에서  
	New Access Token을 클릭해 얻을 수 있음</span>**

![Account settings](/assets/image/back-cicd/cicd-guide37.png)
  
New Access Token 버튼을 클릭  

![new access token](/assets/image/back-cicd/cicd-guide38.png)

![token description](/assets/image/back-cicd/cicd-guide39.png)

![token result](/assets/image/back-cicd/cicd-guide41.png)

```sh
// ACCESS TOKEN
dckr_pat_1GEUruR-S2k8huwcGGMB0V_JgHM
```

## Manage Credential (CodeCommit)
<h3><span style="color:red">AWS CodeCommit 접속 자격증명 설정</span></h3>
  
**[Jenkins 관리] > [Manage Credentials]**
  
![jenkins 관리 메뉴](/assets/image/back-cicd/cicd-guide42.png)
![manage credentials](/assets/image/back-cicd/cicd-guide43.png)
  
(global) 클릭
  
![click global btn](/assets/image/back-cicd/cicd-guide44.png)
  
`+ Add Credentials` 클릭
  
![manage credentials](/assets/image/back-cicd/cicd-guide45.png)
  
Username with password 선택  
ID는 파이프라인 스크립트에서 식별하기 위한 값이므로 유니크하고 가독성있는 값으로 설정한다.  

![username](/assets/image/back-cicd/cicd-guide46.png)
  
Username과 Password 값을 AWS CodeCommit에서 자격증명을 확인하여 입력한다.  

![AWS Codecommit 자격증명](/assets/image/back-cicd/cicd-guide47.png)

## Manage Credential (AWS ECR)
<h3><span style="color:red">AWS ECR 접속 자격증명 설정</span></h3>
  
AWS IAM에서 Access Key를 생성 후 Manage 메뉴로 이동한다.  
![AWS IAM AccessKey](/assets/image/back-cicd/cicd-guide48.png)
  
Kind를 AWS Credentials로 변경한다.
![AWS Credentials](/assets/image/back-cicd/cicd-guide49.png)
  
Access Key, Secret Key 입력
![Key 입력](/assets/image/back-cicd/cicd-guide50.png)