export interface Project {
  id: string;
  title: string;
  focusTag: string;
  bullets: string[];
  techStack: string[];
}

export const projectsData: Project[] = [
  {
    id: 'hospital-management-system',
    title: 'Hospital Management System Deployment on AWS',
    focusTag: 'Security & Compliance Focus',
    bullets: [
      'Designed and deployed a secure, scalable Hospital Management System on AWS using EC2, RDS, S3, VPC, IAM, Route 53, and an Application Load Balancer.',
      'Containerized backend services with Docker and orchestrated workloads using Amazon EKS.',
      'Managed configuration consistency across environments using Ansible.',
      'Stored and rotated application secrets using HashiCorp Vault and AWS Secrets Manager to meet healthcare data security requirements.',
      'Automated infrastructure provisioning using Terraform and CloudFormation across Development, Staging, and Production environments.',
      'Built CI/CD pipelines using Jenkins, GitHub Actions, and ArgoCD for automated application deployment to EKS.',
      'Implemented centralized monitoring with CloudWatch, Prometheus, and Grafana for infrastructure and application health.',
      'Configured IAM roles, encrypted storage, and secure networking to meet healthcare compliance requirements.',
      'Automated backup and disaster recovery using AWS Backup, snapshots, and S3 lifecycle policies.'
    ],
    techStack: [
      'AWS (EC2, RDS, S3, VPC, IAM, Route 53, ALB)',
      'Docker',
      'Kubernetes (EKS)',
      'Ansible',
      'HashiCorp Vault',
      'AWS Secrets Manager',
      'Terraform',
      'CloudFormation',
      'Jenkins',
      'GitHub Actions',
      'ArgoCD',
      'Prometheus',
      'Grafana',
      'CloudWatch'
    ]
  },
  {
    id: 'e-commerce-platform',
    title: 'E-Commerce Platform Deployment on AWS',
    focusTag: 'High Availability & Scaling Focus',
    bullets: [
      'Architected and deployed a highly available e-commerce platform on AWS using EC2, Auto Scaling Groups, an Application Load Balancer, RDS, CloudFront, Route 53, and S3.',
      'Containerized microservices with Docker and deployed them to Amazon EKS for efficient scaling and management.',
      'Built custom, hardened AMIs using Packer to standardize and speed up instance provisioning.',
      'Provisioned complete cloud infrastructure using Terraform and AWS CloudFormation.',
      'Built end-to-end CI/CD pipelines with Jenkins, GitHub Actions, AWS CodePipeline, and ArgoCD for zero-downtime deployments.',
      'Configured CloudWatch dashboards, Prometheus, and Grafana for real-time monitoring and proactive alerting.',
      'Implemented IAM security policies, encrypted application data, and configured a WAF-ready architecture for production deployments.',
      'Optimized application performance through Auto Scaling, CloudFront caching, and efficient resource utilization.'
    ],
    techStack: [
      'AWS (EC2, ASG, ALB, RDS, CloudFront, Route 53, S3)',
      'Docker',
      'Kubernetes (EKS)',
      'Packer',
      'Terraform',
      'CloudFormation',
      'Jenkins',
      'GitHub Actions',
      'AWS CodePipeline',
      'ArgoCD',
      'Prometheus',
      'Grafana',
      'CloudWatch'
    ]
  },
  {
    id: 'vaccine-website',
    title: 'Vaccine Website Deployment on AWS',
    focusTag: 'Multi-Environment & Observability Focus',
    bullets: [
      'Designed and implemented a resilient AWS architecture using EC2, S3, CloudFront, and Route 53 to maintain high availability during peak traffic.',
      'Containerized the application using Docker to optimize resource utilization and enable seamless scaling.',
      'Orchestrated Kubernetes (EKS) clusters for container management, deployment, and scaling of application services.',
      'Managed configuration and environment consistency across Development, Staging, and Production using Chef and Puppet.',
      'Automated infrastructure provisioning using Terraform, reducing manual configuration effort across environments.',
      'Built CI/CD pipelines using Jenkins, GitLab CI/CD, and ArgoCD for automated, reliable deployment workflows to EKS.',
      'Integrated monitoring and alerting using Grafana, AWS CloudWatch, and Splunk for real-time visibility into system performance and security.'
    ],
    techStack: [
      'AWS (EC2, S3, CloudFront, Route 53, EKS)',
      'Docker',
      'Chef',
      'Puppet',
      'Terraform',
      'Jenkins',
      'GitLab CI/CD',
      'ArgoCD',
      'Grafana',
      'CloudWatch',
      'Splunk'
    ]
  }
];
