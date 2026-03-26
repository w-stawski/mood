'use client';

import { useActionState } from 'react';
import { getAiAnswerAboutDBFromForm } from '@/utils/ai';
import SubmitButton from './SubmitButton';

export default function Question() {
  const [state, action, isPending] = useActionState(getAiAnswerAboutDBFromForm, '');

  return (
    <div className="space-y-3">
      <form className="flex" action={action}>
        <input
          type="text"
          name="question"
          id="question"
          placeholder="Ask anything about your journal"
          disabled={isPending}
          required
          className="w-full px-4 py-2 mr-3 rounded-lg border border-gray-300"
        />
        <SubmitButton text={'Ask'} pendingText="Thinking" />
      </form>
      {isPending && <div className="my-5 animate-pulse bg-gray-200 h-15 w-full rounded-lg" />}
      {!isPending && state && <p className="my-5">{state}</p>}
    </div>
  );
}
