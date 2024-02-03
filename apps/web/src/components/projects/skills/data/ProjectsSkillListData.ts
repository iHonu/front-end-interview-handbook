import type { ProjectsSkillKey } from '../types';

export const ProjectsSkillLabels: Record<ProjectsSkillKey, string> = {
  angular: 'Angular',
  css: 'CSS',
  html: 'HTML',
  js: 'JS',
  nextjs: 'Next.js',
  react: 'React',
  svelte: 'Svelte',
  tailwind: 'Tailwind',
  vue: 'Vue',
};

export function ProjectsSkillArrayToTypeaheadValues(
  values: ReadonlyArray<ProjectsSkillKey>,
) {
  return values.map((value) => ({
    label: ProjectsSkillLabels[value] ?? value,
    value,
  }));
}

export function ProjectsSkillTypeaheadValuesToArray(
  values: ReadonlyArray<
    Readonly<{ label: string; value: ProjectsSkillKey }>
  > | null,
) {
  return values?.map(({ value }) => value) ?? null;
}

export function ProjectsSkillTypeaheadOptions() {
  return Object.entries(ProjectsSkillLabels).map(([value, label]) => ({
    label,
    value,
  }));
}