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
  ReferenceLine,
  ReferenceArea,
  Customized,
} from 'recharts';

const data = [
  {
    sector: 'Private for-profit employer',
    womenPercent: 28.9,
    wageGap: 5.41,
    employeeCount: 17846000,
  },
  {
    sector: 'Private non-profit employer',
    womenPercent: 65.3,
    wageGap: 25.8,
    employeeCount: 3053000,
  },
  {
    sector: 'Local, state, or Federal government',
    womenPercent: 30.5,
    wageGap: -12.9,
    employeeCount: 3600000,
  },
  {
    sector: 'Self-employed',
    womenPercent: 20.2,
    wageGap: 1.49,
    employeeCount: 2723000,
  },
];

// Map each sector to a unique color
const sectorColors = {
  'Private for-profit employer': '#8884d8',
  'Private non-profit employer': '#82ca9d',
  'Local, state, or Federal government': '#ffa726',
  'Self-employed': '#FF8042',
};

// Custom tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { sector, womenPercent, wageGap, employeeCount } = payload[0].payload;
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
          <strong>Gender Wage Gap:</strong> {wageGap}%
        </p>
        <p>
          <strong>Employee Count:</strong> {employeeCount.toLocaleString()}
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

  // Custom annotations rendered over the chart (unchanged from previous version)
  const renderAnnotations = (props) => {
    const { width } = props;
    return (
      <g>
        <text
          x={width / 2}
          y={20}
          textAnchor="middle"
          fill="#000"
          fontSize={16}
          fontWeight="bold"
        >
          Key Insights:
        </text>
        <text x={width / 2} y={40} textAnchor="middle" fill="#000">
          • Government sector shows a reverse wage gap (women earning more).
        </text>
        <text x={width / 2} y={60} textAnchor="middle" fill="#000">
          • Non-profit sector, despite high female representation, has the highest wage gap.
        </text>
        <text x={width / 2} y={80} textAnchor="middle" fill="#000">
          • For-profit and self-employed sectors feature lower female representation with smaller gaps.
        </text>
      </g>
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
        {/* Horizontal reference line at y=0 marks wage parity */}
        <ReferenceLine
          y={0}
          stroke="red"
          strokeDasharray="3 3"
          label={{
            value: 'Wage Parity (0%)',
            position: 'insideTopRight',
            fill: 'red',
          }}
        />
        {/* Vertical reference line at x=50 marks gender representation parity */}
        <ReferenceLine
          x={50}
          stroke="blue"
          strokeDasharray="3 3"
          label={{
            value: 'Gender Parity (50%)',
            position: 'insideTopRight',
            fill: 'blue',
          }}
        />
        {/* Reference area for top left quadrant:
            - x from 0 to 50 (underrepresentation of women)
            - y from 0 to 50 (positive wage gap, where women earn less) */}
        <ReferenceArea
          x1={0}
          x2={50}
          y1={0}
          y2={50}
          fill="red"
          opacity={0.2}
          label={({ viewBox }) => {
            const { x, y, width, height } = viewBox;
            return (
              <text
                x={x + width / 2}
                y={y + height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="red"
                fontSize={16}
              >
                Under-representation of Women & Positive Wage Gap
              </text>
            );
          }}
        />
        {/* Global annotations with key insights */}
        <Customized content={renderAnnotations} />
        <XAxis
          type="number"
          dataKey="womenPercent"
          name="Proportion of Women"
          unit="%"
          domain={[0, 100]}
          label={{
            value: 'Proportion of Women',
            position: 'insideBottom',
            offset: -10,
          }}
        />
        <YAxis
          type="number"
          dataKey="wageGap"
          name="Gender Wage Gap"
          unit="%"
          domain={[-50, 50]}
          label={{
            value: 'Gender Wage Gap',
            angle: -90,
            position: 'insideLeft',
            dy: 70,
          }}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ strokeDasharray: '3 3' }}
        />
        <Legend
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{ paddingTop: 30 }}
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
