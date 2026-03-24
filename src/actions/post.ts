'use server';

import { auth } from '@clerk/nextjs/server';
import db from '../utils/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createEntry(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    return;
  }

  const user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) {
    return;
  }

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  await db.entry.create({
    data: {
      title,
      content,
      userId: user.id,
    },
  });

  revalidatePath('/journal');
  redirect('/journal');
}
