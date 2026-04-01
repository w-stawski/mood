import { LearnMoreContent, LearnMoreFallback } from './_components/learn-more-page';
import { Suspense } from 'react';

export default function LearnMore() {
  return (
    <Suspense fallback={<LearnMoreFallback />}>
      <LearnMoreContent />
    </Suspense>
  );
}
