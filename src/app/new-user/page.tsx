import { NewUserFlow, NewUserPageFallback } from './_components/new-user-flow';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<NewUserPageFallback />}>
      <NewUserFlow />
    </Suspense>
  );
}
