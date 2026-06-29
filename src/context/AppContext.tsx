import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  SkillItem, 
  TechRecommendation, 
  RoadmapPhase, 
  ActivityItem, 
  AchievementBadge,
  AssessmentSubmission 
} from '../types';

interface AppContextType {
  user: UserProfile | null;
  skills: SkillItem[];
  recommendations: TechRecommendation[];
  roadmap: RoadmapPhase[];
  activities: ActivityItem[];
  badges: AchievementBadge[];
  isAuthenticated: boolean;
  login: (email: string, password?: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, password?: string) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  submitAssessment: (assessment: AssessmentSubmission) => void;
  toggleSession: (phaseId: string, sessionId: string) => void;
  enrollTech: (techId: string) => void;
  addActivity: (title: string, type: ActivityItem['type'], points: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const getSkillCategory = (skillName: string): SkillItem['category'] => {
  const name = skillName.toLowerCase();
  if (name.includes('cloud') || name.includes('aws') || name.includes('azure') || name.includes('gcp') || name.includes('kubernetes') || name.includes('docker') || name.includes('terraform')) {
    return 'Cloud Engineering';
  }
  if (name.includes('ai') || name.includes('machine learning') || name.includes('deep learning') || name.includes('tensorflow') || name.includes('pytorch') || name.includes('data science') || name.includes('data analytics') || name.includes('statistics') || name.includes('pandas') || name.includes('numpy') || name.includes('scikit')) {
    return 'AI & Data Science';
  }
  if (name.includes('cyber') || name.includes('security') || name.includes('testing') || name.includes('automation') || name.includes('devops') || name.includes('ci/cd')) {
    return 'DevOps & Security';
  }
  return 'Backend & System Design';
};

export const getRequiredSkillsForGoal = (careerGoal: string): string[] => {
  const goal = careerGoal.toLowerCase();
  if (goal.includes('frontend')) {
    return ['HTML', 'CSS', 'JavaScript', 'React', 'Git', 'Tailwind CSS'];
  }
  if (goal.includes('backend')) {
    return ['Node.js', 'Express.js', 'Spring Boot', 'PostgreSQL', 'SQL', 'REST APIs'];
  }
  if (goal.includes('mern')) {
    return ['MongoDB', 'Express.js', 'React', 'Node.js', 'JavaScript', 'Git'];
  }
  if (goal.includes('java full stack') || goal.includes('java fullstack')) {
    return ['Java', 'Spring Boot', 'React', 'SQL', 'Git', 'Hibernate'];
  }
  if (goal.includes('python full stack') || goal.includes('python fullstack')) {
    return ['Python', 'Django', 'React', 'PostgreSQL', 'REST APIs', 'Git'];
  }
  if (goal.includes('full stack') || goal.includes('fullstack')) {
    return ['React', 'Node.js', 'SQL', 'HTML', 'CSS', 'Git'];
  }
  if (goal.includes('ai engineer') || goal.includes('artificial intelligence') || goal.includes('intelligence')) {
    return ['Python', 'Deep Learning', 'AI/ML', 'TensorFlow', 'PyTorch', 'Generative AI'];
  }
  if (goal.includes('machine learning')) {
    return ['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'PyTorch', 'Deep Learning'];
  }
  if (goal.includes('data scientist')) {
    return ['Python', 'Pandas', 'Statistics', 'Scikit-learn', 'SQL', 'Data Science'];
  }
  if (goal.includes('data analyst')) {
    return ['SQL', 'Excel', 'Pandas', 'Python', 'Data Analytics', 'Figma'];
  }
  if (goal.includes('cloud engineer')) {
    return ['Cloud Computing', 'AWS', 'Docker', 'Kubernetes', 'Linux', 'Git'];
  }
  if (goal.includes('devops')) {
    return ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform (IaC)', 'Git'];
  }
  if (goal.includes('cybersecurity') || goal.includes('cyber security')) {
    return ['Cyber Security', 'Network Security', 'Linux', 'Git', 'OWASP Rules'];
  }
  if (goal.includes('mobile')) {
    return ['React Native', 'Flutter', 'JavaScript', 'Mobile Development', 'Git'];
  }
  if (goal.includes('ui/ux') || goal.includes('design')) {
    return ['UI/UX Design', 'Figma', 'User Psychology', 'Figma components', 'Git'];
  }
  if (goal.includes('product')) {
    return ['JavaScript', 'React', 'System Design', 'Figma', 'UI/UX Design', 'Git'];
  }
  if (goal.includes('blockchain')) {
    return ['Cryptography', 'Blockchain', 'Smart Contracts', 'Solidity', 'Git'];
  }
  if (goal.includes('solutions architect') || goal.includes('solutions')) {
    return ['AWS', 'Cloud Computing', 'Terraform (IaC)', 'Kubernetes Orchestration', 'Docker', 'System Design', 'Git'];
  }
  return ['HTML', 'CSS', 'JavaScript', 'React', 'Git'];
};

const initialSkills: SkillItem[] = [
  { id: '1', name: 'Docker & Containerization', category: 'Cloud Engineering', currentMatch: 85, requiredLevel: 90, status: 'On Track' },
  { id: '2', name: 'Kubernetes Orchestration', category: 'Cloud Engineering', currentMatch: 42, requiredLevel: 85, status: 'Gap Identified' },
  { id: '3', name: 'Terraform (IaC)', category: 'Cloud Engineering', currentMatch: 20, requiredLevel: 80, status: 'Critical Missing' },
  { id: '4', name: 'AWS Solutions Architecture', category: 'Cloud Engineering', currentMatch: 68, requiredLevel: 85, status: 'On Track' },
  { id: '5', name: 'Node.js & Express API Development', category: 'Backend & System Design', currentMatch: 90, requiredLevel: 90, status: 'Mastered' },
  { id: '6', name: 'Database Design & SQL', category: 'Backend & System Design', currentMatch: 75, requiredLevel: 85, status: 'On Track' },
];

const initialRecommendations: TechRecommendation[] = [
  {
    id: 'rec1',
    name: 'AWS Certified Cloud Practitioner',
    category: 'Cloud Engineering',
    description: 'Comprehensive introduction to AWS core services, architecture, security, and pricing models.',
    icon: '☁',
    difficulty: 'Beginner',
    priority: 'High',
    estHours: 12,
    tags: ['AWS', 'Cloud', 'Infrastructure'],
    resources: [
      { title: 'AWS Cloud Practitioner Essentials', type: 'course', url: 'https://aws.amazon.com/training/' },
      { title: 'Official AWS Whitepapers', type: 'doc', url: 'https://aws.amazon.com/whitepapers/' }
    ],
    enrolled: false,
  },
  {
    id: 'rec2',
    name: 'GoLang Fundamentals',
    category: 'Backend & System Design',
    description: 'Learn the fundamentals of Go, a statically typed language designed for system level development.',
    icon: '⚙',
    difficulty: 'Intermediate',
    priority: 'Medium',
    estHours: 18,
    tags: ['Go', 'Backend', 'Performance'],
    resources: [
      { title: 'A Tour of Go', type: 'course', url: 'https://tour.golang.org/' },
      { title: 'Effective Go Documentation', type: 'doc', url: 'https://golang.org/doc/effective_go' }
    ],
    enrolled: false,
  },
  {
    id: 'rec3',
    name: 'Kubernetes in Practice',
    category: 'Cloud Engineering',
    description: 'Master container orchestration with production-grade Kubernetes deployments, service meshes, and scaling.',
    icon: '◈',
    difficulty: 'Advanced',
    priority: 'High',
    estHours: 30,
    tags: ['Kubernetes', 'DevOps', 'Docker'],
    resources: [
      { title: 'Kubernetes Academy', type: 'course', url: 'https://kubernetes.io/' },
      { title: 'Production Best Practices', type: 'doc', url: 'https://kubernetes.io/docs/' }
    ],
    enrolled: false,
  },
  {
    id: 'rec4',
    name: 'Terraform Infrastructure as Code',
    category: 'Cloud Engineering',
    description: 'Provision and manage any cloud, infrastructure, or service with declarative HashiCorp Configuration Language.',
    icon: '◬',
    difficulty: 'Intermediate',
    priority: 'High',
    estHours: 15,
    tags: ['Terraform', 'IaC', 'DevOps'],
    resources: [
      { title: 'HashiCorp Learn: Terraform', type: 'course', url: 'https://learn.hashicorp.com/' }
    ],
    enrolled: false,
  }
];

const initialRoadmap: RoadmapPhase[] = [
  {
    id: 'p1',
    phaseNumber: 1,
    title: 'Containerization & Foundations',
    subtitle: 'Docker architecture, images, volumes, and multi-container setups',
    status: 'Completed',
    sessions: [
      { id: 's101', title: 'Container Basics & Docker CLI', durationHours: 2, completed: true, type: 'concept' },
      { id: 's102', title: 'Writing Production-Grade Dockerfiles', durationHours: 3, completed: true, type: 'hands-on' },
      { id: 's103', title: 'Docker Compose Orchestration', durationHours: 4, completed: true, type: 'hands-on' },
      { id: 's104', title: 'Foundations Assessment Quiz', durationHours: 1, completed: true, type: 'quiz' }
    ]
  },
  {
    id: 'p2',
    phaseNumber: 2,
    title: 'Advanced Architecture & Orchestration',
    subtitle: 'Kubernetes Pods, Services, Deployments, and Helm charts',
    status: 'In Progress',
    sessions: [
      { id: 's201', title: 'State Management & Pod Lifecycle', durationHours: 3, completed: true, type: 'concept' },
      { id: 's202', title: 'API Gateway & Ingress Routing', durationHours: 4, completed: false, type: 'hands-on' },
      { id: 's203', title: 'OAuth Flows & Secrets Management', durationHours: 3, completed: false, type: 'hands-on' },
      { id: 's204', title: 'Kubernetes Networking Deep-dive', durationHours: 4, completed: false, type: 'concept' }
    ]
  },
  {
    id: 'p3',
    phaseNumber: 3,
    title: 'Infrastructure as Code & Cloud GitOps',
    subtitle: 'Terraform providers, variables, remote backends, and CI/CD pipelines',
    status: 'Locked',
    sessions: [
      { id: 's301', title: 'Terraform Basics & Providers', durationHours: 3, completed: false, type: 'concept' },
      { id: 's302', title: 'State Management & Workspaces', durationHours: 4, completed: false, type: 'hands-on' },
      { id: 's303', title: 'Constructing CI/CD Pipelines', durationHours: 5, completed: false, type: 'hands-on' }
    ]
  }
];

const initialActivities: ActivityItem[] = [
  { id: 'a1', title: 'Completed "State Management" Roadmap Session', timestamp: '2 hours ago', type: 'roadmap', points: 50 },
  { id: 'a2', title: 'Enrolled in GoLang Fundamentals recommendation', timestamp: '1 day ago', type: 'roadmap', points: 20 },
  { id: 'a3', title: 'Unlocked badge "Docker Navigator"', timestamp: '2 days ago', type: 'badge', points: 100 },
  { id: 'a4', title: 'Completed Initial Skill Assessment', timestamp: '3 days ago', type: 'assessment', points: 150 },
];

interface BadgeDetail {
  title: string;
  description: string;
  icon: string;
}

const domainBadgeConfigs: Record<string, { b1: BadgeDetail; b3: BadgeDetail; b4: BadgeDetail }> = {
  'Web Development': {
    b1: { title: 'HTML5 Master', description: 'Complete Phase 1 and master web foundations.', icon: '🌐' },
    b3: { title: 'Web Architect', description: 'Achieve an overall skill readiness score above 80%.', icon: '📐' },
    b4: { title: 'CSS Stylist', description: 'Complete a CSS layout practical exercise.', icon: '🎨' }
  },
  'Frontend Development': {
    b1: { title: 'Component Artisan', description: 'Complete Phase 1 and master framework foundations.', icon: '⚛️' },
    b3: { title: 'UI Engineer Pro', description: 'Achieve an overall skill readiness score above 80%.', icon: '✨' },
    b4: { title: 'State Manager', description: 'Complete a React hooks state exercise.', icon: '⚡' }
  },
  'Backend Development': {
    b1: { title: 'Node.js Architect', description: 'Complete Phase 1 and master server foundations.', icon: '🟢' },
    b3: { title: 'System Guardian', description: 'Achieve an overall skill readiness score above 80%.', icon: '🛡️' },
    b4: { title: 'Database Pro', description: 'Complete an Express database validation exercise.', icon: '💾' }
  },
  'Full Stack Development': {
    b1: { title: 'Full Stack Explorer', description: 'Complete Phase 1 and master full-stack foundations.', icon: '🥞' },
    b3: { title: 'MERN Specialist', description: 'Achieve an overall skill readiness score above 80%.', icon: '🚀' },
    b4: { title: 'Fullstack Integrator', description: 'Complete a full-stack CRUD practical exercise.', icon: '⛓️' }
  },
  'Web Architecture': {
    b1: { title: 'SaaS Builder', description: 'Complete Phase 1 and master web infrastructure.', icon: '🏗️' },
    b3: { title: 'Enterprise Architect', description: 'Achieve an overall skill readiness score above 80%.', icon: '🏛️' },
    b4: { title: 'SLA Optimizer', description: 'Complete a performance scaling practical exercise.', icon: '📈' }
  },
  'API Development': {
    b1: { title: 'API Integrator', description: 'Complete Phase 1 and master REST API structures.', icon: '🔌' },
    b3: { title: 'Endpoint Master', description: 'Achieve an overall skill readiness score above 80%.', icon: '🗺️' },
    b4: { title: 'Payload Validator', description: 'Complete a schema validation practical exercise.', icon: '📝' }
  },
  'Database Design': {
    b1: { title: 'SQL Alchemist', description: 'Complete Phase 1 and master relational database structures.', icon: '📊' },
    b3: { title: 'Query Optimizer', description: 'Achieve an overall skill readiness score above 80%.', icon: '🗄️' },
    b4: { title: 'Index Builder', description: 'Complete a database indexing practical exercise.', icon: '🛠️' }
  },
  'Cloud Infrastructure': {
    b1: { title: 'Cloud Navigator', description: 'Complete Phase 1 and master cloud services foundations.', icon: '☁️' },
    b3: { title: 'Solutions Architect', description: 'Achieve an overall skill readiness score above 80%.', icon: '⚙️' },
    b4: { title: 'Infrastructure Coder', description: 'Complete a cloud infrastructure exercise.', icon: '💻' }
  },
  'DevOps Engineering': {
    b1: { title: 'Docker Navigator', description: 'Complete Phase 1 and master containerization basics.', icon: '🐳' },
    b3: { title: 'Cloud Architect', description: 'Achieve an overall skill readiness score above 80%.', icon: '☁' },
    b4: { title: 'Terraformer', description: 'Complete a Terraform practical exercise.', icon: '🏗' }
  },
  'Machine Learning': {
    b1: { title: 'Python Modeler', description: 'Complete Phase 1 and master regression models.', icon: '🐍' },
    b3: { title: 'ML Researcher', description: 'Achieve an overall skill readiness score above 80%.', icon: '🎓' },
    b4: { title: 'Data Pipeline Specialist', description: 'Complete an ML feature scaling exercise.', icon: '🧬' }
  },
  'Artificial Intelligence': {
    b1: { title: 'Neural Architect', description: 'Complete Phase 1 and master basic neural networks.', icon: '🧠' },
    b3: { title: 'AI Specialist', description: 'Achieve an overall skill readiness score above 80%.', icon: '🌟' },
    b4: { title: 'Tensor Solver', description: 'Complete a model training exercise.', icon: '📐' }
  },
  'Generative AI': {
    b1: { title: 'Prompt Engineer', description: 'Complete Phase 1 and master prompt design layouts.', icon: '✍️' },
    b3: { title: 'LLM Expert', description: 'Achieve an overall skill readiness score above 80%.', icon: '🪄' },
    b4: { title: 'Embeddings Specialist', description: 'Complete a Vector DB retrieval exercise.', icon: '📂' }
  },
  'Data Science': {
    b1: { title: 'Data Wrangler', description: 'Complete Phase 1 and master panda matrix structures.', icon: '🐼' },
    b3: { title: 'Data Scientist', description: 'Achieve an overall skill readiness score above 80%.', icon: '🔬' },
    b4: { title: 'Hypothesis Tester', description: 'Complete a statistical testing practical exercise.', icon: '📈' }
  },
  'Data Analytics': {
    b1: { title: 'Metric Explorer', description: 'Complete Phase 1 and master analytics telemetry.', icon: '📈' },
    b3: { title: 'BI Consultant', description: 'Achieve an overall skill readiness score above 80%.', icon: '💼' },
    b4: { title: 'Dashboard Designer', description: 'Complete an interactive dashboard project.', icon: '📊' }
  },
  'Mobile Development': {
    b1: { title: 'Mobile Creator', description: 'Complete Phase 1 and master layout rendering bridges.', icon: '📱' },
    b3: { title: 'Native Specialist', description: 'Achieve an overall skill readiness score above 80%.', icon: '🎖️' },
    b4: { title: 'Bridge Architect', description: 'Complete a native component exercise.', icon: '🌉' }
  },
  'Cybersecurity Protocols': {
    b1: { title: 'SecOps Sentinel', description: 'Complete Phase 1 and master network security protocols.', icon: '🛡️' },
    b3: { title: 'White Hat Security', description: 'Achieve an overall skill readiness score above 80%.', icon: '🕵️' },
    b4: { title: 'Firewall Configurator', description: 'Complete a firewall rules practical exercise.', icon: '🧱' }
  },
  'UI/UX Interactive Designs': {
    b1: { title: 'Figma Maestro', description: 'Complete Phase 1 and master interactive UI wireframes.', icon: '🎨' },
    b3: { title: 'Interaction Designer', description: 'Achieve an overall skill readiness score above 80%.', icon: '🔮' },
    b4: { title: 'Design System Architect', description: 'Complete a component library project.', icon: '📚' }
  },
  'Software Architecture': {
    b1: { title: 'Software Planner', description: 'Complete Phase 1 and master design decomposition patterns.', icon: '📐' },
    b3: { title: 'Principal Architect', description: 'Achieve an overall skill readiness score above 80%.', icon: '👑' },
    b4: { title: 'Refactoring Specialist', description: 'Complete a code modularization exercise.', icon: '🔄' }
  },
  'System Design': {
    b1: { title: 'Scalability Specialist', description: 'Complete Phase 1 and master distributed patterns.', icon: '🔗' },
    b3: { title: 'Systems Guru', description: 'Achieve an overall skill readiness score above 80%.', icon: '🚀' },
    b4: { title: 'Cluster Optimizer', description: 'Complete a load balancing setup exercise.', icon: '📊' }
  },
  'Automation Testing': {
    b1: { title: 'QA Automatist', description: 'Complete Phase 1 and master assertion structures.', icon: '🧪' },
    b3: { title: 'SDET Pro', description: 'Achieve an overall skill readiness score above 80%.', icon: '🏅' },
    b4: { title: 'Test Pipeline Integrator', description: 'Complete an E2E testing pipeline exercise.', icon: '🔄' }
  }
};

const generateBadgesForDomain = (domain: string, currentBadges?: AchievementBadge[], currentRoadmap?: RoadmapPhase[], currentReadinessScore?: number): AchievementBadge[] => {
  const config = domainBadgeConfigs[domain] || domainBadgeConfigs['DevOps Engineering'];
  
  const baseBadges: AchievementBadge[] = [
    { id: 'b1', title: config.b1.title, description: config.b1.description, icon: config.b1.icon, unlocked: false, category: 'Skill' },
    { id: 'b2', title: 'Learning Machine', description: 'Maintain a learning streak of 10+ days.', icon: '🔥', unlocked: true, unlockedDate: '1 day ago', category: 'Streak' },
    { id: 'b3', title: config.b3.title, description: config.b3.description, icon: config.b3.icon, unlocked: false, category: 'Milestone' },
    { id: 'b4', title: config.b4.title, description: config.b4.description, icon: config.b4.icon, unlocked: false, category: 'Skill' },
    { id: 'b5', title: 'Goal Crusher', description: 'Complete all topics in your active roadmap phase.', icon: '🎯', unlocked: false, category: 'Milestone' }
  ];

  if (!currentRoadmap) return baseBadges;

  const phase1 = currentRoadmap.find(p => p.phaseNumber === 1);
  const phase1Completed = phase1 ? (phase1.sessions.length > 0 && phase1.sessions.every(s => s.completed)) : false;
  
  const hasCompletedHandsOn = currentRoadmap.flatMap(p => p.sessions)
    .some(s => s.type === 'hands-on' && s.completed);

  const somePhaseCompleted = currentRoadmap.some(p => p.status === 'Completed');
  const readinessValue = currentReadinessScore || 0;

  return baseBadges.map(badge => {
    const existing = currentBadges?.find(b => b.id === badge.id);
    let unlocked = existing ? existing.unlocked : badge.unlocked;
    let unlockedDate = existing ? existing.unlockedDate : badge.unlockedDate;

    if (badge.id === 'b1') {
      unlocked = phase1Completed;
      if (unlocked && !unlockedDate) unlockedDate = 'Just now';
    } else if (badge.id === 'b2') {
      unlocked = true; // streak starts unlocked
    } else if (badge.id === 'b3') {
      unlocked = readinessValue > 80;
      if (unlocked && !unlockedDate) unlockedDate = 'Just now';
    } else if (badge.id === 'b4') {
      unlocked = hasCompletedHandsOn;
      if (unlocked && !unlockedDate) unlockedDate = 'Just now';
    } else if (badge.id === 'b5') {
      unlocked = somePhaseCompleted;
      if (unlocked && !unlockedDate) unlockedDate = 'Just now';
    }

    return {
      ...badge,
      unlocked,
      unlockedDate: unlocked ? (unlockedDate || 'Just now') : undefined
    };
  });
};

export const getActiveDomain = (user: UserProfile | null): string => {
  if (user?.interests && user.interests.length > 0) {
    const match = user.interests.find(interest => domainBadgeConfigs[interest]);
    if (match) return match;
    return user.interests[0];
  }
  if (user?.careerGoal) {
    const goal = user.careerGoal;
    const match = Object.keys(domainBadgeConfigs).find(domain => 
      goal.toLowerCase().includes(domain.toLowerCase()) || 
      domain.toLowerCase().includes(goal.toLowerCase())
    );
    if (match) return match;
    
    if (goal.toLowerCase().includes('frontend')) return 'Frontend Development';
    if (goal.toLowerCase().includes('backend')) return 'Backend Development';
    if (goal.toLowerCase().includes('full stack') || goal.toLowerCase().includes('mern')) return 'Full Stack Development';
    if (goal.toLowerCase().includes('ai') || goal.toLowerCase().includes('machine learning')) return 'Generative AI';
    if (goal.toLowerCase().includes('architect') || goal.toLowerCase().includes('solutions')) return 'Web Architecture';
  }
  return 'DevOps Engineering'; // fallback
};

const initialBadges: AchievementBadge[] = [
  { id: 'b1', title: 'Docker Navigator', description: 'Complete Phase 1 and master containerization basics.', icon: '🐳', unlocked: true, unlockedDate: '2 days ago', category: 'Skill' },
  { id: 'b2', title: 'Learning Machine', description: 'Maintain a learning streak of 10+ days.', icon: '🔥', unlocked: true, unlockedDate: '1 day ago', category: 'Streak' },
  { id: 'b3', title: 'Cloud Architect', description: 'Achieve an overall skill readiness score above 80%.', icon: '☁', unlocked: false, category: 'Milestone' },
  { id: 'b4', title: 'Terraformer', description: 'Complete a Terraform practical exercise.', icon: '🏗', unlocked: false, category: 'Skill' },
  { id: 'b5', title: 'Goal Crusher', description: 'Complete all topics in your active roadmap phase.', icon: '🎯', unlocked: false, category: 'Milestone' }
];

const domainRoadmaps: Record<string, { title: string; subtitle: string; sessions: { title: string; durationHours: number; type: 'concept' | 'hands-on' | 'quiz' }[] }[]> = {
  'Web Development': [
    {
      title: 'Modern Web Foundations',
      subtitle: 'HTML5, CSS layout systems, media queries, and semantic structures',
      sessions: [
        { title: 'Semantic HTML5 & Accessible Web standards', durationHours: 2, type: 'concept' },
        { title: 'CSS Grid & Flexbox Responsive Design Patterns', durationHours: 3, type: 'hands-on' },
        { title: 'Dynamic CSS Layouts & Custom Properties Project', durationHours: 4, type: 'hands-on' },
        { title: 'Web Foundations Competency Quiz', durationHours: 1, type: 'quiz' }
      ]
    },
    {
      title: 'Client-Side Interactive Scripting',
      subtitle: 'Dynamic DOM manipulation, async JavaScript, and AJAX requests',
      sessions: [
        { title: 'JavaScript Execution Context & Scope Chain', durationHours: 3, type: 'concept' },
        { title: 'Asynchronous Requests & Fetch API Integration', durationHours: 4, type: 'hands-on' },
        { title: 'DOM Event Listeners & Interactive Form Validators', durationHours: 3, type: 'hands-on' },
        { title: 'JavaScript Engine & Async Mechanics Quiz', durationHours: 1, type: 'quiz' }
      ]
    },
    {
      title: 'Modern Workflows & Hosting Deployments',
      subtitle: 'Build utilities, bundling systems, and serverless hosting adapters',
      sessions: [
        { title: 'Introduction to Vite Bundler & NPM Ecosystem', durationHours: 3, type: 'concept' },
        { title: 'Deploying Static Assets to Netlify & Vercel Services', durationHours: 4, type: 'hands-on' },
        { title: 'Building a Dynamic Vanilla JS Weather Platform', durationHours: 5, type: 'hands-on' }
      ]
    }
  ],
  'Frontend Development': [
    {
      title: 'Interactive Framework Foundations',
      subtitle: 'State declarations, visual props, lifecycle hooks, and Tailwind CSS',
      sessions: [
        { title: 'React Hooks, Component Cycles & Functional Styling', durationHours: 3, type: 'concept' },
        { title: 'Custom Tailwind Layouts & Theme Customizations', durationHours: 4, type: 'hands-on' },
        { title: 'Constructing Interactive Dashboards', durationHours: 4, type: 'hands-on' },
        { title: 'React Core Architecture Evaluation', durationHours: 1, type: 'quiz' }
      ]
    },
    {
      title: 'Global State Management & Service Caching',
      subtitle: 'Store orchestration, network caching, and client routing setups',
      sessions: [
        { title: 'State Architectures with Redux Toolkit & Context', durationHours: 4, type: 'concept' },
        { title: 'Asynchronous Queries & Caching with TanStack Query', durationHours: 4, type: 'hands-on' },
        { title: 'Complex React Client-Side Route Guards', durationHours: 3, type: 'hands-on' }
      ]
    },
    {
      title: 'Enterprise Server-Side Frameworks',
      subtitle: 'SSR mechanisms, static rendering generators, and optimized web-vitals',
      sessions: [
        { title: 'Next.js App Router & Server Component Paradigms', durationHours: 4, type: 'concept' },
        { title: 'Building High-Performance E-Commerce Portals', durationHours: 5, type: 'hands-on' },
        { title: 'Component Jest Testing & Performance Audits', durationHours: 3, type: 'hands-on' }
      ]
    }
  ],
  'Backend Development': [
    {
      title: 'Node.js Runtime & Express Server Architectures',
      subtitle: 'Request-response loops, REST endpoints, and custom middleware layers',
      sessions: [
        { title: 'Node.js Event Loop & Cluster Module Mechanics', durationHours: 3, type: 'concept' },
        { title: 'Designing Modular Routers with Express.js', durationHours: 4, type: 'hands-on' },
        { title: 'Centralized Exception & Logging Middleware Blocks', durationHours: 3, type: 'hands-on' },
        { title: 'Backend Foundation Architectural Quiz', durationHours: 1, type: 'quiz' }
      ]
    },
    {
      title: 'Relational Database Integrations & Models',
      subtitle: 'Data definition mappings, SQL joins, and Object-Relational Mappers',
      sessions: [
        { title: 'Structured Schema Designs & Foreign Key Constraints', durationHours: 4, type: 'concept' },
        { title: 'Connecting Express to Postgres via Drizzle ORM', durationHours: 4, type: 'hands-on' },
        { title: 'Transaction Blocks & Advanced Subquery Optimization', durationHours: 4, type: 'hands-on' }
      ]
    },
    {
      title: 'API Authentication & Cloud Deployments',
      subtitle: 'Cryptographic session tokens, middleware rate limiters, and server hosts',
      sessions: [
        { title: 'Stateless Session Tokens & JWT Verification Routines', durationHours: 3, type: 'concept' },
        { title: 'API Rate Limiting, CORS Controls, and Security Hardening', durationHours: 4, type: 'hands-on' },
        { title: 'Deploying Node APIs to Cloud Container Environments', durationHours: 5, type: 'hands-on' }
      ]
    }
  ],
  'Full Stack Development': [
    {
      title: 'Responsive Client Interfaces',
      subtitle: 'React layout structures, client data forms, and visual components',
      sessions: [
        { title: 'Client Form State Handlers & Validation Libraries', durationHours: 3, type: 'concept' },
        { title: 'Integrating Tailwind Visual Layout Blocks', durationHours: 4, type: 'hands-on' },
        { title: 'Making Dynamic Endpoint Request Loops with Axios', durationHours: 3, type: 'hands-on' },
        { title: 'Full Stack Frontend Core Quiz', durationHours: 1, type: 'quiz' }
      ]
    },
    {
      title: 'Express APIs & Relational Database Stores',
      subtitle: 'Server systems, API development, and dynamic database integrations',
      sessions: [
        { title: 'RESTful API Schema Architecture Design Rules', durationHours: 4, type: 'concept' },
        { title: 'Building Node Server Middleware Routing Chains', durationHours: 4, type: 'hands-on' },
        { title: 'Integrating PostgreSQL Connection Pools', durationHours: 4, type: 'hands-on' }
      ]
    },
    {
      title: 'Auth Infrastructures & Containerizations',
      subtitle: 'Authentication gateways, token workflows, and Docker container bundles',
      sessions: [
        { title: 'JSON Web Token (JWT) Cross-Origin Authentications', durationHours: 3, type: 'concept' },
        { title: 'Writing Dockerfiles to Bundle Full Stack Projects', durationHours: 5, type: 'hands-on' },
        { title: 'CI/CD Automated Deployments using GitHub Actions', durationHours: 4, type: 'hands-on' }
      ]
    }
  ],
  'Web Architecture': [
    {
      title: 'HTTP Protocols & Server Topologies',
      subtitle: 'DNS records, TCP/IP networks, and client-server request methods',
      sessions: [
        { title: 'Advanced HTTP/2, HTTP/3, and Keep-Alive Handshakes', durationHours: 3, type: 'concept' },
        { title: 'Domain DNS Record Propagation & Certificate Setup', durationHours: 4, type: 'hands-on' },
        { title: 'Caching Architectures & Browser Cache Control Headers', durationHours: 3, type: 'hands-on' },
        { title: 'HTTP & Network Protocol Evaluation', durationHours: 1, type: 'quiz' }
      ]
    },
    {
      title: 'Reverse Proxies & High Availability Clusters',
      subtitle: 'Load balancing distributions, gateway rules, and state orchestration',
      sessions: [
        { title: 'Load Balancing Algorithms & System Health Monitors', durationHours: 4, type: 'concept' },
        { title: 'Configuring Nginx Reverse Proxies & SSL Termination', durationHours: 5, type: 'hands-on' },
        { title: 'Horizontal Web Tier Scaling Patterns', durationHours: 4, type: 'hands-on' }
      ]
    },
    {
      title: 'Distributed Caching & Content Delivery',
      subtitle: 'Cache engines, edge server networks, and stale content purging rules',
      sessions: [
        { title: 'Redis Cache Strategies & Session State Stores', durationHours: 3, type: 'concept' },
        { title: 'Deploying CDN Edge Nodes for Worldwide Asset Distribution', durationHours: 4, type: 'hands-on' },
        { title: 'Cache Invalidation Protocols & Eviction Algorithms', durationHours: 4, type: 'hands-on' }
      ]
    }
  ],
  'API Development': [
    {
      title: 'REST Architecture Standards & Design',
      subtitle: 'HTTP request verbs, status codes, standard JSON payloads, and filters',
      sessions: [
        { title: 'Idempotency in API Design & Resource Modeling Rules', durationHours: 3, type: 'concept' },
        { title: 'Defining API Blueprints with OpenAPI & Swagger Specs', durationHours: 4, type: 'hands-on' },
        { title: 'Filtering, Paginations, and Sorting Architectures', durationHours: 3, type: 'hands-on' },
        { title: 'REST API Design Patterns Evaluation', durationHours: 1, type: 'quiz' }
      ]
    },
    {
      title: 'GraphQL & WebSockets Implementation',
      subtitle: 'Graph queries, custom resolvers, mutations, and real-time streams',
      sessions: [
        { title: 'GraphQL Schemas, Queries, and N+1 Database Resolution', durationHours: 4, type: 'concept' },
        { title: 'Building Dynamic GraphQL Resolvers with Apollo Server', durationHours: 4, type: 'hands-on' },
        { title: 'Real-Time Server Pushes using WebSockets and Express', durationHours: 4, type: 'hands-on' }
      ]
    },
    {
      title: 'API Authentication & Gateway Management',
      subtitle: 'OAuth2 workflows, API keys, client scopes, and request throttling',
      sessions: [
        { title: 'OAuth2 Authorization Code Grant Workflows', durationHours: 3, type: 'concept' },
        { title: 'Implementing Throttling & Rate Limit Middleware', durationHours: 4, type: 'hands-on' },
        { title: 'Setting Up API Gateway Policies & IP White-listing', durationHours: 4, type: 'hands-on' }
      ]
    }
  ],
  'Database Design': [
    {
      title: 'Relational Database Schema Design',
      subtitle: 'Entity-relationship diagrams, keys, normalization, and relational joins',
      sessions: [
        { title: 'Relational Normalization Forms (1NF, 2NF, 3NF, BCNF)', durationHours: 3, type: 'concept' },
        { title: 'Designing Complex PostgreSQL Entity Tables & Indexes', durationHours: 4, type: 'hands-on' },
        { title: 'Writing Advanced SQL Queries & Analytical CTE Joins', durationHours: 4, type: 'hands-on' },
        { title: 'Database Schema Normalization Quiz', durationHours: 1, type: 'quiz' }
      ]
    },
    {
      title: 'NoSQL Architectures & Modeling Patterns',
      subtitle: 'Document stores, key-value stores, caching collections, and graphs',
      sessions: [
        { title: 'Comparing Document-Based Stores & Wide-Column Models', durationHours: 4, type: 'concept' },
        { title: 'Designing Dynamic Schemas with MongoDB Mongoose', durationHours: 4, type: 'hands-on' },
        { title: 'Optimizing Redis Key Formats for Fast Cache Fetching', durationHours: 3, type: 'hands-on' }
      ]
    },
    {
      title: 'Scaling Database Performance & Integrity',
      subtitle: 'Horizontal partitioning, shards, database triggers, and read replicas',
      sessions: [
        { title: 'Database Replicas, Failovers, and ACID Transactions', durationHours: 3, type: 'concept' },
        { title: 'Configuring Horizontal Table Sharding and Views', durationHours: 5, type: 'hands-on' },
        { title: 'Analyzing Query Execution Cost Plans & Index Sweeps', durationHours: 4, type: 'hands-on' }
      ]
    }
  ],
  'Cloud Infrastructure': [
    {
      title: 'Virtual Cloud Networks & Identity Access',
      subtitle: 'Subnets, route tables, firewall access groups, and role permissions',
      sessions: [
        { title: 'AWS Cloud VPC Topologies & NAT Gateway Routing Rules', durationHours: 3, type: 'concept' },
        { title: 'Configuring AWS IAM Security Policies and Groups', durationHours: 4, type: 'hands-on' },
        { title: 'Deploying Resilient Virtual Machines in Cloud Environments', durationHours: 3, type: 'hands-on' },
        { title: 'VPC Subnetting & Network Access Quiz', durationHours: 1, type: 'quiz' }
      ]
    },
    {
      title: 'Managed Databases & Elastic Object Storage',
      subtitle: 'Database clusters, backup storage containers, and edge host integrations',
      sessions: [
        { title: 'Amazon RDS Configurations & Auto-backup Routines', durationHours: 4, type: 'concept' },
        { title: 'Building Secure Storage Buckets & Content Delivery Rules', durationHours: 4, type: 'hands-on' },
        { title: 'Connecting Server Instances to Managed Database Pools', durationHours: 4, type: 'hands-on' }
      ]
    },
    {
      title: 'Serverless Functions & Adaptive Scaling',
      subtitle: 'Event-driven compute actions, metrics tracking, and cluster scaling',
      sessions: [
        { title: 'Introduction to Serverless Compute via Cloud Functions', durationHours: 3, type: 'concept' },
        { title: 'Deploying Elastic Auto-Scaling & Load Balancers', durationHours: 5, type: 'hands-on' },
        { title: 'Setting Up Unified CloudWatch Log Monitoring Filters', durationHours: 4, type: 'hands-on' }
      ]
    }
  ],
  'DevOps Engineering': [
    {
      title: 'Production Container Deployment Structures',
      subtitle: 'Docker image building pipelines, compose configurations, and port networks',
      sessions: [
        { title: 'Writing Optimized Multi-Stage Container Dockerfiles', durationHours: 3, type: 'concept' },
        { title: 'Orchestrating Application Environments with Docker Compose', durationHours: 4, type: 'hands-on' },
        { title: 'Container Resource Constraints & Sandbox Networks', durationHours: 3, type: 'hands-on' },
        { title: 'Container Architecture Competency Quiz', durationHours: 1, type: 'quiz' }
      ]
    },
    {
      title: 'Infrastructure as Code and Automations',
      subtitle: 'Declarative resource models, remote state stores, and configuration playbooks',
      sessions: [
        { title: 'Declarative Resources with Terraform Providers & Modules', durationHours: 4, type: 'concept' },
        { title: 'Constructing Production Terraform Remote State Backends', durationHours: 4, type: 'hands-on' },
        { title: 'Automating Config Deployments via Ansible Playbooks', durationHours: 4, type: 'hands-on' }
      ]
    },
    {
      title: 'Continuous Integrations & Kubernetes Clusters',
      subtitle: 'Continuous integration runners, Kubernetes clusters, and helm charts',
      sessions: [
        { title: 'GitLab CI / GitHub Actions Deployment Workflow Chains', durationHours: 3, type: 'concept' },
        { title: 'Setting Up Pods, Services & ingress Rules in Kubernetes', durationHours: 5, type: 'hands-on' },
        { title: 'Packaging Microservice Deployments with Helm Charts', durationHours: 4, type: 'hands-on' }
      ]
    }
  ],
  'Machine Learning': [
    {
      title: 'Mathematical Foundations & Preprocessing',
      subtitle: 'Linear algebra formulas, statistic metrics, data manipulation libraries',
      sessions: [
        { title: 'Probability Distributions, Regression & Vectors', durationHours: 3, type: 'concept' },
        { title: 'Data Cleaning and Manipulation using Python Pandas', durationHours: 4, type: 'hands-on' },
        { title: 'Transforming Datasets & Advanced Feature Engineering', durationHours: 4, type: 'hands-on' },
        { title: 'Mathematical foundations of ML Evaluation', durationHours: 1, type: 'quiz' }
      ]
    },
    {
      title: 'Supervised & Unsupervised Models',
      subtitle: 'Predictive algorithm pipelines, metrics scoring, and clustering',
      sessions: [
        { title: 'Classifiers, Regression Trees, and Clustering Logics', durationHours: 4, type: 'concept' },
        { title: 'Fitting Supervised Models with Python Scikit-learn', durationHours: 4, type: 'hands-on' },
        { title: 'Clustering Customer Personas via K-Means Models', durationHours: 4, type: 'hands-on' }
      ]
    },
    {
      title: 'Model Deployments & Pipeline Orchestrations',
      subtitle: 'Model persistence, web server endpoints, and input feature transformations',
      sessions: [
        { title: 'Serializing Machine Learning Models with Joblib/Pickle', durationHours: 3, type: 'concept' },
        { title: 'Building Predictive API Routing Gateways with FastAPI', durationHours: 5, type: 'hands-on' },
        { title: 'Creating Automated Retraining Data Pipelines', durationHours: 4, type: 'hands-on' }
      ]
    }
  ],
  'Artificial Intelligence': [
    {
      title: 'Search Algorithms & Intelligent Decision Trees',
      subtitle: 'Heuristic pathfinding, grid search algorithms, and game state trees',
      sessions: [
        { title: 'Heuristics, State Space Graphs & Uniform Cost Searches', durationHours: 3, type: 'concept' },
        { title: 'Implementing A* Pathfinding for Maze Grid Environments', durationHours: 4, type: 'hands-on' },
        { title: 'Game Optimization Trees using Minimax & Alpha-Beta Cutoffs', durationHours: 4, type: 'hands-on' },
        { title: 'Heuristic Search Optimization Evaluation', durationHours: 1, type: 'quiz' }
      ]
    },
    {
      title: 'Neural Networks & Deep Learning',
      subtitle: 'Synapse weight models, backpropagations, and training epochs',
      sessions: [
        { title: 'Multilayer Perceptrons, Activations & Gradient Descent', durationHours: 4, type: 'concept' },
        { title: 'Building Custom Image Classifiers using PyTorch Frameworks', durationHours: 5, type: 'hands-on' },
        { title: 'Monitoring Neural Train Epochs & Loss Metrics', durationHours: 3, type: 'hands-on' }
      ]
    },
    {
      title: 'Autonomous Agents & Reinforcement Learning',
      subtitle: 'Markov decision trees, environmental policies, and state reward loops',
      sessions: [
        { title: 'Markov Processes, Reward Matrices & Bellman Equations', durationHours: 3, type: 'concept' },
        { title: 'Training Smart Q-Learning Agents in Grid Environments', durationHours: 5, type: 'hands-on' },
        { title: 'Deploying Trained Autonomous Agents inside Game Stages', durationHours: 4, type: 'hands-on' }
      ]
    }
  ],
  'Generative AI': [
    {
      title: 'Prompt Systems & Multi-Modal LLM APIs',
      subtitle: 'Token models, system instructions, temperature, and Google Gemini API',
      sessions: [
        { title: 'Foundational LLM Models, Token Mechanics & Temperature', durationHours: 3, type: 'concept' },
        { title: 'Writing System Prompts & Integrating Google Gemini SDK', durationHours: 4, type: 'hands-on' },
        { title: 'Multi-Modal Generation with Text, Image, and Audio Prompts', durationHours: 3, type: 'hands-on' },
        { title: 'Generative AI Prompt Engineering Quiz', durationHours: 1, type: 'quiz' }
      ]
    },
    {
      title: 'Retrieval Augmented Generation (RAG)',
      subtitle: 'Vector embeddings, chunking models, index stores, and semantic query matching',
      sessions: [
        { title: 'Vector Space Models, Chunking Algorithms & Dot Products', durationHours: 4, type: 'concept' },
        { title: 'Integrating ChromaDB or Pinecone Vector Store Indexes', durationHours: 4, type: 'hands-on' },
        { title: 'Building custom RAG Knowledge Bases over PDF Archives', durationHours: 5, type: 'hands-on' }
      ]
    },
    {
      title: 'AI Agent Architectures & Tool Calling',
      subtitle: 'Agent loops, custom function triggers, and advanced LangChain flows',
      sessions: [
        { title: 'Reasoning and Acting (ReAct) Orchestration Loop Models', durationHours: 3, type: 'concept' },
        { title: 'Implementing LLM Tool Calling and Structured Parsing', durationHours: 5, type: 'hands-on' },
        { title: 'Constructing Multi-Agent State-Machine Systems using LangGraph', durationHours: 4, type: 'hands-on' }
      ]
    }
  ],
  'Data Science': [
    {
      title: 'Data Wrangling and Deep Analyses',
      subtitle: 'Statistical evaluation methods, cleansing procedures, and data grids',
      sessions: [
        { title: 'Variance Analysing, Hypothesis Tests & Standard Errors', durationHours: 3, type: 'concept' },
        { title: 'Complex Cleansing Pipelines with NumPy and SciPy', durationHours: 4, type: 'hands-on' },
        { title: 'Visual Data Analysis with Seaborn & Matplotlib Plots', durationHours: 3, type: 'hands-on' },
        { title: 'Statistical Methods Competency Quiz', durationHours: 1, type: 'quiz' }
      ]
    },
    {
      title: 'Advanced Ensemble Models & Boosting',
      subtitle: 'Decision forest classifiers, extreme gradient boosting, and models scoring',
      sessions: [
        { title: 'Bagging, Boosting & Feature Weight Importance Analyses', durationHours: 4, type: 'concept' },
        { title: 'Fitting High-Performance Predictors with XGBoost Pipelines', durationHours: 5, type: 'hands-on' },
        { title: 'Hyper-Parameter Grid Searches and Cross-Validation', durationHours: 4, type: 'hands-on' }
      ]
    },
    {
      title: 'Big Data Processing and Dashboards',
      subtitle: 'Distributed compute engines, cluster dataframes, and business KPI metrics',
      sessions: [
        { title: 'Parallel Processing Architectures with Apache Spark', durationHours: 3, type: 'concept' },
        { title: 'Transforming Massive Scale Cloud Datasets with PySpark', durationHours: 4, type: 'hands-on' },
        { title: 'Publishing Interactive Insight Dashboards via Dash/Streamlit', durationHours: 4, type: 'hands-on' }
      ]
    }
  ],
  'Data Analytics': [
    {
      title: 'Advanced Querying & Database Analytics',
      subtitle: 'Window operations, common table expressions, and complex database partitions',
      sessions: [
        { title: 'SQL Aggregating, Sub-query Structures & Dynamic Joins', durationHours: 3, type: 'concept' },
        { title: 'Writing Window Partitions and CTE Analytics Queries', durationHours: 4, type: 'hands-on' },
        { title: 'Optimizing Complex Query Join Chains & SQL Index Rules', durationHours: 3, type: 'hands-on' },
        { title: 'SQL Analytical Operators Evaluation', durationHours: 1, type: 'quiz' }
      ]
    },
    {
      title: 'Pandas Data Cleaning and Aggregation',
      subtitle: 'Cleansing rows, pivot matrices, and descriptive statistics models',
      sessions: [
        { title: 'Descriptive Stat Measures, Means, Medians, and Outliers', durationHours: 4, type: 'concept' },
        { title: 'Reshaping Data Matrices and Pivot Operations with Pandas', durationHours: 4, type: 'hands-on' },
        { title: 'Cleansing Complex Data Gaps & Null Column Values', durationHours: 3, type: 'hands-on' }
      ]
    },
    {
      title: 'Enterprise BI Reporting & Automations',
      subtitle: 'Dynamic dashboard design, automated scheduled reporting pipelines',
      sessions: [
        { title: 'Key Performance Metric Dashboard Layout Best Practices', durationHours: 3, type: 'concept' },
        { title: 'Creating High-Impact Business Dashboards with Tableau/PowerBI', durationHours: 4, type: 'hands-on' },
        { title: 'Automating Scheduled PDF Dashboard Email Reports with Python', durationHours: 4, type: 'hands-on' }
      ]
    }
  ],
  'Mobile Development': [
    {
      title: 'Cross-Platform Framework Foundations',
      subtitle: 'Component state declarations, layout structures, and Dart/JS engines',
      sessions: [
        { title: 'Flutter Dart Types vs React Native Component Cycles', durationHours: 3, type: 'concept' },
        { title: 'Styling Mobile Screens with Flexbox and Core Widgets', durationHours: 4, type: 'hands-on' },
        { title: 'Building Dynamic Interactive Scroll Lists', durationHours: 3, type: 'hands-on' },
        { title: 'Mobile Framework Architecture Evaluation', durationHours: 1, type: 'quiz' }
      ]
    },
    {
      title: 'Mobile State Containers & API Integrations',
      subtitle: 'Local storage drivers, async store actions, and REST responses',
      sessions: [
        { title: 'Mobile State Frameworks with Provider or Redux Stores', durationHours: 4, type: 'concept' },
        { title: 'Integrating Server HTTP Requests and Async Data Handlers', durationHours: 4, type: 'hands-on' },
        { title: 'Caching Local Database Rows with SQLite or Hive Adapters', durationHours: 4, type: 'hands-on' }
      ]
    },
    {
      title: 'Hardware Bridging & Application Stores Pub',
      subtitle: 'Operating system device permissions, build bundles, and store publishers',
      sessions: [
        { title: 'Accessing GPS Location Sensors and Camera Permissions', durationHours: 3, type: 'concept' },
        { title: 'Compiling Production Android APK & iOS IPA Bundles', durationHours: 5, type: 'hands-on' },
        { title: 'Configuring App Store and Google Play Console Deployment Rules', durationHours: 4, type: 'hands-on' }
      ]
    }
  ],
  'Cybersecurity Protocols': [
    {
      title: 'Network Securities & Cryptographic Topologies',
      subtitle: 'Encryption algorithms, network packets, and safe transport layers',
      sessions: [
        { title: 'Symmetric vs Asymmetric Ciphers, AES, and RSA Algorithms', durationHours: 3, type: 'concept' },
        { title: 'Deconstructing SSL/TLS Handshakes & HTTPS Socket Layers', durationHours: 4, type: 'hands-on' },
        { title: 'Analyzing Network Packet Traffic with Wireshark Audits', durationHours: 4, type: 'hands-on' },
        { title: 'Network Security Protocol Evaluation', durationHours: 1, type: 'quiz' }
      ]
    },
    {
      title: 'Application Auditing & OWASP Vulnerabilities',
      subtitle: 'Injection prevention blocks, JWT signature checks, and secure headers',
      sessions: [
        { title: 'OWASP Top 10 Core Injection, XSS, and CSRF Hazards', durationHours: 4, type: 'concept' },
        { title: 'Implementing Strict JWT Signature Verification Middleware', durationHours: 4, type: 'hands-on' },
        { title: 'Hardening Database Inputs & Safe Parameterized SQL Bindings', durationHours: 4, type: 'hands-on' }
      ]
    },
    {
      title: 'Penetration Testing & Breach Response',
      subtitle: 'Port sweeps, scanning utilities, and disaster mitigations',
      sessions: [
        { title: 'Scanning Target Host Ports with Nmap and Nessus Tools', durationHours: 3, type: 'concept' },
        { title: 'Building Automated System Vulnerability Auditing Scripts', durationHours: 4, type: 'hands-on' },
        { title: 'Constructing Multi-Layered Breach Mitigation Runbooks', durationHours: 4, type: 'hands-on' }
      ]
    }
  ],
  'UI/UX Interactive Designs': [
    {
      title: 'User Psychology & Grid Layout Systems',
      subtitle: 'Sizing scales, typography rules, layout layouts, and Figma components',
      sessions: [
        { title: 'Gestalt Design Principles, Spacing Scales & Typography', durationHours: 3, type: 'concept' },
        { title: 'Building Structured Web Grids & Component Kits in Figma', durationHours: 4, type: 'hands-on' },
        { title: 'Creating High-Contrast Responsive Theme Layout Kits', durationHours: 4, type: 'hands-on' },
        { title: 'Visual Psychology & Layout Grid Evaluation', durationHours: 1, type: 'quiz' }
      ]
    },
    {
      title: 'High-Fidelity Prototyping & User Flows',
      subtitle: 'Dynamic transition curves, micro-interactions, and visual scenarios',
      sessions: [
        { title: 'Interactive State Mappings and Component Micro-Animations', durationHours: 4, type: 'concept' },
        { title: 'Constructing Multi-Screen Functional User Flow Prototypes', durationHours: 4, type: 'hands-on' },
        { title: 'Mapping Intuitive Navigation Drawer & Sidebar Drawer Flow', durationHours: 3, type: 'hands-on' }
      ]
    },
    {
      title: 'Usability Testing & Developer Handoffs',
      subtitle: 'A/B testing, feedback analysis, code specification reports',
      sessions: [
        { title: 'Usability Test Plan Design & User Feedback Collection', durationHours: 3, type: 'concept' },
        { title: 'Conducting Targeted Screen A/B Testing Experiments', durationHours: 4, type: 'hands-on' },
        { title: 'Generating Figma Code-spec Dev Handoff Sheets', durationHours: 3, type: 'hands-on' }
      ]
    }
  ],
  'Software Architecture': [
    {
      title: 'Object Oriented Designs & SOLID Rules',
      subtitle: 'Modularity guidelines, class designs, class compositions',
      sessions: [
        { title: 'SOLID Software Principles & Low Coupling Guidelines', durationHours: 3, type: 'concept' },
        { title: 'Applying Creational, Structural & Behavioral Patterns', durationHours: 4, type: 'hands-on' },
        { title: 'Deconstructing Large Codebases into Modular Classes', durationHours: 4, type: 'hands-on' },
        { title: 'SOLID Architecture Competency Quiz', durationHours: 1, type: 'quiz' }
      ]
    },
    {
      title: 'Hexagonal Design & Core Domain Separation',
      subtitle: 'Ports and adapters interfaces, decoupling databases and services',
      sessions: [
        { title: 'Ports & Adapters Concept, Core Domain Isolation Theory', durationHours: 4, type: 'concept' },
        { title: 'Building Hexagonal Layer Routers in Node.js Services', durationHours: 5, type: 'hands-on' },
        { title: 'Mocking Port Adapters for Robust Sandbox Unit Testing', durationHours: 3, type: 'hands-on' }
      ]
    },
    {
      title: 'Distributed System Topologies & Saga Flows',
      subtitle: 'Transaction chains, system event messaging, data synchronization',
      sessions: [
        { title: 'Saga Patterns & Distributed Transaction Orchestrators', durationHours: 3, type: 'concept' },
        { title: 'Implementing Event Bus Messaging using RabbitMQ Clusters', durationHours: 5, type: 'hands-on' },
        { title: 'Configuring CQRS Event Sourcing Data Replication Stores', durationHours: 4, type: 'hands-on' }
      ]
    }
  ],
  'System Design': [
    {
      title: 'Scalability Foundations & Load Balancing',
      subtitle: 'Vertical versus horizontal scale limits, DNS servers, load distributers',
      sessions: [
        { title: 'System Scale limits, Hardware Caps & Load Balancer Topologies', durationHours: 3, type: 'concept' },
        { title: 'Configuring Dynamic Weighted Round-Robin Load Balancers', durationHours: 4, type: 'hands-on' },
        { title: 'Designing Stateless App Tiers with Shared Session Keys', durationHours: 3, type: 'hands-on' },
        { title: 'Horizontal Sizing & Load Balancing Quiz', durationHours: 1, type: 'quiz' }
      ]
    },
    {
      title: 'Data Replication, Failovers & Sharding',
      subtitle: 'Database master-slave systems, hash rings, database partitioners',
      sessions: [
        { title: 'Database Master-Slave Replication & Write-ahead Logs', durationHours: 4, type: 'concept' },
        { title: 'Implementing Hash Ring Generators for Cache Server Nodes', durationHours: 4, type: 'hands-on' },
        { title: 'Designing High-Performance Horizontal Table Shard Schemas', durationHours: 4, type: 'hands-on' }
      ]
    },
    {
      title: 'High-Scale Realworld Architectural Models',
      subtitle: 'Designing URL shorteners, scalable chat platforms, media stream layers',
      sessions: [
        { title: 'Enterprise Message Queues & Global Scale Ingress Rules', durationHours: 3, type: 'concept' },
        { title: 'Designing a Scalable Real-time Chat & Notification Engine', durationHours: 5, type: 'hands-on' },
        { title: 'Building Distributed URL Shorteners with Custom Cache Tiers', durationHours: 4, type: 'hands-on' }
      ]
    }
  ],
  'Automation Testing': [
    {
      title: 'Unit Testing Architectures & Mocking',
      subtitle: 'Test assertions, mock spies, testing coverage reports, unit environments',
      sessions: [
        { title: 'Test-Driven Development (TDD) Red-Green-Refactor Cycles', durationHours: 3, type: 'concept' },
        { title: 'Writing Unit Tests with Jest & Mocking Endpoint Requests', durationHours: 4, type: 'hands-on' },
        { title: 'Setting Up Global Test Coverage Reports & Coverage Thresholds', durationHours: 3, type: 'hands-on' },
        { title: 'Unit Testing Theory & Best Practices Quiz', durationHours: 1, type: 'quiz' }
      ]
    },
    {
      title: 'Integration & REST API Testing Patterns',
      subtitle: 'Server execution testing, mock database layers, validation hooks',
      sessions: [
        { title: 'Designing Modular Sandbox Databases for Integration Tests', durationHours: 4, type: 'concept' },
        { title: 'Writing REST API Integration Tests using Supertest Tools', durationHours: 4, type: 'hands-on' },
        { title: 'Validating JSON Schema Contracts & API Payload Structures', durationHours: 4, type: 'hands-on' }
      ]
    },
    {
      title: 'End-to-End Test Automations & CI Runs',
      subtitle: 'Browser execution drivers, user action recordings, deployment hooks',
      sessions: [
        { title: 'E2E Testing Architectures, Headless Browser Automations', durationHours: 3, type: 'concept' },
        { title: 'Building Playwright E2E Scripts for Interactive Dashboards', durationHours: 5, type: 'hands-on' },
        { title: 'Integrating Automated Test Suites in CI/CD Commit Pipelines', durationHours: 4, type: 'hands-on' }
      ]
    }
  ]
};

const mapInterestToRecommendation = (interest: string, id: string): TechRecommendation => {
  switch (interest) {
    case 'Web Development':
      return {
        id,
        name: 'Modern Web Fundamentals (HTML, CSS & JS)',
        category: 'Web Development',
        description: 'Master responsive web layouts, DOM manipulation, CSS grid/flexbox, and modern ES6+ Javascript.',
        icon: '🌐',
        difficulty: 'Beginner',
        priority: 'High',
        estHours: 10,
        tags: ['HTML', 'CSS', 'Javascript', 'Web'],
        resources: [
          { title: 'MDN Web Docs - HTML & CSS Essentials', type: 'doc', url: 'https://developer.mozilla.org' },
          { title: 'JavaScript Info - Modern JavaScript Tutorial', type: 'course', url: 'https://javascript.info' }
        ],
        enrolled: false
      };
    case 'Frontend Development':
      return {
        id,
        name: 'React 18 & State Management',
        category: 'Frontend Development',
        description: 'Dive deep into React functional components, state hooks, context, custom hooks, and modern frontend tools like Vite.',
        icon: '⚛',
        difficulty: 'Intermediate',
        priority: 'High',
        estHours: 20,
        tags: ['React', 'Vite', 'Frontend', 'SPA'],
        resources: [
          { title: 'React Official Docs - Describing the UI', type: 'doc', url: 'https://react.dev' },
          { title: 'Vite Official Guide - Getting Started Guide', type: 'course', url: 'https://vite.dev' }
        ],
        enrolled: false
      };
    case 'Backend Development':
      return {
        id,
        name: 'Node.js & Express REST APIs',
        category: 'Backend Development',
        description: 'Build scalable, non-blocking asynchronous RESTful API servers using Express framework, routing, and middlewares.',
        icon: '🟢',
        difficulty: 'Intermediate',
        priority: 'High',
        estHours: 15,
        tags: ['Node.js', 'Express', 'Backend', 'APIs'],
        resources: [
          { title: 'Node.js Learning Guide & API Reference', type: 'doc', url: 'https://nodejs.org' },
          { title: 'Express.js Routing and Middlewares Manual', type: 'course', url: 'https://expressjs.com' }
        ],
        enrolled: false
      };
    case 'Full Stack Development':
      return {
        id,
        name: 'Full Stack Next.js Applications',
        category: 'Full Stack Development',
        description: 'Build production-ready, search-engine-optimized React apps with server-side rendering, API routes, and database integrations.',
        icon: '🥞',
        difficulty: 'Advanced',
        priority: 'High',
        estHours: 25,
        tags: ['Next.js', 'React', 'FullStack', 'ServerComponents'],
        resources: [
          { title: 'Next.js Learn Course - App Router Deep-dive', type: 'course', url: 'https://nextjs.org/learn' },
          { title: 'Prisma ORM & PostgreSQL Database Integration', type: 'doc', url: 'https://www.prisma.io' }
        ],
        enrolled: false
      };
    case 'Web Architecture':
      return {
        id,
        name: 'Micro-frontends & Performance Optimization',
        category: 'Web Architecture',
        description: 'Architect large-scale web systems using micro-frontends, code-splitting, bundle budgets, CDN caching, and edge computing.',
        icon: '🏛',
        difficulty: 'Advanced',
        priority: 'Medium',
        estHours: 18,
        tags: ['Architecture', 'Performance', 'CDN', 'Edge'],
        resources: [
          { title: 'Web.dev Core Web Vitals & Performance Checklist', type: 'doc', url: 'https://web.dev' },
          { title: 'Patterns.dev - Micro-frontends & Design Patterns', type: 'course', url: 'https://www.patterns.dev' }
        ],
        enrolled: false
      };
    case 'API Development':
      return {
        id,
        name: 'GraphQL & gRPC Communication',
        category: 'API Development',
        description: 'Design efficient data schemas and fast, robust inter-service communication protocols using GraphQL schemas and gRPC buffers.',
        icon: '📡',
        difficulty: 'Intermediate',
        priority: 'Medium',
        estHours: 16,
        tags: ['GraphQL', 'gRPC', 'API', 'Schema'],
        resources: [
          { title: 'Introduction to GraphQL - Querying and Mutations', type: 'course', url: 'https://graphql.org' },
          { title: 'gRPC Official Documentation & Quickstart Guide', type: 'doc', url: 'https://grpc.io' }
        ],
        enrolled: false
      };
    case 'Database Design':
      return {
        id,
        name: 'Relational Database Design & SQL Optimization',
        category: 'Database Design',
        description: 'Learn data normalization, indexing strategy, execution plans, ACID compliance, and query performance optimization in PostgreSQL.',
        icon: '💾',
        difficulty: 'Intermediate',
        priority: 'High',
        estHours: 14,
        tags: ['SQL', 'PostgreSQL', 'Database', 'Queries'],
        resources: [
          { title: 'PostgreSQL Tutorial - Basics to Advanced Queries', type: 'course', url: 'https://www.postgresqltutorial.com/' },
          { title: 'Use The Index, Luke - Database SQL Indexing Guide', type: 'doc', url: 'https://use-the-index-luke.com' }
        ],
        enrolled: false
      };
    case 'Cloud Infrastructure':
      return {
        id,
        name: 'AWS Solutions Architecture Masterclass',
        category: 'Cloud Infrastructure',
        description: 'Design highly-available, fault-tolerant, secure, and cost-optimized multi-tier architectures on Amazon Web Services.',
        icon: '☁',
        difficulty: 'Intermediate',
        priority: 'High',
        estHours: 22,
        tags: ['AWS', 'VPC', 'EC2', 'S3', 'Cloud'],
        resources: [
          { title: 'AWS Architecture Center - Blueprints & Patterns', type: 'doc', url: 'https://aws.amazon.com/architecture/' },
          { title: 'Google Cloud Architecture Framework Guidelines', type: 'course', url: 'https://cloud.google.com/architecture/framework' }
        ],
        enrolled: false
      };
    case 'DevOps Engineering':
      return {
        id,
        name: 'CI/CD GitOps with GitHub Actions',
        category: 'DevOps Engineering',
        description: 'Automate builds, automated tests, container publishing, and zero-downtime Kubernetes deployments using GitHub Workflows.',
        icon: '♾',
        difficulty: 'Intermediate',
        priority: 'High',
        estHours: 12,
        tags: ['CI/CD', 'GitHub Actions', 'DevOps', 'Automation'],
        resources: [
          { title: 'GitHub Actions Guide - Workflow Automation', type: 'doc', url: 'https://docs.github.com/en/actions' },
          { title: 'Docker Foundations & Production Best Practices', type: 'course', url: 'https://docs.docker.com' }
        ],
        enrolled: false
      };
    case 'Machine Learning':
      return {
        id,
        name: 'Supervised Learning with Scikit-Learn',
        category: 'Machine Learning',
        description: 'Implement regression, classification, clustering, model evaluation, and feature engineering pipelines in Python.',
        icon: '🤖',
        difficulty: 'Intermediate',
        priority: 'Medium',
        estHours: 24,
        tags: ['ML', 'Python', 'Scikit-Learn', 'DataScience'],
        resources: [
          { title: 'Scikit-Learn Getting Started & API Tutorial', type: 'doc', url: 'https://scikit-learn.org' },
          { title: 'Machine Learning Crash Course by Google developers', type: 'course', url: 'https://developers.google.com/machine-learning/crash-course' }
        ],
        enrolled: false
      };
    case 'Artificial Intelligence':
      return {
        id,
        name: 'Deep Learning Foundations (TensorFlow / PyTorch)',
        category: 'Artificial Intelligence',
        description: 'Build, compile, and train convolutional neural networks (CNNs) and recurrent neural networks (RNNs) for complex pattern recognition.',
        icon: '🧠',
        difficulty: 'Advanced',
        priority: 'Medium',
        estHours: 35,
        tags: ['Deep Learning', 'Neural Networks', 'TensorFlow', 'PyTorch'],
        resources: [
          { title: 'Deep Learning Specialization (Andrew Ng Course)', type: 'course', url: 'https://www.deeplearning.ai' },
          { title: 'PyTorch Tutorials & Deep Learning with PyTorch Book', type: 'doc', url: 'https://pytorch.org/tutorials' }
        ],
        enrolled: false
      };
    case 'Generative AI':
      return {
        id,
        name: 'Large Language Models & Prompt Engineering',
        category: 'Generative AI',
        description: 'Master context injection, few-shot prompting, retrieval augmented generation (RAG), and vector database semantic search.',
        icon: '✨',
        difficulty: 'Intermediate',
        priority: 'High',
        estHours: 12,
        tags: ['LLMs', 'Generative AI', 'RAG', 'VectorDB'],
        resources: [
          { title: 'Google GenAI Learning Path - Generative AI Course', type: 'course', url: 'https://cloud.google.com/training' },
          { title: 'DeepLearning.AI: Prompt Engineering for Developers', type: 'doc', url: 'https://www.deeplearning.ai' }
        ],
        enrolled: false
      };
    case 'Data Science':
      return {
        id,
        name: 'Python for Data Analysis & Pandas',
        category: 'Data Science',
        description: 'Wrangle, clean, analyze, and visualize high-dimensional real-world data structures using Pandas, NumPy, and Matplotlib.',
        icon: '📊',
        difficulty: 'Beginner',
        priority: 'High',
        estHours: 16,
        tags: ['Python', 'Pandas', 'NumPy', 'Data Wrangling'],
        resources: [
          { title: 'Python Data Science Handbook - Full Online Text', type: 'doc', url: 'https://jakevdp.github.io/PythonDataScienceHandbook/' },
          { title: 'Kaggle Data Science Tutorials - Interactive Notebooks', type: 'course', url: 'https://www.kaggle.com/learn' }
        ],
        enrolled: false
      };
    case 'Data Analytics':
      return {
        id,
        name: 'Tableau & PowerBI Dashboards',
        category: 'Data Analytics',
        description: 'Create interactive, highly informative corporate business intelligence dashboards, custom charts, and storytelling reports.',
        icon: '📈',
        difficulty: 'Beginner',
        priority: 'Medium',
        estHours: 14,
        tags: ['Analytics', 'Tableau', 'PowerBI', 'BI'],
        resources: [
          { title: 'Tableau Training Videos - Analytics & Visualization', type: 'course', url: 'https://www.tableau.com/learn/training' },
          { title: 'SQL for Data Analytics Tutorial Guide (Mode)', type: 'doc', url: 'https://mode.com/sql-tutorial/' }
        ],
        enrolled: false
      };
    case 'Mobile Development':
      return {
        id,
        name: 'Cross-Platform Flutter Apps',
        category: 'Mobile Development',
        description: 'Write beautiful, fast natively-compiled mobile, web, and desktop applications from a single Dart codebase using Flutter SDK.',
        icon: '📱',
        difficulty: 'Intermediate',
        priority: 'High',
        estHours: 25,
        tags: ['Flutter', 'Dart', 'Mobile', 'Android', 'iOS'],
        resources: [
          { title: 'Flutter Getting Started Guide & Layout Tutorial', type: 'doc', url: 'https://flutter.dev' },
          { title: 'Dart Language Tour - Syntax and Asynchronous Tour', type: 'course', url: 'https://dart.dev' }
        ],
        enrolled: false
      };
    case 'Cybersecurity Protocols':
      return {
        id,
        name: 'OWASP Top 10 Security Hardening',
        category: 'Cybersecurity Protocols',
        description: 'Understand, exploit, and patch severe web software security flaws including SQL Injection, Cross-Site Scripting (XSS), and CSRF.',
        icon: '🛡',
        difficulty: 'Intermediate',
        priority: 'High',
        estHours: 15,
        tags: ['Security', 'OWASP', 'Hardening', 'WebSecurity'],
        resources: [
          { title: 'OWASP Top Ten Project - Vulnerabilities Overview', type: 'doc', url: 'https://owasp.org/www-project-top-ten/' },
          { title: 'PortSwigger Web Security Academy - Interactive Labs', type: 'course', url: 'https://portswigger.net/web-security' }
        ],
        enrolled: false
      };
    case 'UI/UX Interactive Designs':
      return {
        id,
        name: 'Advanced Interactive UI Design in Figma',
        category: 'UI/UX Interactive Designs',
        description: 'Build complete Design Systems, interactive high-fidelity prototypes, components with auto-layout, and conduct user research testing.',
        icon: '🎨',
        difficulty: 'Beginner',
        priority: 'Medium',
        estHours: 18,
        tags: ['Figma', 'UI/UX', 'Prototyping', 'Wireframes'],
        resources: [
          { title: 'Figma Learn Tutorials - Autolayout & Components', type: 'course', url: 'https://help.figma.com/hc/en-us/categories/360002051614-Figma-Learn' },
          { title: 'Interaction Design Foundation - UI Design Guides', type: 'doc', url: 'https://www.interaction-design.org' }
        ],
        enrolled: false
      };
    case 'Software Architecture':
      return {
        id,
        name: 'Microservices Architecture & Design Patterns',
        category: 'Software Architecture',
        description: 'Deconstruct monolithic code bases into resilient distributed microservices, managing event messaging, saga patterns, and circuit breakers.',
        icon: '🧱',
        difficulty: 'Advanced',
        priority: 'High',
        estHours: 28,
        tags: ['Architecture', 'Microservices', 'Design Patterns', 'SystemDesign'],
        resources: [
          { title: 'Microservices Architecture Course - Pattern Catalog', type: 'course', url: 'https://microservices.io' },
          { title: 'The 12-Factor App Methodology - Production Checklist', type: 'doc', url: 'https://12factor.net' }
        ],
        enrolled: false
      };
    case 'System Design':
      return {
        id,
        name: 'Scaling Distributed Systems',
        category: 'System Design',
        description: 'Learn the fundamentals of designing high-scale web systems: load balancers, reverse proxies, sharding, caching tiers, and rate limiters.',
        icon: '🏗',
        difficulty: 'Advanced',
        priority: 'High',
        estHours: 20,
        tags: ['System Design', 'Scalability', 'Sharding', 'Cache'],
        resources: [
          { title: 'System Design Primer - Distributed Systems Basics', type: 'doc', url: 'https://github.com/donnemartin/system-design-primer' },
          { title: 'ByteByteGo - Architectural Blueprints & System Design', type: 'course', url: 'https://bytebytego.com' }
        ],
        enrolled: false
      };
    case 'Automation Testing':
      return {
        id,
        name: 'End-to-End Testing with Playwright',
        category: 'Automation Testing',
        description: 'Write modern, fast, and reliable automated integration and end-to-end tests for web apps running across Chromium, WebKit, and Firefox.',
        icon: '🧪',
        difficulty: 'Intermediate',
        priority: 'Medium',
        estHours: 12,
        tags: ['Testing', 'Playwright', 'Automation', 'E2E'],
        resources: [
          { title: 'Playwright Documentation - API & Locators Guide', type: 'doc', url: 'https://playwright.dev' },
          { title: 'Cypress Testing Guide & E2E Testing Best Practices', type: 'course', url: 'https://docs.cypress.io' }
        ],
        enrolled: false
      };
    default:
      return {
        id,
        name: `${interest} Masterclass`,
        category: interest,
        description: `Learn state-of-the-art techniques and core fundamentals of ${interest}.`,
        icon: '⭐',
        difficulty: 'Intermediate',
        priority: 'Medium',
        estHours: 15,
        tags: [interest, 'Specialization'],
        resources: [
          { title: `${interest} official documentation resource`, type: 'doc', url: 'https://google.com' },
          { title: `${interest} developer curated learning guide`, type: 'course', url: 'https://google.com' }
        ],
        enrolled: false
      };
  }
};

const interestOptions = [
  'Web Development',
  'Frontend Development',
  'Backend Development',
  'Full Stack Development',
  'Web Architecture',
  'API Development',
  'Database Design',
  'Cloud Infrastructure',
  'DevOps Engineering',
  'Machine Learning',
  'Artificial Intelligence',
  'Generative AI',
  'Data Science',
  'Data Analytics',
  'Mobile Development',
  'Cybersecurity Protocols',
  'UI/UX Interactive Designs',
  'Software Architecture',
  'System Design',
  'Automation Testing'
];

const createRoadmapPhaseFromRecommendation = (rec: TechRecommendation, phaseNum: number): RoadmapPhase => {
  const hasResources = rec.resources && rec.resources.length > 0;
  
  const title1 = hasResources && rec.resources[0] 
    ? `Mastering: ${rec.resources[0].title}` 
    : `Foundations of ${rec.name}`;
  const title2 = hasResources && rec.resources[1] 
    ? `Applied Practice: ${rec.resources[1].title}` 
    : `Hands-on Project with ${rec.name}`;
  const title3 = `${rec.name} Advanced Techniques & Capstone`;
  const title4 = `${rec.name} Readiness & Verification Quiz`;

  return {
    id: `p-rec-${rec.id}`,
    phaseNumber: phaseNum,
    title: rec.name,
    subtitle: `${rec.description} (${rec.difficulty} Path)`,
    status: 'In Progress',
    sessions: [
      {
        id: `s-rec-${rec.id}-1`,
        title: title1,
        durationHours: Math.max(1, Math.round(rec.estHours * 0.25)),
        completed: false,
        type: 'concept'
      },
      {
        id: `s-rec-${rec.id}-2`,
        title: title2,
        durationHours: Math.max(2, Math.round(rec.estHours * 0.4)),
        completed: false,
        type: 'hands-on'
      },
      {
        id: `s-rec-${rec.id}-3`,
        title: title3,
        durationHours: Math.max(2, Math.round(rec.estHours * 0.25)),
        completed: false,
        type: 'hands-on'
      },
      {
        id: `s-rec-${rec.id}-4`,
        title: title4,
        durationHours: Math.max(1, Math.round(rec.estHours * 0.1)),
        completed: false,
        type: 'quiz'
      }
    ]
  };
};

export interface UserCredential {
  email: string;
  name: string;
  password?: string;
  userProfile?: UserProfile;
  skills?: SkillItem[];
  recommendations?: TechRecommendation[];
  roadmap?: RoadmapPhase[];
  activities?: ActivityItem[];
  badges?: AchievementBadge[];
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [registeredUsers, setRegisteredUsers] = useState<UserCredential[]>(() => {
    const saved = localStorage.getItem('apex_registered_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback below
      }
    }
    
    // Pre-populate with our default registered user: Pooja Duddeti
    const defaultPoojaProfile: UserProfile = {
      name: 'Pooja Duddeti',
      email: 'poojaduddeti@gmail.com',
      title: 'Solutions Engineer',
      avatarUrl: 'https://cdn.corenexis.com/f/iTV2S7Vhsqa.jpeg',
      careerGoal: 'Sr. Solutions Architect',
      currentLevel: 'Intermediate',
      readinessScore: 74.2,
      readinessChange: 2.4,
      streakDays: 12,
      targetMonths: 4,
      learningHoursWeekly: 14.2,
      targetHoursWeekly: 20,
      aiMode: 'Adaptive',
    };

    return [
      {
        email: 'poojaduddeti@gmail.com',
        name: 'Pooja Duddeti',
        password: 'password',
        userProfile: defaultPoojaProfile,
        skills: initialSkills,
        recommendations: initialRecommendations,
        roadmap: initialRoadmap,
        activities: initialActivities,
        badges: initialBadges
      }
    ];
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('apex_auth') === 'true';
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    const isAuth = localStorage.getItem('apex_auth') === 'true';
    if (!isAuth) return null;
    const saved = localStorage.getItem('apex_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.email === 'poojaduddeti@gmail.com' || parsed.avatarUrl?.includes('images.unsplash.com')) {
          parsed.avatarUrl = 'https://cdn.corenexis.com/f/iTV2S7Vhsqa.jpeg';
        }
        return parsed;
      } catch (e) {
        // Fallback
      }
    }
    return null;
  });

