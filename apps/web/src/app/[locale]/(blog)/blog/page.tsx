import type { Metadata } from 'next';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import BlogHomePage from './BlogHomePage';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Learn new skills, improve your techniques and stay updated on latest front end trends and developments.',
      description: 'Description of GreatFrontEnd blog homepage',
      id: 'saFHOR',
    }),
    locale,
    pathname: '/blog',
    title: intl.formatMessage({
      defaultMessage: 'GreatFrontEnd Blog',
      description: 'Title of GreatFrontEnd blog homepage',
      id: '3n4NQB',
    }),
  });
}

export default function Page() {
  return <BlogHomePage />;
}
