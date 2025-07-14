'use client';

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/components/theme';
import { SessionProvider } from "next-auth/react";

interface Props {
    children: React.ReactNode;
}

const ThemeProviderComponent: React.FC<Props> = ({ children }) => {
    return (
        <SessionProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </SessionProvider>
    );
};

export default ThemeProviderComponent;
