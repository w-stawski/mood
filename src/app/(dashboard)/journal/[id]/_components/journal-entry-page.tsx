import Editor from '@/components/Editor';
import { getUserByClerkId } from '@/utils/auth';
import { getEntryById } from '@/utils/db-helpers';
import Link from 'next/link';

export function JournalEntryFallback() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="h-6 w-40 bg-slate-200 animate-pulse rounded mb-8" />
        <div className="h-64 bg-white rounded-lg border border-slate-200 animate-pulse" />
      </div>
    </div>
  );
}

export async function JournalEntryContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getUserByClerkId();
  const userId = user?.id;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const entry = await getEntryById(id, userId);

  if (!entry) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 font-medium transition-colors">
            ← Back to Journal
          </Link>
          <div className="bg-white rounded-lg shadow-sm p-8 border border-slate-200">
            <p className="text-slate-600 text-center text-lg">Entry not found or not authorized.</p>
          </div>
        </div>
      </div>
    );
  }

  const { analysis, ...entryObject } = entry;

  return (
    <div>
      <Link
        href="/journal"
        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 font-medium transition-colors">
        ← Back to Journal
      </Link>
      <div className="md:grid grid-cols-3 gap-3 min-h-screen">
        <div className="col-span-2 max-w-2xl mx-auto mb-5">
          <Editor entry={entryObject} />
        </div>
        {analysis && (
          <div
            className="p-5 h-max text-center bg-linear-to-br from-sky-200 to-sky-500
                    bg-size-[300%_300%]
                    animate-[gradient_4s_ease_infinite] rounded max-w-full">
            <p className="text-slate-700 text-center text-sm font-extrabold">AI Analysis:</p>
            <p className="font-semibold py-2">Mood: {analysis.mood} / 10</p>
            <p>Your day:</p>
            <p className="font-thin"> {analysis.summary}</p>
            <p className="py-2">What can we do?</p>
            <p className="font-thin"> {analysis.feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
}
