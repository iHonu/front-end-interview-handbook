import { useIntl } from 'react-intl';

import Card from '~/components/ui/Card';
import Text from '~/components/ui/Text';

import type { ProjectsSubmission } from './types';
import ProjectsSkillRow from '../skills/ProjectsSkillRow';
import ProjectsCommentCountTag from '../stats/ProjectsCommentCountTag';
import ProjectsLikeCountTag from '../stats/ProjectsLikeCountTag';
import ProjectsViewCountTag from '../stats/ProjectsViewCountTag';
import ProjectsUserJobTitle from '../users/ProjectsUserJobTitle';
import ProjectsUserYearsOfExperience from '../users/ProjectsUserYearsOfExperience';
import UserAvatarWithLevel from '../users/UserAvatarWithLevel';

type Props = Readonly<{
  submission: ProjectsSubmission;
}>;

export default function ProjectsSubmissionCard({ submission }: Props) {
  const intl = useIntl();
  const {
    title,
    stack,
    author,
    description,
    commentCount,
    likeCount,
    viewCount,
    imgSrc,
  } = submission;

  return (
    <Card disableSpotlight={true} padding={false} pattern={false}>
      <div className="flex flex-col px-4 py-6 gap-4">
        <div className="flex flex-col gap-3">
          <Text weight="bold">{title}</Text>
          <ProjectsSkillRow
            label={intl.formatMessage({
              defaultMessage: 'Stack used',
              description: 'Label for tech stack used in project',
              id: 'aiI8c6',
            })}
            skills={stack}
          />
        </div>
        <img alt="" className="h-[190px] w-full rounded-md" src={imgSrc} />
        <div className="flex items-center gap-4">
          <UserAvatarWithLevel
            level={11}
            profile={author}
            progress={40}
            size="xl"
          />
          <div className="flex flex-col gap-1">
            <Text size="body2">{author.name}</Text>
            <div className="flex gap-4">
              {author.title && <ProjectsUserJobTitle jobTitle={author.title} />}
              <ProjectsUserYearsOfExperience yearsOfExperience={2} />
            </div>
          </div>
        </div>
        <Text display="block" size="body3">
          {description}
        </Text>
        <div className="flex justify-between gap-4">
          <div className="flex gap-4">
            <ProjectsLikeCountTag likeCount={likeCount} />
            <ProjectsViewCountTag viewCount={viewCount} />
            <ProjectsCommentCountTag commentCount={commentCount} />
          </div>
          {/* TODO(projects): Format relative time */}
          <Text color="secondary" size="body3">
            12 h. ago
          </Text>
        </div>
      </div>
    </Card>
  );
}
