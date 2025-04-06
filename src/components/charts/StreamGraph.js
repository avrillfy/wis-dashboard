import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine, 
  ReferenceArea
} from 'recharts';

const data = [
  { year: 1993, academia: 0.58, industry: 0.13, government: 0.08, nonprofit: 0.06, other: 0.16},
  { year: 1998, academia: 0.54, industry: 0.17, government: 0.06, nonprofit: 0.07, other: 0.17},
  { year: 2003, academia: 0.59, industry: 0.13, government: 0.06, nonprofit: 0.07, other: 0.15},
  { year: 2008, academia: 0.58, industry: 0.17, government: 0.06, nonprofit: 0.06, other: 0.14},
  { year: 2013, academia: 0.59, industry: 0.19, government: 0.07, nonprofit: 0.07, other: 0.09},
  { year: 2018, academia: 0.51, industry: 0.26, government: 0.07, nonprofit: 0.08, other: 0.09},
  { year: 2023, academia: 0.42, industry: 0.36, government: 0.07, nonprofit: 0.08, other: 0.07}  
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#fff', border: '1px solid #ccc', padding: '10px'}}>
        <p>{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ margin: 0, color: entry.color }}>
            <strong>{entry.name}</strong>: {(entry.value * 100).toFixed(0)}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const StreamGraph = () => (
  <div
    style={{
      width: '100vw',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <AreaChart
      width={1200}
      height={600}
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorAcademia" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorIndustry" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorGovernment" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#ffa726" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#ffa726" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorNonProfit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#ff7300" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="year" />
      <YAxis tickFormatter={(tick) => `${(tick * 100).toFixed(0)}%`} />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip content={<CustomTooltip />} />
      <Legend formatter={(value) => <span style={{ fontWeight: 'bold' }}>{value}</span>} />
      {/* Annotation: Mark the year 2013 with a vertical reference line */}
      <ReferenceLine 
        x={2013}
        stroke="red"
        strokeDasharray="3 3"
      />
      {/* Annotation: Highlight the post-2013 period where Academia declines and Industry rises */}
      <ReferenceArea 
        x1={2013}
        x2={2023}  
        label={{ 
          value: "Post-2013: Academia ↓, Industry ↑", 
          position: "insideTop", 
          fill: "red", 
          fontWeight: "bold",
          fontSize: 16
        }}
        fill="rgba(255, 0, 0, 0.1)"
      />
      <Area
        type="monotone"
        dataKey="academia"
        stackId="1"
        stroke="#8884d8"
        fill="url(#colorAcademia)"
        name="Academia"
      />
      <Area
        type="monotone"
        dataKey="industry"
        stackId="1"
        stroke="#82ca9d"
        fill="url(#colorIndustry)"
        name="Industry"
      />
      <Area
        type="monotone"
        dataKey="government"
        stackId="1"
        stroke="#ffa726"
        fill="url(#colorGovernment)"
        name="Government"
      />
      <Area
        type="monotone"
        dataKey="nonprofit"
        stackId="1"
        stroke="#ff7300"
        fill="url(#colorNonProfit)"
        name="Non-Profit"
      />
    </AreaChart>
  </div>
);

export default StreamGraph;
