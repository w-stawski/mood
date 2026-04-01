import { SignUp } from '@clerk/nextjs';
import { Suspense } from 'react';

export function ClerkSignUpPanel() {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-gray-50" aria-hidden />}>
      <SignUp />
    </Suspense>
  );
}
