import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Boiler Comparator',
  description: 'An application to help consumers compare different types of boilers (electric, heat pump, ion, gas, oil), view AI-summarized reports, request consultations, and find local installers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen font-sans text-gray-800">{children}</body>
    </html>
  );
}
