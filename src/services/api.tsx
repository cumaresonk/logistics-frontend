// src/services/api.ts
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Create Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql', // Replace with your GraphQL API endpoint
  cache: new InMemoryCache(),
});

// ApolloProvider component for wrapping the App in App.tsx
interface ApolloWrapperProps {
  children: React.ReactNode;
}

export const ApolloWrapper: React.FC<ApolloWrapperProps> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
