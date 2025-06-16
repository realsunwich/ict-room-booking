import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FF6F91',
        },
        secondary: {
            main: '#FF6186',
        },
        success: {
            main: '#5DC983'
        },
        info: {
            main: '#00A6FF'
        },
        warning: {
            main: '#F2AF4C'
        },
        error: {
            main: '#EB5769'
        },
        background: {
            default: '#F2F2F2',
            paper: '#FFFFFF',
        }
    },
    typography: {
        fontFamily: '"Kanit", "Roboto", "Arial", sans-serif',
    },
});

export default theme;
