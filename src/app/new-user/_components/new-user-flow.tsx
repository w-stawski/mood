import { currentUser } from '@clerk/nextjs/server';
import db from '@/utils/db';
import { redirect } from 'next/navigation';

export function NewUserPageFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="h-8 w-40 bg-gray-200 animate-pulse rounded" aria-hidden />
    </div>
  );
}

export async function NewUserFlow() {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }
  const { id } = user;

  const match = await db.user.findUnique({
    where: { clerkId: id },
  });
  if (match) {
    redirect('/journal');
  }

  const { primaryEmailAddress, firstName } = user;
  if (!primaryEmailAddress || !firstName) {
    redirect('/sign-up');
  }
  await db.user.create({
    data: {
      clerkId: id,
      email: primaryEmailAddress?.emailAddress,
      name: firstName,
    },
  });
  redirect('/journal');
  return <div></div>;
}
