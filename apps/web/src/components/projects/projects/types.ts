import type { ProjectsSkill } from '../skills/types';

import type { User } from '@supabase/supabase-js';

export type ProjectProjectStatus = 'completed' | 'in-progress' | 'not-started';

export type ProjectsProject = {
  completedCount: number;
  completedUsers: Array<User>;
  description: string;
  imgSrc: string;
  isPremium: boolean;
  isStarter: boolean;
  projectHref: string;
  repCount: number;
  skills: Array<ProjectsSkill>;
  slug: string;
  status: ProjectProjectStatus;
  title: string;
  trackName: string;
};
