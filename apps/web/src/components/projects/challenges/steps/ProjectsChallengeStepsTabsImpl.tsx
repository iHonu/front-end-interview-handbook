import { useIntl } from 'react-intl';

import type {
  ProjectStepsTabItem,
  Props as ProjectsChallengeStepsTabsProps,
} from './ProjectsChallengeStepsTabs';
import ProjectsChallengeStepsTabs from './ProjectsChallengeStepsTabs';
import type { ProjectsChallengeItem } from '../types';

export type ProjectsChallengeItemStepsTabType =
  | 'assets'
  | 'brief'
  | 'completion'
  | 'resources';

function useProjectDetailsStepsTabs(challenge: ProjectsChallengeItem) {
  const intl = useIntl();
  const { metadata } = challenge;

  const tabs: Array<ProjectStepsTabItem> = [
    {
      hint: intl.formatMessage({
        defaultMessage: 'Get started',
        description: 'Tab title for projects challenges',
        id: 'k8LRFw',
      }),
      href: metadata.href,
      subtitle: intl.formatMessage({
        defaultMessage: 'Project brief',
        description: 'Tab title for projects challenges',
        id: 'O2h4/M',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Step 1',
        description: 'Step N of multiple steps when completing a project',
        id: 'UCJ7hl',
      }),
      value: 'brief',
    },
    {
      hint: intl.formatMessage({
        defaultMessage: 'Get started',
        description: 'Tab title for projects challenges',
        id: 'k8LRFw',
      }),
      href: metadata.assetsHref,
      subtitle: intl.formatMessage({
        defaultMessage: 'Assets',
        description: 'Tab title for projects challenges',
        id: 'STZOEm',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Step 2',
        description: 'Step N of multiple steps when completing a project',
        id: 'AWr9Qe',
      }),
      value: 'assets',
    },
    {
      hint: intl.formatMessage({
        defaultMessage: 'While working on project',
        description: 'Tab label for projects challenges',
        id: 'TAuaop',
      }),
      href: metadata.resourcesHref,
      subtitle: intl.formatMessage({
        defaultMessage: 'Resources & discussions',
        description: 'Tab title for projects challenges',
        id: 'xtiHTC',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Step 3',
        description: 'Step N of multiple steps when completing a project',
        id: 'kTyRGU',
      }),
      value: 'resources',
    },
    {
      hint: intl.formatMessage({
        defaultMessage: 'After completion',
        description: 'Tab label for projects challenges',
        id: 'mU5c9N',
      }),
      href: metadata.completionHref,
      subtitle: intl.formatMessage({
        defaultMessage: 'Project completion',
        description: 'Tab title for projects challenges',
        id: 'QrnJKy',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Step 4',
        description: 'Step N of multiple steps when completing a project',
        id: 'TzB7wE',
      }),
      value: 'completion',
    },
  ];

  return tabs;
}

type Props = Omit<ProjectsChallengeStepsTabsProps, 'label' | 'tabs'> & {
  challenge: ProjectsChallengeItem;
};

export default function ProjectsChallengeStepsTabsImpl({
  challenge,
  ...props
}: Props) {
  const intl = useIntl();
  const tabs = useProjectDetailsStepsTabs(challenge);

  return (
    <ProjectsChallengeStepsTabs
      challenge={challenge}
      label={intl.formatMessage({
        defaultMessage: 'Project steps',
        description: 'Label for Project steps tabs',
        id: 'TJD+8A',
      })}
      tabs={tabs}
      {...props}
    />
  );
}
