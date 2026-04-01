import { JournalList, JournalListFallback } from './_components/journal-list';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<JournalListFallback />}>
      <JournalList />
    </Suspense>
  );
}
