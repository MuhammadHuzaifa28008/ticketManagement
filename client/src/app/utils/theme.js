import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1c1e27',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#373a49',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#6c6e7f',
      secondary: '#a5a7b6',
    },
    background: {
      default: '#e1e3ea',
      paper: '#ffffff',
    },
    error: {
      main: '#d32f2f',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ed6c02',
      contrastText: '#ffffff',
    },
    info: {
      main: '#0288d1',
      contrastText: '#ffffff',
    },
    success: {
      main: '#2e7d32',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
    h1: { fontWeight: 700, fontSize: '2.5rem' },
    h2: { fontWeight: 700, fontSize: '2rem' },
    h3: { fontWeight: 700, fontSize: '1.75rem' },
    h4: { fontWeight: 700, fontSize: '1.5rem' },
    h5: { fontWeight: 700, fontSize: '1.25rem' },
    h6: { fontWeight: 700, fontSize: '1rem' },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1c1e27',
          color: '#ffffff',
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#373a49',
          color: '#ffffff',
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
            color: '#1c1e27',
          },
        },
        content: {
          padding: '16px',
        },
        actions: {
          padding: '8px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-contained': {
            backgroundColor: '#1c1e27',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#373a49',
            },
          },
          '&.MuiButton-outlined': {
            border: '1px solid #1c1e27',
            color: '#1c1e27',
            '&:hover': {
              border: '1px solid #373a49',
              color: '#373a49',
            },
          },
          '&.MuiButton-text': {
            color: '#1c1e27',
            '&:hover': {
              backgroundColor: '#f0f0f0',
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
        body1: { color: '#6c6e7f' },
        body2: { color: '#a5a7b6' },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#6c6e7f',
        },
        input: {
          color: '#1c1e27',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#6c6e7f',
          '&.Mui-focused': {
            color: '#1c1e27',
          },
        },
      },
    },
  },
});

export default theme;
