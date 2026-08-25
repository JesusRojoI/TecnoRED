import type { Metadata } from 'next';
import '@/styles/globals.css';
import LanguageProvider from '@/contexts/LanguageProvider';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'TecnoRED - Soluciones Tecnológicas Innovadoras',
  description: 'Diseño y desarrollo de software a la medida. Transformamos tus ideas en soluciones digitales.',
  keywords: 'desarrollo web, aplicaciones móviles, UX/UI, software, TecnoRED',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="font-inter antialiased" suppressHydrationWarning>
        <LanguageProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
           <Toaster
  position="top-right"
  containerStyle={{
    top: 100,
    right: 20,
  }}
  toastOptions={{
    duration: 5000,
    style: {
      background: '#111827',
      color: '#fff',
      fontFamily: 'Inter, sans-serif',
      borderRadius: '8px',
    },
    success: { duration: 5000, iconTheme: { primary: '#C80000', secondary: '#fff' } },
    error: { duration: 5000, iconTheme: { primary: '#EF4444', secondary: '#fff' } },
  }}
/>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
