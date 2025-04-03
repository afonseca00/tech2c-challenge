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

interface AverageConsumption {
  _id: string;
  averageEnergyConsumption: number;
}

interface AverageConsumptionChartProps {
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

const AverageConsumptionChart: React.FC<AverageConsumptionChartProps> = ({ refreshTrigger }) => {
  const [data, setData] = useState<AverageConsumption[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get<AverageConsumption[]>('http://localhost:3000/indicators/average-consumption');
      setData(res.data);
    };

    fetchData();
  }, [refreshTrigger]);

  return (
    <div className="mt-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" label={{ value: 'Sector', position: 'insideBottom', dy: 10 }} />
          <YAxis label={{ value: 'MWh', angle: -90, position: 'insideLeft', dx: -4, dy: 20 }} />
          <Tooltip />
          <Legend content={<CustomLegend />} />
          <Bar dataKey="averageEnergyConsumption" fill="#28a745" name="Average Consumption (MWh)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AverageConsumptionChart;