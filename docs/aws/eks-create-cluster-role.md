# 1. EKS Cluster Role 생성

## EKS Cluster Role 설정

AWS CLI Profile을 ADMIN으로 설정하여 ROLE을 생성한다.  
ADMIN Profile은 IAM 권한이 있는 계정의 프로파일명.

```bash
cd ~/.aws
vi credential
```

![access](/assets/image/eks-guide/img33.png)

```bash
ubuntu@ip-10-10-0-208:~$ cat > eks-cluster-role.json <<EOF
> {
	"version":"2012-10-17",
	"Statement":[
		{
			"Effect":"Allow",
			"Principal":{
				"Service":"eks.amazonaws.com"
			},
			"Action":"sts:AssumeRole"
		}
	]
}
EOF
```

```bash
aws iam create-role --role-name eks-cluster-role --assume-role-policy-document file://eks-cluster-role.json --profile admin
```

![create role](/assets/image/eks-guide/img34.png)

아래 두개의 policy를 추가한다.

![add policy](/assets/image/eks-guide/img35.png)

```bash
aws iam attach-role-policy --role-name eks-cluster-role --policy-arn arn:aws:iam::aws:policy/AmazonEKSClusterPolicy --profile admin
```

```bash
aws iam attach-role-policy --role-name eks-cluster-role --policy-arn arn:aws:iam::aws:policy/AmazonEKSServicePolicy --profile admin
```

![policy script](/assets/image/eks-guide/img36.png)

생성된 역할을 관리 콘솔에서 확인한다.

![역할 확인](/assets/image/eks-guide/img37.png)

![eks-cluster-role](/assets/image/eks-guide/img38.png)