'use client';

import { useActionState } from 'react';
import { getAiAnswerAboutDBFromForm } from '@/utils/ai';
import SubmitButton from './SubmitButton';

export default function Question() {
  const [state, action, isPending] = useActionState<string, FormData>(getAiAnswerAboutDBFromForm, '');

  return (
    <div className="space-y-3">
      <form className="flex" action={action}>
        <label htmlFor="question" className="sr-only">
          Ask a question about your journal
        </label>
        <input
          type="text"
          name="question"
          id="question"
          placeholder="Ask anything about your journal"
          disabled={isPending}
          required
          aria-describedby="question-help"
          className="w-full px-4 py-2 mr-3 rounded-lg border border-gray-300"
        />
        <SubmitButton text={'Ask'} pendingText="Thinking" />
      </form>
      <p id="question-help" className="sr-only">
        Enter a question and submit to get AI insights based on your journal entries.
      </p>
      {isPending && <div className="my-5 animate-pulse bg-gray-200 h-15 w-full rounded-lg" aria-hidden="true" />}
      <div className="my-5" role="status" aria-live="polite" aria-atomic="true">
        {!isPending && state && <p>{state}</p>}
      </div>
    </div>
  );
}
