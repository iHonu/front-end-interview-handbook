'use client';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import MarketingContactUs from '~/components/marketing/contact/MarketingContactUs';
import type { EmbedUIQuestion } from '~/components/marketing/embed/MarketingEmbedUIQuestion';
import MarketingCompaniesMarquee from '~/components/marketing/MarketingCompaniesMarquee';
import MarketingContinuousUpdates from '~/components/marketing/MarketingContinuousUpdates';
import MarketingEmbedSection from '~/components/marketing/MarketingEmbedSection';
import MarketingFAQ from '~/components/marketing/MarketingFAQ';
import MarketingFeaturedQuestions from '~/components/marketing/MarketingFeaturedQuestions';
import MarketingFeaturesBlocks from '~/components/marketing/MarketingFeaturesBlocks';
import MarketingFeaturesRow from '~/components/marketing/MarketingFeaturesRow';
import MarketingHero from '~/components/marketing/MarketingHero';
import MarketingPricingSectionLocalizedContainer from '~/components/marketing/MarketingPricingSectionLocalizedContainer';
import MarketingTestimonialsSection from '~/components/marketing/testimonials/MarketingTestimonialsSection';
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
    <main className="dark bg-neutral-950 pb-12 dark:bg-transparent md:pb-24">
      <MarketingHero />
      <Section>
        <MarketingFeaturesRow />
        <MarketingCompaniesMarquee />
        <MarketingEmbedSection
          featuredQuestions={[
            ...javaScriptQuestions,
            ...userInterfaceQuestions,
          ]}
          javaScriptEmbedExample={javaScriptEmbedExample}
          uiEmbedExample={uiCodingQuestion}
        />
        <MarketingFeaturesBlocks
          solutions={{
            todoListReact: uiCodingQuestion.react.solution,
            todoListVanilla: uiCodingQuestion.vanilla.solution,
          }}
        />
        <MarketingFeaturedQuestions
          javaScriptQuestions={javaScriptQuestions}
          quizQuestions={quizQuestions}
          systemDesignQuestions={systemDesignQuestions}
          userInterfaceQuestions={userInterfaceQuestions}
        />
        {!(userProfile?.isPremium && userProfile?.plan === 'lifetime') && (
          <MarketingPricingSectionLocalizedContainer />
        )}
        <MarketingTestimonialsSection />
        <MarketingContinuousUpdates />
        <MarketingFAQ />
        <MarketingContactUs />
      </Section>
    </main>
  );
}
