'use client';

import { useEffect } from 'react';

import { ProductThemeScript } from '~/components/global/product-theme/ProductThemeScript';
import { useProductMenuUnseenIndicator } from '~/components/global/product-theme/useProductMenuUnseenIndicator';

import ProjectsRedirectToOnboardingIfNecessary from './ProjectsRedirectToOnboardingIfNecessary';
import useProjectsLevelUpToaster from './useProjectsLevelUpToaster';

type Props = Readonly<{
  children: React.ReactElement;
}>;

export default function ProjectsRootLayout({ children }: Props) {
  useProjectsLevelUpToaster();

  const [, setProductMenuUnseenIndicator] = useProductMenuUnseenIndicator();

  useEffect(() => {
    setProductMenuUnseenIndicator(false);
  }, [setProductMenuUnseenIndicator]);

  return (
    <>
      <ProductThemeScript theme="projects" />
      {children}
      <ProjectsRedirectToOnboardingIfNecessary />
    </>
  );
}
