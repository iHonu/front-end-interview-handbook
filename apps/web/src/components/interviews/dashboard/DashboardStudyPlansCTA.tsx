import clsx from 'clsx';
import { RiArrowRightSLine, RiCalendar2Line } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasizedHover,
  themeCardBackgroundColor,
  themeTextBrandGroupHoverColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import { themeChipBackgroundColor } from '../../ui/theme';

export default function DashboardStudyPlansCTA() {
  return (
    <div className="group flex w-full flex-col gap-4">
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="Study plans"
          description="Preparation study plans"
          id="dOsu3y"
        />
      </Heading>
      <div
        className={clsx(
          'group relative flex items-center justify-between px-4 py-3',
          'border border-neutral-200 dark:border-transparent',
          'rounded-lg',
          'transition-colors',
          themeCardBackgroundColor,
          themeBackgroundEmphasizedHover,
        )}>
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className={clsx(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-md',
              themeChipBackgroundColor,
            )}>
            <RiCalendar2Line
              className={clsx('h-5 w-5', themeTextSecondaryColor)}
            />
          </div>
          <Anchor href="/study-plans" variant="unstyled">
            <span aria-hidden={true} className="absolute inset-0" />
            <Text color="subtitle" display="block" size="body3">
              <FormattedMessage
                defaultMessage="We help you get ready within 1 week, 1 month or 3 months"
                description="Study plans description"
                id="O9szXK"
              />
            </Text>
          </Anchor>
        </div>
        <RiArrowRightSLine
          className={clsx(
            'h-6 w-6 shrink-0 text-neutral-500 dark:text-neutral-400',
            themeTextBrandGroupHoverColor,
          )}
        />
      </div>
    </div>
  );
}