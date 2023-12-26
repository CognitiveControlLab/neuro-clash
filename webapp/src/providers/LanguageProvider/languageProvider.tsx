import { ReactNode, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import flattenMessages from '../../utils/intl-utils';
import LanguageContext, {
  DefaultLanguageContext,
  createLanguageContext,
  LanguageContextProps,
} from '../../context/languageContext';
import i18n from '../../i18n/i18n';

type LanguageProviderProps = {
  children: ReactNode;
};

function LanguageProviderLogic({
  children,
}: LanguageProviderProps): JSX.Element {
  const [languageContext, setLanguageContext] = useState<LanguageContextProps>(
    DefaultLanguageContext,
  );

  useEffect(() => {
    const newLanguageContext = createLanguageContext(setLanguageContext);
    setLanguageContext(newLanguageContext);
  }, []);

  const locale = languageContext.language;
  const messages : Record<string, any> = i18n.get(languageContext.language) || new Map();

  return (
    <LanguageContext.Provider value={languageContext}>
      <IntlProvider locale={locale} messages={flattenMessages(messages)}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
}

export default LanguageProviderLogic;
