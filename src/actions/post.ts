'use server';

import { AnalysisResponse, JournalEntrySchema } from '@/types';
import { analysesCacheTag, entriesCacheTag } from '@/utils/db-helpers';
import { genAndAddAiSummary as getAiFeedback } from '@/utils/ai';
import { getUserByClerkId } from '@/utils/auth';
import db from '@/utils/db';
import { revalidatePath, updateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { after } from 'next/server';

export async function createEntry(formData: FormData): Promise<void> {
  const user = await getUserByClerkId();
  const userId = user?.id;
  try {
    if (!userId) {
      return;
    }

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    // Validate the input using Zod
    const validationResult = JournalEntrySchema.pick({ title: true, content: true }).safeParse({
      title,
      content,
    });

    if (!validationResult.success) {
      throw new Error(validationResult.error.issues[0].message);
    }

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
        if (aiFeedback) {
          await updateEntryAiFeedback(aiFeedback, id, userId);
        }
      } catch (error) {
        console.error('failed while AI update', error);
      }
    });
  } catch (error) {
    console.error('Error creating entry:', error);
    throw new Error('Failed to create entry. Please try again.');
  }

  updateTag(entriesCacheTag(userId));
  updateTag(analysesCacheTag(userId));
  revalidatePath('/journal');
  revalidatePath('/chart');
  redirect('/journal');
}

export async function updateEntryOnFormSubmit(formData: FormData): Promise<void> {
  const user = await getUserByClerkId();
  const userId = user?.id;

  try {
    if (!userId) {
      return;
    }

    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    // Validate the input using Zod
    const validationResult = JournalEntrySchema.pick({ id: true, title: true, content: true }).safeParse({
      id,
      title,
      content,
    });

    if (!validationResult.success) {
      throw new Error(validationResult.error.issues[0].message);
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
        if (aiFeedback) {
          await updateEntryAiFeedback(aiFeedback, id, userId);
        }
      } catch (error) {
        console.error('failed while AI update', error);
      }
    });
  } catch (error) {
    console.error('Error updating entry:', error);
    throw new Error('Failed to update entry. Please try again.');
  }

  updateTag(entriesCacheTag(userId));
  updateTag(analysesCacheTag(userId));
  revalidatePath('/journal');
  revalidatePath('/chart');
  redirect('/journal');
}

export async function updateEntryAiFeedback(
  aiFeedback: AnalysisResponse,
  entryId: string,
  userId: string,
): Promise<void> {
  try {
    await db.analysis.upsert({
      where: {
        entryId,
      },
      create: {
        ...aiFeedback,
        entryId,
      },
      update: {
        ...aiFeedback,
      },
    });
    updateTag(entriesCacheTag(userId));
    updateTag(analysesCacheTag(userId));
    revalidatePath('/journal');
    revalidatePath('/chart');
  } catch (error) {
    console.error('Error updating AI feedback:', error);
  }
}
