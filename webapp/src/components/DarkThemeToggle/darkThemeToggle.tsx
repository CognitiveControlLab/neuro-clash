import { useContext, useMemo } from 'react';
import ThemeContext, { ColorMode } from '../../context/themeContext';
import { ToggleLight } from './styles';

function DarkThemeToggle(): JSX.Element {
  const { colorMode, setColorMode } = useContext(ThemeContext);

  const value = useMemo(() => (colorMode === ColorMode.Dark), [colorMode]);

  return (
    <ToggleLight
      checked={value}
      onChange={(event : React.ChangeEvent<HTMLInputElement>) => {
        setColorMode(event.target.checked ? ColorMode.Dark : ColorMode.Light);
      }}
    />
  );
}

export default DarkThemeToggle;
