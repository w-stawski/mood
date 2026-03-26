import Chart from '@/components/Chart';
import { getAnalyses } from '@/utils/db-helpers';

export default async function Page() {
  const data = await getAnalyses();
  const chartData = data?.map((item) => ({
    ...item,
    // Convert Date object to "MM/DD" or "Mar 26"
    displayDate: new Date(item.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),

    sentimentScore: item.mood,
  }));
  return <Chart data={chartData} />;
}
