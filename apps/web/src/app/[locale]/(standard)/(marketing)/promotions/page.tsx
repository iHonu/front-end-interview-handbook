import type { Metadata } from 'next/types';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import PromotionsPage from './PromotionsPage';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Check out the latest promotions and discounts that GreatFrontEnd offers.',
      description: 'Description of Promotions page',
      id: 'lyxOq4',
    }),
    locale,
    pathname: '/promotions',
    title: intl.formatMessage({
      defaultMessage: 'Promotions',
      description: 'Title of Promotions page',
      id: 'ZRUNG5',
    }),
  });
}

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export default async function Page() {
  return <PromotionsPage />;
}
