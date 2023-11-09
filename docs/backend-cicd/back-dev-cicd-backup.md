# 3. 도커 볼륨 백업  
  
## 3.1 백업하려고 하는 컨테이너 확인  
여기서는 **<span style="color:blue">jenkins_jenkins_1</span>**  
![컨테이너 확인](/assets/image/back-cicd/cicd-guide11.png)  

백업하려고 하는 볼륨 **<span style="color:blue">jenkins_home</span>**
![볼륨 확인](/assets/image/back-cicd/cicd-guide12.png)  
  
## 3.2 백업실행  

docker run  --rm \
 --volumes-**from <span style="color:blue">jenkins-jenkins-1</span>** \
 -v $(pwd):/backup \
 --name backup_container **<span style="color:blue">alpine:3.17.1</span>**  \
tar cvf /backup/backup.tar **<span style="color:blue">/var/jenkins_home</span>**

![백업 실행](/assets/image/back-cicd/cicd-guide13.png)  

* volume 사용을 못하도록 백업 대상 volume을 사용하는 컨테이너 중지  
* 백업 실행용 임시 컨테이너를 생성 - 백업파일 생성(tar) 용도 / 사용 후 컨테이너 삭제  
* **volumes-from [컨테이너 이름/ID]**  
* 대상 컨테이너 (**<span style="color:blue">jenkins_jenkins_1</span>**)에서 사용하는 모든 volume을 마운트  
* 대상 컨테이너에서 지정했던 디렉토리 이름도 똑같이 연결이 됨  

**<span style="color:blue">/var/jenkins_home</span>** 이름으로 폴더가 연결됨  

![디렉토리 이름 연결](/assets/image/back-cicd/cicd-guide14.png)  
* **-v $(pwd):/backup**  
	백업 파일을 저장하기 위해 명령어를 실행하는 현재 디렉토리를 컨테이너의 backup 디렉토리로 연결  
* **tar cvf - /var/jenkins_home**  
	디렉토리를 압축 후 스토리지로 연결한 폴더(backup)에 tar 생성  
* **--rm** 옵션 때문에 해당 컨테이너는 압축 후 삭제  
* 호스트 머신의 아래 명령어를 실행한 디렉토리에 backup.tar 파일이 생성되어 있다.  
  

## 3.3 실행결과  
![실행결과](/assets/image/back-cicd/cicd-guide15.png)  

**tar xvf backup.tar**  

![tar](/assets/image/back-cicd/cicd-guide16.png)  