'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import db from '@/utils/db';

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
  } catch (error) {
    console.error('Error creating entry:', error);
    throw new Error('Failed to create entry. Please try again.');
  }

  revalidatePath('/journal');
  redirect('/journal');
}

export async function updateEntry(formData: FormData) {
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

    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    const existingEntry = await db.entry.findUnique({
      where: {
        id,
      },
    });

    if (!existingEntry || existingEntry.userId !== user.id) {
      throw new Error('Entry not found or not authorized.');
    }

    await db.entry.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
    });
  } catch (error) {
    console.error('Error updating entry:', error);
    throw new Error('Failed to update entry. Please try again.');
  }

  revalidatePath('/journal');
  redirect('/journal');
}
