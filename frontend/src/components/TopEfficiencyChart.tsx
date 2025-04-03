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

interface Efficiency {
  _id: string;
  avgEfficiency: number;
}

interface TopEfficiencyChartProps {
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

const TopEfficiencyChart: React.FC<TopEfficiencyChartProps> = ({ refreshTrigger }) => {
  const [data, setData] = useState<Efficiency[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get<Efficiency[]>('http://localhost:3000/indicators/top-efficient');
      setData(res.data);
    };

    fetchData();
  }, [refreshTrigger]);

  return (
    <div className="mt-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" label={{ value: 'Company', position: 'insideBottom', dy: 12 }} />
          <YAxis label={{ value: 'CO₂ / MWh', angle: -90, position: 'insideLeft', dy: 30 }} />
          <Tooltip />
          <Legend content={<CustomLegend />} />
          <Bar dataKey="avgEfficiency" fill="#17a2b8" name="CO₂/MWh" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopEfficiencyChart;