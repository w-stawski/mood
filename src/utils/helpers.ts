import { auth } from '@clerk/nextjs/server';
import db from '@/utils/db';

export const getEntries = async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
  });
  if (!user) {
    return null;
  }

  const entries = await db.entry.findMany({
    where: {
      userId: user.id,
    },
    include: {
      analysis: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return entries;
};
