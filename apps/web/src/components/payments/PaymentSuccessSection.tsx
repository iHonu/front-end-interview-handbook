'use client';

import clsx from 'clsx';
import { RiArrowRightSLine, RiStarSmileFill } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundChipColor,
  themeBorderColor,
  themeDivideColor,
  themeTextBrandColor_GroupHover,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  actions: ReadonlyArray<{
    description: string;
    featured?: boolean;
    href: string;
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    title: string;
  }>;
  title: string;
}>;

export default function PaymentSuccessSection({
  title,
  actions,
}: Props): JSX.Element {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4">
        <span
          className={clsx(
            'relative flex items-center justify-center',
            'size-14 rounded-full',
            'shiny',
            'bg-brand-dark dark:bg-brand/20',
          )}>
          <RiStarSmileFill
            aria-hidden={true}
            className={clsx('size-10 shrink-0', 'dark:text-brand text-white')}
          />
        </span>
        <Heading className="text-center" level="heading4">
          {title}
        </Heading>
      </div>
      <Section>
        <div className="mt-12">
          <Heading
            className={clsx('text-base', themeTextSecondaryColor)}
            color="custom"
            level="custom">
            {/* TODO: i18n */}
            Next steps
          </Heading>
          <Section>
            <ul
              className={clsx(
                'mt-4',
                ['border-b border-t', themeBorderColor],
                ['divide-y', themeDivideColor],
              )}
              role="list">
              {actions.map((action) => (
                <li
                  key={action.title}
                  className="group relative flex items-start gap-x-4 py-6">
                  <div className="shrink-0">
                    <span
                      className={clsx(
                        'size-10 inline-flex items-center justify-center rounded-md',
                        themeBackgroundChipColor,
                        [
                          themeTextSecondaryColor,
                          themeTextBrandColor_GroupHover,
                        ],
                        [
                          'border border-transparent',
                          'group-hover:border-brand-dark dark:group-hover:border-brand',
                        ],
                        'transition',
                      )}>
                      <action.icon aria-hidden={true} className="size-6" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <Heading
                      className="inline-flex gap-4 text-base font-medium"
                      level="custom">
                      <Anchor href={action.href} variant="blend">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {action.title}
                      </Anchor>
                      {action.featured && (
                        <Badge
                          label="Recommended!"
                          size="sm"
                          variant="success"
                        />
                      )}
                    </Heading>
                    <Section>
                      <Text color="secondary" display="block" size="body2">
                        {action.description}
                      </Text>
                    </Section>
                  </div>
                  <div className="shrink-0 self-center">
                    <RiArrowRightSLine
                      aria-hidden="true"
                      className={clsx(
                        'size-5 shrink-0',
                        themeTextSecondaryColor,
                        themeTextBrandColor_GroupHover,
                      )}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </Section>
    </div>
  );
}