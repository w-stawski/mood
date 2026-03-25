import Link from 'next/link';
import db from '@/utils/db';

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

  let entry = null;
  let error = null;

  try {
    entry = await db.entry.findUnique({
      where: {
        id,
      },
      include: {
        analisis: true,
      },
    });

    if (!entry) {
      error = 'Entry not found';
    }
  } catch (err) {
    console.error('Error fetching entry:', err);
    error = 'Failed to load entry';
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 font-medium transition-colors">
            ← Back to Journal
          </Link>
          <div className="bg-white rounded-lg shadow-sm p-8 border border-slate-200">
            <p className="text-slate-600 text-center text-lg">{error}</p>
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
            <h1 className="text-4xl font-bold text-slate-900 mb-2">{entry?.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
              <time dateTime={entry?.createdAt?.toISOString()}>Created {formatDate(entry?.createdAt)}</time>
              {entry?.updatedAt && entry?.updatedAt !== entry?.createdAt && (
                <time dateTime={entry?.updatedAt?.toISOString()}>Updated {formatDate(entry?.updatedAt)}</time>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="px-8 py-6">
            <div className="prose prose-sm max-w-none">
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{entry?.content}</p>
            </div>
          </div>

          {/* Analysis Section */}
          {entry?.analisis && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-slate-200 px-8 py-6">
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
