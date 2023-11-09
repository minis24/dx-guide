# Backend 개발 환경 구성

## AWS 계정 생성
---


## AWS 코드 커밋 자격증명 생성
---


## dfpcen-admin 프로젝트 git 내려받기
---
* Git 리포지토리 URL : 
```
git clone -b 브랜치명 https://git-codecommit.ap-northeast-2.amazonaws.com/v1/repos/dfpcen-adm dfpcen-adm-사용자이름
```

### 프로젝트 저장 및 git clone
* 터미널 실행 후 프로젝트를 저장할 폴더를 지정 및 `clone`

![git clone](/assets/image/back-env/img10.png)


## 이클립스 프로젝트 import 방법
---

* Eclipse IDE를 실행한 뒤 폴더를 지정하여 `Launch` (프로젝트가 저장되어 있는 폴더가 아니어도 된다.)

![이클립스 실행](/assets/image/back-env/img13.png)

### 프로젝트 import 순서

* import에 앞서 프로젝트가 저장된 폴더 내 `.project`를 메모장으로 열어 자신의 사용자이름으로 수정한 뒤 저장

![프로젝트 파일 수정](/assets/image/back-env/img12.png)


* `File` - `import` 또는 실행 시 보이는 `import projects...`를 클릭한 뒤 순서대로 진행한다. 

![이클립스 import](/assets/image/back-env/img14.png)


* 프로젝트가 저장되어 있는 경로를 선택한 뒤 `Finish`

![import 폴더 선택](/assets/image/back-env/img15.png)

## 어플리케이션 기동 방법
---
* 우선 프로젝트 패키지를 우클릭한 뒤, `Run As` - `9 Spring Boot App` 을 눌러 실행한다.

![어플리케이션 기동](/assets/image/back-env/img16.png)

* `DfpcenAdminApplication` 선택 후 `OK`

![어플리케이션 기동 선택](/assets/image/back-env/img17.png)

### Error 및 해결방법
:warning: 어플리케이션이 바로 기동되지 않고 에러가 발생할 수 있다.

::: warning :bulb: [에러 로그1]
![Error](/assets/image/back-env/img20.png)
:::
::: tip [해결 방법]
* 프로젝트 패키지를 우클릭한 뒤, `Run As` - `Run Configurations...`를 선택한다.

![실행 설정](/assets/image/back-env/img18.png)

* 상단 `Arguments` 탭의 `VM arguments`에 다음을 입력한 뒤 `Run`으로 실행한다.
```
-DRUNNING.MODE=LOCAL
-Dlogging.config=classpath:logback_local.xml
-DSERVER.INSTANCE.ID=01
-Dspring.profiles.active=local
```
![실행 설정](/assets/image/back-env/img19.png)
:::

::: warning :bulb: [에러 로그 2]
![Error](/assets/image/back-env/img22.png)
:::
::: tip [해결 방법]
* `logback_local.xml` 파일의 소스를 열어 `value`를 다음과 같이 수정한 뒤 실행한다.

![로그 수정](/assets/image/back-env/img21.png)
:::

## Oracle SQLDeveloper 접속 방법
---

## Window 환경 Docker 설치 방법
로컬(윈도우) 환경에서 docker 사용을 위한 설치 
  
### Windows 10 Pro/Home에 따른 엔진 설치
  
[내 PC] > [속성]을 통해 현재 PC의 사양을 확인할 수 있다.  
Window 10 Home Edition과 Pro Edition의 큰 차이는 Hyper-V 기능 지원여부이다.  

|    사양      |      Docker Engine      | 
| :-------------: | :-----------------: |
|      Windows 10 Pro 에디션        |       WSL2 기반 Docker Engine 사용 가능 <br> Hyper-V 기반 Docker Engine 사용 가능       |
|      Windows 10 Home 에디션        |       WSL2 기반 Docker Engine 사용 가능       | 


![PC env](/assets/image/back-env/img23.png)
  
Home 에디션의 경우 Docker를 사용하려면 WSL2가 필수이며, Pro 에디션의 경우  
WSL2를 사용하지 않더라도 Hyper-V 기반 가상화를 사용해 Docker Engine을 사용할 수 있다.  
Home과 Pro 공통으로 사용할 수 있는 WSL2 방식을 설명한다.

### Window 환경 Docker 사용을 위한 WSL2 설치
1. Windows Terminal을 '관리자 권한'으로 실행한다.  
2. PowerShell에서 아래 두 명령어를 실행한다.  
```sh
$ dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
$ dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```
3. '작업을 완료했습니다' 출력으로 종료되었는지 확인한 후 윈도우를 재부팅한다.  
4. [x64 머신용 최신 WSL2 Linux 커널 업데이트 패키지](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi)를 다운로드 받아 설치한다.  
5. 터미널에서 다음 명령어를 실행한다.  
```sh
$ wsl --set-default-version 2
```

### Window 환경 Docker Desktop 다운로드 및 설치 방법

1. 다음 페이지로 이동해 'Download for Windows'를 클릭해 다운로드 받는다.  
[Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)

2. 다운로드가 완료된 도커 파일을 설치한다. 설치 도중 나오는 옵션설정을 체크하여 진행한다.  
3. 설치 완료 후 Docker Desktop을 실행한다.
::: warning :bulb: Docker 실행 오류 발생 시 처리
```sh
Docker failed to initialize.
Docker Desktop is shutting down.
```
:speech_balloon: `C:\Users\User\AppData\Roaming\Docker\settings.json` 경로 내 json 파일을 삭제 후 재실행
:::

4. 'Settings' 메뉴 접속 후 WSL2 설정 확인
  
General > 'Use the WSL 2 based engine' 체크
  
![WSL2 설정 체크](/assets/image/back-env/img24.png)
  
Resources > WSL integration > 'Enable integration with my default WSL distro' 체크
  
![WSL2 설정 체크2](/assets/image/back-env/img25.png)
  

5. 터미널에서 다음 명령어로 Docker 실행 확인
```sh
$  wsl -l -v
```
![docker 실행 확인](/assets/image/back-env/img26.png)


::: warning :bulb: vmmem(WSL) 메모리 과점유 시 해결방법
WSL2 기반 docker desktop을 사용하는 경우 Windows에서 도커를 실행시켰을 때  
vmmem이라는 프로그램이 운영체제의 램을 상당부분 차지한다.

---

:speech_balloon: **해결방법**  

.wslconfig 파일을 작성하여 고정메모리를 할당해준다.  
재부팅하여 확인 시 설정해둔 메모리값 이상으로 차지하지 않는 것을 확인할 수 있다.  
  
(1) 사용자 경로로 이동한다. (ex. C:\Users\admin)  
(2) .wslconfig 파일을 생성한다.
```
[wsl2]
memory=4GB
swap=0
```
:::