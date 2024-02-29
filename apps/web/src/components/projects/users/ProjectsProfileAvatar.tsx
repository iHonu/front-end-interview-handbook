import Anchor from '~/components/ui/Anchor';
import {
  Hovercard,
  HovercardContent,
  HovercardTrigger,
} from '~/components/ui/Hovercard/Hovercard';

import ProjectsProfileHoverCard from './ProjectsProfileHoverCard';
import type { UserLevelWithAvatarSize } from './UserAvatarWithLevel';
import UserAvatarWithLevel from './UserAvatarWithLevel';
import { projectsReputationLevel } from '../reputation/projectsReputationLevelUtils';

type Mode = 'hovercard' | 'inert' | 'link';

type Props = Readonly<{
  className?: string;
  mode?: Mode;
  points?: number | null;
  size?: UserLevelWithAvatarSize;
  userProfile?: Readonly<{
    avatarUrl: string | null;
    id: string;
    name: string | null;
    username: string;
  }>;
}>;

export default function ProjectsProfileAvatar({
  points = 0,
  userProfile,
  className,
  size = 'lg',
  mode = 'hovercard',
}: Props) {
  const { level, progress } = projectsReputationLevel(points ?? 0);
  const avatar = (
    <UserAvatarWithLevel
      className={className}
      level={level}
      progress={progress}
      size={size}
      userProfile={userProfile}
    />
  );

  const anchorAvatar =
    userProfile != null ? (
      <Anchor
        aria-label={userProfile.name ?? userProfile.username}
        className="font-medium"
        href={`/projects/u/${userProfile.username}`}
        variant="unstyled">
        {avatar}
      </Anchor>
    ) : (
      avatar
    );

  return userProfile != null && mode === 'hovercard' ? (
    <Hovercard>
      <HovercardTrigger asChild={true}>{anchorAvatar}</HovercardTrigger>
      <HovercardContent>
        <ProjectsProfileHoverCard userId={userProfile.id} />
      </HovercardContent>
    </Hovercard>
  ) : userProfile != null && mode === 'link' ? (
    anchorAvatar
  ) : (
    avatar
  );
}
