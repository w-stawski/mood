'use client';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';

const HistoryChart = ({ data }) => {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={100} data={data}>
          <Line type="monotone" dataKey="sentimentScore" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
          <XAxis dataKey="displayDate" />
          <YAxis domain={[0, 10]} tickCount={11} allowDecimals={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoryChart;
