import { capitalize } from 'lodash-es';

import Heading from './Heading';
import UIExamplesGroup from '../misc/UIExamplesGroup';

const levels = [
  'heading1',
  'heading2',
  'heading3',
  'heading4',
  'heading5',
  'heading6',
  'custom',
] as const;

export default function HeadingExamples() {
  return (
    <UIExamplesGroup darkMode="horizontal" title="Heading">
      {levels.map((level) => (
        <Heading key={level} level={level}>
          {capitalize(level)}
        </Heading>
      ))}
    </UIExamplesGroup>
  );
}