export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    category: 'Cloud Platform',
    skills: [
      'AWS (EC2, S3, RDS, Lambda, IAM, VPC, Route 53, CloudFront, ECS, EKS, CloudWatch, CloudFormation, API Gateway, DynamoDB, EBS, S3 Glacier, AWS CLI, AWS Secrets Manager)'
    ]
  },
  {
    category: 'Infrastructure as Code',
    skills: ['Terraform', 'AWS CloudFormation', 'AWS SAM']
  },
  {
    category: 'CI/CD',
    skills: ['Jenkins', 'GitHub Actions', 'GitLab CI/CD', 'AWS CodePipeline', 'ArgoCD']
  },
  {
    category: 'Containers & Orchestration',
    skills: ['Docker', 'Docker Compose', 'Kubernetes (EKS)']
  },
  {
    category: 'Configuration Management',
    skills: ['Ansible', 'Chef', 'Puppet']
  },
  {
    category: 'Monitoring & Logging',
    skills: [
      'CloudWatch',
      'Prometheus',
      'Grafana',
      'ELK Stack',
      'Datadog',
      'Splunk',
      'New Relic'
    ]
  },
  {
    category: 'Security & Secrets Management',
    skills: [
      'IAM',
      'AWS Secrets Manager',
      'HashiCorp Vault',
      'Encryption at Rest and In Transit'
    ]
  },
  {
    category: 'Networking',
    skills: [
      'Load Balancers',
      'Route 53',
      'DNS',
      'NAT Gateway',
      'VPC',
      'Security Groups',
      'Internet Gateway'
    ]
  },
  {
    category: 'Scripting',
    skills: ['Bash', 'Python', 'PowerShell']
  },
  {
    category: 'Version Control',
    skills: ['Git', 'GitHub', 'GitLab', 'Bitbucket']
  },
  {
    category: 'Image & Environment Tools',
    skills: ['Packer', 'Vagrant']
  },
  {
    category: 'Collaboration Tools',
    skills: ['Jira', 'Trello', 'Notion', 'Slack']
  }
];
