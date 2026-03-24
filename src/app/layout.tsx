import { ClerkProvider, UserButton } from '@clerk/nextjs';
import { ui } from '@clerk/ui';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Capture your thoughts, memories, and moments in a safe, personal space.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
        <body className="min-h-full flex flex-col bg-linear-to-b from-amber-200 to-amber-400">
          <header className="p-4">
            <nav className="flex justify-between items-center max-w-7xl mx-auto">
              <span className="font-black tracking-tighter uppercase">Journal</span>
              <UserButton />
            </nav>
          </header>
          <main className="flex-1 flex flex-col">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
