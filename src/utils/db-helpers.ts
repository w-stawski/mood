import { Analysis, JournalEntry } from '@/types';
import db from '@/utils/db';
import { cacheLife, cacheTag } from 'next/cache';
import { getUserByClerkId } from './auth';
import { formatDate } from './date';

export type JournalEntryWithFormattedDates = Omit<JournalEntry, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

/** Invalidate with `updateTag` after writes so Data Cache matches DB on Vercel. */
export const entriesCacheTag = (userId: string) => `user-entries-${userId}`;
export const analysesCacheTag = (userId: string) => `user-analyses-${userId}`;

export const getEntries = async (): Promise<JournalEntryWithFormattedDates[] | null> => {
  const user = await getUserByClerkId();
  const userId = user?.id;

  if (!userId) return null;
  return getCachedEntries(userId);
};

async function getCachedEntries(userId: string): Promise<JournalEntryWithFormattedDates[]> {
  'use cache';
  cacheTag(entriesCacheTag(userId));
  cacheLife('max');

  const entries = await db.entry.findMany({
    where: { userId },
    include: { analysis: true },
    orderBy: { createdAt: 'desc' },
  });

  return entries.map((entry) => ({
    ...entry,
    createdAt: formatDate(entry.createdAt),
    updatedAt: formatDate(entry.updatedAt),
  })) as JournalEntryWithFormattedDates[];
}

export const getAnalyses = async (): Promise<Analysis[] | null> => {
  const user = await getUserByClerkId();
  const userId = user?.id;

  if (!userId) return null;
  return getCachedAnalyses(userId);
};

async function getCachedAnalyses(userId: string): Promise<Analysis[]> {
  'use cache';
  cacheTag(analysesCacheTag(userId));
  cacheLife('max');

  const analyses = await db.analysis.findMany({
    where: { entry: { userId } },
    orderBy: { createdAt: 'desc' },
  });

  return analyses;
}

export const getEntryById = async (entryId: string, userId: string): Promise<JournalEntry | null> => {
  const entry = await db.entry.findUnique({
    where: { id: entryId, userId },
    include: { analysis: true },
  });
  return entry as JournalEntry | null;
};
