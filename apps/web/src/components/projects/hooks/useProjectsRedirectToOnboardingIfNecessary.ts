import { useEffect } from 'react';

import { trpc } from '~/hooks/trpc';

import { useI18nPathname, useI18nRouter } from '~/next-i18nostic/src';

const EXCLUSIONS = ['/projects/onboarding'];

export default function useProjectsRedirectToOnboardingIfNecessary() {
  const router = useI18nRouter();
  const { pathname } = useI18nPathname();

  const { data: userProfile } = trpc.projects.profile.viewer.useQuery();

  useEffect(() => {
    if (
      userProfile != null &&
      // Redirect to onboarding page if projectsProfile has not been set up.
      userProfile?.projectsProfile == null &&
      !EXCLUSIONS.includes(pathname ?? '')
    ) {
      router.push({
        pathname: '/projects/onboarding',
        query: {
          next: pathname,
        },
      });
    }
  }, [router, userProfile, pathname]);
}
