# 2. EKS Worker Node Role 생성

AWS CLI Profile을 ADMIN으로 설정하여 ROLE을 생성한다.  
ADMIN Profile은 IAM 권한이 있는 계정의 프로파일명

```bash
cd ~/.aws
vi credential
```

![role 생성](/assets/image/eks-guide/img1.png)

아래의 정책을 연결함.  
먼저 WorkerNode Policy, 그리고 컨테이너 이미지에 접근이 가능해야 하니 ECR 로그 중앙화를  
FluentD - Cloudwatch 연동을 할 예정이기 때문에 CloudWatchLogsFullAccess  
VPC의 CIDR을 가지고 매핑해서 구성하기 때문에 CNI와 관련된 Policy  
ELB를 구성하게 되었을때, 자동적으로 DNS 매핑을 구성하기 위해 Route53 Policy,  
HPA, AutoScailer와 같은 정책을 수행하기 위해서는 EKS-AutoScailer  
ALB 연동을 위한 ALBIngressControllerIAMPolicy까지 생성  

![정책 연결](/assets/image/eks-guide/img2.png)

```bash
cat > eks-worker-role.json << EOF
{
	"Version":"2012-10-17",
	"Statement":[
		{
			"Effect":"Allow",
			"Principal":{
				"Service":"ec2.amazonaws.com"
			},
			"Action":"sts:AssumeRole"
		}
	]
}
EOF
```

![script](/assets/image/eks-guide/img3.png)

```bash
aws iam create-role --role-name eks-worker-role --assume-role-policy-document file://eks-worker-role.json --profile admin
```

![create role script](/assets/image/eks-guide/img4.png)

```bash
aws iam attach-role-policy --role-name eks-worker-role --policy-arn arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy --profile admin
```

```bash
aws iam attach-role-policy --role-name eks-worker-role --policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly --profile admin
```

```bash
aws iam attach-role-policy --role-name eks-worker-role --policy-arn arn:aws:iam::aws:policy/CloudWatchLogsFullAccess --profile admin
```

```bash
aws iam attach-role-policy --role-name eks-worker-role --policy-arn arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy --profile admin
```

```bash
aws iam attach-role-policy --role-name eks-worker-role --policy-arn arn:aws:iam::aws:policy/AmazonRoute53FullAccess --profile admin
```

![policy script](/assets/image/eks-guide/img5.png)

```bash
cat > EKSAutoscailerPolicy.json <<EOF
{
	"Version":"2012-10-17",
	"Statement":[
		{
			"Action":[
				"autoscaling:DescribeAutoScalingGroups",
				"autoscaling:DescribeAutoScalingInstances",
				"autoscaling:DescribeLaunchConfigurations",
				"autoscaling:DescribeTags",
				"autoscaling:SetDesiredCapacity",
				"autoscaling:TerminateInstanceInAutoScalingGroup",
				"ec2:DescribeLaunchTemplateVersions"
			],
			"Resource":"*",
			"Effect":"Allow"
		}
	]
}
EOF
```

![autoscaling script](/assets/image/eks-guide/img6.png)

```bash
aws iam create-policy --policy-name EKSAutoscailerPolicy --policy-document file://EKSAutoscailerPolicy.json --profile admin
```

![autoscailerpolicy](/assets/image/eks-guide/img7.png)

```bash
aws iam attach-role-policy --role-name eks-worker-role --policy-arn arn:aws:iam::615314566947:policy/EKSAutoscailerPolicy --profile admin
```

