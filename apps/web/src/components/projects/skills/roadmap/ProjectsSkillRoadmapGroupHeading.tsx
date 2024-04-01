import clsx from 'clsx';
import { RiFireLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import ProjectsStatusBadgeCompleted from '~/components/projects/common/status/ProjectsStatusBadgeCompleted';
import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

import type { ProjectsSkillRoadmapSectionGroup } from '../types';
import ProjectsChallengeProgressTag from '../../challenges/metadata/ProjectsChallengeProgressTag';

type Props = Readonly<{
  group: ProjectsSkillRoadmapSectionGroup;
}>;

export default function ProjectsSkillRoadmapGroupHeading({ group }: Props) {
  const { description, points, totalChallenges, completedChallenges } = group;
  const completedAll =
    totalChallenges === completedChallenges && completedChallenges > 0;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-row flex-wrap justify-between gap-2">
        <Text size="body1" weight="medium">
          {group.key}
        </Text>
        {completedAll ? (
          <ProjectsStatusBadgeCompleted entity="skill" />
        ) : (
          <div className={clsx('flex gap-4', themeTextSubtleColor)}>
            <div className="flex items-center gap-1">
              <RiFireLine className={clsx('size-4')} />
              <Text color="inherit" size="body3">
                <FormattedMessage
                  defaultMessage="+{points} rep (in total)"
                  description="Total rep count increase label in Projects"
                  id="Lvmetb"
                  values={{
                    points,
                  }}
                />
              </Text>
            </div>
            <ProjectsChallengeProgressTag
              completed={completedChallenges}
              showProgress={false}
              total={totalChallenges}
            />
          </div>
        )}
      </div>
      <Text color="secondary" size="body3">
        {description}
      </Text>
    </div>
  );
}
