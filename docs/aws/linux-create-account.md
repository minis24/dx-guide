## Linux 인스턴스에서 사용자 계정 관리

### (1) 키페어 생성

다음과 같이 [<span style="color:#088A85">create-key-pair</span>](https://docs.aws.amazon.com/cli/latest/reference/ec2/create-key-pair.html) 명령을 사용하여 키 페어를 생성하고 프라이빗 키는 .pem 파일에 저장한다.

```
aws ec2 create-key-pair \
--key-name testuser-key-pair \
--key-type rsa \
--key-format pem \
--query "KeyMaterial" \
--output text > testuser-key-pair.pem
```

```
aws ec2 create-key-pair \
--key-name testuser-key-pair \
--key-type rsa \
--key-format pem \
--query "KeyMaterial" \
--output text > lsh-user-key-pair.pem
```

macOS 또는 Linux 컴퓨터에서 SSH 클라이언트를 사용하여 Linux 인스턴스에 연결하려면  
사용자만 프라이빗 키 파일을 읽을 수 있도록 다음 명령으로 해당 파일의 권한은 설정한다.  

```bash
chmod 400 key-pair-name.pem
chmod 400 lsh-user-key-pair.pem
```

![파일 권한 설정](/assets/image/back-cicd/img15.png)

<span style="color:red"><b>더 자세한 내용은 AWS CLI 명령어로 키페어 생성 메모 참조</b></span>

### (2) 사용자 계정 생성

이전 단계에서 생성한 키 페어에서 퍼블릭 키를 검색한다.  

```bash
$ ssh-keygen -y -f /path_to_key_pair/key-pair-name.pem
ssh-keygen -y -f ./lsh-user-key-pair.pem
```

이 명령은 다음 예제와 같이 퍼블릭 키를 반환한다.

![퍼블릭 키 반환](/assets/image/back-cicd/img16.png)

**adduser** 명령을 사용하여 사용자 계정을 생성하여 (/etc/passwd 파일의 항목으로) 시스템에 추가한다.  
이 명령은 해당 계정에 그룹과 홈 디렉터리도 생성한다. 이 예제에서 사용자 계정 이름은 newuser 이다.  

* <span style="color:red">Amazon Linux and Amazon Linux2</span>  
	Amazon Linux 및 Amazon Linux2에서는 기본적으로 암호 인증이 비활성화된 사용자 계정이 생성된다.  

	```bash
	[ec2-user ~]$ sudo adduser test-user
	[ec2-user ~]$ sudo adduser lsh-user
	```

	![사용자 계정 생성](/assets/image/back-cicd/img17.png)

* <span style="color:red">Ubuntu</span>  
	암호 인증이 비활성화된 사용자 계정을 생성하려면 --disabled-password 파라미터를 포함한다.

	```bash
	[ubuntu ~]$ sudo adduwer newuser --disabled-password
	```

생성할 디렉터리와 파일이 정확한 소유권을 가질 수 있도록 새 계정으로 전환한다.  

```bash
[ec2-user ~]$ sudo su - newuser
[ec2-user ~]$ sudo su - lsh-user
```

사용자 계정에 SSH 퍼블릭 키를 추가한다.  
다음 하위 단계에 따라 먼저 사용자의 홈 디렉터리에 SSH 키 파일에 대한 디렉터리를 만든 다음,  
키 파일을 만들고 마지막으로 퍼블릭 키를 파일에 붙여 넣는다.  

* .ssh 디렉터리를 newuser 홈 디렉터리에 만들고 파일 권한을 700(소유자만 디렉터리를 읽거나, 쓰거나, 열 수 있음)으로 변경한다.  

```bash
[newuser ~]$ mkdir .ssh
[newuser ~]$ chmod 700 .ssh
```

![파일권한변경700](/assets/image/back-cicd/img18.png)

authorized_keys라는 이름의 파일을 .ssh 디렉터리에 만들고 파일 권한을 600(소유자만 파일을 읽거나 쓸 수 있음)으로 변경한다.  

```bash
[newuser ~]$ touch .ssh/authorized_keys
[newuser ~]$ chmod 600 .ssh/authorized_keys
```

![파일권한변경600](/assets/image/back-cicd/img19.png)

자주 사용하는 텍스트 편집기 (예: **vim** 또는 **nano**)로 authorized_keys 파일을 연다.  

```bash
[newuser ~]$ nano .ssh/authorized_keys
```

![키파일열기](/assets/image/back-cicd/img20.png)

**2단계**에서 검색한 퍼블릭 키를 파일에 붙여넣고 변경 내용을 저장한다.  

![퍼블릭키](/assets/image/back-cicd/img21.png)

새로 생성한 계정으로 접속 확인

![접속 확인](/assets/image/back-cicd/img22.png)

```bash
ssh -i ~/aws_ec2_keyfile/SecucenDev01CICD.pem ec2-user@3.39.88.103
```

## sudoer 설정

![sudore 설정](/assets/image/back-cicd/img23.png)

### sudoers 파일

sudoers 파일은 sudo 명령어에 대한 설정이 정의되어 있다. 해당 파일 안에 sudo 명령어를 사용할 수 있는 계정을 지정할 수 있는데, 
**'sudoers 설정 파일에 없습니다. 이 시도를 보고합니다.'**  
오류가 발생한 이유는  sudo 명령을 입력한 일반 사용자 계정에 대한 설정이 없었기 때문이다.  
  
정리하면 sudo 명령어를 사용하기 위해서는 sudoers 파일에 일반 사용자 계정에 대한 설정이 있어야 하며,
없으면 su 명령어를 통해 root 계정으로 전환한 후 sudoers 파일을 수정해야 한다.  
  
sudoers 파일은 쓰기(w) 권한이 없기 때문에 vi 편집기로 수정할 수 없다.  
이를 해결할 방법이 2가지 있다.  

* <b>visudo 명령어 이용 (권장)</b>
* <b>chmod 명령어로 파일 권한 변경 후 수정</b>

사용자 계정 추가  
```
## Allow root to run any commands anywhere
root		ALL=(ALL) ALL
[사용자계정] ALL=(ALL) ALL
```

sudo 패스워드 없이 사용하는 방법
```
: vi /etc/sudoers에 NOPASSWD 옵션 추가
[사용자계정] ALL=(ALL:ALL) NOPASSWD: ALL사용자계정 추가

## Allow root to run any commands anywhere
root		ALL=(ALL) ALL
[사용자계정] ALL=(ALL) ALL
```

```bash
sudo visudo -f /etc/sudoers
```

![visudo](/assets/image/back-cicd/img24.png)
  
![계정추가](/assets/image/back-cicd/img25.png)
  
해당 부분에 일반 사용자 계정명 ALL=(ALL) ALL을 추가하여 사용자가 sudo 명령어를 사용할 수 있도록 설정한다.  

![계정명 ALL 추가](/assets/image/back-cicd/img26.png)
  
아래와 같이 수정 후 저장 (:wq)

![계정 설정 저장](/assets/image/back-cicd/img27.png)
  
계정에 패스워드 부여  

![패스워드 부여](/assets/image/back-cicd/img28.png)

  
sudo 명령어 확인

![명령어 확인](/assets/image/back-cicd/img29.png)


## ssh config에서 Host 설정

SSH 접속할 때 `ubuntu@222.123.123.123`과 같이 입력했다면, IP 주소를 외우기 곤란하기 때문에 매번 귀찮은 상황이 발생하는데
사용자의 ~/.ssh 폴더 내에 확장자가 없는 config 파일을 만들고

![config 생성](/assets/image/back-cicd/img30.png)
  
아래와 같이 접속

![접속](/assets/image/back-cicd/img31.png)