# 6. EKS Pod 삭제

::: info :speech_balloon: 파드(Pod)의 개념과 생명 주기, 그리고 상태 진단을 위한 프로브(Probe) 활용
https://seongjin.me/kubernetes-pods/
:::

<span>**# 클러스터 내 파드 목록 조회 (default 네임스페이스)**</span>  
kubectl get pods  

<span>**# 클러스터 내 특정 네임스페이스의 파드 목록 조회**</span>  
kubectl get pods -n <span><namespa</span>ce>
  
<span>**# 파드 목록의 상세 조회 (사설IP, 노드 정보 포함)**</span>  
kubectl get pods -o wide
  
<span>**# nginx 파드를 수정**</span>  
kubectl edit pod nginx
  
<span>**# nginx 파드의 상세 정보 확인**</span>  
kubectl describe pod nginx
  
<span>**# nginx 파드 내 구동 중인 컨테이너의 로그 확인**</span>  
kubectl logs nginx
  
<span>**# nginx 파드의 컨테이너에 접속하여 sh를 대화형으로 실행**</span>  
kubectl exec -it nginx -- /bin/sh
  
<span>**# nginx 파드 삭제**</span>  
kubectl delete pod nginx
  
---
파드를 비롯한 객체를 다룰 때 kubectl 커맨드에 `--dry-run=client`와 `-o yaml` 옵션을 추가하면, 
**해당 명령으로 적용될 YAML 명세의 기본 골격을 파일 형태로 저장할 수 있다.**  
이 경우, 오직 명령문에 따라 작업이 정상적으로 완료될 수 있을 때에만 YAML 파일이 생성된다.  
또한, 파일만 생성될 뿐 실제 명령이 클러스터에 바로 적용되는 것은 아니므로,  
앞으로 진행하려는 작업을 사전 검토할 때에도 유용한 옵션이다.  

<span>**# Redis 파드 명세를 yaml 파일로 생성**</span>  
kubectl run redis --image=redis --dry-run=client -o yaml > redis.yaml
  
<span>**# 생성된 yaml 파일로 파드 구동 (선언형 방식)**</span>  
kubectl apply -f redis.yaml
  
<span>**# 생성된 yaml 파일로 파드 구동 (명령형 방식)**</span>  
kubectl create -f redis.yaml
  
---

**Pod 정보 확인**  
kubectl get pods -n 네임스페이스  
```bash
kubectl get pods -n dfpcen-dev-api
```

![pod 정보 확인](/assets/image/eks-guide/img30.png)

  

**pod 삭제는 아래와 같은 명령어로 삭제할 수 있다.**  
kubectl delete pod <span><pod_</span>name> -n <span><name</span>space>  

```bash
kubectl delete pod test-restapi-7689d4f686-6rpmz -n dfpcen-dev-api
```

![pod 삭제](/assets/image/eks-guide/img31.png)
  
단, <span style="color:red"><b>해당 명령어를 실행한 후에도 기존에 replicaset 혹은 deployment로 생성한 리소스는 지워지지 않는다.</b></span>
이 경우 상위 object를 지워야 그로 인해 생성된 pod도 삭제 가능하다.  

```bash
kubectl delete deployments test-restapi
```

![상위 object 삭제](/assets/image/eks-guide/img32.png)
  
**종종 파드가 terminating 상태로 계속 종료가 안되는 경우가 생길 수 있는데, 그럴 때는 강제로 종료할 수 있다. 
강제 종료는 아래와 같은 명령어로 삭제하면 된다.**  
$ kubectl delete pod <span><pod_</span>name> -n <span><name</span>space> --grace-period 0 --force
