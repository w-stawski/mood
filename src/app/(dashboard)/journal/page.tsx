import { JournalAiInsightToast } from './_components/journal-ai-insight-toast';
import { JournalList, JournalListFallback } from './_components/journal-list';
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Suspense fallback={null}>
        <JournalAiInsightToast />
      </Suspense>
      <Suspense fallback={<JournalListFallback />}>
        <JournalList />
      </Suspense>
    </>
  );
}
