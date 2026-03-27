export type User = {
  id: string;
  clerkId: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  entries?: JournalEntry[];
};

export type JournalEntry = {
  id: string;
  title: string;
  content: string;
  userId: string;
  user?: User;
  createdAt: Date;
  updatedAt: Date;
  analysis?: Analysis | null;
};

export type Analysis = {
  id: string;
  entryId: string;
  entry?: JournalEntry;
  summary: string;
  feedback: string;
  mood: number;
  createdAt: Date;
  updatedAt: Date;
};

export type AnalysisResponse = {
  summary: string;
  mood: number;
  feedback: string;
};

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};
