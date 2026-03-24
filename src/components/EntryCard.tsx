export default function EntryCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 text-center h-65 overflow-hidden">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 wrap-break-word overflow-hidden">{content}</p>
    </div>
  );
}
