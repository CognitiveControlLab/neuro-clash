import { ReactNode } from 'react';
import LanguageProvider from '../providers/LanguageProvider';
import ThemeProvider from '../providers/ThemeProvider';
import EEGProvider from '../providers/EEGProvider';
import GameClientProvider from '../providers/GameClientProvider';

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
        <GameClientProvider>
          <EEGProvider>
            {children}
          </EEGProvider>
        </GameClientProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
