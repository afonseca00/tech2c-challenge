import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface YearlyEmission {
  _id: number;
  totalCO2: number;
}

interface AverageConsumption {
  _id: string;
  averageEnergyConsumption: number;
}

interface Efficiency {
  _id: string;
  avgEfficiency: number;
}

interface IndicatorCardsProps {
  refreshTrigger: boolean;
}

const IndicatorCards: React.FC<IndicatorCardsProps> = ({ refreshTrigger }) => {
  const [yearlyEmissions, setYearlyEmissions] = useState<YearlyEmission[]>([]);
  const [averageConsumption, setAverageConsumption] = useState<AverageConsumption[]>([]);
  const [topEfficient, setTopEfficient] = useState<Efficiency[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIndicators = async () => {
    try {
      setLoading(true);
      const [emissionsRes, consumptionRes, efficiencyRes] = await Promise.all([
        axios.get<YearlyEmission[]>('http://localhost:3000/indicators/yearly-emissions'),
        axios.get<AverageConsumption[]>('http://localhost:3000/indicators/average-consumption'),
        axios.get<Efficiency[]>('http://localhost:3000/indicators/top-efficient')
      ]);
      setYearlyEmissions(emissionsRes.data);
      setAverageConsumption(consumptionRes.data);
      setTopEfficient(efficiencyRes.data);
    } catch (error) {
      console.error('Error fetching indicators:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndicators();
  }, [refreshTrigger]);

  if (loading) return <p>Loading indicators...</p>;

  return (
    <div className="container mt-4">
      <h4 style={{ color: '#239F94', fontWeight: 'bold' }}>Indicators Overview</h4>

      <div className="row">
        {/* Card for Total CO₂ Emissions by Year */}
        <div className="col-12 col-md-4 mb-4">
          <div className="card" style={{ borderColor: '#239F94', borderRadius: '8px', height: '100%' }}>
            <div className="card-header" style={{ backgroundColor: '#239F94', color: 'white', fontWeight: 'bold' }}>
              Total CO₂ Emissions by Year
            </div>
            <div className="card-body" style={{ backgroundColor: 'white' }}>
              {yearlyEmissions.map((item) => (
                <p key={item._id}>
                  <strong>{item._id}:</strong> {item.totalCO2.toFixed(2)} tons
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Card for Average Energy Consumption by Sector */}
        <div className="col-12 col-md-4 mb-4">
          <div className="card" style={{ borderColor: '#239F94', borderRadius: '8px', height: '100%' }}>
            <div className="card-header" style={{ backgroundColor: '#239F94', color: 'white', fontWeight: 'bold' }}>
              Average Energy Consumption by Sector
            </div>
            <div className="card-body" style={{ backgroundColor: 'white' }}>
              {averageConsumption.map((item) => (
                <p key={item._id}>
                  <strong>{item._id}:</strong> {item.averageEnergyConsumption.toFixed(2)} MWh
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Card for Top 5 Most Efficient Companies */}
        <div className="col-12 col-md-4 mb-4">
          <div className="card" style={{ borderColor: '#239F94', borderRadius: '8px', height: '100%' }}>
            <div className="card-header" style={{ backgroundColor: '#239F94', color: 'white', fontWeight: 'bold' }}>
              Top 5 Most Efficient Companies
            </div>
            <div className="card-body" style={{ backgroundColor: 'white' }}>
              {topEfficient.map((item) => (
                <p key={item._id}>
                  <strong>{item._id}:</strong> {item.avgEfficiency.toFixed(4)} CO₂/MWh
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicatorCards;