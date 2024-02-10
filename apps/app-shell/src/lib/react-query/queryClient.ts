import { QueryClient } from 'react-query';

// Create a new instance of QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disable automatic retries on query failures
      refetchOnWindowFocus: false // Disable automatic refetching on window focus
    }
  }
});

export { queryClient };
