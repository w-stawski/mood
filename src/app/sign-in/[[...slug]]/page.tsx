import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black text-blue-600 mb-2">MOOD</h1>
        <p className="text-gray-500">Welcome back! Please sign in to continue.</p>
      </div>
      <div className="w-full max-w-md bg-white p-2 rounded-2xl shadow-xl shadow-blue-100/50">
        <SignIn />
      </div>
    </div>
  );
}
