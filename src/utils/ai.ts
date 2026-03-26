'use server';
import { generateText, Output } from 'ai';
import z from 'zod';
import { getUserByClerkId } from './auth';
import db from './db';

export const genAndAddAiSummary = async (entry: string) => {
  const system = `You are a professional psychologist.
           Provide empathetic, concise responses.`;
  const prompt = `Analyze the following diary entry. Summarize it in 1 concise sentence focusing on what happened and mental state using past tense and calling the author "you". Evaluate author's mood in scale of 1-10. Add analysis and tips in 2-3 sentences without repeating the summary. Do not add unrelated information. Give back object with three properties: "summary", "mood", and "feedback".Entry: ${entry}`;
  const resp = await generateText({
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

  return resp?.output;
};

export const getAiAnswerAboutDBFromForm = async (prevState: string, form: FormData) => {
  const question = form.get('question') as string;
  const answer = await getAiAnswerAboutDB(question);

  return answer;
};

export const getAiAnswerAboutDB = async (question: string) => {
  const user = await getUserByClerkId();
  const userId = user?.id;

  // 1. Fetch the data yourself first
  const entries = await db.entry.findMany({
    where: { userId },
    include: { analysis: true },
    orderBy: { createdAt: 'desc' },
  });

  const entriesContext = JSON.stringify(entries);

  const { text } = await generateText({
    model: 'openai/gpt-4o',
    system: `
      You are a personal journal assistant.
      Here is the user's journal data: ${entriesContext}

      Use this data to answer the user's question accurately.
     Focus on events and mood and their patterns.
     Do not mention notes and dates. just conclusions from them.
 Format answer to not use special characters or markdown convention.
      Today's date is ${new Date().toLocaleDateString()}.
    `,
    prompt: question,
  });

  return text;
};
