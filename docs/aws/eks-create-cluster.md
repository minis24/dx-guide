# 4. EKS 클러스터 생성

## 1) AWS Configure
먼저 AWS Configure를 등록하여 (AWS Access Key / AWS Secret Access Key) AWS 서비스에 접근할 수 있도록 아래와 같이 등록한다.

## 2) eksctl 설치

```bash
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C/tmp
```

```bash
sudo mv /tmp/eksctl /usr/local/bin
```

```bash
eksctl version
0.29.2
```

## 3) kubectl 설치

```bash
curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.17.9/2020-08-04/bin/linux/amd64/kubectl
```

```
% Total	% Received	% Xferd	Average	Speed	Time	Time Current	Dload	Upload	Total	 Spent	Left Speed
  100	  56.6M	     100	56.6M	  0      0         7366k	      0	   0:00:07	0:00:07	 --:--:--	9140k
```

```bash
chmod +x ./kubectl
```

```bash
sudo mv ./kubectl /usr/local/bin
```

```bash
kubectl version --short --client
```

```
Client Version: v1.17.9-eks-4c6976
```

## 4) eksctl create
```yaml
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig
metadata:
    name: eks-cluster-01
    region: ap-northeast-2

vpc:
    id: vpc-031bc758522ab9e83
    cidr: "10.10.0.0/16"
    subnets:
        public:
          ap-northeast-2a:
              id: "subnet-0e80c2e17dc76b5e1"
              cidr: "10.10.0.0/23"
          ap-northeast-2c:
              id: "subnet-063d180e8cfc02695"
              cidr: "10.10.2.0/23"
        private:
          ap-northeast-2a:
              id: "subnet-01bec6bbb2da1e394"
              cidr: "10.10.16.0/20"
          ap-northeast-2c:
              id: "subnet-0d2297252a2769875"
              cidr: "10.10.64.0/20"
#사전 구성되어 있는 NAT Gateway가 있을 경우 Disable한다.
    nat:
        gateway: Disable
    clusterEndpoints:
        publicAccess: false
        privateAccess: true
iam:
    serviceRoleARN: "arn:aws:iam::615314566947:role/eks-cluster-role"
```

* iam.serviceRoleARN : 앞서 클러스터용 역할을 설정한다. <span style="color:red">(eks-cluster-role)</span>  
* <span>vpc.id</span> : 앞서 구성한 VPCID를 입력한다.  
* <span>vpc.cidr</span> : 해당 VPC의 CIDR을 입력한다.  
* <span>vpc.subnets.private</span> : private subnet을 등록한다.  
	각각 해당하는 az, subnet id, cidr을 올바르게 입력한다.  
* <span>vpc.nat</span> : 사전 구성되어 있는 NAT Gateway가 있을 경우 Disable 한다.

![eksctl](/assets/image/eks-guide/img18.png)

<span style="color:red"><b>eksctl create cluster -f eks-cluster_01.yaml</b></span>

![yaml](/assets/image/eks-guide/img19.png)

## 5) EKS ControlPlane Security Group 인바운드 규칙 추가
클러스터가 구성되는동안 자동으로 추가되는 EKS ControlPlane의 Security Group에  
인바운드 443 포트를 Workstation Server의 Security Group으로 등록한다.  
해당 포트는 ControlPlane & Worker Node가 모두 구성된 이후 <span style="color:red">작업 서버(ubuntu, 여기서는 Bastion 서버)에서 ControlPlane으로 API Call을 수행할 수 있도록 하는 포트이다.</span>

![보안 그룹](/assets/image/eks-guide/img20.png)

**인바운드 규칙 편집 클릭**

![인바운드 규칙](/assets/image/eks-guide/img21.png)

![인바운드 규칙 편집](/assets/image/eks-guide/img22.png)

HTTPS를 선택하고 BastionSecurityGroup을 선택한다.

![BastionSecurityGroup](/assets/image/eks-guide/img23.png)

## 6) EKS 클러스터 생성확인
관리 콘솔 클라우드 포메이션 스택에 아래와 같이 생성

![스택](/assets/image/eks-guide/img24.png)