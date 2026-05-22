export const GUIDE_TAGS: Record<string, string[]> = {
  'web-app-fundamentals': ['frontend', 'backend'],
  'frontend-guide': ['frontend'],
  'backend-guide': ['backend'],
  'git-workflow': ['git'],
  'database-guide': ['database', 'backend'],
  'deployment-guide': ['devops'],
  'docker-guide': ['docker', 'devops'],
  'server-vps-guide': ['devops'],
  'domain-hosting-guide': ['devops'],
  'cicd-devops-guide': ['devops', 'git'],
  'performance-guide': ['performance', 'frontend'],
  'testing-guide': ['testing'],
  'developer-toolkit': ['frontend', 'backend'],
  'ai-tools-guide': ['ai'],
  'seo-master-guide': ['seo'],
  'seo-checklist': ['seo'],
  'seo-discovery-guide': ['seo'],
  'typescript-guide': ['typescript', 'frontend', 'backend'],
  'auth-guide': ['auth', 'backend'],
  'payments-guide': ['backend', 'devops'],
  'monitoring-guide': ['devops', 'testing'],
}

export const ALL_TAGS = [
  'frontend', 'backend', 'devops', 'database',
  'testing', 'seo', 'auth', 'performance',
  'typescript', 'git', 'docker', 'ai',
] as const

export type Tag = (typeof ALL_TAGS)[number]
