'use client';

import { FormattedMessage } from 'react-intl';

import ProjectsChallengeSubmissionListSection from '~/components/projects/submissions/ProjectsChallengeSubmissionListSection';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

export default function ProjectsChallengeSubmissionListAllPage() {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col max-w-prose gap-1">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Browse all user submissions"
            description="Learn from other user submissions"
            id="bofA5f"
          />
        </Heading>
        <Section>
          <Text color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="Browse project solutions from our community. Interact with each unique submission, share your expertise, and evolve alongside our collaborative coding community."
              description="Page subtitle"
              id="eRu+ff"
            />
          </Text>
        </Section>
      </div>
      <Section>
        <ProjectsChallengeSubmissionListSection />
      </Section>
    </div>
  );
}