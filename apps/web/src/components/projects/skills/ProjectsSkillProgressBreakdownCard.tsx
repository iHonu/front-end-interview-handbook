import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';
import { themeBackgroundChipColor } from '~/components/ui/theme';

import { projectsSkillLabel } from './data/ProjectsSkillListData';
import type { ProjectsSkillKey } from './types';
import type { SubSkill } from './types';

const MAX_SUBSKILLS_TO_SHOW = 4;

type Props = Readonly<{
  borderColor?: string;
  className?: string;
  skill: {
    key: ProjectsSkillKey;
    points: number;
  };
  subSkills: ReadonlyArray<SubSkill>;
}>;

type SubSkillProps = Readonly<{
  subSkill: SubSkill;
}>;

function SubSkillItem({ subSkill }: SubSkillProps) {
  return (
    <div className="flex items-center justify-between">
      <Text color="subtitle" size="body3" weight="medium">
        {projectsSkillLabel(subSkill.key)}
      </Text>
      <Text
        className={clsx('rounded-full px-2.5 py-0.5', themeBackgroundChipColor)}
        size="body3">
        +{subSkill.points}
      </Text>
    </div>
  );
}

export default function ProjectsSkillProgressBreakdownCard({
  className,
  skill,
  borderColor,
  subSkills,
}: Props) {
  const first4SubSkills = subSkills.slice(0, MAX_SUBSKILLS_TO_SHOW);
  const othersSubSkillsTotalPoints = subSkills
    .slice(MAX_SUBSKILLS_TO_SHOW)
    .reduce((acc, subSkill) => (acc += subSkill.points), 0);

  return (
    <div
      className={clsx(
        'min-w-sm flex flex-1 flex-col rounded-lg border-2 p-4',
        borderColor
          ? borderColor
          : 'border-neutral-600 dark:border-neutral-400',
        className,
      )}>
      <div className="flex flex-col gap-y-2">
        <Text size="body3" weight="bold">
          {projectsSkillLabel(skill.key)}
        </Text>
        <Text color="subtle" size="body3" weight="normal">
          <FormattedMessage
            defaultMessage="+{points} rep"
            description="Rep gain for parent skill"
            id="+1woLQ"
            values={{
              points: skill.points,
            }}
          />
        </Text>
      </div>

      <div className="mt-4 flex flex-col gap-1">
        {first4SubSkills.map((subSkill) => (
          <SubSkillItem key={subSkill.key} subSkill={subSkill} />
        ))}
        {subSkills.length > MAX_SUBSKILLS_TO_SHOW && (
          <SubSkillItem
            subSkill={{
              key: 'Others',
              points: othersSubSkillsTotalPoints,
            }}
          />
        )}
      </div>
    </div>
  );
}
