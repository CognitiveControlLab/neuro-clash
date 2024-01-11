import { ReactNode } from 'react';
import LanguageProvider from '../providers/LanguageProvider';
import ThemeProvider from '../providers/ThemeProvider';
import EEGProvider from '../providers/MuseProvider';

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
        <EEGProvider>
          {children}
        </EEGProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
