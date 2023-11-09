## dfpcen webserver 접속방법

### SSH 클라이언트 인스턴스 연결

1. SSH 클라이언트 접속 정보를 확인한다.

![SSH 클라이언트 접속](/assets/image/back-cicd/img14.png)

2. 도스 명령창을 실행한 뒤 프라이빗 키 파일(.pem)이 있는 경로로 이동한다.

3. 다음 명령어를 복사해 인스턴스에 접속한다.

```bash
ssh -i "dfpcen-websvr.pem" ec2-user@3.34.146.23
```