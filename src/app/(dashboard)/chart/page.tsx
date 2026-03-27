import Chart, { ChartDataPoint } from '@/components/Chart';
import { getAnalyses } from '@/utils/db-helpers';

export default async function Page() {
  const data = await getAnalyses();
  const chartData: ChartDataPoint[] =
    data?.map((item) => ({
      ...item,
      displayDate: new Date(item.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      sentimentScore: item.mood,
    })) || [];

  if (!chartData.length) {
    return (
      <div className="p-8 text-center text-gray-500 bg-white rounded-lg shadow-sm border border-gray-100">
        <p className="text-lg">No analysis data available yet.</p>
        <p className="text-sm">Keep journaling to see your mood trends over time!</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold mb-8">Mood Trends</h1>
      <Chart data={chartData} />
    </div>
  );
}
