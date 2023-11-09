# 4. 도커 볼륨 복원  
  
## 4.1 복원 대상 컨테이너 생성  
```bash
docker volume create jenkins_home
docker-compose up -d 
```
![복원 대상 컨테이너 생성](/assets/image/back-cicd/cicd-guide17.png)  
  
alias로 설정 dcup 실행하고  
컨테이너 생성 확인  
여기서는 **<span style="color:blue">jenkins-jenkins-1</span>**  

![컨테이너 생성 확인](/assets/image/back-cicd/cicd-guide18.png)  

복원대상 volume을 사용하는 컨테이너 중지  
```bash
docker stop jenkins-jenkins-1
```

  

## 4.2 복원 실행  

docker run --rm -itd \
 --volumes-from **<span style="color:blue">jenkins-jenkins-1</span>** \
 -v $(pwd):/backup \
 --name backup_container **<span style="color:blue">ubuntu</span>**  \
 bash -c "cd **<span style="color:blue">/var/jenkins_home</span>** && ls -al && tar xvf **<span style="color:blue">/backup/jenkins_home.tar</span>** **<span style="color:red">--strip 2</span>**"

![복원 실행](/assets/image/back-cicd/cicd-guide19.png)  
  
* **--rm**  
	복원 완료 후 컨테이너 자동 삭제  
* **--volumes-from <span style="color:blue">jenkins-jenkins-1</span>**  
	복원 대상 컨테이너를 지정 **<span style="color:blue">jenkins-jenkins-1</span>** 에서 사용하는 volume을 연결  
	-v  
	복원할 파일(backup.tar)의 위치를 bind mount를 이용하여 연결  
* **-c "cd /dbdata && tar xvf /backup/backup.tar --strip 1"**
* 임시 컨테이너의 **<span style="color:blue">/var/jenkins_home</span>** 폴더로 이동 후 backup 폴더 위치에 있는  
	백업 파일 압축을 해제  
<span style="color:red">--strip 옵션을 주고 풀면 그 숫자만큼 경로를 제외하고 압축을 풀게 된다.</span>  
<span style="color:red">--strip 1 옵션을 주면 상위 1개의 경로를 제외하고 압축을 푼다.</span>  

  
## 4.3 컨테이너 재기동  
```bash
docker start jenkins-jenkins-1
```
![컨테이너 재기동](/assets/image/back-cicd/cicd-guide20.png)  
  

## 4.4 복원 결과 확인  
jenkins 사이트 접속시 플러그인이 설치된 상태로 로그인창으로 바로 접속됨.  
![복원 결과](/assets/image/back-cicd/cicd-guide21.png)  