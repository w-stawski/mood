import { currentUser } from '@clerk/nextjs/server';
import db from '../../utils/db';
import { redirect } from 'next/navigation';

export default async function Page() {
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
