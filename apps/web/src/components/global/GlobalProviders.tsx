'use client';

import { I18nProvider } from 'next-i18nostic';
import nextI18nosticConfig from 'next-i18nostic/config';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';

import MDXComponents from '~/components/mdx/MDXComponents';

import type { IntlMessages } from '~/i18n';
import type { Database } from '~/supabase/database.types';

import AppContextProvider from './AppContextProvider';
import ScrollManagementProvider from './ScrollManagementProvider';
import ToastsProvider from './toasts/ToastsProvider';
import UserPreferencesProvider from './UserPreferencesProvider';
import UserProfileProvider from './UserProfileProvider';

import { MDXProvider } from '@mdx-js/react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = Readonly<{
  children: React.ReactNode;
  intlMessages: IntlMessages;
  locale: string;
}>;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function GlobalProviders({
  children,
  intlMessages,
  locale,
}: Props) {
  // eslint-disable-next-line react/hook-use-state
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>(),
  );

  return (
    <I18nProvider locale={locale}>
      <IntlProvider
        defaultLocale={nextI18nosticConfig.defaultLocale}
        locale={locale}
        messages={intlMessages}>
        <SessionContextProvider supabaseClient={supabaseClient}>
          <AppContextProvider>
            <ScrollManagementProvider>
              <UserProfileProvider>
                <QueryClientProvider client={queryClient}>
                  <UserPreferencesProvider>
                    <ToastsProvider>
                      <MDXProvider components={MDXComponents}>
                        {children}
                      </MDXProvider>
                    </ToastsProvider>
                  </UserPreferencesProvider>
                </QueryClientProvider>
              </UserProfileProvider>
            </ScrollManagementProvider>
          </AppContextProvider>
        </SessionContextProvider>
      </IntlProvider>
    </I18nProvider>
  );
}
