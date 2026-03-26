import Editor from '@/components/Editor';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 font-medium transition-colors">
          ← Back to Journal
        </Link>
        <Editor />
      </div>
    </div>
  );
}
