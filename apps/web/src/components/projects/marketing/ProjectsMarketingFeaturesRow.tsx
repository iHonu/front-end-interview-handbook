'use client';

import { useMemo } from 'react';
import {
  RiCheckboxMultipleLine,
  RiDiscussLine,
  RiNodeTree,
} from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import ProjectsMarketingFeaturedIcon from './ProjectsMarketingFeaturedIcon';

type ProjectMarketingHeroFeature = {
  content: React.ReactNode;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: string;
};

export default function ProjectsMarketingFeaturesRow() {
  const heroFeatures: Array<ProjectMarketingHeroFeature> = useMemo(
    () => [
      {
        content: (
          <FormattedMessage
            defaultMessage="Build projects to learn any front end skill using our <link>Skills roadmap</link>"
            description="Caption for Projects marketing hero section skills roadmap feature"
            id="rUKlWg"
            values={{
              // TODO: Update the link href
              link: (chunks) => <Anchor href="#">{chunks}</Anchor>,
            }}
          />
        ),
        icon: RiNodeTree,
        key: 'skills',
      },
      {
        content: (
          <FormattedMessage
            defaultMessage="Every project is part of <link>reusable component libraries</link> for your future projects"
            description="Caption for Projects marketing hero section component libraries feature"
            id="ES78kz"
            values={{
              link: (chunks) => (
                // TODO: Update the link href
                <Anchor href="#">{chunks}</Anchor>
              ),
            }}
          />
        ),
        icon: RiCheckboxMultipleLine,
        key: 'component-libraries',
      },
      {
        content: (
          <FormattedMessage
            defaultMessage="Guides & solutions from Sr. Engineers and code reviews from <link>community</link>"
            description="Caption for Projects marketing hero section community feature"
            id="4uyrtd"
            values={{
              link: (chunks) => (
                // TODO: Update the link href
                <Anchor href="#">{chunks}</Anchor>
              ),
            }}
          />
        ),
        icon: RiDiscussLine,
        key: 'community',
      },
    ],
    [],
  );

  return (
    <Container className="py-24">
      <Heading className="sr-only" level="custom">
        Features
      </Heading>
      <Section>
        <div className="grid grid-cols-3">
          {heroFeatures.map(({ content, icon, key }) => (
            <div key={key} className="flex flex-col items-center gap-y-4">
              <ProjectsMarketingFeaturedIcon icon={icon} />
              <Text
                className="text-balance text-center"
                color="subtitle"
                size="body2">
                {content}
              </Text>
            </div>
          ))}
        </div>
      </Section>
    </Container>
  );
}
