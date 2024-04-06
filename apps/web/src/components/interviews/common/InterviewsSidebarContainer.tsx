'use client';

import clsx from 'clsx';
import { useToggle } from 'usehooks-ts';

import { viewportHeightMinusBanner } from '~/components/common/ViewportHeights';
import InterviewsSidebar from '~/components/interviews/common/InterviewsSidebar';
import { themeBorderColor } from '~/components/ui/theme';

type Props = Readonly<{
  initialCollapsed?: boolean;
}>;

export default function InterviewsSidebarContainer({
  initialCollapsed = false,
}: Props) {
  const [isCollapsed, toggleIsCollapsed] = useToggle(initialCollapsed);

  return (
    <aside
      className={clsx(
        'hidden lg:block',
        'sticky',
        'shrink-0 overflow-y-hidden',
        ['border-e', themeBorderColor],
        isCollapsed ? 'w-[68px]' : 'w-60',
      )}
      style={{
        height: viewportHeightMinusBanner,
        top: `var(--banner-height)`,
      }}>
      <InterviewsSidebar
        isCollapsed={isCollapsed}
        onCollapseClick={toggleIsCollapsed}
      />
    </aside>
  );
}