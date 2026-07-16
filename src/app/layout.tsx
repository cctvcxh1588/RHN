import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/lib/LanguageProvider';

export const metadata: Metadata = {
  title: {
    default: 'Round Hainan Regatta | 15th Edition 2026',
    template: '%s | Round Hainan Regatta',
  },
  description:
    'The 15th Round Hainan Regatta — 680 miles of world-class offshore racing around Hainan Island. October 31 – November 7, 2026, Sanya, China.',
  keywords: [
    'Round Hainan Regatta',
    'Hainan sailing race',
    'offshore racing',
    'Sanya sailing',
    'yacht race China',
    'Round Hainan Island',
    'sailing regatta 2026',
  ],
  openGraph: {
    title: 'Round Hainan Regatta | 15th Edition 2026',
    description:
      '680 Miles. One Island. A Sea You\'ve Never Sailed.',
    url: 'https://roundhainanregatta.com',
    siteName: 'Round Hainan Regatta',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="en">
      <body className="antialiased">
        {isDev && <Inspector />}
        <LanguageProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}