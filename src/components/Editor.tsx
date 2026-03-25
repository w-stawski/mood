import { updateEntryonFormSubmit } from '@/actions/post';
import { Entry } from '@/generated/prisma/client';
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

export default function Editor({ entry }: { entry: Entry }) {
  return (
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

      <form className="p-8 space-y-6" action={updateEntryonFormSubmit}>
        {/* is it safe? */}
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
    </article>
  );
}
