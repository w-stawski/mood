'use server';

import { getUserByClerkId } from '@/utils/auth';
import db from '@/utils/db';

/** Used by the journal page to detect when async AI analysis has been persisted. */
export async function entryHasAnalysis(entryId: string): Promise<boolean> {
  const user = await getUserByClerkId();
  if (!user?.id) {
    return false;
  }

  const row = await db.entry.findFirst({
    where: { id: entryId, userId: user.id },
    select: { analysis: { select: { id: true } } },
  });

  return row?.analysis != null;
}
