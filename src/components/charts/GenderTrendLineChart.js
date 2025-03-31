import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import trendData from '../../data/lineTrendData.json';

// Custom tooltip component for compact styling and bold year label
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
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Formatter for YAxis ticks: shows numbers in thousands (K) or millions (M)
const formatYAxisTick = (tick) => {
  if (tick >= 1e6) return (tick / 1e6).toFixed(1) + 'M';
  if (tick >= 1e3) return (tick / 1e3).toFixed(0) + 'K';
  return tick;
};

const GenderTrendLineChart = () => {
  const [selectedDegree, setSelectedDegree] = useState("bachelors");

  // Consistent color hues across degrees
  const maleColor = "#6c63ff";    
  const femaleColor = "#ff589b";  

  // Returns the two lines based on the selected degree
  const renderLines = () => {
    switch (selectedDegree) {
      case "bachelors":
        return [
          <Line key="bachelorsMale" type="monotone" dataKey="bachelorsMale" stroke={maleColor} strokeWidth={2} name="Bachelor's Male" />,
          <Line key="bachelorsFemale" type="monotone" dataKey="bachelorsFemale" stroke={femaleColor} strokeWidth={2} name="Bachelor's Female" />
        ];
      case "masters":
        return [
          <Line key="mastersMale" type="monotone" dataKey="mastersMale" stroke={maleColor} strokeWidth={2} name="Master's Male" />,
          <Line key="mastersFemale" type="monotone" dataKey="mastersFemale" stroke={femaleColor} strokeWidth={2} name="Master's Female" />
        ];
      case "doctoral":
        return [
          <Line key="doctoralMale" type="monotone" dataKey="doctoralMale" stroke={maleColor} strokeWidth={2} name="Doctoral Male" />,
          <Line key="doctoralFemale" type="monotone" dataKey="doctoralFemale" stroke={femaleColor} strokeWidth={2} name="Doctoral Female" />
        ];
      default:
        return null;
    }
  };

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

      <ResponsiveContainer width="100%" height={400}>
        <LineChart 
          data={trendData} 
          margin={{ top: 20, right: 30, left: 70, bottom: 40 }}  
        >
          <XAxis 
            dataKey="year" 
            tick={{ fontFamily: 'Poppins, sans-serif' }}
          />
          <YAxis 
            tickFormatter={formatYAxisTick}
            tick={{ fontFamily: 'Poppins, sans-serif' }}
            domain={[0, 'auto']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontFamily: 'Poppins, sans-serif' }}/>
          {renderLines()}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GenderTrendLineChart;
