import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    // Availability changes as others book: keep it fresh but don't hammer the API on every focus.
    queries: { staleTime: 30_000, retry: 1 },
  },
});
