import Editor from '@/components/Editor';
import { getUserByClerkId } from '@/utils/auth';
import db from '@/utils/db';
import Link from 'next/link';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const user = await getUserByClerkId();
  const userId = user?.id;

  let entry = null;

  try {
    if (!userId) {
      throw new Error('User not authenticated');
    }
    entry = await db.entry.findUnique({
      where: {
        id,
        userId,
      },
      include: {
        analysis: true,
      },
    });
  } catch (err) {
    console.error('Error fetching entry:', err);
  }

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
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 font-medium transition-colors">
          ← Back to Journal
        </Link>
        <Editor entry={entryObject} />
      </div>
      {analysis && (
        <div
          className="mt-5 p-5 text-center bg-linear-to-br from-sky-200 to-sky-500
                    bg-size-[300%_300%]
                    animate-[gradient_4s_ease_infinite] rounded">
          <p className="text-slate-700 text-center text-sm font-extrabold">AI Analysis:</p>
          <p className="font-semibold py-2">Mood: {analysis.mood} / 10</p>
          <p>Your day:</p>
          <p className="font-thin"> {analysis.summary}</p>
          <p className="py-2">What can we do?</p>
          <p className="font-thin"> {analysis.feedback}</p>
        </div>
      )}
    </div>
  );
}
