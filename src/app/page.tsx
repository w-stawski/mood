import { auth } from '@clerk/nextjs/server';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const { userId } = await auth();

  const link = userId ? '/journal' : '/sign-in';

  return (
    <div className="w-screen h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 mb-4">Welcome to Your Journal</h1>

        <div className="flex justify-center mb-4">
          <Heart size={32} color="red" />
        </div>

        <p className="text-gray-600 text-base sm:text-lg mb-6">
          Capture your thoughts, memories, and moments in a safe, personal space.
        </p>
        <Link href={link}>
          <button className="w-full bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all hover:scale-105 duration-1000">
            Start Journaling
          </button>
        </Link>
      </div>
    </div>
  );
}
