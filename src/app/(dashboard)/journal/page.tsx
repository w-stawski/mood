import EntryCard from '@/components/EntryCard';
import Question from '@/components/Question';
import { getEntries } from '@/utils/db-helpers';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

function JournalListFallback() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="h-10 w-48 bg-gray-200 animate-pulse rounded" />
        <div className="h-10 w-32 bg-gray-200 animate-pulse rounded-lg" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<JournalListFallback />}>
      <JournalList />
    </Suspense>
  );
}

async function JournalList() {
  const entries = await getEntries();

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Your Journal</h1>
        <Link
          href="/journal/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <PlusCircle size={20} />
          <span>New Entry</span>
        </Link>
      </header>
      <Question />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {entries?.map((entry) => (
          <Link key={entry.id} href={`/journal/${entry.id}`}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>

      {!entries?.length && (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">No journal entries yet. Start by creating one!</p>
          <Link href="/journal/new" className="mt-4 inline-block text-blue-600 font-medium hover:underline">
            Create your first entry
          </Link>
        </div>
      )}
    </div>
  );
}

