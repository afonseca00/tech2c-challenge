import React, { useState, useEffect } from 'react';
import UploadForm from './components/UploadForm';
import IndicatorCards from './components/IndicatorCards';
import YearlyEmissionsChart from './components/YearlyEmissionsChart';
import AverageConsumptionChart from './components/AverageConsumptionChart';
import TopEfficiencyChart from './components/TopEfficiencyChart';
import './App.css';

const App: React.FC = () => {
  const [refresh, setRefresh] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isCleared, setIsCleared] = useState(false);

  // Retrieve state from localStorage when the page loads
  useEffect(() => {
    const savedDataLoaded = localStorage.getItem('dataLoaded') === 'true';
    const savedIsCleared = localStorage.getItem('isCleared') === 'true';

    setDataLoaded(savedDataLoaded);
    setIsCleared(savedIsCleared);
  }, []);

  const handleUploadSuccess = () => {
    setRefresh(prev => !prev);
    setDataLoaded(true);
    setIsCleared(false);

    // Store state in localStorage
    localStorage.setItem('dataLoaded', 'true');
    localStorage.setItem('isCleared', 'false');
  };

  const handleClearData = () => {
    setDataLoaded(false);
    setIsCleared(true);
    setRefresh(prev => !prev);

    // Store state in localStorage
    localStorage.setItem('dataLoaded', 'false');
    localStorage.setItem('isCleared', 'true');
  };

  return (
    <div className="container mt-4">
      <h2 style={{ color: '#239F94', fontWeight: 'bold' }} className="text-center mb-4">
        Tech2C Challenge
      </h2>

      {/* Upload Form */}
      <UploadForm onUploadSuccess={handleUploadSuccess} />

      {/* Button to clear data */}
      {dataLoaded && (
        <button
          className="btn btn-danger mt-4"
          onClick={handleClearData}
        >
          Clear Data
        </button>
      )}

      {/* Show cards and charts only if data has been loaded */}
      {dataLoaded && !isCleared && (
        <>
          <IndicatorCards refreshTrigger={refresh} />

          {/* Row for the first two charts */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card border-primary">
                <div className="card-header text-white" style={{ backgroundColor: '#239F94', fontWeight: 'bold' }}>
                  Total CO₂ Emissions by Year
                </div>
                <div className="card-body">
                  <YearlyEmissionsChart refreshTrigger={refresh} />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card border-success">
                <div className="card-header text-white" style={{ backgroundColor: '#239F94', fontWeight: 'bold' }}>
                  Average Energy Consumption by Sector
                </div>
                <div className="card-body">
                  <AverageConsumptionChart refreshTrigger={refresh} />
                </div>
              </div>
            </div>
          </div>

          {/* Row for the last chart */}
          <div className="row">
            <div className="col-12">
              <div className="card border-warning" style={{ width: '100%' }}>
                <div className="card-header text-white" style={{ backgroundColor: '#239F94', fontWeight: 'bold' }}>
                  Top 5 Most Efficient Companies
                </div>
                <div className="card-body">
                  <TopEfficiencyChart refreshTrigger={refresh} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* If no data has been uploaded yet */}
      {!dataLoaded && !isCleared && (
        <p className="loading-message">No data uploaded yet. Please upload a file to view data.</p>
      )}
    </div>
  );
};

export default App;