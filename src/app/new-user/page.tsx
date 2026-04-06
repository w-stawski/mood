import { NewUserFlow, NewUserPageFallback } from './_components/new-user-flow';
import { Suspense } from 'react';

export default function Page() {
  return (
    <main id="main-content">
      <Suspense fallback={<NewUserPageFallback />}>
        <NewUserFlow />
      </Suspense>
    </main>
  );
}
