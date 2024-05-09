import type { ProjectsPremiumAccessControlType } from './ProjectsPremiumAccessControl';
import ProjectsPremiumPaywall from './ProjectsPremiumPaywall';
import {
  useProjectsChallengePaywallSubtitle,
  useProjectsChallengePaywallTitle,
} from './ProjectsPremiumPaywallStrings';
import type { ProjectsViewerProjectsProfile } from '../../types';

type Props = Readonly<{
  slug: string;
  viewerContentAccess: ProjectsPremiumAccessControlType;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>;

export default function ProjectsChallengeContentPaywall({
  viewerContentAccess,
  viewerProjectsProfile,
  slug,
}: Props) {
  const title = useProjectsChallengePaywallTitle(viewerContentAccess);
  const subtitle = useProjectsChallengePaywallSubtitle(
    viewerContentAccess,
    viewerProjectsProfile,
  );

  return (
    <ProjectsPremiumPaywall
      size="lg"
      slug={slug}
      subtitle={subtitle}
      title={title!}
      viewerContentAccess={viewerContentAccess}
      viewerProjectsProfile={viewerProjectsProfile}
    />
  );
}
