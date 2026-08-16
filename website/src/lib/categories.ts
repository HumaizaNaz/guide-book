export type Category = 'Foundation' | 'Deploy & Infra' | 'Quality & Tools' | 'Visibility' | 'AI & Agents'

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
  { filename: '15_SEO_DISCOVERY_GUIDE.md', slug: 'seo-discovery-guide', category: 'Visibility', order: 17 },
  { filename: '16_TYPESCRIPT_GUIDE.md', slug: 'typescript-guide', category: 'Foundation', order: 18 },
  { filename: '17_AUTH_GUIDE.md', slug: 'auth-guide', category: 'Foundation', order: 19 },
  { filename: '18_PAYMENTS_GUIDE.md', slug: 'payments-guide', category: 'Deploy & Infra', order: 20 },
  { filename: '19_MONITORING_GUIDE.md', slug: 'monitoring-guide', category: 'Quality & Tools', order: 21 },
  { filename: '20_EXAM_PREP_L1_THESIS.md', slug: 'agent-thesis-plain-english', category: 'AI & Agents', order: 22 },
  { filename: '21_EXAM_PREP_L1_THESIS_ROMAN_URDU.md', slug: 'agent-thesis-roman-urdu', category: 'AI & Agents', order: 23 },
  { filename: '22_EXAM_PREP_L1_THESIS_FULL_NEW.md', slug: 'agent-thesis-full-version', category: 'AI & Agents', order: 24 },
  { filename: '23_EXAM_PREP_L1_GETTING_STARTED.md', slug: 'ai-agents-getting-started', category: 'AI & Agents', order: 25 },
  { filename: '24_EXAM_PREP_L1_AI_PROMPTING_2026.md', slug: 'ai-prompting-2026', category: 'AI & Agents', order: 26 },
  { filename: '25_EXAM_PREP_L1_AI_OPERATING_LAYER.md', slug: 'ai-operating-layer', category: 'AI & Agents', order: 27 },
  { filename: '26_EXAM_PREP_L1_AI_OPERATING_LAYER_ROMAN_URDU.md', slug: 'ai-operating-layer-roman-urdu', category: 'AI & Agents', order: 28 },
]

export const CATEGORIES: Category[] = ['Foundation', 'Deploy & Infra', 'Quality & Tools', 'Visibility', 'AI & Agents']

export function getMetaBySlug(slug: string): GuideMeta | undefined {
  return GUIDE_META.find(g => g.slug === slug)
}
