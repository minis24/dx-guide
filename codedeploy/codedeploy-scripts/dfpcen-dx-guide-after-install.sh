#!/bin/bash
#DATE_STR=$(date "+%Y%m%d_%H%M%S")


#---------------------------------------------------------------
## AWS ECR 로그인 
#---------------------------------------------------------------
PATH=/usr/local/bin:$PATH:$HOME/.local/bin:$HOME/bin
echo $PATH
export PATH
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 615314566947.dkr.ecr.ap-northeast-2.amazonaws.com


#---------------------------------------------------------------
## 실행중인 컨테이너 PID 확인
#---------------------------------------------------------------
CURRENT_PID=$(sudo docker container ls -aq --filter name=dfpcen-dx-guide)

#---------------------------------------------------------------
# 컨테이너 중지 및 삭제
#---------------------------------------------------------------
# 컨테이너 기동여부 확인 - PID 길이가 0인 경우로 체크 ( -z $VALUE 와 같이 씀)
if [ -z $CURRENT_PID ]
then
  echo "3> 현재 구동중인 Docker 컨테이너가 없으므로 종료하지 않습니다." 
  yes | docker image prune -a
  sleep 5
else
  docker rm -f $CURRENT_PID
  sleep 5

  yes | docker image prune -a
  sleep 5
fi

#---------------------------------------------------------------
# 컨테이너 기동
# --network 옵션을 host 로 설정하여 localhost나 127.0.0.1 로 호스트 서버로 접근한다.
# --restart 옵션을 --restart unless-stopped 
#   --컨테이너를 시작하고 명시적으로 중지하거나 Docker를 다시 시작하지 않는 한 항상 다시 시작하도록 구성합니다.
#---------------------------------------------------------------
docker run -itd --name dfpcen-dx-guide --network='host' --restart unless-stopped -p 8080:80 615314566947.dkr.ecr.ap-northeast-2.amazonaws.com/dfpcen-dx-guide:latest
#docker run -d --name dfpcen-dx-guide -p 80:80 nginx:latest
sleep 5

#---------------------------------------------------------------
# 미사용중인 컨테이너 이미지 삭제 
#---------------------------------------------------------------
yes | docker image prune -a
