import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-vazirmatn',
});

export const metadata: Metadata = {
  title: 'اخبار شمال | پوشش خبری گیلان، گلستان و مازندران',
  description: 'سامانه خبری منطقه‌ای شمال ایران - پوشش جامع اخبار سه استان گیلان، گلستان و مازندران',
  keywords: ['اخبار گیلان', 'اخبار گلستان', 'اخبار مازندران', 'اخبار شمال', 'اخبار ایران'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
