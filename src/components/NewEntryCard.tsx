import { createEntry } from '../actions/post';

export default function NewEntryCard() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">New Entry</h2>
      <form className="space-y-4" action={createEntry}>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter entry title"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Write your thoughts here..."
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
          Create Entry
        </button>
      </form>
    </div>
  );
}
