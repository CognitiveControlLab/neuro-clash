import {
  ReactNode, useEffect, useMemo, useState,
} from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import ThemeContext, {
  ColorMode,
  createThemeContext,
  ThemeContextProps,
  DefaultThemeContext,
} from '../../context/themeContext';
import lightTheme from './themes/lightTheme';
import darkTheme from './themes/darkTheme';

type ThemeProviderProps = {
  children: ReactNode;
};

function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  const [themeState, setThemeState] = useState<ThemeContextProps>(DefaultThemeContext);

  useEffect(() => {
    const newLanguageContext = createThemeContext(setThemeState);
    setThemeState(newLanguageContext);
  }, []);

  const getTheme = (colorMode: ColorMode) => (
    colorMode === ColorMode.Dark ? darkTheme : lightTheme
  );

  const theme = useMemo(() => createTheme(getTheme(themeState.colorMode)), [themeState]);

  return (
    <ThemeContext.Provider value={themeState}>
      <MUIThemeProvider theme={theme}>
        { children }
      </MUIThemeProvider>
    </ThemeContext.Provider>

  );
}

export default ThemeProvider;
