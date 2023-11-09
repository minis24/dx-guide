# 5. EKS Worker Node 생성

eks-nodegroup_01.yaml
```yaml
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig
metadata:
    name: eks-cluster-01
    region: ap-northeast-2

nodeGroups:
    - name: eks-ng-01
      availabilityZones: ["ap-northeast-2a", "ap-northeast-2c"]
      desiredCapacity: 2
      instanceType: t3.large
      privateNetworking: true
      ssh:
        allow: true
#ssh-keygen으로 생성한 public key 파일
        publicKeyPath: ~/.ssh/id_rsa.pub
#ssh로 접근할 bastion server의 보안 그룹
        sourceSecurityGroupIds: ["sg-02a468057be43f992"]
      labels: {role: worker}
      iam:
        instanceRoleARN: "arn:aws:iam::615314566947:role/eks-worker-role"
      tags:
        'environment': 'development'
```

구성 파일을 사용하여 추가 노드 그룹을 생성하려면 다음 명령을 실행한다.  
```bash
eksctl create nodegroup -f eks-nodegroup_01.yaml
```

![create nodegroup](/assets/image/eks-guide/img26.png)
  
[AWS CloudFormation 콘솔](https://ap-northeast-2.console.aws.amazon.com/cloudformation/home?region=ap-northeast-2#)을 열고 생성한 노드 그룹과 연결된 스택을 선택한다.  
그런 다음 **[이벤트(Events)]** 탭을 선택하여 스택이 배포되었음을 보여주는 AWS CloudFormation 이벤트를 찾는다.  

![aws cloudformation event](/assets/image/eks-guide/img27.png)

새 노드 그룹이 클러스터에 연결되었는지 확인하고 노드 그룹 구성이 적용되었는지 검증하려면 다음 명령을 실행한다.  

```bash
kubectl get nodes
```

![kubectl get nodes](/assets/image/eks-guide/img28.png)

eksctl get nodegroups --cluster yourClusterName

```bash
eksctl get nodegroups --cluster eks-cluster-01
```

![get nodegroups](/assets/image/eks-guide/img29.png)