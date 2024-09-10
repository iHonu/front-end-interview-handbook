import { useState } from 'react';
import { useIntl } from 'react-intl';

import useSessionStorageForSets from '~/hooks/useSessionStorageForSets';

import type {
  QuestionMetadata,
  QuestionTopic,
} from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionTopicLabels from '~/components/interviews/questions/listings/filters/useQuestionTopicLabels';

import type { QuestionFilter } from '../QuestionFilterType';

// The lower the earlier it appears.
const topicRanks: Record<QuestionTopic, number> = {
  a11y: 3,
  css: 1,
  html: 2,
  i18n: 40,
  javascript: 0,
  network: 60,
  performance: 50,
  security: 80,
  testing: 99,
};

type Props = Readonly<{
  namespace?: string;
}>;

export default function useQuestionTopicFilter({
  namespace,
}: Props): [
  Set<QuestionTopic>,
  QuestionFilter<QuestionTopic, QuestionMetadata>,
] {
  const intl = useIntl();
  const topicLabels = useQuestionTopicLabels();
  const [topicFiltersState, setTopicFiltersState] = useState<
    Set<QuestionTopic>
  >(new Set());
  const [topicFiltersSessionStorage, setTopicFiltersSessionStorage] =
    useSessionStorageForSets<QuestionTopic>(
      `gfe:${namespace}:topic-filter`,
      new Set(),
    );

  // Conditionally select which hook's state to use
  const topicFilters = namespace
    ? topicFiltersSessionStorage
    : topicFiltersState;
  const setTopicFilters = namespace
    ? setTopicFiltersSessionStorage
    : setTopicFiltersState;

  const topicFilterOptions: QuestionFilter<QuestionTopic, QuestionMetadata> = {
    id: 'topic',
    matches: (question) =>
      topicFilters.size === 0 ||
      question.topics.some((topic) => topicFilters.has(topic)),
    name: intl.formatMessage({
      defaultMessage: 'Topic',
      description: 'Question quiz topic',
      id: 'oieVuW',
    }),
    onChange: (value) => {
      const newTopics = new Set(topicFilters);

      newTopics.has(value) ? newTopics.delete(value) : newTopics.add(value);
      setTopicFilters(newTopics);
    },
    onClear: () => {
      setTopicFilters(new Set());
    },
    options: Object.keys(topicLabels)
      .sort(
        (a, b) =>
          topicRanks[a as QuestionTopic] - topicRanks[b as QuestionTopic],
      )
      .map((topic) => ({
        icon: topicLabels[topic as QuestionTopic].icon,
        label: topicLabels[topic as QuestionTopic].label,
        value: topic as QuestionTopic,
      })),
    setValues: setTopicFilters,
  };

  return [topicFilters, topicFilterOptions];
}
