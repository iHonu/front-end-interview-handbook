import type { Metadata } from 'next/types';

import AuthPage from '~/components/auth/AuthPage';

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
    description: intl.formatMessage({
      defaultMessage: 'Login to track your progress and access premium',
      description: 'Description of Login page',
      id: 'S21xBI',
    }),
    locale,
    pathname: '/login',
    title: intl.formatMessage({
      defaultMessage: 'Sign In',
      description: 'Title of Login page',
      id: 'RIhdqg',
    }),
  });
}

export default function LoginPage() {
  return (
    <div className="bg-gray-50">
      <AuthPage view="sign_in" />
    </div>
  );
}
