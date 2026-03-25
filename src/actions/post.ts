'use server';

import { auth } from '@clerk/nextjs/server';
import db from '../utils/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createEntry(formData: FormData) {
  const { userId } = await auth();

  try {
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
  } catch (error) {
    console.error('Error creating entry:', error);
    throw new Error('Failed to create entry. Please try again.');
  }
}
