import { auth } from '@clerk/nextjs/server';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import db from '@/utils/db';

export const getUserByClerkId = cache(async () => {
  const { userId } = await auth();
  if (!userId) return null;
  return getCachedUser(userId);
});

const getCachedUser = unstable_cache(
  async (clerkId: string) => {
    return await db.user.findUnique({
      where: { clerkId },
    });
  },
  ['user'],
  { revalidate: 600 },
);
