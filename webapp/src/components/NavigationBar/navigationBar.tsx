import { FormattedMessage } from 'react-intl';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import {
  NavigationButton,
  Icon,
  Container,
  IconSection,
  // LoginButton,
  // SignupButton,
  // LoginSection,
  NavigationSection,
  ToolsSection,
  BrandIconContainer,
} from './styles';
import LanguageToggle from '../LanguageSelector/LanguageSelector';
import DarkThemeToggle from '../DarkThemeToggle';
import { IconButton } from '../../styles/shared';
import Drawer from './drawer';

interface NavigationBarProps {
  drawerOpen: boolean;
  onDrawerOpenChange: (openState: boolean) => void;
}

function NavigationBar(props: NavigationBarProps): JSX.Element {
  const {
    drawerOpen,
    onDrawerOpenChange,
  } = props;

  const navigate = useNavigate();

  return (
    <Container>
      <IconSection>
        <IconButton onClick={() => onDrawerOpenChange(true)}>
          <MenuIcon />
        </IconButton>
        <BrandIconContainer
          role="button"
          onClick={() => navigate('/')}
          onKeyPress={() => {}}
          tabIndex={0}
        >
          <Icon src="/onbrand.png" />
        </BrandIconContainer>
      </IconSection>
      <NavigationSection>
        <NavigationButton onClick={() => navigate('/')}>
          <FormattedMessage id="navigation.game" />
        </NavigationButton>
      </NavigationSection>
      <ToolsSection>
        <DarkThemeToggle />
        <LanguageToggle />
      </ToolsSection>
      {/* Navigation part for the login.
        <LoginSection>
          <LoginButton onClick={() => navigate('/sing_up')}>
            <FormattedMessage id="navigation.sing_up" />
          </LoginButton>
          <SignupButton onClick={() => navigate('/login')}>
            <FormattedMessage id="navigation.login" />
          </SignupButton>
        </LoginSection>
      */}
      <Drawer open={drawerOpen} onOpenChange={onDrawerOpenChange} />
    </Container>
  );
}

export default NavigationBar;
