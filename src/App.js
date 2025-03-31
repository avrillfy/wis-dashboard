import './App.css';
import React from 'react';
import GenderTrendLineChart from './components/charts/GenderTrendLineChart';
import ClusterBarChart from './components/charts/ClusterBarChart';


function App() {
  return (
    <div className="App">
    <h2>Gender Representation in STEM Degree Attainment Over Time</h2>
    <GenderTrendLineChart />
    <h2>Gender Representation in STEM Fields</h2>
    <ClusterBarChart/>
  </div>
  );
}

export default App;
