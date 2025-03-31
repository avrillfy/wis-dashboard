import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import clusterData from '../../data/clusterBarData.json';

// Custom tooltip component for consistent styling
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#fff',
        border: '1px solid #ccc',
        padding: '10px',
        fontFamily: 'Poppins, sans-serif',
        lineHeight: 1.2
      }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={`tooltip-${index}`} style={{ margin: 0, color: entry.color }}>
            {entry.name}: {entry.value.toFixed(1)}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ClusterBarChart = () => {
  const [selectedDegree, setSelectedDegree] = useState("bachelors");

  // Colors for male and female bars
  const maleColor = "#6c63ff";
  const femaleColor = "#ff589b";

  // Compute data keys based on the selected degree type.
  // For example, when selectedDegree is "bachelors", the keys become "bachelorsMale" and "bachelorsFemale".
  const degreeKeyMale = selectedDegree + "Male";
  const degreeKeyFemale = selectedDegree + "Female";

  // For labeling the legend
  const degreeLabel = selectedDegree.charAt(0).toUpperCase() + selectedDegree.slice(1);

  // Button styles (consistent with the line chart example)
  const buttonStyle = {
    marginRight: '10px',
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif'
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f0f0f0'
  };

  const clusterPercentData = clusterData.map(item => ({
    ...item,
    "bachelorsMale": item.bachelorsMale / (item.bachelorsMale + item.bachelorsFemale) * 100,
    "bachelorsFemale": item.bachelorsFemale / (item.bachelorsFemale + item.bachelorsMale) * 100,
    "mastersMale": item.mastersMale / (item.mastersMale + item.mastersFemale) * 100,
    "mastersFemale": item.mastersFemale / (item.mastersFemale + item.mastersMale) * 100,
    "doctoralMale": item.doctoralMale / (item.doctoralMale + item.doctoralFemale) * 100,
    "doctoralFemale": item.doctoralFemale / (item.doctoralFemale + item.doctoralMale) * 100,
  }))

  return (
    <div style={{ padding: '40px', fontFamily: 'Poppins, sans-serif' }}>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setSelectedDegree("bachelors")}
          style={selectedDegree === "bachelors" ? activeButtonStyle : buttonStyle}
        >
          Bachelor's
        </button>
        <button
          onClick={() => setSelectedDegree("masters")}
          style={selectedDegree === "masters" ? activeButtonStyle : buttonStyle}
        >
          Master's
        </button>
        <button
          onClick={() => setSelectedDegree("doctoral")}
          style={selectedDegree === "doctoral" ? activeButtonStyle : buttonStyle}
        >
          Doctorate
        </button>
      </div>

      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={clusterPercentData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="discipline" tick={{ fontFamily: 'Poppins, sans-serif' }} />
          <YAxis
            tick={{ fontFamily: 'Poppins, sans-serif' }}
            tickFormatter={tick => `${tick}%`}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontFamily: 'Poppins, sans-serif' }} />
          <Bar dataKey={degreeKeyMale} fill={maleColor} name={`${degreeLabel} Male`} />
          <Bar dataKey={degreeKeyFemale} fill={femaleColor} name={`${degreeLabel} Female`} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClusterBarChart;
