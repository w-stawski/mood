import { SignIn } from '@clerk/nextjs';
import { Suspense } from 'react';

export function ClerkSignInPanel() {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-gray-50" aria-hidden />}>
      <SignIn />
    </Suspense>
  );
}
