'use client';

import { useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import ProjectsMarketingFeatures from '~/components/projects/marketing/ProjectsMarketingFeatures';
import ProjectsMarketingHero from '~/components/projects/marketing/ProjectsMarketingHero';
import ProjectsMarketingHomepageFeaturesRow from '~/components/projects/marketing/ProjectsMarketingHomepageFeaturesRow';
import ProjectsMarketingSkillsTracksProjects from '~/components/projects/marketing/ProjectsMarketingSkillsTracksProjects';
import type { ProjectsTrack } from '~/components/projects/tracks/ProjectsTracksData';
import Section from '~/components/ui/Heading/HeadingContext';

const MarketingHomePageBottom = dynamic(
  () => import('../../(standard)/(marketing)/MarketingHomePageBottom'),
  { ssr: false },
);

type Props = Readonly<{
  featuredChallenges: ReadonlyArray<ProjectsChallengeItem>;
  projectTracks: ReadonlyArray<ProjectsTrack>;
}>;

export default function ProjectsMarketingHomePage({
  featuredChallenges,
  projectTracks,
}: Props) {
  const loadBottomHalfMarkerRef = useRef(null);
  const showBottomHalf = useInView(loadBottomHalfMarkerRef, {
    amount: 'some',
    once: true,
  });

  return (
    <main className="bg-[#070708] pb-24" data-mode="dark">
      <ProjectsMarketingHero />
      <Section>
        <ProjectsMarketingHomepageFeaturesRow />
        <ProjectsMarketingSkillsTracksProjects
          featuredChallenges={featuredChallenges}
          hiddenTracks={projectTracks}
          projectTracks={projectTracks}
        />
        <ProjectsMarketingFeatures />
        <div ref={loadBottomHalfMarkerRef} />
        {showBottomHalf && <MarketingHomePageBottom />}
      </Section>
    </main>
  );
}
