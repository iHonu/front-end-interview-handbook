import clsx from 'clsx';
import type {
  ProjectsChallengeGuide,
  ProjectsCommonGuide,
} from 'contentlayer/generated';
import { useRef, useState } from 'react';
import { RiMenu2Line } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import ArticlePagination from '~/components/common/ArticlePagination';
import { SidebarLinksList } from '~/components/common/SidebarLinksList';
import ProjectsChallengeMdxContent from '~/components/projects/common/ProjectsChallengeMdxContent';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import SlideOut from '~/components/ui/SlideOut';

type Props = Readonly<{
  challengeGuide: ProjectsChallengeGuide | null;
  commonGuides: ReadonlyArray<ProjectsCommonGuide>;
}>;

const CHALLENGE_GUIDE_SLUG = 'challenge-guide';

export default function ProjectsChallengeGuideSection({
  challengeGuide,
  commonGuides,
}: Props) {
  const intl = useIntl();
  const guideRef: React.RefObject<HTMLDivElement> = useRef(null);

  const [activeGuideSlug, setActiveGuideSlug] = useState(
    challengeGuide ? CHALLENGE_GUIDE_SLUG : commonGuides[0].slug,
  );
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);

  const challengeGuides = challengeGuide
    ? [
        {
          slug: CHALLENGE_GUIDE_SLUG,
          title: intl.formatMessage({
            defaultMessage: 'Challenge guide',
            description: 'Project guides category title',
            id: 'VeRWF3',
          }),
          ...challengeGuide,
        },
      ]
    : [];
  const allGuides = [...challengeGuides, ...commonGuides];
  const projectGuide =
    allGuides.find((guide) => guide.slug === activeGuideSlug) ||
    commonGuides[0];

  // TODO(projects):  Remove hardcoded resources links
  const sidebarNavigation = [
    challengeGuide
      ? {
          items: [
            {
              slug: CHALLENGE_GUIDE_SLUG,
              title: intl.formatMessage({
                defaultMessage: 'Challenge guide',
                description: 'Project guides category title',
                id: 'VeRWF3',
              }),
              ...challengeGuide,
            },
          ],
          title: intl.formatMessage({
            defaultMessage: 'Guides',
            description: 'Project guides category title',
            id: '8Jk9Qv',
          }),
        }
      : null,
    {
      items: commonGuides,
      title: intl.formatMessage({
        defaultMessage: 'General guides',
        description: 'Project guides category title',
        id: 'q6xeLh',
      }),
    },
    {
      items: [
        {
          href: 'https://figma.com',
          title: 'How to use Figma for development',
        },
        {
          href: 'https://greatfrontend.com',
          title: 'How to use DevTools for development',
        },
      ],
      title: intl.formatMessage({
        defaultMessage: 'External resources',
        description: 'Project curated resources title',
        id: 'nep7MF',
      }),
    },
  ].flatMap((category) => (category != null ? [category] : []));

  const onGuideChange = (value: string) => {
    setActiveGuideSlug(value);
    guideRef?.current?.scrollIntoView({
      behavior: 'auto',
    });
    setIsLeftSidebarOpen(false);
  };

  return (
    <div ref={guideRef} className="flex flex-col gap-4 xl:flex-row xl:gap-12">
      <div
        className={clsx(
          'hidden xl:contents',
          'sticky top-[calc(var(--global-sticky-height)_+_200px)]',
        )}>
        <SidebarLinksList
          activeItem={activeGuideSlug}
          className={clsx(
            'sticky',
            // 100px for the sticky challenges steps bar.
            'h-[calc(100vh_-_100px_-_var(--global-sticky-height))]',
            'top-[calc(var(--global-sticky-height)_+_100px)]',
          )}
          navigation={sidebarNavigation}
          onSelect={onGuideChange}
        />
      </div>
      <div className="block xl:hidden">
        <SlideOut
          enterFrom="start"
          isShown={isLeftSidebarOpen}
          size="sm"
          title={intl.formatMessage({
            defaultMessage: 'Guidebook',
            description: 'Project guide menu header title',
            id: 'jSue8y',
          })}
          trigger={
            <Button
              addonPosition="start"
              icon={RiMenu2Line}
              label={intl.formatMessage({
                defaultMessage: 'Menu',
                description: 'Project guide navigation menu button label',
                id: 'AzJz7v',
              })}
              size="xs"
              variant="secondary"
              onClick={() => {
                setIsLeftSidebarOpen(true);
              }}
            />
          }
          onClose={() => setIsLeftSidebarOpen(false)}>
          <SidebarLinksList
            activeItem={activeGuideSlug}
            navigation={sidebarNavigation}
            onSelect={onGuideChange}
          />
        </SlideOut>
      </div>
      <div className={clsx('flex flex-col gap-6', 'w-full pt-4')}>
        {projectGuide != null &&
          'title' in projectGuide &&
          projectGuide?.title && (
            <Heading level="heading4">{projectGuide?.title}</Heading>
          )}
        {projectGuide != null && (
          <div className="pt-2">
            <ProjectsChallengeMdxContent mdxCode={projectGuide.body.code} />
          </div>
        )}
        <Divider />
        <ArticlePagination
          activeItem={activeGuideSlug}
          items={allGuides}
          onSelect={onGuideChange}
        />
      </div>
    </div>
  );
}
