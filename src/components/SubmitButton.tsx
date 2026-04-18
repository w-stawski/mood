'use client';
import { Loader } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export default function SubmitButton({ text, pendingText }: { text: string; pendingText: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      aria-live="polite"
      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center gap-2">
      {pending ? (
        <>
          <span className="animate-spin" aria-hidden="true">
            <Loader />
          </span>
          {pendingText}
        </>
      ) : (
        text
      )}
    </button>
  );
}
