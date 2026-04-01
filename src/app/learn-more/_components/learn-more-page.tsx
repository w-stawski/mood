import Link from 'next/link';
import { CloudSun, Zap, Smartphone, Brain, PiggyBank } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';

export function LearnMoreFallback() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="h-10 w-32 bg-gray-100 animate-pulse rounded-xl" />
        <div className="h-10 w-28 bg-gray-100 animate-pulse rounded-full" />
      </nav>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="h-14 w-3/4 max-w-lg bg-gray-100 animate-pulse rounded mb-6" />
        <div className="h-24 bg-gray-50 animate-pulse rounded" />
      </div>
    </div>
  );
}

export async function LearnMoreContent() {
  const { userId } = await auth();
  const ctaLink = userId ? '/journal' : '/sign-in';

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <CloudSun className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-purple-500">
            MOOD
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/">
            <button className="text-gray-600 font-semibold hover:text-gray-900 transition-colors">Home</button>
          </Link>
          <Link href={ctaLink}>
            <button className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
              {userId ? 'Dashboard' : 'Get Started'}
            </button>
          </Link>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 py-20 border-b border-gray-100">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-black leading-tight text-gray-900">Understand Yourself Better</h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              MOOD is your personal journal companion—a simple, powerful tool to track your thoughts, emotions, and
              experiences. With AI insights, discover patterns in your mood and unlock actionable steps for personal
              growth.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 border-b border-gray-100">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black text-gray-900">Powerful Features</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Everything you need to understand and improve your emotional well-being
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Smartphone,
                title: 'Always Accessible',
                description:
                  'Write from any device, anytime. Your journal syncs seamlessly across all your devices—capture moments when inspiration strikes.',
                color: 'text-blue-500',
                bg: 'bg-blue-50',
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description:
                  'Optimized for speed and simplicity. No distractions, no complex features—just you and your thoughts with instant save.',
                color: 'text-yellow-500',
                bg: 'bg-yellow-50',
              },
              {
                icon: Brain,
                title: 'AI-Powered Insights',
                description:
                  'Let AI analyze your entries to identify mood patterns, triggers, and provide personalized recommendations for better mental health.',
                color: 'text-purple-500',
                bg: 'bg-purple-50',
              },
              {
                icon: PiggyBank,
                title: 'Free',
                description: 'No credit card required, no hidden costs, no data collection',
                color: 'text-emerald-500',
                bg: 'bg-emerald-50',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all group">
                <div
                  className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 border-b border-gray-100">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black text-gray-900">How It Works</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Three simple steps to better self-awareness</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: '1',
                title: 'Write',
                description:
                  'Express your thoughts and feelings freely. No judgment, no limits—write what matters to you.',
              },
              {
                number: '2',
                title: 'Analyze',
                description:
                  'Our AI reads your entries and generates personalized insights about your mood and well-being.',
              },
              {
                number: '3',
                title: 'Grow',
                description:
                  'Discover patterns, identify triggers, and receive actionable recommendations for personal improvement.',
              },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-blue-600 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-blue-200">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-7 right-0 w-1/2 h-1 bg-linear-to-r from-blue-300 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400 text-sm">
          © 2026 MOOD Journal. Building a healthier world through self-reflection.
        </div>
      </footer>
    </div>
  );
}
