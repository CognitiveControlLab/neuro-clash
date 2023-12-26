import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { useCallback } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer as MUIDrawer } from '@mui/material';
import {
  Icon,
  BrandIconContainer,
  DrawerHeader,
  DrawerFooter,
} from './styles';
import LanguageToggle from '../LanguageSelector/LanguageSelector';
import DarkThemeToggle from '../DarkThemeToggle';
import { IconButton } from '../../styles/shared';

interface DrawerProps {
  open: boolean;
  onOpenChange: (openState: boolean) => void;
}

function Drawer(props: DrawerProps): JSX.Element {
  const {
    open,
    onOpenChange,
  } = props;

  const navigate = useNavigate();

  const toggleDrawer = useCallback((newOpen: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown'
        && ((event as React.KeyboardEvent).key === 'Tab'
          || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    onOpenChange(newOpen);
  }, [onOpenChange]);

  const drawerNavigate = useCallback((destination: string) => {
    onOpenChange(false);
    navigate(destination);
  }, [toggleDrawer, navigate]);

  return (
    <MUIDrawer
      anchor="left"
      open={open}
      onClose={toggleDrawer(false)}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
      >
        <DrawerHeader>
          <IconButton onClick={() => onOpenChange(false)}>
            <MenuIcon />
          </IconButton>
          <BrandIconContainer
            role="button"
            onClick={() => drawerNavigate('/')}
            onKeyPress={() => {}}
            tabIndex={0}
          >
            <Icon src="/onbrand.png" />
          </BrandIconContainer>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => drawerNavigate('/')}>
              <ListItemIcon>
                <ColorLensIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary={<FormattedMessage id="navigation.game" />} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <DrawerFooter>
          <DarkThemeToggle />
          <LanguageToggle />
        </DrawerFooter>
      </Box>
    </MUIDrawer>
  );
}

export default Drawer;
