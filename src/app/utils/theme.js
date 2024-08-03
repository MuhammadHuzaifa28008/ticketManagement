import { createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      main: '#1c1e27',
    },
    secondary: {
      main: '#373a49',
    },
    text: {
      primary: '#6c6e7f',
      secondary: '#a5a7b6',
    },
    background: {
      default: '#e1e3ea',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1c1e27',
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
          marginBottom: '10px'
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#373a49',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#e1e3ea',
          borderRadius: '8px',
        },
        header: {
          titleTypographyProps: {
            variant: 'h6',
            fontWeight: 'bold',
            color: '#6c6e7f',
          },
        },
        content: {
          root: {
            padding: '16px',
          },
        },
        actions: {
          root: {
            padding: '8px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-contained': {
            backgroundColor: '#1c1e27',
            color: '#e1e3ea',
            '&:hover': {
              backgroundColor: '#373a49',
            },
          },
          '&.MuiButton-outlined': {
            border: '1px solid #1c1e27',
            color: '#1c1e27',
            '&:hover': {
              border: '1px solid #373a49',
            },
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#6c6e7f',
        },
        h1: { fontWeight: 'bold' },
        h2: { fontWeight: 'bold' },
        h3: { fontWeight: 'bold' },
        h4: { fontWeight: 'bold' },
        h5: { fontWeight: 'bold' },
        h6: { fontWeight: 'bold' },
      },
    },
  },
});

export default theme;