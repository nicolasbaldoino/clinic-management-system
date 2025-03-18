'use client'

import { ApolloProvider } from '@apollo/client'

import { useApollo } from '@/hooks/useApollo'

export function Providers({ children }: { children: React.ReactNode }) {
  const client = useApollo()

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
} 