import { BiLogoTypescript } from 'react-icons/bi';
import { CgBrowser } from 'react-icons/cg';
import { IoLogoJavascript } from 'react-icons/io';
import {
  RiAngularjsFill,
  RiArchiveLine,
  RiBracesFill,
  RiCheckboxLine,
  RiCodeLine,
  RiFileList2Line,
  RiFlaskLine,
  RiFolder3Line,
  RiHashtag,
  RiHtml5Fill,
  RiLightbulbLine,
  RiListCheck3,
  RiNpmjsFill,
  RiPlayLine,
  RiTerminalBoxLine,
  RiTimeLine,
} from 'react-icons/ri';

export type CodingWorkspaceTabIconType =
  | 'angular'
  | 'browser'
  | 'code'
  | 'console'
  | 'css'
  | 'description'
  | 'explorer'
  | 'html'
  | 'js'
  | 'json'
  | 'npm'
  | 'run'
  | 'solution'
  | 'submissions'
  | 'submit'
  | 'test_cases_all'
  | 'test_cases'
  | 'ts'
  | 'versions';

export type CodingWorkspaceTabIcon = Readonly<{
  className?: string;
  icon: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
}>;

export const CodingWorkspaceTabIcons: Record<
  CodingWorkspaceTabIconType,
  CodingWorkspaceTabIcon
> = {
  angular: {
    icon: RiAngularjsFill,
  },
  browser: {
    icon: CgBrowser,
  },
  code: {
    icon: RiCodeLine,
  },
  console: {
    icon: RiTerminalBoxLine,
  },
  css: {
    icon: RiHashtag,
  },
  description: {
    icon: RiFileList2Line,
  },
  explorer: {
    icon: RiFolder3Line,
  },
  html: {
    icon: RiHtml5Fill,
  },
  js: {
    icon: IoLogoJavascript,
  },
  json: {
    icon: RiBracesFill,
  },
  npm: {
    icon: RiNpmjsFill,
  },
  run: {
    icon: RiPlayLine,
  },
  solution: {
    icon: RiLightbulbLine,
  },
  submissions: {
    icon: RiArchiveLine,
  },
  submit: {
    icon: RiCheckboxLine,
  },
  test_cases: {
    icon: RiFlaskLine,
  },
  versions: {
    icon: RiTimeLine,
  },
  test_cases_all: {
    icon: RiListCheck3,
  },
  ts: {
    icon: BiLogoTypescript,
  },
};
