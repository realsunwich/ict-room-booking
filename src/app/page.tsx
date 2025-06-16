import { Metadata } from 'next';
import React from 'react';
import ThemeProviderComponent from '@/components/ThemeProvider';
import LoginPageWithSnackbar from './login/page';

export const metadata: Metadata = {
  title: "ICT Room Booking System",
  icons: {
    icon: "/favicon.ico",
  },
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
      <div>
        <LoginPageWithSnackbar/>
      </div>
    </ThemeProviderComponent>
  );
}