import type { Metadata } from 'next';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    pathname: '/projects/settings/billing',
    title: intl.formatMessage({
      defaultMessage: 'Billing | Settings | Projects',
      description: 'Title of billing page',
      id: 'jI3O/d',
    }),
  });
}

export default async function Page() {
  return <div>Billing</div>;
}
