import Logo from '@/components/Logo';
import { auth } from '@clerk/nextjs/server';
import { ArrowRight, Zap, Shapes, BrainCircuit, PiggyBank } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

async function NavButton() {
  const { userId } = await auth();
  const link = userId ? '/journal' : '/sign-in';

  return (
    <Link href={link}>
      <button className="px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-200">
        {userId ? 'Go to Dashboard' : 'Sign In'}
      </button>
    </Link>
  );
}

async function HeroButtons() {
  const { userId } = await auth();
  const link = userId ? '/journal' : '/sign-in';

  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-4">
      <Link href={link}>
        <button className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-blue-100">
          Start Journaling
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </Link>
      <Link href="/learn-more">
        <button className="w-full sm:w-auto px-10 py-4 bg-white text-gray-700 font-bold rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-all">
          Learn More
        </button>
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-100">
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <Logo />
        <Suspense fallback={<div className="w-32 h-11 bg-gray-100 animate-pulse rounded-full" />}>
          <NavButton />
        </Suspense>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-bold border border-blue-100">
              <Zap size={14} />
              <span>v1.0 is now live</span>
            </div>
            <div>
              <h1 className="text-6xl md:text-7xl font-black leading-[1.1] tracking-tight text-gray-900">
                Track your <br />
                <span className="tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-purple-500 pr-1">
                  MOOD
                </span>{' '}
                <br />
                shape your life.
              </h1>
            </div>

            <p className="text-xl text-gray-500 leading-relaxed max-w-lg">
              The simplest way to keep track of your thoughts and feelings. Fast, simple, free and always with you.
            </p>

            <Suspense
              fallback={
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <div className="w-full sm:w-48 h-[60px] bg-gray-100 animate-pulse rounded-2xl" />
                  <div className="w-full sm:w-40 h-[60px] bg-gray-100 animate-pulse rounded-2xl" />
                </div>
              }>
              <HeroButtons />
            </Suspense>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full" />
            <div className="relative bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Zap, title: 'Fast', color: 'text-blue-500', bg: 'bg-blue-50' },
                  { icon: Shapes, title: 'Simple', color: 'text-amber-500', bg: 'bg-amber-50' },
                  { icon: BrainCircuit, title: 'AI Insights', color: 'text-purple-500', bg: 'bg-purple-50' },
                  { icon: PiggyBank, title: 'Free', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100 group">
                    <div
                      className={`w-12 h-12 ${feature.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="font-bold text-lg">{feature.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400 text-sm">
          © 2026 MOOD Journal. Built for personal reflection.
        </div>
      </footer>
    </div>
  );
}
