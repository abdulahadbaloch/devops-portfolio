export interface Profile {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedIn: string;
  summary: string;
  experienceYears: string;
  terminalSkills: string[];
}

export const profileData: Profile = {
  name: 'Abdul Ahad',
  title: 'DevOps Engineer | Cloud Architect',
  location: 'Islamabad, Pakistan',
  phone: '+92 314 7062005',
  email: 'abdul12101ahad@gmail.com',
  linkedIn: 'https://www.linkedin.com/in/abdul-ahad-94007a27a?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  summary:
    'DevOps Engineer with 4+ years of experience designing, deploying, and automating scalable, secure cloud infrastructure on AWS. Skilled in Infrastructure as Code with Terraform and CloudFormation, CI/CD automation with Jenkins, GitHub Actions, and ArgoCD, and container orchestration with Docker and Kubernetes (EKS). Experienced in configuration management, secrets handling, and centralized monitoring across multi-environment production systems. Focused on building reliable, compliant, and cost-efficient cloud environments aligned with AWS best practices.',
  experienceYears: '4+ years',
  terminalSkills: [
    'Terraform',
    'Kubernetes (EKS)',
    'Amazon Web Services',
    'CI/CD Pipelines',
    'Docker & Microservices',
    'Ansible & Automation',
    'Prometheus & Grafana',
    'Cloud Security & IAM'
  ]
};
