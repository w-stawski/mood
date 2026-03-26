import { createEntry, updateEntryOnFormSubmit } from '@/actions/post';
import { Entry } from '@/generated/prisma/client';
import { formatDate } from '@/utils/date';
import Link from 'next/link';
import SubmitButton from './SubmitButton';

export default function Editor({ entry }: { entry?: Entry }) {
  let title = 'Create New Entry';
  let createdAt = '';
  let editedAt = '';
  let saveButtonText = 'Create Entry';

  if (entry) {
    title = 'Edit Journal Entry';
    createdAt = formatDate(entry.createdAt);
    editedAt = formatDate(entry.updatedAt);
    saveButtonText = 'Update Entry';
  }

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="border-b border-slate-200 px-8 py-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">{title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
          {entry ? (
            <>
              <time dateTime={createdAt}>Created {createdAt}</time>
              <time dateTime={editedAt}>Edited {editedAt}</time>
            </>
          ) : (
            <p className="text-gray-500">Share what&apos;s on your mind today.</p>
          )}
        </div>
      </div>

      <form className="p-8 space-y-6" action={entry ? updateEntryOnFormSubmit : createEntry}>
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
          <SubmitButton text={saveButtonText} pendingText="Saving" />
        </div>
      </form>
    </article>
  );
}
