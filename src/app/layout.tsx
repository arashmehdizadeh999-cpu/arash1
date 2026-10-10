import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import SearchOverlay from '@/components/SearchOverlay';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VLORÉ — Timeless by Nature',
  description:
    'Premium essentials crafted for the modern wardrobe. Discover luxury fashion, timeless design, and considered craftsmanship at VLORÉ.',
  keywords: ['luxury fashion', 'menswear', 'premium clothing', 'minimalist fashion', 'VLORÉ'],
  openGraph: {
    title: 'VLORÉ — Timeless by Nature',
    description: 'Premium essentials crafted for the modern wardrobe.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <CartProvider>
          <WishlistProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <CartDrawer />
            <SearchOverlay />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
