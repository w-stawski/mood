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
          required
          className="w-full px-4 py-2 mr-3 rounded-lg border border-gray-300"
        />
        <SubmitButton text={isPending ? 'Thinking...' : 'Ask'} />
      </form>
      {state && <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{state}</p>}
    </div>
  );
}
