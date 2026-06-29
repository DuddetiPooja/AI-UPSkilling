export interface UserProfile {
  name: string;
  email: string;
  title: string;
  avatarUrl: string;
  careerGoal: string;
  currentLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  readinessScore: number;
  readinessChange: number;
  streakDays: number;
  targetMonths: number;
  learningHoursWeekly: number;
  targetHoursWeekly: number;
  aiMode: 'Adaptive' | 'Fast-Track' | 'Deep-Dive';
  selectedSkills?: string[];
  interests?: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Cloud Engineering' | 'Backend & System Design' | 'AI & Data Science' | 'DevOps & Security';
  currentMatch: number; // percentage 0-100
  requiredLevel: number; // percentage benchmark
  status: 'Mastered' | 'On Track' | 'Gap Identified' | 'Critical Missing';
}

export interface TechRecommendation {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  priority: 'High' | 'Medium' | 'Optional';
  estHours: number;
  tags: string[];
  resources: { title: string; type: 'course' | 'doc' | 'project'; url: string }[];
  enrolled: boolean;
  recommended?: boolean;
}

export interface RoadmapSession {
  id: string;
  title: string;
  durationHours: number;
  completed: boolean;
  type: 'concept' | 'hands-on' | 'quiz';
}

export interface RoadmapPhase {
  id: string;
  phaseNumber: number;
  title: string;
  subtitle: string;
  status: 'Completed' | 'In Progress' | 'Locked';
  sessions: RoadmapSession[];
}

export interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  type: 'assessment' | 'roadmap' | 'badge' | 'login';
  points: number;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  category: 'Streak' | 'Skill' | 'Milestone';
}

export interface AssessmentSubmission {
  currentLevel: string;
  careerGoal: string;
  selectedSkills: string[];
  interests: string[];
  weeklyHoursCommitment: number;
}
