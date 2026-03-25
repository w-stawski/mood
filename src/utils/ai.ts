import { updateEntryAiFeedback } from '@/actions/post';
import { generateText, Output } from 'ai';
import z from 'zod';

export const genAndAddAiSummary = async (entry: string, id: string, userId: string) => {
  const system = `You are a professional psychologist.
           Provide empathetic, concise responses.`;
  const prompt = `Analyze the following diary entry. Summarize it in 1 concise sentence focusing on what happened and mental state using past tense and calling the author "you". Evaluate author's mood in scale of 1-10. Add analysis and tips in 2-3 sentences without repeating the summary. Do not add unrelated information. Give back object with three properties: "summary", "mood", and "feedback".Entry: ${entry}`;
  const result = await generateText({
    model: 'openai/gpt-4.1',
    prompt,
    system,
    output: Output.object({
      schema: z.object({
        summary: z.string(),
        mood: z.number().min(1).max(10),
        feedback: z.string(),
      }),
    }),
  });

  updateEntryAiFeedback(result?.output, id, userId);
};
