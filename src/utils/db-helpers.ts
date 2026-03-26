import db from '@/utils/db';
import { unstable_cache } from 'next/cache';
import { getUserByClerkId } from './auth';
import { formatDate } from './date';

export const getEntries = async () => {
  const user = await getUserByClerkId();
  const userId = user?.id;

  if (!userId) return null;
  return getCachedEntries(userId);
};

const getCachedEntries = (userId: string) =>
  unstable_cache(async () => {
    const resp = await db.entry.findMany({
      where: { userId },
      include: { analysis: true },
      orderBy: { createdAt: 'desc' },
    });

    return resp.map((entry) => ({
      ...entry,
      createdAt: formatDate(entry.createdAt),
      updatedAt: formatDate(entry.updatedAt),
    }));
  }, [`entries-${userId}`])();

export const getAnalyses = async () => {
  const user = await getUserByClerkId();
  const userId = user?.id;

  if (!userId) return null;
  return getCachedAnalyses(userId);
};

const getCachedAnalyses = (userId: string) =>
  unstable_cache(async () => {
    const resp = await db.analysis.findMany({
      where: { entry: { userId } },
      orderBy: { createdAt: 'desc' },
    });

    return resp;
  }, [`analyses-${userId}`])();

export const getEntry = async (entryId: string, userId: string) => {
  return await db.entry.findUnique({
    where: { id: entryId, userId },
    include: { analysis: true },
  });
};
