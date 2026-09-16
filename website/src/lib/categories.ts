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
  { filename: '20_GETTING_PAID_AI_ERA.md', slug: 'getting-paid-ai-era', category: 'AI & Agents', order: 22 },
  { filename: '21_SELLING_AI_AGENTS_TO_CLIENTS.md', slug: 'selling-ai-agents', category: 'AI & Agents', order: 23 },
  { filename: '22_BUILDING_YOUR_FIRST_AI_AGENT.md', slug: 'building-first-ai-agent', category: 'AI & Agents', order: 24 },
  { filename: '23_AGENTIC_CODING_CLAUDE_CODE.md', slug: 'agentic-coding-claude-code', category: 'AI & Agents', order: 25 },
  { filename: '24_EVAL_DRIVEN_DEVELOPMENT.md', slug: 'eval-driven-development', category: 'AI & Agents', order: 26 },
  { filename: '25_DEVELOPER_PORTFOLIO_BRANDING.md', slug: 'developer-portfolio-branding', category: 'AI & Agents', order: 27 },
  { filename: '26_TECHNICAL_INTERVIEW_PREP.md', slug: 'technical-interview-prep', category: 'AI & Agents', order: 28 },
  { filename: '27_MCP_MODEL_CONTEXT_PROTOCOL.md', slug: 'mcp-model-context-protocol', category: 'AI & Agents', order: 29 },
  { filename: '28_MICRO_SAAS_SOLO_DEVELOPER.md', slug: 'micro-saas-solo-developer', category: 'AI & Agents', order: 30 },
  { filename: '29_SPEC_DRIVEN_VS_VIBE_CODING.md', slug: 'spec-driven-vs-vibe-coding', category: 'AI & Agents', order: 31 },
]

export const CATEGORIES: Category[] = ['Foundation', 'Deploy & Infra', 'Quality & Tools', 'Visibility', 'AI & Agents']

export function getMetaBySlug(slug: string): GuideMeta | undefined {
  return GUIDE_META.find(g => g.slug === slug)
}
