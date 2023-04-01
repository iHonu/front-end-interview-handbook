import { marketingRouter } from './marketing';
import { router } from '../trpc';

export const appRouter = router({
  marketing: marketingRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
