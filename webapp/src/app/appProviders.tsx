import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from '../lib/apolloClient/apolloClient';
import LanguageProvider from '../providers/LanguageProvider';
import ThemeProvider from '../providers/ThemeProvider';

interface AppProvidersProps {
  children: ReactNode;
}

function AppProviders(props: AppProvidersProps) {
  const {
    children,
  } = props;

  return (
    <ThemeProvider>
      <LanguageProvider>
        <ApolloProvider client={apolloClient}>
          { children }
        </ApolloProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
