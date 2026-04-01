import { JournalEntryContent, JournalEntryFallback } from './_components/journal-entry-page';
import { Suspense } from 'react';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<JournalEntryFallback />}>
      <JournalEntryContent params={params} />
    </Suspense>
  );
}
