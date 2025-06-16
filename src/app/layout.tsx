'use client';

import React from 'react';
import './globals.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/components/theme';
import { Kanit } from 'next/font/google';
import { Container, Box } from '@mui/material';
import { SessionProvider } from "next-auth/react";

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '500', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="th" className={kanit.className}>
      <body>
        <SessionProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth={false} sx={{ px: { xs: 1, sm: 2 } }}>
              <Box sx={{ maxWidth: "100%", px: { xs: 1, sm: 2 }, mx: "auto" }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                  <Box sx={{ display: 'flex', flex: 1 }}>
                    <main style={{ flex: 1, padding: '0 1%' }}>
                      {children}
                    </main>
                  </Box>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}