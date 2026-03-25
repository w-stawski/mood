import { createEntry } from '@/actions/post';

export default function NewEntryCard() {
  return (
    <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Create New Entry</h2>
        <p className="text-gray-500">Share what&apos;s on your mind today.</p>
      </div>

      <form className="space-y-6" action={createEntry}>
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            autoComplete="off"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
            placeholder="A title for your entry"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
            Journal Entry
          </label>
          <textarea
            id="content"
            name="content"
            rows={8}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 resize-none"
            placeholder="Start writing..."
            required
            aria-required="true"
          />
        </div>
        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all shadow-lg shadow-blue-200 active:scale-[0.98]">
            Save Entry
          </button>
        </div>
      </form>
    </div>
  );
}
