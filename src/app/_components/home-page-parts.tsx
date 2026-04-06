import { auth } from '@clerk/nextjs/server';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export async function HomeNavButton() {
  const { userId } = await auth();
  const link = userId ? '/journal' : '/sign-in';

  return (
    <Link
      href={link}
      className="inline-flex items-center justify-center px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
      {userId ? 'Go to Dashboard' : 'Sign In'}
    </Link>
  );
}

export async function HomeHeroButtons() {
  const { userId } = await auth();
  const link = userId ? '/journal' : '/sign-in';

  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-4">
      <Link
        href={link}
        className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all inline-flex items-center justify-center gap-2 group shadow-xl shadow-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
        Start Journaling
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
      </Link>
      <Link
        href="/learn-more"
        className="w-full sm:w-auto px-10 py-4 bg-white text-gray-700 font-bold rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-all inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
        Learn More
      </Link>
    </div>
  );
}
