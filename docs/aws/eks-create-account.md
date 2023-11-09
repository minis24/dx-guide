# 3. EKS 사용자 계정 생성

EKS 사용자를 생성하기 전, 먼저 EKS 사용자에 추가하기 위한 정책을 생성한다.  

<span style="color:red"><b>POLICY-EKS-IAM-ACCESS</b></span>
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "iam:CreateInstanceProfile",
                "iam:DeleteInstanceProfile",
                "iam:GetInstanceProfile",
                "iam:RemoveRoleFromInstanceProfile",
                "iam:GetRole",
                "iam:CreateRole",
                "iam:DeleteRole",
                "iam:AttachRolePolicy",
                "iam:PutRolePolicy",
                "iam:ListInstanceProfiles",
                "iam:AddRoleToInstanceProfile",
                "iam:ListInstanceProfilesForRole",
                "iam:PassRole",
                "iam:DetachRolePolicy",
                "iam:DeleteRolePolicy",
                "iam:GetRolePolicy",
                "iam:GetOpenIDConnectProvider",
                "iam:CreateOpenIDConnectProvider",
                "iam:DeleteOpenIDConnectProvider",
                "iam:ListAttachedRolePolicies",
                "iam:ListOpenIDConnectProviderTags",
                "iam:TagOpenIDConnectProvider",
                "iam:UntagOpenIDConnectProvider",
                "iam:TagRole"
            ],
            "Resource": [
                "arn:aws:iam::615314566947:instance-profile/eksctl-*",
                "arn:aws:iam::615314566947:role/eksctl-*",
                "arn:aws:iam::615314566947:oidc-provider/*",
                "arn:aws:iam::615314566947:role/aws-service-role/eks-nodegroup.amazonaws.com/AWSServiceRoleForAmazonEKSNodegroup",
                "arn:aws:iam::615314566947:role/eksctl-managed-*",
                "arn:aws:iam::615314566947:role/eks-*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "iam:GetRole"
            ],
            "Resource": [
                "arn:aws:iam::615314566947:role/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "iam:CreateServiceLinkedRole"
            ],
            "Resource": "*",
            "Condition": {
                "StringEquals": {
                    "iam:AWSServiceName": [
                        "eks.amazonaws.com",
                        "eks-nodegroup.amazonaws.com",
                        "eks-fargate.amazonaws.com"
                    ]
                }
            }
        }
    ]
}
```

아래의 정책 생성 화면에서 정책 생성 버튼 클릭  

![정책 생성 화면](/assets/image/eks-guide/img12.png)

위의 정책 내용(POLICY-EKS-IAM-ACCESS.json)의 내용 붙여넣기

![정책 생성 스크립트](/assets/image/eks-guide/img13.png)

정책 파일 내용 중  
**"arn:aws:iam::615314566947:role/eks-*"**  
--> 앞서 추가한 EKS 관련 역할을 등록하는 구문이다.  

<span style="color:red"><b>eks-cluster-role</b></span>  
<span style="color:red"><b>eks-worker-role</b></span>

![eks 역할 스크립트](/assets/image/eks-guide/img14.png)

<span style="color:red"><b>POLICY-EKS-FULL-ACCESS</b></span>

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "kms:DescribeKey",
                "eks:*",
                "kms:CreateGrant"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ssm:GetParameters",
                "ssm:GetParameter"
            ],
            "Resource": [
                "arn:aws:ssm:*:615314566947:parameter/aws/*",
                "arn:aws:ssm:*::parameter/aws/*"
            ]
        }
    ]
}
```

위의 정책(POLICY-EKS-FULL-ACCESS.json)의 내용으로 관리 콘솔에서 정책을 생성한다.  

### 그룹 생성
EKS-Group 사용자 그룹을 생성하여 그룹에는 다음과 같이 AmazonEC2FullAccess, AWSCloudFormationFullAccess 그리고 앞서 생성한 정책 두개를 연결한다.
[AmazonEC2FullAccess](https://us-east-1.console.aws.amazon.com/iam/home?region=us-east-1#/policies/arn:aws:iam::aws:policy/AmazonEC2FullAccess$serviceLevelSummary)  
[AWSCloudFormationFullAccess](https://us-east-1.console.aws.amazon.com/iam/home#/policies/arn:aws:iam::aws:policy/AWSCloudFormationFullAccess$serviceLevelSummary)  

![EKS-Group](/assets/image/eks-guide/img15.png)

### 사용자 생성
EKS 사용자를 생성한 후 그룹에 추가한다.  

![사용자 추가](/assets/image/eks-guide/img16.png)
![그룹 추가](/assets/image/eks-guide/img17.png)