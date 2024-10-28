import { authRouter } from './auth';
import { devRouter } from './dev';
import { feedbackRouter } from './feedback';
import { guideProgressRouter } from './guide-progress';
import { marketingRouter } from './marketing';
import { profileRouter } from './profile';
import { projectsRouter } from './projects';
import { purchasesRouter } from './purchases';
import { questionCommunitySolutionRouter } from './question-community-solution';
import { questionListsRouter } from './question-lists';
import { questionProgressRouter } from './question-progress';
import { questionSaveRouter } from './question-save';
import { questionSubmissionRouter } from './question-submission';
import { rewardsRouter } from './rewards';
import { roadmapRouter } from './roadmap';
import { router } from '../trpc';

export const appRouter = router({
  auth: authRouter,
  dev: devRouter,
  feedback: feedbackRouter,
  guideProgress: guideProgressRouter,
  marketing: marketingRouter,
  profile: profileRouter,
  projects: projectsRouter,
  purchases: purchasesRouter,
  questionCommunitySolution: questionCommunitySolutionRouter,
  questionLists: questionListsRouter,
  questionProgress: questionProgressRouter,
  questionSave: questionSaveRouter,
  questionSubmission: questionSubmissionRouter,
  rewards: rewardsRouter,
  roadmap: roadmapRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
