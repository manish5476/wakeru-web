import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wakeru Local',
  description: 'Discover genuine local stays, dining, and experiences.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
