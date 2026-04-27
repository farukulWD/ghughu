import type { Metadata } from 'next';
import { Playfair_Display, Inter, Noto_Serif_Bengali } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import Toast from '@/components/Toast';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
});

const notoBengali = Noto_Serif_Bengali({
  variable: '--font-noto-bengali',
  subsets: ['bengali'],
  weight: ['500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Ghughu · Your Need, Our Service',
  description: 'An emerald-and-gold marketplace from Bangladesh — sarees, gadgets, beauty, home essentials.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${notoBengali.variable}`}>
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
