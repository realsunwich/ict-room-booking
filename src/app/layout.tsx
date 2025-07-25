import React from 'react';
import { Metadata } from 'next';
import { Kanit } from 'next/font/google';
import Providers from '@/components/Providers';
import './globals.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const metadata: Metadata = {
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
        <Providers>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div style={{ display: 'flex', flex: 1 }}>
              <main style={{ flex: '100%', padding: '0% 1%' }}>
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
