'use client';

import clsx from 'clsx';
import type { ProjectsChallengeGuide } from 'contentlayer/generated';
import { useState } from 'react';
import {
  RiClipboardFill,
  RiCodeSSlashFill,
  RiQuestionAnswerFill,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import BlurOverlay from '~/components/common/BlurOverlay';
import ProjectsChallengeDiscussionsSection from '~/components/projects/challenges/discussions/ProjectsChallengeDiscussionsSection';
import ProjectsChallengeReferenceSubmissions from '~/components/projects/challenges/resources/ProjectsChallengeReferenceSubmissions';
import { useProjectsChallengeSessionContext } from '~/components/projects/challenges/session/ProjectsChallengeSessionContext';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import Button from '~/components/ui/Button';
import EmptyState from '~/components/ui/EmptyState';
import Heading from '~/components/ui/Heading';
import Spinner from '~/components/ui/Spinner';
import type { TabItem } from '~/components/ui/Tabs';
import Tabs from '~/components/ui/Tabs';
import { themeBorderColor } from '~/components/ui/theme';

import ProjectsChallengeGuideSection from '../guides/ProjectsChallengeGuideSection';
import ProjectsChallengeContentPaywall from '../premium/ProjectsChallengeContentPaywall';
import type { ProjectsPremiumAccessControlFields } from '../premium/ProjectsPremiumAccessControl';
import type { ProjectsViewerProjectsProfile } from '../../types';

type TipsResourcesDiscussionsTabType = 'discussions' | 'guides' | 'references';

function useTipsResourcesDiscussionsTabs() {
  const tabs: Array<TabItem<TipsResourcesDiscussionsTabType>> = [
    {
      icon: RiQuestionAnswerFill,
      label: 'Discussions',
      value: 'discussions',
    },
    {
      icon: RiClipboardFill,
      label: 'Guides',
      value: 'guides',
    },
    {
      icon: RiCodeSSlashFill,
      label: 'Reference code',
      value: 'references',
    },
  ];

  return tabs;
}

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  projectGuides: Array<ProjectsChallengeGuide>;
  viewerAccess: ProjectsPremiumAccessControlFields;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>;

export default function ProjectsChallengeResourcesPage({
  challenge,
  projectGuides,
  viewerProjectsProfile,
  viewerAccess,
}: Props) {
  const intl = useIntl();
  const tipsResourcesDiscussionsTabs = useTipsResourcesDiscussionsTabs();
  const [tipsResourcesDiscussionsTab, setTipsResourcesDiscussionsTab] =
    useState<TipsResourcesDiscussionsTabType>('discussions');

  const { startProject, accessAllSteps, fetchingCanAccessAllSteps } =
    useProjectsChallengeSessionContext();

  const showPaywall = viewerAccess.viewChallenge !== 'YES';
  const overlay = showPaywall ? (
    <ProjectsChallengeContentPaywall
      slug={challenge.metadata.slug}
      viewerContentAccess={viewerAccess.viewChallenge}
      viewerProjectsProfile={viewerProjectsProfile}
    />
  ) : (
    <div
      className={clsx(
        'flex flex-col items-center gap-y-6',
        'mx-auto max-w-lg',
        'text-center',
      )}>
      {fetchingCanAccessAllSteps ? (
        <Spinner size="md" />
      ) : (
        <>
          <Heading level="heading5">
            <FormattedMessage
              defaultMessage="Start the project to access guides, discussions and reference code"
              description="Title for project overlay on projects details page"
              id="5ozhak"
            />
          </Heading>
          <Button
            label={intl.formatMessage({
              defaultMessage: 'Start project',
              description: 'Start Project button label',
              id: 'Se4xmG',
            })}
            size="md"
            variant="primary"
            onClick={startProject}
          />
        </>
      )}
    </div>
  );

  return (
    <BlurOverlay
      align="center"
      overlay={overlay}
      showOverlay={showPaywall || !accessAllSteps}>
      <div className="flex flex-col items-stretch">
        <div className="flex flex-col gap-y-8">
          <Tabs
            label={intl.formatMessage({
              defaultMessage: 'Select tip type',
              description: 'Label for tabs to select tip type',
              id: 'LNxxS2',
            })}
            size="sm"
            tabs={tipsResourcesDiscussionsTabs}
            value={tipsResourcesDiscussionsTab}
            onSelect={setTipsResourcesDiscussionsTab}
          />
          {accessAllSteps ? (
            tipsResourcesDiscussionsTab === 'discussions' ? (
              <ProjectsChallengeDiscussionsSection challenge={challenge} />
            ) : tipsResourcesDiscussionsTab === 'guides' ? (
              <ProjectsChallengeGuideSection projectGuides={projectGuides} />
            ) : (
              tipsResourcesDiscussionsTab === 'references' && (
                <ProjectsChallengeReferenceSubmissions challenge={challenge} />
              )
            )
          ) : (
            <div
              className={clsx(
                'w-full rounded-lg py-10',
                'border',
                themeBorderColor,
              )}>
              <EmptyState
                subtitle="Be the first to leave a comment"
                title="No comments yet"
              />
            </div>
          )}
        </div>
      </div>
    </BlurOverlay>
  );
}
