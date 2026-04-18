import { describe, it, expect, vi } from 'vitest';
import { genAndAddAiSummary, getAiAnswerAboutDB } from './ai';
import { generateText } from 'ai';
import db from './db';

vi.mock('ai', () => ({
  generateText: vi.fn(),
  Output: {
    object: vi.fn(() => ({ schema: {} })),
  },
}));

vi.mock('./auth', () => ({
  getUserByClerkId: vi.fn(() => Promise.resolve({ id: 'user_123' })),
}));

vi.mock('./db', () => ({
  default: {
    entry: {
      findMany: vi.fn(() => Promise.resolve([])),
    },
  },
}));

describe('AI Utils', () => {
  it('genAndAddAiSummary returns summary, mood, and feedback', async () => {
    vi.mocked(generateText).mockResolvedValue({
      output: {
        summary: 'A test summary.',
        mood: 5,
        feedback: 'Some test feedback.',
      },
    } as unknown as Awaited<ReturnType<typeof generateText>>);

    const result = await genAndAddAiSummary('Test entry content');

    expect(result).toEqual({
      summary: 'A test summary.',
      mood: 5,
      feedback: 'Some test feedback.',
    });
    expect(generateText).toHaveBeenCalled();
  });

  it('getAiAnswerAboutDB returns AI text response', async () => {
    vi.mocked(generateText).mockResolvedValue({
      text: 'AI answer based on journal entries.',
    } as unknown as Awaited<ReturnType<typeof generateText>>);

    const result = await getAiAnswerAboutDB('How was my week?');

    expect(result).toBe('AI answer based on journal entries.');
    expect(db.entry.findMany).toHaveBeenCalledWith({
      where: { userId: 'user_123' },
      include: { analysis: true },
      orderBy: { createdAt: 'desc' },
    });
    expect(generateText).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'openai/gpt-4o',
        prompt: 'How was my week?',
      }),
    );
  });
});
