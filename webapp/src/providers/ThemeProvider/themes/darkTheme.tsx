import { ThemeOptions } from '@mui/material/styles';

const darkTheme : ThemeOptions = {
  palette: {
    primary: {
      main: '#FF8A82',
    },
    background: {
      default: '#121212',
      paper: '#9e9e9e',
    },
    secondary: {
      main: '#FFFFFF',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#FFFFFF',
      disabled: '#FFFFFF',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#121212',
          color: '#FFFFFF',
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
          background: '#212121',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedSecondary: {
          background: '#212121',
        },
      },
    },
  },
};

export default darkTheme;
