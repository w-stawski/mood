import { Analysis, JournalEntry } from '@/types';
import db from '@/utils/db';
import { unstable_cache } from 'next/cache';
import { getUserByClerkId } from './auth';
import { formatDate } from './date';

export type JournalEntryWithFormattedDates = Omit<JournalEntry, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

export const getEntries = async (): Promise<JournalEntryWithFormattedDates[] | null> => {
  const user = await getUserByClerkId();
  const userId = user?.id;

  if (!userId) return null;
  return getCachedEntries(userId);
};

const getCachedEntries = (userId: string) =>
  unstable_cache(async (): Promise<JournalEntryWithFormattedDates[]> => {
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
  }, [`entries-${userId}`])();

export const getAnalyses = async (): Promise<Analysis[] | null> => {
  const user = await getUserByClerkId();
  const userId = user?.id;

  if (!userId) return null;
  return getCachedAnalyses(userId);
};

const getCachedAnalyses = (userId: string) =>
  unstable_cache(async (): Promise<Analysis[]> => {
    const analyses = await db.analysis.findMany({
      where: { entry: { userId } },
      orderBy: { createdAt: 'desc' },
    });

    return analyses;
  }, [`analyses-${userId}`])();

export const getEntryById = async (entryId: string, userId: string): Promise<JournalEntry | null> => {
  const entry = await db.entry.findUnique({
    where: { id: entryId, userId },
    include: { analysis: true },
  });
  return entry as JournalEntry | null;
};
