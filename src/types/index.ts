import { z } from 'zod';

// --- Base Schemas ---

export const UserSchema = z.object({
  id: z.uuid(),
  clerkId: z.string(),
  email: z.email(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const AnalysisSchema = z.object({
  id: z.uuid(),
  entryId: z.uuid(),
  summary: z.string(),
  feedback: z.string(),
  mood: z.number().min(1).max(10),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const JournalEntrySchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  userId: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  analysis: AnalysisSchema.nullable().optional(),
});

// --- Inferred Types ---

export type User = z.infer<typeof UserSchema> & {
  entries?: JournalEntry[];
};

export type JournalEntry = z.infer<typeof JournalEntrySchema>;

export type Analysis = z.infer<typeof AnalysisSchema> & {
  entry?: JournalEntry;
};

// --- Specialized Schemas and Types ---

export const AnalysisResponseSchema = z.object({
  summary: z.string(),
  mood: z.number().min(1).max(10),
  feedback: z.string(),
});

export type AnalysisResponse = z.infer<typeof AnalysisResponseSchema>;

export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;
