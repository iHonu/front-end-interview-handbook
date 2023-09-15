'use client';

import { useEffect } from 'react';

import useMonacoTheme from '~/hooks/useMonacoTheme';

import { useCodingPreferences } from '~/components/global/CodingPreferencesProvider';
import EmptyState from '~/components/ui/EmptyState';

import MonacoEditor, { useMonaco } from '@monaco-editor/react';

type Props = Readonly<{
  filePath: string;
  onChange: (value: string) => void;
  value: string | null;
}>;

const languageMapping: Record<string, string> = {
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
};

function getLanguageFromFilePath(filePath: string): string {
  const parts = filePath.split('.');
  const ext = parts[parts.length - 1];

  return ext in languageMapping ? languageMapping[ext] : ext;
}

// A controlled component because we need to allow resetting to
// the initial code.
export default function CodeEditor({ value, filePath, onChange }: Props) {
  const monaco = useMonaco();
  const { themeKey } = useCodingPreferences();
  const monacoTheme = useMonacoTheme(themeKey);

  useEffect(() => {
    if (monaco && monacoTheme) {
      monaco.editor.defineTheme(themeKey, monacoTheme);
      monaco.editor.setTheme(themeKey);
    }
  }, [monaco, monacoTheme, themeKey]);

  const language = getLanguageFromFilePath(filePath);

  return (
    <MonacoEditor
      defaultLanguage={language}
      loading={
        <EmptyState
          iconClassName="animate-bounce"
          title="Loading editor"
          variant="editor_loading"
        />
      }
      options={{
        minimap: {
          // TODO: Make it customizable.
          enabled: false,
        },
      }}
      theme={themeKey}
      value={value ?? ''}
      onChange={(val) => onChange(val ?? '')}
    />
  );
}
