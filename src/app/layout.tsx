'use client';

import React from 'react';
import './globals.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/components/theme';
import { SessionProvider } from "next-auth/react";
import { Kanit } from 'next/font/google';

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
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
              <div style={{ display: 'flex', flex: 1 }}>
                <main style={{ flex: '100%', padding: '0% 1%' }}>
                  {children}
                </main>
              </div>
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}