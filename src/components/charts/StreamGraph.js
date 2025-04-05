import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  { year: 2010, academia: 0.3, industry: 0.5, government: 0.2 },
  { year: 2011, academia: 0.32, industry: 0.48, government: 0.2 },
  { year: 2012, academia: 0.35, industry: 0.45, government: 0.2 },
  { year: 2013, academia: 0.33, industry: 0.47, government: 0.2 },
  { year: 2014, academia: 0.34, industry: 0.46, government: 0.2 },
  { year: 2015, academia: 0.36, industry: 0.44, government: 0.2 },
  { year: 2016, academia: 0.37, industry: 0.43, government: 0.2 },
  { year: 2017, academia: 0.38, industry: 0.42, government: 0.2 },
  { year: 2018, academia: 0.39, industry: 0.41, government: 0.2 },
  { year: 2019, academia: 0.4, industry: 0.4, government: 0.2 },
  { year: 2020, academia: 0.41, industry: 0.39, government: 0.2 },
];

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
          <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="year" />
      <YAxis tickFormatter={(tick) => `${(tick * 100).toFixed(0)}%`} />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip formatter={(value) => `${(value * 100).toFixed(0)}%`} />
      <Legend />
      <Area
        type="monotone"
        dataKey="academia"
        stackId="1"
        stroke="#8884d8"
        fill="url(#colorAcademia)"
      />
      <Area
        type="monotone"
        dataKey="industry"
        stackId="1"
        stroke="#82ca9d"
        fill="url(#colorIndustry)"
      />
      <Area
        type="monotone"
        dataKey="government"
        stackId="1"
        stroke="#ffc658"
        fill="url(#colorGovernment)"
      />
    </AreaChart>
  </div>
);

export default StreamGraph;
