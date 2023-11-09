export default {
  //base: '/dx_front_guide/',
  base: '/',
  title: 'DX 기술지원팀',
  titleTemplate: '시큐센',
  themeConfig: {
    outlineTitle: '바로가기',
    siteTitle: 'DX기술지원팀',
    nav: [
      { text: 'Frontend', link: '/frontend/' },
      { text: 'Backend', link: '/backend/' },
    ],
    sidebar: [
      {
        text: 'Vue 업무개발자가이드',
        collapsible: true,
        collapsed: true,
        items: [
          { text: 'intro', link: '/frontend/' },
          { text: 'Frontend 개발 환경 구성', link: '/frontend/dev-env-config' },
          { text: 'Frontend 개발 규칙 및 구조', link: '/frontend/vue-dev-convention' },
          { text: 'Frontend 업무화면개발 가이드', link: '/frontend/vue-dev-page-guide' },
          { text: 'Vue 스타일가이드', link: '/frontend/vue-style-guide' },
          { text: 'rest API 페이지 적용 방법', link: '/frontend/vue-api-dev-guide' },
          { text: '실습', link: '/frontend/dev-training' },
          { text: 'Frontend 전역객체', link: '/frontend/vue-global-object',
            items: [
              { text: 'ui', link: '/frontend/vue-global-ui-object' },
              { text: 'spa.utils', link: '/frontend/vue-global-spautils-object' },
              { text: 'spa.router', link: '/frontend/vue-global-sparouter-object' },
            ],
          },
        ]
      },
      {
        text: 'Vue 공통개발자가이드',
        collapsible: true,
        collapsed: true,
        items: [
          { text: 'intro', link: '/frontend-common/' },
          { text: '프로젝트생성및vuetify설정', link: '/frontend-common/init-project' },
          { text: '프로젝트빌드배포관련설정', link: '/frontend-common/build-guide' },
          { text: 'ESLint 설정', link: '/frontend-common/eslint-config' },
          { text: 'Custom SVG아이콘 적용방법', link: '/frontend-common/custom-icon' },
          { text: 'DX가이드 개발환경구성', link: '/frontend-common/vscodeDXGuide' },
          { text: '환경셋팅과정중에러조치정리', link: '/frontend-common/init-proj-error-list', },
        ]
      },
      {
        text: 'Vue 퍼블리셔가이드',
        collapsible: true,
        collapsed: true,
        items: [
          { text: 'intro', link: '/frontend-publishing/' },
          { text: 'Frontend 개발 환경 구성', link: '/frontend-publishing/dev-env-config' },
          { text: 'SFC(Vue페이지)에 scss적용', link: '/frontend-publishing/pub-page-style' },
          { text: 'Vuetify SASS Variables 적용', link: '/frontend-publishing/pub-vuetify-style' },
        ]
      },
      {
        text: 'React 업무개발자가이드',
        collapsible: true,
        collapsed: true,
        items: [
          { text: 'intro', link: '/react-dev-guide/' },
          { text: 'Frontend 개발 환경 구성', link: '/react-dev-guide/dev-env-config' },
          { text: 'Frontend 개발 규칙 및 구조', link: '/react-dev-guide/react-dev-convention' },
          { text: 'Frontend 업무화면개발 가이드', link: '/react-dev-guide/react-dev-page-guide' },
          { text: 'React 스타일가이드', link: '/react-dev-guide/react-style-guide' },
          { text: 'REST API 페이지 사용 방법', link: '/react-dev-guide/react-api-dev-guide' },
          { text: 'Frontend 전역 컴포넌트', link: '/react-dev-guide/react-global-component',
            items: [
              { text: 'UI', link: '/react-dev-guide/react-global-ui-object' },
            ],
          },
        ],
      },
      {
        text: 'React 공통개발가이드',
        collapsible: true,
        collapsed: true,
        items: [
          { text: 'intro', link: '/react-common-guide/' },
          { text: 'Frontend개발환경구성', link: '/react-common-guide/common-dev-env-config' },
          { text: '프로젝트처음생성,설정', link: '/react-common-guide/init-project' },
          // { text: '프로젝트빌드배포관련설정', link: '/common-guide/build-guide' },
          // { text: 'ESLint 설정', link: '/common-guide/eslint-config' },
          // { text: 'Custom SVG아이콘 적용방법', link: '/common-guide/custom-icon' },
          // { text: 'DX가이드 개발환경구성', link: '/common-guide/vscodeDXGuide' },
          // { text: '환경셋팅과정중에러조치정리', link: '/common-guide/init-proj-error-list', },
        ]
      },
      {
        text: 'Backend개발자가이드',
        collapsible: true,
        collapsed: true,
        items: [
          { text: 'intro', link: '/backend/' },
					{ text: 'Backend 개발환경구성', link: '/backend/back-dev-env-config'},
					{ text: 'SpringBootApplication개발방법', link: '/backend/back-dev-spring',
            items: [
              { text: '스프링부트 개발 레이어 설명', link: '/backend/back-dev-spring-guide' },
							{ text: '타임리프 화면 개발 프로세스', link: '/backend/back-dev-spring-thymeleaf' },
							{ text: 'Ajax 요청 개발 프로세스', link: '/backend/back-dev-spring-ajaxcall' },
            ],
          },
					{ text: '참고', link: '/backend/back-dev-guide-tip'},
        ]
      },
			{
        text: 'CI/CD 가이드',
        collapsible: true,
        collapsed: true,
        items: [
					{ text: 'intro', link: '/backend-cicd/index'},
					{ text: 'CI/CD 방법 (Jenkins)', link: '/backend-cicd/back-dev-cicd',
						items: [
							{ text: 'Jenkins 이미지 생성', link: '/backend-cicd/back-dev-cicd-dockerfile' },
							{ text: '도커 컨테이너 생성', link: '/backend-cicd/back-dev-cicd-compose' },
							{ text: '도커 볼륨 백업', link: '/backend-cicd/back-dev-cicd-backup' },
							{ text: '도커 볼륨 복원', link: '/backend-cicd/back-dev-cicd-restore' },
							{ text: 'Jenkins 초기 설정', link: '/backend-cicd/back-dev-cicd-jenkins-setting' },
							{ text: 'Jenkins 파이프라인 설정', link: '/backend-cicd/back-dev-cicd-pipeline' },		
						],
					},
					{ text: '참고', link: '/backend-cicd/back-cicd-tip'},
				]
			},
			{ 
				text: 'AWSCodeDeploy가이드', 
				collapsible: true,
				collapsed: true,
				items: [
					{ text: 'intro', link:'/aws/aws-codedeploy'},
					{ text: 'CodeDeploy 가이드', link: '/aws/back-dev-codedeploy' },
					{ text: 'AutoScaling 그룹에 App 배포', link: '/aws/back-dev-codedeploy-app'},
				]
			},
			{ 
				text: 'AWS ALB 가이드', 
				collapsible: true,
				collapsed: true,
				items: [
					{ text: '부하 분산 및 자동조절', link: '/aws/back-dev-auto'},
				]
			},
			{ 
				text: 'AWSAPIGateway가이드', 
				collapsible: true,
				collapsed: true,
				items: [
					{ text: 'intro', link: '/aws/back-dev-api-gateway' },
					{ text: 'API Gateway API 생성가이드', link: '/aws/back-dev-create-gateway' },
					{ text: '사용자지정 도메인 설정 가이드', link: '/aws/back-dev-gateway-domain' },
				]
			},
			{ 
				text: 'AWS EC2 관리 및 설정', 
				collapsible: true,
				collapsed: true,
				items: [
					{ text: 'intro', link: '/aws/aws-ec2-index'},
					{ text: 'EC2 인스턴스 자동화', link: '/aws/aws-ec2-auto'},
					{ text: 'Linux 인스턴스 사용자계정 관리', link: '/aws/linux-create-account'},
				]
			},
			{ 
				text: 'AWS EKS 가이드', 
				collapsible: true,
				collapsed: true,
				items: [
					{ text: 'intro', link: '/aws/index'},
					{ text: 'EKS Cluster Role 생성', link: '/aws/eks-create-cluster-role'},
					{ text: 'EKS Worker Node Role 생성', link: '/aws/eks-node-role'},
					{ text: 'EKS 사용자 계정 생성', link: '/aws/eks-create-account'},
					{ text: 'EKS 클러스터 생성', link: '/aws/eks-create-cluster'},
					{ text: 'EKS Worker Node 생성', link: '/aws/eks-create-node'},
					{ text: 'EKS Pod 삭제', link: '/aws/eks-del-pod'},
				]
			},
      {
        text: '기타환경설정',
        collapsible: false,
        collapsed: true,
        items: [
          { text: 'VSCode+Spring Boot 개발환경', link: '/environment/vscodeSpring' },
          { text: 'DX가이드 개발환경구성', link: '/environment/vscodeDXGuide' },
        ]
      },
			{
				text: 'Site Link',
				collapsible: true,
				collapsed: false,
				items: [
					{ text: 'DFPCEN-ADM', link: 'http://adm.dfpcen.com' },
					{ text: 'DFPCEN-CICD', link: 'http://cicd.dfpcen.com' },
					{ text: 'DFPCEN-API', link: 'http://swagger.dfpcen.com' },
					{ text: 'DFPCEN-FRONT', link: 'http://front.dfpcen.com' },
				]
			},
    ],
  }
}