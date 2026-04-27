'use client';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';

export interface ChartDataPoint {
  sentimentScore: number;
  displayDate: string;
}

const Chart = ({ data }: { data: ChartDataPoint[] }) => {
  return (
    <>
      <h1>work in progress</h1>
      <figure className="w-full h-80" role="img" aria-label="Line chart showing mood trend over time from 0 to 10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={300} height={100} data={data}>
            <Line type="monotone" dataKey="sentimentScore" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
            <XAxis dataKey="displayDate" />
            <YAxis domain={[0, 10]} tickCount={11} allowDecimals={false} />
          </LineChart>
        </ResponsiveContainer>
        <figcaption className="sr-only">Mood score trend chart with dates on x-axis and scores from zero to ten on y-axis.</figcaption>
      </figure>
    </>
  );
};

export default Chart;
