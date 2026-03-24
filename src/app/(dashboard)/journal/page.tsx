import Link from 'next/link';
import EntryCard from '../../../components/EntryCard';
import { getEntries } from '../../../utils/helpers';

export default async function Page() {
  const entries = await getEntries();

  return (
    <div className="p-5 grid grid-cols-3 gap-4">
      <Link href="/journal/new">
        <EntryCard title="Add New Entry" content="" />
      </Link>
      {entries?.map((entry) => (
        <EntryCard key={entry.id} title={entry.title} content={entry.content} />
      ))}
    </div>
  );
}
