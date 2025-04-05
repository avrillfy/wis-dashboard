import React from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// Sample data for STEM occupations
const data = [
  {
    sector: 'Private for-profit employer',
    womenPercent: 30,
    salary: 80,
    employeeCount: 1500,
  },
  {
    sector: 'Private nonprofit employer',
    womenPercent: 40,
    salary: 30,
    employeeCount: 2500,
  },
  {
    sector: 'Local, state, or federal government',
    womenPercent: 50,
    salary: 50,
    employeeCount: 3000,
  },
  {
    sector: 'Self-employed',
    womenPercent: 20,
    salary: 10,
    employeeCount: 1200,
  },
];

// Map each sector to a unique color
const sectorColors = {
  'Private for-profit employer': '#8884d8',
  'Private nonprofit employer': '#82ca9d',
  'Local, state, or federal government': '#ffc658',
  'Self-employed': '#FF8042',
};

// Custom tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { sector, womenPercent, salary, employeeCount } = payload[0].payload;
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          padding: '10px',
        }}
      >
        <p>
          <strong style={{ color: sectorColors[sector] }}>{sector}</strong>
        </p>
        <p>
          <strong>Proportion of Women:</strong> {womenPercent}%
        </p>
        <p>
          <strong>Gender Wage Gap:</strong> {salary}%
        </p>
        <p>
          <strong>Employee Count:</strong> {employeeCount}
        </p>
      </div>
    );
  }
  return null;
};

const BubbleChart = () => {
  // Group data by sector so that each sector gets its own Scatter series
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.sector]) {
      acc[item.sector] = [];
    }
    acc[item.sector].push(item);
    return acc;
  }, {});

  // Find the maximum employee count to scale the bubble sizes
  const maxEmployeeCount = Math.max(...data.map((item) => item.employeeCount));
  // Define the maximum radius for the largest bubble
  const maxRadius = 50;
  // Scale factor based on the square root of the employee count
  const scaleFactor = maxRadius / Math.sqrt(maxEmployeeCount);

  // Custom shape to render bubbles with radius proportional to employeeCount
  const renderBubble = (props) => {
    const { cx, cy, payload } = props;
    const radius = Math.sqrt(payload.employeeCount) * scaleFactor;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill={sectorColors[payload.sector]}
        opacity={0.7}
      />
    );
  };

  return (
    <ResponsiveContainer width="100%" height={700}>
      <ScatterChart
        margin={{
          left: 200,
          right: 200,
          top: 100,
          bottom: 100,
        }}
      >
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="womenPercent"
          name="Proportion of Women"
          unit="%"
          domain={[0, 100]}
          label={{
            value: 'Proportion of Women',
            position: 'insideBottom',
            offset: -5,
          }}
        />
        <YAxis
          type="number"
          dataKey="salary"
          name="Gender Wage Gap"
          unit="%"
          domain={[0, 100]}
          label={{
            value: 'Gender Wage Gap',
            angle: -90,
            position: 'insideLeft',
          }}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ strokeDasharray: '3 3' }}
        />
        <Legend
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{ paddingTop: 30 }} // adds extra space below legend
          formatter={(value) => <span style={{ color: 'black' }}>{value}</span>}
        />
        {Object.keys(groupedData).map((sector) => (
          <Scatter
            key={sector}
            name={sector}
            data={groupedData[sector]}
            shape={renderBubble}
            fill={sectorColors[sector]}
          />
        ))}
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default BubbleChart;
