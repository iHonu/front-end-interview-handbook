import { useIntl } from 'react-intl';

import useProfile from '~/hooks/user/useProfile';

import ProjectsDiscussionPostList from '~/components/projects/projects/discussions/ProjectsDiscussionPostList';
import type { Post } from '~/components/projects/projects/discussions/types';
import ProjectsReputationCountIncreaseTag from '~/components/projects/stats/ProjectsReputationCountIncreaseTag';
import ProjectsUserJobTitle from '~/components/projects/users/ProjectsUserJobTitle';
import ProjectsUserYearsOfExperience from '~/components/projects/users/ProjectsUserYearsOfExperience';
import UserAvatarWithLevel from '~/components/projects/users/UserAvatarWithLevel';
import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Text from '~/components/ui/Text';
import TextArea from '~/components/ui/TextArea';

type Props = Readonly<{
  posts: Array<Post>;
}>;

export default function ProjectDiscussions({ posts }: Props) {
  const intl = useIntl();

  const { profile } = useProfile();

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4">
        <UserAvatarWithLevel
          level={11}
          profile={profile}
          progress={50}
          size="xl"
        />
        <div className="flex flex-col">
          {profile?.username && (
            <Text size="body2" weight="medium">
              {profile.username}
            </Text>
          )}
          <div className="flex gap-4">
            {profile?.title && (
              <ProjectsUserJobTitle jobTitle={profile.title} size="2xs" />
            )}
            {profile?.startWorkDate && (
              // TODO(projects): Fix yoe display.
              <ProjectsUserYearsOfExperience size="2xs" yearsOfExperience={2} />
            )}
          </div>
        </div>
      </div>
      <TextArea
        className="mb-3 mt-3"
        isLabelHidden={true}
        label={intl.formatMessage({
          defaultMessage: 'Discussion post content',
          description: 'Label for discussion post input text area',
          id: 'nQKtbN',
        })}
        placeholder={intl.formatMessage({
          defaultMessage: 'Share your questions or thoughts',
          description: 'Placeholder for discussion post input text area',
          id: 'OrN/z/',
        })}
      />
      <CheckboxInput
        label={intl.formatMessage({
          defaultMessage: 'Post as question',
          description: 'Label for toggle to post as question',
          id: 'WoEmKY',
        })}
      />
      <div className="mt-4 flex items-center gap-4">
        <Button
          className="w-[120px]"
          label={intl.formatMessage({
            defaultMessage: 'Post',
            description: 'Label for post button on project discussions page',
            id: 'bnqijt',
          })}
          type="submit"
          variant="primary"
        />
        <ProjectsReputationCountIncreaseTag points={25} variant="filled" />
      </div>
      <ProjectsDiscussionPostList posts={posts} />
    </div>
  );
}