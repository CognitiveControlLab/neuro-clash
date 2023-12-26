import { useCallback, useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import LanguageContext from '../../context/languageContext';
import { LanguageButton } from './styles';

function LanguageToggle(): JSX.Element {
  const languageContext = useContext(LanguageContext);
  const { setLanguage, language } = languageContext;

  const handleLanguageChange = useCallback(() => {
    if (setLanguage && language) {
      const newLanguage = language === 'en' ? 'fr' : 'en';
      setLanguage(newLanguage);
    }
  }, [language, setLanguage]);

  return (
    <LanguageButton onClick={handleLanguageChange}>
      <FormattedMessage id={`language.short.${language}`} />
    </LanguageButton>
  );
}

export default LanguageToggle;
