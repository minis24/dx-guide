# 2. 도커 컨테이너 생성 (DOCKER-COMPOSE)  
  

도커 컴포즈는 컨테이너를 프로젝트 및 서비스 단위로 구분하므로  
아래의 명명규칙으로 컨테이너가 생성된다.  
**<span style="color:red">[프로젝트명] _ [서비스명] _ [서비스내에서의 컨테이너의 번호]</span>**  

이 때, 프로젝트명은 아무런 설정을 하지 않으면 디폴트로 <span style="color:red">현재 디렉토리명</span>으로 설정된다.  
```sh
docker ps -a
```
![도커 컨테이너](/assets/image/back-cicd/cicd-guide6.png)  

  

## 2.1 docker-compose 파일 작성  
**docker-compose.yml**  

![compose yml](/assets/image/back-cicd/cicd-guide7.png)  
```bash
version: 3
#----------------------------------------------------------------------------
# 실행 커맨드
#----------------------------------------------------------------------------
# 아래와 같이 실행 커맨드 앞에 파라미터를 전달한다.
# HOST_DOCKER_GID=$(stat -c "%g" /var/run/docker.sock) docker-compose up -d


services:
  jenkins:

    build:
      context: ../Dockerfile
      dockerfile: Dockerfile
      args: 
        - HOST_DOCKER_GID=${HOST_DOCKER_GID}
    restart: always

#    image: minis24/jenkins:1.0.8
    ports:
      - "8090:8080"
      - "50000:50000"

    expose:
      - "8090"
      - "50000"


    volumes:
      - jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
        TZ: "Asia/Seoul"


volumes:
  jenkins_home:
    name: jenkins_home
    external: true
```
  
![compose yml cmd](/assets/image/back-cicd/cicd-guide8.png)  
  
**external**: 도커 컴포즈는 YAML 파일에서 volume, volumes_from 옵션을 사용하면  
프로젝트마다 다른 볼륨을 생성한다.  
이 때, external 옵션을 설정하면 볼륨을 프로젝트를 생성할 때마다 매번 생성하지 않고,  
기존 볼륨을 사용하도록 설정한다.  
  
```bash
 volumes:
   myvolume:
    external:true
```
  
## 2.2 docker-compose up -d 명령으로 컨테이너 기동  

**<span style="color:blue"># HOST_DOCKER_GID=$(stat -c "%g" /var/run/docker.sock) docker-compose up -d</span>**  
(Dockerfile 빌드시 Argment 전달)  

![up-d](/assets/image/back-cicd/cicd-guide9.png)  

  
## 2.3 생성된 도커볼륨 마운트 확인  
![마운트 확인](/assets/image/back-cicd/cicd-guide10.png)  
