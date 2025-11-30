import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/contexts/ThemeContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js Professional Theme System',
  description: 'Dynamic theme system with professional color palettes',
};

// Client component for hydration detection
function HydrationDetector() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          // Mark body as hydrated after client-side rendering
          document.body.classList.add('hydrated');
          
          // Remove any Dark Reader attributes
          const removeDarkReaderAttributes = () => {
            const html = document.documentElement;
            const body = document.body;
            
            // Remove Dark Reader attributes
            html.removeAttribute('data-darkreader-scheme');
            html.removeAttribute('data-darkreader-mode');
            
            // Remove all darkreader inline styles
            const darkReaderElements = document.querySelectorAll('[data-darkreader-inline]');
            darkReaderElements.forEach(el => {
              el.removeAttribute('data-darkreader-inline');
            });
            
            const darkReaderStyles = document.querySelectorAll('[style*="darkreader"]');
            darkReaderStyles.forEach(el => {
              el.removeAttribute('style');
            });
          };
          
          // Run immediately and also after a short delay
          removeDarkReaderAttributes();
          setTimeout(removeDarkReaderAttributes, 100);
        `,
      }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent Dark Reader from modifying our theme */}
        <meta name="darkreader-lock" />
        {/* Predefine theme-color for SSR consistency */}
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <HydrationDetector />
        </ThemeProvider>
      </body>
    </html>
  );
}