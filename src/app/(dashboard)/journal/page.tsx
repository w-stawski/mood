import Link from 'next/link';
import EntryCard from '@/components/EntryCard';
import { getEntries } from '@/utils/helpers';
import { PlusCircle } from 'lucide-react';

export default async function Page() {
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {entries?.map((entry) => (
          <Link key={entry.id} href={`/journal/${entry.id}`}>
            <EntryCard title={entry.title} content={entry.content} />
          </Link>
        ))}
      </div>

      {(!entries || entries.length === 0) && (
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
