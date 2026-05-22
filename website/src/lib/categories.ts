export type Category = 'Foundation' | 'Deploy & Infra' | 'Quality & Tools' | 'Visibility'

export interface GuideMeta {
  filename: string
  slug: string
  category: Category
  order: number
}

export const GUIDE_META: GuideMeta[] = [
  { filename: '01_WEB_APP_FUNDAMENTALS.md', slug: 'web-app-fundamentals', category: 'Foundation', order: 1 },
  { filename: '02_FRONTEND_GUIDE.md', slug: 'frontend-guide', category: 'Foundation', order: 2 },
  { filename: '03_BACKEND_GUIDE.md', slug: 'backend-guide', category: 'Foundation', order: 3 },
  { filename: '10_GIT_WORKFLOW_GUIDE.md', slug: 'git-workflow', category: 'Foundation', order: 4 },
  { filename: '11_DATABASE_GUIDE.md', slug: 'database-guide', category: 'Foundation', order: 5 },
  { filename: '04_DEPLOYMENT_GUIDE.md', slug: 'deployment-guide', category: 'Deploy & Infra', order: 6 },
  { filename: '06_DOCKER_GUIDE.md', slug: 'docker-guide', category: 'Deploy & Infra', order: 7 },
  { filename: '07_SERVER_VPS_GUIDE.md', slug: 'server-vps-guide', category: 'Deploy & Infra', order: 8 },
  { filename: '08_DOMAIN_HOSTING_GUIDE.md', slug: 'domain-hosting-guide', category: 'Deploy & Infra', order: 9 },
  { filename: '09_CICD_DEVOPS_GUIDE.md', slug: 'cicd-devops-guide', category: 'Deploy & Infra', order: 10 },
  { filename: '05_PERFORMANCE_GUIDE.md', slug: 'performance-guide', category: 'Quality & Tools', order: 11 },
  { filename: '13_TESTING_GUIDE.md', slug: 'testing-guide', category: 'Quality & Tools', order: 12 },
  { filename: '14_DEVELOPER_TOOLKIT_GUIDE.md', slug: 'developer-toolkit', category: 'Quality & Tools', order: 13 },
  { filename: '12_AI_TOOLS_GUIDE.md', slug: 'ai-tools-guide', category: 'Quality & Tools', order: 14 },
  { filename: 'SEO_MASTER_GUIDE.md', slug: 'seo-master-guide', category: 'Visibility', order: 15 },
  { filename: 'SEO_CHECKLIST.md', slug: 'seo-checklist', category: 'Visibility', order: 16 },
]

export const CATEGORIES: Category[] = ['Foundation', 'Deploy & Infra', 'Quality & Tools', 'Visibility']

export function getMetaBySlug(slug: string): GuideMeta | undefined {
  return GUIDE_META.find(g => g.slug === slug)
}
