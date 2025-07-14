import { Metadata } from 'next';
import React from 'react';
import ThemeProviderComponent from '@/components/ThemeProvider';
import LoginPage from './login/page';
import { Box } from '@mui/material';

export const metadata: Metadata = {
  title: "ICT Room Booking System",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "shortcut icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
  ],
  description: "ระบบจองห้องประชุมคณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา",
  keywords: "ICT Room Booking System, ระบบจองห้องประชุม, มหาวิทยาลัยพะเยา",
  authors: [
    {
      name: "Nuntiya Suwannasak",
    },
  ],
  creator: "Nuntiya Suwannasak",
  publisher: "Nuntiya Suwannasak",
};

export default function App() {
  return (
    <ThemeProviderComponent>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <LoginPage />
      </Box>
    </ThemeProviderComponent>
  );
}