```bash
cat > ALBIngressControllerPolicy.json <<EOF
{
	"Version":"2012-10-17",
	"Statement":[
		{
			"Effect":"Allow",
			"Action":[
				"acm:DescribeCertificate",
				"acm:ListCertificates",
				"acm:GetCertificate"
			],
			"Resource":"*"
		},
		{
			"Effect":"Allow",
			"Action":[
				"ec2:AuthorizeSecurityGroupIngress",
				"ec2:CreateSecurityGroup",
				"ec2:CreateTags",
				"ec2:DeleteTags",
				"ec2:DeleteSecurityGroup",
				"ec2:DescribeAccountAttributes",
				"ec2:DescribeAddresses",
				"ec2:DescribeInstances",
				"ec2:DescribeInstancesStatus",
				"ec2:DescribeInternetGateways",
				"ec2:DescribeNetworkInterfaces",
				"ec2:DescribeSecurityGroups",
				"ec2:DescribeSubnets",
				"ec2:DescribeTags",
				"ec2:DescribeVpcs",
				"ec2:ModifyInstanceAttribute",
				"ec2:ModifyNetworkInterfaceAttribute",
				"ec2:RevokeSecurityGroupIngress",
			],
			"Resource":"*"
		},
		{
			"Effect":"Allow",
			"Action":[
				"elasticloadbalancing:AddListenerCertificates",
				"elasticloadbalancing:AddTags",
				"elasticloadbalancing:CreateListener",
				"elasticloadbalancing:CreateLoadBalancer",
				"elasticloadbalancing:CreateRule",
				"elasticloadbalancing:CreateTargetGroup",
				"elasticloadbalancing:DeleteListener",
				"elasticloadbalancing:DeleteLoadBalancer",
				"elasticloadbalancing:DeleteRule",
				"elasticloadbalancing:DeleteTargetGroup",
				"elasticloadbalancing:DeregisterTargets",
				"elasticloadbalancing:DescribeListenerCertificates",
				"elasticloadbalancing:DescribeListeners",
				"elasticloadbalancing:DescribeLoadBalancers",
				"elasticloadbalancing:DescribeLoadBalancerAttributes",
				"elasticloadbalancing:DescribeRules",
				"elasticloadbalancing:DescribeSSLPolicies",
				"elasticloadbalancing:DescribeTags",
				"elasticloadbalancing:DescribeTargetGroups",
				"elasticloadbalancing:DescribeTargetGroupAttribues",
				"elasticloadbalancing:DescribeTargetHealth",
				"elasticloadbalancing:ModifyListener",
				"elasticloadbalancing:ModifyLoadBalancerAttributes",
				"elasticloadbalancing:ModifyRule",
				"elasticloadbalancing:ModifyTargetGroup",
				"elasticloadbalancing:ModifyTargetGroupAttributes",
				"elasticloadbalancing:RegisterTargets",
				"elasticloadbalancing:RemoveListenerCertificates",
				"elasticloadbalancing:RemoveTags",
				"elasticloadbalancing:SetIpAddressType",
				"elasticloadbalancing:SetSecurityGroups",
				"elasticloadbalancing:SetSubnets",
				"elasticloadbalancing:SetWebACL",
			],
			"Resource":"*"
		},
		{
			"Effect":"Allow",
			"Action":[
				"iam:CreateServiceLinkedRole",
				"iam:GetServerCertificate",
				"iam:ListServerCertificates"
			],
			"Resource":"*"
		},
		{
			"Effect":"Allow",
			"Action":[
				"cognito-idp:DescribeUserPoolClient"
			],
			"Resource":"*"
		},
		{
			"Effect":"Allow",
			"Action":[
				"tag:GetResources",
				"tag:TagResources"
			],
			"Resource":"*"
		},
		{
			"Effect":"Allow",
			"Action":[
				"waf:GetWebACL"
			],
			"Resource":"*"
		}
	]
}
EOF
```

![policy](/assets/image/eks-guide/img8.png)

```bash
aws iam create-policy --policy-name ALBIngressControllerPolicy --policy-document file://ALBIngressControllerPolicy.json --profile admin
```

![controller policy](/assets/image/eks-guide/img39.png)

```bash
aws iam attach-role-policy --role-name eks-worker-role --policy-arn arn:aws:iam::615314566947:policy/ALBIngressControllerPolicy --profile admin
```

![attach policy](/assets/image/eks-guide/img9.png)

관리 콘솔에서 확인

![콘솔 확인](/assets/image/eks-guide/img10.png)

![정책 이름](/assets/image/eks-guide/img11.png)

