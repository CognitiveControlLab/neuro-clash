import { ReactNode } from 'react';
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
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
