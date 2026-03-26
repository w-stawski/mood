'use server';

import { genAndAddAiSummary as getAiFeedback } from '@/utils/ai';
import { getUserByClerkId } from '@/utils/auth';
import db from '@/utils/db';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { after } from 'next/server';

export async function createEntry(formData: FormData) {
  const user = await getUserByClerkId();
  const userId = user?.id;
  try {
    if (!userId) {
      return;
    }

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const { id } = await db.entry.create({
      data: {
        title,
        content,
        userId,
      },
    });
    after(async () => {
      try {
        const aiFeedback = await getAiFeedback(content);
        await updateEntryAiFeedback(aiFeedback, id, userId);
      } catch (error) {
        console.log('failed while AI update', error);
        throw new Error('AI entry update failed');
      }
    });
  } catch (error) {
    console.error('Error creating entry:', error);
    throw new Error('Failed to create entry. Please try again.');
  }

  revalidatePath('/journal');
  revalidatePath('/chart');
  redirect('/journal');
}

export async function updateEntryOnFormSubmit(formData: FormData) {
  const user = await getUserByClerkId();
  const userId = user?.id;

  try {
    if (!userId) {
      return;
    }

    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    const existingEntry = await db.entry.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!existingEntry) {
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

    after(async () => {
      try {
        const aiFeedback = await getAiFeedback(content);
        await updateEntryAiFeedback(aiFeedback, id, userId);
      } catch (error) {
        console.log('failed while AI update', error);
        throw new Error('AI entry update failed');
      }
    });
  } catch (error) {
    console.error('Error updating entry:', error);
    throw new Error('Failed to update entry. Please try again.');
  }

  revalidatePath('/journal');
  revalidatePath('/chart');
  redirect('/journal');
}

export async function updateEntryAiFeedback(
  aiFeedback: { summary: string; mood: number; feedback: string },
  id: string,
  userId: string,
) {
  try {
    if (!id || !userId || !aiFeedback) {
      return;
    }

    const existingEntry = await db.entry.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!existingEntry) {
      throw new Error('Entry not found or not authorized.');
    }

    const { summary, mood, feedback } = aiFeedback;
    await db.entry.update({
      where: {
        id,
      },
      data: {
        analysis: {
          upsert: {
            create: { summary, mood, feedback },
            update: { summary, mood, feedback },
          },
        },
      },
    });
  } catch (error) {
    console.error('Error updating entry:', error);
    throw new Error('Failed to update entry. Please try again.');
  }
}
