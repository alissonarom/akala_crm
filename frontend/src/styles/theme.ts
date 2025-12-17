import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#E923A4', // Rosa vibrante
            light: '#FE6FCE', // Rosa claro
            dark: '#AF0573', // Rosa escuro
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#FC90DB', // Rosa suave
        },
        background: {
            default: '#1E1F24',
            paper: '#141519',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0b0b0',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 600,
        },
        h3: {
            fontWeight: 600,
        },
        h4: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 500,
        },
        h6: {
            fontWeight: 500,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 600,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    backgroundImage: 'none', // Remove default gradient in dark mode
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                },
            },
        },
    },
});

export default theme;
