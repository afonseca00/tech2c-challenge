import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LegendProps,
} from 'recharts';

interface YearlyEmission {
  _id: number;
  totalCO2: number;
}

interface YearlyEmissionsChartProps {
  refreshTrigger: boolean;
}

const CustomLegend = ({ payload }: LegendProps) => (
  <div style={{ textAlign: 'center', marginTop: 20 }}>
    {payload?.map((entry, index) => (
      <span key={`item-${index}`} style={{ color: entry.color, fontWeight: 'bold' }}>
        ⬤ {entry.value}
      </span>
    ))}
  </div>
);

const YearlyEmissionsChart: React.FC<YearlyEmissionsChartProps> = ({ refreshTrigger }) => {
  const [data, setData] = useState<YearlyEmission[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get<YearlyEmission[]>('http://localhost:3000/indicators/yearly-emissions');
      setData(res.data);
    };

    fetchData();
  }, [refreshTrigger]);

  return (
    <div className="mt-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" label={{ value: 'Year', position: 'insideBottom', dy: 10 }} />
          <YAxis label={{ value: 'Tons', angle: -90, position: 'insideLeft', dx: -4, dy: 20 }} />
          <Tooltip />
          <Legend content={<CustomLegend />} />
          <Bar dataKey="totalCO2" fill="#0d6efd" name="Total CO₂ (tons)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YearlyEmissionsChart;