  const [skills, setSkills] = useState<SkillItem[]>(() => {
    const saved = localStorage.getItem('apex_skills');
    return saved ? JSON.parse(saved) : initialSkills;
  });

  const [recommendations, setRecommendations] = useState<TechRecommendation[]>(() => {
    const saved = localStorage.getItem('apex_recommendations');
    let loadedRecs: TechRecommendation[] = [];
    if (saved) {
      try {
        loadedRecs = JSON.parse(saved);
      } catch (e) {
        loadedRecs = [];
      }
    }

    // Self-healing: if loaded list is empty or doesn't have the interest options, populate them!
    if (loadedRecs.length < 10) {
      const allRecs = loadedRecs.length > 0 ? [...loadedRecs] : [...initialRecommendations];
      interestOptions.forEach((interest, idx) => {
        const rec = mapInterestToRecommendation(interest, `rec-interest-${idx}`);
        if (!allRecs.some(r => r.name === rec.name)) {
          allRecs.push(rec);
        }
      });
      return allRecs;
    }
    return loadedRecs;
  });

  const [roadmap, setRoadmap] = useState<RoadmapPhase[]>(() => {
    const saved = localStorage.getItem('apex_roadmap');
    return saved ? JSON.parse(saved) : initialRoadmap;
  });

  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    const saved = localStorage.getItem('apex_activities');
    return saved ? JSON.parse(saved) : initialActivities;
  });

  const [badges, setBadges] = useState<AchievementBadge[]>(() => {
    const saved = localStorage.getItem('apex_badges');
    const baseBadges = saved ? JSON.parse(saved) : initialBadges;
    const currentUser = (() => {
      const savedUser = localStorage.getItem('apex_user');
      if (savedUser) {
        try {
          return JSON.parse(savedUser);
        } catch (e) {
          return null;
        }
      }
      return null;
    })();
    const currentRoadmap = (() => {
      const savedRm = localStorage.getItem('apex_roadmap');
      if (savedRm) {
        try {
          return JSON.parse(savedRm);
        } catch (e) {
          return null;
        }
      }
      return null;
    })();
    
    if (currentUser) {
      const activeDomain = getActiveDomain(currentUser);
      return generateBadgesForDomain(activeDomain, baseBadges, currentRoadmap || initialRoadmap, currentUser.readinessScore);
    }
    return baseBadges;
  });

  // Keep localStorage updated
  useEffect(() => {
    localStorage.setItem('apex_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Sync active user states back to registeredUsers in localStorage
  useEffect(() => {
    if (user) {
      setRegisteredUsers(prev => {
        const index = prev.findIndex(u => u.email.toLowerCase().trim() === user.email.toLowerCase().trim());
        if (index === -1) return prev;
        
        const existing = prev[index];
        if (
          existing.name === user.name &&
          JSON.stringify(existing.userProfile) === JSON.stringify(user) &&
          JSON.stringify(existing.skills) === JSON.stringify(skills) &&
          JSON.stringify(existing.recommendations) === JSON.stringify(recommendations) &&
          JSON.stringify(existing.roadmap) === JSON.stringify(roadmap) &&
          JSON.stringify(existing.activities) === JSON.stringify(activities) &&
          JSON.stringify(existing.badges) === JSON.stringify(badges)
        ) {
          return prev;
        }

        const updated = [...prev];
        updated[index] = {
          ...existing,
          name: user.name,
          userProfile: user,
          skills,
          recommendations,
          roadmap,
          activities,
          badges
        };
        return updated;
      });
    }
  }, [user, skills, recommendations, roadmap, activities, badges]);

  useEffect(() => {
    localStorage.setItem('apex_auth', String(isAuthenticated));
    if (user) {
      localStorage.setItem('apex_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('apex_user');
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('apex_skills', JSON.stringify(skills));
    }
  }, [skills, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('apex_recommendations', JSON.stringify(recommendations));
    }
  }, [recommendations, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('apex_roadmap', JSON.stringify(roadmap));
    }
  }, [roadmap, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('apex_activities', JSON.stringify(activities));
    }
  }, [activities, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('apex_badges', JSON.stringify(badges));
    }
  }, [badges, user]);

  const addActivity = (title: string, type: ActivityItem['type'], points: number) => {
    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      title,
      timestamp: 'Just now',
      type,
      points
    };
    setActivities(prev => [newActivity, ...prev.slice(0, 19)]);
  };

  const login = (email: string, password?: string): { success: boolean; error?: string } => {
    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = registeredUsers.find(u => u.email.toLowerCase().trim() === normalizedEmail);
    
    if (!existingUser) {
      return { success: false, error: 'Account does not exist. Please sign up first.' };
    }
    
    if (password && existingUser.password && existingUser.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }
    
    // Success! Log them in.
    setIsAuthenticated(true);
    
    // Load their specific user profile and progress, or use default if none saved yet
    const loadedUser: UserProfile = existingUser.userProfile || {
      name: existingUser.name,
      email: existingUser.email,
      title: 'Solutions Engineer',
      avatarUrl: 'https://cdn.corenexis.com/f/iTV2S7Vhsqa.jpeg',
      careerGoal: 'Sr. Solutions Architect',
      currentLevel: 'Intermediate',
      readinessScore: 74.2,
      readinessChange: 2.4,
      streakDays: 12,
      targetMonths: 4,
      learningHoursWeekly: 14.2,
      targetHoursWeekly: 20,
      aiMode: 'Adaptive',
    };
    
    setUser(loadedUser);
    
    // Load other states if they have progress, otherwise load defaults
    if (existingUser.skills) setSkills(existingUser.skills);
    if (existingUser.recommendations) setRecommendations(existingUser.recommendations);
    if (existingUser.roadmap) setRoadmap(existingUser.roadmap);
    if (existingUser.activities) setActivities(existingUser.activities);
    if (existingUser.badges) setBadges(existingUser.badges);
    
    addActivity('User logged in securely', 'login', 10);
    return { success: true };
  };

  const signup = (name: string, email: string, password?: string): { success: boolean; error?: string } => {
    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = registeredUsers.find(u => u.email.toLowerCase().trim() === normalizedEmail);
    
    if (existingUser) {
      return { success: false, error: 'An account with this email already exists. Please sign in instead.' };
    }
    
    const newUser: UserProfile = {
      name,
      email,
      title: 'Junior Developer',
      avatarUrl: 'https://cdn.corenexis.com/f/iTV2S7Vhsqa.jpeg',
      careerGoal: 'Full Stack Engineer',
      currentLevel: 'Beginner',
      readinessScore: 35.0,
      readinessChange: 0,
      streakDays: 1,
      targetMonths: 6,
      learningHoursWeekly: 0,
      targetHoursWeekly: 15,
      aiMode: 'Adaptive',
    };

    // New default state for skills, roadmap, badges, recommendations
    const defaultSkills: SkillItem[] = [
      { id: '1', name: 'Docker & Containerization', category: 'Cloud Engineering', currentMatch: 15, requiredLevel: 80, status: 'Critical Missing' },
      { id: '2', name: 'Kubernetes Orchestration', category: 'Cloud Engineering', currentMatch: 5, requiredLevel: 80, status: 'Critical Missing' },
      { id: '3', name: 'Terraform (IaC)', category: 'Cloud Engineering', currentMatch: 0, requiredLevel: 75, status: 'Critical Missing' },
      { id: '4', name: 'AWS Solutions Architecture', category: 'Cloud Engineering', currentMatch: 10, requiredLevel: 80, status: 'Critical Missing' },
      { id: '5', name: 'Node.js & Express API Development', category: 'Backend & System Design', currentMatch: 40, requiredLevel: 80, status: 'Gap Identified' },
      { id: '6', name: 'Database Design & SQL', category: 'Backend & System Design', currentMatch: 30, requiredLevel: 80, status: 'Gap Identified' },
    ];

    const resetRecs = [...initialRecommendations];
    interestOptions.forEach((interest, idx) => {
      const rec = mapInterestToRecommendation(interest, `rec-interest-${idx}`);
      if (!resetRecs.some(r => r.name === rec.name)) {
        resetRecs.push(rec);
      }
    });
    const defaultRecommendations = resetRecs.map(r => ({ ...r, enrolled: false }));

    const defaultRoadmap = initialRoadmap.map((p, idx) => ({
      ...p,
      status: idx === 0 ? 'In Progress' : 'Locked',
      sessions: p.sessions.map(s => ({ ...s, completed: false }))
    })) as RoadmapPhase[];

    const defaultBadges = initialBadges.map(b => ({ ...b, unlocked: false }));
    const defaultActivities: ActivityItem[] = [
      { id: 'a-su', title: 'Created AI Upskilling Profile', timestamp: 'Just now', type: 'login', points: 100 }
    ];

    const newCred: UserCredential = {
      email,
      name,
      password,
      userProfile: newUser,
      skills: defaultSkills,
      recommendations: defaultRecommendations,
      roadmap: defaultRoadmap,
      badges: defaultBadges,
      activities: defaultActivities
    };

    setRegisteredUsers(prev => [...prev, newCred]);
    setIsAuthenticated(true);
    setUser(newUser);
    setSkills(defaultSkills);
    setRecommendations(defaultRecommendations);
    setRoadmap(defaultRoadmap);
    setBadges(defaultBadges);
    setActivities(defaultActivities);

    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setSkills([]);
    setRoadmap([]);
    setRecommendations([]);
    setBadges([]);
    setActivities([]);
    localStorage.removeItem('apex_auth');
    localStorage.removeItem('apex_user');
    localStorage.removeItem('apex_skills');
    localStorage.removeItem('apex_roadmap');
    localStorage.removeItem('apex_recommendations');
    localStorage.removeItem('apex_badges');
    localStorage.removeItem('apex_activities');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      return updated;
    });
    addActivity('Updated profile settings', 'login', 20);
  };

  const submitAssessment = (assessment: AssessmentSubmission) => {
    if (!user) return;

    const isBeginner = assessment.currentLevel === 'Beginner';
    const isAdvanced = assessment.currentLevel === 'Advanced' || assessment.currentLevel === 'Expert';

    // Build the dynamic required skills for the selected career path
    const requiredSkillNames = getRequiredSkillsForGoal(assessment.careerGoal);
    
    const updatedSkills: SkillItem[] = requiredSkillNames.map((skillName, index) => {
      // Is this skill in the user's selected/known skills? Prevent false positives for short inputs like "C"
      const isMatched = assessment.selectedSkills.some(s => {
        const selected = s.toLowerCase().trim();
        const required = skillName.toLowerCase().trim();
        if (selected === required) return true;
        
        // Guard against short abbreviations matching random substrings (e.g. "C" matching "React" or "CSS")
        if (selected.length <= 2) {
          const words = required.split(/[\s-._()]+/);
          return words.includes(selected);
        }
        
        return required.includes(selected) || selected.includes(required);
      });
      
      let currentMatch = 0;
      if (isMatched) {
        currentMatch = isAdvanced 
          ? Math.floor(Math.random() * 10) + 88 
          : isBeginner 
            ? Math.floor(Math.random() * 15) + 60 
            : Math.floor(Math.random() * 15) + 72;
      } else {
        currentMatch = isAdvanced 
          ? Math.floor(Math.random() * 15) + 35 
          : isBeginner 
            ? Math.floor(Math.random() * 15) + 12 
            : Math.floor(Math.random() * 15) + 22;
      }
      
      const requiredLevel = 85;
      let status: SkillItem['status'] = 'Gap Identified';
      if (currentMatch >= requiredLevel) {
        status = 'Mastered';
      } else if (requiredLevel - currentMatch < 15) {
        status = 'On Track';
      } else if (requiredLevel - currentMatch > 40) {
        status = 'Critical Missing';
      } else {
        status = 'Gap Identified';
      }
      
      return {
        id: `skill-${index + 1}`,
        name: skillName,
        category: getSkillCategory(skillName),
        currentMatch,
        requiredLevel,
        status
      };
    });

    setSkills(updatedSkills);

    // Calculate dynamic readiness score based on average of matches
    const totalMatch = updatedSkills.reduce((sum, s) => sum + s.currentMatch, 0);
    const dynamicReadinessScore = updatedSkills.length > 0
      ? parseFloat((totalMatch / updatedSkills.length).toFixed(1))
      : (isBeginner ? 30.0 : isAdvanced ? 82.0 : 62.0);

    // Update user profile
    updateProfile({
      currentLevel: assessment.currentLevel as UserProfile['currentLevel'],
      careerGoal: assessment.careerGoal,
      readinessScore: dynamicReadinessScore,
      readinessChange: 4.5,
      targetHoursWeekly: assessment.weeklyHoursCommitment,
      selectedSkills: assessment.selectedSkills,
      interests: assessment.interests
    });

    // Reset Roadmap depending on selection & custom chosen domains
    let selectedDomain = 'Frontend Development'; // default fallback
    
    // Check if the first interest matches any of our domain keys
    if (assessment.interests && assessment.interests.length > 0) {
      const match = assessment.interests.find(interest => domainRoadmaps[interest]);
      if (match) {
        selectedDomain = match;
      }
    } else if (assessment.careerGoal) {
      // Check if careerGoal contains keywords or matches
      const goal = assessment.careerGoal;
      const match = Object.keys(domainRoadmaps).find(domain => 
        goal.toLowerCase().includes(domain.toLowerCase()) || 
        domain.toLowerCase().includes(goal.toLowerCase())
      );
      if (match) {
        selectedDomain = match;
      } else {
        // Simple map of goals to domains
        if (goal.toLowerCase().includes('frontend')) selectedDomain = 'Frontend Development';
        else if (goal.toLowerCase().includes('backend')) selectedDomain = 'Backend Development';
        else if (goal.toLowerCase().includes('full stack') || goal.toLowerCase().includes('mern') || goal.toLowerCase().includes('java') || goal.toLowerCase().includes('python')) selectedDomain = 'Full Stack Development';
        else if (goal.toLowerCase().includes('ai') || goal.toLowerCase().includes('machine learning') || goal.toLowerCase().includes('data scientist') || goal.toLowerCase().includes('data analyst')) selectedDomain = 'Generative AI';
        else if (goal.toLowerCase().includes('architect') || goal.toLowerCase().includes('engineer')) selectedDomain = 'Web Architecture';
      }
    }

    const phasesData = domainRoadmaps[selectedDomain] || domainRoadmaps['Frontend Development'];
    
    const updatedRoadmap = phasesData.map((phase, pIdx) => {
      const status: RoadmapPhase['status'] = pIdx === 0 ? 'In Progress' : 'Locked';

      const sessions = phase.sessions.map((session, sIdx) => {
        return {
          id: `s-${pIdx + 1}-${sIdx + 1}`,
          title: session.title,
          durationHours: session.durationHours,
          completed: false,
          type: session.type
        };
      });

      return {
        id: `p-${pIdx + 1}`,
        phaseNumber: pIdx + 1,
        title: phase.title,
        subtitle: phase.subtitle,
        status,
        sessions
      };
    });

    setRoadmap(updatedRoadmap);

    const selectedInterestsSet = new Set(assessment.interests || []);
    
    // Update recommended and priority for the full catalog
    let updatedRecommendations = recommendations.map(rec => {
      const isSelected = 
        selectedInterestsSet.has(rec.category) || 
        selectedInterestsSet.has(rec.name) ||
        (rec.category === 'Cloud Engineering' && (selectedInterestsSet.has('Cloud Infrastructure') || selectedInterestsSet.has('DevOps Engineering'))) ||
        (rec.category === 'Backend & System Design' && (selectedInterestsSet.has('Backend Development') || selectedInterestsSet.has('System Design')));
      
      return {
        ...rec,
        recommended: isSelected,
        priority: isSelected ? 'High' : (rec.id === 'rec1' || rec.id === 'rec3' || rec.id === 'rec4' ? 'High' : (rec.id === 'rec2' ? 'Medium' : 'Optional')) as any
      };
    });

    // Handle any custom interests not present in our predefined set
    (assessment.interests || []).forEach((interest, idx) => {
      const alreadyExists = updatedRecommendations.some(r => r.category === interest || r.name.includes(interest));
      if (!alreadyExists) {
        const newRec = {
          ...mapInterestToRecommendation(interest, `dyn-${interest.replace(/\s+/g, '-').toLowerCase()}-${idx}`),
          recommended: true,
          priority: 'High' as const
        };
        updatedRecommendations.push(newRec);
      }
    });

    setRecommendations(updatedRecommendations);

    addActivity('Submitted custom tech assessment', 'assessment', 150);

    // Generate new domain specific badges
    const newDomainBadges = generateBadgesForDomain(selectedDomain, undefined, updatedRoadmap, dynamicReadinessScore);
    setBadges(newDomainBadges);
  };

  const toggleSession = (phaseId: string, sessionId: string) => {
    let sessionTitle = '';
    let isNowCompleted = false;

    const updatedRoadmap = roadmap.map(phase => {
      if (phase.id !== phaseId) return phase;

      const updatedSessions = phase.sessions.map(session => {
        if (session.id !== sessionId) return session;
        sessionTitle = session.title;
        isNowCompleted = !session.completed;
        return { ...session, completed: isNowCompleted };
      });

      // Recalculate phase status
      const allDone = updatedSessions.every(s => s.completed);
      const someDone = updatedSessions.some(s => s.completed);
      let status = phase.status;
      if (allDone) {
        status = 'Completed';
      } else if (someDone) {
        status = 'In Progress';
      }

      return { ...phase, status, sessions: updatedSessions };
    });

    // Enable next phase if previous is completed
    for (let i = 0; i < updatedRoadmap.length - 1; i++) {
      if (updatedRoadmap[i].status === 'Completed' && updatedRoadmap[i + 1].status === 'Locked') {
        updatedRoadmap[i + 1].status = 'In Progress';
        addActivity(`Unlocked phase: ${updatedRoadmap[i+1].title}`, 'roadmap', 100);
      }
    }

    setRoadmap(updatedRoadmap);

    // Calculate new stats
    const totalSessions = updatedRoadmap.flatMap(p => p.sessions).length;
    const completedSessions = updatedRoadmap.flatMap(p => p.sessions).filter(s => s.completed).length;
    const completionRate = completedSessions / totalSessions;
    const newReadiness = Math.min(99.5, parseFloat((35 + (completionRate * 60)).toFixed(1)));
    
    // Calculate study hours
    const addedHours = updatedRoadmap.flatMap(p => p.sessions)
      .filter(s => s.completed)
      .reduce((sum, s) => sum + s.durationHours, 0);

    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        readinessScore: newReadiness,
        learningHoursWeekly: parseFloat(Math.min(prev.targetHoursWeekly, 5 + (completedSessions * 2.5)).toFixed(1))
      };
    });

    addActivity(
      `${isNowCompleted ? 'Completed' : 'Incompleted'} session: "${sessionTitle}"`, 
      'roadmap', 
      isNowCompleted ? 50 : -50
    );

    // Check and update achievement unlock conditions dynamically based on domain
    const activeDomain = getActiveDomain(user);
    setBadges(prev => generateBadgesForDomain(activeDomain, prev, updatedRoadmap, newReadiness));
  };

  const allSessionsDone = (rm: RoadmapPhase[]) => {
    return rm.flatMap(p => p.sessions).every(s => s.completed);
  };

  const enrollTech = (techId: string) => {
    let techName = '';
    let isEnrolledAfter = false;
    let targetRec: TechRecommendation | undefined;

    setRecommendations(prev => {
      return prev.map(r => {
        if (r.id !== techId) return r;
        techName = r.name;
        isEnrolledAfter = !r.enrolled;
        targetRec = { ...r, enrolled: isEnrolledAfter };
        return targetRec;
      });
    });

    // We use a small timeout or functional state update to ensure roadmap has access to the target recommendation
    // Wait, since states are updated in the same render loop, we can construct the phase directly using the found targetRec
    // or retrieve it from the current recommendations list. Let's find it immediately in the current state to be secure.
    const currentRec = recommendations.find(r => r.id === techId);
    if (currentRec) {
      techName = currentRec.name;
      isEnrolledAfter = !currentRec.enrolled;
      targetRec = { ...currentRec, enrolled: isEnrolledAfter };
    }

    if (isEnrolledAfter && targetRec) {
      setRoadmap(prev => {
        const phaseId = `p-rec-${techId}`;
        if (prev.some(p => p.id === phaseId)) return prev;

        const maxPhaseNumber = prev.reduce((max, p) => Math.max(max, p.phaseNumber), 0);
        const newPhase = createRoadmapPhaseFromRecommendation(targetRec!, maxPhaseNumber + 1);
        
        return [...prev, newPhase];
      });

      addActivity(`Enrolled in path & generated roadmap: "${techName}"`, 'roadmap', 30);
    } else {
      setRoadmap(prev => prev.filter(p => p.id !== `p-rec-${techId}`));
      addActivity(`Removed "${techName}" from learning roadmap`, 'roadmap', 0);
    }

    // Unlock badge for first recommendation enrollment
    setBadges(prev => prev.map(badge => {
      if (badge.id === 'b4' && !badge.unlocked) {
        return { ...badge, unlocked: true, unlockedDate: 'Just now' };
      }
      return badge;
    }));
  };

  return (
    <AppContext.Provider value={{
      user,
      skills,
      recommendations,
      roadmap,
      activities,
      badges,
      isAuthenticated,
      login,
      signup,
      logout,
      updateProfile,
      submitAssessment,
      toggleSession,
      enrollTech,
      addActivity
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
