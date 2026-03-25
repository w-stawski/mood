import { updateEntry } from '@/actions/post';
import { getUserByClerkId } from '@/utils/auth';
import db from '@/utils/db';
import Link from 'next/link';

function formatDate(date: Date | null | undefined): string {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

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
        analisis: true,
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

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 font-medium transition-colors">
          ← Back to Journal
        </Link>

        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header Section */}
          <div className="border-b border-slate-200 px-8 py-6">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Edit Journal Entry</h1>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
              <time dateTime={entry?.createdAt?.toISOString()}>Created {formatDate(entry?.createdAt)}</time>
              {entry?.updatedAt && entry?.updatedAt !== entry?.createdAt && (
                <time dateTime={entry?.updatedAt?.toISOString()}>Updated {formatDate(entry?.updatedAt)}</time>
              )}
            </div>
          </div>

          <form className="p-8 space-y-6" action={updateEntry}>
            <input type="hidden" name="id" value={entry?.id} />
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                defaultValue={entry?.title ?? ''}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-slate-700 mb-2">
                Entry Content
              </label>
              <textarea
                id="content"
                name="content"
                rows={12}
                defaultValue={entry?.content ?? ''}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 resize-none"
              />
            </div>

            <div className="flex items-center justify-between">
              <Link href="/journal" className="text-sm text-slate-600 hover:text-slate-900">
                Cancel
              </Link>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all">
                Save Changes
              </button>
            </div>
          </form>

          {entry?.analisis && (
            <div className="bg-linear-to-r from-blue-50 to-indigo-50 border-t border-slate-200 px-8 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">Mood</h3>
                  <p className="text-2xl font-bold text-slate-900">{entry?.analisis.mood}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">Summary</h3>
                  <p className="text-slate-700 leading-relaxed">{entry?.analisis.summary}</p>
                </div>
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
