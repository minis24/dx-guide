# CodeDeploy를 사용하여 Auto Scaling 그룹에 애플리케이션 배포

## 가이드 소개
- CodeDeploy를 사용하여 Auto Scaling 그룹에 애플리케이션 수정 버전을 배포
- AWS ALB 가이드의 [부하 분산 및 자동조절](/aws/back-dev-auto) 가이드에서  구성한 환경을 기준으로  
	배포 과정 설명

## 1. 배포그룹 생성

### CodeDeploy 애플리케이션 배포그룹 생성

1. 상단 검색에서 CodeDeploy 서비스로 이동
2. 배포(CodeDeploy) 단계에서 해당 애플리케이션 선택
3. 배포 그룹 탭에서 ‘배포 그룹 생성’ 클릭
    - 배포 그룹 이름 : sample-repo-group
    - 배포 유형 : 현재 위치
    - 환경 구성 : Amazon EC2 Auto Scaling 그룹 체크
    - 로드 밸런서 : 샘플에서는 비활성화 하여 진행
4. ‘배포 그룹 생성’ 버튼 클릭하여 생성 완료

::: info :bulb: 설정한 배포 그룹 이름은 향후 젠킨스 파이프라인 실행 시 사용할 것을 고려하여 설정
:::

## 2. Jenkins pipeline script

### Jenkins pipeline script에 CodeDeploy script 추가
아래의 코드를 참고하여 스크립트 추가하여 커밋

```JavaScript
stage("AWS CodeDeploy") {
  steps { 
	  script {
			sh '''
          aws deploy create-deployment \
          --application-name sample02 \
          --deployment-group-name sample-repo-group  \
          --s3-location bucket=codedploy-dfpcen,key=codedeploy-sample02-repo.zip,bundleType=zip
        	'''
	  }               
  }
}// stage "AWS CodeDeploy"
```

- application-name : CodeDeploy 애플리케이션 이름
- deployment-group-name  : Auto Scaling Group의 배포 그룹 이름
- s3-location : codeDeploy 시 적용할 yml, scripts가 저장된 s3정보

## 3. 시작 템플릿 추가 설정

### 시작 팀플릿에 IAM 인스턴스 프로파일 추가

1. 왼쪽 탐색창에서 시작 템플릿 메뉴 선택
2. 기존 Auto Scaling 그룹에 설정된 시작템플릿 클릭하여 세부 정보화면으로 이동
3. 작업 > 템플릿 수정(새 버전 생성) 클릭
  
![템플릿 수정](/assets/image/back-cicd/cicd-guide78.png)
  
4. 템플릿 수정(새 버전 생성) 단계 설정
    - 템플릿 버전 설명 : codeDeploy IAM 인스턴스 프로파일 추가
    - Auto Scaling 지침 : 체크
    - 애플리케이션 및 OS이미지 : sample-image 확인
    - 고급 세부정보 섹션에서 IAM 인스턴스 프로파일에 CodeDeploy프로파일 선택
    ![인스턴스 프로파일](/assets/image/back-cicd/cicd-guide79.png)
  
5. 템플릿 버전 생성 버튼을 클릭하여 생성 완료 후 버전 탭에서 추가된 버전 확인

### Auto Scaling Group의 시작 템플릿 변경

1. 왼쪽 탐색창에서 Auto Scaling 그룹 메뉴 선택하여 이동
2. sample-ASG 클릭하여 세부정보 화면으로 이동
3. 시작 템플릿 섹션의 ‘편집’ 버튼 클릭
4. 시작 템플릿 설정 확인 후 버전을 프로파일 추가한 버전으로 변경
5. 하단의 업데이트 버튼 클릭 후 수정한 정보 확인

![시작 템플릿](/assets/image/back-cicd/cicd-guide80.png)

## 4. 작동 테스트

### Auto Scaling Group에 CodeDeploy 적용 확인

1. 웹서버의 index.html을 수정한 뒤 codecommit 진행
2. 인스턴스 목록에서 기존 Auto Scaling 그룹 인스턴스 종료
3. 바뀐 시작 템플릿으로 Auto Scaling 그룹 인스턴스 자동생성 완료 확인
4. jenkins 접속하여 빌드 진행
5. 배포 그룹 상태 성공 확인

![배포그룹 상태 확인](/assets/image/back-cicd/cicd-guide81.png)

6. 로드밸런서 DNS로 접속하여 바뀐 index.html화면 확인
  
![DNS 접속 화면 확인](/assets/image/back-cicd/cicd-guide82.png)

::: info :bulb:
배포 진행 시 연결된 로드밸런서 대상그룹화면에서 새로고침 시 Health status를 통해
기존 ASG 인스턴스가 Draining으로 변경되고, 배포된 버전으로 새로 Initial되는 것을 확인 가능하다.
:::

![health status](/assets/image/back-cicd/cicd-guide83.png)