import { auth } from '@clerk/nextjs/server';
import { cache } from 'react';
import { cacheLife } from 'next/cache';
import db from '@/utils/db';

export const getUserByClerkId = cache(async () => {
  const { userId } = await auth();
  if (!userId) return null;
  return getCachedUser(userId);
});

async function getCachedUser(clerkId: string) {
  'use cache';
  cacheLife({ revalidate: 600 });
  return await db.user.findUnique({
    where: { clerkId },
  });
}
