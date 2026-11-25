export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: 'cloudquik',
    role: 'DevOps Engineer',
    company: 'CloudQuik',
    location: 'Islamabad, Pakistan',
    period: 'February 2025 – Present',
    highlights: [
      'Built and managed scalable AWS infrastructure using Terraform, Ansible, and CloudFormation.',
      'Automated CI/CD pipelines with Jenkins, GitHub Actions, and AWS CodePipeline.',
      'Containerized applications with Docker and managed orchestration using Kubernetes (EKS).',
      'Standardized deployment workflows by creating reusable IaC modules and Docker configurations.',
      'Integrated IAM roles and policies into CI/CD pipelines to strengthen security and access control.',
      'Deployed microservices using AWS Lambda, API Gateway, and EKS.',
      'Monitored infrastructure using Prometheus, Grafana, CloudWatch, and Datadog.',
      'Automated operational tasks using Bash, Python, and PowerShell via Ansible.',
      'Led cloud migrations and implemented backup and disaster recovery strategies using S3 and Lambda.',
      'Ensured infrastructure compliance with AWS security best practices.'
    ]
  },
  {
    id: 'ewarenet',
    role: 'Jr. DevOps Engineer',
    company: 'Ewarenet',
    location: 'Islamabad, Pakistan',
    period: 'March 2022 – December 2024',
    highlights: [
      'Migrated Terraform and Jenkins credentials to AWS Secrets Manager, improving security and removing dependency on git-crypt.',
      'Maintained and updated Terraform modules and CloudFormation templates for AWS infrastructure.',
      'Built Development, Staging, and Production environments using Terraform, Docker, and Elastic Beanstalk.',
      'Monitored core AWS services including EC2, S3, VPC, Route 53, Lambda, and IAM for availability and performance.',
      'Deployed microservices to Amazon ECS using AWS Fargate and Docker for serverless orchestration.',
      'Built Jenkins pipelines to package Docker images, push to ECR, and deploy to EKS.',
      'Developed CI/CD workflows using Jenkins, Terraform, Docker, and CloudFormation.',
      'Deployed and backed up EKS clusters using Terraform, Docker, and the AWS CLI.',
      'Configured and monitored EKS with IAM roles, CloudWatch, and Docker-based monitoring tools.',
      'Managed Git workflows and release pipelines with Jenkins, Docker, and AWS CLI.',
      'Integrated CloudWatch with IAM for secure, compliant infrastructure monitoring.'
    ]
  }
];
