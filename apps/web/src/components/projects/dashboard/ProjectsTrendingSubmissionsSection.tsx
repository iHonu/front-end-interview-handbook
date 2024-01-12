'use client';

import clsx from 'clsx';
import { RiArrowRightLine, RiQuestionFill } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Anchor from '~/components/ui/Anchor';
import UserAvatar from '~/components/ui/Avatar/UserAvatar';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasizedHover,
  themeBorderColor,
  themeDivideColor,
  themeTextBrandColor,
  themeTextBrandGroupHoverColor,
  themeTextFaintColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

const limit = 4;

export default function ProjectsTrendingSubmissionsSection() {
  const intl = useIntl();

  const { isLoading, data: submissions } =
    trpc.projects.submissions.getLatestSubmitted.useQuery({
      limit,
    });

  const tooltipLabel = intl.formatMessage({
    defaultMessage:
      'We recommend quality submissions from more senior engineers using a similar tech stack to you, or tech stack you expressed interest in learning',
    description:
      'Tooltip label for Trending submissions section on Projects dashboard page',
    id: 'XMHcvt',
  });

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-2.5 items-center">
          <Heading level="heading6">
            <FormattedMessage
              defaultMessage="Trending user submissions"
              description="Title for Trending submissions section on Projects dashboard page"
              id="qVn8Yq"
            />
          </Heading>
          <Tooltip label={tooltipLabel}>
            <RiQuestionFill className="h-4 w-4 dark:text-neutral-500 text-neutral-400" />
          </Tooltip>
        </div>
        <Anchor
          className="group flex items-center gap-1"
          href="/projects/submissions">
          <Text color="active" size="body2" weight="medium">
            <FormattedMessage
              defaultMessage="See all"
              description="Label for See all button on Projects dashboard page"
              id="PHTFnA"
            />
          </Text>
          <RiArrowRightLine
            aria-hidden="true"
            className={clsx('h-4 w-4 shrink-0', themeTextBrandColor)}
          />
        </Anchor>
      </div>
      <ul
        className={clsx(
          'isolate rounded-lg',
          ['divide-y', themeDivideColor],
          ['border', themeBorderColor],
        )}>
        {submissions?.map((submission, index) => (
          <li
            key={submission.id}
            className={clsx(
              'group relative flex py-4 pl-5 pr-8',
              'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
              'bg-white dark:bg-neutral-800/40',
              'transition-colors',
              themeBackgroundEmphasizedHover,
              index === 0 && 'rounded-t-lg',
              index === submissions.length - 1 && 'rounded-b-lg',
            )}>
            <div className="flex flex-row gap-4 lg:items-center">
              {submission.challenge && (
                <img
                  alt={submission.challenge.title}
                  className="object-cover rounded lg:w-1/5 w-1/4"
                  src={submission.challenge.imageUrl}
                />
              )}
              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-col lg:gap-1 gap-2">
                  <Text size="body1" weight="medium">
                    <Anchor href={submission.deploymentUrl} variant="unstyled">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {submission.title}
                    </Anchor>
                  </Text>
                  {submission.challenge && (
                    <Text color="secondary" size="body3">
                      <FormattedMessage
                        defaultMessage="Brief: <link>{briefDescription}</link>"
                        description="Link to brief for project submission"
                        id="BgJH+X"
                        values={{
                          briefDescription: submission.challenge.title,
                          link: (chunks) => (
                            <Anchor
                              className="relative"
                              href={submission.challenge?.href}>
                              {chunks}
                            </Anchor>
                          ),
                        }}
                      />
                    </Text>
                  )}
                </div>
                <div className="flex lg:flex-row lg:gap-4 flex-col gap-3">
                  {submission.projectsProfile?.userProfile && (
                    <div className="flex flex-row lg:gap-2 gap-1.5 items-center">
                      <UserAvatar
                        className="border border-green-500"
                        profile={{
                          avatarUrl:
                            submission.projectsProfile.userProfile.avatarUrl,
                          id: submission.projectsProfile.userProfile.id,
                          name: submission.projectsProfile.userProfile.name,
                          username:
                            submission.projectsProfile.userProfile.username,
                        }}
                        size="xs"
                      />
                      <Text size="body3" weight="medium">
                        {submission.projectsProfile.userProfile.name}
                      </Text>
                    </div>
                  )}
                  <div className="flex flex-row gap-4 items-center">
                    <Text color="subtitle" size="body3">
                      <FormattedMessage
                        defaultMessage="{likes} Likes"
                        description="Number of likes for project submission"
                        id="rRJPN4"
                        values={{
                          likes: submission._count.votes,
                        }}
                      />
                    </Text>
                    <Text color="subtitle" size="body3">
                      <FormattedMessage
                        defaultMessage="{comments} Comments"
                        description="Number of comments for project submission"
                        id="K+j1lh"
                        values={{
                          comments: 16, // TODO: get comments
                        }}
                      />
                    </Text>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <RiArrowRightLine
                  aria-hidden="true"
                  className={clsx(
                    'h-6 w-6 shrink-0',
                    themeTextFaintColor,
                    themeTextBrandGroupHoverColor,
                  )}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}