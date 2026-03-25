export default function EntryCard({ title, content, createdAt }: { title: string; content: string; createdAt: Date }) {
  return (
    <div className="group bg-white shadow-sm hover:shadow-md rounded-xl p-6 border border-gray-200 transition-all duration-200 hover:border-blue-300 h-64 flex flex-col">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
        {createdAt.toLocaleDateString()}
      </span>
      <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
        {title}
      </h2>
      <p className="text-gray-600 text-sm leading-relaxed overflow-hidden line-clamp-5 flex-1">{content}</p>
      <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
        <div className="w-2 h-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}
