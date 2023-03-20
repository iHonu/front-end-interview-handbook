'use client';

import PromoBanner from '~/components/global/PromoBanner';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import MarketingContactUs from '~/components/marketing/contact/MarketingContactUs';
import type { EmbedUIQuestion } from '~/components/marketing/embed/MarketingEmbedUIQuestion';
import MarketingBecause from '~/components/marketing/MarketingBecause';
import MarketingContinuousUpdates from '~/components/marketing/MarketingContinuousUpdates';
import MarketingFAQ from '~/components/marketing/MarketingFAQ';
import MarketingFeatureQuestions from '~/components/marketing/MarketingFeatureQuestions';
import MarketingFeatureSolutions from '~/components/marketing/MarketingFeatureSolutions';
import MarketingHero from '~/components/marketing/MarketingHero';
import MarketingKeyFeatures from '~/components/marketing/MarketingKeyFeatures';
import MarketingPricingSectionLocalizedContainer from '~/components/marketing/MarketingPricingSectionLocalizedContainer';
import MarketingTestimonial from '~/components/marketing/MarketingTestimonial';
import MarketingWhatIf from '~/components/marketing/MarketingWhatIf';
import type {
  QuestionJavaScript,
  QuestionMetadata,
  QuestionQuizMetadata,
} from '~/components/questions/common/QuestionsTypes';
import Section from '~/components/ui/Heading/HeadingContext';

type Props = Readonly<{
  javaScriptEmbedExample: QuestionJavaScript;
  javaScriptQuestions: ReadonlyArray<QuestionMetadata>;
  quizQuestions: ReadonlyArray<QuestionQuizMetadata>;
  systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
  uiCodingQuestion: EmbedUIQuestion;
  userInterfaceQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function MarketingHomePage({
  uiCodingQuestion,
  javaScriptEmbedExample,
  javaScriptQuestions,
  userInterfaceQuestions,
  systemDesignQuestions,
  quizQuestions,
}: Props) {
  const { userProfile } = useUserProfile();

  return (
    <main>
      <PromoBanner />
      <MarketingHero
        javaScriptEmbedExample={javaScriptEmbedExample}
        uiEmbedExample={uiCodingQuestion}
      />
      <Section>
        <MarketingBecause />
        <MarketingWhatIf />
        <MarketingKeyFeatures />
        <MarketingFeatureQuestions
          javaScriptQuestions={javaScriptQuestions}
          quizQuestions={quizQuestions}
          systemDesignQuestions={systemDesignQuestions}
          userInterfaceQuestions={userInterfaceQuestions}
        />
        <MarketingFeatureSolutions
          solutions={{
            todoListReact: uiCodingQuestion.react.solution,
            todoListVanilla: uiCodingQuestion.vanilla.solution,
          }}
        />
        {!(userProfile?.isPremium && userProfile?.plan === 'lifetime') && (
          <MarketingPricingSectionLocalizedContainer />
        )}
        <MarketingTestimonial />
        <MarketingContinuousUpdates />
        <MarketingFAQ />
        <MarketingContactUs />
      </Section>
    </main>
  );
}
