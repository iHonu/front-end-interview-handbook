import type { ProjectsChallengeMetadata } from 'contentlayer/generated';

import type { ProjectsViewerProjectsProfile } from '../../types';

export type ProjectsChallengeAccessControlType =
  | 'INSUFFICIENT_CREDITS'
  | 'RESUBSCRIBE'
  | 'SUBSCRIBE'
  | 'UNLOCK'
  | 'YES';

export type ProjectsChallengeAccessControlFields = Readonly<{
  downloadFigma: ProjectsChallengeAccessControlType;
  viewChallenge: ProjectsChallengeAccessControlType;
  viewSubmission: ProjectsChallengeAccessControlType;
}>;

export default function ProjectsChallengeAccessControl(
  challengeAccess: ProjectsChallengeMetadata['access'],
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null,
  viewerUnlockedAccess: boolean,
): ProjectsChallengeAccessControlFields {
  if (challengeAccess === 'free') {
    return {
      downloadFigma: 'YES',
      viewChallenge: 'YES',
      viewSubmission: 'YES',
    };
  }

  const viewerAccess = (() => {
    const credits = viewerProjectsProfile?.credits ?? 0;

    if (viewerProjectsProfile?.premium && viewerUnlockedAccess) {
      return 'YES';
    }

    if (viewerProjectsProfile?.premium && credits > 0) {
      return 'UNLOCK';
    }

    if (viewerProjectsProfile?.premium && credits <= 0) {
      return 'INSUFFICIENT_CREDITS';
    }

    if (!viewerProjectsProfile?.premium && credits > 0) {
      return 'RESUBSCRIBE';
    }

    return 'SUBSCRIBE';
  })();

  if (challengeAccess === 'free-plus') {
    return {
      downloadFigma: viewerAccess,
      viewChallenge: 'YES',
      viewSubmission: 'YES',
    };
  }

  return {
    downloadFigma: viewerAccess,
    viewChallenge: viewerAccess,
    viewSubmission: viewerAccess,
  };
}
