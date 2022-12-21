import { useState } from 'react';
import type { AppProps } from 'next/app';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState<QueryClient>(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
