export interface Profile {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedIn: string;
  linkedInLabel: string;
  /** One-line intro under the name in the hero. */
  intro: string;
  /** Short description used for SEO metadata and the share image. */
  summary: string;
  /** First-person About paragraphs. */
  about: string[];
}

export const profileData: Profile = {
  name: 'Abdul Ahad',
  title: 'DevOps Engineer',
  location: 'Islamabad, Pakistan',
  phone: '+92 314 7062005',
  email: 'abdul12101ahad@gmail.com',
  linkedIn: 'https://www.linkedin.com/in/abdul-ahad-94007a27a',
  linkedInLabel: 'linkedin.com/in/abdul-ahad-94007a27a',
  intro:
    'I build and run AWS infrastructure with Terraform, Kubernetes (EKS) and the CI/CD pipelines that deploy to it.',
  summary:
    'DevOps Engineer in Islamabad with 4+ years on AWS: Terraform, CloudFormation, Kubernetes (EKS), Docker and CI/CD with Jenkins, GitHub Actions and ArgoCD.',
  about: [
    'I have spent a little over four years working on AWS infrastructure, starting as a junior DevOps engineer and growing into a full DevOps role.',
    'Most of my day-to-day is Infrastructure as Code with Terraform and CloudFormation, CI/CD pipelines in Jenkins, GitHub Actions and ArgoCD, and running containerised services on EKS and ECS.',
    'Alongside that I look after secrets management, monitoring, and backup and recovery across development, staging and production environments.'
  ]
};
