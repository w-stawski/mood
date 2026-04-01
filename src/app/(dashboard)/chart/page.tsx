import { ChartPageContent, ChartPageFallback } from './_components/chart-page-content';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<ChartPageFallback />}>
      <ChartPageContent />
    </Suspense>
  );
}
