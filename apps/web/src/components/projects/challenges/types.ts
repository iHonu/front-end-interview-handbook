import type {
  ProjectsChallengeInfo,
  ProjectsChallengeMetadata,
} from 'contentlayer/generated';

import type { QuestionUserInterfaceWorkspace } from '~/components/interviews/questions/common/QuestionsTypes';

import type { ProjectsSkillKey } from '../skills/types';
import type {
  ProjectsDeviceImages,
  ProjectsProfileAvatarDataSlim,
} from '../types';

import type { SandpackFiles } from '@codesandbox/sandpack-react';
import type { ProjectsChallengeSessionStatus } from '@prisma/client';

// Sorted in order of difficulty.
export const projectDifficultyOptions = [
  'starter',
  'mid',
  'senior',
  'nightmare',
];

export type ProjectsChallengeDifficulty =
  (typeof projectDifficultyOptions)[number];

export const projectChallengeResourceOptions = [
  'api',
  'design-files',
  'image-assets',
  'readme',
  'starter-code',
  'style-guide',
];

export type ProjectsChallengeResource =
  (typeof projectChallengeResourceOptions)[number];

export const projectAccessOptions = ['free', 'standard', 'premium'];
export type ProjectsChallengeAccess = (typeof projectAccessOptions)[number];

export type ProjectsChallengeVariantPageImages = Readonly<{
  images: ProjectsDeviceImages;
  label: string;
}>;
export type ProjectsChallengeVariantImages =
  ReadonlyArray<ProjectsChallengeVariantPageImages>;

export const projectTrackOptions = [
  'apps',
  'design-system',
  'e-commerce',
  'games',
  'marketing',
  'portfolio',
];
export type ProjectsTrackEnum = (typeof projectTrackOptions)[number];

export type ProjectsChallengeTrackPayload = Readonly<{
  href: string;
  slug: string;
  title: string;
}>;

export type ProjectsChallengeItem = Readonly<{
  info: ProjectsChallengeInfo;
  metadata: ProjectsChallengeMetadata;
  startedCount: number | null;
  startedProfiles: ReadonlyArray<ProjectsProfileAvatarDataSlim>;
  status: ProjectsChallengeSessionStatus | null;
  track: ProjectsChallengeTrackPayload;
  userUnlocked: boolean | null;
}>;

export type ProjectsChallengeHistoricalStatuses = Record<
  ProjectsChallengeMetadata['slug'],
  { completedBefore: boolean; currentStatus: ProjectsChallengeSessionStatus }
>;

export type ProjectsChallengeSessionSkillsFormValues = Readonly<{
  roadmapSkills: Array<ProjectsSkillKey>;
  techStackSkills: Array<ProjectsSkillKey>;
}>;

export type ProjectsChallengeSolutionType = 'react' | 'vanilla';

export type ProjectsChallengeSolutionSetupType = 'solutions';

export type ProjectsChallengeSolutionBundle = Readonly<{
  files: SandpackFiles;
  workspace: QuestionUserInterfaceWorkspace;
}>;

export const projectsChallengeSupportedSolutionOptions = ['vanilla', 'react'];
