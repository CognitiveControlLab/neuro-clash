import { createContext } from 'react';

export enum ColorMode {
  Light,
  Dark,
}

export type ThemeContextProps = {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
};

export const DefaultThemeContext: ThemeContextProps = {
  colorMode: ColorMode.Light,
  setColorMode: () => null,
};

export const createThemeContext = (
  setThemeContext: React.Dispatch<React.SetStateAction<ThemeContextProps>>,
): ThemeContextProps => {
  const setColorMode = (colorMode: ColorMode) => {
    setThemeContext((prev: ThemeContextProps) => ({
      ...prev,
      colorMode,
    }));
  };
  return {
    ...DefaultThemeContext,
    setColorMode,
  };
};

const themeContext = createContext<ThemeContextProps>(
  DefaultThemeContext,
);

export default themeContext;
