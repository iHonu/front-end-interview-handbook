'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { APP_THEME_STORAGE_KEY } from './AppThemeScript';

export type AppTheme = 'dark' | 'light';
export type AppThemePreference = AppTheme | 'system';

type AppThemePreferencesContextType = {
  appTheme: AppTheme;
  appThemePreference: AppThemePreference;
  setAppThemePreference: (appThemePreference: AppThemePreference) => void;
};

const DEFAULT_APP_THEME_PREFERENCE: AppThemePreference = 'dark';
const DEFAULT_APP_THEME: AppTheme = 'dark';

const AppThemePreferencesContext =
  createContext<AppThemePreferencesContextType>({
    appTheme: DEFAULT_APP_THEME,
    appThemePreference: DEFAULT_APP_THEME_PREFERENCE,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setAppThemePreference: () => {},
  });

export function useAppThemePreferences() {
  return useContext(AppThemePreferencesContext);
}

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function AppThemePreferencesProvider({ children }: Props) {
  const [appThemePreference, setAppThemePreference] =
    useLocalStorage<AppThemePreference>(
      APP_THEME_STORAGE_KEY,
      DEFAULT_APP_THEME_PREFERENCE,
    );

  const [resolvedSystemAppTheme, setResolvedSystemAppTheme] =
    useState<AppTheme>(DEFAULT_APP_THEME);

  useEffect(() => {
    const prefersDarkColorSchemeQuery = window.matchMedia(
      '(prefers-color-scheme: dark)',
    );

    // Initialize the app theme based on the system color scheme.
    setResolvedSystemAppTheme(
      prefersDarkColorSchemeQuery.matches ? 'dark' : 'light',
    );

    const handleQueryChange = (event: MediaQueryListEvent) => {
      setResolvedSystemAppTheme(event.matches ? 'dark' : 'light');
    };

    // Listen for changes in the system color scheme.
    prefersDarkColorSchemeQuery.addEventListener('change', handleQueryChange);

    return () => {
      prefersDarkColorSchemeQuery.removeEventListener(
        'change',
        handleQueryChange,
      );
    };
  }, []);

  const appTheme = useMemo(() => {
    if (appThemePreference === 'system') {
      return resolvedSystemAppTheme;
    }

    return appThemePreference;
  }, [appThemePreference, resolvedSystemAppTheme]);

  useEffect(() => {
    if (appTheme === 'dark') {
      document.documentElement.dataset.mode = 'dark';
    } else {
      document.documentElement.removeAttribute('data-mode');
    }
  }, [appTheme]);

  return (
    <AppThemePreferencesContext.Provider
      value={{
        appTheme,
        appThemePreference,
        setAppThemePreference,
      }}>
      {children}
    </AppThemePreferencesContext.Provider>
  );
}
