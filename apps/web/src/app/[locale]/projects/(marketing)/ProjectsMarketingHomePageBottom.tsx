import { FormattedMessage, useIntl } from 'react-intl';

import MarketingContinuousUpdates from '~/components/interviews/marketing/MarketingContinuousUpdates';
import ProjectsMarketingContactUs from '~/components/projects/marketing/ProjectsMarketingContactUs';
import ProjectsPricingPromotions from '~/components/projects/purchase/ProjectsPricingPromotions';
import ProjectsPricingSectionLocalizedContainer from '~/components/projects/purchase/ProjectsPricingSectionLocalizedContainer';
import Text from '~/components/ui/Text';

import ProjectMarketingGeneralFAQSection from './ProjectMarketingGeneralFAQSection';

export default function ProjectsMarketingHomePageBottom() {
  const intl = useIntl();

  return (
    <>
      <ProjectsPricingSectionLocalizedContainer />
      <ProjectsPricingPromotions />
      <ProjectMarketingGeneralFAQSection />
      <MarketingContinuousUpdates
        title={intl.formatMessage({
          defaultMessage: "We're still growing our challenge base",
          description: 'Challenge base section title',
          id: 'rzOz2q',
        })}>
        <Text
          className="relative block max-w-5xl text-base md:text-xl"
          color="secondary">
          <FormattedMessage
            defaultMessage="Our focus now is on expanding our challenge base. New challenges are added to the platform on a weekly basis."
            description="Question base section subtitle - first paragraph"
            id="cIZicH"
          />
        </Text>
      </MarketingContinuousUpdates>
      <ProjectsMarketingContactUs />
    </>
  );
}
