import { ThemeOptions } from '@mui/material/styles';

const lightTheme : ThemeOptions = {
  palette: {
    primary: {
      main: '#FF8A82',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
      disabled: '#000000',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          color: '#000000',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        colorSecondary: {
          color: '#616161',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedSecondary: {
          background: '#FFFFFF',
        },
      },
    },
  },
};

export default lightTheme;
