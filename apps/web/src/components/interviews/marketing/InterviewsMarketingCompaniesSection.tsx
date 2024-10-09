import clsx from 'clsx';
import type { InterviewsCompanyGuide } from 'contentlayer/generated';
import { RiArrowRightLine } from 'react-icons/ri';

import { InterviewsCompanyGuideCard } from '~/components/interviews/company/InterviewsCompanyGuideCard';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeGradientHeading,
} from '~/components/ui/theme';

type Props = Readonly<{
  companyGuides: ReadonlyArray<InterviewsCompanyGuide>;
}>;

export default function InterviewsMarketingCompaniesSection({
  companyGuides,
}: Props) {
  const intl = useIntl();

  return (
    <Container className={clsx('py-20')}>
      <Heading
        className={clsx(themeGradientHeading, 'max-w-lg pb-1')}
        level="heading2"
        weight="medium">
        <FormattedMessage
          defaultMessage="Leverage insider tips from leading companies"
          description="Title for marketing page section"
          id="7UW/T/"
        />
      </Heading>
      <Section>
        <Text
          className="mt-6 block max-w-xl text-base lg:text-lg"
          color="secondary"
          size="inherit"
          weight="medium">
          <FormattedMessage
            defaultMessage="Practicing company-specific questions is the quickest way to ace specific interviews. We regularly survey and update lists for known questions tested in top companies around the world."
            description="Marketing page section subtitle"
            id="z9lq1x"
          />
        </Text>

        <div className={clsx('mt-16', 'flex flex-col items-center gap-8')}>
          <div
            className={clsx(
              'grid w-full gap-x-5 gap-y-4 md:grid-cols-2 lg:grid-cols-3',
            )}>
            {companyGuides.slice(0, 9).map((companyGuide) => {
              return (
                <InterviewsCompanyGuideCard
                  key={companyGuide.slug}
                  bgClassName={themeBackgroundCardColor}
                  companyGuide={companyGuide}
                  completionCount={0}
                  isStarted={false}
                  showProgressBar={false}
                />
              );
            })}
          </div>

          <Button
            href="/interviews/company"
            icon={RiArrowRightLine}
            label={intl.formatMessage({
              defaultMessage: 'View full list',
              description: 'Label for view companies button in homepage',
              id: 'WEDD1f',
            })}
            prefetch={null}
            size="md"
            variant="secondary"
          />
        </div>
      </Section>
    </Container>
  );
}