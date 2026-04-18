import Logo from '@/components/Logo';
import { UserButton } from '@clerk/nextjs';
import { ChartNoAxesCombined, Home, NotebookPen } from 'lucide-react';
import Link from 'next/link';

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/journal', label: 'Journal', icon: NotebookPen },
  { href: '/chart', label: 'Chart', icon: ChartNoAxesCombined },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 p-5 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <Logo />

        <nav aria-label="Primary navigation" className="flex-1 mt-5 space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.label}
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors group">
              <link.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-500" aria-hidden="true" />
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserButton />
            <span className="text-sm font-medium text-gray-700">Account</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:hidden">
          <Link href="/">
            <h1 className="text-xl font-bold text-blue-600">MOOD</h1>
          </Link>
          <UserButton />
        </header>

        <main id="main-content" className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
