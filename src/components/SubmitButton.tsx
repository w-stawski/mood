'use client';
import { Loader, LoaderCircle } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export default function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center gap-2">
      {!pending ? (
        <>
          <span className="animate-spin">
            <Loader />
          </span>{' '}
          Saving...
        </>
      ) : (
        text
      )}
    </button>
  );
}
