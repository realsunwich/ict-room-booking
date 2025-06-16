import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#7b1fa2',
        },
        secondary: {
            main: '#fdd017',
        },
        success: {
            main: '#4CBB17'
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
