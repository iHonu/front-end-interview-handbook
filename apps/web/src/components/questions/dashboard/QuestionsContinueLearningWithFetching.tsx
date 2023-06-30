import {
  getQuestionListThemes,
  useQuestionLists,
} from '~/data/question-lists/QuestionListsHooks';

import QuestionsContinueLearning from '~/components/questions/dashboard/QuestionsContinueLearning';

import { countNumberOfQuestionsInList } from '~/db/QuestionsUtils';

type Props = Readonly<{
  items: ReadonlyArray<{
    completedCount: number;
    listKey: string;
  }>;
}>;

export default function QuestionsContinueLearningContainer({ items }: Props) {
  const questionLists = useQuestionLists();
  const themes = getQuestionListThemes();

  return (
    <QuestionsContinueLearning
      items={items.map(({ listKey, completedCount }) => ({
        completedCount,
        gradient: themes[listKey].gradient,
        href: questionLists[listKey]?.href,
        questionsCount: countNumberOfQuestionsInList(
          questionLists[listKey].questions,
        ),
        title: questionLists[listKey].longName,
      }))}
    />
  );
}
