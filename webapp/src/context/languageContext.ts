import { createContext } from 'react';
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from '../i18n/i18n';

export type LanguageContextProps = {
  language: string;
  setLanguage: (language: string) => void;
  availableLanguages: string[];
};

export const DefaultLanguageContext: LanguageContextProps = {
  language: DEFAULT_LANGUAGE,
  setLanguage: () => null,
  availableLanguages: AVAILABLE_LANGUAGES,
};

export const createLanguageContext = (
  setLanguageContext: React.Dispatch<React.SetStateAction<LanguageContextProps>>,
): LanguageContextProps => {
  const language = localStorage.getItem('language') || DEFAULT_LANGUAGE;
  const setLanguage = (lang: string) => {
    localStorage.setItem('language', lang);
    setLanguageContext((prev: LanguageContextProps) => ({
      ...prev,
      language: lang,
    }));
  };
  return {
    ...DefaultLanguageContext,
    setLanguage,
    language,
  };
};

const languageContext = createContext<LanguageContextProps>(
  DefaultLanguageContext,
);

export default languageContext;
